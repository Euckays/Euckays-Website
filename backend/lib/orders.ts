import { prisma } from "@backend/lib/prisma";
import { DEFAULT_DELIVERY_FEE } from "@/lib/nigeria";

export function generateOrderNumber() {
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  const timestamp = Date.now().toString().slice(-6);
  return `EUK-${timestamp}${random}`;
}

export async function getDeliveryFee(state: string) {
  const zone = await prisma.deliveryZone.findUnique({ where: { state } });
  return zone ? Number(zone.fee) : DEFAULT_DELIVERY_FEE;
}

export async function getOrderByNumber(orderNumber: string) {
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });
  if (!order) return null;

  return {
    ...order,
    subtotal: Number(order.subtotal),
    deliveryFee: Number(order.deliveryFee),
    total: Number(order.total),
    items: order.items.map((item) => ({ ...item, price: Number(item.price) })),
  };
}
