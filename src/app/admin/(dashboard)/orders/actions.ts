"use server";

import { refresh } from "next/cache";
import { adminRequest } from "@/lib/admin-session";

export async function updateOrderStatus(orderId: string, status: string) {
  const result = await adminRequest(`/admin/orders/${encodeURIComponent(orderId)}/status`, {
    method: "PATCH",
    body: { status },
  });
  if (!result.ok) throw new Error(result.error);
  refresh();
}
