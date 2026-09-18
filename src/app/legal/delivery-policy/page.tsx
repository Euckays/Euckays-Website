import type { Metadata } from "next";

export const metadata: Metadata = { title: "Delivery Policy" };

export default function DeliveryPolicyPage() {
  return (
    <div className="container-brand max-w-3xl py-16">
      <h1 className="font-display text-3xl text-brand-black">Delivery Policy</h1>
      <p className="mt-2 text-xs text-brand-black/45">
        Placeholder policy &mdash; update delivery timelines and fees to match Euckays&rsquo;
        actual logistics partners.
      </p>
      <div className="mt-6 space-y-4 text-sm text-brand-black/70">
        <p>We deliver nationwide across Nigeria. Delivery fees are calculated based on your state at checkout.</p>
        <p>
          Estimated delivery times are 2-7 business days depending on location, though delays
          may occur due to circumstances beyond our control.
        </p>
        <p>
          You will receive order status updates as your order moves through Processing,
          Ready for Dispatch, Shipped and Delivered.
        </p>
      </div>
    </div>
  );
}
