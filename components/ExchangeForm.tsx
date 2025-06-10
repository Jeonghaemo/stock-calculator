"use client";

import { useState } from "react";
import ExchangeResult from "./ExchangeResult";
import GoogleAdsense from "@/components/GoogleAdsense";

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
  { code: "HKD", label: "홍콩 달러" },
  { code: "TWD", label: "대만 달러" },
  { code: "MYR", label: "말레이시아 링깃" },
  { code: "NZD", label: "뉴질랜드 달러" },
  { code: "INR", label: "인도 루피" },
  { code: "CHF", label: "스위스 프랑" },
  { code: "RUB", label: "러시아 루블" },
  { code: "MXN", label: "멕시코 페소" },
  { code: "BRL", label: "브라질 헤알" },
  { code: "TRY", label: "터키 리라" },
  { code: "SAR", label: "사우디 리얄" },
  { code: "AED", label: "아랍에미리트 디르함" },
  { code: "ZAR", label: "남아프리카 랜드" },
  { code: "DKK", label: "덴마크 크로네" },
  { code: "SEK", label: "스웨덴 크로나" },
  { code: "NOK", label: "노르웨이 크로네" },
  { code: "PLN", label: "폴란드 즈워티" },
  { code: "CZK", label: "체코 코루나" },
  { code: "HUF", label: "헝가리 포린트" },
  { code: "ILS", label: "이스라엘 셰켈" },
  { code: "EGP", label: "이집트 파운드" },
  { code: "PKR", label: "파키스탄 루피" },
  { code: "BDT", label: "방글라데시 타카" },
  { code: "KZT", label: "카자흐스탄 텡게" },
  { code: "UAH", label: "우크라이나 흐리우냐" },
  { code: "NGN", label: "나이지리아 나이라" },
  { code: "ARS", label: "아르헨티나 페소" },
  { code: "CLP", label: "칠레 페소" },
  { code: "MOP", label: "마카오 파타카" },
  { code: "KHR", label: "캄보디아 리엘" },
  { code: "LAK", label: "라오스 킵" },
  { code: "MMK", label: "미얀마 짯" },
  { code: "RON", label: "루마니아 레우" },
  { code: "IQD", label: "이라크 디나르" },
  { code: "KWD", label: "쿠웨이트 디나르" },
  { code: "QAR", label: "카타르 리얄" },
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

      const res = await fetch(`/api/exchange?from=${fromCurrency}&to=${toCurrency}&amount=${value}`);
const data = await res.json();


      
     if (!data || typeof data.result !== "number") {
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
        className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-4 py-2"
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
          className="sm:self-center px-3 py-2 border rounded hover:bg-gray-100 text-lg"
          title="통화 바꾸기"
        >
          ↔
        </button>

        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-4 py-2"
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
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-base font-semibold"
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
