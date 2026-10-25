import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import type { OrderConfirmation, Product, ProductCategory } from "@/lib/api-types";

// Server-side only: the browser never talks to the backend directly.
const BACKEND_URL = (process.env.BACKEND_URL || "http://localhost:4000").replace(/\/+$/, "");

const UNAVAILABLE = "The service is temporarily unavailable. Please try again.";

export type ApiResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; error: string };

export type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** Sent as JSON. */
  body?: unknown;
  /** Admin token, sent as `Authorization: Bearer <token>`. */
  token?: string;
};

export function backendUrl(path: string) {
  return `${BACKEND_URL}${path}`;
}

/** Calls the backend and never throws: failures come back as `{ ok: false, status, error }`. */
export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<ApiResult<T>> {
  const method = options.method ?? "GET";
  const headers: Record<string, string> = { Accept: "application/json" };
  if (options.body !== undefined) headers["Content-Type"] = "application/json";
  if (options.token) headers.Authorization = `Bearer ${options.token}`;

  let response: Response;
  try {
    response = await fetch(backendUrl(path), {
      method,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      cache: "no-store",
    });
  } catch (error) {
    console.error(`Backend unreachable: ${method} ${path}`, error);
    return { ok: false, status: 503, error: UNAVAILABLE };
  }

  const payload: unknown = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string"
        ? payload.error
        : UNAVAILABLE;
    return { ok: false, status: response.status, error: message };
  }
  return { ok: true, status: response.status, data: payload as T };
}

/** For pages: the data, `null` on 404, and a thrown error (shown by the error page) otherwise. */
export async function apiGet<T>(path: string, token?: string): Promise<T | null> {
  const result = await apiRequest<T>(path, { token });
  if (result.ok) return result.data;
  if (result.status === 404) return null;
  throw new Error(`Backend request GET ${path} failed with ${result.status}: ${result.error}`);
}

async function requireData<T>(path: string): Promise<T> {
  const data = await apiGet<T>(path);
  if (data === null) throw new Error(`Backend request GET ${path} returned 404`);
  return data;
}

// Storefront data. Each call waits for a real request (connection()), so nothing is fetched at
// build time and every page view shows current prices and stock.

export async function getActiveProducts(params?: { category?: ProductCategory; search?: string }) {
  await connection();
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.search) query.set("q", params.search);
  const suffix = query.size > 0 ? `?${query}` : "";
  return (await requireData<{ products: Product[] }>(`/products${suffix}`)).products;
}

export async function getFeaturedProducts(limit = 4) {
  await connection();
  return (await requireData<{ products: Product[] }>(`/products/featured?limit=${limit}`)).products;
}

/** Memoized per request so generateMetadata and the page share one backend call. */
export const getProductBySlug = cache(async (slug: string) => {
  await connection();
  const data = await apiGet<{ product: Product }>(`/products/${encodeURIComponent(slug)}`);
  return data?.product ?? null;
});

export async function getOrderByNumber(orderNumber: string) {
  await connection();
  const data = await apiGet<{ order: OrderConfirmation }>(`/orders/${encodeURIComponent(orderNumber)}`);
  return data?.order ?? null;
}
