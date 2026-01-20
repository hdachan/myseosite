"use client";

import { createClient } from "@/lib/supabase";
import { useRouter, notFound } from "next/navigation"; // ✅ notFound 추가
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

      // ✅ 수정됨: 로그인 안 된 유저는 404 페이지로 보냄 (관리자 페이지 존재 숨김)
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
      router.push("/login"); // 로그아웃 후에는 로그인 페이지로 이동
      router.refresh();
    }
  };

  // 4. 상태 변경 함수
  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("변경 실패: " + error.message);
    } else {
      fetchBookings(); // 화면 갱신
    }
  };

  // 5. 삭제 함수
  const handleDelete = async (id: string) => {
    if (!window.confirm("정말로 삭제하시겠습니까? (복구 불가)")) {
      return;
    }
    const { error } = await supabase.from("bookings").delete().eq("id", id);

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
            📋 예약 관리 ({bookings.length}건)
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
                <th className="p-4 border-b w-32">투어 날짜</th>
                <th className="p-4 border-b">고객 정보</th>
                <th className="p-4 border-b">상품 / 옵션</th>
                <th className="p-4 border-b w-20">인원</th>
                <th className="p-4 border-b w-28">총 금액</th>
                <th className="p-4 border-b w-44 text-center">상태 변경</th>
                <th className="p-4 border-b w-20 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 text-sm text-gray-700">
                    <div className="font-bold text-lg">
                      {formatDate(booking.tour_date)}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      접수: {formatDate(booking.created_at)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900">
                      {booking.customer_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {booking.customer_email}
                    </div>
                    <div className="text-xs text-gray-500">
                      {booking.customer_phone}
                    </div>
                    {booking.hotel_info && (
                      <div className="text-xs text-blue-600 mt-1 bg-blue-50 inline-block px-1 rounded">
                        🏨 {booking.hotel_info}
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <div className="font-medium text-gray-800">
                      {booking.tour_title}
                    </div>
                    {booking.option_name && (
                      <div className="text-xs text-gray-500 mt-1">
                        🏷️ {booking.option_name}
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <div>성인 {booking.adults}</div>
                    <div>아동 {booking.children}</div>
                  </td>
                  <td className="p-4 font-bold text-gray-900">
                    ${(booking.total_price || 0).toLocaleString()}
                  </td>

                  {/* 상태 변경 드롭다운 */}
                  <td className="p-4 text-center">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking.id, e.target.value)
                      }
                      className={`
                        border rounded px-2 py-1 text-sm font-bold cursor-pointer outline-none transition w-full
                        ${booking.status === "paid" ? "bg-green-100 text-green-700 border-green-300" : ""}
                        ${booking.status === "pending" ? "bg-yellow-100 text-yellow-700 border-yellow-300" : ""}
                        ${booking.status === "refunded" ? "bg-purple-100 text-purple-700 border-purple-300" : ""} 
                        ${booking.status === "cancelled" ? "bg-red-100 text-red-700 border-red-300" : ""}
                      `}
                    >
                      <option value="pending">⏳ 대기 (Pending)</option>
                      <option value="paid">✅ 완료 (Paid)</option>
                      <option value="refunded">↩️ 환불 (Refunded)</option>
                      <option value="cancelled">🚫 취소 (Cancelled)</option>
                    </select>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="text-gray-400 hover:text-red-600 transition p-2"
                      title="삭제하기"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && (
            <div className="p-12 text-center text-gray-400 bg-gray-50">
              <div className="text-4xl mb-2">📭</div>
              <p>접수된 예약 내역이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
