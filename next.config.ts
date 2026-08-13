import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sanderson.xgramm.com',
        pathname: '/admin/uploads/**',
      },
    ],
  },
};


export default nextConfig;
