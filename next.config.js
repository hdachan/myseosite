// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: true,
    // optimizePackageImports: true,  // ❌ 삭제해야 함
  },
};

export default nextConfig;
