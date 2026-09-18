"use server";

import { submitVendorApplication as performSubmitVendorApplication } from "@backend/actions/vendor";

export async function submitVendorApplication(...args: Parameters<typeof performSubmitVendorApplication>): ReturnType<typeof performSubmitVendorApplication> {
  return performSubmitVendorApplication(...args);
}
