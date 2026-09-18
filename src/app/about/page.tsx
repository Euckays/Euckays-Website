import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Meet Euckays, a Nigerian Farm-to-Beauty company connecting agricultural ingredients with considered hair and skin care.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="grid bg-brand-lime lg:grid-cols-2">
        <div className="flex min-h-[420px] items-center px-6 py-16 sm:px-12 lg:px-[min(8vw,8rem)]">
          <div className="max-w-xl"><p className="eyebrow text-brand-emerald">Our story</p><h1 className="font-display mt-5 text-6xl leading-[0.9] tracking-[-0.055em] sm:text-8xl">Nature is where we begin.</h1><p className="mt-7 max-w-md text-base leading-7 text-brand-black/70">Euckays brings together Nigeria’s agricultural richness and a considered approach to everyday beauty.</p></div>
        </div>
        <div className="relative min-h-[420px] lg:min-h-[650px]"><Image src="/images/editorial/botanical-ingredients.webp" alt="Botanical ingredients and amber bottles in warm natural light" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[72%_center]" /></div>
      </section>
      <section className="section-space bg-brand-white">
        <div className="container-brand grid gap-10 lg:grid-cols-[.38fr_.62fr] lg:gap-20">
          <div><p className="eyebrow text-brand-emerald">From the beginning</p><h2 className="font-display mt-4 text-5xl leading-[.98]">A more thoughtful way to care.</h2></div>
          <div className="space-y-5 text-base leading-8 text-brand-black/70"><p>Euckays Industries LTD began with a belief in the potential of natural, farm-sourced ingredients. What started as small-scale experimentation grew into a Nigerian beauty manufacturing company built on learning, testing and refining.</p><p>Today, we connect agriculture with beauty science, transforming locally grown and sourced ingredients into haircare and skincare products designed for the rituals people return to every day.</p></div>
        </div>
      </section>
      <section className="section-space bg-brand-cream">
        <div className="container-brand"><p className="eyebrow text-brand-emerald">What guides us</p><div className="mt-8 grid gap-8 border-t border-brand-sand pt-8 md:grid-cols-3">
          <div><span className="font-display text-3xl text-brand-earth">01</span><h3 className="font-display mt-4 text-4xl">Agriculture</h3><p className="mt-3 text-sm leading-7 text-brand-black/65">We value the land and the people growing the ingredients at the start of our story.</p></div>
          <div><span className="font-display text-3xl text-brand-earth">02</span><h3 className="font-display mt-4 text-4xl">Beauty science</h3><p className="mt-3 text-sm leading-7 text-brand-black/65">We turn botanical ingredients into considered formulas for hair and skin.</p></div>
          <div><span className="font-display text-3xl text-brand-earth">03</span><h3 className="font-display mt-4 text-4xl">Local possibility</h3><p className="mt-3 text-sm leading-7 text-brand-black/65">We believe Nigerian-made beauty can be imaginative, useful and rooted in its origin.</p></div>
        </div></div>
      </section>
      <section className="section-space bg-brand-emerald text-center text-brand-white"><div className="container-brand flex flex-col items-center"><p className="eyebrow text-brand-lime">Explore our approach</p><h2 className="font-display mt-4 max-w-3xl text-5xl leading-[.95] sm:text-7xl">From the land to your ritual.</h2><Link href="/farm-to-beauty" className="mt-8 inline-flex border-b border-brand-white pb-2 text-xs font-semibold uppercase tracking-[.15em]">Discover farm-to-beauty ↗</Link></div></section>
    </div>
  );
}
