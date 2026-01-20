import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 1. 응답 객체 미리 생성
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Supabase 서버 클라이언트 생성 (쿠키 관리용)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  // 3. 현재 로그인된 유저가 있는지 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. [핵심] '/admin' 페이지로 가려는데 로그인을 안 했다?
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      // 로그인 페이지로 쫓아냄! 쫒아낼 때 "원래 가려던 주소"를 기억시킬 수도 있지만 일단 심플하게 보냄
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 5. 문제 없으면 통과!
  return response;
}

// 이 문지기는 '/admin'으로 시작하는 모든 주소를 감시합니다.
export const config = {
  matcher: ["/admin/:path*"],
};
