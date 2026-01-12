// src/app/page.tsx
import GlobalReviewsSection from "@/components/GlobalReviewsSection";
import FeaturedAccommodations from "@/components/FeaturedAccommodations";
import HeroCarousel1 from "@/components/HeroCarousel1";
import WhyChooseUs from "@/components/WhyChooseUs";
import PartnerSection from "@/components/PartnerSection";

import TourPackagesSection from "@/components/TourPackagesSection";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMZ Tour from Seoul | 3rd Tunnel & Dora Observatory",
  description:
    "The most complete DMZ day tour from Seoul. Visit the 3rd Tunnel, Dora Observatory, and Dorasan Station. Daily departures with an English-speaking guide.",
  openGraph: {
    title: "DMZ Tour from Seoul – Full Day Experience",
    description:
      "Explore the Korean Demilitarized Zone in one day. Hotel pickup, lunch included, and professional English guide.",
    images: [
      {
        url: "/og-dmz.jpg",
        width: 1200,
        height: 630,
        alt: "DMZ 3rd Tunnel and Dora Observatory",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DMZ Tour from Seoul",
    description:
      "Visit the DMZ in one day from Seoul. 3rd Tunnel, Dora Observatory, lunch included.",
    images: ["/og-dmz.jpg"],
  },
};

export default function Home() {
  return (
    <>
      {/* 1. Hero carousel for DMZ & Seoul tours */}
      <HeroCarousel1 />

      <WhyChooseUs />

      {/* 4. Main tour packages */}
      <TourPackagesSection />

      {/* 3. Featured accommodations / partners */}
      <FeaturedAccommodations />

      {/* 5. Global customer reviews */}
      {/* <GlobalReviewsSection /> */}

      {/* 2. Partner Section (Global Network) */}
      <PartnerSection />
    </>
  );
}
