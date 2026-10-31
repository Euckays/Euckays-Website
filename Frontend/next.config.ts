import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the dev compiler's assets separate from `next build` output. Running
  // both against `.next` left open tabs with incompatible client/server chunks.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

export default nextConfig;
