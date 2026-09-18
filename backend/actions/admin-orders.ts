"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@backend/lib/prisma";

const VALID_STATUSES = [
  "PENDING_PAYMENT",
  "PAID",
  "PROCESSING",
  "READY_FOR_DISPATCH",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
] as const;

export async function updateOrderStatus(orderId: string, status: string) {
  if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
    throw new Error("Invalid status");
  }
  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as (typeof VALID_STATUSES)[number] },
  });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}
