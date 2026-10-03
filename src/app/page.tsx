import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@backend/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";

export default async function Home() {
  const featured = await getFeaturedProducts(4);

  return (
    <div>
      <section className="hero-editorial relative isolate flex min-h-[650px] items-center overflow-hidden sm:min-h-[720px]">
        <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-1/2">
          <Image src="/images/product/image7.jpeg" alt="Euckays hair and skin care range" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center opacity-30 lg:opacity-100" />
          <div className="absolute inset-0 bg-brand-cream/70 lg:inset-y-0 lg:left-0 lg:right-auto lg:w-1/4 lg:bg-transparent lg:bg-gradient-to-r lg:from-brand-cream lg:to-transparent" />
        </div>
        <div className="container-brand relative py-24 sm:py-32">
          <div className="max-w-[36rem]">
            <p className="eyebrow mb-7 text-brand-emerald">Botanical beauty, made in Nigeria</p>
            <h1 className="font-display text-[clamp(4.8rem,10vw,9.1rem)] font-medium leading-[0.82] tracking-[-0.075em]">Beauty with <em className="font-normal">roots.</em></h1>
            <p className="mt-8 max-w-md text-base leading-7 text-brand-black/80 sm:text-lg">Thoughtful hair and skin rituals inspired by the richness of the land we call home.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/shop" className="button-primary">Shop the collection <span aria-hidden="true">↗</span></Link>
              <Link href="/farm-to-beauty" className="button-quiet">Discover our approach <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
        <p className="absolute bottom-5 right-6 hidden text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-brand-black/65 sm:block">The everyday ritual, reimagined</p>
      </section>

      <div className="border-y border-brand-sand bg-brand-white">
        <div className="container-brand grid gap-0 sm:grid-cols-3">
          {[
            ["01", "Rooted in nature", "Botanical ingredients at the heart of each formula."],
            ["02", "Made in Nigeria", "Considered care shaped by where we come from."],
            ["03", "For everyday rituals", "Simple moments of care, made to feel special."],
          ].map(([number, title, description]) => (
            <div key={number} className="flex gap-4 border-b border-brand-sand py-7 last:border-b-0 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
              <span className="font-display text-2xl text-brand-earth">{number}</span>
              <div><h2 className="text-sm font-semibold">{title}</h2><p className="mt-1 text-xs leading-5 text-brand-black/60">{description}</p></div>
            </div>
          ))}
        </div>
      </div>

      <section className="section-space bg-brand-cream">
        <div className="container-brand">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="eyebrow text-brand-emerald">Explore the collection</p><h2 className="section-heading mt-3">Care for every part of you.</h2></div>
            <Link href="/shop" className="text-link self-start sm:self-end">Shop all products <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Link href="/shop?category=HAIRCARE" className="category-card group relative flex min-h-[410px] items-end overflow-hidden bg-brand-sand p-7 sm:min-h-[500px] sm:p-10">
              <Image src="/images/product/image3.jpeg" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center transition duration-700 group-hover:scale-[1.035]" />
              <span className="category-shade absolute inset-0" />
              <span className="relative z-10 flex w-full items-end justify-between gap-4 text-brand-white"><span><span className="eyebrow">The collection / 01</span><span className="mt-2 block font-display text-5xl leading-none sm:text-6xl">Haircare</span></span><span className="category-arrow" aria-hidden="true">↗</span></span>
            </Link>
            <Link href="/shop?category=SKINCARE" className="category-card group relative flex min-h-[410px] items-end overflow-hidden bg-brand-sand p-7 sm:min-h-[500px] sm:p-10">
              <Image src="/images/product/Image1.jpeg" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center transition duration-700 group-hover:scale-[1.035]" />
              <span className="category-shade absolute inset-0" />
              <span className="relative z-10 flex w-full items-end justify-between gap-4 text-brand-white"><span><span className="eyebrow">The collection / 02</span><span className="mt-2 block font-display text-5xl leading-none sm:text-6xl">Skincare</span></span><span className="category-arrow" aria-hidden="true">↗</span></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space border-t border-brand-sand bg-brand-white">
        <div className="container-brand">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="eyebrow text-brand-emerald">The everyday favourites</p><h2 className="section-heading mt-3">A good place to begin.</h2></div>
            <Link href="/shop" className="text-link self-start sm:self-end">View the full collection <span aria-hidden="true">↗</span></Link>
          </div>
          {featured.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">{featured.map((product) => <ProductCard key={product.slug} product={product} />)}</div>
          ) : (
            <div className="border border-brand-sand bg-brand-cream p-10 text-center"><h3 className="font-display text-3xl">Our collection is growing.</h3><p className="mt-2 text-sm text-brand-black/60">Please check back soon for new formulas.</p></div>
          )}
        </div>
      </section>

      <section className="grid bg-brand-lime lg:grid-cols-2">
        <div className="relative min-h-[390px] lg:min-h-[600px]"><Image src="/images/product/image2.jpeg" alt="Euckays Glow Brightening Oil" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" /></div>
        <div className="flex items-center px-6 py-16 sm:px-12 lg:px-[min(8vw,8rem)]">
          <div className="max-w-xl"><p className="eyebrow text-brand-emerald">The farm-to-beauty philosophy</p><h2 className="font-display mt-5 text-5xl leading-[0.96] tracking-[-0.045em] sm:text-7xl">Good care begins <em>at the source.</em></h2><p className="mt-6 max-w-md text-sm leading-7 text-brand-black/70 sm:text-base">Our approach starts with an appreciation for ingredients, the land and the people behind them. From carefully chosen botanicals to finished formulas, each step has a purpose.</p><Link href="/farm-to-beauty" className="text-link mt-8 inline-flex">Follow the journey <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>

      <section className="section-space bg-brand-cream text-center">
        <div className="container-brand flex flex-col items-center"><p className="eyebrow text-brand-emerald">For your shelves, too</p><h2 className="font-display mt-4 max-w-3xl text-5xl leading-[0.96] tracking-[-0.05em] sm:text-7xl">Grow with Euckays.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-brand-black/65 sm:text-base">Bring thoughtful, Nigerian-made haircare and skincare to your store, salon or community.</p><Link href="/vendor" className="button-primary mt-8">Explore wholesale <span aria-hidden="true">↗</span></Link></div>
      </section>
    </div>
  );
}
