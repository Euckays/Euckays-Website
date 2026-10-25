"use server";

import { redirect } from "next/navigation";
import { refresh } from "next/cache";
import { adminRequest } from "@/lib/admin-session";

export type ProductFormState = { error?: string };

const PRODUCT_FIELDS = [
  "name",
  "slug",
  "category",
  "price",
  "compareAtPrice",
  "shortDescription",
  "description",
  "keyBenefits",
  "keyIngredients",
  "howToUse",
  "suitableFor",
  "size",
  "cautionInfo",
  "stock",
  "isActive",
  "seoTitle",
  "seoDescription",
  "images",
] as const;

// The backend validates and normalises the form values (numbers, newline lists, the checkbox).
function productFromForm(formData: FormData) {
  const product: Record<string, string> = {};
  for (const field of PRODUCT_FIELDS) {
    const value = formData.get(field);
    if (typeof value === "string") product[field] = value;
  }
  return product;
}

export async function createProduct(_prevState: ProductFormState, formData: FormData): Promise<ProductFormState> {
  const result = await adminRequest("/admin/products", { method: "POST", body: productFromForm(formData) });
  if (!result.ok) return { error: result.error };
  redirect("/admin/products");
}

export async function updateProduct(
  productId: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const result = await adminRequest(`/admin/products/${encodeURIComponent(productId)}`, {
    method: "PUT",
    body: productFromForm(formData),
  });
  if (!result.ok) return { error: result.error };
  redirect("/admin/products");
}

export async function deleteProduct(productId: string) {
  const result = await adminRequest(`/admin/products/${encodeURIComponent(productId)}`, { method: "DELETE" });
  if (!result.ok) throw new Error(result.error);
  refresh();
}
