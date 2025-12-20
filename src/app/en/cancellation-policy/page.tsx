import Link from "next/link";

export const metadata = {
  title: "Cancellation & Refund Policy | Seoul City Tour",
  description:
    "Read the cancellation and refund policy for Seoul City Tour. Free cancellation is available until 3:00 PM (KST) on the day before the tour.",
};

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Cancellation & Refund Policy
        </h1>

        {/* Intro */}
        <p className="text-gray-600 mb-10 leading-relaxed">
          Please review our cancellation and refund policy carefully before
          making a reservation. By booking a tour with Seoul City Tour, you
          agree to the terms outlined below.
        </p>

        {/* Policy Box */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-6 text-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Cancellation Policy
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Free cancellation is available until{" "}
                <strong>3:00 PM (KST)</strong> on the day before the tour date.
              </li>
              <li>
                Cancellations made after <strong>3:00 PM (KST)</strong> on the
                day before the tour date will be charged{" "}
                <strong>100% of the total amount</strong>.
              </li>
              <li>
                No refunds will be provided for late cancellations or no-shows.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Tour Cancellation by Operator
            </h2>
            <p className="leading-relaxed">
              If a tour is cancelled by the operator due to weather conditions,
              safety concerns, or other operational reasons, a full refund will
              be issued.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Refund Process
            </h2>
            <p className="leading-relaxed">
              Refunds will be processed to the original payment method. Please
              note that it may take <strong>5–10 business days</strong> for the
              refund to appear, depending on your bank or payment provider.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-sm text-gray-600">
          <p>
            If you have any questions regarding cancellations or refunds, please
            contact us at{" "}
            <a
              href="mailto:mail@seoulcitytour.net"
              className="text-gray-900 underline"
            >
              mail@seoulcitytour.net
            </a>{" "}
            or visit our{" "}
            <Link href="/en/contact" className="text-gray-900 underline">
              Contact Us
            </Link>{" "}
            page.
          </p>
        </div>
      </div>
    </main>
  );
}
