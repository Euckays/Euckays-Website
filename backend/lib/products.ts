import { prisma } from "@backend/lib/prisma";
import type { ProductCategory } from "@/generated/prisma/client";

export async function getActiveProducts(params?: {
  category?: ProductCategory;
  search?: string;
}) {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(params?.category ? { category: params.category } : {}),
      ...(params?.search
        ? {
            OR: [
              { name: { contains: params.search, mode: "insensitive" } },
              { shortDescription: { contains: params.search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { images: { orderBy: { position: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
  return products.map((product) => ({
    ...product,
    price: Number(product.price),
    compareAtPrice: product.compareAtPrice === null ? null : Number(product.compareAtPrice),
  }));
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: { orderBy: { position: "asc" } } },
  });
  if (!product) return null;
  return {
    ...product,
    price: Number(product.price),
    compareAtPrice: product.compareAtPrice === null ? null : Number(product.compareAtPrice),
  };
}

export async function getFeaturedProducts(limit = 4) {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { images: { orderBy: { position: "asc" } } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return products.map((product) => ({
    ...product,
    price: Number(product.price),
    compareAtPrice: product.compareAtPrice === null ? null : Number(product.compareAtPrice),
  }));
}

export type SerializedProduct = Awaited<ReturnType<typeof getProductBySlug>>;
