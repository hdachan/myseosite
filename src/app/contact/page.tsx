import React from "react";
import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";

/* ==============================
   SEO Metadata
============================== */
export const metadata: Metadata = {
  title: "Contact Seoul City Tour | WhatsApp, Kakao & Travel Support",
  description:
    "Contact Seoul City Tour for bookings and travel assistance in Korea. Reach us via WhatsApp, KakaoTalk, phone, or email. Fast response and multilingual support available.",
  alternates: {
    canonical: "https://yourdomain.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ==============================
   Structured Data (Schema)
============================== */
const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "Seoul City Tour",
  url: "https://yourdomain.com",
  logo: "https://yourdomain.com/images/logo.png",
  email: "mail@seoulcitytour.net",
  telephone: "+82-2-774-3345",
  address: {
    "@type": "PostalAddress",
    streetAddress: "서울특별시 종로구 인사동 194-4 하나로빌딩 507호",
    addressLocality: "Seoul",
    addressRegion: "Jongno-gu",
    addressCountry: "KR",
  },
  openingHours: "Mo-Fr 09:00-18:00",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+82-10-8736-2140",
      availableLanguage: ["English", "Korean"],
    },
    {
      "@type": "ContactPoint",
      contactType: "Japanese support",
      telephone: "+82-10-4082-7451",
      availableLanguage: ["Japanese"],
    },
    {
      "@type": "ContactPoint",
      contactType: "Chinese support",
      telephone: "+82-10-5617-9039",
      availableLanguage: ["Chinese"],
    },
  ],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-0">
      {/* ===== Structured Data Injection ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ===== Hero Section (Layout Component) ===== */}
      <PageHero
        title="Contact Seoul City Tour"
        description="Get in touch with our team for tour bookings, travel inquiries, and local assistance in Korea."
        imageSrc="/images/background_korea_pt2.jpg"
      />

      {/* ================= Contact Content ================= */}
      <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-2 border-red-800">
          <div className="grid md:grid-cols-2 gap-10">
            {/* ===== Instant Contact ===== */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Instant Contact
              </h2>

              <div className="space-y-4">
                <a
                  href="https://api.whatsapp.com/message/WAPNAALNN7UUL1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition"
                >
                  <MessageCircle className="w-7 h-7 text-green-600" />
                  <div>
                    <p className="font-bold">WhatsApp</p>
                    <p className="text-sm text-gray-600">+82 10 8736 2140</p>
                  </div>
                </a>

                <a
                  href="https://qr.kakao.com/talk/_MUOV7whPhIbnJ4Kx6NszOwhnTo-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition"
                >
                  <MessageCircle className="w-7 h-7 text-yellow-500" />
                  <div>
                    <p className="font-bold">KakaoTalk</p>
                    <p className="text-sm text-gray-600">+82 10 8736 2140</p>
                  </div>
                </a>
              </div>

              <p className="mt-6 text-sm text-gray-600">
                ⏱ Typical response time: within 1 hour (KST)
              </p>
            </section>

            {/* ===== Office & Address ===== */}
            <section className="space-y-6">
              <div>
                <p className="font-bold mb-2">English / 日本語</p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +82 10 4082 7451
                </p>
              </div>

              <div>
                <p className="font-bold mb-2">中文预订</p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +82 10 5617 9039
                </p>
              </div>

              <address className="not-italic text-sm text-gray-700 space-y-2 border-t pt-4">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  서울특별시 종로구 인사동 194-4 하나로빌딩 507호
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Tel: +82 2 774 3345
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  mail@seoulcitytour.net
                </p>
                <p className="text-gray-500">
                  Office hours: Mon–Fri 09:00–18:00 (KST)
                </p>
              </address>
            </section>
          </div>

          {/* ===== Booking CTA ===== */}
          <div className="mt-12 pt-8 border-t text-center">
            <p className="text-lg font-semibold mb-4">
              Ready to book your tour in Korea?
            </p>
            <a
              href="/package"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-700 text-white hover:bg-red-800 transition"
            >
              View Tour Packages
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
