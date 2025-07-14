// ✅ app/target/page.tsx
"use client";
import GoogleAdsense from "@/components/GoogleAdsense";
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
      title="주식 목표 수익률 계산기"
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
      <div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 사용방법</h2>
  <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
    <li>매수가와 목표 수익률(%)을 입력하세요.</li>
    <li>목표 수익률에 해당하는 목표 매도가가 계산됩니다.</li>
  </ul>
</div>

<div className="mt-6">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 설명</h2>
  <p className="text-gray-700 text-base leading-relaxed">
    목표 수익률 계산기는 설정한 수익률에 도달하기 위해 필요한 매도가를 계산합니다. 목표가 설정이나 분할매도 시점 판단에 활용할 수 있습니다.
  </p>
</div>
<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-4"> 목표 수익률 계산 공식</h2>
  <div className="text-base text-gray-700 leading-relaxed space-y-3">
    <p>
      목표 매도가 = <strong>매수가 × (1 + 목표 수익률 ÷ 100)</strong>
    </p>

    <p className="font-semibold mt-4">📌 예시</p>
    <ul className="list-disc list-inside space-y-1">
      <li>매수가: 50,000원</li>
      <li>목표 수익률: 20%</li>
      <li>→ 목표 매도가 = 50,000 × (1 + 20 ÷ 100) = <strong>60,000원</strong></li>
    </ul>
  </div>
</div>

<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
  <div className="space-y-4 text-base text-gray-700 leading-relaxed">
    <div>
      <p className="font-semibold text-gray-800">Q. 목표 수익률은 어느 정도가 적당한가요?</p>
      <p>개인의 투자 성향에 따라 다르지만 일반적으로 단기 3~10%, 중기 10~30% 사이의 목표 수익률을 설정하는 것이 일반적입니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. 목표가에 도달하면 무조건 매도하는 게 좋을까요?</p>
      <p>시장 상황이나 종목 흐름에 따라 유연하게 판단해야 합니다. 사전에 계획한 목표가에 도달하면 매도하거나 분할 매도하는 방법도 있습니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. 수수료나 세금은 고려하지 않아도 되나요?</p>
      <p>현재 계산기는 목표 수익률 기준의 매도가만 계산합니다. 실제 매도 시에는 수수료, 세금이 차감되므로 다소 차이가 발생할 수 있습니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. 역으로 목표 매도가가 있을 때, 수익률을 계산할 수 있나요?</p>
      <p>네. 일반 수익률 계산기를 이용하면 해당 매도 기준으로 수익률을 확인할 수 있습니다.</p>
    </div>
  </div>
</div>

    </PageLayout>
  );
}