"use server";

import { placeOrder as performPlaceOrder } from "@backend/actions/checkout";
import { getDeliveryFee } from "@backend/lib/orders";
import { NIGERIAN_STATES } from "@/lib/nigeria";

export type { PlaceOrderInput, PlaceOrderResult } from "@backend/actions/checkout";

export async function placeOrder(...args: Parameters<typeof performPlaceOrder>): ReturnType<typeof performPlaceOrder> {
  return performPlaceOrder(...args);
}

export async function getDeliveryQuote(state: string) {
  if (!NIGERIAN_STATES.some((option) => option === state)) {
    return { success: false as const, error: "Select a valid delivery state." };
  }
  try {
    return { success: true as const, fee: await getDeliveryFee(state) };
  } catch {
    return { success: false as const, error: "Delivery pricing is temporarily unavailable. Please select your state again." };
  }
}
