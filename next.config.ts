import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['travel-journal-api-bootcamp.do.dibimbing.id', 'images.unsplash.com', 's3-alpha-sig.figma.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'travel-journal-api-bootcamp.do.dibimbing.id',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 's3-alpha-sig.figma.com',
      },
    ],
  },
};

export default nextConfig;