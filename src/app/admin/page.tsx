"use client";

import { createClient } from "@/lib/supabase";
import { useRouter, notFound } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import AdminBookingTable from "@/components/admin/AdminBookingTable";
import AdminReviewTable from "@/components/admin/AdminReviewTable";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import AdminStats from "@/components/admin/AdminStats";

// -------------------------------------------------------------------------
// ✅ [제 1법칙: SEO/보안] 어드민 하위의 모든 페이지를 검색 엔진에서 차단합니다.
// 실제 차단 설정(metadata)은 동등한 경로의 layout.tsx에서 처리되었습니다.
// -------------------------------------------------------------------------

const ITEMS_PER_PAGE = 30;

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();

  // --------------------------------------------
  // 1. 상태 관리 (State) - 제 2법칙: 데이터 무결성
  // --------------------------------------------
  const [bookings, setBookings] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);
  const [stats, setStats] = useState({ today: 0, newReservations: 0 });
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    currency: "all",
    startDate: "",
    endDate: "",
  });

  // --------------------------------------------
  // 2. 인증 체크 (보안 강화)
  // --------------------------------------------
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // 비인가 사용자는 '404' 페이지로 던져서 페이지의 존재 자체를 숨깁니다.
      if (!user) return notFound();
      setUserEmail(user.email || "");
    };
    checkAuth();
  }, [supabase]);

  // --------------------------------------------
  // 3. 데이터 로딩 함수 (Data Fetching)
  // --------------------------------------------
  const fetchStats = useCallback(async () => {
    try {
      setLoadingStats(true);
      const now = new Date();
      const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      ).toISOString();

      const todayPromise = supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .gte("created_at", todayStart);
      const newReservationsPromise = supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending")
        .eq("submission_type", "RESERVATION");

      const [todayRes, newReservationsRes] = await Promise.all([
        todayPromise,
        newReservationsPromise,
      ]);
      setStats({
        today: todayRes.count || 0,
        newReservations: newReservationsRes.count || 0,
      });
    } finally {
      setLoadingStats(false);
    }
  }, [supabase]);

  const fetchBookings = useCallback(async () => {
    try {
      setLoadingBookings(true);
      let query = supabase.from("bookings").select("*", { count: "exact" });

      if (filters.search) {
        query = query.or(
          `customer_name.ilike.%${filters.search}%,customer_email.ilike.%${filters.search}%,customer_phone.ilike.%${filters.search}%,order_number.ilike.%${filters.search}%`,
        );
      }

      if (filters.status !== "all") {
        if (filters.status === "pending_reservation") {
          query = query
            .eq("status", "pending")
            .eq("submission_type", "RESERVATION");
        } else if (filters.status === "pending_payment") {
          query = query
            .eq("status", "pending")
            .neq("submission_type", "RESERVATION");
        } else {
          query = query.eq("status", filters.status);
        }
      }

      if (filters.currency !== "all")
        query = query.eq("currency", filters.currency);
      if (filters.startDate) query = query.gte("tour_date", filters.startDate);
      if (filters.endDate) query = query.lte("tour_date", filters.endDate);

      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error, count } = await query
        .order("created_at", { ascending: false })
        .range(from, to);

      if (!error) {
        setBookings(data || []);
        setTotalCount(count || 0);
      }
    } finally {
      setLoadingBookings(false);
    }
  }, [currentPage, filters, supabase]);

  const fetchReviews = useCallback(async () => {
    try {
      setLoadingReviews(true);
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setReviews(data || []);
    } finally {
      setLoadingReviews(false);
    }
  }, [supabase]);

  // --------------------------------------------
  // 4. 초기 실행 및 갱신
  // --------------------------------------------
  useEffect(() => {
    fetchBookings();
    fetchStats();
  }, [fetchBookings, fetchStats]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // --------------------------------------------
  // 5. 핸들러 (Handlers) - 제 2법칙: 안정성
  // --------------------------------------------
  const handleStatusChange = async (orderNumber: string, newStatus: string) => {
    const statusLabels: Record<string, string> = {
      pending: "대기",
      paid: "완료",
      cancelled: "취소",
      fraud_suspected: "위변조의심",
    };
    if (
      !confirm(`주문 상태를 '${statusLabels[newStatus]}'로 변경하시겠습니까?`)
    )
      return;

    const previousBookings = [...bookings];
    setBookings((prev) =>
      prev.map((b) =>
        b.order_number === orderNumber ? { ...b, status: newStatus } : b,
      ),
    );

    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("order_number", orderNumber);
    if (error) {
      alert("상태 변경 실패: " + error.message);
      setBookings(previousBookings);
    } else {
      fetchStats();
      if (filters.status !== "all") fetchBookings();
    }
  };

  const handleDeleteBooking = async (orderNumber: string) => {
    if (!confirm("정말로 이 주문 전체를 삭제하시겠습니까?")) return;
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("order_number", orderNumber);
    if (!error) {
      fetchBookings();
      fetchStats();
    }
  };

  const handleSendEmail = async (booking: any) => {
    if (!confirm("리뷰 요청 메일을 보낼까요?")) return;
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
      if (res.ok) {
        const now = new Date().toISOString();
        setBookings((prev) =>
          prev.map((b) =>
            b.id === booking.id ? { ...b, last_emailed_at: now } : b,
          ),
        );
        await supabase
          .from("bookings")
          .update({ last_emailed_at: now })
          .eq("id", booking.id);
        alert("📧 발송 완료!");
      }
    } finally {
      setSendingEmailId(null);
    }
  };

  const getGroupedBookings = () => {
    const groups: Record<string, any> = {};
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
          totalUSDPrice: 0,
          items: [],
        };
      }
      groups[key].items.push(booking);
      groups[key].totalOrderPrice += booking.total_price;
      if (booking.usd_amount) groups[key].totalUSDPrice += booking.usd_amount;
    });
    return Object.values(groups);
  };

  const handleToggleReviewStatus = async (id: number, current: boolean) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_approved: !current } : r)),
    );
    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: !current })
      .eq("id", id);
    if (error) alert("상태 변경 실패: " + error.message);
  };

  const handleDeleteReview = async (id: number) => {
    if (!confirm("이 리뷰를 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (!error) setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* 헤더 */}
      <div className="max-w-7xl mx-auto bg-white px-6 py-4 rounded-xl shadow-sm flex justify-between items-center mb-6 border border-gray-100">
        <h1 className="text-2xl font-black text-gray-800 tracking-tight">
          Admin <span className="text-blue-600">Dashboard</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold bg-gray-100 px-3 py-1 rounded-full text-gray-500">
            {userEmail}
          </span>
          <button
            onClick={() =>
              supabase.auth.signOut().then(() => router.push("/login"))
            }
            className="text-sm font-bold text-red-500 hover:text-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <AdminStats stats={stats} loading={loadingStats} />
      <AdminFilterBar
        onFilterChange={(f: any) => {
          setFilters(f);
          setCurrentPage(1);
        }}
        loading={loadingBookings}
      />

      <AdminBookingTable
        groupedBookings={getGroupedBookings()}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteBooking}
        onSendEmail={handleSendEmail}
        sendingEmailId={sendingEmailId}
        currentPage={currentPage}
        totalCount={totalCount}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        loading={loadingBookings}
      />

      <AdminReviewTable
        reviews={reviews}
        onToggleStatus={handleToggleReviewStatus}
        onDelete={handleDeleteReview}
        loading={loadingReviews}
      />

      <button
        onClick={() => {
          fetchBookings();
          fetchReviews();
          fetchStats();
        }}
        className="fixed bottom-8 right-8 bg-blue-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:rotate-180 z-50"
      >
        🔄
      </button>
    </div>
  );
}
