import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // No external domains needed since we're using local SVG placeholders
    remotePatterns: [
      // Add remote patterns here if needed for external images in the future
    ],
  },
};

export default nextConfig;
