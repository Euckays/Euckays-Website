import { notFound } from "next/navigation";
import { prisma } from "@backend/lib/prisma";
import { formatNaira } from "@/lib/money";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) notFound();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-brand-black">Order {order.orderNumber}</h1>
        <div className="w-56">
          <OrderStatusSelect orderId={order.id} status={order.status} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-brand-sand bg-brand-white p-6 lg:col-span-2">
          <h2 className="font-display mb-4 text-lg text-brand-black">Items</h2>
          <ul className="flex flex-col gap-3 text-sm">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between border-b border-brand-sand/60 pb-2">
                <span>
                  {item.name} &times; {item.quantity}
                </span>
                <span>{formatNaira(Number(item.price) * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 text-sm text-brand-black/70">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatNaira(Number(order.subtotal))}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{formatNaira(Number(order.deliveryFee))}</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-brand-black">
              <span>Total</span>
              <span>{formatNaira(Number(order.total))}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-brand-sand bg-brand-white p-6">
          <h2 className="font-display mb-4 text-lg text-brand-black">Customer</h2>
          <div className="space-y-1 text-sm text-brand-black/70">
            <p className="font-medium text-brand-black">{order.customerName}</p>
            <p>{order.email}</p>
            <p>{order.phone}</p>
            <p className="mt-3">{order.address}</p>
            <p>
              {order.city}, {order.state}
            </p>
            {order.deliveryInstructions && (
              <p className="mt-3 text-brand-black/50">
                Instructions: {order.deliveryInstructions}
              </p>
            )}
          </div>
          {order.paymentReference && (
            <p className="mt-4 text-xs text-brand-black/40">Ref: {order.paymentReference}</p>
          )}
          <p className="mt-1 text-xs text-brand-black/40">
            Placed {order.createdAt.toLocaleString("en-NG")}
          </p>
        </div>
      </div>
    </div>
  );
}
