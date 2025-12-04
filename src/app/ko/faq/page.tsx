// app/faq/page.tsx
export const metadata = {
  title: "DMZ 투어 FAQ | 자주 묻는 질문",
  description: "DMZ 관광 관련 자주 묻는 질문과 공식 답변을 정리했습니다.",
};

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "DMZ 투어는 몇 시에 출발하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DMZ 투어는 보통 오전 9시에 서울에서 출발합니다.",
      },
    },
    {
      "@type": "Question",
      name: "DMZ 방문 시 여권이 필요한가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, DMZ 방문 시 여권이 반드시 필요합니다.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      {/* JSON-LD는 가장 상단에 두는 것이 SEO 최적 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_JSONLD),
        }}
      />

      <main className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold">DMZ 투어 FAQ</h1>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold">
              DMZ 투어는 몇 시에 출발하나요?
            </h2>
            <p className="text-gray-700 mt-1">
              DMZ 투어는 일반적으로 오전 9시에 서울에서 출발합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">여권이 필요한가요?</h2>
            <p className="text-gray-700 mt-1">
              네, DMZ 방문 시 여권이 필수입니다.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
