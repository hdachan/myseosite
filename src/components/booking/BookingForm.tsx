"use client";

import React from "react";
import { User, Mail, Phone, Calendar, MapPin } from "lucide-react";

interface BookingFormProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    tourDate: string;
    hotelInfo: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minDate?: string;
}

export default function BookingForm({
  formData,
  handleChange,
  minDate,
}: BookingFormProps) {
  // 공통 입력창 스타일 (다크모드 대응 포함)
  const inputStyle = `
    w-full border p-3 rounded-[6px] outline-none transition-all
    bg-white text-gray-900 border-gray-300 
    focus:ring-2 focus:ring-orange-500 focus:border-orange-500
    dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 
    dark:focus:ring-orange-400 dark:placeholder-gray-500
  `;

  // 공통 라벨 스타일
  const labelStyle =
    "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";

  // 섹션 컨테이너 스타일
  const sectionStyle =
    "bg-white dark:bg-gray-900 p-5 md:p-6 rounded-[8px] shadow-sm border border-gray-200 dark:border-gray-800";

  return (
    <div className="space-y-6">
      {/* 1. 여행자 정보 */}
      <div className={sectionStyle}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 border-b dark:border-gray-800 pb-3 flex items-center gap-2">
          <User className="w-5 h-5 text-orange-500" />
          1. Traveler Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelStyle}>
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Passport Name (e.g. Gildong Hong)"
            />
          </div>

          <div>
            <label className={labelStyle}>
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputStyle} pl-11`}
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`${inputStyle} pl-11`}
                placeholder="+82 10-1234-5678"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. 투어 상세 (날짜 및 픽업) */}
      <div className={sectionStyle}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 border-b dark:border-gray-800 pb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-orange-500" />
          2. Tour Details & Pickup
        </h2>

        <div className="space-y-5">
          <div>
            <label className={labelStyle}>
              Tour Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                required
                type="date"
                name="tourDate"
                min={minDate}
                value={formData.tourDate}
                onChange={handleChange}
                className={`${inputStyle} cursor-pointer appearance-none`}
              />
            </div>
          </div>

          <div>
            <label className={labelStyle}>
              Hotel Information (Name & Address){" "}
              <span className="text-gray-400 dark:text-gray-500 font-normal ml-1 text-xs uppercase tracking-wide">
                (Optional)
              </span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                name="hotelInfo"
                value={formData.hotelInfo}
                onChange={handleChange}
                className={`${inputStyle} pl-11`}
                placeholder="e.g. Lotte Hotel Seoul, Room 1204"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              If you haven&apos;t booked a hotel yet, you can let us know later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
