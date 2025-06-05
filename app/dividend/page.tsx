// ✅ app/dividend/page.tsx
"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function DividendCalculatorPage() {
  const [dividend, setDividend] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [result, setResult] = useState<null | {
    yield: number;
    total: number;
  }>(null);

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
    const d = parseFloat(dividend.replace(/,/g, ""));
    const p = parseFloat(price.replace(/,/g, ""));
    const q = parseFloat(quantity.replace(/,/g, ""));

    if (isNaN(d) || isNaN(p) || isNaN(q) || p === 0 || q === 0) {
      setResult(null);
      return;
    }

    const dividendYield = (d / p) * 100;
    const totalDividend = d * q;
    setResult({ yield: dividendYield, total: totalDividend });
  };

  return (
    <PageLayout
      title="주식 배당수익률 계산기"
      description="주당 배당금과 주가, 보유 주식 수를 입력하면 배당수익률과 총 배당금을 계산합니다."
    >
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">주당 배당금 (원)</label>
          <input
            type="text"
            value={dividend}
            onChange={handleChange(setDividend)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 2,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">현재 주가 (원)</label>
          <input
            type="text"
            value={price}
            onChange={handleChange(setPrice)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 70,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">보유 주식 수 (주)</label>
          <input
            type="text"
            value={quantity}
            onChange={handleChange(setQuantity)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 100"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2 px-4 rounded-md transition-colors"
        >
          계산하기
        </button>

        {result !== null && (
          <div className="mt-6 text-center text-gray-800 text-lg font-semibold space-y-2">
            <p>📈 배당수익률: <span className="text-blue-600">{result.yield.toFixed(2)}%</span></p>
            <p>💰 총 배당금: <span className="text-green-600">{result.total.toLocaleString()} 원</span></p>
          </div>
        )}
      </div>
      <div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 사용방법</h2>
  <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
    <li>주당 배당금과 현재 주가, 보유주식 수량을 입력하면 배당수익률이 계산됩니다.</li>
    <li>배당수익률과 총 배당금을 확인할 수 있습니다.</li>
  </ul>
</div>

<div className="mt-6">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 설명</h2>
  <p className="text-gray-700 text-base leading-relaxed">
    배당수익률 계산기는 현재 주가 대비 연간 배당금의 비율을 계산합니다. 배당주식 투자자에게 유용합니다.
  </p>
</div>

    </PageLayout>
  );
}