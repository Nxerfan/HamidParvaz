
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
    ],
  },
};

export default nextConfig;
