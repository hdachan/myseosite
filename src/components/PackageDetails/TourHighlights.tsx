"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Sparkles, Check, X, ChevronRight } from "lucide-react";
import { PortableText } from "@portabletext/react";

interface Props {
  content: any;
}

// ✅ Portable Text 스타일 정의 (모달 및 프리뷰 공통)
const highlightComponents = {
  list: {
    bullet: ({ children }: any) => (
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-3">
        <div className="mt-1 min-w-[18px]">
          <Check className="w-4.5 h-4.5 text-green-600" strokeWidth={3} />
        </div>
        <span className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
          {children}
        </span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-800">{children}</em>
    ),
  },
  block: {
    normal: ({ children }: any) => (
      <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed mb-2">
        {children}
      </p>
    ),
  },
};

// 🛠️ 헬퍼 함수: Portable Text에서 순수 텍스트만 추출
function toPlainText(blocks: any[] = []) {
  return (
    blocks
      // 블록이 아니거나 자식이 없으면 패스
      .map((block) => {
        if (block._type !== "block" || !block.children) {
          return "";
        }
        // 자식들의 텍스트를 이어 붙임
        return block.children.map((child: any) => child.text).join("");
      })
      // 블록끼리는 줄바꿈으로 연결
      .join("\n\n")
  );
}

export default function TourHighlights({ content }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydration 에러 방지용
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!content) return null;

  // 1. 전체 텍스트 추출 및 길이 계산
  const plainText = toPlainText(content);
  const maxLength = 200; // ✂️ 제한할 글자 수
  const isTooLong = plainText.length > maxLength;

  // 2. 프리뷰용 텍스트 (200자 + ...)
  const previewText = isTooLong
    ? plainText.slice(0, maxLength).trim() + "..."
    : plainText;

  // 🌀 모달 닫기 핸들러
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* ===== 메인 화면 표시 영역 ===== */}
      <section className="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm relative">
        {/* 🗑️ [삭제됨] Tour Highlights 제목 헤더 영역 */}

        {/* 길이가 짧으면 바로 리스트 보여주기 */}
        {!isTooLong ? (
          <PortableText value={content} components={highlightComponents} />
        ) : (
          // 길이가 길면 텍스트 프리뷰 + 버튼 보여주기
          <div>
            {/* 체크 아이콘 느낌을 주기 위해 프리뷰에도 가짜 아이콘 하나 배치 */}
            <div className="flex items-start gap-3 mb-2">
              <div className="mt-1 min-w-[18px]">
                <Check className="w-4.5 h-4.5 text-gray-400" strokeWidth={3} />
              </div>
              <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">
                {previewText}
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 text-sm font-bold text-[#4A7C7E] hover:text-[#3a6263] flex items-center gap-1 transition-colors"
            >
              See more
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* ===== 팝업(모달) 영역 ===== */}
      {mounted &&
        isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={closeModal}
          >
            {/* 모달 컨텐츠 박스 */}
            <div
              className="bg-white w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()} // 박스 클릭 시 닫힘 방지
            >
              {/* 모달 헤더 (팝업창에는 제목 유지 - 필요 없으면 이 부분도 삭제 가능) */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#4A7C7E]" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Full Highlights
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 모달 스크롤 영역 */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <PortableText
                  value={content}
                  components={highlightComponents}
                />
              </div>

              {/* 모달 하단 닫기 버튼 (모바일 편의성) */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 text-right md:hidden">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
