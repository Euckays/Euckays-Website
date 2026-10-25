"use server";

import { apiRequest } from "@/lib/api";
import { setAdminToken } from "@/lib/admin-session";

export async function adminLogin(input: {
  email: string;
  password: string;
}): Promise<{ success: true } | { success: false; error: string }> {
  const result = await apiRequest<{ token: string; email: string }>("/admin/login", {
    method: "POST",
    body: input,
  });
  if (!result.ok) {
    const credentialsProblem = result.status === 400 || result.status === 401;
    return {
      success: false,
      error: credentialsProblem ? result.error : "Sign-in is temporarily unavailable. Please try again.",
    };
  }

  await setAdminToken(result.data.token);
  return { success: true };
}
