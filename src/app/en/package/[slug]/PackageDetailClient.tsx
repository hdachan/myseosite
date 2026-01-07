"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  Share2,
  Clock,
  Calendar,
  CheckCircle2,
  MapPin,
  Info,
  ChevronLeft,
  ChevronRight,
  Shield,
  RefreshCw,
  Minus,
  Plus,
  ChevronUp,
  ChevronDown,
  Search,
  X,
  AlertTriangle,
} from "lucide-react";
import { PackageTour } from "../packageData"; // ✅ 분리된 데이터 구조에서도 이 import는 유효합니다.

import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

interface Props {
  tour: PackageTour;
}

export default function PackageDetailClient({ tour }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  // const [packageDetailsOpen, setPackageDetailsOpen] = useState(true); // (사용 안 함: 필요 시 주석 해제)
  const [pickupOpen, setPickupOpen] = useState(true);

  // ✅ JSA 투어 등 운영 중단 여부 확인
  const isSuspended =
    tour.bookings === "Suspended" || tour.tags?.includes("Suspended");

  // ✅ 이미지가 없을 경우를 대비한 안전 장치
  const images =
    tour.images && tour.images.length > 0 ? tour.images : [tour.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // ✅ 옵션 선택 로직
  const selectedPackage = tour.packageOptions?.find(
    (opt) => opt.id === selectedOption
  );

  // 가격 계산
  const totalPrice = selectedPackage
    ? selectedPackage.price * (adults + children)
    : 0;

  const handleReset = () => {
    setSelectedOption("");
    setAdults(0);
    setChildren(0);
  };

  const handleAddToCart = () => {
    if (isSuspended) return; // 운영 중단 시 차단

    if (!selectedPackage) {
      toast.error("Please select a package option");
      return;
    }

    if (adults === 0 && children === 0) {
      toast.error("Please select at least 1 person");
      return;
    }

    addItem({
      slug: tour.slug,
      title: tour.title,
      image: images[0],
      optionId: selectedPackage.id,
      optionName: selectedPackage.name,
      adults,
      children,
      pricePerPerson: selectedPackage.price,
      totalPrice,
    });

    toast.success(`Added to cart! (${adults + children} people)`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4"
      >
        <ol className="flex items-center gap-2 text-sm text-gray-600">
          <li>
            <Link href="/en" className="hover:text-red-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/en/package" className="hover:text-red-600">
              Package Tours
            </Link>
          </li>
          <li>/</li>
          <li className="text-red-600 font-semibold line-clamp-1">
            {tour.title}
          </li>
        </ol>
      </nav>

      {/* Image Gallery */}
      <section className="relative w-full h-96 md:h-[500px] bg-black">
        <Image
          src={images[currentImageIndex]}
          alt={`${tour.title} - Image ${currentImageIndex + 1}`}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${
            isSuspended ? "grayscale opacity-50" : ""
          }`} // 중단된 상품은 흑백 처리
        />

        {/* 운영 중단 오버레이 */}
        {isSuspended && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              TEMPORARILY SUSPENDED
            </div>
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition shadow-lg z-20"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition shadow-lg z-20"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-20">
          {currentImageIndex + 1} / {images.length}
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="space-y-6">
          {/* Tags & Title */}
          <div className="flex gap-2">
            {tour.tags?.map((tag, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded text-sm font-semibold ${
                  tag === "Suspended"
                    ? "bg-red-100 text-red-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {tour.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                <span className="font-bold text-lg">{tour.rating}</span>
              </div>
              <span className="text-gray-500">
                ({tour.reviews.toLocaleString()} reviews)
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 font-medium">{tour.bookings}</span>
            </div>
          </header>

          {/* ✅ JSA 경고 메시지 박스 */}
          {isSuspended && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-red-800 font-bold">Booking Suspended</h3>
                  <p className="text-red-700 text-sm mt-1">
                    {tour.description.replace("⛔ ", "")}
                  </p>
                  <p className="text-red-600 text-sm mt-2">
                    Please refer to other DMZ tours as an alternative.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Trust Badges */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  Instant Confirmation
                </p>
                <p className="text-xs text-gray-600">Confirmed after booking</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  Safe Travel
                </p>
                <p className="text-xs text-gray-600">Licensed Operator</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  Free Cancellation
                </p>
                <p className="text-xs text-gray-600">
                  Up to 24-48 hours before
                </p>
              </div>
            </div>
          </section>

          {/* Package Options Section with Sidebar */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Package Options */}
            <div className={selectedOption ? "lg:col-span-2" : "lg:col-span-3"}>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3">
                    Select Option
                  </h2>
                  <button
                    onClick={handleReset}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Reset
                  </button>
                </div>

                {/* ✅ 옵션 리스트 (운영 중단이면 숨김) */}
                {!isSuspended ? (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-4">
                      Please choose your preferred tour course.
                    </p>

                    <div className="space-y-3">
                      {tour.packageOptions?.map((opt) => (
                        <label
                          key={opt.id}
                          className={`block p-4 rounded-lg border-2 cursor-pointer transition relative ${
                            selectedOption === opt.id
                              ? "border-orange-500 bg-white shadow-md ring-1 ring-orange-500"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="package"
                              value={opt.id}
                              checked={selectedOption === opt.id}
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                              className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="font-bold text-gray-900 text-lg">
                                  {opt.name}
                                </span>
                                {opt.badge && (
                                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded font-bold uppercase whitespace-nowrap">
                                    {opt.badge}
                                  </span>
                                )}
                              </div>

                              {/* ✅ 옵션별 상세 코스 (Route) 노출 */}
                              <div className="text-sm text-gray-600 mt-2">
                                <span className="font-semibold text-gray-800">
                                  Route:{" "}
                                </span>
                                {opt.details.join(" → ")}
                              </div>

                              <div className="mt-2 text-right">
                                <span className="text-lg font-bold text-gray-900">
                                  $ {opt.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 bg-gray-100 rounded-lg">
                    <p className="text-gray-500">
                      Booking is currently unavailable for this tour.
                    </p>
                  </div>
                )}

                {/* 인원 선택 및 결제 버튼 (옵션 선택 시 노출) */}
                {selectedOption && !isSuspended && (
                  <>
                    <div className="space-y-4 mb-6 pt-6 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-700">
                        Select Quantity
                      </p>

                      {/* Adult */}
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-900">Adult</span>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setAdults(Math.max(0, adults - 1))}
                            className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="w-5 h-5 text-gray-600" />
                          </button>
                          <span className="w-12 text-center font-semibold text-lg">
                            {adults}
                          </span>
                          <button
                            onClick={() => setAdults(adults + 1)}
                            className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Child */}
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-900">
                          Child (Ages 3-9)
                        </span>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() =>
                              setChildren(Math.max(0, children - 1))
                            }
                            className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="w-5 h-5 text-gray-600" />
                          </button>
                          <span className="w-12 text-center font-semibold text-lg">
                            {children}
                          </span>
                          <button
                            onClick={() => setChildren(children + 1)}
                            className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-gray-200">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">
                          $ {totalPrice.toFixed(2)}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          Total price for {adults + children} person(s)
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleAddToCart}
                        disabled={adults === 0 && children === 0}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-lg transition shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Add to Cart
                      </button>
                      <button
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={adults === 0 && children === 0}
                      >
                        Book Now
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right: Detail Info Sidebar (옵션 선택 시에만 내용 변경) */}
            {selectedOption && selectedPackage && (
              <aside className="lg:col-span-1">
                <div className="space-y-4 sticky top-24">
                  {/* Included Items */}
                  <section className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="font-bold text-gray-900">
                        Package Details
                      </h3>
                      <p className="text-xs text-gray-500">
                        {selectedPackage.name}
                      </p>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start gap-2 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm text-gray-900 mb-1">
                            Included in this option
                          </p>
                          <ul className="space-y-1">
                            {/* ✅ 선택한 옵션의 details(상세 코스)를 리스트로 보여줌 */}
                            {selectedPackage.details.map((detail, i) => (
                              <li key={i} className="text-sm text-gray-700">
                                • {detail}
                              </li>
                            ))}
                            {/* ✅ 공통 포함 사항도 함께 표시 */}
                            {tour.includes?.map((inc, i) => (
                              <li
                                key={`inc-${i}`}
                                className="text-sm text-gray-500"
                              >
                                • {inc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {selectedPackage.excluded && (
                        <div className="flex items-start gap-2 mt-4 pt-4 border-t border-gray-100">
                          <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm text-gray-900 mb-1">
                              Excluded
                            </p>
                            <ul className="space-y-1">
                              {selectedPackage.excluded.map((ex, i) => (
                                <li key={i} className="text-sm text-gray-700">
                                  • {ex}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* 미팅 포인트 등 추가 정보 */}
                  {tour.meetingPoint && (
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
                      <p className="font-bold flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Meeting Point
                      </p>
                      <p className="mt-1">{tour.meetingPoint}</p>
                    </div>
                  )}
                </div>
              </aside>
            )}
          </section>

          {/* Description */}
          <section className="bg-white p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Tour Overview
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {tour.fullDescription || tour.description}
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
