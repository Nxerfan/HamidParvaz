
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  output: 'export',
  distDir: "dist",
   trailingSlash: true,
  allowedDevOrigins: ["192.168.1.101"],

  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
