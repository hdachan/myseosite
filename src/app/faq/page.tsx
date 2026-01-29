import { Metadata } from "next";
import FAQClient from "./FAQClient";
import PageHero from "@/components/PageHero";
// 폰트 경로 (사용하시는 경로에 맞게 유지)
import { hangameFont } from "@/lib/fonts";

// ==============================
// SEO Metadata
// ==============================
export const metadata: Metadata = {
  title: "Seoul City Tours FAQ 2025 – Booking, Prices, Solo & Private Tours",
  description:
    "Answers to frequently asked questions about Seoul city tours: last-minute booking, solo travelers, group size, languages (English/Japanese/Chinese), pickup locations, cancellation, refunds, and more.",

  alternates: {
    canonical: "https://yourdomain.com/faq",
    languages: {
      en: "https://yourdomain.com/faq",
      ja: "https://yourdomain.com/ja/faq",
      zh: "https://yourdomain.com/zh/faq",
      "x-default": "https://yourdomain.com/faq",
    },
  },

  robots: {
    index: false,
    follow: false,
  },
};

// ==============================
// FAQ CONTENT (✅ 취소 규정 업데이트 완료)
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
// FAQ Schema
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
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <PageHero
        title="Seoul City Tour FAQ"
        description="Everything you need to know before booking your perfect Seoul adventure."
        imageSrc="/images/seoul-palace-stone-wall-background.png"
        alt="Traditional Korean palace stone wall and nature scenery"
      />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-8 lg:px-12 py-16 sm:py-24">
        {/* Intro Section */}
        <div className="mb-12 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Common Questions
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Cannot find what you are looking for? Check our answers below to
            prepare for your trip.
          </p>
        </div>

        {/* FAQ UI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* FAQ List */}
          <div className="lg:col-span-8">
            <FAQClient faqData={faqData} />
          </div>

          {/* Side CTA / Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need Help?
              </h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                If you have specific questions about private tours or custom
                itineraries, feel free to contact us directly.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="/package"
                  className="w-full inline-flex items-center justify-center rounded-xl bg-red-700 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-red-800"
                >
                  View Packages
                </a>
                <a
                  href="/contact"
                  className="w-full inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-bold text-gray-900 transition-all hover:bg-gray-50 hover:border-gray-300"
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
