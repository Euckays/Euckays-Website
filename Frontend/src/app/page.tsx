import Image from "next/image";
import Link from "next/link";
import { getActiveProducts } from "@/lib/api";
import { formatNaira } from "@/lib/money";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { HomeProductCard } from "@/components/home/HomeProductCard";
import { ProductTabs } from "@/components/home/ProductTabs";

const INGREDIENTS = ["Raw honey", "Turmeric", "Aloe vera", "Shea butter", "Castor oil", "Moringa"];

// Products shown under "Our icons" and in the featured collection, picked by their web address.
const ICON_SLUGS = ["honey-turmeric-black-soap", "glow-brightening-oil", "regrow-hair-growth-oil", "haircare-bundle"];
const COLLECTION_SLUGS = ["honey-turmeric-black-soap", "glow-brightening-oil", "skincare-bundle"];

const CATEGORIES = [
  { label: "Skincare", href: "/shop?category=SKINCARE", image: "/images/product/Image1.jpeg", position: "50% 32%", zoom: true },
  { label: "Haircare", href: "/shop?category=HAIRCARE", image: "/images/product/image3.jpeg", position: "50% 55%" },
  { label: "Bundles", href: "/shop?q=bundle", image: "/images/product/image6.jpeg", position: "55% 50%" },
  { label: "Soaps", href: "/shop?q=soap", image: "/images/product/image5.jpeg", position: "50% 45%" },
  { label: "Oils", href: "/shop?q=oil", image: "/images/product/image2.jpeg", position: "50% 40%", zoom: true },
];

