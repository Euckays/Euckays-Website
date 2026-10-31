import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <div className="container-brand max-w-3xl py-16">
      <h1 className="font-display text-3xl text-brand-black">Privacy Policy</h1>
      <p className="mt-2 text-xs text-brand-black/45">
        Placeholder policy &mdash; replace with content reviewed by a Nigerian legal
        professional (NDPR-compliant) before launch.
      </p>
      <div className="mt-6 space-y-4 text-sm text-brand-black/70">
        <p>
          Euckays Industries LTD (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects personal
          information such as your name, email, phone number and delivery address when you
          place an order, create an account, or contact us.
        </p>
        <p>
          We use this information to process orders, deliver products, communicate with you,
          and improve our services. We do not sell your personal information to third parties.
        </p>
        <p>
          Payment information is processed securely by our payment partner (Paystack) and is
          not stored on our servers.
        </p>
        <p>
          You may request access to, correction of, or deletion of your personal data by
          contacting us via the Contact page.
        </p>
      </div>
    </div>
  );
}
