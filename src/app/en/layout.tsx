// src/app/en/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://mysite.com"),
  title: { default: "DMZ Tour — Seoul DMZ Travel", template: "%s | DMZ Tour" },
  description:
    "Seoul departure DMZ tour specialist. One-day course including the 3rd Tunnel, Dora Observatory, and Dorasan Station. Daily departure with lunch and English-speaking guide.",
  keywords: [
    "Seoul DMZ Tour",
    "DMZ Day Trip",
    "3rd Tunnel",
    "Dora Observatory",
    "Dorasan Station",
    "Panmunjom Tour",
    "Demilitarized Zone Tour",
  ],
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      ko: "/ko",
    },
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "DMZ Tour",
    description: "The most complete DMZ tour departing from Seoul",
    siteName: "DMZ Tour",
    images: [{ url: "/og-dmz.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { href: "/en", label: "Home" },
    { href: "/en/company", label: "About Us" },
    { href: "/en/package", label: "Package Tours" },
    { href: "/en/private", label: "Private Tours" },
    { href: "/en/contact", label: "Contact" },
  ];

  return (
    <>
      {/* JSON-LD */}
      <Script
        id="jsonld-travelagency"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "DMZ Tour",
            image: "https://mysite.com/og-dmz.jpg",
            url: "https://mysite.com",
            logo: "https://mysite.com/images/logo.png",
            description:
              "DMZ tour specialist departing from Seoul. One-day tour including the 3rd Tunnel, Dora Observatory, and Dorasan Station.",
            telephone: "+82-2-1234-5678",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Seoul",
              addressRegion: "Seoul",
              addressCountry: "KR",
            },
          }),
        }}
      />

      <input type="checkbox" id="mobile-menu" className="hidden peer" />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
        {/* Mobile Toggle */}
        <input type="checkbox" id="mobile-menu" className="peer hidden" />

        {/* SLIM TOP BAR */}
        <nav
          className="max-w-7xl mx-auto flex items-center justify-between 
                  px-6 lg:px-10 py-3 lg:py-4"
        >
          {/* LOGO (더 슬림하게) */}
          <Link href="/en" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Seoul City Tour Logo"
              width={200}
              height={52}
              className="w-auto h-11 lg:h-12 object-contain"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-5">
            {menuItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative px-3 py-2 text-[15px] font-medium text-gray-800
                     hover:text-red-800 transition group"
              >
                {label}
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 
                           w-0 h-[2px] bg-red-800 transition-all duration-300 
                           group-hover:w-3/4"
                />
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5">
            {/* LANG SWITCHER */}
            <div className="hidden sm:flex items-center gap-3 border-l border-gray-300 pl-4">
              <Link href="/ko">
                <button className="text-gray-700 hover:text-red-800 text-[14px] font-medium">
                  한국어
                </button>
              </Link>
              <Link href="/en">
                <button
                  className="bg-red-800 text-white px-4 py-1.5 rounded-md text-xs font-semibold 
                             hover:bg-red-900 transition"
                >
                  EN
                </button>
              </Link>
            </div>

            {/* HAMBURGER */}
            <label
              htmlFor="mobile-menu"
              className="lg:hidden cursor-pointer p-2 text-red-800 z-50"
            >
              <Menu size={28} className="peer-checked:hidden" />
              <X size={28} className="hidden peer-checked:block" />
            </label>
          </div>
        </nav>

        {/* Thin bottom line */}
        <div className="h-[2px] bg-gradient-to-r from-red-900 via-red-700 to-red-900" />

        {/* MOBILE MENU */}
        <div
          className="
      fixed inset-0 bg-white z-40 h-screen 
      -translate-y-full peer-checked:translate-y-0
      transition-transform duration-500 ease-in-out
      lg:hidden pointer-events-none peer-checked:pointer-events-auto
    "
        >
          {/* Mobile top bar (slim) */}
          <div className="flex items-center justify-between p-5 border-b-2 border-red-800">
            <Link href="/en">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={180}
                height={48}
                className="h-10 w-auto"
              />
            </Link>

            <label htmlFor="mobile-menu" className="p-2 text-red-800">
              <X size={30} />
            </label>
          </div>

          {/* Mobile Nav Items */}
          <div className="flex flex-col items-center justify-center h-full pb-28 gap-10">
            {menuItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-3xl font-semibold text-gray-800 hover:text-red-800 transition relative group"
              >
                {label}
                <span
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 
                       w-0 h-1 bg-red-800 transition-all duration-300 
                       group-hover:w-full"
                ></span>
              </Link>
            ))}

            {/* Mobile Language */}
            <div className="mt-10 flex flex-col items-center gap-5">
              <Link href="/ko">
                <button className="text-gray-700 hover:text-red-800 text-xl font-semibold transition">
                  한국어
                </button>
              </Link>
              <Link href="/en">
                <button
                  className="bg-red-800 text-white px-14 py-3 rounded-lg text-lg font-bold 
                       hover:bg-red-900 shadow-md transition"
                >
                  ENGLISH
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            {/* 1. 회사 로고 및 대표/연락 정보 섹션 (좌측) */}
            <div className="w-full lg:w-1/3 min-w-0">
              <Image
                src="/images/logo-white.png"
                alt="Seoul City Tour"
                width={220}
                height={66}
                className="object-contain mb-6"
              />

              <h4 className="text-xl font-bold mb-4 text-red-400">
                Contact Info
              </h4>

              <div className="space-y-3 text-sm text-gray-300">
                <p>
                  {/* <BuildingOffice2Icon className="w-4 h-4 mr-2 inline-block text-red-400" /> */}
                  <span className="font-medium text-white">CEO:</span> Park
                  Do-young
                </p>
                <p>
                  {/* <EnvelopeIcon className="w-4 h-4 mr-2 inline-block text-red-400" /> */}
                  <span className="font-medium text-white">Email:</span>
                  <a
                    href="mailto:mail@seoulcitytour.net"
                    className="hover:text-red-400 transition"
                  >
                    mail@seoulcitytour.net
                  </a>
                </p>
                <p>
                  {/* <PhoneIcon className="w-4 h-4 mr-2 inline-block text-red-400" /> */}
                  <span className="font-medium text-white">Tel:</span>{" "}
                  +82-2-774-3345
                </p>
                <p className="flex items-start">
                  {/* <MapPinIcon className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-0.5" /> */}
                  <span className="font-medium text-white mr-2">Address:</span>{" "}
                  507, Hanaro Building, 194-4, Insadong, Jongno-gu, Seoul
                </p>
              </div>

              {/* 소셜 미디어 (접근성 높임) */}
              <h4 className="text-xl font-bold mb-4 mt-8">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-gray-400 hover:text-red-400 transition transform hover:scale-110"
                >
                  {/* <FaFacebook className="w-6 h-6" /> */}
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-gray-400 hover:text-red-400 transition transform hover:scale-110"
                >
                  {/* <FaInstagram className="w-6 h-6" /> */}
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="text-gray-400 hover:text-red-400 transition transform hover:scale-110"
                >
                  {/* <FaYoutube className="w-6 h-6" /> */}
                </a>
              </div>
            </div>

            {/* 2. Quick Links 섹션 (중앙) */}
            <div className="w-full lg:w-1/4 mt-6 lg:mt-0">
              <h4 className="text-xl font-bold mb-6 border-b-2 border-red-500 pb-1 inline-block">
                Quick Links
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <Link
                    href="/en/faq"
                    className="hover:text-red-400 transition"
                  >
                    FAQ & Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/en/about"
                    className="hover:text-red-400 transition"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/en/contact"
                    className="hover:text-red-400 transition"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/en/my-bookings"
                    className="hover:text-red-400 transition"
                  >
                    Manage My Booking
                  </Link>
                </li>
                <li className="pt-2">
                  <h5 className="font-semibold text-white">Explore Tours</h5>
                </li>
                <li>
                  <Link
                    href="/tours/dmz"
                    className="hover:text-red-400 transition ml-3"
                  >
                    DMZ Tours
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tours/k-drama"
                    className="hover:text-red-400 transition ml-3"
                  >
                    K-Culture & K-Drama
                  </Link>
                </li>
              </ul>
            </div>

            {/* 3. 법적/회계 정보 섹션 (우측, 필수 정보 집합) */}
            <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
              <h4 className="text-xl font-bold mb-6 border-b-2 border-red-500 pb-1 inline-block">
                Legal & Accounting
              </h4>

              <div className="space-y-3 text-sm text-gray-300">
                <p className="text-yellow-400 font-medium">
                  {/* <ShieldCheckIcon className="w-4 h-4 mr-2 inline-block text-yellow-400" /> */}
                  Business Registration No: 507-88-02244
                </p>
                <p className="text-yellow-400 font-medium">
                  Tour Business License: 2008-000002
                </p>
                <p className="text-yellow-400 font-medium">
                  Mail-order License: Jongno-0710
                </p>

                <p className="pt-3">
                  {/* <BanknotesIcon className="w-4 h-4 mr-2 inline-block text-red-400" /> */}
                  <span className="font-medium text-white">Bank Account:</span>{" "}
                  Shinhan Bank 100-023-904290
                </p>
                <p>
                  <span className="font-medium text-white">Holder:</span> Seoul
                  City Tour Co., Ltd.
                </p>
                <p>
                  <span className="font-medium text-white">FAX:</span>{" "}
                  +82-2-774-8223
                </p>
              </div>
            </div>
          </div>

          {/* 하단 정책 및 카피라이트 섹션 (변경 없음) */}
          <div className="mt-16 pt-8 border-t border-gray-700">
            <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-sm mb-4">
              <Link
                href="/en/privacy"
                className="text-gray-400 hover:text-red-400 transition"
              >
                Email Collection Refusal Policy
              </Link>
              <span className="text-gray-600 hidden md:inline">|</span>
              <Link
                href="/en/terms"
                className="text-gray-400 hover:text-red-400 transition"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-600 hidden md:inline">|</span>
              <Link
                href="/en/policy"
                className="text-gray-400 hover:text-red-400 transition"
              >
                Terms of Service
              </Link>
              <span className="text-gray-600 hidden md:inline">|</span>
              <Link
                href="/en/sitemap"
                className="text-gray-400 hover:text-red-400 transition"
              >
                Sitemap
              </Link>
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">
              COPYRIGHT © 2004-2025 SEOUL CITY TOUR Co., LTD. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
