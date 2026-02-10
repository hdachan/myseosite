export const dynamic = "force-dynamic"; // ✅ 캐시 방지

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      customerName,
      tourTitle,
      token,
      type,
      orderNumber,
      amount,
      currency,
      phone,
      tourDate,
      hotelInfo,
      clientEmail,
    } = body;

    // 1. 환경변수 로드
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = Number(process.env.SMTP_PORT);
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    // -----------------------------------------------------------------------
    // 🔥 [수정 완료] 개발(내컴퓨터) vs 배포(Vercel) 환경 자동 감지 코드
    // (리뷰 링크가 올바른 주소로 생성되도록 합니다)
    // -----------------------------------------------------------------------
    const SITE_URL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_SITE_URL || "https://myseosite.vercel.app";

    // 2. 유효성 검사 (리뷰일 때만 토큰 필수)
    if (type === "REVIEW" && (!email || !token)) {
      return NextResponse.json(
        { error: "Review data missing" },
        { status: 400 },
      );
    }

    if (!SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { error: "SMTP config missing" },
        { status: 500 },
      );
    }

    // 3. 우체부 설정
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      tls: {
        secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
        ciphers: "DEFAULT@SECLEVEL=0",
        minVersion: "TLSv1",
        rejectUnauthorized: false,
      },
    });

    // 4. 메일 내용 생성
    let subject = "";
    let htmlContent = "";

    // 알림 메일은 사장님(SMTP_USER)에게, 리뷰 메일은 고객(email)에게
    const targetEmail = email || SMTP_USER;

    // 메일 본문 스타일 정의
    const labelStyle =
      "color: #555; font-weight: bold; width: 120px; display: inline-block;";
    const valueStyle = "color: #000; font-weight: normal;";

    switch (type) {
      case "NEW_BOOKING": // 🟢 [현장지불/예약]
        subject = `[신규예약] ${customerName}님 (${tourDate || "날짜미정"})`;
        htmlContent = `
          <div style="border: 1px solid #ddd; padding: 30px; border-radius: 15px; max-width: 600px; font-family: sans-serif;">
            <h2 style="color: #2563eb; margin-top: 0;">📝 신규 예약 접수 (현장지불)</h2>
            <p style="color: #666; font-size: 14px;">고객이 '예약하기' 버튼을 통해 접수한 건입니다.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p><span style="${labelStyle}">고객명:</span> <span style="${valueStyle}">${customerName}</span></p>
            <p><span style="${labelStyle}">투어일자:</span> <span style="${valueStyle}">${tourDate}</span></p>
            <p><span style="${labelStyle}">투어상품:</span> <span style="${valueStyle}">${tourTitle}</span></p>
            <p><span style="${labelStyle}">연락처:</span> <span style="${valueStyle}">${phone}</span></p>
            <p><span style="${labelStyle}">이메일:</span> <span style="${valueStyle}">${clientEmail || "-"}</span></p>
            <p><span style="${labelStyle}">호텔정보:</span> <span style="${valueStyle}">${hotelInfo || "미입력"}</span></p>
            <p><span style="${labelStyle}">예상금액:</span> <span style="${valueStyle}">${currency} ${amount?.toLocaleString()}</span></p>
            <p><span style="${labelStyle}">주문번호:</span> <span style="${valueStyle}">${orderNumber}</span></p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px; color: #666; font-size: 13px;">
              ※ 아직 입금되지 않았거나 현장 지불 예정입니다. 고객에게 연락하여 예약을 확정해주세요.
            </div>
          </div>`;
        break;

      case "PAYMENT_CONFIRMED": // 🔵 [결제완료]
        subject = `[결제완료] ${customerName}님 (${tourDate || "날짜미정"})`;
        htmlContent = `
          <div style="border: 1px solid #ddd; padding: 30px; border-radius: 15px; max-width: 600px; font-family: sans-serif;">
            <h2 style="color: #16a34a; margin-top: 0;">💰 결제 완료 알림 (입금됨)</h2>
            <p style="color: #666; font-size: 14px;">고객이 온라인 결제를 완료했습니다.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p><span style="${labelStyle}">고객명:</span> <span style="${valueStyle}">${customerName}</span></p>
            <p><span style="${labelStyle}">투어일자:</span> <span style="${valueStyle}">${tourDate}</span></p>
            <p><span style="${labelStyle}">투어상품:</span> <span style="${valueStyle}">${tourTitle}</span></p>
            <p><span style="${labelStyle}">연락처:</span> <span style="${valueStyle}">${phone}</span></p>
            <p><span style="${labelStyle}">이메일:</span> <span style="${valueStyle}">${clientEmail || "-"}</span></p>
            <p><span style="${labelStyle}">호텔정보:</span> <span style="${valueStyle}">${hotelInfo || "미입력"}</span></p>
            <p><span style="${labelStyle}">결제금액:</span> <span style="${valueStyle}">${currency} ${amount?.toLocaleString()}</span></p>
            <p><span style="${labelStyle}">주문번호:</span> <span style="${valueStyle}">${orderNumber}</span></p>
            
            <div style="background-color: #e6fffa; padding: 15px; border-radius: 8px; margin-top: 20px; color: #16a34a; font-weight: bold; font-size: 13px;">
              ※ 결제가 정상적으로 완료되었습니다.
            </div>
          </div>`;
        break;

      case "REVIEW": // 🟡 [리뷰 요청]
      default:
        const reviewLink = `${SITE_URL}/reviews?token=${token}`;
        subject = `[Seoul City Tour] ${customerName}님, 서울 여행은 어떠셨나요?`;
        htmlContent = `
          <div style="padding: 20px; text-align: center;">
            <h2>Your Memories in Seoul! 📸</h2>
            <p><strong>${tourTitle}</strong> 투어는 즐거우셨나요?</p>
            <a href="${reviewLink}" style="background-color: #000; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px;">리뷰 작성하기</a>
          </div>`;
        break;
    }

    // 5. 전송
    const info = await transporter.sendMail({
      from: `"Seoul City Tour" <${SMTP_USER}>`,
      to: targetEmail,
      subject: subject,
      html: htmlContent,
      replyTo: SMTP_USER,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    // 에러 로그는 남겨두는 것이 좋습니다 (문제 발생 시 확인용)
    console.error("❌ Email Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
