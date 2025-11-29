// 추천 통합 버전 (타입 포함 + OG locale/type + keywords 보관)
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mysite.com"),
  title: {
    default: "DMZ 관광 — 서울 DMZ 투어",
    template: "%s | DMZ 관광",
  },
  description: "서울 출발 DMZ 관광 예약, 일정, 가격 안내.",
  keywords: [
    "DMZ 관광",
    "DMZ 투어",
    "서울 DMZ 투어",
    "비무장지대 투어",
    "판문점 투어",
  ],
  alternates: { canonical: "https://mysite.com" },
  openGraph: {
    title: "DMZ 관광",
    description: "서울 DMZ 투어 정보 및 예약 안내.",
    url: "https://mysite.com",
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
      <body className="bg-white text-gray-900">
        <div className="max-w-4xl mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
