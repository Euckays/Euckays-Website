import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { title: "Explore", items: [
    { href: "/shop", label: "Shop all" },
    { href: "/shop?category=HAIRCARE", label: "Haircare" },
    { href: "/shop?category=SKINCARE", label: "Skincare" },
    { href: "/farm-to-beauty", label: "Our approach" },
  ] },
  { title: "Euckays", items: [
    { href: "/about", label: "Our story" },
    { href: "/journal", label: "Journal" },
    { href: "/vendor", label: "Wholesale" },
    { href: "/contact", label: "Contact" },
  ] },
  { title: "Help", items: [
    { href: "/faq", label: "FAQs" },
    { href: "/legal/delivery-policy", label: "Delivery" },
    { href: "/legal/refund-policy", label: "Returns" },
    { href: "/legal/privacy-policy", label: "Privacy" },
    { href: "/legal/terms", label: "Terms" },
  ] },
];

export function Footer() {
  return (
    <footer className="bg-brand-emerald text-brand-white">
      <div className="container-brand grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.55fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow text-brand-lime">From our roots to yours</p>
          <h2 className="font-display mt-5 max-w-xl text-5xl leading-[0.96] tracking-[-0.045em] sm:text-6xl">A little more nature in every day.</h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-brand-white/75">Considered care for your hair and skin, made with an appreciation for the ingredients and people behind every ritual.</p>
          <Link href="/shop" className="footer-cta mt-8 inline-flex items-center gap-3 border-b border-brand-white pb-2 text-xs font-semibold uppercase tracking-[0.15em]">Explore the collection <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="eyebrow text-brand-lime">{group.title}</h3>
              <ul className="mt-5 space-y-3.5 text-sm text-brand-white/75">
                {group.items.map((item) => <li key={item.href}><Link href={item.href} className="transition hover:text-brand-white">{item.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-brand-white/20">
        <div className="container-brand flex flex-col gap-3 py-5 text-xs text-brand-white/65 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex w-fit items-center rounded-full bg-brand-cream px-4 py-2"><Image src="/images/logo/euckays-logo.png" alt="Euckays Industries" width={758} height={258} className="h-7 w-auto" /></span>
          <span>Made with care in Nigeria.</span>
          <span>© {new Date().getFullYear()} Euckays Industries LTD.</span>
        </div>
      </div>
    </footer>
  );
}
