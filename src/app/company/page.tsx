"use client";

import React from "react";

export default function CompanyPage() {
  return (
    <div className="w-full">
      {/* SECTION 1 - 인사말 */}
      <section className="w-full py-20 lg:py-32 px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* 왼쪽 + 오른쪽을 하나의 그룹으로 묶어서 동시에 등장 */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 animate-together">
          {/* LEFT TEXT AREA */}
          <div className="flex-1">
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-12">
              서울을 대표하는
              <br />
              DMZ 전문 여행사,
              <br />
              <span className="text-red-600 inline-block hover:scale-105 transition-transform duration-300">
                서울씨티투어
              </span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  title: "20년+ 노하우",
                  desc: "2004년 설립 이후 DMZ 투어 전문 운영",
                  delay: "200ms",
                },
                {
                  title: "매일 출발 보장",
                  desc: "한·영 전문 가이드와 최신 차량으로",
                  delay: "300ms",
                },
                {
                  title: "VIP 영접",
                  desc: "기업 바이어부터 한류 이벤트까지",
                  delay: "400ms",
                },
                {
                  title: "글로벌 신뢰",
                  desc: "외국인 관광객 50만+ 누적 경험",
                  delay: "500ms",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group border-l-4 border-red-600 pl-5 py-2 hover:pl-6 hover:border-l-[6px] transition-all duration-300 animate-fadeInUp cursor-default"
                  style={{ animationDelay: item.delay }}
                >
                  <h3 className="font-bold text-lg lg:text-xl mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - 대표 인사말 (딜레이 없이 동시에 등장!) */}
          <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200">
            <p className="text-red-600 mb-4 text-xs lg:text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-[2px] bg-red-600 inline-block"></span>
              CEO Message
            </p>
            <p className="text-base lg:text-lg leading-relaxed text-gray-700 mb-4">
              (주)서울씨티투어는 2004년 설립 이후 20년 이상 서울 출발 DMZ 투어를
              전문적으로 운영해온 대한민국 대표 여행사입니다.
            </p>
            <p className="text-base lg:text-lg leading-relaxed text-gray-700 mb-4">
              외국인 관광객, 해외 교포, 기업 VIP 바이어 영접, 통역 지원, Private
              Van 투어 등 다양한 여행 서비스를 전문적으로 기획·진행하며, 한류
              이벤트·팬미팅·콘서트까지 운영하고 있습니다.
            </p>
            <p className="text-base lg:text-lg leading-relaxed text-gray-700 mb-8">
              앞으로도 현실에 안주하지 않고 끊임없이 발전하며, 대한민국을
              대표하는 DMZ & 서울 관광 전문 기업으로 성장하겠습니다.
            </p>
            <div className="flex items-center gap-3 pt-6 border-t border-gray-300">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xl">
                박
              </div>
              <div>
                <p className="text-lg lg:text-xl font-bold text-red-600">
                  대표이사 박도영
                </p>
                <p className="text-sm text-gray-500">CEO, Seoul City Tour</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - 연혁 */}
      <section className="w-full py-20 lg:py-32 px-6 lg:px-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="animate-fadeInUp">
          <p className="text-red-600 mb-3 text-sm lg:text-base font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-8 h-[2px] bg-red-600 inline-block"></span>
            Our History
          </p>
          <h2 className="text-3xl lg:text-5xl font-extrabold leading-snug tracking-tight mb-16 lg:mb-24">
            20년간의 여정,
            <br />
            앞으로의{" "}
            <span className="text-red-600 inline-block hover:scale-105 transition-transform duration-300">
              혁신
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 lg:gap-y-16">
          {[
            {
              year: "2025",
              title: "DMZ 투어 누적 참가자 50만 명 돌파",
              desc: "글로벌 관광객이 선택한 대한민국 대표 DMZ 전문 여행사",
              delay: "100ms",
            },
            {
              year: "2023",
              title: "서울시 우수 관광사업체 선정",
              desc: "서울시로부터 관광 품질 및 서비스 우수성 공식 인정",
              delay: "150ms",
            },
            {
              year: "2020",
              title: "코로나 방역 최우수 여행사 표창",
              desc: "안전한 투어 운영과 철저한 방역 시스템으로 표창 수상",
              delay: "200ms",
            },
            {
              year: "2018",
              title: "Private Van 투어 런칭",
              desc: "고급 프라이빗 투어 서비스로 VIP 고객 맞춤형 투어 제공",
              delay: "250ms",
            },
            {
              year: "2015",
              title: "외국인 전용 DMZ 투어 시작",
              desc: "영어 전문 가이드와 함께하는 외국인 특화 투어 프로그램 론칭",
              delay: "300ms",
            },
            {
              year: "2008",
              title: "관광사업자 등록",
              desc: "제2008-000002호 정식 관광사업 등록 완료",
              delay: "350ms",
            },
            {
              year: "2004",
              title: "(주)서울씨티투어 설립",
              desc: "서울 기반 DMZ 전문 투어 여행사로 새로운 출발",
              delay: "400ms",
            },
          ].map((item) => (
            <div
              key={item.year}
              className="group relative pl-16 lg:pl-20 pb-6 border-l-2 border-gray-300 hover:border-red-600 transition-all duration-500 animate-fadeInUp"
              style={{ animationDelay: item.delay }}
            >
              <div className="absolute -left-[1px] top-0 bg-red-600 text-white font-bold text-base lg:text-lg px-4 lg:px-5 py-2 rounded-r-xl shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300">
                {item.year}
              </div>
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-4 border-red-600 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
              <div className="mt-14">
                <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-red-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 - 오시는 길 */}
      <section className="w-full py-20 lg:py-32 px-6 lg:px-20 bg-white">
        <div className="animate-fadeInUp">
          <p className="text-red-600 mb-3 text-sm lg:text-base font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-8 h-[2px] bg-red-600 inline-block"></span>
            Visit Us
          </p>
          <h2 className="text-3xl lg:text-5xl font-extrabold leading-snug tracking-tight mb-12 lg:mb-20">
            오시는 길
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="animate-fadeInUp" style={{ animationDelay: "200ms" }}>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-400 rounded-3xl w-full h-80 lg:h-96 flex items-center justify-center hover:shadow-xl transition-all duration-500 hover:border-red-400 group">
              <p className="text-gray-500 text-base lg:text-lg group-hover:text-gray-700 transition-colors">
                지도 영역 (카카오맵/네이버지도)
              </p>
            </div>
          </div>

          <div
            className="space-y-8 lg:space-y-10 animate-fadeInUp"
            style={{ animationDelay: "300ms" }}
          >
            <div className="group hover:translate-x-2 transition-transform duration-300">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 flex items-center gap-3 group-hover:text-red-600 transition-colors">
                <span className="text-2xl lg:text-3xl">주소</span> 주소
              </h3>
              <p className="text-base lg:text-lg leading-relaxed text-gray-700 pl-10 lg:pl-11">
                서울특별시 종로구 인사동 194-4
                <br />
                하나로빌딩 507호
              </p>
            </div>

            <div className="group hover:translate-x-2 transition-transform duration-300">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 flex items-center gap-3 group-hover:text-red-600 transition-colors">
                <span className="text-2xl lg:text-3xl">연락처</span> 연락처
              </h3>
              <div className="text-base lg:text-lg leading-relaxed text-gray-700 space-y-1 pl-10 lg:pl-11">
                <p className="hover:text-red-600 transition-colors cursor-pointer">
                  전화: 02-774-3345
                </p>
                <p className="hover:text-red-600 transition-colors cursor-pointer">
                  팩스: 02-774-8223
                </p>
                <p className="hover:text-red-600 transition-colors cursor-pointer break-all">
                  이메일: mail@seoulcitytour.net
                </p>
              </div>
            </div>

            <div className="group hover:translate-x-2 transition-transform duration-300">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 flex items-center gap-3 group-hover:text-red-600 transition-colors">
                <span className="text-2xl lg:text-3xl">대중교통</span> 대중교통
              </h3>
              <div className="space-y-4 text-base lg:text-lg text-gray-700 pl-10 lg:pl-11">
                <div className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                  <span className="bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs lg:text-sm font-bold shadow-md hover:shadow-lg transition-shadow whitespace-nowrap">
                    3호선
                  </span>
                  <p className="leading-relaxed">안국역 6번 출구 → 도보 7분</p>
                </div>
                <div className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                  <span className="bg-green-600 text-white px-3 py-1.5 rounded-full text-xs lg:text-sm font-bold shadow-md hover:shadow-lg transition-shadow whitespace-nowrap">
                    버스
                  </span>
                  <p className="leading-relaxed">종로2가, 인사동 정류장 하차</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
