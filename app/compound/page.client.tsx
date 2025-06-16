"use client";
import GoogleAdsense from "@/components/GoogleAdsense";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function CompoundCalculatorPage() {
  const [activeTab, setActiveTab] = useState("basic");

  const [principal, setPrincipal] = useState("");
  const [monthlyPrincipal, setMonthlyPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [periodType, setPeriodType] = useState("year");
  const [periodValue, setPeriodValue] = useState("");
  const [compoundType, setCompoundType] = useState("annual");

  const [result, setResult] = useState<{
    total: number;
    interest: number;
    principal: number;
    schedule: { period: number; principal: number; interest: number; total: number }[];
    rateOfReturn: number;
  } | null>(null);

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  if (!/^(\d+(\.\d{0,4})?)?$/.test(value)) return;
  setRate(value);
};

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/,/g, "");
      if (!/^[0-9]*\.?[0-9]*$/.test(raw)) return;
      const num = parseFloat(raw);
      if (isNaN(num)) {
        setter("");
      } else {
        setter(num.toLocaleString("ko-KR"));
      }
    };

  const parseNumber = (value: string) => parseFloat(value.replace(/,/g, "")) || 0;
  const formatNumber = (value: number) => value.toLocaleString("ko-KR");

  const getCompoundFrequency = (type: string) => {
    switch (type) {
      case "semiannual": return 2;
      case "quarterly": return 4;
      case "monthly": return 12;
      case "daily": return 365;
      default: return 1;
    }
  };

  const calculate = () => {
    const P = parseNumber(principal);
    const MP = parseNumber(monthlyPrincipal);
    const r = parseFloat(rate) / 100 || 0;
    const period = parseNumber(periodValue);
    const n = getCompoundFrequency(compoundType);
    const t = periodType === "month" ? period / 12 : period;
    const totalPeriods = activeTab === "basic" ? Math.round(n * t) : Math.round(t * 12);

    let futureValue = 0;
    let balance = P;
    let schedule: { period: number; principal: number; interest: number; total: number }[] = [];

    for (let i = 1; i <= totalPeriods; i++) {
      if (activeTab === "saving") {
        balance += MP;
      }

      const interest = balance * (r / (activeTab === "saving" ? 12 : n));
      balance += interest;

      schedule.push({
        period: i,
        principal: Math.round(balance - interest),
        interest: Math.round(interest),
        total: Math.round(balance),
      });
    }

    futureValue = balance;
    const totalPrincipal = activeTab === "saving" ? P + MP * totalPeriods : P;
    const interestEarned = futureValue - totalPrincipal;
    const rateOfReturn = (interestEarned / totalPrincipal) * 100;

    setResult({
      total: futureValue,
      interest: interestEarned,
      principal: totalPrincipal,
      schedule,
      rateOfReturn,
    });
  };

  return (
    <PageLayout
      title="복리 계산기"
      description="기본 복리와 적립식 복리를 계산할 수 있습니다."
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("basic")}
            className={`flex-1 py-2 rounded ${activeTab === "basic" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            기본 복리
          </button>
          <button
            onClick={() => setActiveTab("saving")}
            className={`flex-1 py-2 rounded ${activeTab === "saving" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            적립식 복리
          </button>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">초기 금액 (원)</label>
          <input
            type="text"
            value={principal}
            onChange={handleChange(setPrincipal)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 100,000"
          />
        </div>

        {activeTab === "saving" && (
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-[16px]">매월 적립 금액 (원)</label>
            <input
              type="text"
              value={monthlyPrincipal}
              onChange={handleChange(setMonthlyPrincipal)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="예: 100,000"
            />
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">투자 기간 단위 선택</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="year"
                checked={periodType === "year"}
                onChange={() => setPeriodType("year")}
              />
              <span>년</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="month"
                checked={periodType === "month"}
                onChange={() => setPeriodType("month")}
              />
              <span>개월</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">
            {periodType === "year" ? "투자 기간 (년)" : "투자 기간 (개월)"}
          </label>
          <input
            type="text"
            value={periodValue}
            onChange={handleChange(setPeriodValue)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder={periodType === "year" ? "예: 3" : "예: 36"}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">이자율 (%)</label>
          <input
            type="text"
            value={rate}
            onChange={handleRateChange} // ✅ 이렇게 바꿔주세요
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 5.25"
            />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">복리 방식</label>
          <select
            value={compoundType}
            onChange={(e) => setCompoundType(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="annual">연복리</option>
            <option value="semiannual">반기복리</option>
            <option value="quarterly">분기복리</option>
            <option value="monthly">월복리</option>
            <option value="daily">일복리</option>
          </select>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2 px-4 rounded-md transition-colors"
        >
          계산하기
        </button>

        {result !== null && (
          <div className="mt-6 text-center text-gray-800 space-y-2 text-lg font-semibold">
            <p>총 수익: <span className="text-green-600">₩{formatNumber(Math.round(result.interest))}</span></p>
            <p>최종 금액: <span className="text-blue-600">₩{formatNumber(Math.round(result.total))}</span></p>
            <p>총 투자금: <span className="text-gray-700">₩{formatNumber(Math.round(result.principal))}</span></p>
            <p>수익률: <span className="text-red-600">{result.rateOfReturn.toFixed(2)}%</span></p>
          </div>
        )}

        {result !== null && Array.isArray(result.schedule) && result.schedule.length > 0 && (

          <div className="mt-8">
            <h3 className="text-md font-bold mb-2">{activeTab === "basic" ? "복리 스케줄" : "월별 스케줄"}</h3>
            <table className="w-full text-sm text-left border border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2">{activeTab === "basic" ? "회차" : "월"}</th>
                  <th className="border px-3 py-2">원금 (₩)</th>
                  <th className="border px-3 py-2">수익 (₩)</th>
                  <th className="border px-3 py-2">최종 금액 (₩)</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row) => (
                  <tr key={row.period} className="hover:bg-gray-50">
                    <td className="border px-3 py-2 text-center">{row.period}</td>
                    <td className="border px-3 py-2 text-right">{formatNumber(row.principal)}</td>
                    <td className="border px-3 py-2 text-right">+{formatNumber(row.interest)}</td>
                    <td className="border px-3 py-2 text-right">{formatNumber(row.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-base text-gray-500 mt-4 text-center">
          ※ 복리 이자율은 선택한 방식(연, 반기, 분기, 월, 일)에 따라 계산됩니다.
        </p>
      </div>
      <div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 사용방법</h2>
  <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
    <li>초기 금액, 기간(년,월), 연이율(%)을 입력하세요.</li>
    <li>기본 복리와 적립식 복리 방식으로 누적 수익을 계산할 수 있습니다.</li>
    <li>계산하기 버튼을 누르면 총 투자금과 수익, 월별 스케줄표를 확인할 수 있습니다.</li>
  </ul>
</div>

<div className="mt-6">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 설명</h2>
  <p className="text-gray-700 text-base leading-relaxed">
    복리 계산기는 일정 수익률로 매년 재투자했을 때 자산이 얼마나 늘어나는지를 계산합니다. 장기 투자 수익 시뮬레이션에 유용하게 활용할 수 있습니다.
  </p>
</div>

    </PageLayout>
  );
}



