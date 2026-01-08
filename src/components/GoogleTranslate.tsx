"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}

export default function GoogleTranslate() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "ko,zh-CN,ja", // 한국어, 중국어, 일본어
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (!mounted) return null;

  return (
    // 스타일: 높이를 고정하고 오버플로우를 막아서 레이아웃 깨짐 방지
    <div className="translate-wrapper">
      <div id="google_translate_element" />
      <style jsx global>{`
        .goog-te-gadget-simple {
          background-color: transparent !important;
          border: none !important;
          padding: 0 !important;
          font-size: 13px !important;
        }
        .goog-te-gadget-icon {
          display: none !important;
        }
        /* "Google 번역" 텍스트 숨기기 (선택사항) */
        .goog-te-gadget-simple span {
          color: #555;
        }
      `}</style>
    </div>
  );
}
