// src/app/private/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Private 투어 | DMZ 관광",
  description:
    "서울 출발 프라이빗 DMZ 투어 및 전국 맞춤 투어. 전용 차량 + 전문 가이드",
};

export default function PrivateTour() {
  return (
    <>
      {/* 히어로 섹션 */}
      <section className="relative h-[500px] flex items-center justify-center bg-black/50">
        <Image
          src="/images/private-hero.jpg" // 실제 사진 넣어주세요
          alt="프라이빗 DMZ 투어"
          fill
          className="object-cover"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Private VIP 투어
          </h1>
          <p className="text-xl md:text-2xl">
            나만의 일정, 나만의 가이드, 나만의 차량
          </p>
        </div>
      </section>

      {/* 프라이빗 투어 소개 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            원하는 곳 어디든, 원하는 시간에
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            DMZ뿐만 아니라 경주, 부산, 제주, 강원도 등 대한민국 전 지역 프라이빗
            투어 가능
            <br />
            가족, 커플, 친구, VIP 손님과 함께 편안하고 럭셔리한 여행을 즐기세요.
          </p>
        </div>
      </section>

      {/* 요금표 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Private 투어 요금 안내
          </h2>

          {/* 가이드 요금 */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">가이드 서비스 요금</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-center">
                <thead>
                  <tr className="bg-red-700 text-white">
                    <th className="py-4 px-6">언어</th>
                    <th className="py-4 px-6">최대 4시간</th>
                    <th className="py-4 px-6">최대 8시간</th>
                    <th className="py-4 px-6">20명 이상</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-5 px-6 font-medium">영어</td>
                    <td className="py-5 px-6">250,000원</td>
                    <td className="py-5 px-6">350,000원</td>
                    <td className="py-5 px-6">450,000원</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-5 px-6 font-medium">
                      중국어/일본어/러시아어/스페인어 등
                    </td>
                    <td colSpan={3} className="py-5 px-6 text-left">
                      별도 문의
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              ※ 시간 초과 시 추가 요금 발생
            </p>
          </div>

          {/* 차량 요금 */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              전용 차량 요금 (서울 기준)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse text-center">
                <thead>
                  <tr className="bg-red-700 text-white">
                    <th className="py-4 px-6">차종</th>
                    <th className="py-4 px-6">최대 4시간</th>
                    <th className="py-4 px-6">최대 8시간</th>
                    <th className="py-4 px-6">공항 픽업/샌딩</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-5 px-6 font-medium">
                      디럭스 세단 (최대 3명)
                    </td>
                    <td className="py-5 px-6">400,000원</td>
                    <td className="py-5 px-6">600,000원</td>
                    <td className="py-5 px-6">400,000원</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="py-5 px-6 font-medium">10인승 밴</td>
                    <td className="py-5 px-6">250,000원</td>
                    <td className="py-5 px-6">350,000원</td>
                    <td className="py-5 px-6">200,000원</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-5 px-6 font-medium">18인승 미니버스</td>
                    <td className="py-5 px-6">400,000원</td>
                    <td className="py-5 px-6">580,000원</td>
                    <td className="py-5 px-6">380,000원</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-5 px-6 font-medium">40인승 대형버스</td>
                    <td className="py-5 px-6">500,000원</td>
                    <td className="py-5 px-6">750,000원</td>
                    <td className="py-5 px-6">500,000원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-sm text-gray-600 mt-4 space-y-1">
              <p>※ 서울 외 지역 이동 시 거리별 추가 요금</p>
              <p>※ 통행료, 주차비, 기사/가이드 숙박비 별도</p>
              <p>※ 8시간 초과 시 1시간당 추가 요금 발생</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
