import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, customerName, tourTitle, token } = body;

    // ✅ [수정] 환경변수 대신 Vercel 주소를 직접 입력했습니다.
    // 이제 로컬에서 테스트하든 실서버에서 보내든, 고객은 무조건 이 주소로 접속하게 됩니다.
    const baseUrl = "https://myseosite.vercel.app";
    const reviewLink = `${baseUrl}/reviews?token=${token}`;

    // 2. 우체부 설정 (Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // .env에 내 구글 이메일
        pass: process.env.GMAIL_APP_PASSWORD, // .env에 앱 비밀번호
      },
    });

    // 3. 이메일 내용 작성 (HTML)
    const mailOptions = {
      from: `"Korea Tour Team" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `[Review Request] How was your trip, ${customerName}?`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #111;">Hi, ${customerName}! 👋</h2>
          <p style="color: #555; font-size: 16px;">
            Thank you for joining our <strong>${tourTitle}</strong>.
          </p>
          <p style="color: #555; font-size: 16px;">
            We hope you had a wonderful time! It would very much help us if you could share your experience.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${reviewLink}" style="background-color: #000; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
              Write a Review & Get Gift 🎁
            </a>
          </div>

          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            If the button doesn't work, verify this link:<br/>
            <a href="${reviewLink}" style="color: #666;">${reviewLink}</a>
          </p>
        </div>
      `,
    };

    // 4. 전송!
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
