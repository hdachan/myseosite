import { Metadata } from "next";

// ✅ [제 1법칙: 보안] 어드민 구역은 구글 로봇의 접근을 완전히 차단합니다.
// 이 설정은 /admin 하위의 모든 페이지(예약관리, 리뷰관리 등)에 자동 적용됩니다.
export const metadata: Metadata = {
  title: "Admin Dashboard | Seoul City Tour",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="admin-container">
      {/* 나중에 어드민 전용 사이드바나 네비게이션을 만들고 싶다면 
         여기에 추가하면 모든 어드민 페이지에 공통 적용됩니다. 
      */}
      {children}
    </section>
  );
}
