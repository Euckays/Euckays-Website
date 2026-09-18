"use server";

import { createProduct as performCreateProduct } from "@backend/actions/admin-products";
import { updateProduct as performUpdateProduct } from "@backend/actions/admin-products";
import { deleteProduct as performDeleteProduct } from "@backend/actions/admin-products";

export type { ProductFormState } from "@backend/actions/admin-products";

export async function createProduct(...args: Parameters<typeof performCreateProduct>): ReturnType<typeof performCreateProduct> {
  return performCreateProduct(...args);
}

export async function updateProduct(...args: Parameters<typeof performUpdateProduct>): ReturnType<typeof performUpdateProduct> {
  return performUpdateProduct(...args);
}

export async function deleteProduct(...args: Parameters<typeof performDeleteProduct>): ReturnType<typeof performDeleteProduct> {
  return performDeleteProduct(...args);
}
