"use client";

import React from "react";

interface Booking {
  id: string;
  created_at: string;
  tour_title: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  tour_date: string;
  option_name: string;
  hotel_info: string;
  adults: number;
  children: number;
  total_price: number;
  usd_amount?: number;
  currency?: string;
  status: string;
  submission_type: string;
  order_number: string;
  review_token: string;
  is_reviewed: boolean;
  last_emailed_at?: string;
}

interface GroupedOrder {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  hotelInfo: string;
  createdAt: string;
  status: string;
  totalOrderPrice: number;
  totalUSDPrice: number;
  items: Booking[];
}

interface Props {
  groupedBookings: GroupedOrder[];
  onStatusChange: (orderNumber: string, newStatus: string) => void;
  onDelete: (orderNumber: string) => void;
  onSendEmail: (booking: Booking) => void;
  sendingEmailId: string | null;
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function AdminBookingTable({
  groupedBookings,
  onStatusChange,
  onDelete,
  onSendEmail,
  sendingEmailId,
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
  loading = false,
}: Props) {
  // 상태별 스타일 정의 (배경색/글자색 + 테두리)
  const getStatusStyle = (status: string, type: string) => {
    const base =
      "appearance-none w-full pl-3 pr-8 py-2 text-xs font-bold rounded-lg border focus:ring-2 focus:ring-offset-1 focus:outline-none transition-all cursor-pointer bg-no-repeat bg-[right_0.5rem_center] bg-[length:1em_1em]";

    if (status === "paid")
      return `${base} bg-green-50 text-green-700 border-green-200 focus:ring-green-200`;
    if (status === "cancelled")
      return `${base} bg-red-50 text-red-700 border-red-200 focus:ring-red-200`;
    if (status === "fraud_suspected")
      return `${base} bg-purple-50 text-purple-700 border-purple-200 focus:ring-purple-200`;
    if (type === "RESERVATION")
      return `${base} bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-200`;

    // pending (default)
    return `${base} bg-gray-50 text-gray-600 border-gray-200 focus:ring-gray-200`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg shadow-gray-100 overflow-hidden border border-gray-200 mb-12 font-sans">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
        <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-3">
          <span className="text-2xl">📋</span> 예약 관리
          <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium border border-gray-200">
            Total {totalCount}
          </span>
        </h2>
        {loading && (
          <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
            <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            <span className="font-semibold">데이터 동기화 중...</span>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-[11px] uppercase font-bold tracking-wider">
              <th className="py-4 pl-6 pr-4 w-[140px]">접수일 / 번호</th>
              <th className="py-4 px-4 w-[220px]">고객 정보</th>
              <th className="py-4 px-4 min-w-[300px]">주문 내역 / 상품 정보</th>
              <th className="py-4 px-4 w-[160px] text-right">결제 금액</th>
              <th className="py-4 px-4 w-[180px] text-center">진행 상태</th>
              <th className="py-4 pl-4 pr-6 w-[80px] text-center">삭제</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-32 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full opacity-80"></div>
                    <span className="text-gray-400 font-medium text-sm">
                      예약 내역을 불러오고 있습니다...
                    </span>
                  </div>
                </td>
              </tr>
            ) : groupedBookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <span className="text-4xl grayscale opacity-30">📭</span>
                    <span className="text-gray-400 font-medium">
                      표시할 예약 내역이 없습니다.
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              groupedBookings.map((group) => {
                const firstItem = group.items[0];
                const subType = firstItem?.submission_type || "PAYMENT";
                const orderCurrency = firstItem?.currency || "KRW";

                return (
                  <tr
                    key={group.orderNumber}
                    className="group hover:bg-blue-50/40 transition-colors duration-200"
                  >
                    {/* 1. 접수일 / 주문번호 */}
                    <td className="py-6 pl-6 pr-4 align-top">
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-900 font-bold text-sm">
                          {formatDate(group.createdAt)}
                        </span>
                        <div
                          className="text-[10px] font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200 break-all leading-tight select-all cursor-text"
                          title={group.orderNumber}
                        >
                          {group.orderNumber}
                        </div>
                      </div>
                    </td>

                    {/* 2. 고객 정보 */}
                    <td className="py-6 px-4 align-top">
                      <div className="flex flex-col gap-1.5">
                        <div className="font-bold text-gray-900 text-[15px]">
                          {group.customerName}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <span className="text-gray-400">📧</span>
                          <span
                            className="truncate max-w-[180px]"
                            title={group.customerEmail}
                          >
                            {group.customerEmail}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <span className="text-gray-400">📞</span>
                          <span>{group.customerPhone}</span>
                        </div>
                        {group.hotelInfo && (
                          <div className="mt-2 flex items-start gap-1.5 text-xs bg-blue-50 text-blue-700 px-2 py-1.5 rounded-md border border-blue-100">
                            <span>🏨</span>
                            <span className="font-medium leading-snug">
                              {group.hotelInfo}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* 3. 주문 내역 (카드형 UI) */}
                    <td className="py-6 px-4 align-top">
                      <div className="space-y-3">
                        {group.items.map((item, idx) => (
                          <div
                            key={item.id}
                            className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:border-blue-300 hover:shadow-md transition-all relative overflow-hidden"
                          >
                            {/* 왼쪽 컬러 바 (장식) */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-100 group-hover:bg-blue-400 transition-colors"></div>

                            <div className="pl-3 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-gray-400 mb-0.5">
                                  ITEM {idx + 1}
                                </div>
                                <h4 className="font-bold text-sm text-gray-800 leading-snug mb-1">
                                  {item.tour_title}
                                </h4>
                                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                  <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-medium border border-gray-200">
                                    📅 {item.tour_date}
                                  </span>
                                  <span className="text-gray-300">|</span>
                                  <span
                                    className="truncate max-w-[150px]"
                                    title={item.option_name}
                                  >
                                    {item.option_name}
                                  </span>
                                </div>
                                <div className="mt-2 text-[11px] font-medium text-gray-400">
                                  개별단가:{" "}
                                  {item.currency === "USD"
                                    ? `$${item.usd_amount?.toFixed(2)}`
                                    : `₩${item.total_price.toLocaleString()}`}
                                </div>
                              </div>

                              {/* 리뷰/발송 버튼 */}
                              <div className="flex-shrink-0 pt-1">
                                {item.is_reviewed ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold border border-green-200">
                                    ✅ 작성완료
                                  </span>
                                ) : (
                                  <div className="flex flex-col items-end gap-1">
                                    <button
                                      onClick={() => onSendEmail(item)}
                                      disabled={sendingEmailId === item.id}
                                      className={`
                                        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all
                                        ${
                                          sendingEmailId === item.id
                                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                            : item.last_emailed_at
                                              ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                                              : "bg-white text-gray-600 border-gray-300 hover:border-gray-800 hover:text-gray-900 hover:shadow-sm"
                                        }
                                      `}
                                    >
                                      {sendingEmailId === item.id ? (
                                        "발송중..."
                                      ) : (
                                        <>
                                          <span>✉️</span>
                                          {item.last_emailed_at
                                            ? "재요청"
                                            : "리뷰요청"}
                                        </>
                                      )}
                                    </button>
                                    {item.last_emailed_at && (
                                      <span className="text-[9px] text-gray-400">
                                        최근:{" "}
                                        {new Date(
                                          item.last_emailed_at,
                                        ).toLocaleDateString("ko-KR", {
                                          month: "numeric",
                                          day: "numeric",
                                        })}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* 4. 결제 금액 (우측 정렬) */}
                    <td className="py-6 px-4 text-right align-top">
                      {orderCurrency === "USD" ? (
                        <div className="flex flex-col items-end">
                          <span className="font-black text-blue-600 text-xl tracking-tight">
                            $ {group.totalUSDPrice.toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400 font-medium mt-0.5">
                            (₩ {group.totalOrderPrice.toLocaleString()})
                          </span>
                        </div>
                      ) : (
                        <span className="font-black text-rose-600 text-xl tracking-tight">
                          ₩ {group.totalOrderPrice.toLocaleString()}
                        </span>
                      )}
                    </td>

                    {/* 5. 상태 변경 */}
                    <td className="py-6 px-4 align-top">
                      <div className="relative">
                        <select
                          value={group.status}
                          onChange={(e) =>
                            onStatusChange(group.orderNumber, e.target.value)
                          }
                          className={getStatusStyle(group.status, subType)}
                        >
                          <option value="pending">
                            {subType === "RESERVATION"
                              ? "📝 신규 예약"
                              : "⏳ 결제이탈"}
                          </option>
                          <option value="paid">✅ 확정/완료</option>
                          <option value="cancelled">🚫 취소</option>
                          <option value="fraud_suspected">🚨 위변조의심</option>
                        </select>
                        {/* 커스텀 화살표 (Select 디자인 보정용) */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>

                    {/* 6. 삭제 버튼 */}
                    <td className="py-6 pl-4 pr-6 text-center align-top">
                      <button
                        onClick={() => onDelete(group.orderNumber)}
                        className="group/btn flex items-center justify-center w-8 h-8 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all mx-auto"
                        title="주문 전체 삭제"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 transition-transform group-hover/btn:scale-110"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 (하단 고정바 느낌 제거하고 박스 내부로 통합) */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-gray-500 font-medium">
          Showing{" "}
          <span className="text-gray-900 font-bold">
            {groupedBookings.length}
          </span>{" "}
          items (Page {currentPage} of {totalPages || 1})
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1 || loading}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (pageNum) =>
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 2 && pageNum <= currentPage + 2),
              )
              .map((pageNum, idx, arr) => (
                <React.Fragment key={pageNum}>
                  {idx > 0 && arr[idx - 1] !== pageNum - 1 && (
                    <span className="px-1 text-gray-400 text-xs self-center">
                      ...
                    </span>
                  )}
                  <button
                    onClick={() => onPageChange(pageNum)}
                    disabled={loading}
                    className={`
                      w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all shadow-sm
                      ${
                        currentPage === pageNum
                          ? "bg-gray-800 text-white border border-gray-800"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                </React.Fragment>
              ))}
          </div>

          <button
            disabled={currentPage === totalPages || totalPages === 0 || loading}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
