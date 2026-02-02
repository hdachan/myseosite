import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";
import ScrollToTop from "@/components/ScrollToTop";
import { CurrencyProvider } from "@/app/context/CurrencyContext";

const BASE_URL = "https://myseosite.vercel.app";

// [기존 메타데이터 로직 100% 유지]
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Korea's No.1 DMZ Tour & Expert Guides | Seoul City Tour",
    template: "%s | Seoul City Tour",
  },
  description:
    "Korea's No.1 DMZ Tour with expert Korean guides. Visit 3rd Tunnel & Dora Observatory. Beyond scenery, we promise a warmth that stays forever. Daily departures.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: { icon: "/favicon.ico" },
  verification: {
    // google: "aBcDeFgHiJkLmNoP...",
  },
  openGraph: {
    title: "Korea's No.1 DMZ Tour | Seoul City Tour",
    description:
      "Beyond scenery, we promise a warmth that stays forever. Join Korea's No.1 DMZ Tour with expert guides.",
    siteName: "Seoul City Tour",
    url: BASE_URL,
    images: [
      {
        url: "/images/main-hero-korea-tour.jpg",
        width: 1200,
        height: 630,
        alt: "Seoul City Tour Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Korea's No.1 DMZ Tour | Seoul City Tour",
    description:
      "Beyond scenery, we promise a warmth that stays forever. Join Korea's No.1 DMZ Tour with expert guides.",
    images: ["/images/main-hero-korea-tour.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 구조화 데이터 (JSON-LD) - 기존 로직 유지 */}
        <Script
          id="jsonld-travelagency"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Seoul City Tour",
              image: `${BASE_URL}/images/main-hero-korea-tour.jpg`,
              url: BASE_URL,
              logo: `${BASE_URL}/images/icon_logo.jpg`,
              description: "DMZ tour specialist departing from Seoul.",
              telephone: "+82-2-774-3345",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "507, Hanaro Building, 194-4 Insadong, Jongno-gu",
                addressLocality: "Seoul",
                postalCode: "03162",
                addressCountry: "KR",
              },
              sameAs: [
                "https://www.instagram.com/seoulcitytour.official",
                "https://www.youtube.com/@HelloKOREA",
              ],
            }),
          }}
        />

        {/* ✅ [추가] 환율 공급자(CurrencyProvider)로 하위 컴포넌트 전체를 감쌉니다. */}
        <CurrencyProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingChatButton />
          <ScrollToTop />
        </CurrencyProvider>
      </body>
    </html>
  );
}
