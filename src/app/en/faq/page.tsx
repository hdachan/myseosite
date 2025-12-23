// src/app/en/faq/page.tsx
import { Metadata } from "next";
import FAQClient from "./FAQClient";

// ==============================
// SEO Metadata (hreflang + canonical 포함)
// ==============================
export const metadata: Metadata = {
  title: "Seoul City Tours FAQ 2025 – Booking, Prices, Solo & Private Tours",
  description:
    "Answers to frequently asked questions about Seoul city tours: last-minute booking, solo travelers, group size, languages (English/Japanese/Chinese), pickup locations, cancellation, refunds, and more.",

  alternates: {
    canonical: "https://yourdomain.com/en/faq",
    languages: {
      en: "https://yourdomain.com/en/faq",
      ja: "https://yourdomain.com/ja/faq",
      zh: "https://yourdomain.com/zh/faq",
      "x-default": "https://yourdomain.com/en/faq",
    },
  },

  robots: {
    index: true,
    follow: true,
  },
};

// ==============================
// FAQ CONTENT (SEO + UI SOURCE)
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
      "Cancellations made at least 24 hours before the tour start time are eligible for a full refund. " +
      "Cancellations made less than 24 hours before departure or no-shows are non-refundable. " +
      "Refund policies may vary depending on the tour, so please review the specific tour terms before booking.",
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
// FAQ Schema (JSON-LD for Google)
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
    <main className="min-h-screen bg-gray-50 pt-24">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Seoul City Tour – Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know before booking a Seoul city tour in
            Korea.
          </p>
        </header>

        {/* FAQ UI */}
        <FAQClient faqData={faqData} />

        {/* CTA Section */}
        <div className="mt-20 text-center space-y-6">
          <p className="text-gray-600">
            Ready to explore Seoul with a guided city tour?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/en/package"
              className="inline-flex items-center justify-center rounded-full bg-red-700 px-8 py-3 text-sm font-medium text-white hover:bg-red-800 transition"
            >
              View Tour Packages
            </a>
            <a
              href="/en/contact"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 px-8 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
