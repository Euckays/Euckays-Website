import Link from "next/link";
import { prisma } from "@backend/lib/prisma";
import { formatNaira } from "@/lib/money";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-brand-black">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-brand-gold px-5 py-2 text-sm font-semibold text-brand-black hover:bg-brand-gold-light"
        >
          + Add Product
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-sand bg-brand-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-brand-sand text-xs uppercase tracking-wide text-brand-black/50">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-brand-sand/60 last:border-0">
                <td className="flex items-center gap-3 px-4 py-3">
                  <div className="h-10 w-10 overflow-hidden rounded-lg bg-brand-sand">
                    {p.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0].url} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <span className="font-medium text-brand-black">{p.name}</span>
                </td>
                <td className="px-4 py-3 text-brand-black/70">
                  {p.category === "HAIRCARE" ? "Haircare" : "Skincare"}
                </td>
                <td className="px-4 py-3 text-brand-black/70">{formatNaira(Number(p.price))}</td>
                <td className="px-4 py-3 text-brand-black/70">{p.stock}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      p.isActive
                        ? "bg-brand-emerald/10 text-brand-emerald"
                        : "bg-brand-black/10 text-brand-black/50"
                    }`}
                  >
                    {p.isActive ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-brand-emerald hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton productId={p.id} productName={p.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
