import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@backend/lib/products";
import { AddToCartForm } from "@/components/product/AddToCartForm";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: product.seoTitle ?? product.name, description: product.seoDescription ?? product.shortDescription };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const image = product.images?.[0];

  return (
    <div>
      <nav className="border-b border-brand-sand bg-brand-white" aria-label="Breadcrumb"><div className="container-brand flex items-center gap-2 py-4 text-xs text-brand-black/60"><Link href="/shop" className="hover:text-brand-emerald">Shop</Link><span aria-hidden="true">/</span><Link href={`/shop?category=${product.category}`} className="hover:text-brand-emerald">{product.category === "HAIRCARE" ? "Haircare" : "Skincare"}</Link><span aria-hidden="true">/</span><span className="truncate text-brand-black">{product.name}</span></div></nav>
      <section className="border-b border-brand-sand bg-brand-cream py-10 sm:py-16">
        <div className="container-brand grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="aspect-square overflow-hidden bg-brand-lime">{image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image.url} alt={image.altText} className="h-full w-full object-cover" />
          ) : <div className="h-full w-full bg-brand-lime" />}</div>
          <div className="lg:sticky lg:top-36 lg:self-start">
            <p className="eyebrow text-brand-emerald">{product.category === "HAIRCARE" ? "Haircare" : "Skincare"} · {product.size}</p>
            <h1 className="font-display mt-4 text-5xl leading-[0.94] tracking-[-0.045em] sm:text-7xl">{product.name}</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-brand-black/70">{product.shortDescription}</p>
            <AddToCartForm product={product} />
            {product.cautionInfo && <p className="mt-5 border-l-2 border-brand-earth pl-4 text-xs leading-6 text-brand-black/60"><strong className="text-brand-black">Please note:</strong> {product.cautionInfo}</p>}
          </div>
        </div>
      </section>
      <section className="section-space bg-brand-white">
        <div className="container-brand">
          <div className="grid gap-10 border-b border-brand-sand pb-14 md:grid-cols-[0.35fr_0.65fr]"><p className="eyebrow text-brand-emerald">The formula</p><div><h2 className="font-display text-4xl sm:text-5xl">More about this ritual.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-brand-black/70">{product.description}</p></div></div>
          <div className="grid gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            <div><h3 className="font-display text-3xl">Benefits</h3><ul className="mt-4 space-y-2 text-sm leading-6 text-brand-black/65">{product.keyBenefits.map((v) => <li key={v}>• {v}</li>)}</ul></div>
            <div><h3 className="font-display text-3xl">Key ingredients</h3><ul className="mt-4 space-y-2 text-sm leading-6 text-brand-black/65">{product.keyIngredients.map((v) => <li key={v}>• {v}</li>)}</ul></div>
            <div><h3 className="font-display text-3xl">How to use</h3><p className="mt-4 text-sm leading-6 text-brand-black/65">{product.howToUse}</p></div>
            <div><h3 className="font-display text-3xl">Made for</h3><p className="mt-4 text-sm leading-6 text-brand-black/65">{product.suitableFor}</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
