"use server";

import { updateOrderStatus as performUpdateOrderStatus } from "@backend/actions/admin-orders";

export async function updateOrderStatus(...args: Parameters<typeof performUpdateOrderStatus>): ReturnType<typeof performUpdateOrderStatus> {
  return performUpdateOrderStatus(...args);
}
