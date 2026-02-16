"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Calendar, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { hangameFont } from "@/lib/fonts";
import { useCurrency } from "@/app/context/CurrencyContext";

interface PackageOption {
  id: string;
  name: string;
  price: number;
  childPrice?: number;
  originalPrice?: number;
  badge?: string;
  details?: string[];
}

interface PackageOptionsSectionProps {
  packageOptions: PackageOption[];
  isSuspended: boolean;
  onSelectPackage: (pkg: PackageOption | null) => void;
  onAddToCart: (data: any) => void;
  tourSlug: string;
  tourTitle: string;
  tourImage: string;
  tourId: string;
  minPax?: number;
}

export default function PackageOptionsSection({
  packageOptions,
  isSuspended,
  onSelectPackage,
  onAddToCart,
  tourSlug,
  tourTitle,
  tourImage,
  tourId,
  minPax = 1,
}: PackageOptionsSectionProps) {
  const router = useRouter();
  const { currency, exchangeRate, formatPrice } = useCurrency();

  const [selectedOption, setSelectedOption] = useState("");
  const [tourDate, setTourDate] = useState("");
  const [adults, setAdults] = useState(Math.max(1, minPax));
  const [children, setChildren] = useState(0);
  const [minDate, setMinDate] = useState("");

  const getKoreaDate = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const kstGap = 9 * 60 * 60 * 1000;
    const todayKST = new Date(utc + kstGap);
    return todayKST.toISOString().split("T")[0];
  };

  useEffect(() => {
    setMinDate(getKoreaDate());
  }, []);

  useEffect(() => {
    if (minPax > 1 && adults < minPax) {
      setAdults(minPax);
    }
  }, [minPax]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    const today = getKoreaDate();
    if (selected < today) {
      toast.error("You cannot select a past date.");
      setTourDate("");
      return;
    }
    setTourDate(selected);
  };

  const selectedPackage = packageOptions?.find(
    (opt) => opt.id === selectedOption,
  );

  const adultPrice = selectedPackage?.price || 0;
  const childPrice = selectedPackage?.childPrice || adultPrice;

  const totalPriceKRW = adultPrice * adults + childPrice * children;
  const totalPriceUSD = Number((totalPriceKRW / exchangeRate).toFixed(2));

  const totalPeople = adults + children;
  const isDateSelected = tourDate !== "";
  const isPaxMet = totalPeople >= minPax;
  const isButtonDisabled = !isDateSelected || !isPaxMet;

  const handleReset = () => {
    setSelectedOption("");
    setTourDate("");
    setAdults(minPax);
    setChildren(0);
    onSelectPackage(null);
  };

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId);
    const pkg = packageOptions.find((opt) => opt.id === optionId);
    onSelectPackage(pkg || null);
  };

  const handleDecrease = (type: "adults" | "children") => {
    const currentTotal = adults + children;
    if (currentTotal <= minPax) {
      toast.error(`Minimum booking is ${minPax} person(s).`);
      return;
    }
    if (type === "adults") setAdults(Math.max(0, adults - 1));
    else setChildren(Math.max(0, children - 1));
  };

  const handleAddToCart = () => {
    if (isButtonDisabled) return;
    onAddToCart({
      tourId,
      slug: tourSlug,
      title: tourTitle,
      image: tourImage,
      optionId: selectedPackage?.id,
      optionName: selectedPackage?.name,
      adults,
      children,
      adultPrice: adultPrice,
      childPrice: childPrice,
      pricePerPerson: adultPrice,
      totalPrice: totalPriceKRW,
      usdAmount: totalPriceUSD,
      currency,
      exchangeRate,
      date: tourDate,
      minPax,
    });
    toast.success(`Added to cart!`);
  };

  const handleBookNow = () => {
    if (isButtonDisabled) return;
    const query = new URLSearchParams({
      tourId,
      slug: tourSlug,
      title: tourTitle,
      image: tourImage,
      optionId: selectedPackage!.id,
      optionName: selectedPackage!.name,
      price: adultPrice.toString(),
      childPrice: childPrice.toString(),
      adults: adults.toString(),
      children: children.toString(),
      totalPrice: totalPriceKRW.toString(),
      usdAmount: totalPriceUSD.toString(),
      date: tourDate,
      minPax: minPax.toString(),
      currency: currency,
      exchangeRate: exchangeRate.toString(),
    }).toString();
    router.push(`/booking?${query}`);
  };

  return (
    <div className="bg-gray-50 rounded-[6px] p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-2">
            PACKAGE SELECTION
          </p>
          <h2
            className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 leading-tight`}
          >
            Select Option
          </h2>
        </div>
        <button
          onClick={handleReset}
          className="text-xs font-medium text-gray-500 hover:text-orange-600 underline mt-1"
        >
          Reset
        </button>
      </div>

      {!isSuspended ? (
        <div className="mb-6">
          <div className="space-y-3">
            {packageOptions?.map((opt) => {
              const hasDiscount =
                opt.originalPrice !== undefined &&
                opt.originalPrice !== null &&
                opt.originalPrice > opt.price;

              const hasBadge = opt.badge && opt.badge.trim().length > 0;

              const discountRate = hasDiscount
                ? Math.round(
                    ((opt.originalPrice! - opt.price) / opt.originalPrice!) *
                      100,
                  )
                : 0;

              return (
                <label
                  key={opt.id}
                  className={`block p-4 rounded-[6px] border cursor-pointer transition relative ${
                    selectedOption === opt.id
                      ? "border-orange-500 bg-white shadow-md ring-1 ring-orange-500"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="package"
                      value={opt.id}
                      checked={selectedOption === opt.id}
                      onChange={(e) => handleOptionChange(e.target.value)}
                      className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-bold text-gray-900 text-lg leading-tight">
                          {opt.name}
                        </span>

                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          {hasBadge && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] rounded-[4px] font-bold uppercase whitespace-nowrap">
                              {opt.badge}
                            </span>
                          )}

                          {hasDiscount && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] rounded-[4px] font-bold uppercase whitespace-nowrap animate-pulse">
                              SAVE {discountRate}%
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mt-2 leading-snug">
                        <span className="font-semibold text-gray-800">
                          Route:{" "}
                        </span>
                        {opt.details?.join(" → ") || "View schedule details"}
                      </div>

                      <div className="mt-2 text-right flex flex-col items-end justify-end">
                        {hasDiscount && (
                          <span className="text-xs text-gray-400 line-through decoration-gray-400 mr-1">
                            {formatPrice(opt.originalPrice!)}
                          </span>
                        )}
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(opt.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-100 rounded-[6px]">
          <p className="text-gray-500 text-sm">
            Booking is currently unavailable for this tour.
          </p>
        </div>
      )}

      {selectedOption && !isSuspended && (
        <>
          <div className="space-y-6 mb-6 pt-6 border-t border-gray-200">
            <div>
              <p className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                Select Tour Date
              </p>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  min={minDate}
                  value={tourDate}
                  onChange={handleDateChange}
                  className="w-full border border-gray-300 p-3 pl-10 rounded-[6px] focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer bg-white text-gray-900 font-medium"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-3">
                <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Select Quantity
                </p>
                {minPax > 1 && (
                  <span
                    className={`text-xs font-medium ${!isPaxMet ? "text-red-600 animate-pulse" : "text-green-600"}`}
                  >
                    * Minimum {minPax} people required
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-[6px] border border-gray-200 shadow-sm mb-3">
                <span className="font-medium text-gray-900 text-sm">Adult</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleDecrease("adults")}
                    className="w-9 h-9 rounded-[6px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-bold text-lg text-gray-900">
                    {adults}
                  </span>
                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="w-9 h-9 rounded-[6px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-[6px] border border-gray-200 shadow-sm">
                <span className="font-medium text-gray-900 text-sm">
                  Child (Ages 3-9)
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleDecrease("children")}
                    className="w-9 h-9 rounded-[6px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-bold text-lg text-gray-900">
                    {children}
                  </span>
                  <button
                    onClick={() => setChildren(children + 1)}
                    className="w-9 h-9 rounded-[6px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-gray-200">
            <div>
              <div className="flex items-baseline gap-2">
                {selectedPackage?.originalPrice &&
                selectedPackage.originalPrice > selectedPackage.price ? (
                  <span className="text-lg text-gray-400 line-through decoration-gray-400">
                    {formatPrice(
                      selectedPackage.originalPrice * adults +
                        (selectedPackage?.childPrice || selectedPackage.price) *
                          children,
                    )}
                  </span>
                ) : null}
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(totalPriceKRW)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Total price for {adults + children} person(s)
              </p>
            </div>
          </div>

          {isButtonDisabled && (
            <div className="mb-3 flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-[6px] text-xs font-medium">
              <AlertCircle className="w-4 h-4" />
              {!isDateSelected
                ? "Please select a tour date first."
                : `Minimum ${minPax} people required to proceed.`}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`flex-1 font-bold py-4 rounded-[6px] transition shadow-md text-sm ${isButtonDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none" : "bg-gray-800 hover:bg-gray-900 text-white"}`}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBookNow}
              disabled={isButtonDisabled}
              className={`flex-1 font-bold py-4 rounded-[6px] transition shadow-md text-sm ${isButtonDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none" : "bg-orange-600 hover:bg-orange-700 text-white"}`}
            >
              Book Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}
