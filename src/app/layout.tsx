// src/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false, // 루트(/)는 리다이렉트용
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
