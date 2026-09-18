"use server";

import { z } from "zod";
import { prisma } from "@backend/lib/prisma";

const vendorSchema = z.object({
  name: z.string().trim().min(2),
  businessName: z.string().trim().min(2),
  phone: z.string().trim().min(7),
  email: z.string().trim().email(),
  location: z.string().trim().min(2),
  businessType: z.string().trim().min(2),
  productsOfInterest: z.string().trim().min(2),
  expectedVolume: z.string().trim().optional(),
});

export async function submitVendorApplication(
  input: z.infer<typeof vendorSchema>
): Promise<{ success: true } | { success: false; error: string }> {
  const parsed = vendorSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fill in all required fields correctly." };
  }
  await prisma.vendorApplication.create({ data: parsed.data });
  return { success: true };
}
