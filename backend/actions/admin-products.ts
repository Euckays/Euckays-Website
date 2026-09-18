"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@backend/lib/prisma";

const productSchema = z.object({
  name: z.string().trim().min(2),
  slug: z
    .string()
    .trim()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, letters/numbers and hyphens only"),
  category: z.enum(["HAIRCARE", "SKINCARE"]),
  price: z.coerce.number().positive(),
  compareAtPrice: z.coerce.number().positive().optional().or(z.literal("").transform(() => undefined)),
  shortDescription: z.string().trim().min(2),
  description: z.string().trim().min(2),
  keyBenefits: z.string().trim(),
  keyIngredients: z.string().trim(),
  howToUse: z.string().trim().min(2),
  suitableFor: z.string().trim().min(2),
  size: z.string().trim().min(1),
  cautionInfo: z.string().trim().optional(),
  stock: z.coerce.number().int().min(0),
  isActive: z.coerce.boolean().optional().default(false),
  seoTitle: z.string().trim().optional(),
  seoDescription: z.string().trim().optional(),
  images: z.string().trim(),
});

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);
}

export type ProductFormState = { error?: string };

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product details" };
  }
  const data = parsed.data;

  try {
    await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        category: data.category,
        price: data.price,
        compareAtPrice: data.compareAtPrice ?? null,
        shortDescription: data.shortDescription,
        description: data.description,
        keyBenefits: linesToArray(data.keyBenefits),
        keyIngredients: linesToArray(data.keyIngredients),
        howToUse: data.howToUse,
        suitableFor: data.suitableFor,
        size: data.size,
        cautionInfo: data.cautionInfo || null,
        stock: data.stock,
        isActive: data.isActive,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        images: {
          create: linesToArray(data.images).map((url, i) => ({
            url,
            altText: data.name,
            position: i,
          })),
        },
      },
    });
  } catch {
    return { error: "A product with this slug already exists." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect("/admin/products");
}

export async function updateProduct(
  productId: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const parsed = productSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product details" };
  }
  const data = parsed.data;

  try {
    await prisma.$transaction([
      prisma.productImage.deleteMany({ where: { productId } }),
      prisma.product.update({
        where: { id: productId },
        data: {
          name: data.name,
          slug: data.slug,
          category: data.category,
          price: data.price,
          compareAtPrice: data.compareAtPrice ?? null,
          shortDescription: data.shortDescription,
          description: data.description,
          keyBenefits: linesToArray(data.keyBenefits),
          keyIngredients: linesToArray(data.keyIngredients),
          howToUse: data.howToUse,
          suitableFor: data.suitableFor,
          size: data.size,
          cautionInfo: data.cautionInfo || null,
          stock: data.stock,
          isActive: data.isActive,
          seoTitle: data.seoTitle || null,
          seoDescription: data.seoDescription || null,
          images: {
            create: linesToArray(data.images).map((url, i) => ({
              url,
              altText: data.name,
              position: i,
            })),
          },
        },
      }),
    ]);
  } catch {
    return { error: "Could not update product. Check the slug is unique." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath(`/product/${data.slug}`);
  redirect("/admin/products");
}

export async function deleteProduct(productId: string) {
  await prisma.product.delete({ where: { id: productId } });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}
