import Link from "next/link";
import { prisma } from "@backend/lib/prisma";
import { formatNaira } from "@/lib/money";

const STATUS_STYLE: Record<string, string> = {
  PENDING_PAYMENT: "bg-amber-100 text-amber-700",
  PAID: "bg-brand-emerald/10 text-brand-emerald",
  PROCESSING: "bg-blue-100 text-blue-700",
  READY_FOR_DISPATCH: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  REFUNDED: "bg-gray-200 text-gray-700",
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-brand-black">Orders</h1>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-sand bg-brand-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-brand-sand text-xs uppercase tracking-wide text-brand-black/50">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-brand-sand/60 last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${o.id}`} className="font-medium text-brand-emerald hover:underline">
                    {o.orderNumber}
                  </Link>
                </td>
                <td className="px-4 py-3 text-brand-black/70">{o.customerName}</td>
                <td className="px-4 py-3 text-brand-black/70">{o.items.length}</td>
                <td className="px-4 py-3 text-brand-black/70">{formatNaira(Number(o.total))}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs ${STATUS_STYLE[o.status]}`}>
                    {o.status.replaceAll("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-brand-black/50">
                  {o.createdAt.toLocaleDateString("en-NG")}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-brand-black/50">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
