import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, customerName, tourTitle, token } = body;

    // 1. 유효성 검사
    if (!email || !token) {
      return NextResponse.json({ error: "필수 데이터 누락" }, { status: 400 });
    }

    // 2. 환경 변수 기반 URL 설정
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://myseosite.vercel.app";
    const reviewLink = `${baseUrl}/reviews?token=${token}`;

    // 3. 우체부 설정 (카페24 최적화 및 보안 우회)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false, // 587 포트 필수 설정
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // ✅ 최신 Node.js의 보안 차단을 해제하는 핵심 옵션
        secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
        ciphers: "DEFAULT@SECLEVEL=0",
        minVersion: "TLSv1",
        rejectUnauthorized: false,
      },
      logger: true,
      debug: true,
    });

    // 4. SMTP 서버 연결 확인 (안정성 확보)
    await transporter.verify();
    console.log("✅ SMTP 서버 연결 성공");

    // 5. 메일 내용 작성 (지메일 스팸 회피 전략 반영)
    const mailOptions = {
      from: `"Seoul City Tour" <${process.env.SMTP_USER}>`,
      to: email,
      // ✅ 지메일이 선호하는 명확한 제목 형식
      subject: `[Seoul City Tour] ${customerName}님, 서울 여행은 어떠셨나요? 특별한 선물이 기다리고 있습니다.`,

      // ✅ 텍스트 버전 추가 (스팸 점수를 낮추는 핵심 요소)
      text: `안녕하세요 ${customerName}님, 서울시티투어를 이용해 주셔서 감사합니다. 참여하신 '${tourTitle}' 투어에 대한 소중한 후기를 남겨주시면 감사의 선물을 보내드립니다. 리뷰 작성 링크: ${reviewLink}`,

      html: `
        <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
          <div style="padding: 40px 20px; text-align: center; background-color: #ffffff;">
            <h1 style="font-size: 24px; color: #111; margin-bottom: 20px;">Your Memories in Seoul! 📸</h1>
            <p style="font-size: 16px; color: #444; margin-bottom: 10px;">안녕하세요, <strong>${customerName}</strong>님!</p>
            <p style="font-size: 16px; color: #444; margin-bottom: 30px;">
              저희 <strong>Seoul City Tour</strong>와 함께한 <strong>${tourTitle}</strong> 투어는 즐거우셨나요? <br/>
              고객님의 소중한 후기는 저희 가이드팀에게 가장 큰 선물이 됩니다.
            </p>
            
            <div style="margin: 40px 0;">
              <a href="${reviewLink}" 
                 style="background-color: #000; color: #ffffff; padding: 18px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                 Write a Review & Get a Gift 🎁
              </a>
            </div>
      
          </div>

          <div style="padding: 30px 20px; background-color: #f8f8f8; font-size: 12px; color: #888; text-align: center;">
            <p style="margin-bottom: 10px;">본 메일은 세울시티투어 서비스를 이용하신 고객님께 발송되는 발신전용 메일입니다.</p>
            <p style="margin-bottom: 5px;"><strong>Seoul City Tour (서울시티투어)</strong></p>
            <p style="margin-bottom: 5px;">Address: 123, Teheran-ro, Gangnam-gu, Seoul, Republic of Korea</p>
            <p style="margin-bottom: 20px;">Contact: <a href="mailto:${process.env.SMTP_USER}" style="color: #888;">${process.env.SMTP_USER}</a></p>
            
            <p style="margin-top: 10px;">
              수신을 원치 않으시면 <a href="${baseUrl}/unsubscribe" style="color: #888; text-decoration: underline;">수신거부</a>를 클릭해 주세요.
            </p>
          </div>
        </div>
      `,
      replyTo: process.env.SMTP_USER,
    };

    // 6. 메일 발송 및 결과 출력
    const info = await transporter.sendMail(mailOptions);

    console.log("📧 발송 성공:", {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
    });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error("❌ 에러 상세:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
