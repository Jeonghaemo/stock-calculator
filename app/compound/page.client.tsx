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
<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-4">복리 계산 공식</h2>
  <div className="text-base text-gray-700 leading-relaxed space-y-3">
    <p>
      복리 금액 = <strong>원금 × (1 + 이자율)<sup>n</sup></strong>
    </p>
    <p className="text-sm text-gray-600">
      ※ n은 기간(년, 월 등)이며, 이자율은 소수(예: 5% → 0.05)로 입력합니다.
    </p>

    <p className="font-semibold mt-4">📌 예시</p>
    <ul className="list-disc list-inside space-y-1">
      <li>원금: 1,000,000원</li>
      <li>연 이자율: 10%</li>
      <li>기간: 3년</li>
    </ul>
    <p>
      → 복리 금액 = 1,000,000 × (1 + 0.10)<sup>3</sup> = 1,331,000원
    </p>
    <p>→ 이자 수익 = <strong>331,000원</strong></p>

    <hr className="my-6 border-gray-300" />

    <h2 className="text-lg font-bold text-gray-800 mb-4">복리와 단리 차이점</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700 border">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th className="px-4 py-2 border">구분</th>
            <th className="px-4 py-2 border">단리</th>
            <th className="px-4 py-2 border">복리</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">이자 계산</td>
            <td className="px-4 py-2 border">원금에만 이자 발생</td>
            <td className="px-4 py-2 border">원금 + 이자에 누적 적용</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">계산식</td>
            <td className="px-4 py-2 border">원금 × 이자율 × 기간</td>
            <td className="px-4 py-2 border">원금 × (1 + 이자율)<sup>n</sup></td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">특징</td>
            <td className="px-4 py-2 border">매년 같은 이자</td>
            <td className="px-4 py-2 border">시간 지날수록 이자 증가</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">예시 (10% × 3년)</td>
            <td className="px-4 py-2 border">1,300,000원</td>
            <td className="px-4 py-2 border">1,331,000원</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">차이</td>
            <td className="px-4 py-2 border">3년 후 이자 300,000원</td>
            <td className="px-4 py-2 border">3년 후 이자 331,000원</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
  <div className="space-y-4 text-base text-gray-700 leading-relaxed">
    <div>
      <p className="font-semibold text-gray-800">Q. 복리는 단리랑 뭐가 다른가요?</p>
      <p>단리는 매번 같은 이자, 복리는 이자에 이자가 붙는 구조입니다. 시간이 지날수록 차이가 커집니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. 월복리와 연복리는 어떻게 다른가요?</p>
      <p>복리 계산 시 <strong>이자가 붙는 주기(월/연)</strong>에 따라 최종 금액이 달라집니다. 월복리는 매달 불어나므로 이자가 더 큽니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. 중간에 출금하면 복리 효과는 어떻게 되나요?</p>
      <p>중간 출금 시 복리 구조가 깨지며 그 시점까지만 복리 효과가 적용됩니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. 복리로 몇 년 정도 지나야 이자 수익이 크다고 느낄 수 있나요?</p>
      <p>보통 3~5년 이상 지나야 복리의 차이가 체감됩니다. 짧은 기간은 단리와 큰 차이가 없습니다.</p>
    </div>
  </div>
</div>

    </PageLayout>
  );
}



