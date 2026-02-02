import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 프론트에서 보낸 정수형 금액(commonAmount)을 정확히 받아야 함
    const { orderNumber, amount, mxIssueDate } = body;

    const mxId = "testcorp";
    const passKey = process.env.FIRSTPAY_PASS_KEY;

    if (!passKey) {
      return NextResponse.json({ error: "Key missing" }, { status: 500 });
    }

    // ✅ 가이드 v1.8 MCP 규격에 근거한 해시 생성 (순서가 매우 중요)
    // 이전에 잘 되었던 방식: mxId + orderNumber + amount + passKey
    const textToHash = mxId + orderNumber + amount + passKey;
    const hash = crypto.createHash("sha256").update(textToHash).digest("hex");

    return NextResponse.json({ hash });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
