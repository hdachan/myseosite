"use client";

import { createClient } from "@/lib/supabase";
import { useRouter, notFound } from "next/navigation";
import { useEffect, useState } from "react";

// ----------------------
// 1. 타입 정의 (Types)
// ----------------------

// 예약 데이터
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
}

// 리뷰 데이터 (✅ 신규 추가)
interface Review {
  id: number;
  created_at: string;
  tour_title: string;
  author_name: string;
  rating: number;
  content: string;
  is_approved: boolean; // 승인 여부
}

// 그룹화된 주문
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

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();

  // ----------------------
  // 2. 상태 관리 (State)
  // ----------------------
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]); // ✅ 리뷰 목록 상태
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);

  // ----------------------
  // 3. 데이터 불러오기 (Fetch)
  // ----------------------
  const fetchData = async () => {
    try {
      setLoading(true);

      // A. 예약 데이터 가져오기
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (bookingError) console.error("예약 불러오기 실패:", bookingError);
      else setBookings(bookingData || []);

      // B. 리뷰 데이터 가져오기 (✅ 신규 추가)
      const { data: reviewData, error: reviewError } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (reviewError) console.error("리뷰 불러오기 실패:", reviewError);
      else setReviews(reviewData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 초기화
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
      fetchData();
    };
    init();
  }, [supabase, router]);

  // 로그아웃
  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    }
  };

  // ----------------------
  // 4. 기능 핸들러 (Handlers)
  // ----------------------

  // [예약] 상태 변경
  const handleStatusChange = async (orderNumber: string, newStatus: string) => {
    if (!confirm(`이 주문(${orderNumber})의 상태를 변경하시겠습니까?`)) return;
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("order_number", orderNumber);

    if (error) alert("변경 실패: " + error.message);
    else fetchData();
  };

  // [예약] 삭제
  const handleDelete = async (orderNumber: string) => {
    if (!window.confirm("정말로 이 주문 전체를 삭제하시겠습니까?")) return;
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("order_number", orderNumber);
    if (error) alert("삭제 실패: " + error.message);
    else {
      alert("삭제되었습니다.");
      fetchData();
    }
  };

  // [예약] 리뷰 요청 이메일 발송
  const handleSendReviewEmail = async (booking: Booking) => {
    if (!confirm(`${booking.customer_name}님께 리뷰 요청 이메일을 보낼까요?`))
      return;
    setSendingEmailId(booking.id);
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: booking.customer_email,
          customerName: booking.customer_name,
          tourTitle: booking.tour_title,
          token: booking.review_token,
        }),
      });
      if (!res.ok) throw new Error("이메일 전송 실패");
      alert("📧 이메일이 성공적으로 발송되었습니다!");
    } catch (error) {
      console.error(error);
      alert("이메일 발송 중 오류가 발생했습니다.");
    } finally {
      setSendingEmailId(null);
    }
  };

  // ✅ [리뷰] 승인/숨김 토글
  const toggleReviewStatus = async (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    const actionName = newStatus ? "공개(승인)" : "숨김(비공개)";

    if (!confirm(`이 리뷰를 '${actionName}' 상태로 변경하시겠습니까?`)) return;

    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: newStatus })
      .eq("id", id);

    if (error) alert("상태 변경 실패: " + error.message);
    else fetchData(); // 목록 새로고침
  };

  // ✅ [리뷰] 삭제
  const deleteReview = async (id: number) => {
    if (!confirm("정말 이 리뷰를 삭제하시겠습니까? (복구 불가)")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) alert("삭제 실패: " + error.message);
    else fetchData();
  };

  // ----------------------
  // 5. 렌더링 헬퍼
  // ----------------------
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  const getGroupedBookings = () => {
    const groups: Record<string, GroupedOrder> = {};
    bookings.forEach((booking) => {
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
      groups[key].items.push(booking);
      groups[key].totalOrderPrice += booking.total_price;
    });
    return Object.values(groups);
  };

  const groupedBookings = getGroupedBookings();

  if (loading)
    return (
      <div className="p-10 text-center text-lg">데이터 불러오는 중... ⏳</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* 헤더 */}
      <div className="max-w-7xl mx-auto bg-white px-6 py-4 rounded-lg shadow-sm flex justify-between items-center mb-8">
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

      {/* ------------------------------------------------ */}
      {/* 섹션 1: 예약 관리 (기존 기능) */}
      {/* ------------------------------------------------ */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 mb-12">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold text-gray-700">
            📋 예약 관리 (Orders)
          </h2>
          <button
            onClick={fetchData}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            <span>🔄</span> 새로고침
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase font-semibold">
                <th className="p-4 border-b w-32">접수일</th>
                <th className="p-4 border-b w-48">고객 정보</th>
                <th className="p-4 border-b">주문 내역 / 리뷰 요청</th>
                <th className="p-4 border-b w-32">결제금액</th>
                <th className="p-4 border-b w-40 text-center">상태</th>
                <th className="p-4 border-b w-16 text-center">삭제</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {groupedBookings.map((group) => (
                <tr
                  key={group.orderNumber}
                  className="hover:bg-gray-50 transition align-top"
                >
                  <td className="p-4 text-sm text-gray-700">
                    <div className="font-bold">
                      {formatDate(group.createdAt)}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono bg-gray-100 p-1 rounded mt-1">
                      {group.orderNumber}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900">
                      {group.customerName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {group.customerEmail}
                    </div>
                    {group.hotelInfo && (
                      <div className="text-xs text-blue-600 mt-1">
                        🏨 {group.hotelInfo}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="space-y-3">
                      {group.items.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-2 rounded border border-gray-100 gap-2"
                        >
                          <div>
                            <div className="font-bold text-sm text-gray-800">
                              {idx + 1}. {item.tour_title}
                            </div>
                            <div className="text-xs text-gray-500">
                              📅 {item.tour_date}{" "}
                              {item.option_name && ` | ${item.option_name}`}
                            </div>
                          </div>
                          <div className="min-w-[80px] flex justify-end">
                            {item.is_reviewed ? (
                              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold border border-green-200">
                                작성완료 ✅
                              </span>
                            ) : (
                              <button
                                onClick={() => handleSendReviewEmail(item)}
                                disabled={sendingEmailId === item.id}
                                className={`text-[10px] px-2 py-1 rounded border transition flex items-center gap-1 ${
                                  sendingEmailId === item.id
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-white hover:bg-gray-50"
                                }`}
                              >
                                {sendingEmailId === item.id
                                  ? "발송중.."
                                  : "✉️ 리뷰요청"}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-red-600 text-lg">
                    ${group.totalOrderPrice.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <select
                      value={group.status}
                      onChange={(e) =>
                        handleStatusChange(group.orderNumber, e.target.value)
                      }
                      className={`border rounded px-2 py-1 text-sm font-bold w-full outline-none ${
                        group.status === "paid"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-white"
                      }`}
                    >
                      <option value="pending">⏳ 대기</option>
                      <option value="paid">✅ 완료</option>
                      <option value="cancelled">🚫 취소</option>
                    </select>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(group.orderNumber)}
                      className="text-gray-400 hover:text-red-600 transition"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
              {groupedBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-400">
                    예약 내역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* 섹션 2: ✅ 리뷰 관리 (신규 기능) */}
      {/* ------------------------------------------------ */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold text-gray-700">
            💬 리뷰 관리 (Reviews)
          </h2>
          <span className="text-sm text-gray-500">
            총 {reviews.length}개의 리뷰
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase font-semibold">
                <th className="p-4 border-b w-32">작성일</th>
                <th className="p-4 border-b w-40">작성자 / 평점</th>
                <th className="p-4 border-b">내용</th>
                <th className="p-4 border-b w-48">상품명</th>
                <th className="p-4 border-b w-32 text-center">
                  상태 (공개여부)
                </th>
                <th className="p-4 border-b w-20 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reviews.map((review) => (
                <tr
                  key={review.id}
                  className={`hover:bg-gray-50 transition ${!review.is_approved ? "bg-yellow-50/50" : ""}`}
                >
                  <td className="p-4 text-sm text-gray-600">
                    {formatDate(review.created_at)}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900">
                      {review.author_name}
                    </div>
                    <div className="flex text-orange-400 text-xs mt-1">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed max-w-md">
                    {review.content}
                  </td>
                  <td className="p-4 text-xs text-gray-500 font-medium">
                    {review.tour_title}
                  </td>

                  {/* ✅ 공개/비공개 토글 버튼 */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        toggleReviewStatus(review.id, review.is_approved)
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition shadow-sm ${
                        review.is_approved
                          ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200 animate-pulse"
                      }`}
                    >
                      {review.is_approved ? "공개중 (Live) 🟢" : "승인 대기 🟠"}
                    </button>
                  </td>

                  {/* 삭제 버튼 */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="text-gray-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-full"
                      title="리뷰 삭제"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-gray-400">
                    등록된 리뷰가 없습니다.
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
