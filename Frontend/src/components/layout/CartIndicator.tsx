"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function CartIndicator() {
  const { itemCount } = useCart();
  return (
    <Link href="/cart" prefetch={false} aria-label={`Shopping bag${itemCount ? `, ${itemCount} items` : ""}`} className="relative flex h-10 w-10 items-center justify-center text-brand-black transition hover:text-brand-emerald">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16l-1.1 12H5.1L4 8Zm4 1V6a4 4 0 0 1 8 0v3" />
      </svg>
      {itemCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-emerald px-1 text-[10px] font-semibold text-white">{itemCount}</span>}
    </Link>
  );
}
