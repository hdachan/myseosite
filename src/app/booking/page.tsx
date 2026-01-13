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
  MessageSquare,
  CalendarCheck, // ✅ 예약 아이콘 추가
} from "lucide-react";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. URL 쿼리 스트링에서 데이터 받아오기
  const tourData = {
    slug: searchParams.get("slug") || "",
    title: searchParams.get("title") || "Unknown Tour",
    image: searchParams.get("image") || "",
    optionName: searchParams.get("optionName") || "Standard Option",
    price: Number(searchParams.get("price")) || 0,
    adults: Number(searchParams.get("adults")) || 0,
    children: Number(searchParams.get("children")) || 0,
    totalPrice: Number(searchParams.get("totalPrice")) || 0,
  };

  // 2. 폼 상태 관리
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    messenger: "",
    tourDate: "",
    hotelName: "",
    hotelAddress: "",
    requests: "",
    agreed: false,
  });

  // ⭐ 버튼 종류 구분 상태 (PAYMENT | RESERVATION)
  const [submissionType, setSubmissionType] = useState<
    "PAYMENT" | "RESERVATION"
  >("PAYMENT");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 3. 제출 핸들러 (결제 or 예약 공통)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 공통 유효성 검사
    if (!formData.agreed) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }
    if (!formData.tourDate) {
      alert("Please select a tour date.");
      return;
    }

    // ⭐ 분기 처리: 어떤 버튼을 눌렀는지에 따라 다르게 동작
    if (submissionType === "PAYMENT") {
      // 🚀 결제 로직 (PG사 연동)
      console.log("=== PAYMENT REQUEST ===");
      console.log("Data:", { ...tourData, ...formData, type: "PAYMENT" });
      alert("Redirecting to Payment Gateway...");
      // router.push("/booking/payment"); // 나중에 구현
    } else {
      // 🚀 단순 예약 로직 (DB 저장만)
      console.log("=== RESERVATION REQUEST ===");
      console.log("Data:", { ...tourData, ...formData, type: "RESERVATION" });
      alert("Reservation Submitted Successfully! We will contact you shortly.");
      // router.push("/booking/success"); // 나중에 구현
    }
  };

  if (!tourData.slug) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600 mb-4">Invalid booking request.</p>
        <button
          onClick={() => router.push("/package")}
          className="text-orange-600 font-bold hover:underline"
        >
          Return to Packages
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
          Back to Tour Details
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Secure Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* 왼쪽: 입력 폼 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. 여행자 정보 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                1. Traveler Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    required
                    name="firstName"
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="e.g. Gildong"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    required
                    name="lastName"
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="e.g. Hong"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="email"
                      name="email"
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2.5 pl-10 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="tel"
                      name="phone"
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2.5 pl-10 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="+82 10-1234-5678"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Messenger ID (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      name="messenger"
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2.5 pl-10 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="Kakao/WhatsApp ID"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 투어 상세 정보 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                2. Tour Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tour Date *
                  </label>
                  <input
                    required
                    type="date"
                    name="tourDate"
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Hotel Name *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        required
                        name="hotelName"
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2.5 pl-10 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="e.g. Lotte Hotel"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address / Room No.
                    </label>
                    <input
                      name="hotelAddress"
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="Room number if known"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    name="requests"
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                    placeholder="Any dietary restrictions?"
                  />
                </div>
              </div>
            </div>

            {/* 3. 결제 수단 안내 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 opacity-90">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-500" />
                3. Payment Method
              </h2>
              <div className="flex items-center gap-4 p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <CreditCard className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="font-bold text-gray-800">
                    Credit Card / Global Payment
                  </p>
                  <p className="text-sm text-gray-600">
                    Secure payment via PG (Stripe/PayPal etc.)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 주문 요약 */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                Order Summary
              </h3>

              <div className="flex gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  {tourData.image ? (
                    <Image
                      src={tourData.image}
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
                    {tourData.title}
                  </h4>
                  <p className="text-xs text-orange-600 font-medium mt-1 bg-orange-50 inline-block px-1.5 py-0.5 rounded">
                    {tourData.optionName}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4 mb-4">
                <div className="flex justify-between">
                  <span>
                    Adults ({tourData.adults} x ${tourData.price})
                  </span>
                  <span className="font-medium">
                    $ {tourData.price * tourData.adults}
                  </span>
                </div>
                {tourData.children > 0 && (
                  <div className="flex justify-between">
                    <span>
                      Children ({tourData.children} x ${tourData.price})
                    </span>
                    <span className="font-medium">
                      $ {tourData.price * tourData.children}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-red-600">
                  $ {tourData.totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex items-start gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
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
                  <a href="/terms" className="underline hover:text-orange-600">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a
                    href="/cancellation-policy"
                    className="underline hover:text-orange-600"
                  >
                    Cancellation Policy
                  </a>
                  .
                </label>
              </div>

              {/* ✅ 버튼 2개: 결제 vs 단순예약 */}
              <div className="flex flex-col gap-3">
                {/* 1. 즉시 결제 버튼 */}
                <button
                  type="submit"
                  onClick={() => setSubmissionType("PAYMENT")}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Proceed to Payment
                  <CreditCard className="w-5 h-5" />
                </button>

                {/* 2. 단순 예약 버튼 (회색/다른 스타일) */}
                <button
                  type="submit"
                  onClick={() => setSubmissionType("RESERVATION")}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
          <p className="text-gray-500 font-medium">
            Loading booking details...
          </p>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
