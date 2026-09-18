"use server";

import { z } from "zod";
import { prisma } from "@backend/lib/prisma";

const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  subject: z.string().trim().optional(),
  message: z.string().trim().min(5),
});

export async function submitContactMessage(
  input: z.infer<typeof contactSchema>
): Promise<{ success: true } | { success: false; error: string }> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please fill in all required fields correctly." };
  }
  await prisma.contactMessage.create({ data: parsed.data });
  return { success: true };
}
