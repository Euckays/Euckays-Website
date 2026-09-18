import Link from "next/link";
import { formatNaira } from "@/lib/money";

type Props = {
  product: {
    slug: string;
    name: string;
    price: number;
    compareAtPrice: number | null;
    shortDescription: string;
    category: string;
    stock: number;
    images?: { url: string; altText: string }[];
  };
};

export function ProductCard({ product }: Props) {
  const image = product.images?.[0];
  const outOfStock = product.stock <= 0;
  const category = product.category === "HAIRCARE" ? "Haircare" : "Skincare";

  return (
    <Link href={`/product/${product.slug}`} className="product-card group flex min-w-0 flex-col text-brand-black">
      <div className="relative aspect-[4/4.35] overflow-hidden bg-brand-lime">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.url} alt={image.altText} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
        ) : <div className="h-full w-full bg-brand-lime" />}
        {outOfStock && <span className="absolute inset-0 flex items-center justify-center bg-brand-black/65 font-display text-3xl text-white">Coming back soon</span>}
      </div>
      <div className="flex flex-1 flex-col py-4">
        <p className="eyebrow text-brand-emerald">{category}</p>
        <div className="mt-2 flex items-start justify-between gap-2">
          <h3 className="font-display text-[1.65rem] font-medium leading-[1.05] sm:text-[1.9rem]">{product.name}</h3>
          <span className="mt-0.5 text-lg text-brand-emerald transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
        </div>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-brand-black/60 sm:text-sm">{product.shortDescription}</p>
        <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-5 text-sm font-semibold">
          <span>{formatNaira(product.price)}</span>
          {product.compareAtPrice && <span className="text-xs font-normal text-brand-black/45 line-through">{formatNaira(product.compareAtPrice)}</span>}
        </div>
      </div>
    </Link>
  );
}
