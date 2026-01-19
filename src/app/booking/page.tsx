"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
// ✅ 분리한 컴포넌트 임포트
import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tourBaseData = {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
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
    if (formData.adults < 1) return alert("At least 1 adult is required.");
    if (!formData.agreed) return alert("Please agree to the Terms.");

    const submitData = {
      ...tourBaseData,
      ...formData,
      totalPrice: currentTotalPrice,
      type: submissionType,
    };

    if (submissionType === "PAYMENT") {
      alert(`Proceeding to payment for $${currentTotalPrice}...`);
      console.log("PAYMENT:", submitData);
    } else {
      alert("Reservation Submitted!");
      console.log("RESERVATION:", submitData);
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
          {/* ✅ 왼쪽: 입력 폼 (컴포넌트로 대체) */}
          <div className="lg:col-span-2">
            <BookingForm formData={formData} handleChange={handleChange} />
          </div>

          {/* ✅ 오른쪽: 주문 요약 (컴포넌트로 대체) */}
          <div className="lg:col-span-1">
            <OrderSummary
              tourBaseData={tourBaseData}
              formData={formData}
              currentTotalPrice={currentTotalPrice}
              handlePaxChange={handlePaxChange}
              handleChange={handleChange}
              setSubmissionType={setSubmissionType}
            />
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
          Loading...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
