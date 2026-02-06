import { Metadata } from "next";
import FAQClient from "./FAQClient";
import PageHero from "@/components/PageHero";
import { hangameFont } from "@/lib/fonts";

// ✅ 1법칙: 도메인 동적 할당
const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://myseosite.vercel.app/";

// ==============================
// SEO Metadata
// ==============================
export const metadata: Metadata = {
  title: "Seoul City Tours FAQ 2025 – Booking, Prices, Solo & Private Tours",
  description:
    "Answers to frequently asked questions about Seoul city tours: last-minute booking, solo travelers, group size, languages (English/Japanese/Chinese), pickup locations, cancellation, refunds, and more.",

  alternates: {
    canonical: `${BASE_URL}/faq`,
    languages: {
      en: `${BASE_URL}/faq`,
      // 다국어 페이지가 실제로 있다면 아래 주석 해제 및 경로 수정
      // ja: `${BASE_URL}/ja/faq`,
      // zh: `${BASE_URL}/zh/faq`,
      "x-default": `${BASE_URL}/faq`,
    },
  },

  // 🚨 [중요 수정] 검색 엔진 허용 (False -> True)
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },

  openGraph: {
    title: "Seoul City Tours FAQ | Common Questions",
    description:
      "Everything you need to know regarding booking, cancellation, and tour details.",
    url: `${BASE_URL}/faq`,
    type: "website",
    images: [
      {
        url: "/images/background_korea_pt2.png",
        width: 1200,
        height: 630,
        alt: "Seoul City Tour FAQ Cover",
      },
    ],
  },
};

// ==============================
// FAQ CONTENT (정적 데이터 - 안정성 확보)
// ==============================
const faqData = [
  {
    question: "How late can I book a Seoul city tour?",
    answer:
      "Seoul city tours can be booked up to a minimum of 5 hours before the tour start time, subject to availability.",
  },
  {
    question: "Can I join a Seoul tour as a solo traveler?",
    answer:
      "Yes, solo travelers are welcome to join our Seoul tours. Each tour has a minimum participant requirement. " +
      "If the minimum is met, you can join even as a solo traveler. " +
      "For example, tours with a minimum of 1 participant are always available, " +
      "while tours with a minimum of 3 participants are available if another group has already booked.",
  },
  {
    question: "What languages are available for Seoul city tours?",
    answer:
      "Seoul city tours are conducted in English, Japanese, and Chinese. " +
      "Please note that Japanese and Chinese tours require a minimum of 4 participants.",
  },
  {
    question: "Where is the meeting point for Seoul city tours?",
    answer:
      "Meeting points vary depending on the tour. Most Seoul city tours start from major hotels in downtown Seoul, " +
      "popular subway stations, or designated landmarks. " +
      "The exact meeting point will be provided in your booking confirmation email.",
  },
  {
    question: "Is hotel pickup included in Seoul city tours?",
    answer:
      "Hotel pickup is available for selected Seoul city tours. " +
      "Some tours require participants to meet at a central meeting point. " +
      "Please check the tour details or contact us in advance to confirm pickup availability.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "Please read our cancellation policy carefully before booking. " +
      "Free cancellation is available until 3:00 PM (KST) on the day before the tour. " +
      "Cancellations made after 3:00 PM (KST) on the day before the tour are subject to a 100% cancellation fee (no refund). " +
      "If the tour is cancelled by the operator due to weather or safety reasons, a full refund will be provided. " +
      "Refunds are processed to the original payment method and may take 5–10 business days to reflect in your account.",
  },
  {
    question: "How can I book a Seoul city tour?",
    answer:
      "You can book a Seoul city tour through our website, by email, or via messaging apps. " +
      "Email: mail@seoulcitytour.net. " +
      "WhatsApp or KakaoTalk (English): +82 10 8736 2140. " +
      "Viber: +82 10 8736 2140. " +
      "KakaoTalk (Japanese): +82 10 4767 7451.",
  },
];

// ==============================
// FAQ Schema (구글 검색결과 노출용)
// ==============================
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <main className={`min-h-screen bg-gray-50 ${hangameFont.className}`}>
      {/* ✅ 1법칙: JSON-LD 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <PageHero
        title="Seoul City Tour FAQ"
        description="Everything you need to know before booking your perfect Seoul adventure."
        imageSrc="/images/seoul-palace-stone-wall-background.jpg"
        alt="Traditional Korean palace stone wall and nature scenery"
      />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 sm:py-24">
        {/* Intro Section */}
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Common Questions
          </h2>
          <p className="text-gray-500 leading-relaxed text-lg">
            Cannot find what you are looking for? Check our answers below to
            prepare for your trip.
          </p>
        </div>

        {/* FAQ UI Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* FAQ List (Client Component) */}
          <div className="lg:col-span-8">
            <FAQClient faqData={faqData} />
          </div>

          {/* Side CTA / Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Sticky 효과를 위해 sticky top-24 추가 추천 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need Help?
              </h3>
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                If you have specific questions about private tours or custom
                itineraries, feel free to contact us directly.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="/package"
                  className="w-full inline-flex items-center justify-center rounded-xl bg-black text-white px-6 py-4 text-sm font-bold transition-all hover:bg-gray-800 shadow-md"
                >
                  View Packages
                </a>
                <a
                  href="/contact"
                  className="w-full inline-flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-6 py-4 text-sm font-bold text-gray-900 transition-all hover:border-black hover:bg-gray-50"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
