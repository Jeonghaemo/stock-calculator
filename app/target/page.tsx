// ✅ app/target/page.tsx
"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function TargetCalculatorPage() {
  const [buyPrice, setBuyPrice] = useState("");
  const [targetYield, setTargetYield] = useState("");
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
    const yieldRate = parseFloat(targetYield);

    if (isNaN(price) || isNaN(yieldRate)) {
      setResult(null);
      return;
    }

    const targetPrice = price * (1 + yieldRate / 100);
    setResult(targetPrice);
  };

  return (
    <PageLayout
      title="목표 수익률 계산기"
      description="매수가와 수익률을 입력하면 목표 매도가를 계산할 수 있는 목표 수익률 계산기입니다."
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
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">목표 수익률 (%)</label>
          <input
            type="text"
            value={targetYield}
            onChange={handleChange(setTargetYield)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 10"
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
            🎯 목표 매도가: <span className="text-green-600">{result.toLocaleString()} 원</span>
          </div>
        )}
      </div>
    </PageLayout>
  );
}