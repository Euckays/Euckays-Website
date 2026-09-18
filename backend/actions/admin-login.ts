"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@backend/lib/prisma";
import { createAdminSession } from "@backend/lib/admin-auth";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export async function adminLogin(
  input: z.infer<typeof loginSchema>
): Promise<{ success: true } | { success: false; error: string }> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Enter a valid email and password" };
  }

  const user = await prisma.adminUser.findUnique({ where: { email: parsed.data.email } });
  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!valid) {
    return { success: false, error: "Invalid email or password" };
  }

  await createAdminSession(user.email);
  return { success: true };
}
