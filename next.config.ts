import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  ignoreDuringBuilds: true,
  webpack: (config) => {
    config.resolve.fallback = { tls: false };

    return config;
  },
};

export default nextConfig;
