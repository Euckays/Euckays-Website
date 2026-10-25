import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiRequest, type ApiRequestOptions, type ApiResult } from "@/lib/api";

/** httpOnly cookie on the storefront's domain holding the backend-issued admin token. */
export const ADMIN_COOKIE = "euckays_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // matches the token's 7-day expiry

export async function getAdminToken() {
  return (await cookies()).get(ADMIN_COOKIE)?.value;
}

export async function setAdminToken(token: string) {
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminToken() {
  (await cookies()).delete(ADMIN_COOKIE);
}

/** The signed-in admin, or null when the cookie is missing, expired or rejected by the backend. */
export async function getAdminSession(): Promise<{ email: string } | null> {
  const token = await getAdminToken();
  if (!token) return null;
  const result = await apiRequest<{ email: string }>("/admin/me", { token });
  if (result.ok) return result.data;
  if (result.status === 401) return null;
  throw new Error(`Could not check the admin session (${result.status}): ${result.error}`);
}

/** Admin page data: redirects to the login page when signed out, `null` on 404. */
export async function adminGet<T>(path: string): Promise<T | null> {
  const token = await getAdminToken();
  if (!token) redirect("/admin/login");
  const result = await apiRequest<T>(path, { token });
  if (result.ok) return result.data;
  if (result.status === 401) redirect("/admin/login");
  if (result.status === 404) return null;
  throw new Error(`Backend request GET ${path} failed with ${result.status}: ${result.error}`);
}

/** Admin mutations from Server Actions: redirects to the login page when signed out. */
export async function adminRequest<T>(path: string, options: Omit<ApiRequestOptions, "token"> = {}): Promise<ApiResult<T>> {
  const token = await getAdminToken();
  if (!token) redirect("/admin/login");
  const result = await apiRequest<T>(path, { ...options, token });
  if (!result.ok && result.status === 401) redirect("/admin/login");
  return result;
}
