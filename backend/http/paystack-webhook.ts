import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@backend/lib/prisma";

export async function handlePaystackWebhook(request: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");
  const expected = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");

  if (!signature || signature !== expected) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const reference = event.data?.reference;
    if (reference) {
      const order = await prisma.order.findUnique({ where: { orderNumber: reference } });
      if (
        order &&
        order.status === "PENDING_PAYMENT" &&
        event.data?.status === "success" &&
        event.data?.amount === Math.round(Number(order.total) * 100) &&
        event.data?.currency === "NGN"
      ) {
        await prisma.order.update({
          where: { orderNumber: reference },
          data: { status: "PAID", paymentReference: reference },
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
