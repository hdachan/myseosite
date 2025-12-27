// src/app/en/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Instagram, Youtube, Facebook } from "lucide-react"; // 추가

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
  return (
    <>
      <Script
        id="jsonld-travelagency"
        type="application/ld+json"
        strategy="beforeInteractive"
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
              streetAddress: "507, Hanaro Building, 194-4 Insadong, Jongno-gu",
              addressLocality: "Seoul",
              postalCode: "03163",
              addressCountry: "KR",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "21044",
              bestRating: "5",
            },
            sameAs: [
              "https://www.instagram.com/yourinstagram",
              "https://www.facebook.com/yourfacebook",
              "https://www.youtube.com/youryoutube",
            ],
          }),
        }}
      />

      <Header />

      <script
        dangerouslySetInnerHTML={{
          __html: `
          const checkbox = document.getElementById('mobile-menu');
          if (checkbox) {
            checkbox.addEventListener('change', (e) => {
              document.body.style.overflow = e.target.checked ? 'hidden' : '';
            });
          }
        `,
        }}
      />

      <main className="pt-16">{children}</main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-600">
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
                  className="hover:underline hover:text-[#4A7C7E]"
                >
                  mail@seoulcitytour.net
                </a>
                <br />
                Tel. +82-2-774-3345
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/en/faq" className="hover:text-[#4A7C7E]">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/en/contact" className="hover:text-[#4A7C7E]">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/en/my-bookings" className="hover:text-[#4A7C7E]">
                    Manage My Booking
                  </Link>
                </li>
                <li>
                  <Link
                    href="/en/cancellation-policy"
                    className="hover:text-[#4A7C7E]"
                  >
                    Cancellation & Refund Policy
                  </Link>
                </li>
                <li className="pt-1">
                  <Link
                    href="/en/blog"
                    className="font-medium hover:underline hover:text-[#4A7C7E]"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Explore</h4>
              <ul className="space-y-2 mb-6">
                <li>
                  <Link href="/en/tours/dmz" className="hover:text-[#4A7C7E]">
                    DMZ Tours
                  </Link>
                </li>
                <li>
                  <Link
                    href="/en/tours/seoul-city"
                    className="hover:text-[#4A7C7E]"
                  >
                    Seoul City Tours
                  </Link>
                </li>
                <li>
                  <Link href="/en/private" className="hover:text-[#4A7C7E]">
                    Private Tours
                  </Link>
                </li>
              </ul>

              <ul className="space-y-1 text-xs text-gray-500">
                <li>
                  <Link
                    href="/en/privacy"
                    className="hover:underline hover:text-[#4A7C7E]"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/en/terms"
                    className="hover:underline hover:text-[#4A7C7E]"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li className="pt-2">Business Reg. No: 507-88-02244</li>
                <li>Tour License No: 2008-000002</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-200 pt-6 text-xs text-gray-500">
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
                alt="PayPal"
                width={40}
                height={24}
              />
            </div>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/seoulcitytour.official?igsh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[#4A7C7E] transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@HelloKOREA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-[#4A7C7E] transition"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-[#4A7C7E] transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-gray-400">
            © 2004–2026 Seoul City Tour Co., Ltd. All Rights Reserved.
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </>
  );
}
