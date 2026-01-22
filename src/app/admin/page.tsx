"use client";

import { createClient } from "@/lib/supabase";
import { useRouter, notFound } from "next/navigation";
import { useEffect, useState } from "react";

// 예약 데이터 타입 정의
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
  order_number: string; // ✅ 추가됨
}

// ✅ 그룹화된 주문 타입 정의 (화면 표시용)
interface GroupedOrder {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  hotelInfo: string;
  createdAt: string;
  status: string;
  totalOrderPrice: number;
  items: Booking[]; // 이 주문에 포함된 상품들 리스트
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const router = useRouter();
  const supabase = createClient();

  // 1. 데이터 불러오기
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false }); // 최신순

      if (error) {
        console.error("데이터 불러오기 실패:", error);
      } else {
        setBookings(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 2. 초기화 (권한 체크 및 데이터 로드)
  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        notFound();
        return;
      }

      setUserEmail(user.email || "");
      fetchBookings();
    };
    init();
  }, [supabase, router]);

  // 3. 로그아웃
  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    }
  };

  // ✅ 4. 상태 변경 (주문번호 기준 일괄 처리)
  const handleStatusChange = async (orderNumber: string, newStatus: string) => {
    if (!confirm(`이 주문(${orderNumber})의 상태를 변경하시겠습니까?`)) return;

    // 주문번호가 있으면 그 번호 전체 업데이트, 없으면(옛날 데이터) ID로 업데이트해야 하는데
    // 여기서는 orderNumber가 있다는 전제로 짭니다.
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("order_number", orderNumber);

    if (error) {
      alert("변경 실패: " + error.message);
    } else {
      fetchBookings(); // 화면 갱신
    }
  };

  // ✅ 5. 삭제 함수 (주문번호 기준 일괄 삭제)
  const handleDelete = async (orderNumber: string) => {
    if (
      !window.confirm("정말로 이 주문 전체를 삭제하시겠습니까? (복구 불가)")
    ) {
      return;
    }
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("order_number", orderNumber);

    if (error) {
      alert("삭제 실패: " + error.message);
    } else {
      alert("삭제되었습니다.");
      fetchBookings();
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  // ✅ [핵심 로직] 예약 데이터를 '주문번호' 기준으로 그룹화하기
  const getGroupedBookings = () => {
    const groups: Record<string, GroupedOrder> = {};

    bookings.forEach((booking) => {
      // 주문번호가 없으면(옛날 데이터) ID를 키로 사용
      const key = booking.order_number || booking.id;

      if (!groups[key]) {
        groups[key] = {
          orderNumber: key,
          customerName: booking.customer_name,
          customerEmail: booking.customer_email,
          customerPhone: booking.customer_phone,
          hotelInfo: booking.hotel_info,
          createdAt: booking.created_at,
          status: booking.status,
          totalOrderPrice: 0,
          items: [],
        };
      }

      // 아이템 추가 및 가격 누적
      groups[key].items.push(booking);
      groups[key].totalOrderPrice += booking.total_price;
    });

    // 객체를 배열로 변환해서 리턴
    return Object.values(groups);
  };

  const groupedBookings = getGroupedBookings();

  if (loading)
    return (
      <div className="p-10 text-center text-lg">장부 불러오는 중... ⏳</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* 헤더 */}
      <div className="max-w-7xl mx-auto bg-white px-6 py-4 rounded-lg shadow-sm flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard 🛠️</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:inline">
            {userEmail}
          </span>
          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-900 text-white text-sm font-bold px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 리스트 */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold text-gray-700">
            📋 예약 관리 (총 {groupedBookings.length}건의 주문)
          </h2>
          <button
            onClick={fetchBookings}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            <span>🔄</span> 새로고침
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase font-semibold">
                <th className="p-4 border-b w-32">접수일 / 번호</th>
                <th className="p-4 border-b w-48">고객 정보</th>
                <th className="p-4 border-b">주문 상품 목록 (Items)</th>
                <th className="p-4 border-b w-32">총 결제금액</th>
                <th className="p-4 border-b w-40 text-center">상태 관리</th>
                <th className="p-4 border-b w-16 text-center">삭제</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {groupedBookings.map((group) => (
                <tr
                  key={group.orderNumber}
                  className="hover:bg-gray-50 transition align-top"
                >
                  {/* 1. 접수일 & 주문번호 */}
                  <td className="p-4 text-sm text-gray-700">
                    <div className="font-bold mb-1">
                      {formatDate(group.createdAt)}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono bg-gray-100 p-1 rounded break-all">
                      {group.orderNumber}
                    </div>
                  </td>

                  {/* 2. 고객 정보 */}
                  <td className="p-4">
                    <div className="font-bold text-gray-900">
                      {group.customerName}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {group.customerEmail}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {group.customerPhone}
                    </div>
                    {group.hotelInfo && (
                      <div className="text-xs text-blue-600 mt-2 bg-blue-50 inline-block px-2 py-0.5 rounded border border-blue-100">
                        🏨 {group.hotelInfo}
                      </div>
                    )}
                  </td>

                  {/* 3. 상품 목록 (여기가 핵심!) */}
                  <td className="p-4">
                    <div className="space-y-3">
                      {group.items.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-2 rounded border border-gray-100"
                        >
                          <div>
                            <div className="font-bold text-sm text-gray-800">
                              {idx + 1}. {item.tour_title}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 flex gap-2">
                              <span className="bg-white px-1 rounded border border-gray-200">
                                📅 {item.tour_date}
                              </span>
                              {item.option_name && (
                                <span>🏷️ {item.option_name}</span>
                              )}
                            </div>
                          </div>
                          <div className="text-xs font-medium text-gray-600 mt-1 sm:mt-0 text-right">
                            <span>
                              성인 {item.adults}, 아동 {item.children}
                            </span>
                            <div className="font-bold text-gray-900">
                              ${item.total_price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* 4. 총 금액 */}
                  <td className="p-4">
                    <div className="text-lg font-bold text-red-600">
                      ${group.totalOrderPrice.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      Total ({group.items.length} items)
                    </div>
                  </td>

                  {/* 5. 상태 변경 (주문 전체) */}
                  <td className="p-4 text-center">
                    <select
                      value={group.status}
                      onChange={(e) =>
                        handleStatusChange(group.orderNumber, e.target.value)
                      }
                      className={`
                        border rounded px-2 py-1.5 text-sm font-bold cursor-pointer outline-none transition w-full shadow-sm
                        ${group.status === "paid" ? "bg-green-100 text-green-700 border-green-300" : ""}
                        ${group.status === "pending" ? "bg-yellow-100 text-yellow-700 border-yellow-300" : ""}
                        ${group.status === "refunded" ? "bg-purple-100 text-purple-700 border-purple-300" : ""} 
                        ${group.status === "cancelled" ? "bg-red-100 text-red-700 border-red-300" : ""}
                        ${group.status === "payment_failed" ? "bg-gray-800 text-white border-gray-900" : ""}
                      `}
                    >
                      <option value="pending">⏳ 대기 (Pending)</option>
                      <option value="paid">✅ 완료 (Paid)</option>
                      <option value="refunded">↩️ 환불 (Refunded)</option>
                      <option value="cancelled">🚫 취소 (Cancelled)</option>
                      <option value="payment_failed">⚠️ 실패 (Failed)</option>
                    </select>
                  </td>

                  {/* 6. 삭제 */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(group.orderNumber)}
                      className="text-gray-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-full"
                      title="주문 전체 삭제"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}

              {groupedBookings.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-12 text-center text-gray-400 bg-gray-50"
                  >
                    <div className="text-4xl mb-2">📭</div>
                    <p>접수된 예약 내역이 없습니다.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
