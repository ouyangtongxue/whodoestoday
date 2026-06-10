import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "今天谁干嘛 — 恋爱决策神器",
  description:
    "今天吃啥？谁洗碗？谁买单？一键抽选，拒绝选择困难症！专为情侣/伴侣设计的趣味生活决策应用。",
  keywords: ["情侣", "决策", "吃什么", "家务", "AA制", "恋爱"],
  authors: [{ name: "今天谁干嘛" }],
  openGraph: {
    title: "今天谁干嘛 — 恋爱决策神器",
    description: "今天吃啥？谁洗碗？谁买单？一键抽选！",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#FAFAFA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg">{children}</body>
    </html>
  );
}
