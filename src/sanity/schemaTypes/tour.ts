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
        "버튼을 누르면 'Seoul', 'with' 등 불필요한 단어는 자동으로 삭제됩니다.",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) => {
          return input
            .toLowerCase()
            .replace(/seoul/g, "")
            .replace(/\b(with|the|a|an|to|for|of)\b/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
        },
      },
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
    defineField({
      name: "minPax",
      title: "Minimum Travelers (최소 출발 인원)",
      type: "number",
      initialValue: 1,
      description: "이 투어를 예약하기 위한 최소 인원입니다. (예: 2명 이상)",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price",
      type: "number",
      description: "할인 전 가격 (할인 표시가 필요할 때만 입력)",
    }),
    defineField({
      name: "tags",
      title: "Marketing Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "카드 위에 붙을 태그 (예: Best Seller, Muslim Friendly)",
    }),
    defineField({
      name: "description",
      title: "Highlight",
      description:
        "투어의 핵심 포인트(이전에 Short Description) 를 적어주세요. (리스트, 굵게 사용 가능)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
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
      description:
        "상세 페이지 하단 'Tour Overview'에 들어갈 긴 설명입니다. (제목, 리스트, 링크, 이미지 등 사용 가능)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
        {
          type: "image",
          title: "Image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "이미지 설명 (SEO & 접근성용)",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "이미지 아래 설명 안적어도 됩니다. (선택사항)",
            },
          ],
        },
      ],
    }),

    // =================================================
    // 🔥 3️⃣ 옵션 & 일정표 (Pricing & Schedule)
    // =================================================
    defineField({
      name: "packageOptions",
      title: "Pricing Options",
      description: "가격 옵션, 미팅 포인트, 일정표를 관리합니다.",
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
            defineField({
              name: "originalPrice",
              title: "Original Adult Price (Before Discount)",
              type: "number",
              description:
                "할인 전 성인 정가입니다. (입력 시 $100 -> $80 처럼 표시됨) 할인가 없으면 비워주세요!",
            }),
            {
              name: "price",
              title: "Adult Price (Final)",
              type: "number",
              description: "성인 1명당 최종 판매가 (카드/상세 페이지에 표시됨)",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "childPrice",
              title: "Child Price (Ages 3-9)",
              type: "number",
              description:
                "어린이 1명당 가격 (비워두면 성인과 동일 가격 적용됩니다)",
            },
            {
              name: "badge",
              title: "Badge",
              type: "string",
              description: "옵션 옆에 붙을 뱃지 (예: Popular, 20% OFF)",
            },
            defineField({
              name: "meetingPoints",
              title: "Meeting Points Info",
              type: "array",
              description: "이 옵션에서 선택 가능한 미팅 장소들입니다.",
              of: [
                {
                  type: "object",
                  name: "point",
                  fields: [
                    {
                      name: "name",
                      title: "Point Name",
                      type: "string",
                      description:
                        "장소 이름 (예: Hongik Univ. Station Exit 3)",
                    },
                    {
                      name: "description",
                      title: "Description / Address",
                      type: "text",
                      rows: 3,
                      description: "상세 주소 및 찾아오는 길 설명",
                    },
                    {
                      name: "images",
                      title: "Meeting Point Images",
                      type: "array",
                      of: [{ type: "image", options: { hotspot: true } }],
                      description:
                        "약도나 미팅 포인트 전경 사진 (여러 장 가능)",
                    },
                  ],
                  preview: {
                    select: { title: "name", media: "images.0" },
                  },
                },
              ],
            }),
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
                      media: "images.0",
                    },
                    prepare({ title, subtitle, media }) {
                      return {
                        title,
                        subtitle: subtitle || "No time specified",
                        media,
                      };
                    },
                  },
                },
              ],
            }),
            defineField({
              name: "note",
              title: "Additional Note / Important Notice",
              description:
                "이 옵션에 대한 주의사항을 자유롭게 작성하세요. (굵게, 리스트, 링크 등)",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [
                    { title: "Normal", value: "normal" },
                    { title: "H4", value: "h4" },
                    { title: "Quote", value: "blockquote" },
                  ],
                  lists: [
                    { title: "Bullet", value: "bullet" },
                    { title: "Number", value: "number" },
                  ],
                  marks: {
                    decorators: [
                      { title: "Strong", value: "strong" },
                      { title: "Emphasis", value: "em" },
                      { title: "Underline", value: "underline" },
                    ],
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: "name",
              price: "price",
              childPrice: "childPrice",
              original: "originalPrice",
            },
            prepare({ title, price, childPrice, original }) {
              const priceDisplay = original
                ? `Adult: $${price} (was $${original})`
                : `Adult: $${price}`;
              const childDisplay = childPrice ? ` | Child: $${childPrice}` : "";
              return { title, subtitle: priceDisplay + childDisplay };
            },
          },
        },
      ],
    }),

    // =================================================
    // ✅ 4️⃣ 추가 옵션 (체크박스 - 여러 개 선택 가능)
    // =================================================
    defineField({
      name: "addOnOptions",
      title: "Add-on Options (체크박스 - 여러 개 선택 가능)",
      description:
        "탈북자 만남, 점심, 박물관 입장권 등 메인 투어에 추가할 수 있는 유료 옵션. 없으면 비워두세요.",
      type: "array",
      of: [
        {
          type: "object",
          name: "addOn",
          title: "Add-on Option",
          fields: [
            {
              name: "name",
              title: "Option Name",
              type: "string",
              description:
                "추가 옵션 이름 (예: Defector Meetup, Lunch, Museum Ticket)",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "price",
              title: "Adult Price",
              type: "number",
              description: "성인 1명당 추가 금액",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "childPrice",
              title: "Child Price (Ages 3-9)",
              type: "number",
              description: "어린이 1명당 추가 금액 (비워두면 성인과 동일)",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              description: "추가 옵션에 대한 간단한 설명",
            },
            {
              name: "badge",
              title: "Badge",
              type: "string",
              description: "뱃지 (예: Recommended, Limited)",
            },
          ],
          preview: {
            select: { title: "name", price: "price", childPrice: "childPrice" },
            prepare({ title, price, childPrice }) {
              const childDisplay = childPrice ? ` | Child: ₩${childPrice}` : "";
              return { title, subtitle: `+₩${price}` + childDisplay };
            },
          },
        },
      ],
    }),
  ],
});
