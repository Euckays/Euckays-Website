import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty & Farm Journal",
  description: "Stories on haircare, skincare, agriculture and the Euckays Farm-to-Beauty journey.",
};

export default function JournalPage() {
  return (
    <div className="container-brand flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-brand-emerald">Beauty & Farm Journal</p>
      <h1 className="font-display text-3xl text-brand-black sm:text-4xl">Coming Soon</h1>
      <p className="max-w-xl text-brand-black/65">
        We&rsquo;re preparing stories on haircare, skincare, agriculture, Farm-to-Beauty and the
        Euckays founder journey. Check back soon.
      </p>
    </div>
  );
}
