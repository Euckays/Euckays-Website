import type { Metadata } from "next";

export const metadata: Metadata = { title: "Refund & Return Policy" };

export default function RefundPolicyPage() {
  return (
    <div className="container-brand max-w-3xl py-16">
      <h1 className="font-display text-3xl text-brand-black">Refund &amp; Return Policy</h1>
      <p className="mt-2 text-xs text-brand-black/45">
        Placeholder policy &mdash; replace with Euckays&rsquo; actual return window and
        conditions before launch.
      </p>
      <div className="mt-6 space-y-4 text-sm text-brand-black/70">
        <p>
          Due to the nature of beauty and personal care products, we generally do not accept
          returns of opened items unless the product is defective or incorrect.
        </p>
        <p>
          If you receive a damaged, defective or incorrect item, please contact us within 48
          hours of delivery with photos of the item for a replacement or refund.
        </p>
        <p>Refunds, where approved, are processed back to the original payment method.</p>
      </div>
    </div>
  );
}
