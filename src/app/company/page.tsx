import PageHero from "@/components/PageHero";
import { Award, Users, Globe, Headset, ShieldCheck } from "lucide-react";

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageHero
        title="About Us"
        description="A Trusted Seoul Tour Operator Since 2004"
        imageSrc="/images/background_korea_pt2.jpg"
      />

      {/* Company Overview - Overlapping Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-2 border-red-800">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                A Trusted Seoul-Based Tour Operator Since 2004
              </h2>

              <div className="space-y-4 md:space-y-5 text-gray-700 leading-relaxed text-sm md:text-base">
                <p>
                  Seoul City Tour is a Seoul-based inbound travel company
                  providing professionally operated tour programs for
                  international travelers visiting Korea. Since 2004, we have
                  focused on delivering reliable, well-structured travel
                  experiences rooted in local expertise.
                </p>

                <p>
                  Our services include daily city tours, private and VIP travel
                  programs, and customized itineraries for international
                  conventions, corporate visits, and special-interest groups.
                  Every program is designed and managed by experienced
                  professionals familiar with the needs of global travelers.
                </p>

                <p>
                  With a strong operational foundation and multilingual support,
                  we work closely with global partners to ensure consistent
                  quality, safety, and clear communication throughout each
                  journey.
                </p>

                <p className="font-semibold text-red-700 pt-2">
                  Our focus is not on promises, but on delivering dependable
                  travel operations that our guests and partners can trust.
                </p>
              </div>
            </div>

            <div className="relative h-[300px] md:h-[350px] lg:h-[450px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop"
                alt="Seoul city tour with professional guide"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
      {/* CEO Message */}
      {/* CEO Message */}
      <section className="relative py-16 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* 섹션 헤더 */}
          <div className="mb-10 md:mb-16 text-center md:text-left">
            <p className="text-sm font-semibold text-red-700 uppercase tracking-widest mb-4 flex items-center justify-center md:justify-start gap-3">
              <span className="w-10 h-0.5 bg-red-700" />
              CEO Message
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Welcome to Seoul City Tour
            </h2>
          </div>

          {/* 메인 카드 */}
          <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-14">
            <div className="grid md:grid-cols-3 gap-12 items-start">
              {/* CEO Photo */}
              <div className="md:col-span-1 flex justify-center md:justify-start">
                <div className="relative">
                  {/* 그라디언트 링 */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-red-600 to-red-400 blur-sm opacity-60" />
                  <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-3xl overflow-hidden bg-gray-200 shadow-2xl">
                    <img
                      src="/images/company/park-do-young-ceo.png"
                      alt="Do-Young Park, Founder & Chief Executive Officer (CEO), Seoul City Tour"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* CEO Message Text */}
              <div className="md:col-span-2 relative">
                {/* SEO 문자열 일치 */}
                <h3 className="sr-only">
                  Do-Young Park, Founder & Chief Executive Officer (CEO), Seoul
                  City Tour
                </h3>

                {/* 세로 포인트 라인 */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-600 to-transparent rounded-full hidden md:block" />

                <div className="md:pl-8 max-w-5xl space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
                  <p className="font-medium text-gray-900">
                    Welcome to Seoul City Tour.
                  </p>

                  <p>
                    At Seoul City Tour, we believe that great travel is more
                    than visiting places — it is about understanding people,
                    culture, and stories.
                  </p>

                  <p>
                    As a Korea-based travel company with deep local expertise,
                    we curate carefully designed experiences that allow
                    travelers to connect with Korea in an authentic, safe, and
                    meaningful way.
                  </p>

                  <p>
                    From meticulous planning to professional on-site operation,
                    your comfort, safety, and satisfaction remain our highest
                    priorities. We promise honest service and journeys that stay
                    with you long after the trip ends.
                  </p>

                  <p>
                    Thank you for trusting Seoul City Tour. We would be honored
                    to accompany you on your journey through Korea.
                  </p>
                </div>

                {/* 서명 */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">
                    Founder & Chief Executive Officer
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    Do-Young Park
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Seoul City Tour</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-red-900 via-red-800 to-red-700">
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Company History
            </h2>
            <p className="text-red-100 text-base md:text-lg">
              Two decades of trusted inbound tourism operations in Korea
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                year: "2003 – 2008",
                event:
                  "Established as Mercury Travel Agency and rebranded as Seoul City Tour Co., Ltd., obtaining official travel business registration in Seoul.",
              },
              {
                year: "2009",
                event:
                  "Appointed as official tour agency for Qantas Airways and designated as an exclusive China-operated agency by the Ministry of Culture, Sports and Tourism.",
              },
              {
                year: "2010",
                event:
                  "Became the first inbound travel wholesaler in Korea and signed strategic partnerships with Expedia, Raymond Cruise, and multiple global travel companies.",
              },
              {
                year: "2011 – 2014",
                event:
                  "Authorized to operate regular DMZ tours and awarded multiple Quality Certifications by the Ministry of Culture, Sports and Tourism.",
              },
              {
                year: "2014",
                event:
                  "Successfully operated large-scale international events including ICM 2014, serving over 5,800 international delegates.",
              },
              {
                year: "2019",
                event:
                  "Recognized as a Top Inbound FIT Travel Agency in Korea, strengthening our position as a trusted inbound tour operator.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 md:p-8 rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="text-xl md:text-2xl font-bold text-red-700">
                    {item.year}
                  </div>
                </div>

                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Experienced professionals at Hanatour ITC
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2070"
                alt="Hanatour ITC Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Over 20 Years of Experience & Know-how",
                  desc: "Delivering customized tours that meet diverse customer needs.",
                },
                {
                  title: "Top-Tier Guides & Experts",
                  desc: "The best professionals in the industry take full responsibility for your journey.",
                },
                {
                  title: "Strict Safety & Hygiene Standards",
                  desc: "Every tour is operated with the highest priority on safety and cleanliness.",
                },
                {
                  title: "Always Friendly & Prompt Service",
                  desc: "We genuinely care about each and every customer.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-lg flex items-start gap-4 md:gap-5 hover:shadow-xl transition-shadow"
                >
                  <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              A trusted tour company built on professionalism and responsibility
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Award,
                title: "Licensed & Experienced Guides",
                desc: "All tours are led by certified Korean tour guides with proven field experience.",
              },
              {
                icon: ShieldCheck,
                title: "Safety-First Operations",
                desc: "Accident-free tour history with clean, regularly maintained tourist buses.",
              },
              {
                icon: Headset,
                title: "Clear & Fast Communication",
                desc: "Quick responses and transparent support before, during, and after each tour.",
              },
              {
                icon: Globe,
                title: "Trusted by Global Partners",
                desc: "Long-term partnerships with international travel agencies and clients worldwide.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-gray-50 p-6 md:p-8 rounded-xl text-center transition-all duration-300 border border-gray-100"
                >
                  <div className="bg-gradient-to-br from-red-600 to-red-700 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-red-700 via-red-800 to-red-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Travel with Confidence
          </h2>
          <p className="text-red-100 mb-8 md:mb-10 text-base md:text-lg max-w-2xl mx-auto">
            Plan your Korea trip with a professional team you can trust. Our
            support team is always here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/package"
              className="bg-white text-red-700 px-10 md:px-12 py-3 md:py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:-translate-y-1"
            >
              View Tours
            </a>
            <a
              href="/contact"
              className="bg-transparent text-white border-2 border-white px-10 md:px-12 py-3 md:py-4 rounded-lg font-bold hover:bg-white hover:text-red-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
