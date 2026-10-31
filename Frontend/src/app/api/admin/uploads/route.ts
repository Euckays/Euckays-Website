import { NextResponse, type NextRequest } from "next/server";
import { backendUrl } from "@/lib/api";
import { getAdminToken } from "@/lib/admin-session";

// The 8MB image limit is enforced by the backend; this only stops absurdly large bodies early.
const MAX_BODY_BYTES = 9 * 1024 * 1024;

// Thin proxy: the browser uploads here with its session cookie, and the file is forwarded to the
// backend's POST /admin/uploads with the admin token, so the browser never calls the backend.
export async function POST(request: NextRequest) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
    return NextResponse.json({ error: "No image was uploaded" }, { status: 400 });
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Images must be 8MB or smaller" }, { status: 400 });
  }

  const body = await request.arrayBuffer();
  if (body.byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Images must be 8MB or smaller" }, { status: 400 });
  }

  let response: Response;
  try {
    response = await fetch(backendUrl("/admin/uploads"), {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": contentType, Accept: "application/json" },
      body,
      cache: "no-store",
    });
  } catch (error) {
    console.error("Upload proxy could not reach the backend", error);
    return NextResponse.json({ error: "Could not save the image. Please try again." }, { status: 503 });
  }

  const data = await response.json().catch(() => ({ error: "Could not save the image. Please try again." }));
  return NextResponse.json(data, { status: response.status });
}
