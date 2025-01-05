import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 's3-alpha-sig.figma.com'],
  },
};

export default nextConfig;
