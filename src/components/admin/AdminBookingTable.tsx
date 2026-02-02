"use client";

import React from "react";

// ✅ 인터페이스에 last_emailed_at 추가 (DB 컬럼 대응)
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
  status: string;
  submission_type: string;
  order_number: string;
  review_token: string;
  is_reviewed: boolean;
  last_emailed_at?: string; // ✅ 추가: 마지막 이메일 발송 시간
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
  items: Booking[];
}

interface Props {
  groupedBookings: GroupedOrder[];
  onStatusChange: (orderNumber: string, newStatus: string) => void;
  onDelete: (orderNumber: string) => void;
  onSendEmail: (booking: Booking) => void;
  sendingEmailId: string | null;
}

export default function AdminBookingTable({
  groupedBookings,
  onStatusChange,
  onDelete,
  onSendEmail,
  sendingEmailId,
}: Props) {
  // ✅ 상태별 스타일 결정 로직 (기존 유지)
  const getStatusStyle = (status: string, type: string) => {
    if (status === "paid") return "bg-green-50 text-green-700 border-green-200";
    if (status === "cancelled") return "bg-red-50 text-red-700 border-red-200";
    if (status === "fraud_suspected")
      return "bg-purple-50 text-purple-700 border-purple-200";

    if (type === "RESERVATION")
      return "bg-blue-50 text-blue-700 border-blue-200";
    return "bg-gray-50 text-gray-600 border-gray-200";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mb-12 font-sans">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h2 className="text-lg font-bold text-gray-700">
          📋 예약 관리 (Orders)
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-xs uppercase font-bold tracking-tight">
              <th className="p-4 border-b w-32">접수일 / 번호</th>
              <th className="p-4 border-b w-48">고객 정보</th>
              <th className="p-4 border-b">주문 내역 / 리뷰 요청</th>
              <th className="p-4 border-b w-32">결제금액</th>
              <th className="p-4 border-b w-44 text-center">상태 변경</th>
              <th className="p-4 border-b w-16 text-center">삭제</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {groupedBookings.map((group) => {
              const subType = group.items[0]?.submission_type || "PAYMENT";

              return (
                <tr
                  key={group.orderNumber}
                  className="hover:bg-gray-50 transition align-top"
                >
                  <td className="p-4 text-xs text-gray-700">
                    <div className="font-bold">
                      {formatDate(group.createdAt)}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono bg-gray-100 p-1 rounded mt-1 break-all">
                      {group.orderNumber}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-gray-900 text-sm">
                      {group.customerName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {group.customerEmail}
                    </div>
                    <div className="text-xs text-gray-500">
                      {group.customerPhone}
                    </div>
                    {group.hotelInfo && (
                      <div className="text-[11px] text-blue-600 mt-1 italic font-medium">
                        🏨 {group.hotelInfo}
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="space-y-3">
                      {group.items.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-2.5 rounded border border-gray-200 gap-2"
                        >
                          <div>
                            <div className="font-bold text-sm text-gray-800">
                              {idx + 1}. {item.tour_title}
                            </div>
                            <div className="text-xs text-gray-500">
                              📅 {item.tour_date} | {item.option_name}
                            </div>
                            <div className="text-[9px] mt-1 font-bold text-gray-400 uppercase tracking-tighter">
                              Type: {item.submission_type}
                            </div>
                          </div>

                          {/* ✅ 리뷰 요청 섹션: 버튼 문구 및 날짜 표시 로직 추가 */}
                          <div className="min-w-[100px] flex flex-col items-end gap-1">
                            {item.is_reviewed ? (
                              <span className="text-[10px] bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-bold border border-green-200">
                                작성완료 ✅
                              </span>
                            ) : (
                              <>
                                <button
                                  onClick={() => onSendEmail(item)}
                                  disabled={sendingEmailId === item.id}
                                  className={`text-[10px] px-2.5 py-1.5 rounded border font-bold transition-all shadow-sm ${
                                    sendingEmailId === item.id
                                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                      : item.last_emailed_at
                                        ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100" // ✅ 보낸 적 있으면 파란색
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-[#F8F1E7] hover:border-[#4A7C7E] active:scale-95"
                                  }`}
                                >
                                  {sendingEmailId === item.id
                                    ? "발송중..."
                                    : item.last_emailed_at
                                      ? "🔄 재요청" // ✅ 보낸 적 있으면 문구 변경
                                      : "✉️ 리뷰요청"}
                                </button>

                                {/* ✅ 마지막 발송 날짜 힌트 표시 */}
                                {item.last_emailed_at && (
                                  <span className="text-[9px] text-blue-400 font-medium">
                                    최근:{" "}
                                    {new Date(
                                      item.last_emailed_at,
                                    ).toLocaleDateString("ko-KR", {
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="p-4 font-bold text-red-600 text-lg">
                    ₩{group.totalOrderPrice.toLocaleString()}
                  </td>

                  <td className="p-4 text-center">
                    <select
                      value={group.status}
                      onChange={(e) =>
                        onStatusChange(group.orderNumber, e.target.value)
                      }
                      className={`border rounded px-2.5 py-2 text-xs font-bold w-full outline-none cursor-pointer transition-all shadow-sm ${getStatusStyle(group.status, subType)}`}
                    >
                      <option value="pending">
                        {subType === "RESERVATION"
                          ? "📝 신규 예약(대기)"
                          : "⏳ 결제중 이탈"}
                      </option>
                      <option value="paid" className="bg-white text-gray-900">
                        ✅ 확정/완료
                      </option>
                      <option
                        value="cancelled"
                        className="bg-white text-gray-900"
                      >
                        🚫 취소
                      </option>
                      <option
                        value="fraud_suspected"
                        className="bg-white text-gray-900"
                      >
                        🚨 위변조의심
                      </option>
                    </select>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => onDelete(group.orderNumber)}
                      className="text-gray-300 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all active:scale-90"
                      title="주문 삭제"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
            {groupedBookings.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-20 text-center text-gray-400 font-medium"
                >
                  예약된 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
