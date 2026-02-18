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
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // 👇 experimental 안에 있던 reactCompiler는 버전이 안 맞으니 삭제했습니다.
  // experimental: {
  //   optimizeCss: true,
  //   typedRoutes: false,
  // },
};

// 👇 'export default' 대신 이걸 쓰면 'Reparsing' 경고도 사라집니다.
module.exports = nextConfig;
