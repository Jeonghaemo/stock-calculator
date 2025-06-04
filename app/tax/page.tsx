// ✅ app/tax/page.tsx
"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function CapitalGainTaxCalculatorPage() {
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expense, setExpense] = useState("");
  const [deduction, setDeduction] = useState("2,500,000");
  const [result, setResult] = useState<null | {
    totalBuy: number;
    totalSell: number;
    gain: number;
    taxable: number;
    tax: number;
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

  const parseNumber = (value: string) => parseFloat(value.replace(/,/g, "")) || 0;

  const calculate = () => {
    const buy = parseNumber(buyPrice);
    const sell = parseNumber(sellPrice);
    const qty = parseNumber(quantity);
    const exp = parseNumber(expense);
    const ded = parseNumber(deduction);

    if (!buy || !sell || !qty) {
      setResult(null);
      return;
    }

    const totalBuy = buy * qty;
    const totalSell = sell * qty;
    const gain = totalSell - totalBuy - exp;
    const taxable = Math.max(gain - ded, 0);
    const tax = taxable * 0.22; // 22% 기본세율 가정

    setResult({ totalBuy, totalSell, gain, taxable, tax });
  };

  return (
    <PageLayout
      title="양도소득세 계산기"
      description="주식 매수/매도 정보와 필요경비, 공제를 입력하면 예상 양도소득세를 계산합니다."
    >
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">매수가 (원)</label>
          <input
            type="text"
            value={buyPrice}
            onChange={handleChange(setBuyPrice)}
            className="w-full border border-gray-300 bg-gray-50 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 75,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">매도가 (원)</label>
          <input
            type="text"
            value={sellPrice}
            onChange={handleChange(setSellPrice)}
            className="w-full border border-gray-300 bg-gray-50 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 100,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">수량 (주)</label>
          <input
            type="text"
            value={quantity}
            onChange={handleChange(setQuantity)}
            className="w-full border border-gray-300 bg-gray-50 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 10"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">필요경비 (원)</label>
          <input
            type="text"
            value={expense}
            onChange={handleChange(setExpense)}
            className="w-full border border-gray-300 bg-gray-50 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 50,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">기본공제 (원)</label>
          <input
            type="text"
            value={deduction}
            onChange={handleChange(setDeduction)}
            className="w-full border border-gray-300 bg-gray-50 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 2,500,000"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2 px-4 rounded-md transition-colors"
        >
          계산하기
        </button>

        {result && (
          <div className="mt-6 text-center text-gray-800 space-y-2 text-lg font-semibold">
            <p>📦 총 매수금액: <span className="text-gray-700">₩{result.totalBuy.toLocaleString()}</span></p>
            <p>💰 총 매도금액: <span className="text-blue-600">₩{result.totalSell.toLocaleString()}</span></p>
            <p>🧾 양도차익(필요경비 반영): <span className="text-green-600">₩{result.gain.toLocaleString()}</span></p>
            <p>📉 과세표준(기본공제 반영): <span className="text-red-600">₩{result.taxable.toLocaleString()}</span></p>
            <p>💸 예상 양도소득세(22%): <span className="text-red-700">₩{result.tax.toLocaleString()}</span></p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

