"use client";

import React, { useState, Suspense, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, Lock, AlertCircle } from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";
import FullScreenLoader from "@/components/FullScreenLoader";
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

  const minDate = useMemo(() => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const kstGap = 9 * 60 * 60000;
    const kstDate = new Date(utc + kstGap);
    return kstDate.toISOString().split("T")[0];
  }, []);

  const minPax = Number(searchParams.get("minPax")) || 1;

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
    adults: Math.max(Number(searchParams.get("adults")) || 1, minPax),
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
    setFormData((prev) => {
      const currentTotal = prev.adults + prev.children;
      if (delta < 0 && currentTotal <= minPax) {
        alert(`Minimum booking for this tour is ${minPax} person(s).`);
        return prev;
      }
      return {
        ...prev,
        [type]: Math.max(0, prev[type] + delta),
      };
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tourBaseData.tourId) return alert("System Error: Tour ID missing.");

    if (formData.adults + formData.children < minPax) {
      scrollToTop();
      return alert(`Minimum booking requirement is ${minPax} people.`);
    }

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
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Booking failed");

      if (submissionType === "RESERVATION") {
        router.push(`/booking/success?orderId=${orderNumber}&type=RESERVATION`);
      } else {
        // [결제 로직 - 보안 강화 버전]
        if (typeof window === "undefined" || !(window as any).FirstPay) {
          alert("Payment system loading... Please try again.");
          setIsSubmitting(false);
          return;
        }

        const mxId = "testcorp";
        const amount = currentTotalPrice;

        // ✅ 1. 서버에 해시 생성을 요청합니다 (API 호출)
        const hashResponse = await fetch("/api/payment-hash", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderNumber: orderNumber,
            amount: amount,
          }),
        });

        if (!hashResponse.ok) {
          throw new Error("Failed to generate secure payment hash.");
        }

        // ✅ 2. 서버가 준 안전한 해시를 받습니다.
        const { hash: callHash } = await hashResponse.json();

        // ✅ 3. 결제창을 띄웁니다.
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
          callHash: callHash, // 서버에서 받아온 해시 사용
          lang: "en",
          cardSelect: "09:18",
        });

        setIsSubmitting(false);
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
    <div className="min-h-screen bg-gray-50 pb-24 relative">
      {isSubmitting && <FullScreenLoader />}

      <div className="max-w-6xl mx-auto px-8 lg:px-12 pt-12">
        <button
          onClick={() => router.back()}
          className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-gray-200 group-hover:bg-gray-100 flex items-center justify-center mr-2 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Tour
        </button>

        <div className="mb-10 border-b border-gray-200 pb-6">
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
          {minPax > 1 && (
            <div className="mt-2 flex items-center gap-2 text-xs font-medium text-orange-600 bg-orange-50 w-fit px-3 py-1 rounded-full">
              <AlertCircle className="w-3 h-3" />
              Minimum {minPax} people required for this tour
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          <div className={`lg:col-span-2`}>
            <div
              className={isSubmitting ? "opacity-50 pointer-events-none" : ""}
            >
              <BookingForm
                formData={formData}
                handleChange={handleChange}
                minDate={minDate}
              />
            </div>
          </div>

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
