export const dynamic = "force-dynamic";

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
      optionName,
      adults,
      children,
      meetingPoint, // ✅ 추가
    } = body;

    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = Number(process.env.SMTP_PORT);
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    const SITE_URL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_SITE_URL || "https://myseosite.vercel.app";

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

    let subject = "";
    let htmlContent = "";
    let textContent = "";

    const targetEmail = email || SMTP_USER;

    const labelStyle =
      "color: #555; font-weight: bold; width: 120px; display: inline-block;";
    const valueStyle = "color: #000; font-weight: normal;";

    switch (type) {
      case "NEW_BOOKING":
        subject = `[신규예약] ${customerName}님 (${tourDate || "날짜미정"})`;
        htmlContent = `
          <div style="border: 1px solid #ddd; padding: 30px; border-radius: 15px; max-width: 600px; font-family: sans-serif;">
            <h2 style="color: #2563eb; margin-top: 0;">📝 신규 예약 접수 (현장지불)</h2>
            <p style="color: #666; font-size: 14px;">고객이 '예약하기' 버튼을 통해 접수한 건입니다.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p><span style="${labelStyle}">고객명:</span> <span style="${valueStyle}">${customerName}</span></p>
            <p><span style="${labelStyle}">투어일자:</span> <span style="${valueStyle}">${tourDate}</span></p>
            <p><span style="${labelStyle}">투어상품:</span> <span style="${valueStyle}">${tourTitle}</span></p>
            <p><span style="${labelStyle}">선택옵션:</span> <span style="${valueStyle}">${optionName || "-"}</span></p>
            <p><span style="${labelStyle}">인원:</span> <span style="${valueStyle}">성인 ${adults || 0}명, 어린이 ${children || 0}명 (총 ${(adults || 0) + (children || 0)}명)</span></p>
            <p><span style="${labelStyle}">미팅포인트:</span> <span style="${valueStyle}">${meetingPoint || "미선택"}</span></p>
            <p><span style="${labelStyle}">연락처:</span> <span style="${valueStyle}">${phone}</span></p>
            <p><span style="${labelStyle}">이메일:</span> <span style="${valueStyle}">${clientEmail || "-"}</span></p>
            <p><span style="${labelStyle}">호텔정보:</span> <span style="${valueStyle}">${hotelInfo || "미입력"}</span></p>
            <p><span style="${labelStyle}">예상금액:</span> <span style="${valueStyle}">${currency} ${amount?.toLocaleString()}</span></p>
            <p><span style="${labelStyle}">주문번호:</span> <span style="${valueStyle}">${orderNumber}</span></p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px; color: #666; font-size: 13px;">
              ※ 아직 입금되지 않았거나 현장 지불 예정입니다. 고객에게 연락하여 예약을 확정해주세요.
            </div>
          </div>`;
        textContent = `
신규 예약 접수 (현장지불)

고객명: ${customerName}
투어일자: ${tourDate}
투어상품: ${tourTitle}
선택옵션: ${optionName || "-"}
인원: 성인 ${adults || 0}명, 어린이 ${children || 0}명 (총 ${(adults || 0) + (children || 0)}명)
미팅포인트: ${meetingPoint || "미선택"}
연락처: ${phone}
이메일: ${clientEmail || "-"}
호텔정보: ${hotelInfo || "미입력"}
예상금액: ${currency} ${amount?.toLocaleString()}
주문번호: ${orderNumber}

※ 아직 입금되지 않았거나 현장 지불 예정입니다.
        `;
        break;

      case "PAYMENT_CONFIRMED":
        subject = `[결제완료] ${customerName}님 (${tourDate || "날짜미정"})`;
        htmlContent = `
          <div style="border: 1px solid #ddd; padding: 30px; border-radius: 15px; max-width: 600px; font-family: sans-serif;">
            <h2 style="color: #16a34a; margin-top: 0;">💰 결제 완료 알림 (입금됨)</h2>
            <p style="color: #666; font-size: 14px;">고객이 온라인 결제를 완료했습니다.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p><span style="${labelStyle}">고객명:</span> <span style="${valueStyle}">${customerName}</span></p>
            <p><span style="${labelStyle}">투어일자:</span> <span style="${valueStyle}">${tourDate}</span></p>
            <p><span style="${labelStyle}">투어상품:</span> <span style="${valueStyle}">${tourTitle}</span></p>
            <p><span style="${labelStyle}">선택옵션:</span> <span style="${valueStyle}">${optionName || "-"}</span></p>
            <p><span style="${labelStyle}">인원:</span> <span style="${valueStyle}">성인 ${adults || 0}명, 어린이 ${children || 0}명 (총 ${(adults || 0) + (children || 0)}명)</span></p>
            <p><span style="${labelStyle}">미팅포인트:</span> <span style="${valueStyle}">${meetingPoint || "미선택"}</span></p>
            <p><span style="${labelStyle}">연락처:</span> <span style="${valueStyle}">${phone}</span></p>
            <p><span style="${labelStyle}">이메일:</span> <span style="${valueStyle}">${clientEmail || "-"}</span></p>
            <p><span style="${labelStyle}">호텔정보:</span> <span style="${valueStyle}">${hotelInfo || "미입력"}</span></p>
            <p><span style="${labelStyle}">결제금액:</span> <span style="${valueStyle}">${currency} ${amount?.toLocaleString()}</span></p>
            <p><span style="${labelStyle}">주문번호:</span> <span style="${valueStyle}">${orderNumber}</span></p>
            
            <div style="background-color: #e6fffa; padding: 15px; border-radius: 8px; margin-top: 20px; color: #16a34a; font-weight: bold; font-size: 13px;">
              ※ 결제가 정상적으로 완료되었습니다.
            </div>
          </div>`;
        textContent = `
결제 완료 알림

고객명: ${customerName}
투어일자: ${tourDate}
투어상품: ${tourTitle}
선택옵션: ${optionName || "-"}
인원: 성인 ${adults || 0}명, 어린이 ${children || 0}명 (총 ${(adults || 0) + (children || 0)}명)
미팅포인트: ${meetingPoint || "미선택"}
연락처: ${phone}
이메일: ${clientEmail || "-"}
호텔정보: ${hotelInfo || "미입력"}
결제금액: ${currency} ${amount?.toLocaleString()}
주문번호: ${orderNumber}

※ 결제가 정상적으로 완료되었습니다.
        `;
        break;

      case "REVIEW":
      default:
        const reviewLink = `${SITE_URL}/reviews?token=${token}`;
        subject = `${customerName}님, 서울 투어 후기를 남겨주세요`;

        htmlContent = `
          <!DOCTYPE html>
          <html lang="ko">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; padding: 20px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; max-width: 600px;">
                    <tr>
                      <td style="background-color: #991B1B; padding: 35px 30px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">
                          서울 여행은 어떠셨나요?
                        </h1>
                        <p style="color: #fca5a5; margin: 8px 0 0 0; font-size: 14px;">
                          How was your Seoul adventure?
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 35px 30px;">
                        <p style="color: #1f2937; font-size: 15px; margin: 0 0 8px 0;">
                          안녕하세요, <strong>${customerName}</strong>님
                        </p>
                        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                          <strong>${tourTitle}</strong> 투어에 참여해주셔서 감사합니다.
                        </p>
                        <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0 0 25px 0; padding: 18px; background-color: #fef2f2; border-left: 3px solid #991B1B;">
                          여러분의 소중한 피드백은 저희가 더 나은 서비스를 제공하는 데 큰 도움이 됩니다. 
                          잠시 시간을 내어 후기를 남겨주시겠어요?
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td align="center" style="padding: 15px 0;">
                              <a href="${reviewLink}" style="display: inline-block; background-color: #991B1B; color: #ffffff; padding: 13px 35px; text-decoration: none; border-radius: 5px; font-size: 14px; font-weight: 600;">
                                리뷰 작성하기
                              </a>
                            </td>
                          </tr>
                        </table>
                        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 15px 0 0 0;">
                          간편하게 작성하실 수 있습니다
                        </p>
                        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 25px 0;">
                        <p style="color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5; margin: 0;">
                          서울에서의 멋진 추억이 오래도록 기억되길 바랍니다<br>
                          Seoul City Tour
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: #f9fafb; padding: 18px 30px; text-align: center;">
                        <p style="color: #9ca3af; font-size: 11px; margin: 0;">
                          Seoul City Tour | Seoul, South Korea
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>`;

        textContent = `
안녕하세요, ${customerName}님

${tourTitle} 투어에 참여해주셔서 감사합니다.

여러분의 소중한 피드백은 저희가 더 나은 서비스를 제공하는 데 큰 도움이 됩니다.
잠시 시간을 내어 후기를 남겨주시겠어요?

리뷰 작성하기: ${reviewLink}

서울에서의 멋진 추억이 오래도록 기억되길 바랍니다
Seoul City Tour

---
Seoul City Tour | Seoul, South Korea
        `;
        break;
    }

    const mailOptions = {
      from: `"Seoul City Tour" <${SMTP_USER}>`,
      to: targetEmail,
      subject: subject,
      text: textContent,
      html: htmlContent,
      headers: {
        "X-Priority": "3",
        Importance: "normal",
        "X-Mailer": "Seoul City Tour",
        "List-Unsubscribe": `<mailto:${SMTP_USER}?subject=unsubscribe>`,
        Precedence: "bulk",
        "Auto-Submitted": "auto-generated",
        ...(type === "REVIEW" && { "Reply-To": SMTP_USER }),
      },
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.messageId);
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error("❌ Email Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
