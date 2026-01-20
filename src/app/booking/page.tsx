"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ 1. KPN 스크립트 로드 (테스트용 dev, 실서버용은 나중에 변경)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dev.firstpay.co.kr/js/firstpay.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ✅ 2. 암호(Hash) 생성 함수 (아까 테스트 성공한 버전)
  async function generateHash(message: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

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

  // ✅ [핵심] 제출 및 결제 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tourBaseData.tourId) return alert("오류: 투어 ID가 없습니다.");
    if (!formData.agreed) return alert("이용약관에 동의해주세요.");
    if (formData.adults < 1) return alert("최소 1명의 성인이 필요합니다.");

    setIsSubmitting(true);

    // 1. 주문번호 생성 (KPN용: 32자 이내)
    // 예: ORD_1705648291234
    const orderNumber = `ORD_${new Date().getTime()}`;

    const submitData = {
      ...tourBaseData,
      ...formData,
      totalPrice: currentTotalPrice,
      type: submissionType,
      // ✅ DB에 저장할 주문번호 추가
      order_number: orderNumber,
    };

    try {
      // 2. 일단 DB에 저장 (Pending 상태)
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Booking failed");

      // 3. 분기 처리: 결제냐 단순 예약이냐
      if (submissionType === "RESERVATION") {
        // [단순 예약] -> 완료 페이지 이동
        alert("예약이 접수되었습니다. 담당자가 곧 연락드립니다.");
        router.push("/");
      } else {
        // [결제 하기] -> KPN 창 띄우기
        if (typeof window === "undefined" || !(window as any).FirstPay) {
          alert("결제 시스템을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
          setIsSubmitting(false);
          return;
        }

        // --- 결제 데이터 준비 ---
        const mxId = "testcorp"; // 테스트 ID
        const passKey = "6aMoJujE34XnL9gvUqdKGMqs9GzYaNo6"; // 테스트 키
        const amount = currentTotalPrice; // 실제 금액

        // 해시 생성 (날짜 제외 공식 사용)
        const hashString = mxId + orderNumber + amount + passKey;
        const callHash = await generateHash(hashString);

        const pay = new (window as any).FirstPay({
          env: "develop", // 테스트 환경
          isMobile: false, // 모바일 여부 (필요시 userAgent 체크 로직 추가)
          openType: "popup",
        });

        pay.goPay({
          mxId: mxId,
          mxIssueNo: orderNumber, // DB에 저장한 그 번호!
          mxIssueDate: new Date()
            .toISOString()
            .replace(/[-T:\.Z]/g, "")
            .slice(0, 14),
          amount: amount,
          currency: "KRW",
          orderName: tourBaseData.title, // 상품명
          buyerName: formData.fullName,
          buyerEmail: formData.email,
          // ✅ 결제 끝나면 신호를 받을 API 주소 (다음 단계에서 만들 예정)
          returnUrl: `${window.location.origin}/api/payment-return`,
          callHash: callHash,
        });

        // 결제창이 떴으므로 로딩 상태 유지 (사용자가 닫거나 결제할 때까지)
      }
    } catch (error: any) {
      console.error("Error:", error);
      alert("처리 중 오류가 발생했습니다: " + error.message);
      setIsSubmitting(false);
    }
  };

  // 잘못된 접근 처리
  if (!tourBaseData.slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Invalid booking request.</p>
        <button onClick={() => router.back()}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Secure Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div
            className={`lg:col-span-2 ${isSubmitting ? "opacity-50 pointer-events-none" : ""}`}
          >
            <BookingForm formData={formData} handleChange={handleChange} />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary
              tourBaseData={tourBaseData}
              formData={formData}
              currentTotalPrice={currentTotalPrice}
              handlePaxChange={handlePaxChange}
              handleChange={handleChange}
              setSubmissionType={setSubmissionType}
            />
            {isSubmitting && (
              <div className="mt-4 p-4 bg-blue-50 text-blue-700 text-center rounded-lg font-bold">
                {submissionType === "PAYMENT"
                  ? "결제창을 띄우고 있습니다..."
                  : "예약을 저장 중입니다..."}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