export default async function Home() {
  const products = await getActiveProducts();
  const bySlug = new Map(products.map((product) => [product.slug, product]));
  const pick = (slugs: string[]) => slugs.map((slug) => bySlug.get(slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const bundle = bySlug.get("haircare-bundle");
  const soap = bySlug.get("honey-turmeric-black-soap");
  const bundleSaving = bundle?.compareAtPrice ? bundle.compareAtPrice - bundle.price : 0;
  const soapSaving = soap?.compareAtPrice ? soap.compareAtPrice - soap.price : 0;

  return (
    <div className="bg-white">
      {/* 2. Large split banner */}
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[360px] sm:min-h-[480px] lg:min-h-[680px]">
          <Image src="/images/product/image6.jpeg" alt="The Euckays haircare and skincare range" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[55%_50%]" />
        </div>
        <div className="flex items-center px-6 py-16 sm:px-14 lg:px-20 xl:px-28">
          <div className="max-w-md">
            <p className="text-sm leading-7 text-brand-black/65">
              Haircare and skincare made in Nigeria, with the honey, turmeric, aloe and shea we grow and source ourselves.
            </p>
            <h1 className="font-display mt-6 text-5xl font-light leading-[1.05] tracking-[-0.02em] sm:text-6xl xl:text-7xl">Care that starts at the farm</h1>
            <Link href="/shop" className="text-link mt-9 inline-flex">Shop now <ArrowUpRight /></Link>
          </div>
        </div>
      </section>

      {/* 3. Ingredient strip (one brand, so the logo row shows what goes into the products) */}
      <section className="border-b border-brand-sand/70 py-14 sm:py-16">
        <div className="container-brand">
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:justify-between">
            {INGREDIENTS.map((name) => (
              <li key={name} className="font-display text-xl font-light text-brand-black/55 sm:text-2xl">{name}</li>
            ))}
          </ul>
          <p className="mt-9 text-center">
            <Link href="/farm-to-beauty" className="text-link">View all ingredients <ArrowUpRight /></Link>
          </p>
        </div>
      </section>

      {/* 4. Tabbed products */}
      <section className="py-20 sm:py-28">
        <div className="container-brand">
          <ProductTabs
            tabs={[
              { id: "new", label: "New arrivals", products: products.slice(0, 4) },
              { id: "icons", label: "Our icons", products: pick(ICON_SLUGS) },
            ]}
          />
        </div>
      </section>

      {/* 5. Circular categories */}
      <section className="pb-20 sm:pb-28">
        <div className="container-brand">
          <h2 className="mb-12 text-center font-display text-4xl font-light sm:text-5xl">Shop categories</h2>
          <ul className="-mx-5 flex gap-7 overflow-x-auto px-5 pb-2 sm:mx-0 sm:justify-center sm:gap-12 sm:px-0 [scrollbar-width:none]">
            {CATEGORIES.map((category) => (
              <li key={category.label} className="shrink-0">
                <Link href={category.href} className="group flex w-[118px] flex-col items-center gap-4 sm:w-[170px]">
                  <span className="relative block aspect-square w-full overflow-hidden rounded-full bg-[#f4f2ed]">
                    <Image src={category.image} alt="" fill sizes="170px" style={{ objectPosition: category.position }} className={`object-cover transition duration-500 group-hover:scale-105 ${category.zoom ? "scale-125" : ""}`} />
                  </span>
                  <span className="text-sm tracking-[0.04em]">{category.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Offers: one tall tile beside two stacked tiles */}
      <section className="bg-[#f7f5ef] py-20 sm:py-28">
        <div className="container-brand">
          <h2 className="font-display text-4xl font-light sm:text-5xl">Don&rsquo;t miss these offers</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Link href="/product/haircare-bundle" className="group relative flex min-h-[440px] items-end overflow-hidden bg-brand-sand lg:min-h-[640px]">
              <Image src="/images/product/image6.jpeg" alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[60%_50%] transition duration-700 group-hover:scale-[1.03]" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5" />
              <span className="relative p-7 text-white sm:p-10">
                <span className="text-xs uppercase tracking-[0.16em] opacity-90">Bundle offer</span>
                <span className="mt-3 block font-display text-4xl font-light leading-tight sm:text-5xl">Complete Haircare Bundle</span>
                <span className="mt-3 block max-w-sm text-sm leading-6 opacity-90">
                  {bundleSaving > 0 && bundle
                    ? `Shampoo, conditioner, hair grease and growth oil together for ${formatNaira(bundle.price)}. You save ${formatNaira(bundleSaving)}.`
                    : "Shampoo, conditioner, hair grease and growth oil together in one set."}
                </span>
                <span className="mt-6 inline-block border-b border-white pb-1 text-xs uppercase tracking-[0.14em]">Shop the bundle</span>
              </span>
            </Link>

            <div className="grid gap-5 lg:grid-rows-2">
              <Link href="/product/honey-turmeric-black-soap" className="grid min-h-[230px] grid-cols-2 bg-[#ece9e1]">
                <span className="flex flex-col justify-center p-6 sm:p-9">
                  <span className="text-xs uppercase tracking-[0.16em] text-brand-black/55">Price drop</span>
                  <span className="mt-3 font-display text-3xl font-light leading-tight">
                    {soap ? `Black soap now ${formatNaira(soap.price)}` : "Honey & Turmeric Black Soap"}
                  </span>
                  {soapSaving > 0 && <span className="mt-2 text-sm text-brand-black/60">Save {formatNaira(soapSaving)}</span>}
                  <span className="mt-5 inline-block self-start border-b border-brand-black pb-1 text-xs uppercase tracking-[0.14em]">Shop now</span>
                </span>
                <span className="relative">
                  <Image src="/images/product/Image1.jpeg" alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-contain p-5 mix-blend-multiply" />
                </span>
              </Link>
              <Link href="/legal/delivery-policy" className="grid min-h-[230px] grid-cols-2 bg-[#e9eddf]">
                <span className="relative">
                  <Image src="/images/product/image 4.jpeg" alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-[50%_55%]" />
                </span>
                <span className="flex flex-col justify-center p-6 sm:p-9">
                  <span className="text-xs uppercase tracking-[0.16em] text-brand-black/55">Delivery</span>
                  <span className="mt-3 font-display text-3xl font-light leading-tight">Delivered across Nigeria</span>
                  <span className="mt-5 inline-block self-start border-b border-brand-black pb-1 text-xs uppercase tracking-[0.14em]">See delivery</span>
                </span>
              </Link>
            </div>
          </div>
          <p className="mt-12 text-center">
            <Link href="/shop" className="button-outline">View offer</Link>
          </p>
        </div>
      </section>

      {/* 7. Centred beauty campaign */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="relative aspect-[16/9] overflow-hidden bg-[#f4f2ed]">
            <Image src="/images/editorial/botanical-ritual-hero.webp" alt="Amber bottles with aloe, turmeric and shea butter" fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover object-[70%_50%]" />
          </div>
          <div className="mx-auto mt-10 max-w-xl text-center">
            <h2 className="font-display text-3xl font-light leading-tight sm:text-4xl">From our farms to your daily routine</h2>
            <p className="mt-4 text-sm leading-7 text-brand-black/65">
              We grow and source the ingredients, then turn them into hair and skin care made for everyday use.
            </p>
            <Link href="/farm-to-beauty" className="button-outline mt-8">Explore farm-to-beauty</Link>
          </div>
        </div>
      </section>

      {/* 8. Featured collection: tall image, intro and three products */}
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[420px] lg:min-h-full">
          <Image src="/images/editorial/botanical-ingredients.webp" alt="Honey, turmeric and shea butter beside amber bottles" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[76%_50%]" />
        </div>
        <div className="bg-[#f7f5ef] px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
          <h2 className="font-display text-4xl font-light leading-tight sm:text-5xl">The skincare edit</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10">
            <div className="col-span-2 sm:col-span-1">
              <p className="max-w-xs text-sm leading-7 text-brand-black/65">
                Cleanse with honey and turmeric, then brighten with an oil made for everyday use.
              </p>
              <Link href="/shop?category=SKINCARE" className="text-link mt-6 inline-flex">Shop now <ArrowUpRight /></Link>
            </div>
            {pick(COLLECTION_SLUGS).map((product) => (
              <HomeProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Signup banner */}
      <Link href="/vendor" className="group block bg-[#f1ece0]">
        <div className="container-brand flex items-center justify-between gap-8 py-16 sm:py-24">
          <div>
            <h2 className="font-display text-4xl font-light leading-tight sm:text-6xl">Become a Euckays vendor</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-brand-black/65">
              Salons, pharmacies and shops across Nigeria can stock Euckays. Apply in a few minutes.
            </p>
          </div>
          <span className="shrink-0 text-brand-emerald transition group-hover:translate-x-1 group-hover:-translate-y-1">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className="h-14 w-14 sm:h-24 sm:w-24" aria-hidden="true">
              <path d="M4 12 12 4M5.5 4H12v6.5" />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
}
