"use client";

import React, { useState } from "react";
import {
  Star,
  Heart,
  Share2,
  Clock,
  Users,
  Calendar,
  CheckCircle2,
  MapPin,
  Info,
  ChevronLeft,
  ChevronRight,
  Award,
  Shield,
  RefreshCw,
  Minus,
  Plus,
  ChevronUp,
  ChevronDown,
  Search,
  X,
} from "lucide-react";

export default function PackageDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [packageDetailsOpen, setPackageDetailsOpen] = useState(true);
  const [pickupOpen, setPickupOpen] = useState(true);

  const tour = {
    id: 1,
    title: "DMZ Tour - The 3rd Infiltration Tunnel Tour",
    images: [
      "https://images.unsplash.com/photo-1583562835057-a62d1beffbf3?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1200&h=800&fit=crop",
    ],
    rating: 4.8,
    reviews: 1287,
    tags: ["베스트셀러", "즉시 확정"],
    duration: "7시간",
    minimumPax: 1,
    packageOptions: [
      {
        id: "special-a",
        name: "스페셜 A - 서울 시티 & 궁궐 일일 투어",
        badge: "KRW1,000 할인",
        price: 63000,
        details: [
          "어트랙션/명소 입장: 남이섬, 쁘띠프랑스",
          "영어 가이드",
          "교통편",
        ],
      },
      {
        id: "special-b",
        name: "스페셜 B - 쇼핑 투어",
        badge: "KRW1,000 할인",
        price: 58000,
        details: ["어트랙션/명소 입장: 명동, 동대문", "영어 가이드", "교통편"],
      },
      {
        id: "special-c",
        name: "Special C - 남이섬 투어",
        badge: "KRW1,000 할인",
        price: 72000,
        details: [
          "어트랙션/명소 입장: 남이섬, 쁘띠프랑스",
          "영어 가이드",
          "교통편",
        ],
        excluded: ["기타 개인 경비", "팁", "보험"],
      },
    ],
    description:
      "한국의 분단 역사를 직접 체험할 수 있는 DMZ 투어입니다. 제3땅굴을 탐험하고 도라전망대에서 북한을 바라보는 특별한 경험을 제공합니다.",
    includes: [
      "전문 한국어/영어 가이드",
      "왕복 교통편 (에어컨 버스)",
      "모든 입장료",
      "한식 점심 식사",
    ],
    excludes: ["개인 경비", "여행자 보험", "추가 음료 및 간식"],
    meetingPoint: "주요 호텔 픽업 서비스 제공",
    cancellation: "투어 시작 24시간 전까지 무료 취소",
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === tour.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? tour.images.length - 1 : prev - 1
    );
  };

  const selectedPackage = tour.packageOptions.find(
    (opt) => opt.id === selectedOption
  );
  const totalPrice = selectedPackage
    ? selectedPackage.price * (adults + children)
    : 0;

  const handleReset = () => {
    setSelectedOption("");
    setAdults(0);
    setChildren(0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery */}
      <div className="relative w-full h-96 md:h-[500px] bg-black">
        <img
          src={tour.images[currentImageIndex]}
          alt={tour.title}
          className="w-full h-full object-cover"
        />

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition shadow-lg"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {tour.images.length}
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow-lg">
            <Heart className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow-lg">
            <Share2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Tags & Title */}
          <div className="flex gap-2">
            {tour.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-orange-100 text-orange-600 rounded text-sm font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {tour.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                <span className="font-bold text-lg">{tour.rating}</span>
              </div>
              <span className="text-gray-500">
                ({tour.reviews.toLocaleString()}개 리뷰)
              </span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">즉시 확정</p>
                <p className="text-xs text-gray-600">예약 후 바로 확정</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">안전 보장</p>
                <p className="text-xs text-gray-600">안전한 여행</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">무료 취소</p>
                <p className="text-xs text-gray-600">24시간 전까지</p>
              </div>
            </div>
          </div>

          {/* Package Options Section with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Package Options */}
            <div className={selectedOption ? "lg:col-span-2" : "lg:col-span-3"}>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3">
                    패키지 옵션
                  </h3>
                  <button
                    onClick={handleReset}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    재설정
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">
                      날짜 및 패키지 옵션 선택
                    </h4>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      이용 가능 날짜 확인
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    투어 일자를 선택하세요.
                  </p>

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-700">
                      옵션 선택
                    </p>
                    {tour.packageOptions.map((opt) => (
                      <label
                        key={opt.id}
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition ${
                          selectedOption === opt.id
                            ? "border-orange-500 bg-white shadow-md"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="package"
                            value={opt.id}
                            checked={selectedOption === opt.id}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">
                                {opt.name}
                              </span>
                              {opt.badge && (
                                <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded font-semibold">
                                  {opt.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {selectedOption && (
                  <>
                    <div className="space-y-4 mb-6">
                      <p className="text-sm font-semibold text-gray-700">
                        수량
                      </p>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-900">성인</span>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setAdults(Math.max(0, adults - 1))}
                            className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <Minus className="w-5 h-5 text-gray-600" />
                          </button>
                          <span className="w-12 text-center font-semibold text-lg">
                            {adults}
                          </span>
                          <button
                            onClick={() => setAdults(adults + 1)}
                            className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <Plus className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-900">
                          아동(만 2-9세)
                        </span>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() =>
                              setChildren(Math.max(0, children - 1))
                            }
                            className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <Minus className="w-5 h-5 text-gray-600" />
                          </button>
                          <span className="w-12 text-center font-semibold text-lg">
                            {children}
                          </span>
                          <button
                            onClick={() => setChildren(children + 1)}
                            className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <Plus className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-gray-200">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">
                          $ {(totalPrice / 1000).toFixed(2)}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          개당 선택하신 옵션 금액 선택해주세요.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-lg transition shadow-lg">
                        장바구니 담기
                      </button>
                      <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition shadow-lg">
                        바로 예약
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right: Detail Info Sidebar */}
            {selectedOption && (
              <div className="lg:col-span-1">
                <div className="space-y-4">
                  {/* Package Details */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setPackageDetailsOpen(!packageDetailsOpen)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                    >
                      <h3 className="font-bold text-gray-900">
                        패키지 상세정보
                      </h3>
                      {packageDetailsOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>

                    {packageDetailsOpen && selectedPackage && (
                      <div className="px-4 pb-4 space-y-4">
                        <div>
                          <div className="flex items-start gap-2 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-sm text-gray-900 mb-1">
                                포함
                              </p>
                              <ul className="space-y-1">
                                {selectedPackage.details.map((detail, i) => (
                                  <li key={i} className="text-sm text-gray-700">
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {selectedPackage.excluded && (
                          <div>
                            <div className="flex items-start gap-2">
                              <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold text-sm text-gray-900 mb-1">
                                  불포함
                                </p>
                                <ul className="space-y-1">
                                  {selectedPackage.excluded.map((item, i) => (
                                    <li
                                      key={i}
                                      className="text-sm text-gray-700"
                                    >
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Pickup Info */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setPickupOpen(!pickupOpen)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                    >
                      <h3 className="font-bold text-gray-900">
                        픽업/미팅 정보
                      </h3>
                      {pickupOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>

                    {pickupOpen && (
                      <div className="px-4 pb-4 space-y-4">
                        <div>
                          <p className="font-semibold text-sm text-gray-900 mb-3">
                            출발
                          </p>
                          <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="이용 가능한 장소 검색"
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                            />
                          </div>

                          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-sm text-gray-900">
                                07:30 - 08:00
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                Seoul 내 모든 지역에서 이용 가능
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-white text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                        내일부터 이용 가능
                      </span>
                      <span className="px-3 py-1 bg-white text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                        24시간 전 취소 가능
                      </span>
                      <span className="px-3 py-1 bg-white text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                        최소 그룹 규모: 4인
                      </span>
                      <span className="px-3 py-1 bg-white text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                        예약 즉시 확정
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              액티비티 소개
            </h2>
            <p className="text-gray-700 leading-relaxed">{tour.description}</p>
          </div>

          {/* Includes/Excludes */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  포함 사항
                </h3>
                <ul className="space-y-2">
                  {tour.includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-gray-400" />
                  불포함 사항
                </h3>
                <ul className="space-y-2">
                  {tour.excludes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Meeting Point */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              미팅 포인트
            </h2>
            <p className="text-gray-700">{tour.meetingPoint}</p>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
            <h3 className="font-bold text-green-900 mb-2">취소 정책</h3>
            <p className="text-green-800 text-sm">{tour.cancellation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
