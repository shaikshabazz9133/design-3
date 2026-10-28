import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Photography is served from Unsplash's CDN, which resizes and re-encodes
    // on the fly, so we hand sizing off to it instead of the Next optimizer.
    loader: "custom",
    loaderFile: "./src/lib/unsplash-loader.ts",
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
