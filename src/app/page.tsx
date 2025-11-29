// app/page.tsx
// app/page.tsx
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  // 기본 SEO
  title: "서울 출발 DMZ 투어 당일치기 | 최저가 예약, 제3터널+도라전망대",
  description:
    "서울 출발 DMZ 투어 전문. 제3터널, 도라전망대, 도라산역, 통일촌 방문. 전문 한국어 가이드 동행, 점심 포함, 매일 출발 보장. 2025년 최신 가격 및 실시간 예약 가능.",

  // 2025년 필수 추가 항목들
  robots: {
    index: true, // 이 페이지 구글에 노출 O
    follow: true, // 내부 링크도 따라가게 O
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "https://yourdomain.com", // ← 실제 도메인으로 변경 필수!
  },

  verification: {
    google: "여기에_구글서치콘솔_인증코드_넣기", // 예: "abc123xyz..."
    // naver: "네이버서치어드바이저코드",           // 있으면 추가
    // other: { bing: "빙코드" },
  },

  // Open Graph (카톡, 페이스북 등)
  openGraph: {
    title: "서울 DMZ 투어 당일치기 | 제3터널+도라전망대 포함",
    description: "하루 만에 보는 분단의 현장. 서울 호텔 픽업+점심 포함",
    images: [
      {
        url: "/og-dmz.jpg",
        width: 1200,
        height: 630,
        alt: "DMZ 제3터널 입구와 도라전망대 전경",
      },
    ],
    url: "https://yourdomain.com",
    type: "website",
    locale: "ko_KR",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "서울 DMZ 투어 당일치기",
    description: "제3터널 들어가고 북녘 땅 직접 보는 바로 그 투어!",
    images: ["/og-dmz.jpg"],
    creator: "@your_twitter_id",
  },
};

export default function Home() {
  return (
    <>
      <Hero />

      <article className="max-w-4xl mx-auto py-16 px-4">
        {/* 가장 중요한 H1 */}
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
          서울 출발 DMZ 투어 당일치기
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            왜 DMZ 투어를 선택해야 하나요?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            한국전쟁 이후 70년간 사람의 발길이 닿지 않아 세계에서 가장 잘 보존된
            비무장지대(DMZ). 제3침투터널을 직접 걸어보고, 도라전망대에서
            망원경으로 북한 마을과 개성공단을 바라보며, 분단의 현실을 생생하게
            느낄 수 있는 유일한 기회입니다. 서울 호텔 픽업/드롭, 점심 식사,
            베테랑 한국어 가이드까지 모두 포함된 완벽 코스!
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">방문지 소개</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <strong className="mr-2">• 제3침투터널</strong>: 북한이 남침용으로
              팠던 터널 직접 탐험
            </li>
            <li className="flex items-start">
              <strong className="mr-2">• 도라전망대</strong>: 망원경으로 북한 땅
              육안 확인
            </li>
            <li className="flex items-start">
              <strong className="mr-2">• 도라산역</strong>: “서울-평양” 행
              열차표 사진 명소
            </li>
            <li className="flex items-start">
              <strong className="mr-2">• 통일촌</strong>: 북한 주민이 보이는
              마을
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">투어 일정 (약 8시간)</h2>
          <p className="text-gray-700">
            07:00~07:30 서울 시내 호텔 픽업 → 임진각 공원 → 제3터널(모노레일) →
            도라전망대 → 점심(불고기 or 비빔밥) → 도라산역 → 통일촌 →
            16:30~17:00 서울 복귀
          </p>
        </section>
      </article>
    </>
  );
}
