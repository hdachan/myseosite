"use client";

import { useEffect, useState } from "react";

export default function TestPaymentPage() {
  const [loading, setLoading] = useState(false);

  // 1. KPN 결제 스크립트 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dev.firstpay.co.kr/js/firstpay.js"; // 테스트용
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 암호(SHA256 Hash) 만드는 함수
  async function generateHash(message: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  // 2. 결제 버튼 클릭 시
  const handlePayment = async () => {
    if (typeof window === "undefined" || !(window as any).FirstPay) {
      alert("결제 시스템 로딩 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setLoading(true);

    try {
      // --- (1) 결제 정보 준비 ---
      const mxId = "testcorp"; // 테스트 가맹점 ID
      const passKey = "6aMoJujE34XnL9gvUqdKGMqs9GzYaNo6"; // 테스트용 비밀키
      const amount = 1000;
      const mxIssueNo = "ORD" + new Date().getTime(); // 주문번호
      const mxIssueDate = new Date()
        .toISOString()
        .replace(/[-T:\.Z]/g, "")
        .slice(0, 14); // YYYYMMDDHHMMSS

      // --- (2) 암호(Hash) 생성 [수정됨!] ---
      // 문서의 [표] 기준 공식: SHA256(mxId + mxIssueNo + amount + passKey)
      // *주의: mxIssueDate(날짜)는 해시 계산에서 빠집니다!
      const hashString = mxId + mxIssueNo + amount + passKey;

      const callHash = await generateHash(hashString);
      console.log("생성된 해시:", callHash);

      // --- (3) 결제창 호출 ---
      const pay = new (window as any).FirstPay({
        env: "develop",
        isMobile: false,
        openType: "popup",
      });

      pay.goPay({
        mxId: mxId,
        mxIssueNo: mxIssueNo,
        mxIssueDate: mxIssueDate, // 여기엔 날짜를 보내지만, 위 해시 계산엔 안 들어감
        amount: amount,
        currency: "KRW",
        orderName: "테스트 상품",
        buyerName: "홍길동",
        buyerEmail: "test@test.com",
        returnUrl: `${window.location.origin}/api/payment-return`,
        callHash: callHash, // 계산된 암호 입력
      });
    } catch (error) {
      console.error(error);
      alert("오류 발생: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5 p-10">
      <h1 className="text-3xl font-bold">
        🧪 결제 연동 테스트 (Hash 2차 수정)
      </h1>
      <p className="text-gray-600">
        매뉴얼 표에 따라 <b>날짜(Date)를 빼고</b> 암호를 만들었습니다.
      </p>

      <div className="border p-6 rounded-lg shadow-md bg-white w-full max-w-md">
        <div className="flex justify-between mb-4">
          <span>테스트 상품</span>
          <span className="font-bold">1,000원</span>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition disabled:bg-gray-400"
        >
          {loading ? "처리 중..." : "💳 결제창 띄우기"}
        </button>
      </div>

      <div className="text-sm text-blue-500 bg-blue-50 p-4 rounded">
        💡 <b>팁:</b> 이번에도 안 되면 KPN 예제 코드의 순서가 틀렸거나,
        <br />
        테스트 ID 설정 문제일 수 있습니다. (하지만 99% 공식 문제일 겁니다!)
      </div>
    </div>
  );
}
