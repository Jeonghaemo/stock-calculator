"use client";
import React from "react";
import Head from "next/head";
import GoogleAdsense from "@/components/GoogleAdsense";
import MobileFooterNav from "@/components/MobileFooterNav";

export default function PageLayout({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        {description && (
          <p className="text-gray-700 mb-6 text-base leading-relaxed font-medium">
            {description}
          </p>
        )}
         <GoogleAdsense />
         
        <div className="bg-white p-6 rounded-lg shadow">{children}</div>
      
      </div>
      {/* ✅ 모바일 하단 툴바 추가 */}
      <MobileFooterNav />
    </>
  );
}
