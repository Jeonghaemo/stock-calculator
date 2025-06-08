"use client";
import GoogleAdsense from "@/components/GoogleAdsense";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function WaterCalculatorPage() {
  const [avgPrice, setAvgPrice] = useState("");
  const [currentQty, setCurrentQty] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  const [addPrice1, setAddPrice1] = useState("");
  const [addQty1, setAddQty1] = useState("");
  const [addPrice2, setAddPrice2] = useState("");
  const [addQty2, setAddQty2] = useState("");
  const [addPrice3, setAddPrice3] = useState("");
  const [addQty3, setAddQty3] = useState("");

  const [result, setResult] = useState<{
    avg: number;
    totalQty: number;
    totalCost: number;
    currentProfit: number;
    afterProfit: number;
  } | null>(null);

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
    const cp = parseFloat(currentPrice.replace(/,/g, ""));
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
    const currentProfit = isNaN(cp) || currentP === 0 ? 0 : ((cp - currentP) / currentP) * 100;
    const afterProfit = isNaN(cp) || newAvg === 0 ? 0 : ((cp - newAvg) / newAvg) * 100;

    setResult({
      avg: newAvg,
      totalQty,
      totalCost,
      currentProfit,
      afterProfit,
    });
  };

  return (
    <PageLayout
      title="주식 물타기 계산기"
      description="현재 평단가, 수익률, 물타기 이후 예상 수익률까지 확인할 수 있습니다."
    >
      
      <div className="my-8">
        <GoogleAdsense />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">현재 주가 (원)</label>
          <input
            type="text"
            value={currentPrice}
            onChange={handleChange(setCurrentPrice)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 13,000"
          />
        </div>

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
                추가 매수가 {idx}  (원)
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
                추가 매수 수량 {idx} (주)
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
          계산하기
        </button>

        {result !== null && (
          <div className="mt-6 text-center text-gray-800 space-y-2 text-lg font-semibold">
            <p>📉 최종 평단가: <span className="text-blue-600">{result.avg.toLocaleString()} 원</span></p>
            <p>📈 현재 수익률: <span className="text-red-600">{result.currentProfit.toFixed(2)}%</span></p>
            <p>📈 물타기 후 수익률: <span className="text-green-600">{result.afterProfit.toFixed(2)}%</span></p>
            <p>총 수량: {result.totalQty.toLocaleString()} 주</p>
            <p>총 매수금액: {result.totalCost.toLocaleString()} 원</p>
          </div>
        )}

        <p className="text-base text-gray-500 mt-4 text-center">
          ※ 총 투자금액과 전체 수량을 바탕으로 평단가와 수익률을 계산합니다.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 사용방법</h2>
        <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
          <li>현재 평단가, 수량, 주가를 입력하세요.</li>
          <li>최대 3회까지 추가 매수 가격과 수량을 입력할 수 있습니다.</li>
          <li>추가 매수한 최종 평균 평단가 및 수익률이 계산됩니다.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 설명</h2>
        <p className="text-gray-700 text-base leading-relaxed">
          물타기 계산기는 여러 번의 매수에 따른 평균 매입단가뿐만 아니라 현재 수익률과 물타기 후 예상 수익률도 계산합니다. 투자 전략을 세우기 전에 참고하는 데 도움이 됩니다.
        </p>
      </div>
    </PageLayout>
  );
}
