"use client";

import React from "react";

export default function PrivateTourPage() {
  const guideCharges = [
    {
      language: "English",
      max4h: "250,000",
      max8h: "350,000",
      over20: "450,000",
    },
    {
      language: "Chinese/Japanese",
      max4h: "250,000",
      max8h: "350,000",
      over20: "450,000",
    },
    {
      language: "Russian, Spanish, etc.",
      max4h: "Please, contact.",
      max8h: "",
      over20: "",
    },
  ];

  const transportations = [
    {
      name: "Deluxe Sedan",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=200&fit=crop",
      passengers: "Up to 3 passengers",
      max4h: "400,000",
      max8h: "600,000",
      airport: "400,000",
    },
    {
      name: "10 pax Van",
      image:
        "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=300&h=200&fit=crop",
      passengers: "Up to 10 passengers",
      max4h: "250,000",
      max8h: "350,000",
      airport: "200,000",
    },
    {
      name: "18 pax Mini Bus",
      image:
        "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=300&h=200&fit=crop",
      passengers: "Up to 18 passengers",
      max4h: "400,000",
      max8h: "580,000",
      airport: "380,000",
    },
    {
      name: "40 pax Tour Bus",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop",
      passengers: "Up to 40 passengers",
      max4h: "500,000",
      max8h: "750,000",
      airport: "500,000",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <div className="relative pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/background_korea_pt2.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-700/80 via-red-800/80 to-red-900/80" />

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-5xl">🚗</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
              Private Tour
            </h1>
          </div>
          <p className="text-red-100 text-base md:text-lg ml-16 max-w-2xl">
            Customize your perfect Korean adventure with our VIP service
          </p>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 pb-16">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-2 border-red-800 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            We can meet your requirement!
          </h2>
          <div className="space-y-3 text-gray-700 text-sm md:text-base">
            <p className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✓</span>
              <span>
                Do you have special places to go? We'll follow your agenda.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✓</span>
              <span>
                Do you want to have your own tour but don't know well the
                places?
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✓</span>
              <span>We are glad to make your agenda from your request.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-red-600 mt-1">✓</span>
              <span>
                Our intelligent, professional tour guides and drivers promise
                you the best services.
              </span>
            </p>
            <p className="flex items-start gap-2 font-bold text-red-700">
              <span className="text-red-600 mt-1">✓</span>
              <span>Make yourself VIP!</span>
            </p>
          </div>
        </div>

        {/* Guide Service Charge */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-2 border-red-800 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Guide Service Charge
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-red-700 text-white">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Guide
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                    Max, 4Hours
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                    Max, 8Hours
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                    Over 20 Pax
                  </th>
                </tr>
              </thead>
              <tbody>
                {guideCharges.map((guide, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      {guide.language}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                      {guide.max4h !== "Please, contact." ? (
                        `KRW ${guide.max4h}`
                      ) : (
                        <span className="text-red-600 font-medium">
                          Please, contact.
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                      {guide.max8h && `KRW ${guide.max8h}`}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                      {guide.over20 && `KRW ${guide.over20}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs md:text-sm text-gray-600 mt-4">
            * If there is over time, it'll be extra charge.
          </p>
        </div>

        {/* Transportation */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-2 border-red-800 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Transportation
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-red-700 text-white">
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                    Transportation
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                    Max, 4Hours
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                    Max, 8Hours
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">
                    Airport Pick up
                    <br />
                    Sending Service
                  </th>
                </tr>
              </thead>
              <tbody>
                {transportations.map((transport, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-4">
                      <div className="flex flex-col items-center gap-3">
                        <img
                          src={transport.image}
                          alt={transport.name}
                          className="w-32 h-20 object-cover rounded-lg shadow-md"
                        />
                        <div className="text-center">
                          <p className="font-bold text-gray-900">
                            {transport.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {transport.passengers}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-gray-700 font-medium">
                      KRW {transport.max4h}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-gray-700 font-medium">
                      KRW {transport.max8h}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-gray-700 font-medium">
                      KRW {transport.airport}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-2 text-xs md:text-sm text-gray-600 mt-6">
            <p>* If there is over time, it'll be extra charge.</p>
            <p>* This price is only Seoul.</p>
            <p>
              * In case of going out of Seoul, there is extra charge according
              the distance.
            </p>
            <p>
              * In case of using over 8hours, there will be extra charge per
              1hour.
            </p>
            <p>
              * In case of using over 4hours, the fare will be charged as full
              day fare.
            </p>
            <p>* The toll fee and parking fee is not included.</p>
            <p>
              * In case of staying overnight tour guide and driver,
              accommodation fee is not included.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Book Your Private Tour?
          </h3>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            Contact us now to customize your perfect Korean experience with our
            VIP private tour service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/en/contact"
              className="bg-white text-red-700 px-10 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Us
            </a>
            <a
              href="/en/package"
              className="bg-transparent text-white border-2 border-white px-10 py-3 rounded-lg font-bold hover:bg-white hover:text-red-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              View Group Tours
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
