"use client";

import React, { useState, Suspense, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, Lock } from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";
import FullScreenLoader from "@/components/FullScreenLoader";
import { hangameFont } from "@/lib/fonts";
import { useCurrency } from "@/app/context/CurrencyContext";

export const dynamic = "force-dynamic";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { currency: currentCurrency, exchangeRate: currentExchangeRate } =
    useCurrency();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dev.firstpay.co.kr/js/firstpay.js";
    script.async = true;
    document.body.appendChild(script);

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      if (document.head.contains(meta)) document.head.removeChild(meta);
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
    childPrice: searchParams.get("childPrice")
      ? Number(searchParams.get("childPrice"))
      : undefined,
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

  const adultPrice = tourBaseData.price;
  const childPrice = tourBaseData.childPrice || adultPrice;

  const totalPriceKRW =
    adultPrice * formData.adults + childPrice * formData.children;

  const totalPriceUSDString = (totalPriceKRW / currentExchangeRate).toFixed(2);
  const totalPriceUSDNum = Number(totalPriceUSDString);

  const [submissionType, setSubmissionType] = useState<
    "PAYMENT" | "RESERVATION"
  >("PAYMENT");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Math.max(0, Number(value)) }));
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
      return { ...prev, [type]: Math.max(0, prev[type] + delta) };
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
    if (!formData.agreed)
      return alert("Please agree to the Terms and Conditions.");

    setIsSubmitting(true);

    const orderNumber = `ORD_${new Date().getTime()}`;
    const now = new Date();
    const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const mxIssueDate = kstDate
      .toISOString()
      .replace(/[-T:\.Z]/g, "")
      .slice(0, 14);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...tourBaseData,
          ...formData,
          adultPrice: adultPrice,
          childPrice: childPrice,
          totalPrice: totalPriceKRW,
          currency: currentCurrency,
          exchangeRate: currentExchangeRate,
          usdAmount: totalPriceUSDNum,
          type: submissionType,
          order_number: orderNumber,
        }),
      });

      if (!response.ok) throw new Error("Booking failed");

      if (submissionType === "RESERVATION") {
        router.replace(
          `/booking/success?orderId=${orderNumber}&type=RESERVATION`,
        );
      } else {
        if (typeof window === "undefined" || !(window as any).FirstPay) {
          alert("Payment system loading... Please try again.");
          setIsSubmitting(false);
          return;
        }

        const commonAmount =
          currentCurrency === "USD"
            ? Math.max(1, Math.floor(totalPriceUSDNum))
            : totalPriceKRW;

        const hashResponse = await fetch("/api/payment-hash", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderNumber, amount: commonAmount }),
        });

        const { hash: callHash } = await hashResponse.json();

        const pay = new (window as any).FirstPay({
          env: "develop",
          isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
          openType: "popup",
        });

        const payParams: any = {
          mxId: "testcorp",
          mxIssueNo: orderNumber,
          mxIssueDate: mxIssueDate,
          amount: commonAmount,
          currency: currentCurrency,
          orderName: tourBaseData.title,
          buyerName: formData.fullName,
          buyerEmail: formData.email,
          buyerPhone: formData.phone.replace(/[^0-9]/g, ""),
          returnUrl: `${window.location.origin}/api/payment-return`,
          callHash: callHash,
          lang: "en",
        };

        if (currentCurrency === "USD") {
          payParams.FXFlag = "M";
          payParams.FXCurrency = "USD";
          payParams.FXAmount = totalPriceUSDString;
        }

        pay.goPay(payParams);

        const checkPopup = setInterval(() => {
          if (window.closed) {
            clearInterval(checkPopup);
            setIsSubmitting(false);
          }
        }, 1000);
      }
    } catch (error: any) {
      alert("Error processing request: " + error.message);
      setIsSubmitting(false);
    }
  };

  if (!tourBaseData.slug) return null;

  return (
    <div
      className={`min-h-screen bg-[#F8FAFC] pb-24 relative ${hangameFont.variable} pt-24 lg:pt-32`}
    >
      {isSubmitting && <FullScreenLoader />}
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        <button
          onClick={() => router.back()}
          className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-gray-200 group-hover:bg-gray-100 flex items-center justify-center mr-2 transition-colors shadow-sm">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Tour
        </button>

        <div className="mb-10 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-[#4A7C7E]" />
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#4A7C7E]">
              SECURE CHECKOUT
            </span>
          </div>
          <h1
            className={`${hangameFont.className} text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight`}
          >
            Confirm Your Booking
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          <div className="lg:col-span-2">
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
            <OrderSummary
              tourBaseData={tourBaseData}
              formData={formData}
              currentTotalPrice={totalPriceKRW}
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
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
