"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Trash2,
  CreditCard,
  ShoppingBag,
  Calendar,
  CalendarCheck,
  Minus,
  Plus,
} from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";
import FullScreenLoader from "@/components/FullScreenLoader";
import { useCartStore } from "@/store/cartStore";
import { hangameFont } from "@/lib/fonts";

// Store 아이템 타입 정의
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

  // Zustand Selector 분리
  const items = useCartStore((state: any) => state.items as ExtendedCartItem[]);
  const removeItem = useCartStore((state: any) => state.removeItem);
  const getTotalPrice = useCartStore((state: any) => state.getTotalPrice);
  const clearCart = useCartStore((state: any) => state.clearCart);
  const updateItemQuantity = useCartStore(
    (state: any) => state.updateItemQuantity,
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    tourDate: "",
    hotelInfo: "",
    agreed: false,
  });

  const totalAmount = getTotalPrice();

  // 한국 시간(KST) 오늘 날짜 계산
  const minDate = useMemo(() => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const kstGap = 9 * 60 * 60000;
    const kstDate = new Date(utc + kstGap);
    return kstDate.toISOString().split("T")[0];
  }, []);

  // 날짜 동기화
  useEffect(() => {
    let targetDate = minDate;
    if (items.length > 0 && items[0].date) {
      targetDate = items[0].date;
    }
    setFormData((prev) => {
      if (prev.tourDate !== targetDate) {
        return { ...prev, tourDate: targetDate };
      }
      return prev;
    });
  }, [items, minDate]);

  // KPN 결제 스크립트 로드
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

  const handlePaxChange = (
    item: ExtendedCartItem,
    type: "adults" | "children",
    delta: number,
  ) => {
    if (updateItemQuantity) {
      updateItemQuantity(item.slug, item.optionId, type, delta);
    } else {
      console.warn("Store update function missing");
    }
  };

  const handleRemove = (item: ExtendedCartItem) => {
    removeItem(item.slug, item.optionId);
  };

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
      const response = await fetch("/api/cart-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: items.map((item) => ({
            tourId: item.tourId || item.slug,
            title: item.title,
            date: formData.tourDate,
            optionName: item.optionName,
            adults: item.adults,
            children: item.children,
            totalPrice: item.totalPrice,
          })),
          order_number: orderNumber,
          total_price: totalAmount,
          customer_info: formData,
          submissionType: type,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Server Error");
      }

      if (type === "RESERVATION") {
        clearCart();
        setTimeout(() => {
          router.push(`/booking/success?orderId=${orderNumber}&type=${type}`);
        }, 100);
      } else {
        if (typeof window === "undefined" || !(window as any).FirstPay) {
          alert("Payment system loading...");
          setIsSubmitting(false);
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
          lang: "en",
          cardSelect: "09:18",
        });
        setIsSubmitting(false);
      }
    } catch (error: any) {
      console.error(error);
      alert("Error: " + error.message);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
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
    // ✅ [레이아웃 수정] 상단 패딩 제거하고 내부 컨테이너로 이동, pb-24 적용
    <div className="min-h-screen bg-gray-50 pb-24 relative">
      {isSubmitting && <FullScreenLoader />}

      {/* ✅ [레이아웃 핵심] max-w-6xl, px-8 lg:px-12 적용, pt-12 추가 */}
      <div className="max-w-6xl mx-auto px-8 lg:px-12 pt-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <ShoppingBag /> Your Cart
        </h1>

        {/* ✅ [레이아웃 수정] gap-8 -> gap-12 로 변경하여 간격 확보 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* [왼쪽] 상품 목록 & 정보 입력 */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="font-bold text-lg mb-4">Items ({items.length})</h2>

              {items.map((item, idx) => (
                <div
                  key={`${item.slug}-${item.optionId}-${idx}`}
                  className="flex flex-col sm:flex-row gap-6 border-b border-gray-100 py-6 last:border-0"
                >
                  <div className="relative w-full sm:w-24 h-32 sm:h-24 rounded-[6px] overflow-hidden flex-shrink-0 bg-gray-100">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg mb-1 leading-snug">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-sm text-orange-600 font-medium mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formData.tourDate || item.date}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        Option:{" "}
                        <span className="text-gray-700 font-medium">
                          {item.optionName}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-3 mt-2">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="font-medium w-16">Adults</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                handlePaxChange(item, "adults", -1)
                              }
                              className="w-6 h-6 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Minus className="w-3 h-3 text-gray-600" />
                            </button>
                            <span className="w-6 text-center font-bold text-gray-900">
                              {item.adults}
                            </span>
                            <button
                              onClick={() => handlePaxChange(item, "adults", 1)}
                              className="w-6 h-6 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Plus className="w-3 h-3 text-gray-600" />
                            </button>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 text-right">
                          <span className="block font-medium text-gray-900 text-sm">
                            ${" "}
                            {(
                              item.adults * item.pricePerPerson
                            ).toLocaleString()}
                          </span>
                          <span className="text-gray-400">
                            ({item.adults} x ${" "}
                            {item.pricePerPerson.toLocaleString()})
                          </span>
                        </div>
                      </div>

                      {item.children > 0 && (
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="font-medium w-16">Children</span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  handlePaxChange(item, "children", -1)
                                }
                                className="w-6 h-6 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                              >
                                <Minus className="w-3 h-3 text-gray-600" />
                              </button>
                              <span className="w-6 text-center font-bold text-gray-900">
                                {item.children}
                              </span>
                              <button
                                onClick={() =>
                                  handlePaxChange(item, "children", 1)
                                }
                                className="w-6 h-6 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                              >
                                <Plus className="w-3 h-3 text-gray-600" />
                              </button>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 text-right">
                            <span className="block font-medium text-gray-900 text-sm">
                              ${" "}
                              {(
                                item.children * item.pricePerPerson
                              ).toLocaleString()}
                            </span>
                            <span className="text-gray-400">
                              ({item.children} x ${" "}
                              {item.pricePerPerson.toLocaleString()})
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right sm:pl-4 mt-4 sm:mt-0 flex flex-col justify-between items-end">
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 mb-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Subtotal</p>
                      <p className="font-bold text-gray-900 text-xl">
                        $ {item.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <BookingForm
              formData={formData}
              handleChange={handleChange}
              minDate={minDate}
            />

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-[6px] border border-gray-200">
              <input
                type="checkbox"
                id="agreed"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
              />
              <label
                htmlFor="agreed"
                className="text-xs text-gray-600 cursor-pointer leading-tight"
              >
                I have read and agree to the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  className="underline hover:text-orange-600"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="/cancellation-policy"
                  target="_blank"
                  className="underline hover:text-orange-600"
                >
                  Cancellation Policy
                </a>
                .
              </label>
            </div>
          </div>

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

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => processCheckout("PAYMENT")}
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg transition shadow-md flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <CreditCard className="w-5 h-5" />
                  {isSubmitting ? "Processing..." : "Pay Now"}
                </button>

                <button
                  onClick={() => processCheckout("RESERVATION")}
                  disabled={isSubmitting}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 rounded-lg transition shadow-md flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <CalendarCheck className="w-5 h-5" />
                  {isSubmitting ? "Processing..." : "Make a Reservation"}
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
