// src/app/ko/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://mysite.com"),
  title: { default: "DMZ 관광 — 서울 DMZ 투어", template: "%s | DMZ 관광" },
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
    canonical: "/ko",
    languages: {
      ko: "/ko",
      en: "/en",
    },
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "DMZ 관광",
    description: "서울에서 출발하는 가장 완벽한 DMZ 투어",
    siteName: "DMZ Tour",
    images: [{ url: "/og-dmz.jpg", width: 1200, height: 630 }],
    locale: "ko_KR",
    type: "website",
  },
};

export default function KoLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { href: "/ko", label: "홈" },
    { href: "/ko/company", label: "회사소개" },
    { href: "/ko/package", label: "패키지관광" },
    { href: "/ko/private", label: "Private 투어" },
    { href: "/ko/attractions", label: "관광지 정보" },
    { href: "/ko/contact", label: "문의하기" },
  ];

  return (
    <>
      {/* JSON-LD */}
      <Script
        id="jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
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
          }),
        }}
      />

      <input type="checkbox" id="mobile-menu" className="hidden peer" />

      {/* HEADER - 한국 전통 느낌 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="border-b-2 border-red-800">
          <nav className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6">
            <Link href="/ko" className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="DMZ 투어 로고"
                width={290}
                height={56}
                className="h-10 lg:h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Menu - 한국 전통 느낌 */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="relative px-6 py-3 text-base font-semibold text-gray-800 transition-colors hover:text-red-800 group"
                >
                  {label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-800 transition-all duration-300 group-hover:w-3/4"></span>
                </Link>
              ))}
            </div>

            {/* 언어 버튼 - 우아한 스타일 */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 border-l-2 border-gray-300 pl-4">
                <button className="bg-red-800 text-white px-7 py-2.5 rounded text-sm font-bold tracking-wide hover:bg-red-900 transition-all duration-300 shadow-md hover:shadow-lg">
                  한국어
                </button>
                <Link href="/en">
                  <button className="text-gray-600 hover:text-red-800 text-base font-semibold transition-colors duration-300">
                    English
                  </button>
                </Link>
              </div>

              <label
                htmlFor="mobile-menu"
                className="lg:hidden cursor-pointer p-2 z-50 text-red-800"
              >
                <Menu size={30} className="block peer-checked:hidden" />
                <X size={30} className="hidden peer-checked:block" />
              </label>
            </div>
          </nav>
        </div>

        {/* Decorative line - 한국 전통 문양 느낌 */}
        <div className="h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-900"></div>

        {/* 모바일 메뉴 - 전통적 느낌 */}
        <div className="fixed inset-0 z-40 bg-white h-screen -translate-y-full peer-checked:translate-y-0 transition-transform duration-500 ease-in-out lg:hidden pointer-events-none peer-checked:pointer-events-auto">
          <div className="flex items-center justify-between p-6 border-b-2 border-red-800">
            <Link href="/ko">
              <Image
                src="/images/logo.png"
                alt="로고"
                width={290}
                height={56}
                className="h-9 w-auto"
              />
            </Link>
            <label
              htmlFor="mobile-menu"
              className="cursor-pointer p-2 text-red-800"
            >
              <X size={32} />
            </label>
          </div>

          <div className="flex flex-col items-center justify-center h-full pb-32 gap-10">
            {menuItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-3xl font-semibold text-gray-800 hover:text-red-800 transition-colors duration-300 relative group"
              >
                {label}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            <div className="mt-12 flex flex-col items-center gap-6">
              <button className="bg-red-800 text-white px-16 py-4 rounded text-lg font-bold tracking-wider hover:bg-red-900 transition-all duration-300 shadow-lg">
                한국어
              </button>
              <Link href="/en">
                <button className="text-gray-700 hover:text-red-800 text-xl font-semibold transition-colors duration-300">
                  English
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {/* FOOTER */}
      <footer className="bg-red-700 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
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
                    계좌번호 : 신한은행 100-023-904290 | 예금주 (주)서울씨티투어
                  </p>
                  <p>사업자등록 번호 : 507-88-02244</p>
                  <p>주소 : 서울 특별시 종로구 인사동 194-4 하나로빌딩 507호</p>
                  <p>FAX : 02-774-8223</p>
                  <p>관광 사업자 등록 번호 2008-000002</p>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/images/logo-white.png"
                alt="Seoul City Tour"
                width={300}
                height={90}
                className="object-contain"
              />
            </div>
          </div>

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
              COPYRIGHT © 2004-2025 SEOUL CITY TOUR Co., LTD. ALL RIGHTS
              RESERVED
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
