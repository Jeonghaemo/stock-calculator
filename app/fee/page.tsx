"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function FeeCalculatorPage() {
  const [sellPrice, setSellPrice] = useState('');
  const [sellQty, setSellQty] = useState('');
  const [result, setResult] = useState<null | {
    totalAmount: number;
    fee: number;
    tax: number;
    receive: number;
  }>(null);

  const formatNumber = (value: string) => {
    const num = parseFloat(value.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString();
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/,/g, '');
      if (!/^\d*$/.test(raw)) return;
      setter(formatNumber(raw));
    };

  const calculate = () => {
    const price = parseFloat(sellPrice.replace(/,/g, ''));
    const qty = parseFloat(sellQty.replace(/,/g, ''));

    if (isNaN(price) || isNaN(qty) || price === 0 || qty === 0) {
      setResult(null);
      return;
    }

    const totalAmount = price * qty;
    const fee = Math.floor(totalAmount * 0.00015);
    const tax = Math.floor(totalAmount * 0.0018);
    const receive = totalAmount - fee - tax;

    setResult({ totalAmount, fee, tax, receive });
  };

  return (
    <PageLayout
      title="주식 수수료 계산기"
      description="매도 단가와 수량을 입력하면 수수료와 세금을 뺀 실수령액을 계산합니다."
    >
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">매도 단가 (원)</label>
          <input
            type="text"
            value={sellPrice}
            onChange={handleChange(setSellPrice)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 70,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">매도 수량 (주)</label>
          <input
            type="text"
            value={sellQty}
            onChange={handleChange(setSellQty)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 20"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2 px-4 rounded-md transition-colors"
        >
          계산하기
        </button>

        <p className="text-base text-gray-500 mt-4 text-center">
          ※ 매도 수수료 0.015%, 증권거래세 0.18%가 자동 반영됩니다.
        </p>

        {result && (
          <div className="mt-6 text-center text-gray-800 text-lg font-semibold space-y-2">
            <p>📦 총 매도금액: <span className="text-blue-600">{result.totalAmount.toLocaleString()} 원</span></p>
            <p>💸 매도 수수료(0.015%): <span className="text-red-500">{result.fee.toLocaleString()} 원</span></p>
            <p>🧾 증권거래세(0.18%): <span className="text-red-600">{result.tax.toLocaleString()} 원</span></p>
            <p>💰 실수령액: <span className="text-green-600">{result.receive.toLocaleString()} 원</span></p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
