import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="container-brand max-w-3xl py-16">
      <h1 className="font-display text-3xl text-brand-black">Terms &amp; Conditions</h1>
      <p className="mt-2 text-xs text-brand-black/45">
        Placeholder terms &mdash; replace with content reviewed by a Nigerian legal
        professional before launch.
      </p>
      <div className="mt-6 space-y-4 text-sm text-brand-black/70">
        <p>
          By using this website and placing an order, you agree to these Terms &amp;
          Conditions. All product descriptions, pricing and availability are subject to change
          without notice.
        </p>
        <p>
          Orders are confirmed once payment is received. Euckays Industries LTD reserves the
          right to cancel or refuse any order at its discretion.
        </p>
        <p>
          Product images are for illustration; actual packaging may vary slightly. Please read
          each product page carefully, including caution and safety information, before use.
        </p>
      </div>
    </div>
  );
}
