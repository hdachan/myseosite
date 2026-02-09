"use client";
import { useState } from "react";

interface FilterBarProps {
  onFilterChange: (f: any) => void;
  loading: boolean;
}

export default function AdminFilterBar({
  onFilterChange,
  loading,
}: FilterBarProps) {
  // 기본 필터 값 정의 (초기화 시 사용)
  const initialFilters = {
    search: "",
    status: "all",
    currency: "all",
    startDate: "",
    endDate: "",
  };

  const [localFilters, setLocalFilters] = useState(initialFilters);

  // 엔터키 입력 시 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onFilterChange(localFilters);
    }
  };

  // 필터 초기화 핸들러 (수정됨: 입력값만 초기화, 조회 X)
  const handleReset = () => {
    setLocalFilters(initialFilters);
    // onFilterChange(initialFilters); // <-- 이 줄을 삭제하여 자동 조회를 막았습니다.
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
        {/* 1. 검색어 입력 (2칸 차지) */}
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-gray-400 mb-1 block">
            검색 (고객명, 이메일, 주문번호)
          </label>
          <input
            type="text"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="검색어 입력 후 엔터..."
            value={localFilters.search}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, search: e.target.value })
            }
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* 2. 상태 필터 */}
        <div>
          <label className="text-xs font-bold text-gray-400 mb-1 block">
            상태 필터
          </label>
          <select
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer bg-white"
            value={localFilters.status}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, status: e.target.value })
            }
          >
            <option value="all">전체 상태</option>
            <option value="pending_reservation">📝 신규 예약</option>
            <option value="pending_payment">⏳ 결제 이탈</option>
            <option value="paid">✅ 확정/완료</option>
            <option value="cancelled">🚫 취소</option>
            <option value="fraud_suspected">🚨 위변조 의심</option>
          </select>
        </div>

        {/* 3. 시작 날짜 */}
        <div>
          <label className="text-xs font-bold text-gray-400 mb-1 block">
            시작 날짜
          </label>
          <input
            type="date"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer text-gray-600 focus:ring-2 focus:ring-blue-500"
            value={localFilters.startDate}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, startDate: e.target.value })
            }
          />
        </div>

        {/* 4. 종료 날짜 */}
        <div>
          <label className="text-xs font-bold text-gray-400 mb-1 block">
            종료 날짜
          </label>
          <input
            type="date"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer text-gray-600 focus:ring-2 focus:ring-blue-500"
            value={localFilters.endDate}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, endDate: e.target.value })
            }
          />
        </div>

        {/* 5. 조회 버튼 */}
        <button
          onClick={() => onFilterChange(localFilters)}
          disabled={loading}
          className="bg-gray-800 text-white font-bold py-2 rounded-lg text-sm hover:bg-blue-600 disabled:bg-gray-300 transition-colors shadow-lg shadow-gray-200"
        >
          {loading ? "조회중..." : "조회하기 🔍"}
        </button>

        {/* 6. 초기화 버튼 (값만 비움) */}
        <button
          onClick={handleReset}
          disabled={loading}
          className="bg-white border border-gray-200 text-gray-500 font-bold py-2 rounded-lg text-sm hover:bg-gray-50 hover:text-gray-700 disabled:bg-gray-50 transition-colors"
          title="입력값 초기화"
        >
          🔄 리셋
        </button>
      </div>
    </div>
  );
}
