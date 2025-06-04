"use client";

import { useState } from "react";
import ExchangeResult from "./ExchangeResult";

const currencies = [
  { code: "USD", label: "미국 달러" },
  { code: "KRW", label: "대한민국 원" },
  { code: "EUR", label: "유로" },
  { code: "JPY", label: "일본 엔" },
  { code: "CNY", label: "중국 위안" },
  { code: "GBP", label: "영국 파운드" },
  { code: "AUD", label: "호주 달러" },
  { code: "CAD", label: "캐나다 달러" },
  { code: "SGD", label: "싱가포르 달러" },
  { code: "THB", label: "태국 바트" },
  { code: "PHP", label: "필리핀 페소" },
  { code: "VND", label: "베트남 동" },
  { code: "IDR", label: "인도네시아 루피아" },
];

export default function ExchangeForm() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("KRW");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setResult(null);
  };

  const handleConvert = async () => {
    try {
      setError("");
      const value = parseFloat(amount.replace(/,/g, ""));
      if (isNaN(value)) {
        setError("숫자를 정확히 입력해주세요.");
        return;
      }

      const res = await fetch(
        `/api/exchange?from=${fromCurrency}&to=${toCurrency}&amount=${value}`
      );
      const data = await res.json();

      if (!data || !data.result) {
        throw new Error("API 응답이 유효하지 않습니다.");
      }

      setResult(data.result);
    } catch (err) {
      setError("환율 정보를 불러오는 데 문제가 발생했습니다.");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={amount}
        onChange={(e) =>
          setAmount(
            e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          )
        }
        placeholder="금액 입력"
        className="w-full border rounded px-4 py-2"
      />

      <div className="flex gap-2 items-center">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="flex-1 border rounded px-4 py-2"
        >
          {currencies.map((cur) => (
            <option key={cur.code} value={cur.code}>
              {cur.label} ({cur.code})
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleSwap}
          className="px-2 py-1 border rounded hover:bg-gray-100"
          title="통화 바꾸기"
        >
          ↔
        </button>

        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="flex-1 border rounded px-4 py-2"
        >
          {currencies.map((cur) => (
            <option key={cur.code} value={cur.code}>
              {cur.label} ({cur.code})
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleConvert}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        환율 계산하기
      </button>

      {error && <div className="text-red-600">{error}</div>}

      {result !== null && (
        <ExchangeResult result={result} toCurrency={toCurrency} />
      )}
    </div>
  );
}