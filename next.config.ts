import type { NextConfig } from "next";

// GitHub Pages serves a static export from a sub-path (/<repo>/). The deploy
// workflow sets STATIC_EXPORT and NEXT_PUBLIC_BASE_PATH; local dev and normal
// builds are unaffected.
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Cache Components / partial prefetching (PPR) can't be used with static export.
  ...(staticExport
    ? { output: "export" as const, trailingSlash: true }
    : { cacheComponents: true, partialPrefetching: true }),
  basePath,
  images: {
    // next/image's built-in optimizer needs a server; photos are pre-sized WebP.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
