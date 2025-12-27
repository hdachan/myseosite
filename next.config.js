// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dynamic-media-cdn.tripadvisor.com",
      },
      // 나중에 직접 촬영한 사진을 AWS S3나 Cloudinary 쓰면 여기에 추가하면 끝!
    ],
  },
  experimental: {
    optimizeCss: true,
    typedRoutes: false, // ✅ 이 줄 추가
  },
};

export default nextConfig;
