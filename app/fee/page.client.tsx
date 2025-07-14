"use client";
import GoogleAdsense from "@/components/GoogleAdsense";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function FeeCalculatorPage() {
  const [activeTab, setActiveTab] = useState<"domestic" | "us">("domestic");
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [qty, setQty] = useState('');
  const [result, setResult] = useState<null | {
    totalBuy: number;
    totalSell: number;
    buyFee: number;
    sellFee: number;
    tax: number;
    profit: number;
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
      if (!/^\d*(\.\d*)?$/.test(raw)) return;
      setter(formatNumber(raw));
    };

  const calculate = () => {
    const buy = parseFloat(buyPrice.replace(/,/g, ''));
    const sell = parseFloat(sellPrice.replace(/,/g, ''));
    const count = parseFloat(qty.replace(/,/g, ''));
    if (isNaN(buy) || isNaN(sell) || isNaN(count) || buy === 0 || sell === 0 || count === 0) {
      setResult(null);
      return;
    }

    const totalBuy = buy * count;
    const totalSell = sell * count;

    let buyFeeRate = 0.00015;
    let sellFeeRate = 0.00015;
    let taxRate = 0.002;

    if (activeTab === "us") {
      buyFeeRate = 0.0025; // 미국 주식 수수료 예시
      sellFeeRate = 0.0025;
      taxRate = 0.0000; // 증권거래세 없음
    }

    const buyFee = Math.floor(totalBuy * buyFeeRate);
    const sellFee = Math.floor(totalSell * sellFeeRate);
    const tax = Math.floor(totalSell * taxRate);

    const profit = totalSell - totalBuy - buyFee - sellFee - tax;
    const receive = totalSell - sellFee - tax;

    setResult({
      totalBuy,
      totalSell,
      buyFee,
      sellFee,
      tax,
      profit,
      receive,
    });
  };

  return (
    <PageLayout
      title="주식 수수료 및 수익 계산기 (국내/미국)"
      description="매수, 매도 금액과 수량을 입력해 전체 수익과 수수료, 세금을 계산해보세요."
    >
      
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 rounded-l-md border ${activeTab === "domestic" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          onClick={() => setActiveTab("domestic")}
        >
          국내주식
        </button>
        <button
          className={`px-4 py-2 rounded-r-md border ${activeTab === "us" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          onClick={() => setActiveTab("us")}
        >
          미국주식
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">매수 단가 (원)</label>
          <input
            type="text"
            value={buyPrice}
            onChange={handleChange(setBuyPrice)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 70,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">매도 단가 (원)</label>
          <input
            type="text"
            value={sellPrice}
            onChange={handleChange(setSellPrice)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 75,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">수량 (주)</label>
          <input
            type="text"
            value={qty}
            onChange={handleChange(setQty)}
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

        {result && (
          <div className="mt-6 text-center text-gray-800 text-lg font-semibold space-y-2">
            <p>📦 총 매수금액: <span className="text-gray-700">{result.totalBuy.toLocaleString()} 원</span></p>
            <p>💰 총 매도금액: <span className="text-blue-600">{result.totalSell.toLocaleString()} 원</span></p>
            <p>🔻 매수 수수료: <span className="text-red-500">{result.buyFee.toLocaleString()} 원</span></p>
            <p>🔻 매도 수수료: <span className="text-red-500">{result.sellFee.toLocaleString()} 원</span></p>
            <p>🧾 세금: <span className="text-red-600">{result.tax.toLocaleString()} 원</span></p>
            <p>💵 실수령액(세후): <span className="text-green-600">{result.receive.toLocaleString()} 원</span></p>
            <p>📈 총 수익(수수료+세금 반영): <span className="text-green-700">{result.profit.toLocaleString()} 원</span></p>
          </div>
        )}
      </div>

<div className="mt-6">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 설명</h2>
  <p className="text-gray-700 text-base leading-relaxed">
    수수료 계산기는 주식 매매 시 발생하는 수수료를 반영하여 실제 수익을 계산합니다. 실수익률과 세후 수익을 정확하게 확인할 수 있습니다.
  </p>
  </div>
<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-4">수수료 계산 공식</h2>
  <div className="text-base text-gray-700 leading-relaxed space-y-6">

    {/* 국내 주식 */}
    <div>
      <h3 className="font-semibold text-gray-800 text-base mb-2">국내 주식</h3>
      <p>
        총 거래 비용 = <b>매수 수수료 + 매도 수수료 + 증권거래세</b>
      </p>
      <p className="text-sm text-gray-600">
        ※ 증권사마다 수수료율이 다를 수 있으며, 아래는 일반적인 기준입니다.
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

    {/* 미국 주식 */}
    <div>
      <h3 className="font-semibold text-gray-800 text-base mb-2">미국 주식</h3>
      <p>
        총 거래 비용 = <b>매수 수수료 + 매도 수수료 + SEC Fee</b>
      </p>
      <p className="text-sm text-gray-600">
        ※ 환전 수수료, 유관기관 수수료 등은 별도이며, 여기에 포함되지 않습니다.
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
            <td className="px-4 py-2 border">0.25%</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">매도 수수료</td>
            <td className="px-4 py-2 border">0.25%</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">SEC Fee</td>
            <td className="px-4 py-2 border">0.0008% (매도금액 기준)</td>
          </tr>
        </tbody>
      </table>
      <p className="font-semibold mt-4">📌 예시</p>
      <ul className="list-disc list-inside">
        <li>매수금액: $1,000</li>
        <li>매도금액: $1,200</li>
      </ul>
      <p>
        총 수수료 = (1,000 × 0.0025) + (1,200 × 0.0025) + (1,200 × 0.000008)
        = 2.5 + 3 + 0.0096 = <strong>$5.5096</strong>
      </p>
    </div>

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
