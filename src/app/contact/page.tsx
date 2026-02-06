import React from "react";
import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  Clock,
  Globe,
  HelpCircle,
} from "lucide-react";
import PageHero from "@/components/PageHero";

// ✅ 1법칙: 도메인 동적 할당
const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://myseosite.vercel.app/";

/* ==============================
   SEO Metadata
============================== */
export const metadata: Metadata = {
  title: "Contact Seoul City Tour | WhatsApp, Kakao & Travel Support",
  description:
    "Contact Seoul City Tour for bookings and travel assistance in Korea. Reach us via WhatsApp, KakaoTalk, phone, or email. Fast response and multilingual support available.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  // 🚨 테스트 단계 (완료 후 true로 변경)
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Contact Seoul City Tour | Instant Support",
    description: "Need help? Chat with us directly via WhatsApp or KakaoTalk.",
    url: `${BASE_URL}/contact`,
    type: "website",
    images: [
      {
        url: "/images/seoul-palace-stone-wall-background.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Seoul City Tour Support",
      },
    ],
  },
};

/* ==============================
   Structured Data (Schema)
   ✅ 구글 맵 링크(hasMap) 반영 완료
============================== */
const structuredData = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness"],
  name: "DMZ Tour - Seoul City Tour",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.png`,
  email: "mail@seoulcitytour.net",
  telephone: "+82-10-8736-2140",
  priceRange: "$$",
  image: `${BASE_URL}/images/seoul-palace-stone-wall-background.jpg`,

  address: {
    "@type": "PostalAddress",
    streetAddress: "507, Hanaro Building, 194-4 Insadong, Jongno-gu",
    addressLocality: "Seoul",
    postalCode: "03162",
    addressCountry: "KR",
  },

  // ✅ 실제 하나로빌딩 좌표
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.5720602,
    longitude: 126.9853831,
  },

  // ✅ [수정됨] 보내주신 구글 지도 링크 적용
  hasMap: "https://maps.app.goo.gl/bTP8o5BBrbf5hG4u7",

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+82-10-8736-2140",
      availableLanguage: ["English", "Korean", "Japanese", "Chinese"],
      contactOption: "TollFree",
    },
  ],
  sameAs: [
    "https://www.instagram.com/seoulcitytour.official",
    "https://www.youtube.com/@HelloKOREA",
  ],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ✅ 1법칙: JSON-LD 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero
        title="Contact Us"
        description="We are here to help you plan your perfect trip to Korea."
        imageSrc="/images/seoul-palace-stone-wall-background.jpg"
        alt="Traditional Korean palace stone wall and nature scenery"
      />

      <section className="max-w-6xl mx-auto px-6 lg:px-12 mt-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* =========================================
              [Left] Instant Chat
          ========================================= */}
          <div className="bg-white p-6 md:p-8 rounded-[6px] border border-gray-200 shadow-sm flex flex-col h-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-[#4A7C7E]" />
                Instant Chat
              </h2>
              <p className="text-gray-600 mt-2">
                For the fastest response, message us directly.
              </p>
            </div>

            <div className="space-y-4 flex-grow">
              {/* WhatsApp */}
              <a
                href="https://api.whatsapp.com/message/WAPNAALNN7UUL1"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center justify-between p-5 rounded-[6px]
                  bg-[#25D366]/10 border border-[#25D366]/20
                  hover:bg-[#25D366] hover:text-white hover:shadow-lg hover:-translate-y-1
                  transition-all duration-300 group
                "
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <MessageCircle
                      className="w-6 h-6 text-[#25D366]"
                      fill="currentColor"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900 group-hover:text-white">
                      WhatsApp
                    </p>
                    <p className="text-sm text-gray-600 group-hover:text-white/90 font-medium">
                      +82 10 8736 2140
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>

              {/* KakaoTalk */}
              <a
                href="https://qr.kakao.com/talk/_MUOV7whPhIbnJ4Kx6NszOwhnTo-"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center justify-between p-5 rounded-[6px]
                  bg-[#FAE100]/20 border border-[#FAE100]/30
                  hover:bg-[#FAE100] hover:shadow-lg hover:-translate-y-1
                  transition-all duration-300 group
                "
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <MessageCircle
                      className="w-6 h-6 text-[#3C1E1E]"
                      fill="currentColor"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900">KakaoTalk</p>
                    <p className="text-sm text-gray-700 font-medium">
                      +82 10 8736 2140
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 py-2 px-4 rounded-[6px] w-fit">
                <Clock className="w-4 h-4" />
                <span>Response time: Within 1 hour</span>
              </div>
            </div>
          </div>

          {/* =========================================
              [Right] Language Support & Office
          ========================================= */}
          <div className="space-y-8">
            {/* Language Support Card */}
            <div className="bg-white p-6 md:p-8 rounded-[6px] border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#4A7C7E]" />
                Language Support
              </h3>

              <div className="space-y-6">
                {/* English / Korean */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-bold text-gray-900 text-base">
                        English / Korean
                      </p>
                      <p className="text-sm font-bold text-[#4A7C7E] mt-0.5">
                        +82 10 8736 2140
                      </p>
                    </div>
                  </div>
                  <a
                    href="tel:+821087362140"
                    className="px-5 py-2.5 bg-gray-50 hover:bg-[#4A7C7E] text-gray-700 hover:text-white rounded-[6px] text-sm font-bold transition"
                  >
                    Call
                  </a>
                </div>

                {/* Japanese */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-bold text-gray-900 text-base">
                        Japanese Support
                      </p>
                      <p className="text-sm font-bold text-[#4A7C7E] mt-0.5">
                        +82 10 4082 7451
                      </p>
                    </div>
                  </div>
                  <a
                    href="tel:+821040827451"
                    className="px-5 py-2.5 bg-gray-50 hover:bg-[#4A7C7E] text-gray-700 hover:text-white rounded-[6px] text-sm font-bold transition"
                  >
                    Call
                  </a>
                </div>

                {/* Chinese */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-bold text-gray-900 text-base">
                        Chinese Support
                      </p>
                      <p className="text-sm font-bold text-[#4A7C7E] mt-0.5">
                        +82 10 5617 9039
                      </p>
                    </div>
                  </div>
                  <a
                    href="tel:+821056179039"
                    className="px-5 py-2.5 bg-gray-50 hover:bg-[#4A7C7E] text-gray-700 hover:text-white rounded-[6px] text-sm font-bold transition"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>

            {/* Office Info Card */}
            <div className="bg-white p-6 md:p-8 rounded-[6px] border border-gray-200 shadow-sm text-sm text-gray-600 space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <address className="not-italic">
                  <span className="block text-gray-900 font-bold mb-1 text-base">
                    Seoul Head Office
                  </span>
                  Rm 507, Hanaro Bldg, 194-4 Insadong, Jongno-gu, Seoul, Korea
                </address>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                <a
                  href="mailto:mail@seoulcitytour.net"
                  className="hover:text-[#4A7C7E] hover:underline transition font-medium text-base"
                >
                  mail@seoulcitytour.net
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                <span className="font-medium text-base">
                  +82 2 774 3345 (Office)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Bottom 2 Boxes (반반 배치) ===== */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {/* 1. FAQ Box */}
          <div className="bg-white rounded-[6px] p-8 border border-gray-200 shadow-sm text-center flex flex-col items-center justify-center h-full">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-full mb-4">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Have a common question?
            </h2>
            <p className="text-gray-600 text-sm mb-6 flex-grow">
              Check our FAQ page. You might find the answer regarding bookings
              or tour details.
            </p>
            <a
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-800 font-bold rounded-[6px] hover:bg-gray-50 hover:border-gray-400 transition w-full justify-center md:w-auto"
            >
              Check FAQ <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* 2. Booking CTA Box */}
          <div className="bg-red-50 rounded-[6px] p-8 border border-red-100 text-center flex flex-col items-center justify-center h-full">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-full mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-red-900 mb-2">
              Ready to start your journey?
            </h3>
            <p className="text-red-700/80 text-sm mb-6 flex-grow">
              Check out our best-selling tour packages and explore Korea.
            </p>
            <a
              href="/package"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-700 text-white font-bold rounded-[6px] hover:bg-red-800 transition shadow-md w-full justify-center md:w-auto"
            >
              View Tours <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
