// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mysite.com"), // ← 실제 도메인으로 바꾸세요!
  title: {
    default: "DMZ 관광 — 서울 DMZ 투어",
    template: "%s | DMZ 관광",
  },
  description: "서울 출발 DMZ 관광 예약, 일정, 가격 안내.",
  keywords: [
    "DMZ 관광",
    "서울 DMZ 투어",
    "제3터널",
    "도라전망대",
    "판문점 투어",
  ],

  // ← 여기만 바꾸기 (최고의 방법)
  alternates: { canonical: "/" }, // ← 이렇게! (Next.js가 자동으로 https://mysite.com 붙여줌)

  openGraph: {
    title: "DMZ 관광",
    description: "서울 DMZ 투어 정보 및 예약 안내.",
    siteName: "DMZ Tour",
    images: ["/images/dmz.webp"],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* 나중에 구글/네이버 인증코드 생기면 여기 넣기 */}
        {/* <meta name="google-site-verification" content="코드" /> */}
      </head>
      <body className="bg-white text-gray-900">
        <div className="max-w-4xl mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
