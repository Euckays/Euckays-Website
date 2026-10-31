"use client";

import { useState, type DragEvent } from "react";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function ImageUploader({ defaultUrls }: { defaultUrls: string[] }) {
  const [urls, setUrls] = useState(defaultUrls);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/uploads", { method: "POST", body });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Upload failed");
    return data.url as string;
  }

  async function handleFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList).filter((f) => ACCEPTED_TYPES.includes(f.type));
    if (files.length === 0) {
      setError("Please choose JPG, PNG or WebP images.");
      return;
    }
    setError(null);
    setUploading((n) => n + files.length);
    for (const file of files) {
      try {
        const url = await uploadFile(file);
        setUrls((current) => [...current, url]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading((n) => n - 1);
      }
    }
  }

  function handleDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setIsDragging(false);
    void handleFiles(e.dataTransfer.files);
  }

  function removeUrl(url: string) {
    setUrls((current) => current.filter((u) => u !== url));
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm text-brand-black/70">Product photos</span>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed px-6 py-10 text-center transition ${
          isDragging ? "border-brand-emerald bg-brand-emerald/5" : "border-brand-sand bg-brand-cream/40 hover:border-brand-emerald"
        }`}
      >
        <input
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          multiple
          className="sr-only"
          onChange={(e) => {
            if (e.target.files) void handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <span className="text-sm font-medium text-brand-black">
          Drag photos here, or click to choose from your device
        </span>
        <span className="text-xs text-brand-black/50">JPG, PNG or WebP, up to 8MB each. The first photo is the main image.</span>
      </label>

      {uploading > 0 && (
        <p className="text-sm text-brand-emerald">Uploading {uploading} photo{uploading === 1 ? "" : "s"}...</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {urls.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {urls.map((url, index) => (
            <li key={url} className="relative overflow-hidden border border-brand-sand bg-brand-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="aspect-square w-full object-cover" />
              {index === 0 && (
                <span className="absolute left-2 top-2 bg-brand-emerald px-2 py-1 text-[10px] uppercase tracking-wide text-brand-white">
                  Main
                </span>
              )}
              <button
                type="button"
                onClick={() => removeUrl(url)}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-brand-black/80 text-sm text-brand-white hover:bg-red-600"
                aria-label="Remove photo"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <input type="hidden" name="images" value={urls.join("\n")} />
    </div>
  );
}
