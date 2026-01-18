"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronLeft,
  CreditCard,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CalendarCheck,
  Minus,
  Plus,
} from "lucide-react";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. 기본 투어 정보 (URL 쿼리에서 가져오기)
  const tourBaseData = {
    slug: searchParams.get("slug") || "",
    title: searchParams.get("title") || "Unknown Tour",
    image: searchParams.get("image") || "",
    optionName: searchParams.get("optionName") || "Standard Option",
    price: Number(searchParams.get("price")) || 0,
  };

  // 2. 폼 상태 관리
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    // ✅ URL에서 날짜(date)가 넘어오면 초기값으로 설정
    tourDate: searchParams.get("date") || "",
    // ✅ URL에서 인원수가 넘어오면 초기값으로 설정 (기본값 1)
    adults: Number(searchParams.get("adults")) || 1,
    children: Number(searchParams.get("children")) || 0,
    hotelInfo: "", // 호텔 정보 통합
    agreed: false,
  });

  // 동적 총 가격 계산
  const currentTotalPrice =
    (formData.adults + formData.children) * tourBaseData.price;

  // 버튼 종류 구분 상태 (결제 vs 예약)
  const [submissionType, setSubmissionType] = useState<
    "PAYMENT" | "RESERVATION"
  >("PAYMENT");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      const numValue = Math.max(0, Number(value));
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 인원수 조절 핸들러 (버튼용)
  const handlePaxChange = (type: "adults" | "children", delta: number) => {
    setFormData((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  // 3. 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🚨 유효성 검사
    const requiredFields = [
      { key: "fullName", label: "Full Name" },
      { key: "email", label: "Email Address" },
      { key: "phone", label: "Phone Number" },
      { key: "tourDate", label: "Tour Date" },
      { key: "hotelInfo", label: "Hotel Information" },
    ];

    for (const field of requiredFields) {
      if (!formData[field.key as keyof typeof formData]) {
        alert(`Please enter your ${field.label}.`);
        return;
      }
    }

    if (formData.adults < 1) {
      alert("At least 1 adult is required.");
      return;
    }

    if (!formData.agreed) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }

    // 데이터 전송 준비
    const submitData = {
      ...tourBaseData,
      ...formData,
      totalPrice: currentTotalPrice,
      type: submissionType,
    };

    if (submissionType === "PAYMENT") {
      alert(`Proceeding to payment for $${currentTotalPrice}...`);
      console.log("PAYMENT REQUEST:", submitData);
      // 여기에 결제 모듈 연동 (예: Stripe, PortOne 등)
    } else {
      alert("Reservation Submitted Successfully!");
      console.log("RESERVATION REQUEST:", submitData);
      // 여기에 예약 DB 저장 로직 (API 호출)
    }
  };

  if (!tourBaseData.slug) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600 mb-4">Invalid booking request.</p>
        <button
          onClick={() => router.back()}
          className="text-orange-600 font-bold hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Secure Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* ✅ 왼쪽: 입력 폼 (여행자 정보 + 투어 상세) */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. 여행자 정보 */}
            <div className="bg-white p-6 rounded-[6px] shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                1. Traveler Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2.5 rounded-[6px] focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Passport Name (e.g. Gildong Hong)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2.5 pl-10 rounded-[6px] focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2.5 pl-10 rounded-[6px] focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="+82 10-1234-5678"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 투어 상세 (날짜 및 픽업) */}
            <div className="bg-white p-6 rounded-[6px] shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                2. Tour Details & Pickup
              </h2>
              <div className="space-y-4">
                {/* 날짜 선택 (URL에서 왔으면 자동 입력됨) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tour Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="date"
                      name="tourDate"
                      value={formData.tourDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2.5 rounded-[6px] focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* 호텔 정보 통합 필드 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hotel Information (Name & Address){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      required
                      name="hotelInfo"
                      value={formData.hotelInfo}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2.5 pl-10 rounded-[6px] focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="e.g. Lotte Hotel Seoul, Room 1204"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ 오른쪽: 주문 요약 & 인원 수정 (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-[6px] shadow-lg border border-gray-200 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                Order Summary
              </h3>

              {/* 상품 썸네일 */}
              <div className="flex gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-[6px] overflow-hidden flex-shrink-0 bg-gray-100">
                  {tourBaseData.image ? (
                    <Image
                      src={tourBaseData.image}
                      alt="Thumbnail"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2">
                    {tourBaseData.title}
                  </h4>
                  <p className="text-xs text-orange-600 font-medium mt-1 bg-orange-50 inline-block px-1.5 py-0.5 rounded-[4px]">
                    {tourBaseData.optionName}
                  </p>
                </div>
              </div>

              {/* 인원수 수정 영역 (Order Summary 내부) */}
              <div className="space-y-4 mb-6 pb-4 border-b border-gray-100">
                {/* Adult */}
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-700">
                    <span className="block font-medium">
                      Adults <span className="text-red-500">*</span>
                    </span>
                    <span className="text-xs text-gray-400">
                      ${tourBaseData.price} / person
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handlePaxChange("adults", -1)}
                      className="w-7 h-7 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-3 h-3 text-gray-600" />
                    </button>
                    <span className="w-6 text-center font-bold text-gray-900">
                      {formData.adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePaxChange("adults", 1)}
                      className="w-7 h-7 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Child */}
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-700">
                    <span className="block font-medium">Children</span>
                    <span className="text-xs text-gray-400">
                      ${tourBaseData.price} / person
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handlePaxChange("children", -1)}
                      className="w-7 h-7 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-3 h-3 text-gray-600" />
                    </button>
                    <span className="w-6 text-center font-bold text-gray-900">
                      {formData.children}
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePaxChange("children", 1)}
                      className="w-7 h-7 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 가격 계산 상세 */}
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal (Adults)</span>
                  <span className="font-medium">
                    $ {tourBaseData.price * formData.adults}
                  </span>
                </div>
                {formData.children > 0 && (
                  <div className="flex justify-between">
                    <span>Subtotal (Children)</span>
                    <span className="font-medium">
                      $ {tourBaseData.price * formData.children}
                    </span>
                  </div>
                )}
              </div>

              {/* 총 가격 */}
              <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-red-600">
                  $ {currentTotalPrice.toFixed(2)}
                </span>
              </div>

              {/* 약관 동의 */}
              <div className="flex items-start gap-3 mb-6 p-3 bg-gray-50 rounded-[6px]">
                <input
                  type="checkbox"
                  id="agreed"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                />
                <label
                  htmlFor="agreed"
                  className="text-xs text-gray-600 cursor-pointer leading-relaxed"
                >
                  I have read and agree to the{" "}
                  <a href="#" className="underline hover:text-orange-600">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline hover:text-orange-600">
                    Cancellation Policy
                  </a>
                  .
                </label>
              </div>

              {/* 버튼 그룹 */}
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  onClick={() => setSubmissionType("PAYMENT")}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-[6px] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Proceed to Payment
                  <CreditCard className="w-5 h-5" />
                </button>

                <button
                  type="submit"
                  onClick={() => setSubmissionType("RESERVATION")}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3.5 rounded-[6px] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Make a Reservation (Pay Later)
                  <CalendarCheck className="w-5 h-5" />
                </button>
              </div>

              <p className="text-[10px] text-gray-400 text-center mt-4">
                Secure SSL Encrypted Transaction
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          Loading...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
