"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQClient({ faqData }: { faqData: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="flex flex-col gap-4">
      {faqData.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={`group w-full rounded-2xl transition-all duration-300 ${
              isOpen
                ? "bg-white shadow-md border border-gray-200"
                : "bg-white border border-gray-100 hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <span
                className={`text-lg font-medium transition-colors duration-300 ${
                  isOpen
                    ? "text-gray-900"
                    : "text-gray-700 group-hover:text-gray-900"
                }`}
              >
                {faq.question}
              </span>
              <span
                className={`ml-6 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                  isOpen
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                }`}
              >
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed border-t border-transparent">
                  <div className="pt-2 text-[15px]">{faq.answer}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
