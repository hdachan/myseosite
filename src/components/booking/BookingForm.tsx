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
  // ✅ [추가] 날짜 제한을 위한 minDate
  minDate?: string;
}

export default function BookingForm({
  formData,
  handleChange,
  minDate,
}: BookingFormProps) {
  return (
    <div className="space-y-6">
      {/* 1. 여행자 정보 */}
      <div className="bg-white p-6 rounded-[6px] shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
          <User className="w-5 h-5 text-orange-500" />
          1. Traveler Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2.5 rounded-[6px] focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Passport Name (e.g. Gildong Hong)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 pl-10 rounded-[6px] focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 pl-10 rounded-[6px] focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="+82 10-1234-5678"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. 투어 상세 (날짜 및 픽업) */}
      <div className="bg-white p-6 rounded-[6px] shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-orange-500" />
          2. Tour Details & Pickup
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full border border-gray-300 p-2.5 rounded-[6px] focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hotel Information (Name & Address){" "}
              <span className="text-gray-400 font-normal ml-1 text-xs uppercase tracking-wide">
                (Optional)
              </span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                name="hotelInfo"
                value={formData.hotelInfo}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 pl-10 rounded-[6px] focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="e.g. Lotte Hotel Seoul, Room 1204"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              If you haven't booked a hotel yet, you can let us know later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
