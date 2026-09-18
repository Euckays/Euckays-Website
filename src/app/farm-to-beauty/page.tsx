import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Approach",
  description: "Discover the Euckays Farm-to-Beauty approach, from agricultural ingredients to considered haircare and skincare.",
};

const JOURNEY = [
  ["01", "Grow & source", "We grow and work with local suppliers to find botanical ingredients with a purpose."],
  ["02", "Prepare", "Raw materials are harvested, selected and prepared for the next stage."],
  ["03", "Process", "Ingredients are cleaned, extracted and refined for use in our formulas."],
  ["04", "Formulate", "We bring ingredients together in haircare and skincare formulations."],
  ["05", "Bottle", "Finished products are packaged for your everyday routine."],
  ["06", "Make it yours", "The journey reaches your shelf, ready for a moment of care."],
];

export default function FarmToBeautyPage() {
  return (
    <div>
      <section className="grid bg-brand-lime lg:grid-cols-2">
        <div className="flex min-h-[420px] items-center px-6 py-16 sm:px-12 lg:px-[min(8vw,8rem)]"><div className="max-w-xl"><p className="eyebrow text-brand-emerald">The Euckays approach</p><h1 className="font-display mt-5 text-6xl leading-[.9] tracking-[-.055em] sm:text-8xl">From soil to self-care.</h1><p className="mt-7 max-w-md text-base leading-7 text-brand-black/70">Our farm-to-beauty journey connects the ingredients we value to the formulas you use.</p></div></div>
        <div className="relative min-h-[420px] lg:min-h-[650px]"><Image src="/images/editorial/botanical-ritual-hero.webp" alt="Botanical ingredients and amber hair and skin care bottles" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[75%_center]" /></div>
      </section>
      <section className="section-space bg-brand-white"><div className="container-brand"><div className="grid gap-8 lg:grid-cols-[.38fr_.62fr] lg:gap-20"><div><p className="eyebrow text-brand-emerald">The journey</p><h2 className="font-display mt-4 text-5xl leading-[.98]">Thoughtful at every step.</h2></div><p className="max-w-2xl text-base leading-8 text-brand-black/70">We believe knowing where ingredients come from matters. Our process follows them from agricultural origins through preparation, formulation and the finished product.</p></div><ol className="mt-14 grid border-l border-t border-brand-sand sm:grid-cols-2 lg:grid-cols-3">{JOURNEY.map(([number,title,description]) => <li key={number} className="min-h-[230px] border-b border-r border-brand-sand p-6 sm:p-8"><span className="font-display text-3xl text-brand-earth">{number}</span><h3 className="font-display mt-7 text-3xl">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-brand-black/65">{description}</p></li>)}</ol></div></section>
      <section className="section-space bg-brand-cream"><div className="container-brand grid gap-10 lg:grid-cols-2 lg:gap-24"><div><p className="eyebrow text-brand-emerald">Our ingredients</p><h2 className="font-display mt-4 text-5xl leading-[.98] sm:text-6xl">The beauty of what grows here.</h2></div><div><p className="text-base leading-8 text-brand-black/70">Moringa, aloe vera, neem, shea butter, castor oil and turmeric are among the ingredients that inspire our formulations. Each brings something distinct to the care we create.</p><Link href="/shop" className="text-link mt-8">Explore the collection ↗</Link></div></div></section>
    </div>
  );
}
