"use client";

import { useState, useTransition } from "react";
import { submitVendorApplication } from "@/app/vendor/actions";

const BUSINESS_TYPES = ["Salon", "Pharmacy", "Retail Store", "Distributor", "Beautypreneur", "Other"];

const initialForm = {
  name: "",
  businessName: "",
  phone: "",
  email: "",
  location: "",
  businessType: BUSINESS_TYPES[0],
  productsOfInterest: "",
  expectedVolume: "",
};

export function VendorForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [form, setForm] = useState(initialForm);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await submitVendorApplication(form);
      setStatus(result.success ? "success" : "error");
      if (result.success) setForm(initialForm);
    });
  }

  if (status === "success") {
    return (
      <p className="rounded-xl bg-brand-emerald/10 p-4 text-sm text-brand-emerald">
        Thank you for applying to become an Euckays vendor. Our team will review your
        application and be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <input
        required
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="input"
      />
      <input
        required
        placeholder="Business Name"
        value={form.businessName}
        onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
        className="input"
      />
      <input
        required
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        className="input"
      />
      <input
        required
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        className="input"
      />
      <input
        required
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
        className="input"
      />
      <select
        value={form.businessType}
        onChange={(e) => setForm((f) => ({ ...f, businessType: e.target.value }))}
        className="input"
      >
        {BUSINESS_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <input
        required
        placeholder="Products of Interest"
        value={form.productsOfInterest}
        onChange={(e) => setForm((f) => ({ ...f, productsOfInterest: e.target.value }))}
        className="input sm:col-span-2"
      />
      <input
        placeholder="Expected Order Volume (optional)"
        value={form.expectedVolume}
        onChange={(e) => setForm((f) => ({ ...f, expectedVolume: e.target.value }))}
        className="input sm:col-span-2"
      />
      {status === "error" && (
        <p className="text-sm text-red-600 sm:col-span-2">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-full bg-brand-gold px-7 py-3 text-sm font-semibold uppercase tracking-wide text-brand-black hover:bg-brand-gold-light disabled:opacity-50 sm:col-span-2"
      >
        {isPending ? "Submitting..." : "Apply to Become a Vendor"}
      </button>
    </form>
  );
}
