import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  plugins: {
    '@tailwindcss/postcss': {
      optimize: {
        minify: false
      }
    }
  },
};

export default nextConfig;
