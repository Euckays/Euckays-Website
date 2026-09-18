"use server";

import { submitContactMessage as performSubmitContactMessage } from "@backend/actions/contact";

export async function submitContactMessage(...args: Parameters<typeof performSubmitContactMessage>): ReturnType<typeof performSubmitContactMessage> {
  return performSubmitContactMessage(...args);
}
