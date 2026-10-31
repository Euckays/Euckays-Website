import type { Metadata } from "next";
import { VendorForm } from "@/components/vendor/VendorForm";

export const metadata: Metadata = {
  title: "Become a Vendor",
  description:
    "Apply to become an Euckays Industries vendor. For salons, pharmacies, retailers and distributors.",
};

export default function VendorPage() {
  return (
    <div className="container-brand py-16 sm:py-24">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className="eyebrow text-brand-emerald">Wholesale</p>
        <h1 className="font-display mt-4 text-5xl leading-[.96] text-brand-black sm:text-7xl">
          Grow with Euckays
        </h1>
        <p className="mt-5 text-sm leading-7 text-brand-black/65">
          We work with salons, pharmacies, retail stores, distributors and beautypreneurs
          across Nigeria. Apply below to bring Farm-to-Beauty products to your customers.
        </p>
      </div>

      <div className="mx-auto max-w-3xl border border-brand-sand bg-brand-white p-6 sm:p-10">
        <VendorForm />
      </div>
    </div>
  );
}
