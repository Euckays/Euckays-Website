import Link from "next/link";
import { prisma } from "@backend/lib/prisma";
import { formatNaira } from "@/lib/money";

export default async function AdminOverviewPage() {
  const [productCount, pendingOrders, paidOrders, lowStock, messageCount, vendorCount, revenueAgg] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count({ where: { status: "PENDING_PAYMENT" } }),
      prisma.order.count({ where: { status: { in: ["PAID", "PROCESSING", "READY_FOR_DISPATCH", "SHIPPED", "DELIVERED"] } } }),
      prisma.product.count({ where: { stock: { lte: 5 } } }),
      prisma.contactMessage.count(),
      prisma.vendorApplication.count(),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { in: ["PAID", "PROCESSING", "READY_FOR_DISPATCH", "SHIPPED", "DELIVERED"] } },
      }),
    ]);

  const stats = [
    { label: "Products", value: productCount, href: "/admin/products" },
    { label: "Paid Orders", value: paidOrders, href: "/admin/orders" },
    { label: "Pending Payment", value: pendingOrders, href: "/admin/orders" },
    { label: "Low Stock (≤5)", value: lowStock, href: "/admin/products" },
    { label: "Contact Messages", value: messageCount, href: "/admin/messages" },
    { label: "Vendor Applications", value: vendorCount, href: "/admin/vendors" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-brand-black">Overview</h1>

      <div className="mt-6 rounded-2xl border border-brand-sand bg-brand-white p-6">
        <p className="text-sm text-brand-black/60">Total Revenue (paid orders)</p>
        <p className="mt-1 text-3xl font-semibold text-brand-emerald">
          {formatNaira(Number(revenueAgg._sum.total ?? 0))}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-brand-sand bg-brand-white p-5 transition hover:border-brand-emerald"
          >
            <p className="text-2xl font-semibold text-brand-black">{s.value}</p>
            <p className="mt-1 text-sm text-brand-black/60">{s.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
