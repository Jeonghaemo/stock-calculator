// ✅ app/losscut/page.tsx
"use client";
import GoogleAdsense from "@/components/GoogleAdsense";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function LosscutCalculatorPage() {
  const [buyPrice, setBuyPrice] = useState("");
  const [lossPercent, setLossPercent] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const formatNumber = (value: string) => {
    const num = parseFloat(value.replace(/,/g, ""));
    if (isNaN(num)) return "";
    return num.toLocaleString();
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/,/g, "");
      if (!/^\d*(\.\d*)?$/.test(raw)) return;
      setter(formatNumber(raw));
    };

  const calculate = () => {
    const price = parseFloat(buyPrice.replace(/,/g, ""));
    const lossRate = parseFloat(lossPercent);

    if (isNaN(price) || isNaN(lossRate)) {
      setResult(null);
      return;
    }

    const stopPrice = price * (1 - lossRate / 100);
    setResult(stopPrice);
  };

  return (
    <PageLayout
      title="주식 손절가 계산기"
      description="매수가와 손실률을 기준으로 손절 가격을 빠르게 계산할 수 있는 손절가 계산기입니다."
    >
      
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">매수가 (원)</label>
          <input
            type="text"
            value={buyPrice}
            onChange={handleChange(setBuyPrice)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 75,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">손절 기준 손실률 (%)</label>
          <input
            type="text"
            value={lossPercent}
            onChange={handleChange(setLossPercent)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 5"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2 px-4 rounded-md transition-colors"
        >
          계산하기
        </button>

        {result !== null && (
          <div className="mt-6 text-center text-gray-800 text-lg font-semibold">
            ❌ 손절가는 <span className="text-red-600">{result.toLocaleString()} 원</span>입니다.
          </div>
        )}
      </div>
      <div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 사용방법</h2>
  <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
    <li>매수가와 손절기준 손실률(%)을 입력하세요.</li>
    <li>손절가가 바로 계산되어 표시됩니다.</li>
    <li>실제 매도 시 참고할 수 있는 기준가입니다.</li>
  </ul>
</div>

<div className="mt-6">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 설명</h2>
  <p className="text-gray-700 text-base leading-relaxed">
    손절가 계산기는 매수가 대비 손절 기준 비율을 입력하면 매도 기준 가격을 계산합니다. 리스크 관리나 손절 금액 계산에 도움이 됩니다.
  </p>
</div>

    </PageLayout>
  );
}
