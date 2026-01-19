import { defineField, defineType } from "sanity";

/**
 * ✈️ Tour Package Schema
 * 투어 상품의 모든 정보를 담는 스키마입니다.
 * 기본 정보, 상세 설명, 그리고 옵션별 일정표(Timeline)를 포함합니다.
 */
export default defineType({
  name: "tour", // DB에 저장될 데이터 타입 이름
  title: "Tour Package", // Sanity Studio(관리자 페이지) 왼쪽에 뜰 이름
  type: "document",
  fields: [
    // =================================================
    // 1️⃣ 기본 정보 (Basic Info)
    // 용도: 투어 리스트 페이지(카드), 메인 화면, SEO 태그
    // =================================================
    defineField({
      name: "title",
      title: "Tour Title",
      type: "string",
      description: "상품의 제목입니다. (예: DMZ 3rd Tunnel Tour)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description:
        "웹사이트 주소 뒤에 붙을 고유 ID입니다. (Generate 버튼 클릭)",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "상품이 속할 카테고리를 선택하세요.",
      options: {
        list: [
          { title: "DMZ Tours", value: "DMZ" },
          { title: "Daily City Tours", value: "DAILY" },
          { title: "Local/Provincial", value: "LOCAL" },
          { title: "K-Drama & Movie", value: "DRAMA" },
          { title: "Ski & Winter", value: "SKI" },
          { title: "Religious (Muslim/Christian)", value: "RELIGIOUS" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "주요 방문 지역 (예: Seoul, Paju, Gangwon-do)",
    }),
    defineField({
      name: "mainImage",
      title: "Main Card Image",
      type: "image",
      description: "리스트 페이지(카드)에 보일 대표 썸네일입니다.",
      options: { hotspot: true }, // 이미지 크롭 중심점 설정 가능
    }),
    defineField({
      name: "price",
      title: "Display Price (From $)",
      type: "number",
      description:
        "카드에 표시될 '최저가'입니다. (실제 옵션 가격은 아래에서 설정)",
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price",
      type: "number",
      description: "할인 전 가격 (할인 표시가 필요할 때만 입력)",
    }),
    defineField({
      name: "bookings",
      title: "Bookings / Status Badge",
      type: "string",
      description: "예: '6k+ booked' 또는 예약 막으려면 'Suspended' 입력",
    }),
    defineField({
      name: "tags",
      title: "Marketing Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "카드 위에 붙을 태그 (예: Best Seller, Muslim Friendly)",
    }),
    defineField({
      name: "rating",
      title: "Rating Score",
      type: "number",
      initialValue: 5.0,
      description: "평점 (0.0 ~ 5.0)",
    }),
    defineField({
      name: "reviews",
      title: "Review Count",
      type: "number",
      initialValue: 0,
      description: "리뷰 개수",
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "string",
      description: "카드에 들어갈 짧은 설명 (1-2문장)",
    }),

    // =================================================
    // 2️⃣ 상세 정보 (Detailed Info)
    // 용도: 상세 페이지 본문 (이미지 슬라이더, 긴 설명)
    // =================================================
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
      description: "상세 페이지 상단 슬라이더에 들어갈 이미지들입니다.",
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description (Overview)",
      type: "text",
      rows: 10,
      description: "상세 페이지 하단 'Tour Overview'에 들어갈 긴 설명입니다.",
    }),
    defineField({
      name: "includes",
      title: "Included Items (SEO)",
      type: "array",
      of: [{ type: "string" }],
      description: "구글 검색(SEO) 및 구조화된 데이터를 위한 포함 내역입니다.",
    }),
    defineField({
      name: "meetingPoint",
      title: "Meeting Point Info",
      type: "text",
      description:
        "Meeting Point- 사이드바 하단에 표시될 미팅 포인트 안내 문구입니다.",
    }),

    // =================================================
    // 🔥 3️⃣ 옵션 & 일정표 (Pricing & Schedule)
    // 용도: 옵션 선택 및 우측 사이드바 타임라인
    // =================================================
    defineField({
      name: "packageOptions",
      title: "Pricing Options",
      description: "가격 옵션과 해당 옵션의 일정표를 관리합니다.",
      type: "array",
      of: [
        {
          type: "object",
          name: "option",
          title: "Option Detail",
          fields: [
            // --- 옵션 기본 정보 ---
            {
              name: "name",
              title: "Option Name",
              type: "string",
              description: "옵션 이름 (예: DMZ Morning Tour)",
            },
            {
              name: "price",
              title: "Price ($)",
              type: "number",
              description: "이 옵션의 실제 판매 가격",
            },
            {
              name: "badge",
              title: "Badge",
              type: "string",
              description: "옵션 옆에 붙을 뱃지 (예: Popular)",
            },

            // ✅ 1. 간단 요약 리스트 (카드용)
            defineField({
              name: "details",
              title: "Simple Course List (For Card)",
              description:
                "🚨 중요: 이곳은 '리스트 페이지(카드)'에 보여줄 간단 코스명만 적으세요. (예: Imjingak -> Tunnel)",
              type: "array",
              of: [{ type: "string" }],
            }),

            // ✅ 2. 상세 일정표 (사이드바용)
            defineField({
              name: "itinerary",
              title: "Tour Schedule (For Sidebar)",
              description:
                "🚀 중요: 이곳은 상세 페이지 '오른쪽 사이드바'에 나올 사진/아이콘이 포함된 타임라인입니다.",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "scheduleItem",
                  fields: [
                    {
                      name: "time",
                      title: "Time",
                      type: "string",
                      description:
                        "시간 (예: 08:00). 비워두면 시간 없이 표시됩니다.",
                    },
                    {
                      name: "title",
                      title: "Activity Title",
                      type: "string",
                      description: "일정 제목 (예: Hotel Pickup)",
                    },
                    {
                      name: "description",
                      title: "Description",
                      type: "text",
                      rows: 2,
                      description: "상세 설명 (줄바꿈 가능)",
                    },
                    {
                      name: "iconType",
                      title: "Icon Type",
                      type: "string",
                      description: "타임라인 왼쪽에 표시될 아이콘 종류",
                      options: {
                        list: [
                          {
                            title: "📍 Spot / Location (기본)",
                            value: "location",
                          },
                          {
                            title: "🚌 Transport / Bus (이동)",
                            value: "transport",
                          },
                          { title: "🍴 Food / Meal (식사)", value: "food" },
                          { title: "🏨 Hotel / Stay (숙박)", value: "hotel" },
                          { title: "🛍️ Shopping (쇼핑)", value: "shopping" },
                          { title: "🚶 Walking (도보)", value: "walking" },
                        ],
                      },
                      initialValue: "location",
                    },
                    {
                      name: "image",
                      title: "Activity Image",
                      type: "image",
                      description: "해당 일정에 보여줄 작은 사진",
                      options: { hotspot: true },
                    },
                  ],
                  // Sanity Studio 리스트에서 미리보기 설정
                  preview: {
                    select: {
                      title: "title",
                      subtitle: "time",
                      media: "image",
                    },
                    prepare({ title, subtitle, media }) {
                      return {
                        title: title,
                        subtitle: subtitle || "No time specified",
                        media: media,
                      };
                    },
                  },
                },
              ],
            }),

            // 불포함 사항 (Overview 하단 참고용)
            {
              name: "excluded",
              title: "Excluded Items",
              type: "array",
              of: [{ type: "string" }],
              description: "불포함 사항 (개요 하단 표시용)",
            },
          ],
          // 옵션 리스트 미리보기
          preview: {
            select: { title: "name", subtitle: "price" },
            prepare({ title, subtitle }) {
              return {
                title: title,
                subtitle: subtitle ? `$${subtitle}` : "Price not set",
              };
            },
          },
        },
      ],
    }),
  ],
});
