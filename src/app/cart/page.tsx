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
  AlertCircle,
} from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";
import FullScreenLoader from "@/components/FullScreenLoader";
import { useCartStore } from "@/store/cartStore";
import { hangameFont } from "@/lib/fonts";
import toast from "react-hot-toast";

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
  minPax?: number;
}

function CartContent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Zustand Selector
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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dev.firstpay.co.kr/js/firstpay.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

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
    const currentTotal = item.adults + item.children;
    const limit = item.minPax || 1;

    if (delta < 0 && currentTotal <= limit) {
      toast.error(`Minimum booking for this tour is ${limit} person(s).`);
      return;
    }

    if (updateItemQuantity) {
      updateItemQuantity(item.slug, item.optionId, type, delta);
    }
  };

  const handleRemove = (item: ExtendedCartItem) => {
    removeItem(item.slug, item.optionId);
  };

  const invalidItems = items.filter(
    (item) => item.adults + item.children < (item.minPax || 1),
  );
  const isCartInvalid = invalidItems.length > 0;

  // 🔥 [핵심 수정] 결제 프로세스
  const processCheckout = async (type: "PAYMENT" | "RESERVATION") => {
    if (items.length === 0) return alert("Cart is empty.");
    if (isCartInvalid) {
      toast.error("Some items do not meet the minimum passenger requirement.");
      return;
    }
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

    const now = new Date();
    const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const mxIssueDate = kstDate
      .toISOString()
      .replace(/[-T:\.Z]/g, "")
      .slice(0, 14);

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

        const hashResponse = await fetch("/api/payment-hash", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderNumber, amount: totalAmount }),
        });

        if (!hashResponse.ok) throw new Error("Failed to generate hash.");
        const { hash: callHash } = await hashResponse.json();

        const pay = new (window as any).FirstPay({
          env: "develop",
          isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
          openType: "popup",
        });

        // ⭐ [포인트] 팝업창 객체를 변수에 할당
        const payPopup = pay.goPay({
          mxId: "testcorp",
          mxIssueNo: orderNumber,
          mxIssueDate: mxIssueDate,
          amount: totalAmount,
          currency: "KRW",
          orderName: orderName,
          buyerName: formData.fullName,
          buyerEmail: formData.email,
          buyerPhone: formData.phone.replace(/[^0-9]/g, ""),
          returnUrl: `${window.location.origin}/api/payment-return`,
          callHash: callHash,
          lang: "en",
        });

        // ⭐ [포인트] 팝업창 닫힘 감시 (사용자 이탈 대응)
        const checkPopup = setInterval(() => {
          if (payPopup && payPopup.closed) {
            clearInterval(checkPopup);
            setIsSubmitting(false); // 로더 해제
          }
        }, 1000);
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
        className={`${hangameFont.variable} font-hangame min-h-screen flex flex-col items-center justify-center bg-white`}
      >
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-xl text-gray-700 mb-4">Your cart is empty.</p>
        <button
          onClick={() => router.push("/package")}
          className="bg-[#4A7C82] text-white px-6 py-2 rounded-lg font-bold hover:brightness-110 transition-all"
        >
          Go to Tours
        </button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-white pb-24 relative ${hangameFont.variable} font-hangame`}
    >
      {isSubmitting && <FullScreenLoader />}

      {/* 모바일 헤더 여백 추가 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 lg:pt-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center gap-2">
          <ShoppingBag /> Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* 왼쪽 컬럼: 장바구니 아이템 및 폼 */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="font-bold text-base sm:text-lg text-gray-900 mb-4">
                Items ({items.length})
              </h2>

              {items.map((item, idx) => (
                <div
                  key={`${item.slug}-${item.optionId}-${idx}`}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-gray-100 py-4 sm:py-6 last:border-0"
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
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1 leading-snug">
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
                      {(item.minPax || 1) > 1 && (
                        <p className="text-xs text-orange-600 font-medium">
                          * Minimum {item.minPax} people required
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 mt-2">
                      {/* 성인 수량 조절 */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="font-medium w-14 sm:w-16">
                            Adults
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                handlePaxChange(item, "adults", -1)
                              }
                              className="w-6 h-6 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 bg-white"
                            >
                              <Minus className="w-3 h-3 text-gray-700" />
                            </button>
                            <span className="w-6 text-center font-bold text-gray-900">
                              {item.adults}
                            </span>
                            <button
                              onClick={() => handlePaxChange(item, "adults", 1)}
                              className="w-6 h-6 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 bg-white"
                            >
                              <Plus className="w-3 h-3 text-gray-700" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="block font-bold text-gray-900 text-sm">
                            ${" "}
                            {(
                              item.adults * item.pricePerPerson
                            ).toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({item.adults} x ${" "}
                            {item.pricePerPerson.toLocaleString()})
                          </span>
                        </div>
                      </div>

                      {/* 소아 수량 조절 (있는 경우만) */}
                      {item.children > 0 && (
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="font-medium w-14 sm:w-16">
                              Children
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  handlePaxChange(item, "children", -1)
                                }
                                className="w-6 h-6 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 bg-white"
                              >
                                <Minus className="w-3 h-3 text-gray-700" />
                              </button>
                              <span className="w-6 text-center font-bold text-gray-900">
                                {item.children}
                              </span>
                              <button
                                onClick={() =>
                                  handlePaxChange(item, "children", 1)
                                }
                                className="w-6 h-6 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 bg-white"
                              >
                                <Plus className="w-3 h-3 text-gray-700" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="block font-bold text-gray-900 text-sm">
                              ${" "}
                              {(
                                item.children * item.pricePerPerson
                              ).toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-400">
                              ({item.children} x ${" "}
                              {item.pricePerPerson.toLocaleString()})
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right flex flex-row sm:flex-col justify-between sm:justify-between items-center sm:items-end">
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-gray-400 hover:text-red-500 p-1 mb-0 sm:mb-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Subtotal</p>
                      <p className="font-bold text-gray-900 text-lg sm:text-xl">
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
                className="w-5 h-5 text-orange-600 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="agreed"
                className="text-xs text-gray-600 cursor-pointer leading-tight"
              >
                I have read and agree to the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  className="underline text-gray-800"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="/cancellation-policy"
                  target="_blank"
                  className="underline text-gray-800"
                >
                  Cancellation Policy
                </a>
                .
              </label>
            </div>
          </div>

          {/* 오른쪽 컬럼: 결제 요약 및 버튼 */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200 lg:sticky lg:top-24">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                Total Summary
              </h3>
              <div className="flex justify-between items-center text-xl sm:text-2xl font-bold mb-6 pt-2">
                <span className="text-gray-900">Total</span>
                <span className="text-red-600">
                  $ {totalAmount.toLocaleString()}
                </span>
              </div>

              {isCartInvalid && (
                <div className="mb-4 flex items-start gap-2 bg-red-50 p-3 rounded-[6px] text-xs font-medium text-red-600">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>
                    One or more items do not meet the minimum passenger
                    requirement.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => processCheckout("PAYMENT")}
                  disabled={isSubmitting || isCartInvalid}
                  className={`w-full font-bold py-3 sm:py-4 rounded-lg shadow-md flex items-center justify-center gap-2 text-sm sm:text-base ${
                    isSubmitting || isCartInvalid
                      ? "bg-gray-300 text-gray-500"
                      : "bg-orange-600 hover:bg-orange-700 text-white"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  {isSubmitting ? "Processing..." : "Pay Now"}
                </button>

                <button
                  onClick={() => processCheckout("RESERVATION")}
                  disabled={isSubmitting || isCartInvalid}
                  className={`w-full font-bold py-3 sm:py-4 rounded-lg shadow-md flex items-center justify-center gap-2 text-sm sm:text-base ${
                    isSubmitting || isCartInvalid
                      ? "bg-gray-300 text-gray-500"
                      : "bg-gray-800 hover:bg-gray-900 text-white"
                  }`}
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
        <div className="min-h-screen flex items-center justify-center bg-white">
          <p className="text-gray-700">Loading Cart...</p>
        </div>
      }
    >
      <CartContent />
    </Suspense>
  );
}
