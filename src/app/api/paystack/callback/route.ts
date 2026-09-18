import type { NextRequest } from "next/server";
import { handlePaystackCallback } from "@backend/http/paystack-callback";

export async function GET(request: NextRequest) {
  return handlePaystackCallback(request);
}
