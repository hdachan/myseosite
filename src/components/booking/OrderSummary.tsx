"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, CreditCard, CalendarCheck } from "lucide-react";
import { useCurrency } from "@/app/context/CurrencyContext";

interface OrderSummaryProps {
  tourBaseData: {
    title: string;
    image: string;
    optionName: string;
    price: number;
    childPrice?: number;
  };
  formData: {
    adults: number;
    children: number;
    agreed: boolean;
  };
  currentTotalPrice: number;
  handlePaxChange: (type: "adults" | "children", delta: number) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSubmissionType: (type: "PAYMENT" | "RESERVATION") => void;
}

export default function OrderSummary({
  tourBaseData,
  formData,
  currentTotalPrice,
  handlePaxChange,
  handleChange,
  setSubmissionType,
}: OrderSummaryProps) {
  const { formatPrice } = useCurrency();

  const childPrice = tourBaseData.childPrice || tourBaseData.price;

  // ✅ optionName을 "+"로 split → [메인옵션, 추가옵션1, 추가옵션2, ...]
  const optionParts = tourBaseData.optionName
    ? tourBaseData.optionName
        .split(" + ")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const mainOption = optionParts[0] || "";
  const addOnOptions = optionParts.slice(1);

  return (
    <div className="bg-white p-6 rounded-[6px] shadow-lg border border-gray-200 sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
        Order Summary
      </h3>

      {/* 투어 이미지 + 제목 */}
      <div className="flex gap-4 mb-6">
        <div className="relative w-20 h-20 rounded-[6px] overflow-hidden flex-shrink-0 bg-gray-100">
          {tourBaseData.image ? (
            <Image
              src={tourBaseData.image}
              alt={tourBaseData.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2 mb-2">
            {tourBaseData.title}
          </h4>

          {/* ✅ 메인 옵션 */}
          {mainOption && (
            <span className="text-xs text-orange-600 font-medium bg-orange-50 inline-block px-1.5 py-0.5 rounded-[4px] mb-1">
              {mainOption}
            </span>
          )}

          {/* ✅ 추가 옵션들 */}
          {addOnOptions.length > 0 && (
            <div className="flex flex-col gap-1 mt-1">
              {addOnOptions.map((addOn, i) => (
                <span
                  key={i}
                  className="text-xs text-teal-700 font-medium bg-teal-50 inline-block px-1.5 py-0.5 rounded-[4px]"
                >
                  + {addOn}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 인원 선택 */}
      <div className="space-y-4 mb-6 pb-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-700">
            <span className="block font-medium">
              Adults <span className="text-red-500">*</span>
            </span>
            <span className="text-xs text-gray-400">
              {formatPrice(tourBaseData.price)} / person
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePaxChange("adults", -1)}
              className="w-7 h-7 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <Minus className="w-3 h-3 text-gray-600" />
            </button>
            <span className="w-6 text-center font-bold text-gray-900">
              {formData.adults}
            </span>
            <button
              type="button"
              onClick={() => handlePaxChange("adults", 1)}
              className="w-7 h-7 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <Plus className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-700">
            <span className="block font-medium">Children (Ages 3-9)</span>
            <span className="text-xs text-gray-400">
              {formatPrice(childPrice)} / person
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePaxChange("children", -1)}
              className="w-7 h-7 rounded-[4px] border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <Minus className="w-3 h-3 text-gray-600" />
            </button>
            <span className="w-6 text-center font-bold text-gray-900">
              {formData.children}
            </span>
            <button
              type="button"
              onClick={() => handlePaxChange("children", 1)}
              className="w-7 h-7 rounded-[6px] border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <Plus className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* 소계 */}
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex justify-between">
          <span>Subtotal (Adults)</span>
          <span className="font-medium">
            {formatPrice(tourBaseData.price * formData.adults)}
          </span>
        </div>
        {formData.children > 0 && (
          <div className="flex justify-between">
            <span>Subtotal (Children)</span>
            <span className="font-medium">
              {formatPrice(childPrice * formData.children)}
            </span>
          </div>
        )}
      </div>

      {/* 합계 */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-6">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-red-600">
          {formatPrice(currentTotalPrice)}
        </span>
      </div>

      {/* 약관 동의 */}
      <div className="flex items-start gap-3 mb-6 p-3 bg-gray-50 rounded-[6px]">
        <input
          type="checkbox"
          id="agreed"
          name="agreed"
          checked={formData.agreed}
          onChange={handleChange}
          className="mt-1 w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
        />
        <label
          htmlFor="agreed"
          className="text-xs text-gray-600 cursor-pointer leading-relaxed"
        >
          I have read and agree to the{" "}
          <Link
            href="/terms"
            className="underline hover:text-orange-600"
            target="_blank"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/cancellation-policy"
            className="underline hover:text-orange-600"
            target="_blank"
          >
            Cancellation Policy
          </Link>
          .
        </label>
      </div>

      {/* 버튼 */}
      <div className="flex flex-col gap-3">
        <button
          type="submit"
          onClick={() => setSubmissionType("PAYMENT")}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-[6px] transition-all shadow-md flex items-center justify-center gap-2"
        >
          Proceed to Payment
          <CreditCard className="w-5 h-5" />
        </button>

        <button
          type="submit"
          onClick={() => setSubmissionType("RESERVATION")}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3.5 rounded-[6px] transition-all shadow-md flex items-center justify-center gap-2"
        >
          Make a Reservation
          <CalendarCheck className="w-5 h-5" />
        </button>
      </div>

      <p className="text-[10px] text-gray-400 text-center mt-4">
        Secure SSL Encrypted Transaction
      </p>
    </div>
  );
}
