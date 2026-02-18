import { Metadata } from "next";
import { hangameFont } from "@/lib/fonts";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://seoulcitytour.net";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "Terms of Service | Seoul City Tour",

  description:
    "Terms of Service governing the use of services provided by Seoul City Tour.",

  alternates: {
    canonical: "/terms",
  },

  openGraph: {
    title: "Terms of Service | Seoul City Tour",
    description: "Read the official Terms of Service for Seoul City Tour.",
    url: `${SITE_URL}/terms`,
    siteName: "Seoul City Tour",
    images: [
      {
        url: "/images/main-hero-korea-tour.jpg",
        width: 1200,
        height: 630,
        alt: "Seoul City Tour Terms of Service Preview",
      },
    ],
    type: "website",
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
  return (
    <main
      className={`min-h-screen bg-gray-50 pt-28 pb-20 ${hangameFont.className}`}
    >
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Terms of Service
          </h1>

          <section className="space-y-10 text-sm leading-7 text-gray-700">
            {/* 1 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">1. Purpose</h2>
              <p>
                These Terms of Service (“Terms”) govern the rights, obligations,
                and responsibilities between Seoul City Tour (“Company”) and
                users regarding the use of services provided through the
                website.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">2. Definitions</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  “Service” means tour, booking, reservation, and related travel
                  services provided by the Company.
                </li>
                <li>
                  “User” means any individual or entity accessing or using the
                  Service.
                </li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">3. Use of Services</h2>
              <p>
                Users may use the Service only for lawful purposes and in
                accordance with these Terms. The Company may restrict access if
                a user violates applicable laws or these Terms.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                4. Reservations and Payments
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All reservations are subject to availability.</li>
                <li>
                  Prices, schedules, and availability may change without prior
                  notice.
                </li>
                <li>
                  Payments must be completed according to the methods specified
                  on the website.
                </li>
              </ul>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                5. Cancellations and Refunds
              </h2>
              <p>
                Cancellation and refund policies vary depending on the tour or
                service purchased and will be provided at the time of booking.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                6. Limitation of Liability
              </h2>
              <p>
                The Company shall not be held liable for damages arising from
                force majeure events, third-party service providers, or user
                negligence.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                7. Intellectual Property
              </h2>
              <p>
                All content on the website, including text, images, logos, and
                software, is the property of the Company or its licensors and
                may not be used without prior written consent.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                8. Suspension and Termination
              </h2>
              <p>
                The Company may suspend or terminate a user’s access to the
                Service without prior notice if the user violates these Terms.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                9. Governing Law and Jurisdiction
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the Republic of Korea. Any disputes shall be
                subject to the exclusive jurisdiction of the courts of Korea.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                10. Changes to Terms
              </h2>
              <p>
                The Company may revise these Terms at any time. Updated Terms
                will be posted on the website and become effective upon posting.
              </p>
            </div>

            {/* 11 */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                11. Contact Information
              </h2>
              <p>
                For questions regarding these Terms, please contact us at:
                <br />
                <a
                  href="mailto:mail@seoulcitytour.net"
                  className="text-gray-900 underline hover:text-red-700 transition-colors"
                >
                  mail@seoulcitytour.net
                </a>
              </p>
            </div>

            <div className="pt-10 text-gray-500">
              <p>Effective Date: December 15, 2025</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
