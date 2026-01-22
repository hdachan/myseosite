"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, Lock } from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";
import { hangameFont } from "@/lib/fonts";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. KPN 결제 스크립트 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dev.firstpay.co.kr/js/firstpay.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // ❌ [삭제됨] 클라이언트에서 암호를 만들던 함수 삭제 (보안 강화)
  // async function generateHash(...) { ... }

  // URL에서 투어 정보 가져오기
  const tourBaseData = {
    tourId: searchParams.get("tourId") || "",
    slug: searchParams.get("slug") || "",
    title: searchParams.get("title") || "Unknown Tour",
    image: searchParams.get("image") || "",
    optionName: searchParams.get("optionName") || "Standard Option",
    price: Number(searchParams.get("price")) || 0,
  };

  // 입력 폼 상태
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    tourDate: searchParams.get("date") || "",
    adults: Number(searchParams.get("adults")) || 1,
    children: Number(searchParams.get("children")) || 0,
    hotelInfo: "",
    agreed: false,
  });

  const currentTotalPrice =
    (formData.adults + formData.children) * tourBaseData.price;

  const [submissionType, setSubmissionType] = useState<
    "PAYMENT" | "RESERVATION"
  >("PAYMENT");

  // 핸들러들
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

  const handlePaxChange = (type: "adults" | "children", delta: number) => {
    setFormData((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  // ✅ 제출 핸들러 (보안 로직 적용됨)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 유효성 검사
    if (!tourBaseData.tourId) return alert("System Error: Tour ID missing.");
    if (!formData.fullName.trim()) return alert("Please enter your full name.");
    if (!formData.email.trim() || !formData.email.includes("@"))
      return alert("Please enter a valid email address.");
    if (!formData.phone.trim()) return alert("Please enter your phone number.");
    if (formData.adults < 1) return alert("At least 1 adult is required.");
    if (!formData.agreed)
      return alert("Please agree to the Terms and Conditions.");

    // 🏨 호텔 정보는 검사하지 않음 (선택 사항)

    setIsSubmitting(true);

    const orderNumber = `ORD_${new Date().getTime()}`;

    const submitData = {
      ...tourBaseData,
      ...formData,
      totalPrice: currentTotalPrice,
      type: submissionType,
      order_number: orderNumber,
    };

    try {
      // 2. DB 저장 (Pending 상태)
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Booking failed");

      // 3. 분기 처리
      if (submissionType === "RESERVATION") {
        // [예약만 하기]
        alert("Reservation submitted successfully!");
        router.push("/");
      } else {
        // [결제 하기]
        if (typeof window === "undefined" || !(window as any).FirstPay) {
          alert("Payment system loading... Please try again in a moment.");
          setIsSubmitting(false);
          return;
        }

        const mxId = "testcorp";
        const amount = currentTotalPrice;

        // 🔒 [보안 핵심] 서버에게 해시 생성을 요청합니다! (비밀키 노출 X)
        const hashResponse = await fetch("/api/payment-hash", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderNumber: orderNumber,
            amount: amount,
          }),
        });

        if (!hashResponse.ok) {
          throw new Error("Security check failed (Server Hash Error).");
        }

        const { hash: callHash } = await hashResponse.json();

        // PG사 결제창 호출
        const pay = new (window as any).FirstPay({
          env: "develop",
          isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
          openType: "popup",
        });

        pay.goPay({
          mxId: mxId,
          mxIssueNo: orderNumber,
          mxIssueDate: new Date()
            .toISOString()
            .replace(/[-T:\.Z]/g, "")
            .slice(0, 14),
          amount: amount,
          currency: "KRW",
          orderName: tourBaseData.title,
          buyerName: formData.fullName,
          buyerEmail: formData.email,
          returnUrl: `${window.location.origin}/api/payment-return`,
          callHash: callHash, // 서버에서 받아온 안전한 해시 사용
        });
      }
    } catch (error: any) {
      console.error("Error:", error);
      alert("Error processing request: " + error.message);
      setIsSubmitting(false);
    }
  };

  if (!tourBaseData.slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Invalid booking request.</p>
        <button onClick={() => router.back()} className="ml-4 underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-6xl mx-auto px-8 lg:px-12 pt-24">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => router.back()}
          className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center mr-2 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Tour
        </button>

        {/* 헤더 섹션 */}
        <div className="mb-10 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-[#4A7C7E]" />
            <span className="text-[10px] md:text-[11px] uppercase tracking-wider font-bold text-[#4A7C7E]">
              SECURE CHECKOUT
            </span>
          </div>
          <h1
            className={`${hangameFont.className} text-2xl md:text-4xl font-bold text-gray-900 leading-tight`}
          >
            Confirm Your Booking
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* 입력 폼 */}
          <div
            className={`lg:col-span-2 ${isSubmitting ? "opacity-50 pointer-events-none" : ""}`}
          >
            <BookingForm formData={formData} handleChange={handleChange} />
          </div>

          {/* 요약 및 버튼 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary
                tourBaseData={tourBaseData}
                formData={formData}
                currentTotalPrice={currentTotalPrice}
                handlePaxChange={handlePaxChange}
                handleChange={handleChange}
                setSubmissionType={setSubmissionType}
              />

              {isSubmitting && (
                <div className="mt-4 p-4 bg-gray-50 border border-gray-100 text-gray-600 text-sm text-center rounded-lg animate-pulse">
                  {submissionType === "PAYMENT"
                    ? "Connecting to Payment Gateway..."
                    : "Submitting Reservation..."}
                </div>
              )}
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
