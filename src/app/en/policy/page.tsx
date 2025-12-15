export const metadata = {
  title: "Privacy Policy | Seoul City Tour",
  description:
    "Privacy Policy of Seoul City Tour explaining how we collect, use, and protect personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-10">Privacy Policy</h1>

      <section className="space-y-10 text-sm leading-7">
        {/* 1 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            1. Collection of Personal Information
          </h2>
          <p>
            Seoul City Tour (“Company”) collects personal information necessary
            for reservations, bookings, payments, delivery of services, and
            customer support.
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>Information provided directly by users via the website</li>
            <li>
              Automatically collected data such as IP address, browser type,
              operating system, access date and time, and cookies
            </li>
            <li>Information provided via email or documents</li>
          </ul>
        </div>

        {/* 2 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            2. Purpose of Use of Personal Information
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Processing tour and accommodation reservations</li>
            <li>Confirming, modifying, and managing reservations</li>
            <li>Payment processing and invoice delivery</li>
            <li>Responding to inquiries and partnership proposals</li>
          </ul>
        </div>

        {/* 3 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            3. Provision of Personal Information to Third Parties
          </h2>
          <p>
            The Company does not provide personal information to third parties
            without prior user consent, except in the following cases:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>When the user has given explicit consent</li>
            <li>
              When disclosure is required by applicable laws or legal
              authorities
            </li>
          </ul>
        </div>

        {/* 4 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            4. Retention and Use Period
          </h2>
          <p>
            Personal information is retained only for the period necessary to
            fulfill the purpose of collection and is destroyed without delay
            thereafter. Reservation-related information may be retained for
            verification purposes when necessary.
          </p>
        </div>

        {/* 5 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            5. Destruction of Personal Information
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Paper documents are shredded or incinerated</li>
            <li>
              Electronic data is permanently deleted using technical methods
              that prevent recovery
            </li>
          </ul>
        </div>

        {/* 6 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">6. User Rights</h2>
          <p>
            Users may request access to, correction of, or deletion of their
            personal information at any time by contacting the Company.
          </p>
        </div>

        {/* 7 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">7. Cookies</h2>
          <p>
            The Company uses cookies to enhance user experience and prevent
            repetitive pop-up notices. Users may refuse cookies through browser
            settings.
          </p>
        </div>

        {/* 8 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">8. Security Measures</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Password encryption</li>
            <li>Network data encryption</li>
            <li>Firewalls and security software</li>
            <li>Restricted access to personal information</li>
          </ul>
        </div>

        {/* 9 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">9. Privacy Officer</h2>
          <p>
            Privacy Officer: <strong>Kang, Manager</strong>
            <br />
            Email:{" "}
            <a
              href="mailto:mail@seoulcitytour.net"
              className="text-blue-600 underline"
            >
              mail@seoulcitytour.net
            </a>
          </p>
        </div>

        {/* 10 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">10. Policy Updates</h2>
          <p>
            This Privacy Policy may be updated in accordance with changes in
            applicable laws or Company policies. Any changes will be posted on
            the website.
          </p>
        </div>

        <div className="pt-10 text-gray-500">
          <p>Effective Date: December 15, 2025</p>
        </div>
      </section>
    </main>
  );
}
