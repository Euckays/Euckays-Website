"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/money";

type Props = { product: { id: string; slug: string; name: string; price: number; stock: number; size: string; images?: { url: string }[] } };

export function AddToCartForm({ product }: Props) {
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock <= 0;
  const cartItem = { productId: product.id, slug: product.slug, name: product.name, price: product.price, image: product.images?.[0]?.url ?? null, size: product.size, stock: product.stock };

  function handleAddToCart() { addItem(cartItem, quantity); setAdded(true); setTimeout(() => setAdded(false), 2000); }
  function handleBuyNow() { addItem(cartItem, quantity); router.push("/checkout"); }

  return (
    <div className="mt-8 border-y border-brand-sand py-7">
      <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xl font-semibold">{formatNaira(product.price)}</span><span className="text-xs text-brand-black/55">{outOfStock ? "Currently unavailable" : `${product.stock} available`}</span></div>
      {!outOfStock && <div className="mt-6 flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[0.12em]">Quantity</span><div className="flex items-center border border-brand-sand bg-brand-white"><button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-4 py-2 text-lg hover:bg-brand-lime" aria-label="Decrease quantity">−</button><span className="w-8 text-center text-sm">{quantity}</span><button type="button" onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} className="px-4 py-2 text-lg hover:bg-brand-lime" aria-label="Increase quantity">+</button></div></div>}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row"><button type="button" disabled={outOfStock} onClick={handleAddToCart} className="button-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40">{added ? "Added to bag ✓" : "Add to bag"}</button><button type="button" disabled={outOfStock} onClick={handleBuyNow} className="button-outline flex-1 disabled:cursor-not-allowed disabled:opacity-40">Buy now</button></div>
    </div>
  );
}
