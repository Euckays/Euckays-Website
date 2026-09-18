"use server";

import { z } from "zod";
import { prisma } from "@backend/lib/prisma";
import { generateOrderNumber, getDeliveryFee } from "@backend/lib/orders";
import { initializePaystackTransaction, isPaystackConfigured } from "@backend/lib/paystack";
import { NIGERIAN_STATES } from "@/lib/nigeria";

const placeOrderSchema = z.object({
  customerName: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  address: z.string().trim().min(5, "Delivery address is required"),
  state: z.enum(NIGERIAN_STATES),
  city: z.string().trim().min(2, "City / town is required"),
  deliveryInstructions: z.string().trim().optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1),
      })
    )
    .min(1, "Your cart is empty"),
});

export type PlaceOrderInput = z.infer<typeof placeOrderSchema>;
export type PlaceOrderResult =
  | { success: true; redirectUrl: string; orderNumber: string }
  | { success: false; error: string };

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const parsed = placeOrderSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid order details" };
  }
  const data = parsed.data;

  // Never create or mark an order paid when the payment integration is unavailable.
  if (!isPaystackConfigured()) {
    return { success: false, error: "Payment is temporarily unavailable. Please try again later." };
  }

  const productIds = data.items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
  });

  if (products.length !== productIds.length) {
    return { success: false, error: "One or more items in your cart are no longer available." };
  }

  const lineItems = data.items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    if (product.stock < item.quantity) {
      throw new Error(`${product.name} only has ${product.stock} left in stock.`);
    }
    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    };
  });

  const subtotal = lineItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const deliveryFee = await getDeliveryFee(data.state);
  const total = subtotal + deliveryFee;
  const orderNumber = generateOrderNumber();

  let stockError: string | null = null;
  try {
    await prisma.$transaction(async (tx) => {
      for (const item of lineItems) {
        const updated = await tx.product.updateMany({
          where: { id: item.productId, stock: { gte: item.quantity } },
          data: { stock: { decrement: item.quantity } },
        });
        if (updated.count === 0) {
          stockError = `${item.name} is no longer available in the requested quantity.`;
          throw new Error(stockError);
        }
      }

      await tx.order.create({
        data: {
          orderNumber,
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          state: data.state,
          city: data.city,
          deliveryInstructions: data.deliveryInstructions || null,
          subtotal,
          deliveryFee,
          total,
          items: { create: lineItems },
        },
      });
    });
  } catch {
    return { success: false, error: stockError ?? "Could not place order. Please try again." };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const transaction = await initializePaystackTransaction({
      email: data.email,
      amountNaira: total,
      reference: orderNumber,
      callbackUrl: `${siteUrl}/api/paystack/callback`,
      metadata: { orderNumber },
    });
    return { success: true, redirectUrl: transaction.authorization_url, orderNumber };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Could not start payment. Please try again.",
    };
  }
}
