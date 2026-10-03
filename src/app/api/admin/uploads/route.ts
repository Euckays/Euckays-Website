import type { NextRequest } from "next/server";
import { handleAdminUpload } from "@backend/http/uploads";

export async function POST(request: NextRequest) {
  return handleAdminUpload(request);
}
