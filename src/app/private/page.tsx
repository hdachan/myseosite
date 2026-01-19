"use client";

import React, { useRef, useState, useEffect } from "react";
import PageHero from "@/components/PageHero";
import TourCard from "@/components/TourCard";

// ✅ 1. 로컬 데이터 삭제
// import { basicPackages as packageTours } from "@/app/package/packageData";

// ✅ 2. Sanity Client 추가
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import { hangameFont } from "@/lib/fonts";

export default function PrivateTourPage() {
  // ✅ 3. Sanity 데이터를 담을 State 생성
  const [privateTours, setPrivateTours] = useState<any[]>([]);

  // ✅ 4. 데이터 가져오기 (useEffect)
  useEffect(() => {
    const fetchPrivateTours = async () => {
      try {
        // 평점 높은 순으로 4개만 가져오기 (Popular Private Tours용)
        const query = groq`
          *[_type == "tour"] | order(rating desc)[0...4] {
            _id,
            title,
            "slug": slug.current,
            "image": mainImage.asset->url,
            category,
            price,
            originalPrice,
            discount,
            rating,
            reviews,
            bookings,
            tags
          }
        `;
        const data = await client.fetch(query);

        const mappedData = data.map((tour: any) => ({
          ...tour,
          id: tour._id,
          image: tour.image || "",
          price: tour.price || 0,
          rating: tour.rating || 5.0,
          reviews: tour.reviews || 0,
          bookings: tour.bookings || "0+ booked",
          tags: tour.tags || [],
        }));

        setPrivateTours(mappedData);
      } catch (error) {
        console.error("Failed to fetch private tours:", error);
      }
    };

    fetchPrivateTours();
  }, []);

  // ✅ 스크롤 제어를 위한 Ref
  const tourScrollRef = useRef<HTMLDivElement>(null);
  const vehicleScrollRef = useRef<HTMLDivElement>(null);

  // ✅ 스크롤 핸들러
  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right",
  ) => {
    if (ref.current) {
      const { current } = ref;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // 가이드 요금 데이터 (정적 데이터 유지)
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
      isContact: true,
    },
  ];

  // 차량 요금 데이터 (정적 데이터 유지)
  const transportations = [
    {
      name: "Deluxe Sedan",
      image: "/images/private/vehicle_sedan.png",
      passengers: "Up to 3 passengers",
      max4h: "400,000",
      max8h: "600,000",
      airport: "400,000",
    },
    {
      name: "10 pax Van",
      image: "/images/private/vehicle_Starex.png",
      passengers: "Up to 10 passengers",
      max4h: "250,000",
      max8h: "350,000",
      airport: "200,000",
    },
    {
      name: "18 pax Mini Bus",
      image: "/images/private/vehicle_minibus.png",
      passengers: "Up to 18 passengers",
      max4h: "400,000",
      max8h: "580,000",
      airport: "380,000",
    },
    {
      name: "40 pax Tour Bus",
      image: "/images/private/vehicle_bus.png",
      passengers: "Up to 40 passengers",
      max4h: "500,000",
      max8h: "750,000",
      airport: "500,000",
    },
  ];

  // 화살표 버튼 컴포넌트
  const ScrollButton = ({
    direction,
    onClick,
  }: {
    direction: "left" | "right";
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`
        absolute top-1/2 -translate-y-1/2 z-20
        bg-white/90 border border-gray-100 shadow-md rounded-full p-2
        text-gray-700 hover:text-[#ad3928] hover:bg-white transition-all
        md:hidden 
        ${direction === "left" ? "left-2" : "right-2"}
      `}
      aria-label={direction === "left" ? "Previous" : "Next"}
    >
      {direction === "left" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Private Tour"
        description="Customize your perfect Korean adventure with our VIP service"
        imageSrc="/images/background_korea_pt2.png"
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 mt-12 pb-24 space-y-20 md:space-y-24">
        {/* 1. Popular Private Tours (Sanity Data) */}
        <section>
          <div className="mb-6 md:mb-12 text-left">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-3">
              BEST SELLING TOURS
            </p>
            <h2
              className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 leading-tight`}
            >
              Popular Private Tours
            </h2>
          </div>

          <div className="relative group">
            <ScrollButton
              direction="left"
              onClick={() => scroll(tourScrollRef, "left")}
            />
            <ScrollButton
              direction="right"
              onClick={() => scroll(tourScrollRef, "right")}
            />

            <div
              ref={tourScrollRef}
              className="
                flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-hide
                md:grid md:grid-cols-2 md:lg:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0
              "
            >
              {/* ✅ 데이터가 로딩 중이거나 없을 때 처리 */}
              {privateTours.length > 0 ? (
                privateTours.map((tour, index) => (
                  <div
                    key={tour.id}
                    className="min-w-[85vw] md:min-w-0 snap-center"
                  >
                    <TourCard tour={tour} priority={index === 0} />
                  </div>
                ))
              ) : (
                // 로딩 스켈레톤 or 메시지
                <div className="col-span-full text-center py-10 text-gray-400">
                  Loading popular tours...
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 2. Intro Section (VIP) */}
        <section>
          <div className="mb-6 md:mb-12 text-left">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-3">
              WE CAN MEET YOUR REQUIREMENT!
            </p>
            <h2
              className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 leading-tight`}
            >
              Make yourself VIP!
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-[6px] p-6 md:p-10 shadow-sm">
            <div className="space-y-4">
              {[
                "Do you have special places to go? We'll follow your agenda.",
                "Do you want to have your own tour but don't know well the places?",
                "We are glad to make your agenda from your request.",
                "Our intelligent, professional tour guides and drivers promise you the best services.",
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#ad3928] text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Guide Service Charge */}
        <section>
          <div className="mb-6 md:mb-12 text-left">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-3">
              PRICING TABLE
            </p>
            <h2
              className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 leading-tight`}
            >
              Guide Service Charge
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-[6px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm font-bold uppercase tracking-wide border-b border-gray-200">
                    <th className="px-6 py-4 text-center bg-gray-50 border-r border-gray-200 w-1/4">
                      Guide
                    </th>
                    <th className="px-6 py-4 text-center border-r border-gray-200 w-1/4">
                      Max, 4Hours
                    </th>
                    <th className="px-6 py-4 text-center border-r border-gray-200 w-1/4">
                      Max, 8Hours
                    </th>
                    <th className="px-6 py-4 text-center w-1/4">Over 20 Pax</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm text-center">
                  {guideCharges.map((guide, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800 bg-gray-50 border-r border-gray-200">
                        {guide.language}
                      </td>
                      {guide.isContact ? (
                        <td
                          colSpan={3}
                          className="px-6 py-4 text-gray-500 italic font-medium"
                        >
                          Please, contact.
                        </td>
                      ) : (
                        <>
                          <td className="px-6 py-4 text-gray-600 border-r border-gray-200">
                            KRW {guide.max4h}
                          </td>
                          <td className="px-6 py-4 text-gray-600 border-r border-gray-200">
                            KRW {guide.max8h}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            KRW {guide.over20}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="block md:hidden text-center bg-gray-50 text-[10px] text-gray-400 py-1">
              ← Swipe table to see details →
            </div>
          </div>
          <p className="text-[#ad3928] text-sm mt-3 font-medium px-1">
            * If there is over time. It&apos;ll be extra charge.
          </p>
        </section>

        {/* 4. Transportation */}
        <section>
          <div className="mb-10 md:mb-12 text-left">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-3">
              VEHICLE OPTIONS
            </p>
            <h2
              className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 leading-tight`}
            >
              Transportation
            </h2>
          </div>

          <div className="relative group">
            <ScrollButton
              direction="left"
              onClick={() => scroll(vehicleScrollRef, "left")}
            />
            <ScrollButton
              direction="right"
              onClick={() => scroll(vehicleScrollRef, "right")}
            />

            <div
              ref={vehicleScrollRef}
              className="
                flex gap-6 overflow-x-auto snap-x snap-mandatory pt-12 pb-8 -mx-6 px-6 scrollbar-hide
                md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-y-16 md:gap-x-6 md:overflow-visible md:pt-0 md:pb-0 md:mx-0 md:px-0
              "
            >
              {transportations.map((transport, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col items-center min-w-[85vw] md:min-w-0 snap-center"
                >
                  {/* 차량 이미지 (3D 효과) */}
                  <div className="relative z-20 w-full flex flex-col items-center -mb-12 hover:-translate-y-2 transition-transform duration-300">
                    <img
                      src={transport.image}
                      alt={transport.name}
                      className="w-[90%] h-32 object-contain drop-shadow-lg"
                    />
                    <div className="w-[70%] h-4 bg-black/20 blur-lg rounded-[100%] -mt-2"></div>
                  </div>

                  {/* 요금표 카드 */}
                  <div className="w-full bg-white border border-gray-200 rounded-[6px] shadow-sm pt-14 pb-6 px-5 relative z-10 group-hover:shadow-md transition-shadow">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold text-gray-900">
                        {transport.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {transport.passengers}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="w-10 h-0.5 bg-gray-100 mx-auto mb-3"></div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">
                          Max 4H
                        </span>
                        <span className="font-bold text-gray-800">
                          ₩{transport.max4h}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-medium">
                          Max 8H
                        </span>
                        <span className="font-bold text-gray-800">
                          ₩{transport.max8h}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-50">
                        <span className="text-[#ad3928] font-semibold text-xs uppercase tracking-wide">
                          Airport
                        </span>
                        <span className="font-bold text-[#ad3928]">
                          ₩{transport.airport}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-[6px] text-sm text-gray-600 border border-gray-100">
            <ul className="space-y-2 list-none">
              <li className="flex gap-2">
                <span>*</span>
                <span>This price is only Seoul.</span>
              </li>
              <li className="flex gap-2">
                <span>*</span>
                <span>
                  In case of going out of Seoul, there is extra charge according
                  the distance.
                </span>
              </li>
              <li className="flex gap-2">
                <span>*</span>
                <span>
                  In case of using over 8hours, there will be extra charge per
                  1hour.
                </span>
              </li>
              <li className="flex gap-2">
                <span>*</span>
                <span>
                  In case of using over 4hours, the fare will be charged as full
                  day fare.
                </span>
              </li>
              <li className="flex gap-2">
                <span>*</span>
                <span>The toll fee and parking fee is not included.</span>
              </li>
              <li className="flex gap-2">
                <span>*</span>
                <span>
                  In case of staying overnight tour guide and driver ,
                  accommodation fee is not included.
                </span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
