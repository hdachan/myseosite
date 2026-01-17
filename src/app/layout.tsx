import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  // ⭐ [정답] Vercel 임시 주소를 넣으시면 됩니다!
  // 이제 이미지는 https://myseosite.vercel.app/images/background_v3.png 경로로 제공됩니다.
  metadataBase: new URL("https://myseosite.vercel.app"),

  title: {
    default: "Korea DMZ Tours & Seoul Travel | Seoul City Tour",
    template: "%s | Seoul City Tour",
  },
  description:
    "Seoul departure DMZ tour specialist. One-day course including the 3rd Tunnel, Dora Observatory, and Dorasan Station. Daily departure with lunch and English-speaking guide.",

  // 테스트 중이니 로봇 수집 차단 유지
  robots: {
    index: false,
    follow: false,
  },

  icons: { icon: "/favicon.ico" },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "DMZ Tour from Seoul – Full Day Experience",
    description: "The most complete DMZ tour departing from Seoul.",
    siteName: "Seoul City Tour",
    url: "/",
    images: [
      {
        // 실제 작동 경로: https://myseosite.vercel.app/images/background_v3.png
        url: "/images/background_v3.png",
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
    title: "DMZ Tour from Seoul",
    description: "Explore the Korean Demilitarized Zone.",
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
              // 구조화 데이터도 임시 주소 기반으로 변경
              image: "https://myseosite.vercel.app/images/background_v3.png",
              url: "https://myseosite.vercel.app",
              logo: "https://myseosite.vercel.app/images/logo.png",
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
