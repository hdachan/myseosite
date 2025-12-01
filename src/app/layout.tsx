// src/app/layout.tsx — 서울시티투어 빨간 Footer 완성본 (기존 코드 100% 유지)
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL("https://mysite.com"), // ← 나중에 실제 도메인으로 변경하세요!
  title: {
    default: "DMZ 관광 — 서울 DMZ 투어",
    template: "%s | DMZ 관광",
  },
  description:
    "서울 출발 DMZ 투어 전문 예약 사이트. 제3터널, 도라전망대, 도라산역 당일치기 코스. 매일 출발, 점심 포함, 한국어 가이드 동행.",
  keywords: [
    "서울 DMZ 투어",
    "DMZ 당일치기",
    "제3터널",
    "도라전망대",
    "도라산역",
    "판문점 투어",
    "비무장지대 관광",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "DMZ 관광",
    description: "서울에서 출발하는 가장 완벽한 DMZ 투어",
    siteName: "DMZ Tour",
    images: [{ url: "/og-dmz.jpg", width: 1200, height: 630 }],
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
        <link rel="icon" href="/favicon.ico" />

        {/* 구조화 데이터 (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "DMZ 관광",
              image: "https://mysite.com/og-dmz.jpg",
              url: "https://mysite.com",
              logo: "https://mysite.com/images/logo.png",
              description:
                "서울 출발 DMZ 전문 여행사. 제3터널, 도라전망대, 도라산역 포함 당일치기 투어 운영.",
              telephone: "+82-2-1234-5678",
              address: {
                "@type": "PostalAddress",
                addressLocality: "서울",
                addressRegion: "서울",
                addressCountry: "KR",
              },
              offers: {
                "@type": "Offer",
                name: "서울 DMZ 당일치기 투어",
                price: "89000",
                priceCurrency: "KRW",
                availability: "https://schema.org/InStock",
                url: "https://mysite.com",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                bestRating: "5",
                reviewCount: "1287",
              },
            }),
          }}
        />
      </head>

      <body className="bg-white text-gray-900 min-h-screen">
        <input type="checkbox" id="mobile-menu" className="hidden" />

        {/* ==================== HEADER ==================== */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
          <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="DMZ 투어 공식 로고"
                width={290}
                height={56}
                className="h-7 lg:h-8 w-auto"
                priority
              />
            </Link>

            <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 lg:px-8 py-2.5 border border-gray-300 gap-2">
              {[
                "/",
                "/company",
                "/package",
                "/private",
                "/group",
                "/review",
                "/medical",
              ].map((href, i) => {
                const labels = [
                  "홈",
                  "회사소개",
                  "패키지관광",
                  "Private 투어",
                  "기업/단체투어",
                  "고객후기",
                  "의료관광",
                ];
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-3 lg:px-5 py-2 text-xs lg:text-sm font-medium whitespace-nowrap transition ${
                      href === "/"
                        ? "text-gray-900 hover:text-red-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {labels[i]}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3 lg:gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <button className="bg-black text-white px-5 lg:px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition">
                  Korea
                </button>
                <button className="text-gray-600 hover:text-black text-sm lg:text-base transition">
                  English
                </button>
              </div>

              <label
                htmlFor="mobile-menu"
                className="lg:hidden cursor-pointer p-2 z-50"
              >
                <Menu size={28} className="block" />
                <X size={28} className="hidden [:checked_&]:block" />
              </label>
            </div>
          </nav>

          {/* 모바일 풀스크린 메뉴 */}
          <div className="fixed inset-0 z-40 bg-white h-screen -translate-y-full [:checked_&]:translate-y-0 transition-transform duration-500 ease-in-out lg:hidden pointer-events-none [:checked_&]:pointer-events-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="로고"
                  width={290}
                  height={56}
                  className="h-8 w-auto"
                />
              </Link>
              <label htmlFor="mobile-menu" className="cursor-pointer p-2">
                <X size={32} />
              </label>
            </div>
            <div className="flex flex-col items-center justify-center h-full pb-32 gap-10">
              {[
                "홈",
                "회사소개",
                "패키지관광",
                "Private 투어",
                "기업/단체투어",
                "고객후기",
                "의료관광",
              ].map((label, i) => (
                <Link
                  key={i}
                  href={
                    i === 0
                      ? "/"
                      : `/${
                          [
                            "",
                            "company",
                            "package",
                            "private",
                            "group",
                            "review",
                            "medical",
                          ][i]
                        }`
                  }
                  className="text-3xl font-medium text-gray-800 hover:text-red-600 transition"
                >
                  {label}
                </Link>
              ))}
              <div className="mt-12 flex flex-col gap-6">
                <button className="bg-black text-white px-12 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition">
                  Korea
                </button>
                <button className="text-gray-700 hover:text-black text-lg font-medium transition">
                  English
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ==================== MAIN CONTENT ==================== */}
        <main className="pt-24">
          {/* 이 줄만 삭제하거나 주석 처리하면 끝! */}
          {/* <div className="max-w-4xl mx-auto p-4">{children}</div> */}

          {/* 이렇게 바꾸기 */}
          {children}
        </main>

        {/* ==================== SEOUL CITY TOUR STYLE RED FOOTER ==================== */}
        <footer className="bg-red-700 text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
              {/* 왼쪽 정보 */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-8">COMPANY INFO</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm leading-loose">
                  <div className="space-y-3">
                    <p>회사명 : (주)서울씨티투어</p>
                    <p>대표자 : 박도영</p>
                    <p>E-mail : mail@seoulcitytour.net</p>
                    <p>TEL : 02-774-3345</p>
                    <p className="text-red-200">
                      통신 판매업 신고 번호 서울종로-0710호
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p>
                      계좌번호 : 신한은행 100 - 023 - 904290 | 예금주
                      (주)서울씨티투어
                    </p>
                    <p>사업자등록 번호 : 507-88-02244</p>
                    <p>
                      주소 : 서울 특별시 종로구 인사동 194-4 하나로빌딩 507호
                    </p>
                    <p>FAX : 02-774-8223</p>
                    <p>관광 사업자 등록 번호 2008-000002</p>
                  </div>
                </div>
              </div>

              {/* 오른쪽 로고 */}
              <div className="flex-shrink-0">
                <Image
                  src="/images/logo-white.png" // ← 흰색 로고 파일 준비하세요!
                  alt="Seoul City Tour"
                  width={300}
                  height={90}
                  className="object-contain"
                />
              </div>
            </div>

            {/* 하단 정책 링크 & 카피라이트 */}
            <div className="mt-12 pt-8 border-t border-red-600 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/privacy" className="hover:underline">
                  이메일주소무단수집거부
                </Link>
                <span className="text-red-300">|</span>
                <Link href="/terms" className="hover:underline">
                  개인정보보호정책
                </Link>
                <span className="text-red-300">|</span>
                <Link href="/policy" className="hover:underline">
                  이용약관
                </Link>
                <span className="text-red-300">|</span>
                <Link href="/sitemap" className="hover:underline">
                  사이트맵
                </Link>
              </div>
              <p className="text-center">
                COPYRIGHT (C) 2004-2025 SEOUL CITY TOUR Co., LTD. ALL RIGHTS
                RESERVED
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
