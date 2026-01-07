"use client";

import React from "react";
import PageHero from "@/components/PageHero";
import TourCard from "@/components/TourCard";

// 👇 [수정됨] basicPackages를 가져와서 packageTours라는 이름으로 사용 (as 사용)
import { basicPackages as packageTours } from "@/app/en/package/packageData";

export default function PrivateTourPage() {
  // packageData에서 처음 4개의 투어만 가져오기
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
        imageSrc="/images/background_korea_pt2.jpg"
      />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 pb-16">
        {/* Package Tours Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border-t-4 border-[#37848c] mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[#37848c] to-[#ad3928]"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              Popular Private Tours
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-6 font-light">
            맞춤형 프라이빗 투어로 특별한 여행을 경험하세요
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {privateTours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} priority={index === 0} />
            ))}
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100 mb-8 relative overflow-hidden">
          {/* 은은한 한글 배경 */}
          <div className="absolute top-0 right-0 text-[180px] font-bold text-gray-100/30 leading-none pointer-events-none select-none">
            맞춤
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-[#37848c] to-[#d97d4a]"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                We can meet your requirement!
              </h2>
            </div>
            <p className="text-sm text-gray-400 mb-8 font-light">
              고객님의 요구사항에 맞춰 완벽한 여행을 설계해드립니다
            </p>

            <div className="space-y-4 text-gray-700 text-sm md:text-base">
              <div className="flex items-start gap-3 group">
                <div className="mt-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#37848c] to-[#d97d4a] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="group-hover:text-gray-900 transition-colors">
                  Do you have special places to go? We'll follow your agenda.
                </span>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="mt-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#37848c] to-[#d97d4a] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="group-hover:text-gray-900 transition-colors">
                  Do you want to have your own tour but don't know well the
                  places?
                </span>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="mt-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#37848c] to-[#d97d4a] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="group-hover:text-gray-900 transition-colors">
                  We are glad to make your agenda from your request.
                </span>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="mt-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#37848c] to-[#d97d4a] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="group-hover:text-gray-900 transition-colors">
                  Our intelligent, professional tour guides and drivers promise
                  you the best services.
                </span>
              </div>
              <div className="flex items-start gap-3 group mt-6 pt-4 border-t border-gray-100">
                <div className="mt-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#ad3928] to-[#d97d4a] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">★</span>
                </div>
                <span className="font-semibold text-[#ad3928] group-hover:text-[#d97d4a] transition-colors">
                  Make yourself VIP!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Guide Service Charge */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 mb-8 relative overflow-hidden">
          {/* 은은한 한글 배경 */}
          <div className="absolute bottom-0 left-0 text-[150px] font-bold text-gray-100/20 leading-none pointer-events-none select-none">
            가이드
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-[#37848c] to-[#d9bd8b]"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                Guide Service Charge
              </h2>
            </div>
            <p className="text-sm text-gray-400 mb-6 font-light">
              전문 가이드 서비스 요금 안내
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#37848c] to-[#4a9aa3] text-white">
                    <th className="border border-gray-200 px-4 py-3 text-left font-medium">
                      Guide
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-medium">
                      Max, 4Hours
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-medium">
                      Max, 8Hours
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-medium">
                      Over 20 Pax
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {guideCharges.map((guide, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="border border-gray-200 px-4 py-3 font-medium text-gray-800">
                        {guide.language}
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-gray-600">
                        {guide.max4h !== "Please, contact." ? (
                          `KRW ${guide.max4h}`
                        ) : (
                          <span className="text-[#ad3928] font-medium">
                            Please, contact.
                          </span>
                        )}
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-gray-600">
                        {guide.max8h && `KRW ${guide.max8h}`}
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-gray-600">
                        {guide.over20 && `KRW ${guide.over20}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs md:text-sm text-gray-400 mt-4 font-light">
              * If there is over time, it'll be extra charge.
            </p>
          </div>
        </div>

        {/* Transportation */}
        <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 mb-8 relative overflow-hidden">
          {/* 은은한 한글 배경 */}
          <div className="absolute top-0 right-0 text-[160px] font-bold text-gray-100/25 leading-none pointer-events-none select-none">
            교통
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-[#d97d4a] to-[#ad3928]"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                Transportation
              </h2>
            </div>
            <p className="text-sm text-gray-400 mb-6 font-light">
              편안하고 안전한 차량 서비스
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#d97d4a] to-[#d9bd8b] text-white">
                    <th className="border border-gray-200 px-4 py-3 text-center font-medium">
                      Transportation
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-medium">
                      Max, 4Hours
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-medium">
                      Max, 8Hours
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-medium">
                      Airport Pick up
                      <br />
                      Sending Service
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {transportations.map((transport, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="border border-gray-200 px-4 py-4">
                        <div className="flex flex-col items-center gap-3">
                          <img
                            src={transport.image}
                            alt={transport.name}
                            className="w-32 h-20 object-cover rounded-xl shadow-md"
                          />
                          <div className="text-center">
                            <p className="font-semibold text-gray-800">
                              {transport.name}
                            </p>
                            <p className="text-xs text-gray-400 font-light">
                              {transport.passengers}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-gray-600 font-medium">
                        KRW {transport.max4h}
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-gray-600 font-medium">
                        KRW {transport.max8h}
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-center text-gray-600 font-medium">
                        KRW {transport.airport}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-2 text-xs md:text-sm text-gray-400 mt-6 font-light">
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
    </div>
  );
}
