import Image from "next/image";
import Link from "next/link";
import { CartIndicator } from "./CartIndicator";
import { MobileMenu, SearchMenu } from "./HeaderControls";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=HAIRCARE", label: "Haircare" },
  { href: "/shop?category=SKINCARE", label: "Skincare" },
  { href: "/about", label: "Our story" },
  { href: "/vendor", label: "Become a vendor" },
];

const ANNOUNCEMENT = "Nationwide delivery across Nigeria · Made with ingredients from our own farms";

export function Header() {
  return (
    <header className="site-header sticky top-0 z-40 bg-white">
      <div className="announcement-bar overflow-hidden py-2 text-[0.68rem] font-normal tracking-[0.1em] text-brand-white sm:text-xs">
        <div className="announcement-track">
          <span>{ANNOUNCEMENT}</span>
          <span aria-hidden="true">{ANNOUNCEMENT}</span>
        </div>
      </div>
      <div className="container-brand grid h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-4 sm:h-[84px]">
        <div className="flex items-center">
          <MobileMenu links={NAV_LINKS} />
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="nav-link text-[0.78rem] font-normal tracking-[0.04em]">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link href="/" className="brand-mark flex items-center" aria-label="Euckays home">
          <Image src="/images/logo/euckays-logo.png" alt="Euckays Industries" width={758} height={258} priority className="h-9 w-auto sm:h-11" />
        </Link>

        <div className="flex items-center justify-end gap-1 sm:gap-3">
          <SearchMenu />
          <CartIndicator />
        </div>
      </div>
    </header>
  );
}
