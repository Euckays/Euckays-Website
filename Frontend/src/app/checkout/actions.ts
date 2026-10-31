"use server";

import { apiRequest } from "@/lib/api";
import { NIGERIAN_STATES } from "@/lib/nigeria";

export type PlaceOrderInput = {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  state: (typeof NIGERIAN_STATES)[number];
  city: string;
  deliveryInstructions?: string;
  items: { productId: string; quantity: number }[];
};

export type PlaceOrderResult =
  | { success: true; redirectUrl: string; orderNumber: string }
  | { success: false; error: string };

// The backend validates the order, re-reads prices and stock, reserves stock and starts the
// Paystack transaction; the browser is then sent to `redirectUrl`.
export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const result = await apiRequest<{ redirectUrl: string; orderNumber: string }>("/checkout", {
    method: "POST",
    body: input,
  });
  if (!result.ok) return { success: false, error: result.error };
  return { success: true, redirectUrl: result.data.redirectUrl, orderNumber: result.data.orderNumber };
}

export async function getDeliveryQuote(state: string) {
  if (!NIGERIAN_STATES.some((option) => option === state)) {
    return { success: false as const, error: "Select a valid delivery state." };
  }
  const result = await apiRequest<{ fee: number }>(`/delivery-quote?state=${encodeURIComponent(state)}`);
  if (!result.ok) {
    return { success: false as const, error: "Delivery pricing is temporarily unavailable. Please select your state again." };
  }
  return { success: true as const, fee: result.data.fee };
}
