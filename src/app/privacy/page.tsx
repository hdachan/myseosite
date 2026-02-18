import { Metadata } from "next";
import { hangameFont } from "@/lib/fonts";

// ✅ 환경 변수
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://myseosite.vercel.app";
// ✅ SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "Privacy Policy",

  description:
    "Official Privacy Policy of Seoul City Tour. Learn how we safely collect, use, and protect your personal information.",

  alternates: {
    canonical: "/privacy",
  },

  openGraph: {
    title: "Privacy Policy | Seoul City Tour",
    description:
      "Your trust is our priority. Explore our data protection commitment.",
    url: `${SITE_URL}/privacy`,
    siteName: "Seoul City Tour",
    images: [
      {
        url: "/images/main-hero-korea-tour.jpg",
        width: 1200,
        height: 630,
        alt: "Seoul City Tour Privacy Policy Preview",
      },
    ],
    type: "website",
  },

  // ✅ 명시적 검색 허용 (선택사항이지만 통일성 유지)
  robots: {
    index: false, //ture
    follow: false, //ture
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-gray-800 leading-relaxed">
      {/* 제목 섹션 - 브랜드 그린 🟢 #2F6F6D 적용 */}
      <h1
        className={`${hangameFont.className} text-4xl font-black mb-2 text-gray-900`}
      >
        Privacy Policy
      </h1>
      <p className="text-sm font-semibold text-[#2F6F6D] mb-12">
        Last Updated: December 15, 2025
      </p>

      {/* 1~10번 본문 섹션 (원문 100% 보존 + 브랜드 디자인) */}
      <section className="space-y-12 text-sm md:text-base">
        {/* 1 */}
        <article>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <span className="w-1.5 h-6 bg-[#2F6F6D] rounded-full"></span>
            1. Collection of Personal Information
          </h2>
          <p>
            Seoul City Tour (“Company”) collects personal information necessary
            for reservations, bookings, payments, delivery of services, and
            customer support.
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-1 text-gray-600">
            <li>Information provided directly by users via the website</li>
            <li>
              Automatically collected data such as IP address, browser type,
              operating system, access date and time, and cookies
            </li>
            <li>Information provided via email or documents</li>
          </ul>
        </article>

        {/* 2 */}
        <article>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <span className="w-1.5 h-6 bg-[#2F6F6D] rounded-full"></span>
            2. Purpose of Use of Personal Information
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Processing tour and accommodation reservations</li>
            <li>Confirming, modifying, and managing reservations</li>
            <li>Payment processing and invoice delivery</li>
            <li>Responding to inquiries and partnership proposals</li>
          </ul>
        </article>

        {/* 3 */}
        <article>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <span className="w-1.5 h-6 bg-[#2F6F6D] rounded-full"></span>
            3. Provision of Personal Information to Third Parties
          </h2>
          <p>
            The Company does not provide personal information to third parties
            without prior user consent, except in the following cases:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-1 text-gray-600">
            <li>When the user has given explicit consent</li>
            <li>
              When disclosure is required by applicable laws or legal
              authorities
            </li>
          </ul>
        </article>

        {/* 4 */}
        <article>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <span className="w-1.5 h-6 bg-[#2F6F6D] rounded-full"></span>
            4. Retention and Use Period
          </h2>
          <p>
            Personal information is retained only for the period necessary to
            fulfill the purpose of collection and is destroyed without delay
            thereafter. Reservation-related information may be retained for
            verification purposes when necessary.
          </p>
        </article>

        {/* 5 */}
        <article>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <span className="w-1.5 h-6 bg-[#2F6F6D] rounded-full"></span>
            5. Destruction of Personal Information
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Paper documents are shredded or incinerated</li>
            <li>
              Electronic data is permanently deleted using technical methods
              that prevent recovery
            </li>
          </ul>
        </article>

        {/* 6 */}
        <article>
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            6. User Rights
          </h2>
          <p>
            Users may request access to, correction of, or deletion of their
            personal information at any time by contacting the Company.
          </p>
        </article>

        {/* 7 */}
        <article>
          <h2 className="text-xl font-bold mb-4 text-gray-900">7. Cookies</h2>
          <p>
            The Company uses cookies to enhance user experience and prevent
            repetitive pop-up notices. Users may refuse cookies through browser
            settings.
          </p>
        </article>

        {/* 8 */}
        <article>
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            8. Security Measures
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Password encryption</li>
            <li>Network data encryption</li>
            <li>Firewalls and security software</li>
            <li>Restricted access to personal information</li>
          </ul>
        </article>

        {/* 9 - 개인정보 책임자 강조 (그린 박스) */}
        <article className="bg-[#2F6F6D]/5 p-8 rounded-2xl border border-[#2F6F6D]/10">
          <h2 className="text-xl font-bold mb-4 text-[#2F6F6D]">
            9. Privacy Officer
          </h2>
          <p className="mb-4">
            Privacy Officer: <strong>Kang, Manager</strong>
          </p>
          <div className="inline-block bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-sm">
            Email:{" "}
            <a
              href="mailto:mail@seoulcitytour.net"
              className="text-[#2F6F6D] font-bold underline hover:text-[#B80D12] transition-colors"
            >
              mail@seoulcitytour.net
            </a>
          </div>
        </article>

        {/* 10 */}
        <article>
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            10. Policy Updates
          </h2>
          <p>
            This Privacy Policy may be updated in accordance with changes in
            applicable laws or Company policies. Any changes will be posted on
            the website.
          </p>
        </article>

        <div className="pt-10 border-t border-gray-100 text-gray-400 text-xs text-center">
          <p>© Seoul City Tour. All rights reserved.</p>
        </div>
      </section>
    </main>
  );
}
