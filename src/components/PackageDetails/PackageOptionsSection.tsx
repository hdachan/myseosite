"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ 라우터 추가 (페이지 이동용)
import { Minus, Plus } from "lucide-react";
import { PackageOption } from "@/app/package/packageData";
import toast from "react-hot-toast";

interface PackageOptionsSectionProps {
  packageOptions: PackageOption[];
  isSuspended: boolean;
  onSelectPackage: (pkg: PackageOption | null) => void;
  onAddToCart: (data: {
    slug: string;
    title: string;
    image: string;
    optionId: string;
    optionName: string;
    adults: number;
    children: number;
    pricePerPerson: number;
    totalPrice: number;
  }) => void;
  tourSlug: string;
  tourTitle: string;
  tourImage: string;
}

export default function PackageOptionsSection({
  packageOptions,
  isSuspended,
  onSelectPackage,
  onAddToCart,
  tourSlug,
  tourTitle,
  tourImage,
}: PackageOptionsSectionProps) {
  const router = useRouter(); // ✅ 라우터 훅 사용
  const [selectedOption, setSelectedOption] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const selectedPackage = packageOptions?.find(
    (opt) => opt.id === selectedOption
  );

  const totalPrice = selectedPackage
    ? selectedPackage.price * (adults + children)
    : 0;

  const handleReset = () => {
    setSelectedOption("");
    setAdults(0);
    setChildren(0);
    onSelectPackage(null);
  };

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId);
    const pkg = packageOptions.find((opt) => opt.id === optionId);
    onSelectPackage(pkg || null);
  };

  // 🛒 장바구니 담기 핸들러 (기존 유지)
  const handleAddToCart = () => {
    if (isSuspended) return;

    if (!selectedPackage) {
      toast.error("Please select a package option");
      return;
    }

    if (adults === 0 && children === 0) {
      toast.error("Please select at least 1 person");
      return;
    }

    onAddToCart({
      slug: tourSlug,
      title: tourTitle,
      image: tourImage,
      optionId: selectedPackage.id,
      optionName: selectedPackage.name,
      adults,
      children,
      pricePerPerson: selectedPackage.price,
      totalPrice,
    });

    toast.success(`Added to cart! (${adults + children} people)`);
  };

  // 🚀 [NEW] 바로 예약 핸들러 (데이터 챙겨서 이동)
  const handleBookNow = () => {
    if (isSuspended) return;

    if (!selectedPackage) {
      toast.error("Please select a package option");
      return;
    }

    if (adults === 0 && children === 0) {
      toast.error("Please select at least 1 person");
      return;
    }

    // 1. 가져갈 데이터 짐 싸기 (Query String)
    const query = new URLSearchParams({
      slug: tourSlug,
      title: tourTitle,
      image: tourImage,
      optionId: selectedPackage.id,
      optionName: selectedPackage.name,
      price: selectedPackage.price.toString(), // 1인당 단가
      adults: adults.toString(),
      children: children.toString(),
      totalPrice: totalPrice.toString(), // 총 합계 (화면 표시용)
    }).toString();

    // 2. 예약 페이지로 이동 (짐 들고)
    router.push(`/booking?${query}`);
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3">
          Select Option
        </h2>
        <button
          onClick={handleReset}
          className="text-sm text-blue-600 hover:underline"
        >
          Reset
        </button>
      </div>

      {/* ✅ 옵션 리스트 (운영 중단이면 숨김) */}
      {!isSuspended ? (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">
            Please choose your preferred tour course.
          </p>

          <div className="space-y-3">
            {packageOptions?.map((opt) => (
              <label
                key={opt.id}
                className={`block p-4 rounded-lg border-2 cursor-pointer transition relative ${
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
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded font-bold uppercase whitespace-nowrap">
                          {opt.badge}
                        </span>
                      )}
                    </div>

                    {/* ✅ 옵션별 상세 코스 (Route) 노출 */}
                    <div className="text-sm text-gray-600 mt-2">
                      <span className="font-semibold text-gray-800">
                        Route:{" "}
                      </span>
                      {opt.details.join(" → ")}
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
        <div className="text-center py-10 bg-gray-100 rounded-lg">
          <p className="text-gray-500">
            Booking is currently unavailable for this tour.
          </p>
        </div>
      )}

      {/* 인원 선택 및 버튼 (옵션 선택 시 노출) */}
      {selectedOption && !isSuspended && (
        <>
          <div className="space-y-4 mb-6 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700">
              Select Quantity
            </p>

            {/* Adult */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
              <span className="font-medium text-gray-900">Adult</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setAdults(Math.max(0, adults - 1))}
                  className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="w-5 h-5 text-gray-600" />
                </button>
                <span className="w-12 text-center font-semibold text-lg">
                  {adults}
                </span>
                <button
                  onClick={() => setAdults(adults + 1)}
                  className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Child */}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
              <span className="font-medium text-gray-900">
                Child (Ages 3-9)
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="w-5 h-5 text-gray-600" />
                </button>
                <span className="w-12 text-center font-semibold text-lg">
                  {children}
                </span>
                <button
                  onClick={() => setChildren(children + 1)}
                  className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <span className="text-3xl font-bold text-gray-900">
                $ {totalPrice.toFixed(2)}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Total price for {adults + children} person(s)
              </p>
            </div>
          </div>

          {/* 🚀 버튼 2개: 장바구니 & 예약하기 */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={adults === 0 && children === 0}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-lg transition shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBookNow}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={adults === 0 && children === 0}
            >
              Book Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}
