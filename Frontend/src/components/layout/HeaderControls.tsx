"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavLink = { href: string; label: string };

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-6 w-6",
  "aria-hidden": true,
};

export function MobileMenu({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const toggle = () => setOpenOn(open ? null : pathname);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={toggle}
        className="flex h-10 w-10 items-center justify-center -ml-2"
      >
        <svg {...iconProps}>{open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
      </button>
      {open && (
        <nav className="absolute left-0 top-12 z-50 flex w-[min(20rem,calc(100vw-2.5rem))] flex-col border border-brand-sand bg-white px-5 py-3" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="border-b border-brand-sand/70 py-4 text-sm last:border-0">
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="py-4 text-sm text-brand-emerald">Contact us</Link>
        </nav>
      )}
    </div>
  );
}

export function SearchMenu() {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const toggle = () => setOpenOn(open ? null : pathname);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Search products"
        aria-expanded={open}
        onClick={toggle}
        className="flex h-10 w-10 items-center justify-center transition hover:text-brand-emerald"
      >
        <svg {...iconProps}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </svg>
      </button>
      {open && (
        <form action="/shop" role="search" className="absolute right-0 top-12 z-50 flex w-[min(22rem,calc(100vw-2.5rem))] border border-brand-sand bg-white">
          <label htmlFor="header-search" className="sr-only">Search products</label>
          <input id="header-search" type="search" name="q" autoFocus placeholder="Search products" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-brand-black/45" />
          <button type="submit" className="px-4 text-xs font-medium uppercase tracking-[0.12em] text-brand-emerald">Search</button>
        </form>
      )}
    </div>
  );
}
