import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@backend/lib/admin-auth";
import { saveUpload } from "@backend/lib/storage";

const MAX_BYTES = 8 * 1024 * 1024;

const CONTENT_TYPES = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" } as const;

function sniffImageExtension(bytes: Uint8Array): keyof typeof CONTENT_TYPES | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "png";
  const isRiff = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46;
  const isWebp = bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
  if (isRiff && isWebp) return "webp";
  return null;
}

export async function handleAdminUpload(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image was uploaded" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Images must be 8MB or smaller" }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const extension = sniffImageExtension(bytes);
  if (!extension) {
    return NextResponse.json({ error: "Only JPG, PNG or WebP images are allowed" }, { status: 400 });
  }

  try {
    const url = await saveUpload({
      fileName: `${randomUUID()}.${extension}`,
      bytes,
      contentType: CONTENT_TYPES[extension],
    });
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Image upload failed", error);
    return NextResponse.json({ error: "Could not save the image. Please try again." }, { status: 500 });
  }
}
