import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

const COLUMNS = [
  {
    title: "Customer care",
    items: [
      { href: "/contact", label: "Contact us" },
      { href: "/faq", label: "FAQs" },
      { href: "/legal/delivery-policy", label: "Delivery" },
      { href: "/legal/refund-policy", label: "Returns" },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/about", label: "Our story" },
      { href: "/farm-to-beauty", label: "Our approach" },
      { href: "/vendor", label: "Become a vendor" },
      { href: "/legal/privacy-policy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
    ],
  },
  {
    title: "Discover",
    items: [
      { href: "/shop", label: "Shop all" },
      { href: "/shop?category=HAIRCARE", label: "Haircare" },
      { href: "/shop?category=SKINCARE", label: "Skincare" },
      { href: "/journal", label: "Journal" },
    ],
  },
];

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

// A social icon appears only when its address is set, so no icon ever leads nowhere.
const SOCIALS = [
  { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL, paths: ["M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z", "M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z", "M17.3 6.7h.01"] },
  { label: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL, paths: ["M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.4l.6-3.5h-3V8.8c0-.2.2-.3.4-.3Z"] },
  { label: "TikTok", href: process.env.NEXT_PUBLIC_TIKTOK_URL, paths: ["M14 3v10.2a3.2 3.2 0 1 1-3.2-3.2", "M14 3c.4 2.3 1.9 3.9 4.2 4.2"] },
  { label: "WhatsApp", href: whatsapp ? `https://wa.me/${whatsapp}` : undefined, paths: ["M4 20l1.2-4.1A8 8 0 1 1 8.2 19L4 20Z", "M9 9.2c.3 2.6 2.4 4.7 5 5.3l1.2-1.3-1.9-1-.8.7c-.9-.4-1.6-1.1-2-2l.7-.8-1-1.9L9 9.2Z"] },
].filter((social) => social.href);

export function Footer() {
  return (
    <footer className="bg-[#1d2723] text-white">
      <div className="container-brand grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.35fr_2fr] lg:gap-24">
        <div>
          <h2 className="font-display text-4xl font-light leading-tight sm:text-5xl">Join the Euckays community</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
            New products, offers and everyday care tips, sent a few times a month. Unsubscribe whenever you like.
          </p>
          <div className="mt-8 max-w-lg">
            <NewsletterForm />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-white/90">{column.title}</h3>
              <ul className="mt-5 space-y-3.5 text-sm text-white/60">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition hover:text-white">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-brand flex flex-col gap-6 py-7 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <p>© {new Date().getFullYear()} Euckays Industries LTD. All rights reserved.</p>
            <p>A Nigerian farm-to-beauty company. Nationwide delivery across Nigeria.</p>
          </div>
          <div className="flex items-center gap-6">
            <span className="uppercase tracking-[0.14em]">Nigeria</span>
            {SOCIALS.length > 0 && (
              <ul className="flex items-center gap-3">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition hover:border-white hover:text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
                        {social.paths.map((d) => <path key={d} d={d} />)}
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
