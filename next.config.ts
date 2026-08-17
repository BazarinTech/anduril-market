import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Hosts next/image is allowed to fetch and optimise.
     *
     * Product images moved to object storage, but only the old cPanel host was
     * listed here -- so every image from the bucket was either refused or
     * served unoptimised: the full 500x500 original, straight from the bucket,
     * for a card that displays it at a fraction of that.
     *
     * With the host allowed, Next fetches each image once, stores a resized
     * AVIF/WebP variant, and serves that from its own cache. The bucket round
     * trip (measured at 1.4-2.2s for a 22KB file) then happens once per image
     * rather than once per page view.
     */
    remotePatterns: [
      // Object storage (Railway Bucket / Tigris).
      {
        protocol: 'https',
        hostname: 't3.storageapi.dev',
      },
      // The image proxy, for STORAGE_URL_MODE=proxy.
      {
        protocol: 'https',
        hostname: 'backend.anduril-platform.com',
        pathname: '/backend/mains/**',
      },
    ],
    // The variants Next is allowed to generate. Cards render these small, so
    // there is no reason to hand a phone a 500px file.
    imageSizes: [64, 96, 128, 200, 256],
    deviceSizes: [320, 420, 640, 750, 1080],
    // Optimised variants are immutable for a day; the source key never changes
    // its contents, so this only costs staleness when an image is replaced.
    minimumCacheTTL: 86400,
  },
};


export default nextConfig;
