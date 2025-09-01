import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.cuponeria.com.br",
      },
    ],
  },
};

export default nextConfig;
