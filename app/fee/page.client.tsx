"use client";
import GoogleAdsense from "@/components/GoogleAdsense";
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
      <div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 사용방법</h2>
  <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
    <li>매도가와 수량을 입력하세요.</li>
    <li>매수·매도 수수료율은 기본값이 설정되어 있습니다.</li>
    <li>실제 수익금과 수익률, 수수료 차감 후 금액이 자동 계산됩니다.</li>
  </ul>
</div>

<div className="mt-6">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 설명</h2>
  <p className="text-gray-700 text-base leading-relaxed">
    수수료 계산기는 주식 매매 시 발생하는 수수료를 반영하여 실제 수익을 계산합니다. 실수익률과 세후 수익을 정확하게 확인할 수 있습니다.
  </p>
</div>
<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-4">수수료 계산 공식</h2>
  <div className="text-base text-gray-700 leading-relaxed space-y-3">
    <p>
      총 거래 비용 = 매수 수수료 + 매도 수수료 + 증권거래세
    </p>
    <p className="text-sm text-gray-600">
      ※ 수수료율은 증권사마다 다를 수 있습니다. 기본 예시는 다음과 같습니다.
    </p>
    <table className="w-full text-sm text-left text-gray-700 border mt-2">
      <thead className="bg-gray-100 text-gray-800">
        <tr>
          <th className="px-4 py-2 border">항목</th>
          <th className="px-4 py-2 border">비율</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2 border">매수 수수료</td>
          <td className="px-4 py-2 border">0.015%</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border">매도 수수료</td>
          <td className="px-4 py-2 border">0.015%</td>
        </tr>
        <tr>
          <td className="px-4 py-2 border">증권거래세</td>
          <td className="px-4 py-2 border">0.20% (코스피) 또는 0.23% (코스닥)</td>
        </tr>
      </tbody>
    </table>
    <p className="font-semibold mt-4">📌 예시</p>
    <ul className="list-disc list-inside">
      <li>매수금액: 1,000,000원</li>
      <li>매도금액: 1,100,000원</li>
    </ul>
    <p>
      총 수수료 = (1,000,000 × 0.00015) + (1,100,000 × 0.00015) + (1,100,000 × 0.002)
      = 150 + 165 + 2,200 = <strong>2,515원</strong>
    </p>
  </div>
</div>
<div className="mt-8">
  <h2 className="text-lg font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
  <div className="space-y-4 text-base text-gray-700 leading-relaxed">
    <div>
      <p className="font-semibold text-gray-800">Q. 수수료는 증권사마다 다른가요?</p>
      <p>네. 대부분 기본 수수료는 0.015% 수준이지만 비대면 계좌 개설 시 무료 또는 할인되는 경우가 많습니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. 증권거래세는 꼭 납부해야 하나요?</p>
      <p>네. 매도할 때 무조건 부과됩니다. 코스피는 0.20%, 코스닥은 0.23%로 정해져 있습니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. ETF는 증권거래세가 없나요?</p>
      <p>맞습니다. 국내 상장 ETF는 증권거래세가 면제입니다. 하지만 수수료는 부과됩니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. 장기 보유하면 수수료나 세금이 줄어드나요?</p>
      <p>아닙니다. 보유 기간과 관계없이 매수, 매도 시점의 거래 금액에 따라 부과됩니다.</p>
    </div>
  </div>
</div>

    </PageLayout>
  );
}
