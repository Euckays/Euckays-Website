"use client";

import Link from "next/link";
import { useState } from "react";
import { HomeProductCard } from "./HomeProductCard";
import type { Product } from "@/lib/api-types";

type Tab = { id: string; label: string; products: Product[] };

export function ProductTabs({ tabs }: { tabs: Tab[] }) {
  const visible = tabs.filter((tab) => tab.products.length > 0);
  const [activeId, setActiveId] = useState(visible[0]?.id);
  const active = visible.find((tab) => tab.id === activeId) ?? visible[0];

  if (!active) {
    return <p className="py-10 text-center text-sm text-brand-black/60">Our collection is growing. Please check back soon.</p>;
  }

  return (
    <div>
      <div role="tablist" aria-label="Product groups" className="mb-10 flex justify-center gap-10 border-b border-brand-sand">
        {visible.map((tab) => {
          const selected = tab.id === active.id;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveId(tab.id)}
              className={`-mb-px border-b-2 px-1 pb-4 text-sm tracking-[0.04em] transition ${
                selected ? "border-brand-black text-brand-black" : "border-transparent text-brand-black/50 hover:text-brand-black"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`} className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {active.products.map((product) => (
          <HomeProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-14 text-center">
        <Link href="/shop" className="button-outline">View all</Link>
      </div>
    </div>
  );
}
