"use client";

import { useState } from "react";

export default function StockFeeCalculator() {
  const [sellPrice, setSellPrice] = useState(0);
  const [sellQty, setSellQty] = useState(0);
  const [result, setResult] = useState<null | {
    totalAmount: number;
    fee: number;
    tax: number;
    receive: number;
  }>(null);

  const formatNumber = (num: number) => {
    return num.toLocaleString("ko-KR");
  };

  const calculate = () => {
    const totalAmount = sellPrice * sellQty;
    const fee = Math.floor(totalAmount * 0.00015);
    const tax = Math.floor(totalAmount * 0.0018);
    const receive = totalAmount - fee - tax;

    setResult({ totalAmount, fee, tax, receive });
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">주식 수수료 계산기</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">매도 단가(원)</label>
            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">매도 수량(주)</label>
            <input
              type="number"
              value={sellQty}
              onChange={(e) => setSellQty(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700"
          >
            계산하기
          </button>

          {result && (
            <div className="mt-6 text-sm text-gray-700 space-y-2">
              <p>총 매도금액: {formatNumber(result.totalAmount)}원</p>
              <p>매도 수수료(0.015%): {formatNumber(result.fee)}원</p>
              <p>증권거래세(0.18%): {formatNumber(result.tax)}원</p>
              <p className="font-semibold">실수령액: {formatNumber(result.receive)}원</p>
            </div>
          )}

          <p className="text-base text-gray-500 mt-4 text-center">
            ※ 매도 수수료 0.015%, 증권거래세 0.18%가 자동 반영됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
