"use client";

import { createClient } from "@/lib/supabase";
import { useRouter, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import AdminBookingTable from "@/components/admin/AdminBookingTable";
import AdminReviewTable from "@/components/admin/AdminReviewTable";

// ----------------------
// 1. 타입 정의 (Types)
// ----------------------
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

interface Review {
  id: number;
  created_at: string;
  tour_title: string;
  author_name: string;
  rating: number;
  content: string;
  is_approved: boolean;
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

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();

  // ----------------------
  // 2. 상태 관리 (State)
  // ----------------------
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);

  // ----------------------
  // 3. 데이터 불러오기 (Fetch)
  // ----------------------
  const fetchData = async () => {
    try {
      setLoading(true);

      const { data: bookingData, error: bError } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (bError) console.error("예약 불러오기 실패:", bError);
      else setBookings(bookingData || []);

      const { data: reviewData, error: rError } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (rError) console.error("리뷰 불러오기 실패:", rError);
      else setReviews(reviewData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
  }, [supabase]);

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

  const handleStatusChange = async (orderNumber: string, newStatus: string) => {
    const statusLabels: Record<string, string> = {
      pending: "대기/확인중",
      paid: "완료",
      cancelled: "취소",
      fraud_suspected: "위변조의심",
    };

    if (
      !confirm(`주문의 상태를 '${statusLabels[newStatus]}'로 변경하시겠습니까?`)
    )
      return;

    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("order_number", orderNumber);

    if (error) alert("변경 실패: " + error.message);
    else fetchData();
  };

  const handleDeleteBooking = async (orderNumber: string) => {
    if (!window.confirm("정말로 이 주문 전체를 삭제하시겠습니까?")) return;
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("order_number", orderNumber);
    if (error) alert("삭제 실패: " + error.message);
    else fetchData();
  };

  // ✅ [수정] 리뷰 요청 이메일 발송 + DB 업데이트 로직
  const handleSendEmail = async (booking: Booking) => {
    if (!confirm(`${booking.customer_name}님께 리뷰 요청 메일을 보낼까요?`))
      return;

    setSendingEmailId(booking.id);
    try {
      // 1. 이메일 발송 API 호출
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

      // 2. ✅ DB 업데이트: last_emailed_at 컬럼에 현재 시간 기록
      const { error: updateError } = await supabase
        .from("bookings")
        .update({ last_emailed_at: new Date().toISOString() })
        .eq("id", booking.id);

      if (updateError) throw updateError;

      alert("📧 이메일이 성공적으로 발송되었습니다!");
      fetchData(); // 화면 새로고침하여 '재요청' 상태 반영
    } catch (error: any) {
      console.error(error);
      alert("오류 발생: " + error.message);
    } finally {
      setSendingEmailId(null);
    }
  };

  const handleToggleReview = async (id: number, currentStatus: boolean) => {
    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: !currentStatus })
      .eq("id", id);
    if (error) alert("상태 변경 실패: " + error.message);
    else fetchData();
  };

  const handleDeleteReview = async (id: number) => {
    if (!confirm("정말 이 리뷰를 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) alert("삭제 실패: " + error.message);
    else fetchData();
  };

  // ----------------------
  // 5. 데이터 그룹화 로직 (Helper)
  // ----------------------
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

  if (loading)
    return (
      <div className="p-10 text-center text-lg font-bold">
        Data Loading... ⏳
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
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

      <AdminBookingTable
        groupedBookings={getGroupedBookings()}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteBooking}
        onSendEmail={handleSendEmail}
        sendingEmailId={sendingEmailId}
      />

      <AdminReviewTable
        reviews={reviews}
        onToggleStatus={handleToggleReview}
        onDelete={handleDeleteReview}
      />

      <button
        onClick={fetchData}
        className="fixed bottom-8 right-8 bg-[#4A7C7E] text-white p-4 rounded-full shadow-lg hover:bg-[#3D6566] transition-all active:scale-95 z-50"
        title="Refresh Data"
      >
        🔄
      </button>
    </div>
  );
}
