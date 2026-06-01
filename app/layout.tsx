import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ワン歩チェック / 산책해도댕?",
  description: "날씨와 지면 조건을 바탕으로 강아지 산책 위험도를 확인하는 앱",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "ワン歩チェック",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}