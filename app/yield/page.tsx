"use client";

import { useState } from 'react';

export default function YieldCalculator() {
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [result, setResult] = useState<{
    rate: number;
    profitAmount: number;
    realProfit: number;
    realRate: number;
  } | null>(null);

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
    const buy = parseFloat(buyPrice.replace(/,/g, ''));
    const sell = parseFloat(sellPrice.replace(/,/g, ''));
    const qty = parseFloat(quantity.replace(/,/g, ''));

    if (isNaN(buy) || isNaN(sell) || isNaN(qty) || buy === 0 || qty === 0) {
      setResult(null);
      return;
    }

    const totalBuy = buy * qty;
    const totalSell = sell * qty;

    const buyFee = totalBuy * 0.00015;      // 매수 수수료
    const sellFee = totalSell * 0.00195;    // 매도 수수료 + 증권거래세
    const profit = totalSell - totalBuy;
    const realProfit = profit - buyFee - sellFee;
    const rate = (profit / totalBuy) * 100;
    const realRate = (realProfit / totalBuy) * 100;

    setResult({
      rate,
      profitAmount: profit,
      realProfit,
      realRate,
    });
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10 sm:px-10">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📈 주식 수익률 계산기</h1>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">매수가 (원)</label>
            <input
              type="text"
              value={buyPrice}
              onChange={handleChange(setBuyPrice)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="예: 50,000"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">현재가 (원)</label>
            <input
              type="text"
              value={sellPrice}
              onChange={handleChange(setSellPrice)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="예: 60,000"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">매수 수량 (주)</label>
            <input
              type="text"
              value={quantity}
              onChange={handleChange(setQuantity)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="예: 10"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2 px-4 rounded-md transition-colors"
          >
            수익 계산하기
          </button>

          <p className="text-base text-gray-500 mt-4 text-center">
            ※ 매수 수수료 0.015%, 매도 수수료 0.015%, 증권거래세 0.18%가 자동 반영됩니다.
          </p>

          {result !== null && (
            <div className="mt-6 text-center text-gray-800 space-y-2 text-lg font-semibold">
              <p>📊 수익률: <span className="text-blue-600">{result.rate.toFixed(2)}%</span></p>
              <p>💰 수익금: <span className="text-green-600">{result.profitAmount.toLocaleString()} 원</span></p>
              <p>🧾 실수익(세금·수수료 제외): <span className="text-green-700">{result.realProfit.toLocaleString()} 원</span></p>
              <p>📉 실수익률: <span className="text-red-600">{result.realRate.toFixed(2)}%</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
