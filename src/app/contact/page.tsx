import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send Euckays a message about products, orders or wholesale opportunities.",
};

export default function ContactPage() {
  return (
    <div className="section-space bg-brand-cream"><div className="container-brand grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
      <div><p className="eyebrow text-brand-emerald">Get in touch</p><h1 className="font-display mt-4 text-6xl leading-[.94] tracking-[-.05em] sm:text-7xl">We’d love to hear from you.</h1><p className="mt-6 max-w-md text-sm leading-7 text-brand-black/65">Have a question about a product, your order or working together? Send us a note and our team will be in touch.</p><div className="mt-10 border-t border-brand-sand pt-7"><p className="eyebrow text-brand-emerald">Interested in wholesale?</p><Link href="/vendor" className="text-link mt-4">Explore partnerships ↗</Link></div></div>
      <div className="border border-brand-sand bg-brand-white p-6 sm:p-10"><h2 className="font-display mb-6 text-3xl">Send a message</h2><ContactForm /></div>
    </div></div>
  );
}
