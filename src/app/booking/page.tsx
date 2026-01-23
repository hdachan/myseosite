"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, Lock } from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";
import FullScreenLoader from "@/components/FullScreenLoader"; // ✅ 분리한 컴포넌트 import
import { hangameFont } from "@/lib/fonts";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // KPN 스크립트 로드
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

  const tourBaseData = {
    tourId: searchParams.get("tourId") || "",
    slug: searchParams.get("slug") || "",
    title: searchParams.get("title") || "Unknown Tour",
    image: searchParams.get("image") || "",
    optionName: searchParams.get("optionName") || "Standard Option",
    price: Number(searchParams.get("price")) || 0,
  };

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

  // 화면 맨 위로 부드럽게 올리는 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tourBaseData.tourId) return alert("System Error: Tour ID missing.");

    // 유효성 검사 실패 시 -> 스크롤 올리고 -> 경고창
    if (!formData.fullName.trim()) {
      scrollToTop();
      return setTimeout(() => alert("Please enter your full name."), 100);
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      scrollToTop();
      return setTimeout(
        () => alert("Please enter a valid email address."),
        100,
      );
    }
    if (!formData.phone.trim()) {
      scrollToTop();
      return setTimeout(() => alert("Please enter your phone number."), 100);
    }

    if (formData.adults < 1) {
      scrollToTop();
      return alert("At least 1 adult is required.");
    }
    if (!formData.agreed) {
      return alert("Please agree to the Terms and Conditions.");
    }

    // --- 검사 통과: 로딩 시작 ---
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
      // 1. DB 저장
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Booking failed");

      // 2. 분기 처리
      if (submissionType === "RESERVATION") {
        alert("Reservation submitted successfully!");
        router.push("/");
      } else {
        if (typeof window === "undefined" || !(window as any).FirstPay) {
          alert("Payment system loading... Please try again in a moment.");
          setIsSubmitting(false); // 로딩 끄기
          return;
        }

        const mxId = "testcorp";
        const amount = currentTotalPrice;

        // 해시 생성 요청
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

        const pay = new (window as any).FirstPay({
          env: "develop",
          isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
          openType: "popup",
        });

        // PG사 결제창 호출
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
          callHash: callHash,
        });

        // ✅ [핵심 수정] 결제창을 띄웠으면 우리 웹사이트 로딩은 끕니다!
        // 그래야 사용자가 팝업을 닫고 돌아왔을 때 다시 클릭할 수 있습니다.
        setIsSubmitting(false);
      }
    } catch (error: any) {
      console.error("Error:", error);
      alert("Error processing request: " + error.message);
      setIsSubmitting(false); // 에러 나면 로딩 끄기
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
    <div className="min-h-screen bg-white pb-24 relative">
      {/* ✅ 분리된 로딩 컴포넌트 사용 */}
      {isSubmitting && <FullScreenLoader />}

      <div className="max-w-6xl mx-auto px-8 lg:px-12 pt-24">
        <button
          onClick={() => router.back()}
          className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center mr-2 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Tour
        </button>

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
          {/* 왼쪽: 입력 폼 */}
          <div className={`lg:col-span-2`}>
            {/* 로딩 중일 때 흐리게 보이는 효과는 유지 */}
            <div
              className={isSubmitting ? "opacity-50 pointer-events-none" : ""}
            >
              <BookingForm formData={formData} handleChange={handleChange} />
            </div>
          </div>

          {/* 오른쪽: 요약 및 버튼 */}
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

              {/* 하단 텍스트 안내 (선택 사항) */}
              {isSubmitting && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-xs text-center rounded-lg animate-pulse font-medium">
                  Opening Secure Payment Window...
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
