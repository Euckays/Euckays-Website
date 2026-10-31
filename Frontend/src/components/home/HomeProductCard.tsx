"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/money";
import type { Product } from "@/lib/api-types";

const NEW_WINDOW_MS = 1000 * 60 * 60 * 24 * 60;

function badgeFor(product: Product, now: number) {
  if (product.stock <= 0) return "Sold out";
  if (product.compareAtPrice && product.compareAtPrice > product.price) {
    return `Save ${Math.round((1 - product.price / product.compareAtPrice) * 100)}%`;
  }
  if (now - new Date(product.createdAt).getTime() < NEW_WINDOW_MS) return "New";
  return null;
}

export function HomeProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [now] = useState(() => Date.now());
  const image = product.images[0];
  const soldOut = product.stock <= 0;
  const badge = badgeFor(product, now);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(timer);
  }, [added]);

  function handleAdd() {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: image?.url ?? null,
        size: product.size,
        stock: product.stock,
      },
      1
    );
    setAdded(true);
  }

  return (
    <article className="flex min-w-0 flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f2ed]">
        <Link href={`/product/${product.slug}`} className="block h-full w-full" aria-label={product.name}>
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image.url} alt={image.altText} className="h-full w-full object-contain p-5 mix-blend-multiply transition duration-500 hover:scale-[1.03] sm:p-7" />
          ) : null}
        </Link>
        {badge && (
          <span className="pointer-events-none absolute left-3 top-3 bg-white px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-brand-emerald">
            {badge}
          </span>
        )}
        <button
          type="button"
          onClick={handleAdd}
          disabled={soldOut}
          aria-label={added ? `${product.name} added to bag` : `Add ${product.name} to bag`}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-black transition hover:text-brand-emerald disabled:opacity-40"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            {added ? <path d="m5 12.5 4.5 4.5L19 7.5" /> : <path d="M4 8h16l-1.1 12H5.1L4 8Zm4 1V6a4 4 0 0 1 8 0v3" />}
          </svg>
        </button>
      </div>
      <div className="pt-4">
        <p className="text-[0.68rem] font-normal uppercase tracking-[0.14em] text-brand-black/50">Euckays</p>
        <h3 className="mt-1.5 text-[0.95rem] font-normal leading-snug">
          <Link href={`/product/${product.slug}`} className="hover:text-brand-emerald">{product.name}</Link>
        </h3>
        <p className="mt-2 text-sm">
          <span>{formatNaira(product.price)}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="ml-2 text-xs text-brand-black/45 line-through">{formatNaira(product.compareAtPrice)}</span>
          )}
        </p>
      </div>
    </article>
  );
}
