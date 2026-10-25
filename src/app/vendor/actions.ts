"use server";

import { apiRequest } from "@/lib/api";

export type VendorApplicationInput = {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  location: string;
  businessType: string;
  productsOfInterest: string;
  expectedVolume?: string;
};

export async function submitVendorApplication(
  input: VendorApplicationInput
): Promise<{ success: true } | { success: false; error: string }> {
  const result = await apiRequest("/vendor-applications", { method: "POST", body: input });
  return result.ok ? { success: true } : { success: false, error: result.error };
}
