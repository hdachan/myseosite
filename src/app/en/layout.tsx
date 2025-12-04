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
    { href: "/en/attractions", label: "Attractions" },
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="border-b-2 border-red-800">
          <nav className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6">
            <Link href="/en" className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="DMZ Tour Logo"
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

            {/* Language Switcher - 우아한 스타일 */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 border-l-2 border-gray-300 pl-4">
                <Link href="/ko">
                  <button className="text-gray-600 hover:text-red-800 text-base font-semibold transition-colors duration-300">
                    한국어
                  </button>
                </Link>
                <button className="bg-red-800 text-white px-7 py-2.5 rounded text-sm font-bold tracking-wide hover:bg-red-900 transition-all duration-300 shadow-md hover:shadow-lg">
                  ENGLISH
                </button>
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

        {/* Mobile Menu - 전통적 느낌 */}
        <div className="fixed inset-0 z-40 bg-white h-screen -translate-y-full peer-checked:translate-y-0 transition-transform duration-500 ease-in-out lg:hidden pointer-events-none peer-checked:pointer-events-auto">
          <div className="flex items-center justify-between p-6 border-b-2 border-red-800">
            <Link href="/en">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={290}
                height={56}
                className="h-10 w-auto"
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
              <Link href="/ko">
                <button className="text-gray-700 hover:text-red-800 text-xl font-semibold transition-colors duration-300">
                  한국어
                </button>
              </Link>
              <button className="bg-red-800 text-white px-16 py-4 rounded text-lg font-bold tracking-wider hover:bg-red-900 transition-all duration-300 shadow-lg">
                ENGLISH
              </button>
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
                  <p>Company : Seoul City Tour Co., Ltd.</p>
                  <p>CEO : Park Do-young</p>
                  <p>E-mail : mail@seoulcitytour.net</p>
                  <p>TEL : +82-2-774-3345</p>
                  <p className="text-red-200">
                    Mail-order Business Registration No. Jongno-0710
                  </p>
                </div>
                <div className="space-y-3">
                  <p>
                    Bank Account : Shinhan Bank 100-023-904290 | Holder: Seoul
                    City Tour Co., Ltd.
                  </p>
                  <p>Business Registration No : 507-88-02244</p>
                  <p>
                    Address : 507, Hanaro Building, 194-4, Insadong, Jongno-gu,
                    Seoul
                  </p>
                  <p>FAX : +82-2-774-8223</p>
                  <p>Tour Business Registration No : 2008-000002</p>
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
              <Link href="/en/privacy" className="hover:underline">
                Email Collection Refusal Policy
              </Link>
              <span className="text-red-300">|</span>
              <Link href="/en/terms" className="hover:underline">
                Privacy Policy
              </Link>
              <span className="text-red-300">|</span>
              <Link href="/en/policy" className="hover:underline">
                Terms of Service
              </Link>
              <span className="text-red-300">|</span>
              <Link href="/en/sitemap" className="hover:underline">
                Sitemap
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
