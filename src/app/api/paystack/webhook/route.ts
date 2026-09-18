import type { NextRequest } from "next/server";
import { handlePaystackWebhook } from "@backend/http/paystack-webhook";

export async function POST(request: NextRequest) {
  return handlePaystackWebhook(request);
}
