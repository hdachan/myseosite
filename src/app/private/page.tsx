"use client";

import React from "react";
import PageHero from "@/components/PageHero";
import TourCard from "@/components/TourCard";
import { basicPackages as packageTours } from "@/app/package/packageData";

export default function PrivateTourPage() {
  const MAX_ITEMS = 4;
  const privateTours = packageTours.slice(0, MAX_ITEMS);

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageHero
        title="Private Tour"
        description="Customize your perfect Korean adventure with our VIP service"
        imageSrc="/images/background_korea_pt2.png"
      />

      {/* ⭐ [핵심 수정] 레이아웃 통일
        1. -mt-16 제거 -> mt-12 (헤더/배너 겹침 방지)
        2. px-4 -> px-8 lg:px-12 (좌우 여백 라인 일치)
      */}
      <div className="max-w-6xl mx-auto px-8 lg:px-12 mt-12 pb-24 space-y-20">
        {/* Section 1: Popular Private Tours */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Popular Private Tours
            </h2>
            <p className="text-gray-500 font-light">
              맞춤형 프라이빗 투어로 특별한 여행을 경험하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {privateTours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} priority={index === 0} />
            ))}
          </div>
        </section>

        {/* Section 2: Introduction (Text & Checklist) */}
        <section className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                We can meet your requirement!
              </h2>
              <p className="text-gray-500 font-light mb-6 leading-relaxed">
                고객님의 요구사항에 맞춰 완벽한 여행을 설계해드립니다. 특별한
                장소 방문부터 일정 조율까지, 전문 가이드가 함께합니다.
              </p>
              <div className="flex items-center gap-2 text-[#ad3928] font-semibold">
                <span>★</span>
                <span>Make yourself VIP!</span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                "Do you have special places to go? We'll follow your agenda.",
                "Do you want to have your own tour but don't know well the places?",
                "We are glad to make your agenda from your request.",
                "Our intelligent, professional tour guides and drivers promise you the best services.",
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 text-xs">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base leading-snug">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Guide Service Charge */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Guide Service Charge
            </h2>
            <p className="text-gray-500 text-sm">
              전문 가이드 서비스 요금 안내
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  {/* ⭐ 그라디언트 제거 -> 깔끔한 다크 그레이 배경 */}
                  <tr className="bg-gray-800 text-white text-sm uppercase tracking-wide">
                    <th className="px-6 py-4 text-left font-medium">
                      Guide Language
                    </th>
                    <th className="px-6 py-4 text-center font-medium">
                      Max 4 Hours
                    </th>
                    <th className="px-6 py-4 text-center font-medium">
                      Max 8 Hours
                    </th>
                    <th className="px-6 py-4 text-center font-medium">
                      Over 20 Pax
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {guideCharges.map((guide, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {guide.language}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        {guide.max4h !== "Please, contact." ? (
                          `KRW ${guide.max4h}`
                        ) : (
                          <span className="text-red-600 font-medium">
                            Contact Us
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        {guide.max8h && `KRW ${guide.max8h}`}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        {guide.over20 && `KRW ${guide.over20}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 pl-1">
            * If there is over time, it'll be extra charge.
          </p>
        </section>

        {/* Section 4: Transportation */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Transportation Service
            </h2>
            <p className="text-gray-500 text-sm">
              편안하고 안전한 차량 서비스 요금
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  {/* ⭐ 깔끔한 다크 그레이 배경 */}
                  <tr className="bg-gray-800 text-white text-sm uppercase tracking-wide">
                    <th className="px-6 py-4 text-center font-medium">
                      Vehicle
                    </th>
                    <th className="px-6 py-4 text-center font-medium">
                      Max 4 Hours
                    </th>
                    <th className="px-6 py-4 text-center font-medium">
                      Max 8 Hours
                    </th>
                    <th className="px-6 py-4 text-center font-medium">
                      Airport Pickup/Sending
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {transportations.map((transport, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center gap-3 min-w-[140px]">
                          <img
                            src={transport.image}
                            alt={transport.name}
                            className="w-28 h-16 object-cover rounded-lg border border-gray-200"
                          />
                          <div className="text-center">
                            <p className="font-bold text-gray-900">
                              {transport.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {transport.passengers}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-medium text-gray-700">
                        KRW {transport.max4h}
                      </td>
                      <td className="px-6 py-4 text-center font-medium text-gray-700">
                        KRW {transport.max8h}
                      </td>
                      <td className="px-6 py-4 text-center font-medium text-gray-700">
                        KRW {transport.airport}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 space-y-1 text-xs text-gray-400 font-light pl-1">
            <p>* This price is only within Seoul.</p>
            <p>
              * Extra charges apply for trips outside Seoul based on distance.
            </p>
            <p>* Overtime (beyond 8 hours) incurs an extra hourly charge.</p>
            <p>* Usage over 4 hours is charged as a full day fare.</p>
            <p>* Tolls and parking fees are not included.</p>
            <p>
              * Driver/Guide accommodation fees are not included for overnight
              trips.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
