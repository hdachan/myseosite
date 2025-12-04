// src/app/page.tsx
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function RootPage() {
  const headersList = await headers(); // Promise이므로 await 필요
  const acceptLang = headersList.get("accept-language") ?? "";

  const lang = acceptLang.startsWith("en") ? "en" : "ko";

  redirect(`/${lang}`);
}
