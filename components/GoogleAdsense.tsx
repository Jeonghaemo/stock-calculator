"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function GoogleAdsense() {
  const adRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 광고 태그가 이미 초기화되었는지 확인
    const hasInitialized = adRef.current?.querySelector("ins")?.getAttribute("data-adsbygoogle-status") === "done";

    if (!hasInitialized) {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("Adsense error", e);
      }
    }
  }, []);

  return (
    <div ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4564123418761220"
        data-ad-slot="2809714485"
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-language="ko"
      ></ins>
    </div>
  );
}


