import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderByNumber } from "@backend/lib/orders";
import { formatNaira } from "@/lib/money";
import { ClearPaidOrderFromCart } from "@/components/checkout/ClearPaidOrderFromCart";

const STATUS_LABEL: Record<string, string> = {
  PENDING_PAYMENT: "Pending Payment",
  PAID: "Paid",
  PROCESSING: "Processing",
  READY_FOR_DISPATCH: "Ready for Dispatch",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const order = await getOrderByNumber(orderNumber);
  if (!order) notFound();
  const paymentConfirmed = ["PAID", "PROCESSING", "READY_FOR_DISPATCH", "SHIPPED", "DELIVERED"].includes(order.status);

  return (
    <div className="container-brand py-16">
      {paymentConfirmed && (
        <ClearPaidOrderFromCart
          orderNumber={order.orderNumber}
          productIds={order.items.flatMap((item) => item.productId ? [item.productId] : [])}
        />
      )}
      <div className="mx-auto max-w-2xl rounded-2xl border border-brand-sand bg-brand-white p-8 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-brand-emerald">
          {order.status === "PAID" ? "Payment Confirmed" : STATUS_LABEL[order.status]}
        </p>
        <h1 className="font-display mt-2 text-3xl text-brand-black">
          {paymentConfirmed ? `Payment successful, ${order.customerName.split(" ")[0]}!` : "Payment is not confirmed yet"}
        </h1>
        <p className="mt-2 text-brand-black/65">
          {paymentConfirmed
            ? "Your payment is confirmed and your order has been received."
            : "Your order has been received, but payment is still pending. Keep your order number and contact us if you need help."}
        </p>

        <div className="mt-8 rounded-xl bg-brand-sand/40 p-5 text-left text-sm">
          <div className="flex justify-between border-b border-brand-sand/70 pb-2">
            <span className="text-brand-black/60">Order Number</span>
            <span className="font-semibold text-brand-black">{order.orderNumber}</span>
          </div>
          <ul className="mt-3 flex flex-col gap-2">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between text-brand-black/75">
                <span>
                  {item.name} &times; {item.quantity}
                </span>
                <span>{formatNaira(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 space-y-1 border-t border-brand-sand/70 pt-3">
            <div className="flex justify-between text-brand-black/70">
              <span>Subtotal</span>
              <span>{formatNaira(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-brand-black/70">
              <span>Delivery</span>
              <span>{formatNaira(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-brand-black">
              <span>{paymentConfirmed ? "Total Paid" : "Order Total"}</span>
              <span>{formatNaira(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-left text-sm text-brand-black/70">
          <p className="font-semibold text-brand-black">Delivering to:</p>
          <p>{order.address}</p>
          <p>
            {order.city}, {order.state}
          </p>
          <p className="mt-2 text-brand-black/50">
            Estimated delivery: 2-7 business days depending on location.
          </p>
        </div>

        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-brand-gold px-7 py-3 text-sm font-semibold uppercase tracking-wide text-brand-black hover:bg-brand-gold-light"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
