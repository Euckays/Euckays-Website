import Link from "next/link";
import { CartIndicator } from "./CartIndicator";

const NAV_LINKS = [
  { href: "/shop", label: "Shop all" },
  { href: "/shop?category=HAIRCARE", label: "Haircare" },
  { href: "/shop?category=SKINCARE", label: "Skincare" },
  { href: "/farm-to-beauty", label: "Our approach" },
  { href: "/about", label: "Our story" },
];

export function Header() {
  return (
    <header className="site-header sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-md">
      <div className="announcement-bar py-2 text-center text-[0.65rem] font-medium tracking-[0.13em] text-brand-white sm:text-xs">
        Rooted in Nigeria. Made for your everyday ritual. <span aria-hidden="true">✳</span> Nationwide delivery
      </div>
      <div className="container-brand flex h-[78px] items-center justify-between gap-4">
        <Link href="/" className="brand-mark flex shrink-0 items-center gap-3" aria-label="Euckays home">
          <span className="brand-symbol flex h-10 w-10 items-center justify-center rounded-full border border-brand-emerald text-xl font-medium italic text-brand-emerald" aria-hidden="true">e.</span>
          <span className="block">
            <span className="block font-display text-[2rem] font-semibold leading-[0.74] tracking-[-0.07em]">euckays</span>
            <span className="mt-1.5 block text-[0.48rem] font-semibold uppercase tracking-[0.33em] text-brand-emerald">farm to beauty</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="nav-link text-[0.72rem] font-medium uppercase tracking-[0.12em]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <form action="/shop" className="hidden xl:block">
            <label htmlFor="header-search" className="sr-only">Search products</label>
            <input id="header-search" type="search" name="q" placeholder="Search the collection" className="header-search w-44 border-b border-brand-sand bg-transparent py-2 text-xs outline-none placeholder:text-brand-black/50 focus:border-brand-emerald" />
          </form>
          <CartIndicator />
          <details className="mobile-menu relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center text-2xl marker:content-none" aria-label="Open menu">
              <span aria-hidden="true">☰</span>
            </summary>
            <nav className="absolute right-0 top-12 flex w-[min(20rem,calc(100vw-2rem))] flex-col border border-brand-sand bg-brand-white p-4 shadow-lg" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className="border-b border-brand-sand/70 px-2 py-3 text-sm last:border-0 hover:text-brand-emerald">{link.label}</Link>
              ))}
              <Link href="/contact" className="mt-3 px-2 py-2 text-sm text-brand-emerald">Contact us ↗</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
