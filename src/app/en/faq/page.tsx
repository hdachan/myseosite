"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How late can I book a tour?",
    answer: (
      <>
        You can book the tour <strong>up to 5 hours before departure</strong>,
        subject to availability.
        <br />
        <br />
        Some tours may close earlier if all seats are filled, so we recommend
        booking in advance whenever possible.
      </>
    ),
  },
  {
    question: "Can I join the tour as a solo traveler?",
    answer: (
      <>
        Yes, <strong>solo travelers are always welcome</strong>.
        <br />
        <br />
        Each tour has a minimum participant requirement. As long as that minimum
        is met, you can join the tour even if you are traveling alone.
        <ul className="mt-3 list-disc list-inside space-y-1">
          <li>
            <strong>Minimum 1 participant</strong>: Always available
          </li>
          <li>
            <strong>Minimum 3 participants</strong>: You can join if other
            guests are already booked
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "What languages are available for the tour?",
    answer: (
      <>
        Our tours are available in{" "}
        <strong>English, Japanese, and Chinese</strong>.
        <ul className="mt-3 list-disc list-inside space-y-1">
          <li>
            <strong>English tours</strong>: No minimum participant requirement
          </li>
          <li>
            <strong>Japanese & Chinese tours</strong>: Available with a minimum
            of 4 participants
          </li>
        </ul>
        <p className="mt-2 text-sm text-gray-500">
          Language availability may vary depending on the tour.
        </p>
      </>
    ),
  },
  {
    question: "How can I book a tour?",
    answer: (
      <>
        You can book a tour using any of the following methods:
        <ul className="mt-3 space-y-2">
          <li>• Online booking via the tour product page</li>
          <li>• Email: mail@seoulcitytour.net</li>
          <li>• WhatsApp / KakaoTalk (English): +82 10-8736-2140</li>
          <li>• KakaoTalk (Japanese): +82 10-4767-7451</li>
          <li>• Viber (English): +82 10-8736-2140</li>
        </ul>
      </>
    ),
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know before joining our tours in Seoul.
          </p>
        </header>

        {/* FAQ Accordion */}
        <section className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-shadow hover:shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We’re happy to help.
          </p>
          <Link
            href="/en/contact"
            className="inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-800 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
