"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { hangameFont } from "@/lib/fonts"; // 폰트가 정의된 경로에 맞춰 수정하세요
import {
  Trash2,
  CreditCard,
  ShoppingBag,
  Calendar,
  CalendarCheck,
} from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";
import { useCartStore } from "@/store/cartStore"; // 수정된 Store

// Store 아이템 타입 (안전장치)
interface ExtendedCartItem {
  slug: string;
  title: string;
  image: string;
  optionId: string;
  optionName: string;
  adults: number;
  children: number;
  pricePerPerson: number;
  totalPrice: number;
  date?: string;
  tourId?: string;
}

function CartContent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 스토어 연결
  const items = useCartStore((state) => state.items) as ExtendedCartItem[];
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    tourDate: "",
    hotelInfo: "",
    adults: 0,
    children: 0,
    agreed: false,
  });

  const totalAmount = getTotalPrice();

  // KPN 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dev.firstpay.co.kr/js/firstpay.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  async function generateHash(message: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemove = (item: ExtendedCartItem) => {
    removeItem(item.slug, item.optionId);
  };

  // ✅ 통합 처리 핸들러 (예약 vs 결제)
  const processCheckout = async (type: "PAYMENT" | "RESERVATION") => {
    if (items.length === 0) return alert("Cart is empty.");
    if (!formData.fullName || !formData.email || !formData.phone)
      return alert("Please fill in Traveler Information.");
    if (!formData.agreed) return alert("Please agree to the Terms.");

    setIsSubmitting(true);

    const orderNumber = `ORD_${new Date().getTime()}`;
    const firstItemTitle = items[0].title;
    const orderName =
      items.length > 1
        ? `${firstItemTitle} and ${items.length - 1} others`
        : firstItemTitle;

    try {
      // 1. DB 저장 (API 호출)
      const response = await fetch("/api/cart-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: items.map((item) => ({
            tourId: item.tourId || item.slug,
            title: item.title,
            date: item.date || new Date().toISOString().split("T")[0],
            optionName: item.optionName,
            adults: item.adults,
            children: item.children,
            totalPrice: item.totalPrice,
          })),
          order_number: orderNumber,
          total_price: totalAmount,
          customer_info: formData,
          submissionType: type, // ✅ 예약인지 결제인지 구분값 전달
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Server Error");
      }

      // 2. 분기 처리
      if (type === "RESERVATION") {
        // [예약만 하기]
        // 장바구니 비우기 (선택사항)
        clearCart();

        // 성공 페이지로 바로 이동
        router.push(`/booking/success?orderId=${orderNumber}`);
      } else {
        // [결제 하기] -> PG창 띄우기
        if (typeof window === "undefined" || !(window as any).FirstPay) {
          alert("Payment system loading...");
          return;
        }

        const mxId = "testcorp";
        const passKey = "6aMoJujE34XnL9gvUqdKGMqs9GzYaNo6";
        const hashString = mxId + orderNumber + totalAmount + passKey;
        const callHash = await generateHash(hashString);

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
          amount: totalAmount,
          currency: "KRW",
          orderName: orderName,
          buyerName: formData.fullName,
          buyerEmail: formData.email,
          returnUrl: `${window.location.origin}/api/payment-return`,
          callHash: callHash,
        });
      }
    } catch (error: any) {
      console.error(error);
      alert("Error: " + error.message);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      // 1. 폰트 변수와 클래스 적용
      <div
        className={`${hangameFont.variable} font-hangame min-h-screen flex flex-col items-center justify-center bg-gray-50`}
      >
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-xl text-gray-500 mb-4">Your cart is empty.</p>
        <button
          onClick={() => router.push("/package")}
          style={{ backgroundColor: "#4A7C82" }}
          className="text-white px-6 py-2 rounded-lg font-bold hover:brightness-110 transition-all"
        >
          Go to Tours
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <ShoppingBag /> Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* [왼쪽] 상품 목록 & 정보 입력 */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="font-bold text-lg mb-4">Items ({items.length})</h2>

              {items.map((item, idx) => (
                <div
                  key={`${item.slug}-${item.optionId}-${idx}`}
                  className="flex justify-between items-start border-b border-gray-100 py-6 last:border-0"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg mb-1">
                      {item.title}
                    </h3>
                    {item.date && (
                      <div className="flex items-center text-sm text-orange-600 font-medium mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.date}
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mb-1">
                      Option:{" "}
                      <span className="text-gray-700">{item.optionName}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Adults: {item.adults}, Children: {item.children}
                    </p>
                  </div>

                  <div className="text-right flex flex-col items-end justify-between h-full pl-4">
                    <p className="font-bold text-gray-900 text-lg mb-4">
                      $ {item.totalPrice.toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <BookingForm
              formData={{
                ...formData,
                tourDate: new Date().toISOString().split("T")[0],
              }}
              handleChange={handleChange}
            />

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">
                  I have read and agree to the Terms and Conditions.
                </span>
              </label>
            </div>
          </div>

          {/* [오른쪽] 결제 요약 */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 sticky top-24">
              <h3 className="text-lg font-bold mb-4 border-b pb-2">
                Total Summary
              </h3>

              <div className="flex justify-between items-center text-2xl font-bold mb-6 pt-2">
                <span>Total</span>
                <span className="text-red-600">
                  $ {totalAmount.toLocaleString()}
                </span>
              </div>

              {/* ✅ 버튼 2개로 분리 */}
              <div className="flex flex-col gap-3">
                {/* 1. 결제 버튼 */}
                <button
                  onClick={() => processCheckout("PAYMENT")}
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg transition shadow-md flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Pay Now"}
                  <CreditCard className="w-5 h-5" />
                </button>

                {/* 2. 예약 버튼 (결제 X) */}
                <button
                  onClick={() => processCheckout("RESERVATION")}
                  disabled={isSubmitting}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 rounded-lg transition shadow-md flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Make a Reservation"}
                  <CalendarCheck className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-center text-gray-400 mt-4">
                Secure SSL Encrypted Payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading Cart...
        </div>
      }
    >
      <CartContent />
    </Suspense>
  );
}
