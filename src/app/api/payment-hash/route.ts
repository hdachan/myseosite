import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    // 1. 클라이언트(프론트)에서 보낸 데이터 받기
    const body = await request.json();
    const { orderNumber, amount } = body;

    // 2. 상점 설정
    const mxId = "testcorp";
    const passKey = process.env.FIRSTPAY_PASS_KEY; // .env에서 비밀키 가져오기

    // 3. 안전장치: 키가 없으면 서버 에러 반환 (로그로 확인 가능)
    if (!passKey) {
      console.error(
        "🚨 [Server Error] FIRSTPAY_PASS_KEY is missing in .env file.",
      );
      return NextResponse.json(
        { error: "Server Configuration Error: Key missing" },
        { status: 500 },
      );
    }

    // 4. 해시 생성 (순서: ID + 주문번호 + 금액 + 키)
    // 숫자가 들어와도 문자로 자동 변환되어 합쳐집니다.
    const textToHash = mxId + orderNumber + amount + passKey;
    const hash = crypto.createHash("sha256").update(textToHash).digest("hex");

    // 5. 성공 시 해시값 반환
    return NextResponse.json({ hash });
  } catch (error) {
    console.error("Payment Hash Generation Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
