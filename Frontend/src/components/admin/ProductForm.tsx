"use client";

import { useActionState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { ProductFormState } from "@/app/admin/(dashboard)/products/actions";

type ProductDefaults = {
  name: string;
  slug: string;
  category: "HAIRCARE" | "SKINCARE";
  price: number;
  compareAtPrice: number | null;
  shortDescription: string;
  description: string;
  keyBenefits: string[];
  keyIngredients: string[];
  howToUse: string;
  suitableFor: string;
  size: string;
  cautionInfo: string | null;
  stock: number;
  isActive: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  images: string[];
};

const EMPTY_DEFAULTS: ProductDefaults = {
  name: "",
  slug: "",
  category: "HAIRCARE",
  price: 0,
  compareAtPrice: null,
  shortDescription: "",
  description: "",
  keyBenefits: [],
  keyIngredients: [],
  howToUse: "",
  suitableFor: "",
  size: "",
  cautionInfo: null,
  stock: 0,
  isActive: true,
  seoTitle: null,
  seoDescription: null,
  images: [],
};

export function ProductForm({
  action,
  defaults = EMPTY_DEFAULTS,
  submitLabel = "Save Product",
}: {
  action: (prevState: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  defaults?: ProductDefaults;
  submitLabel?: string;
}) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-brand-sand bg-brand-white p-6 sm:grid-cols-2">
        <label className="field">
          <span>Product Name</span>
          <input name="name" required defaultValue={defaults.name} className="input" />
        </label>
        <label className="field">
          <span>Slug (URL)</span>
          <input name="slug" required defaultValue={defaults.slug} className="input" />
        </label>
        <label className="field">
          <span>Category</span>
          <select name="category" defaultValue={defaults.category} className="input">
            <option value="HAIRCARE">Haircare</option>
            <option value="SKINCARE">Skincare</option>
          </select>
        </label>
        <label className="field">
          <span>Size (e.g. 100ml)</span>
          <input name="size" required defaultValue={defaults.size} className="input" />
        </label>
        <label className="field">
          <span>Price (₦)</span>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={defaults.price}
            className="input"
          />
        </label>
        <label className="field">
          <span>Compare-at Price (₦, optional)</span>
          <input
            name="compareAtPrice"
            type="number"
            step="0.01"
            min="0"
            defaultValue={defaults.compareAtPrice ?? ""}
            className="input"
          />
        </label>
        <label className="field">
          <span>Stock</span>
          <input
            name="stock"
            type="number"
            min="0"
            required
            defaultValue={defaults.stock}
            className="input"
          />
        </label>
        <label className="field flex-row items-center gap-2 self-end">
          <input
            name="isActive"
            type="checkbox"
            value="true"
            defaultChecked={defaults.isActive}
            className="h-4 w-4"
          />
          <span>Visible in shop</span>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-brand-sand bg-brand-white p-6">
        <label className="field">
          <span>Short Description</span>
          <textarea
            name="shortDescription"
            required
            rows={2}
            defaultValue={defaults.shortDescription}
            className="input resize-none"
          />
        </label>
        <label className="field">
          <span>Full Description</span>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={defaults.description}
            className="input resize-none"
          />
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="field">
            <span>Key Benefits (one per line)</span>
            <textarea
              name="keyBenefits"
              rows={4}
              defaultValue={defaults.keyBenefits.join("\n")}
              className="input resize-none"
            />
          </label>
          <label className="field">
            <span>Key Ingredients (one per line)</span>
            <textarea
              name="keyIngredients"
              rows={4}
              defaultValue={defaults.keyIngredients.join("\n")}
              className="input resize-none"
            />
          </label>
        </div>
        <label className="field">
          <span>How To Use</span>
          <textarea
            name="howToUse"
            required
            rows={2}
            defaultValue={defaults.howToUse}
            className="input resize-none"
          />
        </label>
        <label className="field">
          <span>Suitable For</span>
          <input name="suitableFor" required defaultValue={defaults.suitableFor} className="input" />
        </label>
        <label className="field">
          <span>Caution / Safety Info (optional)</span>
          <textarea
            name="cautionInfo"
            rows={2}
            defaultValue={defaults.cautionInfo ?? ""}
            className="input resize-none"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-brand-sand bg-brand-white p-6">
        <ImageUploader defaultUrls={defaults.images} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="field">
            <span>SEO Title (optional)</span>
            <input name="seoTitle" defaultValue={defaults.seoTitle ?? ""} className="input" />
          </label>
          <label className="field">
            <span>SEO Description (optional)</span>
            <input
              name="seoDescription"
              defaultValue={defaults.seoDescription ?? ""}
              className="input"
            />
          </label>
        </div>
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-full bg-brand-gold px-7 py-3 text-sm font-semibold uppercase tracking-wide text-brand-black hover:bg-brand-gold-light disabled:opacity-50"
      >
        {isPending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
