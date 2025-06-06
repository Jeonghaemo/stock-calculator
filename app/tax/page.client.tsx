// ✅ app/tax/page.tsx
"use client";

import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function CapitalGainTaxCalculatorPage() {
  const [activeTab, setActiveTab] = useState<"domestic" | "overseas">("domestic");

  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expense, setExpense] = useState("");

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

    if (!buy || !sell || !qty) return null;

    const totalBuy = buy * qty;
    const totalSell = sell * qty;
    const gain = totalSell - totalBuy - exp;

    if (activeTab === "domestic") {
      return {
        totalBuy,
        totalSell,
        gain,
        taxable: 0,
        tax: 0,
        message: "📢 소액주주의 상장주식 장내 거래는 양도소득세가 면제됩니다."
      };
    } else {
      const deduction = 2500000;
      const taxable = Math.max(gain - deduction, 0);
      const tax = taxable * 0.22;

      return {
        totalBuy,
        totalSell,
        gain,
        taxable,
        tax,
        message: "💡 해외주식은 연 250만 원 초과 양도차익에 대해 22% 세율이 적용됩니다."
      };
    }
  };

  const [result, setResult] = useState<ReturnType<typeof calculate> | null>(null);

  return (
    <PageLayout
      title="주식 양도소득세 계산기 (국내/해외)"
      description="국내 및 해외 주식 매매 시 양도차익에 대한 세금 여부와 세액을 계산할 수 있습니다."
    >
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 rounded-l-md border ${activeTab === "domestic" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          onClick={() => setActiveTab("domestic")}
        >
          국내주식
        </button>
        <button
          className={`px-4 py-2 rounded-r-md border ${activeTab === "overseas" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
          onClick={() => setActiveTab("overseas")}
        >
          해외주식
        </button>
      </div>

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

        <button
          onClick={() => setResult(calculate())}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2 px-4 rounded-md transition-colors"
        >
          계산하기
        </button>

        {result && (
          <div className="mt-6 text-center text-gray-800 space-y-2 text-lg font-semibold">
            <p>📦 총 매수금액: <span className="text-gray-700">₩{result.totalBuy.toLocaleString()}</span></p>
            <p>💰 총 매도금액: <span className="text-blue-600">₩{result.totalSell.toLocaleString()}</span></p>
            <p>🧾 양도차익(필요경비 반영): <span className="text-green-600">₩{result.gain.toLocaleString()}</span></p>
            {activeTab === "overseas" && (
              <>
                <p>📉 과세표준(기본공제 반영): <span className="text-red-600">₩{result.taxable.toLocaleString()}</span></p>
                <p>💸 예상 양도소득세(22%): <span className="text-red-700">₩{result.tax.toLocaleString()}</span></p>
              </>
            )}
            <p className="text-base text-gray-600 mt-2">{result.message}</p>
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 사용방법</h2>
        <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
          <li>매수/매도 가격과 수량, 필요경비를 입력합니다.</li>
          <li>국내주식은 소액주주의 상장주식 장내 거래는 양도소득세가 면제됩니다.</li>
          <li>해외주식은 250만 원 초과 양도차익에 대해 22% 세율로 계산됩니다.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 설명</h2>
        <p className="text-gray-700 text-base leading-relaxed">
          이 계산기는 국내 상장주식(소액주주)과 해외주식 거래 시 양도소득세 여부 및 예상 세액을 확인하는 데 사용할 수 있습니다.
          해외주식의 경우, 실제 환율은 결제일 기준 환율을 기준으로 하며 본 계산기에는 반영되지 않습니다.
        </p>
      </div>
    </PageLayout>
  );
}


