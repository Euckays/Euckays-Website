"use server";

import { adminLogin as performAdminLogin } from "@backend/actions/admin-login";

export async function adminLogin(...args: Parameters<typeof performAdminLogin>): ReturnType<typeof performAdminLogin> {
  return performAdminLogin(...args);
}
