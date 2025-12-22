// src/app/en/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart } from "lucide-react";
import Script from "next/script";
import { Instagram, Youtube, Facebook } from "lucide-react";

import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://mysite.com"),
  title: {
    default: "Korea DMZ Tours & Seoul Travel | DMZ Tour",
    template: "%s | Korea DMZ Tour",
  },
  description:
    "Seoul departure DMZ tour specialist. One-day course including the 3rd Tunnel, Dora Observatory, and Dorasan Station. Daily departure with lunch and English-speaking guide.",
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
            sameAs: [
              "https://www.instagram.com/yourinstagram",
              "https://www.facebook.com/yourfacebook",
              "https://www.youtube.com/youryoutube",
            ],
          }),
        }}
      />
      {/* HEADER */}
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
        {/* Mobile Toggle */}
        <input type="checkbox" id="mobile-menu" className="peer hidden" />

        {/* SLIM TOP BAR */}
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-3 lg:py-4">
          {/* LOGO */}
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
                className="relative px-3 py-2 text-[15px] font-medium text-gray-800 hover:text-red-800 transition group"
              >
                {label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-800 transition-all duration-300 group-hover:w-3/4" />
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5">
            {/* SHOPPING CART */}
            <Link
              href="/en/cart"
              className="relative p-2 text-gray-700 hover:text-red-800 transition"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* LANG SWITCHER */}
            <div className="hidden sm:flex items-center gap-3 border-l border-gray-300 pl-4">
              <Link
                href="/ko"
                className="text-gray-700 hover:text-red-800 text-[14px] font-medium"
              >
                한국어
              </Link>
              <Link
                href="/en"
                className="bg-red-800 text-white px-4 py-1.5 rounded-md text-xs font-semibold hover:bg-red-900 transition"
              >
                EN
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
        <div className="fixed inset-0 bg-white z-40 h-screen -translate-y-full peer-checked:translate-y-0 transition-transform duration-500 ease-in-out lg:hidden pointer-events-none peer-checked:pointer-events-auto">
          {/* Mobile top bar */}
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
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Mobile Cart Link */}
            <Link
              href="/en/cart"
              className="text-3xl font-semibold text-gray-800 hover:text-red-800 transition relative group flex items-center gap-3"
            >
              <ShoppingCart size={32} />
              Cart
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Mobile Language */}
            <div className="mt-10 flex flex-col items-center gap-5">
              <Link
                href="/ko"
                className="text-gray-700 hover:text-red-800 text-xl font-semibold transition"
              >
                한국어
              </Link>
              <Link
                href="/en"
                className="bg-red-800 text-white px-14 py-3 rounded-lg text-lg font-bold hover:bg-red-900 shadow-md transition"
              >
                ENGLISH
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 lg:pt-24">{children}</main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-14">
          {/* Top */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-600">
            {/* Company */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
              <p className="leading-relaxed">
                Seoul City Tour Co., Ltd.
                <br />
                Insadong, Jongno-gu, Seoul, South Korea
              </p>
              <p className="mt-3">
                <a
                  href="mailto:mail@seoulcitytour.net"
                  className="hover:underline"
                >
                  mail@seoulcitytour.net
                </a>
                <br />
                Tel. +82-2-774-3345
              </p>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/en/faq" className="hover:text-gray-900">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/en/contact" className="hover:text-gray-900">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/en/my-bookings" className="hover:text-gray-900">
                    Manage My Booking
                  </Link>
                </li>
                <li>
                  <Link
                    href="/en/cancellation-policy"
                    className="hover:text-gray-900"
                  >
                    Cancellation & Refund Policy
                  </Link>
                </li>
                <li className="pt-1">
                  <Link href="/en/blog" className="font-medium hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Explore + Legal */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Explore</h4>
              <ul className="space-y-2 mb-6">
                <li>
                  <Link href="/en/tours/dmz" className="hover:text-gray-900">
                    DMZ Tours
                  </Link>
                </li>
                <li>
                  <Link
                    href="/en/tours/seoul-city"
                    className="hover:text-gray-900"
                  >
                    Seoul City Tours
                  </Link>
                </li>
                <li>
                  <Link href="/en/private" className="hover:text-gray-900">
                    Private Tours
                  </Link>
                </li>
              </ul>

              <ul className="space-y-1 text-xs text-gray-500">
                <li>
                  <Link href="/en/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/en/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li className="pt-2">Business Reg. No: 507-88-02244</li>
                <li>Tour License No: 2008-000002</li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-200 pt-6 text-xs text-gray-500">
            {/* Payment */}
            <div className="flex items-center gap-4">
              <Image
                src="/payments/mastercard.svg"
                alt="Mastercard"
                width={40}
                height={24}
              />
              <Image
                src="/payments/visa.png"
                alt="visa"
                width={40}
                height={24}
              />
              <Image
                src="/payments/paypal.jpg"
                alt="Mastercard"
                width={40}
                height={24}
              />
            </div>

            {/* Social */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-gray-900 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-gray-900 transition"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-gray-900 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-4 text-center text-xs text-gray-400">
            © 2004–2026 Seoul City Tour Co., Ltd. All Rights Reserved.
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </>
  );
}
