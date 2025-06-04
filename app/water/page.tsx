"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function WaterCalculatorPage() {
  const [avgPrice, setAvgPrice] = useState("");
  const [currentQty, setCurrentQty] = useState("");

  const [addPrice1, setAddPrice1] = useState("");
  const [addQty1, setAddQty1] = useState("");
  const [addPrice2, setAddPrice2] = useState("");
  const [addQty2, setAddQty2] = useState("");
  const [addPrice3, setAddPrice3] = useState("");
  const [addQty3, setAddQty3] = useState("");

  const [result, setResult] = useState<number | null>(null);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/,/g, "");
      if (!/^\d*$/.test(raw)) return;
      const num = parseFloat(raw);
      if (isNaN(num)) {
        setter("");
      } else {
        setter(num.toLocaleString());
      }
    };

  const calculate = () => {
    const currentP = parseFloat(avgPrice.replace(/,/g, ""));
    const currentQ = parseFloat(currentQty.replace(/,/g, ""));

    const ap1 = parseFloat(addPrice1.replace(/,/g, ""));
    const aq1 = parseFloat(addQty1.replace(/,/g, ""));
    const ap2 = parseFloat(addPrice2.replace(/,/g, ""));
    const aq2 = parseFloat(addQty2.replace(/,/g, ""));
    const ap3 = parseFloat(addPrice3.replace(/,/g, ""));
    const aq3 = parseFloat(addQty3.replace(/,/g, ""));

    if (isNaN(currentP) || isNaN(currentQ) || currentQ === 0) {
      setResult(null);
      return;
    }

    const totalCost = currentP * currentQ + (ap1 * aq1 || 0) + (ap2 * aq2 || 0) + (ap3 * aq3 || 0);
    const totalQty = currentQ + (aq1 || 0) + (aq2 || 0) + (aq3 || 0);

    if (totalQty === 0) {
      setResult(null);
      return;
    }

    const newAvg = totalCost / totalQty;
    setResult(newAvg);
  };

  return (
    <PageLayout
      title="주식 물타기 계산기"
      description="현재 평단가와 수량, 추가 매수 조건을 입력하면 새로운 평단가를 계산합니다."
    >
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">현재 평단가 (원)</label>
          <input
            type="text"
            value={avgPrice}
            onChange={handleChange(setAvgPrice)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 15,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">현재 보유 수량 (주)</label>
          <input
            type="text"
            value={currentQty}
            onChange={handleChange(setCurrentQty)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 20"
          />
        </div>

        {[1, 2, 3].map((idx) => (
          <div key={idx} className="flex gap-2">
            <div className="w-1/2">
              <label className="block mb-1 font-medium text-gray-700 text-[16px]">
                추가 {idx} 매수가 (원)
              </label>
              <input
                type="text"
                value={eval(`addPrice${idx}`)}
                onChange={handleChange(eval(`setAddPrice${idx}`))}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="예: 13,000"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-medium text-gray-700 text-[16px]">
                추가 {idx} 수량 (주)
              </label>
              <input
                type="text"
                value={eval(`addQty${idx}`)}
                onChange={handleChange(eval(`setAddQty${idx}`))}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="예: 10"
              />
            </div>
          </div>
        ))}

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2 px-4 rounded-md transition-colors"
        >
          평단가 계산하기
        </button>

        {result !== null && (
          <div className="mt-6 text-center text-gray-800 space-y-2 text-lg font-semibold">
            <p>📉 평단가: <span className="text-blue-600">{result.toLocaleString()} 원</span></p>
          </div>
        )}

        <p className="text-base text-gray-500 mt-4 text-center">
          ※ 총 투자금액과 전체 수량을 바탕으로 새로운 평단가를 계산합니다.
        </p>
      </div>
    </PageLayout>
  );
}
