import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: "https",
        hostname: "travel-journal-api-bootcamp.do.dibimbing.id",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;