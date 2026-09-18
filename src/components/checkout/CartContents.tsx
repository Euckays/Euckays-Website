"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/money";

export function CartContents() {
  const { items, hydrated, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  if (hydrated && items.length === 0) {
    return (
      <div className="container-brand py-20 text-center sm:py-28">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-emerald">Your bag</p>
        <h1 className="font-display text-5xl text-brand-black sm:text-6xl">Your bag is empty</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-brand-black/60">
          Your next favourite ritual is waiting in the collection.
        </p>
        <Link href="/shop" className="button-primary mt-8">Explore the collection</Link>
      </div>
    );
  }

  return (
    <div className="container-brand py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-9 border-b border-brand-sand pb-7">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-emerald">01 / 03 · Your bag</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-5xl leading-none tracking-[-0.04em] text-brand-black sm:text-6xl">Your bag</h1>
              <p className="mt-3 text-sm text-brand-black/60">
                {hydrated ? `${itemCount} ${itemCount === 1 ? "item" : "items"} ready for your everyday ritual.` : "Review your selection before checkout."}
              </p>
            </div>
            <Link href="/shop" className="text-sm font-medium text-brand-emerald underline underline-offset-4 hover:text-brand-black">
              Continue shopping ↗
            </Link>
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,23rem)] lg:gap-10">
          <section className="min-w-0 border border-brand-sand bg-brand-white px-5 sm:px-7" aria-label="Items in your bag">
            {!hydrated ? (
              <div className="flex min-h-52 flex-col items-center justify-center gap-3 py-7 text-center">
                <p className="font-display text-2xl text-brand-black">Your items are kept in this browser.</p>
                <p className="max-w-sm text-sm text-brand-black/60">If they have not appeared, refresh this page to reconnect your bag.</p>
                <a href="/cart" className="text-sm font-semibold text-brand-emerald underline underline-offset-4">Refresh bag</a>
              </div>
            ) : items.map((item) => (
              <article key={item.productId} className="flex min-w-0 gap-4 border-b border-brand-sand py-6 last:border-b-0 sm:gap-6">
                <div className="h-24 w-24 flex-none overflow-hidden bg-brand-sand sm:h-28 sm:w-28" style={{ width: 112, height: 112, maxWidth: "30%" }}>
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} className="block h-full w-full object-cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link href={`/product/${item.slug}`} className="font-display text-xl leading-tight text-brand-black hover:text-brand-emerald sm:text-2xl">
                        {item.name}
                      </Link>
                      <p className="mt-1 text-xs text-brand-black/50">{item.size}</p>
                    </div>
                    <button type="button" onClick={() => removeItem(item.productId)} className="shrink-0 text-xs text-brand-black/50 underline underline-offset-4 hover:text-red-700">
                      Remove
                    </button>
                  </div>
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div className="inline-flex items-center border border-brand-sand" aria-label={`Quantity of ${item.name}`}>
                      <button type="button" onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="px-3 py-1.5 text-brand-black/70 hover:bg-brand-cream" aria-label={`Decrease quantity of ${item.name}`}>−</button>
                      <span className="w-7 text-center text-sm">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="px-3 py-1.5 text-brand-black/70 hover:bg-brand-cream" aria-label={`Increase quantity of ${item.name}`}>+</button>
                    </div>
                    <span className="text-sm font-semibold text-brand-black">{formatNaira(item.price * item.quantity)}</span>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="border border-brand-sand bg-brand-white p-6 sm:p-7 lg:sticky lg:top-32" aria-label="Order summary">
            <h2 className="font-display text-3xl text-brand-black">Order summary</h2>
            <div className="mt-6 flex justify-between border-t border-brand-sand pt-5 text-sm">
              <span className="text-brand-black/60">Subtotal</span>
              <span className="font-semibold text-brand-black">{hydrated ? formatNaira(subtotal) : "—"}</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-brand-black/55">Delivery is calculated after you enter your location.</p>
            {hydrated ? (
              <Link href="/checkout" prefetch={false} className="button-primary mt-7 flex w-full">Proceed to Checkout <span aria-hidden="true">→</span></Link>
            ) : (
              <span className="button-primary mt-7 flex w-full opacity-50" aria-hidden="true">Proceed to Checkout</span>
            )}
            <p className="mt-3 text-center text-xs text-brand-black/50">Next: delivery details, then secure Paystack payment.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
