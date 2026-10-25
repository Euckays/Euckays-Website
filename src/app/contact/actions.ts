"use server";

import { apiRequest } from "@/lib/api";

export type ContactMessageInput = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

export async function submitContactMessage(
  input: ContactMessageInput
): Promise<{ success: true } | { success: false; error: string }> {
  const result = await apiRequest("/contact", { method: "POST", body: input });
  return result.ok ? { success: true } : { success: false, error: result.error };
}
