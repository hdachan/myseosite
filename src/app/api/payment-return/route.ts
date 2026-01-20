import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // 들어온 데이터 정리 (디버깅용)
    const rawData: Record<string, string> = {};
    formData.forEach((value, key) => {
      rawData[key] = value.toString();
    });

    console.log("🔥 [KPN 데이터 수신]", rawData);

    // 1. 이름표 찾기 (로그 기반으로 수정됨!)
    // 실제 들어온 값: code, mxIssueNo, message
    const replyCode =
      rawData["code"] || rawData["ReplyCode"] || rawData["replyCode"];
    const mxIssueNo =
      rawData["mxIssueNo"] || rawData["MxIssueNO"] || rawData["order_no"];
    const message =
      rawData["message"] ||
      rawData["ReplyMessage"] ||
      rawData["replyMessage"] ||
      "";

    console.log(`✅ 해석 결과: Code=${replyCode}, Order=${mxIssueNo}`);

    // 2. 데이터 검증
    if (!replyCode || !mxIssueNo) {
      console.error("⚠️ 필수 데이터 누락");
      return NextResponse.redirect(
        new URL(`/?error=데이터누락`, request.url),
        303,
      );
    }

    // 3. Supabase 연결
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    // 4. 성공 처리 (0000이면 성공)
    if (replyCode === "0000") {
      console.log("🎉 결제 성공! DB 업데이트...");

      // DB 상태 변경 (pending -> paid)
      const { error } = await supabase
        .from("bookings")
        .update({ status: "paid" })
        .eq("order_number", mxIssueNo);

      if (error) {
        console.error("❌ DB 업데이트 에러:", error);
      } else {
        console.log("✅ DB 업데이트 완료");
      }

      // 성공 페이지로 이동
      return NextResponse.redirect(
        new URL(`/booking/success?orderId=${mxIssueNo}`, request.url),
        303,
      );
    } else {
      // 실패 시
      console.warn(`❌ 결제 실패 (코드: ${replyCode})`);
      return NextResponse.redirect(
        new URL(
          `/?error=${encodeURIComponent(message || "결제실패")}`,
          request.url,
        ),
        303,
      );
    }
  } catch (error) {
    console.error("❌ 서버 에러:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
