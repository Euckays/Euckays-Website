import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

type BucketConfig = {
  bucket: string;
  region: string;
  endpoint?: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicUrl: string;
};

function getBucketConfig(): BucketConfig | null {
  const bucket = process.env.STORAGE_BUCKET;
  if (!bucket) return null;

  const accessKeyId = process.env.STORAGE_ACCESS_KEY_ID;
  const secretAccessKey = process.env.STORAGE_SECRET_ACCESS_KEY;
  const publicUrl = process.env.STORAGE_PUBLIC_URL;
  if (!accessKeyId || !secretAccessKey || !publicUrl) {
    // A half-configured bucket must fail loudly; falling back to disk would lose photos on deploy.
    throw new Error(
      "STORAGE_BUCKET is set but STORAGE_ACCESS_KEY_ID, STORAGE_SECRET_ACCESS_KEY or STORAGE_PUBLIC_URL is missing"
    );
  }

  return {
    bucket,
    region: process.env.STORAGE_REGION || "auto",
    endpoint: process.env.STORAGE_ENDPOINT || undefined,
    accessKeyId,
    secretAccessKey,
    publicUrl: publicUrl.replace(/\/+$/, ""),
  };
}

let client: S3Client | null = null;

function getClient(config: BucketConfig) {
  client ??= new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    forcePathStyle: Boolean(config.endpoint),
    credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
  });
  return client;
}

export async function saveUpload(params: {
  fileName: string;
  bytes: Uint8Array;
  contentType: string;
}): Promise<string> {
  const config = getBucketConfig();

  if (config) {
    const key = `uploads/${params.fileName}`;
    await getClient(config).send(
      new PutObjectCommand({
        Bucket: config.bucket,
        Key: key,
        Body: params.bytes,
        ContentType: params.contentType,
        CacheControl: "public, max-age=31536000, immutable",
      })
    );
    return `${config.publicUrl}/${key}`;
  }

  const directory = path.join(process.cwd(), "public", "images", "uploads");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, params.fileName), params.bytes);
  return `/images/uploads/${params.fileName}`;
}
