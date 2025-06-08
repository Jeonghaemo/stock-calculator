"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function GlobalAdsense() {
  const adRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

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
    <div ref={adRef} className="my-6 max-w-3xl mx-auto px-4">
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



