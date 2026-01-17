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
    index: false,
    follow: false,
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
  ],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ===== Hero Section ===== */}
      <PageHero
        title="Contact Us"
        description="We are here to help you plan your perfect trip to Korea."
        imageSrc="/images/background_korea_pt2.png"
      />

      <section className="max-w-6xl mx-auto px-8 lg:px-12 mt-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-10">
          {/* =========================================
              [Left] Instant Chat
          ========================================= */}
          {/* ✅ 수정됨: rounded-[6px] 적용 */}
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
                  /* ✅ 수정됨: 버튼도 rounded-[6px] */
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
                  /* ✅ 수정됨: 버튼도 rounded-[6px] */
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
              {/* ✅ 수정됨: 배지도 rounded-[6px] */}
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 py-2 px-4 rounded-[6px] w-fit">
                <Clock className="w-4 h-4" />
                <span>Response time: Within 1 hour (09:00-18:00 KST)</span>
              </div>
            </div>
          </div>

          {/* =========================================
              [Right] Language Support & Office
          ========================================= */}
          <div className="space-y-8">
            {/* Language Support Card */}
            {/* ✅ 수정됨: rounded-[6px] */}
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
                    /* ✅ 수정됨: 버튼 rounded-[6px] */
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
                    /* ✅ 수정됨: 버튼 rounded-[6px] */
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
                    /* ✅ 수정됨: 버튼 rounded-[6px] */
                    className="px-5 py-2.5 bg-gray-50 hover:bg-[#4A7C7E] text-gray-700 hover:text-white rounded-[6px] text-sm font-bold transition"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>

            {/* Office Info Card */}
            {/* ✅ 수정됨: rounded-[6px] */}
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
          {/* ✅ 수정됨: rounded-[6px] */}
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
              /* ✅ 수정됨: 버튼 rounded-[6px] */
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-800 font-bold rounded-[6px] hover:bg-gray-50 hover:border-gray-400 transition w-full justify-center md:w-auto"
            >
              Check FAQ <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* 2. Booking CTA Box */}
          {/* ✅ 수정됨: rounded-[6px] */}
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
              /* ✅ 수정됨: 버튼 rounded-[6px] */
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
