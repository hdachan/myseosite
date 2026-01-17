import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  // ✅ 실제 도메인 주소 (나중에 꼭 변경!)
  metadataBase: new URL("https://mysite.com"),

  title: {
    default: "Korea DMZ Tours & Seoul Travel | Seoul City Tour",
    template: "%s | Seoul City Tour",
  },
  description:
    "Seoul departure DMZ tour specialist. One-day course including the 3rd Tunnel, Dora Observatory, and Dorasan Station. Daily departure with lunch and English-speaking guide.",

  robots: {
    index: false,
    follow: false,
  },

  icons: { icon: "/favicon.ico" },

  alternates: {
    canonical: "/",
  },

  // Open Graph (카톡/페북 공유 미리보기)
  openGraph: {
    title: "DMZ Tour from Seoul – Full Day Experience",
    description: "The most complete DMZ tour departing from Seoul.",
    siteName: "Seoul City Tour",
    url: "/",
    images: [
      {
        url: "/images/background_v3.png",
        width: 1200,
        height: 630,
        alt: "Seoul City Tour Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter (트위터 미리보기)
  twitter: {
    card: "summary_large_image",
    title: "DMZ Tour from Seoul",
    description: "Explore the Korean Demilitarized Zone.",
    // ✅ [수정됨] 여기도 똑같이 교체!
    images: ["/images/background_v3.png"],
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
        <Script
          id="jsonld-travelagency"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Seoul City Tour",
              // ✅ [수정됨] 구조화 데이터 이미지도 교체
              image: "https://mysite.com/images/background_v3.png",
              url: "https://mysite.com",
              logo: "https://mysite.com/images/logo.png",
              description: "DMZ tour specialist departing from Seoul.",
              telephone: "+82-2-774-3345",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "507, Hanaro Building, 194-4 Insadong, Jongno-gu",
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
                "https://www.instagram.com/seoulcitytour.official",
                "https://www.youtube.com/@HelloKOREA",
                "https://facebook.com",
              ],
            }),
          }}
        />

        <Header />
        <main className="min-h-screen">{children}</main>

        <Footer />

        <FloatingChatButton />
        <ScrollToTop />
      </body>
    </html>
  );
}
