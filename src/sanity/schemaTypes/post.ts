import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "SEO 및 목록에 표시될 짧은 설명입니다.",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Travel Tips", value: "Travel Tips" },
          { title: "History & Culture", value: "History & Culture" },
          { title: "K-Drama Locations", value: "K-Drama Locations" },
          { title: "Food & Dining", value: "Food & Dining" },
          { title: "Local Insights", value: "Local Insights" },
        ],
      },
    }),

    defineField({
      name: "date",
      title: "Published Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: "예: 5 min read",
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "Seoul City Tour",
    }),

    // ✅ [수정됨] 메인 이미지에 Alt Text 필드 추가 (SEO 핵심)
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description:
            "시각 장애인 및 구글 검색 엔진을 위한 이미지 설명입니다. (필수)",
          validation: (Rule) =>
            Rule.required().warning("SEO를 위해 이미지 설명을 입력해주세요."),
        }),
      ],
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          title: "Image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
              description: "Accessibility용 대체 텍스트",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
              description: "이미지 하단에 표시될 설명",
            }),
          ],
        },
      ],
    }),
  ],
});
