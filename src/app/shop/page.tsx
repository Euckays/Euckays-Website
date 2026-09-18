import type { Metadata } from "next";
import Link from "next/link";
import { getActiveProducts } from "@backend/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore Euckays haircare and skincare, made with an appreciation for Nigerian botanicals.",
};

const CATEGORIES = [
  { value: undefined, label: "All products" },
  { value: "HAIRCARE", label: "Haircare" },
  { value: "SKINCARE", label: "Skincare" },
] as const;

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const params = await searchParams;
  const category = params.category === "HAIRCARE" || params.category === "SKINCARE" ? params.category : undefined;
  const products = await getActiveProducts({ category, search: params.q });
  const heading = params.q ? `Search results for “${params.q}”` : category === "HAIRCARE" ? "Haircare" : category === "SKINCARE" ? "Skincare" : "The collection";

  return (
    <div>
      <section className="shop-hero border-b border-brand-sand bg-brand-lime py-16 sm:py-24">
        <div className="container-brand flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div><p className="eyebrow text-brand-emerald">Euckays / the shop</p><h1 className="font-display mt-4 text-6xl leading-[0.92] tracking-[-0.06em] sm:text-8xl">{heading}</h1></div>
          <p className="max-w-sm text-sm leading-7 text-brand-black/65">Explore considered formulas for hair and skin, inspired by nature and made for the rituals you return to every day.</p>
        </div>
      </section>
      <div className="border-b border-brand-sand bg-brand-white">
        <div className="container-brand flex flex-wrap items-center justify-between gap-4 py-5">
          <nav className="flex flex-wrap gap-2" aria-label="Product categories">
            {CATEGORIES.map((item) => {
              const active = category === item.value;
              return <Link key={item.label} href={item.value ? `/shop?category=${item.value}` : "/shop"} aria-current={active ? "page" : undefined} className={`category-filter ${active ? "category-filter-active" : ""}`}>{item.label}</Link>;
            })}
          </nav>
          <span className="text-xs text-brand-black/55">{products.length} {products.length === 1 ? "product" : "products"}</span>
        </div>
      </div>
      <section className="section-space bg-brand-cream">
        <div className="container-brand">
          {products.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <div className="mx-auto max-w-lg border border-brand-sand bg-brand-white p-10 text-center"><h2 className="font-display text-4xl">Nothing here just yet.</h2><p className="mt-3 text-sm text-brand-black/60">Try another search or browse the full collection.</p><Link href="/shop" className="button-primary mt-7">Browse all products ↗</Link></div>}
        </div>
      </section>
    </div>
  );
}
