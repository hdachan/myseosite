import React from "react";
import Image from "next/image";
import { Award, Users, Globe, Heart } from "lucide-react";

export default function CompanyPage() {
  return (
    <div className="pt-24">
      {/* Hero Section with Overlapping Design */}
      <div className="relative pb-32">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/background_korea_pt2.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-700/80 via-red-800/80 to-red-900/80"></div>

        <div className="container mx-auto px-6 py-12 md:py-16 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 tracking-wide">
            About Us
          </h1>
          <p className="text-red-100 text-base md:text-lg max-w-2xl">
            Your Trusted Travel Partner Since 2004
          </p>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900"></div>

        {/* Breadcrumb - overlapping design */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-t-3xl shadow-2xl px-8 py-5 inline-block border-t-4 border-red-800">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="text-red-800">🏠</span>
                <span className="text-gray-400">/</span>
                <span className="text-red-800">About Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Overview - Overlapping Content */}
      <section className="container mx-auto px-4 md:px-6 -mt-16 md:-mt-20 relative z-10 pb-16">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12 border-t-4 border-red-800">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                The Best City Tour Company in Korea
              </h2>
              <div className="space-y-4 md:space-y-5 text-gray-700 leading-relaxed text-sm md:text-base">
                <p>
                  Seoul City Tour is the best city tour company in Korea with
                  experienced experts. We've been providing excellent quality
                  services for tourists of all nationalities.
                </p>
                <p>
                  Seoul City Tour is specialized in daily package tours,
                  arranging international convention tour programs, and VIP
                  private tours in Korea.
                </p>
                <p className="font-semibold text-red-700 pt-2">
                  We promise to treat you with thoughtful consideration once you
                  join us, Seoul City Tour.
                </p>
              </div>
            </div>

            <div className="relative h-[300px] md:h-[350px] lg:h-[450px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/company-intro.jpg"
                alt="Seoul City Tour"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals at Hanatour ITC
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2070"
                alt="Hanatour ITC Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
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
                  className="bg-white p-8 rounded-2xl shadow-lg flex items-start gap-5 hover:shadow-xl transition-shadow"
                >
                  <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-red-900 via-red-800 to-red-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Company History
            </h2>
            <p className="text-red-100 text-lg">
              Two decades of excellence in Korean tourism
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { year: "2004", event: "Seoul City Tour Co., Ltd. established" },
              { year: "2008", event: "Obtained Tour Business Registration" },
              { year: "2015", event: "Launched VIP private tour services" },
              { year: "2018", event: "TripAdvisor Certificate of Excellence" },
              { year: "2020", event: "Introduced COVID-safe tour protocols" },
              { year: "2024", event: "Served over 50,000 satisfied customers" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-red-700">
                    {item.year}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-sm font-bold text-red-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-red-700"></span>
              CEO Message
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              A Value Beyond Travel
            </h2>
          </div>
          <div className="space-y-6 text-gray-700 leading-relaxed text-base mb-10">
            <p>
              HanatourITC is an inbound-specialized travel agency with a 100%
              share owned by Hanatour.
            </p>
            <p>HanatourITC specializes in inbound and intrabound travel...</p>
            <p>
              In preparation for the upcoming changes in the inbound market
              after COVID-19...
            </p>
          </div>
          <div className="pt-8 border-t-2 border-gray-300">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              CEO
            </p>
            <p className="text-3xl font-bold text-gray-900">Park Do-young</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg">
              What makes Seoul City Tour special
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Award Winning",
                desc: "Certificate of Excellence and top ratings from global travelers",
              },
              {
                icon: Users,
                title: "Expert Guides",
                desc: "Professional guides with deep knowledge of Korean culture",
              },
              {
                icon: Globe,
                title: "Global Service",
                desc: "Multi-language support for travelers from 100+ countries",
              },
              {
                icon: Heart,
                title: "Korean Hospitality",
                desc: "Warm hearts and thoughtful personalized service",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-gray-50 p-8 rounded-xl text-center hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-red-100"
                >
                  <div className="bg-gradient-to-br from-red-600 to-red-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
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
      <section className="py-20 bg-gradient-to-r from-red-700 via-red-800 to-red-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Explore Korea?
          </h2>
          <p className="text-red-100 mb-10 text-lg max-w-2xl mx-auto">
            Book your tour today and experience the best of Korean culture and
            history with Seoul City Tour
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/en/package"
              className="bg-white text-red-700 px-12 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              View Tours
            </a>
            <a
              href="/en/contact"
              className="bg-transparent text-white border-2 border-white px-12 py-4 rounded-lg font-bold hover:bg-white hover:text-red-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
