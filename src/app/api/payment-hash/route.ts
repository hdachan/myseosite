import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderNumber, amount } = body;

    const mxId = "testcorp";

    const passKey = process.env.FIRSTPAY_PASS_KEY;

    // 안전장치: 혹시라도 키가 없으면 에러 내기 (실수 방지)
    if (!passKey) {
      console.error(
        "🚨 환경변수 오류: FIRSTPAY_PASS_KEY가 설정되지 않았습니다.",
      );
      return NextResponse.json(
        { error: "Server Configuration Error" },
        { status: 500 },
      );
    }

    // PG사 규칙대로 문자열 조합 (ID + 주문번호 + 금액 + 키)
    const textToHash = mxId + orderNumber + amount + passKey;

    // SHA-256 암호 생성
    const hash = crypto.createHash("sha256").update(textToHash).digest("hex");

    return NextResponse.json({ hash });
  } catch (error) {
    console.error("Hash Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate hash" },
      { status: 500 },
    );
  }
}
