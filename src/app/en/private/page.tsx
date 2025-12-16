"use client";

import React from "react";

export default function PrivateTourPage() {
  const packageTours = [
    {
      id: 1,
      location: "Tour · Seoul",
      title: "[Muslim Friendly] Special Seoul/Nami Island Day Tour",
      description: "Available from tomorrow · Limited seats",
      image:
        "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600&h=400&fit=crop",
      rating: 5,
      reviews: 9,
      bookings: "100+ bookings",
      price: 112.79,
      originalPrice: 150.0,
      discount: 25,
    },
    {
      id: 2,
      location: "Tour · DMZ",
      title: "DMZ & North Korea Observation Tour",
      description: "Joint Security Area · Dora Observatory",
      image:
        "https://images.unsplash.com/photo-1601096829474-4aae6cc5e66f?w=600&h=400&fit=crop",
      rating: 4.9,
      reviews: 124,
      bookings: "300+ bookings",
      price: 79.0,
    },
    {
      id: 3,
      location: "Tour · Seoul",
      title: "K-Drama Filming Location Tour",
      description: "Visit famous shooting locations",
      image:
        "https://images.unsplash.com/photo-1526481280691-3d3fcd7c61c9?w=600&h=400&fit=crop",
      rating: 4.8,
      reviews: 67,
      bookings: "120+ bookings",
      price: 65.5,
      originalPrice: 92.0,
      discount: 29,
    },
    {
      id: 4,
      location: "Tour · Gangwon",
      title: "Vivaldi Park Ski Day Tour",
      description: "Beginner friendly · Rental included",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
      rating: 4.7,
      reviews: 88,
      bookings: "150+ bookings",
      price: 99.0,
    },
  ];

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
        {/* Package Tours Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-2 border-red-800 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Popular Private Tours
          </h2>

          {/* 🔹 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packageTours.map((tour) => (
              <a
                key={tour.id}
                href={`/en/package/${tour.id}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-[380px] flex flex-col">
                  <div className="relative h-[140px] overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* 할인 뱃지 */}
                    {tour.discount && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md">
                        {tour.discount}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="text-xs text-gray-500 mb-2">
                      {tour.location}
                    </div>

                    <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
                      {tour.title}
                    </h3>

                    <div className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {tour.description}
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-yellow-500 text-sm">★</span>
                      <span className="text-sm font-bold text-gray-900">
                        {tour.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({tour.reviews}) • {tour.bookings}
                      </span>
                    </div>

                    <div className="mt-auto">
                      {tour.discount ? (
                        <>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-gray-400 line-through">
                              $ {tour.originalPrice}
                            </span>
                            <span className="text-xs font-semibold text-red-600">
                              {tour.discount}% OFF
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-bold text-red-600">
                              $ {tour.price}
                            </span>
                            <span className="text-sm text-gray-600">From</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-bold text-gray-900">
                            $ {tour.price}
                          </span>
                          <span className="text-sm text-gray-600">From</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

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
      </div>
    </div>
  );
}
