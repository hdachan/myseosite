"use client";

import React from "react";
import { User, Mail, Phone, MapPin } from "lucide-react";

interface MeetingPoint {
  name: string;
  description?: string;
}

interface BookingFormProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    tourDate?: string;
    hotelInfo: string;
    meetingPoint?: string;
  };
  // ✅ HTMLSelectElement 타입 추가
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  minDate?: string;
  meetingPoints?: MeetingPoint[];
}

export default function BookingForm({
  formData,
  handleChange,
  minDate,
  meetingPoints = [],
}: BookingFormProps) {
  const inputStyle = `
    w-full border p-3 rounded-[6px] outline-none transition-all
    bg-white text-gray-900 border-gray-300 
    focus:ring-2 focus:ring-orange-500 focus:border-orange-500
    dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 
    dark:focus:ring-orange-400 dark:placeholder-gray-500
  `;

  const labelStyle =
    "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5";

  const sectionStyle =
    "bg-white dark:bg-gray-900 p-5 md:p-6 rounded-[8px] shadow-sm border border-gray-200 dark:border-gray-800";

  const hasMeetingPoints = meetingPoints && meetingPoints.length > 0;

  return (
    <div className="space-y-6">
      {/* 1. Traveler Information */}
      <div className={sectionStyle}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 border-b dark:border-gray-800 pb-3 flex items-center gap-2">
          <User className="w-5 h-5 text-orange-500" />
          1. Traveler Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label htmlFor="fullName" className={labelStyle}>
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Passport Name (e.g. Gildong Hong)"
            />
          </div>

          <div>
            <label htmlFor="email" className={labelStyle}>
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                id="email"
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
            <label htmlFor="phone" className={labelStyle}>
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                id="phone"
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

      {/* 2. Tour Details & Pickup */}
      <div className={sectionStyle}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 border-b dark:border-gray-800 pb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-orange-500" />
          2.{" "}
          {formData.tourDate !== undefined
            ? "Tour Details & Pickup"
            : "Pickup Location"}
        </h2>

        <div className="space-y-5">
          {/* 날짜 (booking 페이지에서만 표시) */}
          {formData.tourDate !== undefined && (
            <div>
              <label htmlFor="tourDate" className={labelStyle}>
                Tour Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="tourDate"
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
          )}

          {/* ✅ 미팅 포인트 선택 */}
          {hasMeetingPoints && (
            <div>
              <label htmlFor="meetingPoint" className={labelStyle}>
                Meeting Point{" "}
                <span className="text-gray-400 dark:text-gray-500 font-normal ml-1 text-xs uppercase tracking-wide">
                  (Optional)
                </span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                <select
                  id="meetingPoint"
                  name="meetingPoint"
                  value={formData.meetingPoint || ""}
                  onChange={handleChange}
                  className={`${inputStyle} pl-11 cursor-pointer`}
                >
                  <option value="">-- Select meeting point --</option>
                  {meetingPoints.map((mp, i) => (
                    <option key={i} value={mp.name}>
                      {mp.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* 선택된 미팅 포인트 설명 */}
              {formData.meetingPoint && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                  {meetingPoints.find((mp) => mp.name === formData.meetingPoint)
                    ?.description || ""}
                </p>
              )}
            </div>
          )}

          {/* 호텔 정보 */}
          <div>
            <label htmlFor="hotelInfo" className={labelStyle}>
              Hotel Information (Name & Address){" "}
              <span className="text-gray-400 dark:text-gray-500 font-normal ml-1 text-xs uppercase tracking-wide">
                (Optional)
              </span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                id="hotelInfo"
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
