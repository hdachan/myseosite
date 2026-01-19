"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { hangameFont } from "@/lib/fonts";

// 타입을 여기서 직접 정의합니다
interface PackageOption {
  id: string;
  name: string;
  price: number;
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

  // ✅ [추가 1] 부모(Client)가 던져준 ID를 받을 준비!
  tourId: string;
}

export default function PackageOptionsSection({
  packageOptions,
  isSuspended,
  onSelectPackage,
  onAddToCart,
  tourSlug,
  tourTitle,
  tourImage,

  // ✅ [추가 2] 실제로 받기
  tourId,
}: PackageOptionsSectionProps) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");
  const [tourDate, setTourDate] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const selectedPackage = packageOptions?.find(
    (opt) => opt.id === selectedOption,
  );

  const totalPrice = selectedPackage
    ? selectedPackage.price * (adults + children)
    : 0;

  // 버튼 활성화 여부 체크
  const isButtonDisabled = !tourDate || (adults === 0 && children === 0);

  const handleReset = () => {
    setSelectedOption("");
    setTourDate("");
    setAdults(0);
    setChildren(0);
    onSelectPackage(null);
  };

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId);
    const pkg = packageOptions.find((opt) => opt.id === optionId);
    onSelectPackage(pkg || null);
  };

  const handleAddToCart = () => {
    if (isSuspended) return;
    if (!selectedPackage) return;

    if (!tourDate) {
      toast.error("Please select a tour date");
      return;
    }
    if (adults === 0 && children === 0) {
      toast.error("Please select at least 1 person");
      return;
    }

    onAddToCart({
      // ✅ [추가 3] 장바구니 데이터에 ID 챙겨 넣기
      tourId: tourId,

      slug: tourSlug,
      title: tourTitle,
      image: tourImage,
      optionId: selectedPackage.id,
      optionName: selectedPackage.name,
      adults,
      children,
      pricePerPerson: selectedPackage.price,
      totalPrice,
      date: tourDate,
    });
    toast.success(`Added to cart!`);
  };

  const handleBookNow = () => {
    if (isSuspended) return;
    if (!selectedPackage) return;

    if (!tourDate) {
      toast.error("Please select a tour date");
      return;
    }
    if (adults === 0 && children === 0) {
      toast.error("Please select at least 1 person");
      return;
    }

    const query = new URLSearchParams({
      // ✅ [추가 4] 바로 예약할 때도 URL에 ID 챙겨 보내기
      tourId: tourId,

      slug: tourSlug,
      title: tourTitle,
      image: tourImage,
      optionId: selectedPackage.id,
      optionName: selectedPackage.name,
      price: selectedPackage.price.toString(),
      adults: adults.toString(),
      children: children.toString(),
      totalPrice: totalPrice.toString(),
      date: tourDate,
    }).toString();

    router.push(`/booking?${query}`);
  };

  return (
    <div className="bg-gray-50 rounded-[6px] p-6 border border-gray-200">
      {/* 헤더 */}
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

      {/* 옵션 리스트 */}
      {!isSuspended ? (
        <div className="mb-6">
          <div className="space-y-3">
            {packageOptions?.map((opt) => (
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
                    className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-gray-900 text-lg">
                        {opt.name}
                      </span>
                      {opt.badge && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-[4px] font-bold uppercase whitespace-nowrap">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mt-2 leading-snug">
                      <span className="font-semibold text-gray-800">
                        Route:{" "}
                      </span>
                      {/* 데이터가 없어도 에러 안 나게 처리 */}
                      {opt.details?.join(" → ") || "View schedule details"}
                    </div>
                    <div className="mt-2 text-right">
                      <span className="text-lg font-bold text-gray-900">
                        $ {opt.price}
                      </span>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-100 rounded-[6px]">
          <p className="text-gray-500 text-sm">
            Booking is currently unavailable for this tour.
          </p>
        </div>
      )}

      {/* 날짜 선택 & 인원 선택 */}
      {selectedOption && !isSuspended && (
        <>
          <div className="space-y-6 mb-6 pt-6 border-t border-gray-200">
            {/* 1. 날짜 선택기 */}
            <div>
              <p className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                Select Tour Date
              </p>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={tourDate}
                  onChange={(e) => setTourDate(e.target.value)}
                  className="w-full border border-gray-300 p-3 pl-10 rounded-[6px] focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer bg-white text-gray-900 font-medium"
                />
              </div>
            </div>

            {/* 2. 인원 선택 */}
            <div>
              <p className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                Select Quantity
              </p>
              {/* Adult */}
              <div className="flex items-center justify-between p-4 bg-white rounded-[6px] border border-gray-200 shadow-sm mb-3">
                <span className="font-medium text-gray-900 text-sm">Adult</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setAdults(Math.max(0, adults - 1))}
                    className="w-9 h-9 rounded-[6px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-bold text-lg text-gray-900">
                    {adults}
                  </span>
                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="w-9 h-9 rounded-[6px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Child */}
              <div className="flex items-center justify-between p-4 bg-white rounded-[6px] border border-gray-200 shadow-sm">
                <span className="font-medium text-gray-900 text-sm">
                  Child (Ages 3-9)
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-9 h-9 rounded-[6px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-bold text-lg text-gray-900">
                    {children}
                  </span>
                  <button
                    onClick={() => setChildren(children + 1)}
                    className="w-9 h-9 rounded-[6px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-gray-200">
            <div>
              <span className="text-3xl font-bold text-gray-900">
                $ {totalPrice.toFixed(2)}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Total price for {adults + children} person(s)
              </p>
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 rounded-[6px] transition shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBookNow}
              disabled={isButtonDisabled}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-[6px] transition shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
            >
              Book Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}
