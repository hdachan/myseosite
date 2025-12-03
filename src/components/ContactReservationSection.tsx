// src/components/ContactReservationSection.tsx
import Image from "next/image";
import Link from "next/link";

export default function ContactReservationSection() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* 타이틀 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            지금 바로 문의하세요
            <span className="block text-2xl md:text-3xl font-medium text-blue-600 mt-3">
              24시간 실시간 상담 · 당일 예약도 OK!
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            카카오톡, 전화, 이메일 어떤 것으로든 편하게 문의 주세요. 전문
            상담원이 가장 빠르고 정확하게 안내드립니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* 왼쪽: 예약정보 카드 (실제 이미지 느낌 그대로) */}
          <div className="flex justify-center md:justify-end">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-96">
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 text-center font-bold text-xl">
                24 HOURS RESERVATION
              </div>

              <div className="p-8 space-y-4 text-gray-800">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <div className="font-semibold">TEL :</div>
                    <div className="text-lg">02-774-3345</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">📠</span>
                  <div>
                    <div className="font-semibold">FAX :</div>
                    <div className="text-lg">02-774-8223</div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex gap-3">
                    <span className="font-semibold whitespace-nowrap">
                      ENGLISH RESERVATION
                    </span>
                    <span className="text-lg">010-4082-7451</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold whitespace-nowrap">
                      CHINESE RESERVATION
                    </span>
                    <span className="text-lg">010-5617-9039</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold whitespace-nowrap">
                      JAPANESE RESERVATION
                    </span>
                    <span className="text-lg">010-4082-7451</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="font-semibold mb-2">OFFICE</div>
                  <div className="text-lg">82-2-774-8222</div>
                  <div className="text-lg">82-2-720-0335</div>
                </div>

                <div className="border-t pt-4">
                  <div className="font-semibold mb-2">Mail</div>
                  <a
                    href="mailto:mail@seoulcitytour.net"
                    className="text-blue-600 underline"
                  >
                    mail@seoulcitytour.net
                  </a>
                </div>

                <div className="bg-blue-900 text-white text-center py-4 mt-6 rounded-b-2xl font-bold text-xl">
                  <div>신한은행 예금주:(주)서울시티투어</div>
                  <div className="text-2xl mt-1">100 - 023 - 904290</div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 실시간 상담 버튼들 */}
          <div className="space-y-6">
            {/* 카카오톡 상담 */}
            <Link
              href="https://pf.kakao.com/_HxmxlExb/chat" // 실제 카카오 채널 링크로 변경
              target="_blank"
              className="block group"
            >
              <div className="bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 rounded-2xl p-8 text-center shadow-lg transform hover:scale-105">
                <div className="text-6xl mb-4">💬</div>
                <div className="text-2xl font-bold text-gray-800">
                  카카오톡 상담
                </div>
                <p className="text-gray-700 mt-2">
                  채팅으로 바로 문의 가능 · 24시간 대기
                </p>
              </div>
            </Link>

            {/* 전화 상담 */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="tel:027743345"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-8 text-center shadow-lg transition-all"
              >
                <div className="text-5xl mb-3">☎</div>
                <div className="font-bold text-xl">국내/한국어</div>
                <div className="text-3xl mt-2">02-774-3345</div>
              </a>

              <a
                href="tel:+82-10-4082-7451"
                className="bg-green-600 hover:bg-green-700 text-white rounded-2xl p-8 text-center shadow-lg transition-all"
              >
                <div className="text-5xl mb-3">🌐</div>
                <div className="font-bold text-xl">영어/일본어</div>
                <div className="text-2xl mt-2">010-4082-7451</div>
              </a>
            </div>

            {/* 빠른 예약 문의 버튼 */}
            <div className="text-center mt-10">
              <Link
                href="/reservation"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-2xl px-12 py-6 rounded-full shadow-xl transition-all transform hover:scale-105"
              >
                🔒 지금 바로 예약하기 (최저가 보장)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
