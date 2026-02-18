import { Metadata } from "next";
import Link from "next/link";
import { hangameFont } from "@/lib/fonts";

// ✅ 배포 주소 자동 대응
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://myseosite.vercel.app";

// ✅ SEO 최적화 메타데이터
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "Cancellation & Refund Policy",

  description:
    "Read the official cancellation and refund policy for Seoul City Tour. Free cancellation is available until 3:00 PM (KST) on the day before the tour.",

  alternates: {
    canonical: "/cancellation-policy",
  },

  openGraph: {
    title: "Cancellation & Refund Policy | Seoul City Tour",
    description:
      "Free cancellation is available until 3:00 PM (KST) on the day before the tour.",
    url: `${SITE_URL}/cancellation-policy`,
    siteName: "Seoul City Tour",
    type: "website",
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function CancellationPolicyPage() {
  return (
    <main
      className={`min-h-screen bg-gray-50 pt-28 pb-20 ${hangameFont.className}`}
    >
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="max-w-3xl">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Cancellation & Refund Policy
          </h1>

          {/* Intro */}
          <p className="text-gray-600 mb-10 leading-relaxed">
            Please review our cancellation and refund policy carefully before
            making a reservation. By booking a tour with Seoul City Tour, you
            agree to the terms outlined below.
          </p>

          {/* Policy Box */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-8 text-gray-700 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Cancellation Policy
              </h2>
              <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                <li>
                  Free cancellation is available until{" "}
                  <strong>3:00 PM (KST)</strong> on the day before the tour
                  date.
                </li>
                <li>
                  Cancellations made after <strong>3:00 PM (KST)</strong> on the
                  day before the tour date will be charged{" "}
                  <strong>100% of the total amount</strong>.
                </li>
                <li>
                  No refunds will be provided for late cancellations or
                  no-shows.
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Tour Cancellation by Operator
              </h2>
              <p className="leading-relaxed">
                If a tour is cancelled by the operator due to weather
                conditions, safety concerns, or other operational reasons, a
                full refund will be issued.
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Refund Process
              </h2>
              <p className="leading-relaxed">
                Refunds will be processed to the original payment method. Please
                note that it may take <strong>5–10 business days</strong> for
                the refund to appear, depending on your bank or payment
                provider.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-sm text-gray-500 leading-relaxed">
            <p>
              If you have any questions regarding cancellations or refunds,
              please contact us at{" "}
              <a
                href="mailto:mail@seoulcitytour.net"
                className="text-gray-900 font-medium underline hover:text-red-700 transition-colors"
              >
                mail@seoulcitytour.net
              </a>{" "}
              or visit our{" "}
              <Link
                href="/contact"
                className="text-gray-900 font-medium underline hover:text-red-700 transition-colors"
              >
                Contact Us
              </Link>{" "}
              page.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
