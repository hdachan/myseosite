"use client";

import React from "react";

interface StatsProps {
  stats: {
    today: number;
    newReservations: number; // 변수명 변경 (total, dropouts 제거)
  };
  loading: boolean;
}

export default function AdminStats({ stats, loading }: StatsProps) {
  // 숫자 포맷팅 (쉼표 추가)
  const formatNum = (num: number) => num.toLocaleString();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 animate-pulse">
        {[1, 2].map((i) => (
          <div key={i} className="bg-gray-200 h-24 rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {/* 1. 오늘 예약 (Today's Bookings) */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100 flex flex-col justify-between relative overflow-hidden group hover:border-blue-300 transition-all">
        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="text-5xl">📅</span>
        </div>
        <div>
          <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">
            Today's Bookings
          </p>
          <h3 className="text-2xl font-black text-gray-800">
            {formatNum(stats.today)}{" "}
            <span className="text-sm font-medium text-gray-400">건</span>
          </h3>
        </div>
        <div className="mt-2 text-[10px] text-gray-400">
          오늘(00:00 이후) 접수된 모든 예약입니다.
        </div>
      </div>

      {/* 2. 신규 예약 (New Reservations - 상담 신청) */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-green-100 flex flex-col justify-between relative overflow-hidden group hover:border-green-300 transition-all">
        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="text-5xl">📝</span>
        </div>
        <div>
          <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">
            New Reservations (Pending)
          </p>
          <h3 className="text-2xl font-black text-green-700">
            {formatNum(stats.newReservations)}{" "}
            <span className="text-sm font-medium text-gray-400">건</span>
          </h3>
        </div>
        <div className="mt-2 text-[10px] text-green-600/70 font-medium">
          확인이 필요한 신규 상담 신청 건수입니다.
        </div>
      </div>
    </div>
  );
}
