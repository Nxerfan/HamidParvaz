import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96],
    remotePatterns: [
      { protocol: "https", hostname: "img2.taw-bio.ir" },
      { protocol: "https", hostname: "www.aysham.com" },
      { protocol: "https", hostname: "cdn.tabnak.ir" },
      { protocol: "https", hostname: "farjamparvaz.net" },
      { protocol: "https", hostname: "dalahoo.com" },
      { protocol: "https", hostname: "shut.ir" },
      { protocol: "https", hostname: "www.eghamat24.com" },
      { protocol: "https", hostname: "cdn01.booking.ir" },
      { protocol: "https", hostname: "mrbilit.com" },
      { protocol: "https", hostname: "cdn.alibaba.ir" },
      { protocol: "https", hostname: "umagcdn.utravs.com" },
      { protocol: "https", hostname: "img.icons8.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.mstatic.ir" },
    ],
  },
};

export default nextConfig;
