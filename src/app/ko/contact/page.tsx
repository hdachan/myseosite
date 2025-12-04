// src/app/contact/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Banknote,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "문의하기 | DMZ 관광",
  description:
    "24시간 실시간 상담 가능. 카카오톡, 전화, 이메일로 언제든 문의 주세요.",
};

export default function ContactPage() {
  return (
    <>
      {/* 럭셔리 히어로 섹션 */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-32 md:py-40 overflow-hidden">
        {/* 애니메이션 배경 효과 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

        {/* 그리드 패턴 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
            <Sparkles size={20} className="text-amber-400" />
            <span className="text-sm font-medium tracking-wider">
              PREMIUM SUPPORT
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
              언제든 편하게
            </span>
            <br />
            <span className="text-white">문의 주세요</span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            24시간 365일 전문 상담원이
            <span className="text-amber-400 font-semibold"> 최상의 서비스</span>
            로 안내드립니다
          </p>

          {/* 장식 라인 */}
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
        </div>
      </section>

      {/* 프리미엄 연락처 카드 */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
            {/* 카카오톡 상담 - 프리미엄 스타일 */}
            <div className="group relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl shadow-2xl p-8 md:p-12 text-center overflow-hidden transition-all duration-500 hover:shadow-amber-200/50 hover:-translate-y-3">
              {/* 배경 장식 */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl group-hover:bg-yellow-400/20 transition-all duration-500"></div>

              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <MessageCircle
                    size={48}
                    className="text-white"
                    strokeWidth={2.5}
                  />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                  카카오톡 상담
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  가장 빠른 실시간 상담
                </p>

                <Link
                  href="https://pf.kakao.com/_HxmxlExb/chat"
                  target="_blank"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold text-lg px-10 py-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl group-hover:gap-5"
                >
                  상담 시작하기
                  <ChevronRight
                    size={24}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>

            {/* 전화 상담 - 프리미엄 다크 스타일 */}
            <div className="group relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white rounded-3xl shadow-2xl p-8 md:p-12 text-center overflow-hidden transition-all duration-500 hover:shadow-blue-500/30 hover:-translate-y-3">
              {/* 빛나는 효과 */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <Phone size={48} className="text-white" strokeWidth={2.5} />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-8">
                  전화 상담
                </h3>

                <div className="space-y-7">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="text-sm text-blue-200 mb-2">
                      국내 · 한국어
                    </div>
                    <a
                      href="tel:027743345"
                      className="text-3xl md:text-4xl font-bold block tracking-tight"
                    >
                      02-774-3345
                    </a>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="text-sm text-blue-200 mb-2">
                      영어 · 일본어
                    </div>
                    <a
                      href="tel:+821040827451"
                      className="text-2xl md:text-3xl font-bold block tracking-tight"
                    >
                      010-4082-7451
                    </a>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="text-sm text-blue-200 mb-2">중국어</div>
                    <a
                      href="tel:+821056179039"
                      className="text-2xl md:text-3xl font-bold block tracking-tight"
                    >
                      010-5617-9039
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 계좌 & 이메일 - 우아한 화이트 스타일 */}
            <div className="group relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden transition-all duration-500 hover:shadow-gray-300/50 hover:-translate-y-3">
              <div className="absolute top-0 left-0 w-40 h-40 bg-red-50 rounded-full blur-3xl group-hover:bg-red-100 transition-all duration-500"></div>

              <div className="relative space-y-10">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Banknote
                      size={40}
                      className="text-white"
                      strokeWidth={2.5}
                    />
                  </div>

                  <h4 className="font-bold text-2xl mb-6 text-gray-900">
                    입금 계좌안내
                  </h4>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">신한은행</p>
                    <p className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                      100-023-904290
                    </p>
                    <p className="text-sm text-gray-600">
                      예금주: (주)서울씨티투어
                    </p>
                  </div>
                </div>

                <div className="text-center pt-8 border-t border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Mail size={32} className="text-white" strokeWidth={2.5} />
                  </div>

                  <h4 className="font-bold text-xl mb-4 text-gray-900">
                    이메일 문의
                  </h4>
                  <a
                    href="mailto:mail@seoulcitytour.net"
                    className="inline-flex items-center gap-2 text-lg text-blue-600 font-semibold hover:text-blue-700 hover:gap-3 transition-all"
                  >
                    mail@seoulcitytour.net
                    <ChevronRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 사무실 정보 - 우아한 레이아웃 */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              오시는 길
            </h2>
            <p className="text-gray-600 text-lg">언제든 방문해 주세요</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div className="group bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <MapPin className="text-white" size={32} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    사무실 주소
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    서울특별시 종로구 인사동 194-4
                    <br />
                    하나로빌딩 507호
                    <br />
                    <span className="font-semibold text-gray-900">
                      (주)서울씨티투어
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Clock className="text-white" size={32} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">상담 운영시간</h3>
                  <div className="space-y-2 text-lg">
                    <p className="text-blue-50">평일 09:00 ~ 18:00</p>
                    <p className="text-blue-50">토요일 09:00 ~ 15:00</p>
                    <div className="mt-4 pt-4 border-t border-white/30">
                      <p className="text-amber-300 font-bold flex items-center gap-2">
                        <Sparkles size={20} />
                        카카오톡 24시간 상시 대기
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            지금 바로 상담 받아보세요
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            전문 상담원이 최적의 여행 일정을 제안해 드립니다
          </p>
          <Link
            href="https://pf.kakao.com/_HxmxlExb/chat"
            target="_blank"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-bold text-lg px-12 py-6 rounded-full transition-all duration-300 shadow-2xl hover:shadow-amber-500/50 hover:scale-105"
          >
            <MessageCircle size={24} />
            카카오톡 상담 시작
            <ChevronRight size={24} />
          </Link>
        </div>
      </section>
    </>
  );
}
