import { defineField, defineType } from "sanity";

/**
 * ✈️ Tour Package Schema
 * 투어 상품의 모든 정보를 담는 스키마입니다.
 */
export default defineType({
  name: "tour",
  title: "Tour Package",
  type: "document",
  fields: [
    // =================================================
    // 1️⃣ 기본 정보 (Basic Info)
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
      options: { hotspot: true },
    }),
    defineField({
      name: "price",
      title: "Display Price (From $)",
      type: "number",
      description: "카드에 표시될 '최저가'입니다.",
    }),
    // ✅ 최소 출발 인원 설정
    defineField({
      name: "minPax",
      title: "Minimum Travelers (최소 출발 인원)",
      type: "number",
      initialValue: 1, // 기본값 1명
      description: "이 투어를 예약하기 위한 최소 인원입니다. (예: 2명 이상)",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price",
      type: "number",
      description: "할인 전 가격 (할인 표시가 필요할 때만 입력)",
    }),

    // ❌ [삭제됨] rating, reviews 필드 제거 완료

    defineField({
      name: "tags",
      title: "Marketing Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "카드 위에 붙을 태그 (예: Best Seller, Muslim Friendly)",
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "string",
      description: "카드에 들어갈 짧은 설명 (1-2문장)",
    }),

    // =================================================
    // 2️⃣ 상세 정보 (Detailed Info)
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

    // ✅ [수정됨] Meeting Point: 텍스트 + 사진 여러 장
    defineField({
      name: "meetingPoint",
      title: "Meeting Point Info",
      type: "object", // 텍스트에서 객체로 변경
      fields: [
        {
          name: "description",
          title: "Description / Address",
          type: "text",
          description: "미팅 포인트 상세 주소 및 설명",
        },
        {
          name: "images",
          title: "Meeting Point Images",
          type: "array",
          of: [{ type: "image", options: { hotspot: true } }],
          description: "약도나 미팅 포인트 전경 사진 (여러 장 가능)",
        },
      ],
    }),

    // =================================================
    // 🔥 3️⃣ 옵션 & 일정표 (Pricing & Schedule)
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
            defineField({
              name: "details",
              title: "Simple Course List (For Card)",
              description:
                "🚨 중요: 리스트 페이지(카드)용 간단 코스명 (예: Imjingak -> Tunnel)",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({
              name: "itinerary",
              title: "Tour Schedule (For Sidebar)",
              description: "🚀 중요: 상세 페이지 사이드바용 타임라인",
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
                      description: "시간 (예: 08:00)",
                    },
                    {
                      name: "title",
                      title: "Activity Title",
                      type: "string",
                      description: "일정 제목",
                    },
                    {
                      name: "description",
                      title: "Description",
                      type: "text",
                      rows: 2,
                      description: "상세 설명",
                    },
                    {
                      name: "iconType",
                      title: "Icon Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "📍 Spot / Location", value: "location" },
                          { title: "🚌 Transport / Bus", value: "transport" },
                          { title: "🍴 Food / Meal", value: "food" },
                          { title: "🏨 Hotel / Stay", value: "hotel" },
                          { title: "🛍️ Shopping", value: "shopping" },
                          { title: "🚶 Walking", value: "walking" },
                        ],
                      },
                      initialValue: "location",
                    },
                    // ✅ [수정됨] 일정 사진: 한 장 -> 여러 장 (Array)
                    {
                      name: "images",
                      title: "Activity Images",
                      type: "array",
                      of: [{ type: "image", options: { hotspot: true } }],
                      description: "해당 일정에 보여줄 사진들 (여러 장 가능)",
                    },
                  ],
                  preview: {
                    select: {
                      title: "title",
                      subtitle: "time",
                      // 배열의 첫 번째 이미지를 썸네일로 사용
                      media: "images.0",
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
            // ❌ [삭제됨] excluded (불포함 사항) 필드 제거 완료
          ],
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
