import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Euckays Industries products, delivery, payment and vendor opportunities.",
};

const FAQS = [
  {
    q: "Where do Euckays products come from?",
    a: "Euckays Industries LTD is a Nigerian Farm-to-Beauty company. Our products are formulated using ingredients we grow and source through our agricultural value chain.",
  },
  {
    q: "How long does delivery take?",
    a: "Delivery typically takes 2-7 business days depending on your location within Nigeria. Delivery fees are calculated based on your state at checkout.",
  },
  {
    q: "How do I place an order?",
    a: "Browse our Shop, add products to your cart, and proceed to checkout. You can pay securely online, and guest checkout is available.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept secure online payments via Paystack, including cards and bank transfer.",
  },
  {
    q: "Are your products suitable for sensitive skin?",
    a: "Most of our products are formulated for general use, but we recommend patch testing before first use. Each product page lists suitable users and caution information.",
  },
  {
    q: "How do I use your products?",
    a: "Every product page includes a How to Use section with detailed usage instructions and key ingredients.",
  },
  {
    q: "Can I become an Euckays vendor?",
    a: "Yes. Salons, pharmacies, retailers and distributors can apply on our Become a Vendor page.",
  },
  {
    q: "How do I contact customer support?",
    a: "Reach us via the Contact page, email, or the WhatsApp button available throughout the website.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-brand py-16 sm:py-24">
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-brand-emerald">Help</p>
        <h1 className="font-display mt-4 text-5xl leading-[.96] text-brand-black sm:text-7xl">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {FAQS.map((item) => (
          <details
            key={item.q}
            className="group border-b border-brand-sand bg-brand-white p-5"
          >
            <summary className="cursor-pointer list-none font-medium text-brand-black marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {item.q}
                <span className="shrink-0 text-brand-emerald transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm text-brand-black/70">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
