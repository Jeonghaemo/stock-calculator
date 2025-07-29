import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "주식 계산기",
    template: "%s | 주식 계산기",
  },
  description:
    "주식 수익률 계산기, 평단가 계산기, 수수료 계산기, 복리 계산기, 물타기 계산기, 양도소득세 계산기 등 주식 관련 계산을 손쉽게 할 수 있는 웹 계산기 모음입니다.",
  keywords:
    "주식 계산기, 수익률 계산기, 주식 평단가, 주식 수수료, 물타기 계산기, 복리 계산기, 양도소득세 계산기, 세금계산기, 투자 수익률, 주식세금, 증권사 수수료",
  openGraph: {
    title: "주식 계산기",
    description:
      "주식 수익률 계산기, 평단가 계산기, 수수료 계산기, 복리 계산기, 물타기 계산기, 양도소득세 계산기 등 주식 관련 계산을 손쉽게 할 수 있는 웹 계산기 모음입니다.",
    url: "https://stockcalculator.damoapick.co.kr",
    siteName: "주식 계산기",
    locale: "ko_KR",
    type: "website",
  },
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4564123418761220"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <meta name="google-site-verification" content="wcYdT7ccjF1RCKtJp_HIKYR6KyClzKuuBkbnLLoaC68" />
        <meta name="naver-site-verification" content="9ae40fb9f79a937e016dfe0401dc7bae66f8cf21" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}



