// ✅ app/dividend/page.tsx
"use client";
import GoogleAdsense from "@/components/GoogleAdsense";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function DividendCalculatorPage() {
  const [dividend, setDividend] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [result, setResult] = useState<null | {
    yield: number;
    total: number;
  }>(null);

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
    const d = parseFloat(dividend.replace(/,/g, ""));
    const p = parseFloat(price.replace(/,/g, ""));
    const q = parseFloat(quantity.replace(/,/g, ""));

    if (isNaN(d) || isNaN(p) || isNaN(q) || p === 0 || q === 0) {
      setResult(null);
      return;
    }

    const dividendYield = (d / p) * 100;
    const totalDividend = d * q;
    setResult({ yield: dividendYield, total: totalDividend });
  };

  return (
    <PageLayout
      title="주식 배당수익률 계산기"
      description="국내주식, 미국주식 주당 배당금과 주가, 보유 주식 수를 입력하면 배당수익률과 총 배당금을 계산합니다."
    >
      
      <div className="space-y-4">
        <div>
          <section className="mt-0 mb-6">
  <h2 className="text-lg font-bold mb-4 text-center">주식 계산기 전체 목록</h2>

  {/* PC 이상에서 보임 - 그리드 */}
  <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
    {[
      { title: '수익률 계산기', href: '/yield' },
      { title: '수수료 계산기', href: '/fee' },
      { title: '평단가 계산기', href: '/average' },
      { title: '물타기 계산기', href: '/water' },
      { title: '양도세 계산기', href: '/tax' },
      { title: '복리 계산기', href: '/compound' },
      { title: '환율 계산기', href: '/exchange' },
      { title: '목표수익 계산기', href: '/target' },
      { title: '손절가 계산기', href: '/losscut' },
      { title: '배당수익 계산기', href: '/dividend' },
    ].map((item) => (
      <a
        key={item.href}
        href={`https://calculator.stocktrend.co.kr${item.href}`}
        rel="noopener noreferrer"
        className="bg-sky-100 border border-gray-300 rounded-xl shadow-md p-4 text-center min-w-[68px] transition-all duration-200 hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg active:bg-blue-100"
      >
        <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
      </a>
    ))}
  </div>

  {/* 모바일에서 보임 - 가로 스크롤 슬라이더 */}
  <div className="sm:hidden overflow-x-auto no-scrollbar">
    <div className="flex space-x-3 px-2">
      {[
        { title: '수익률 계산기', href: '/yield' },
        { title: '수수료 계산기', href: '/fee' },
        { title: '평단가 계산기', href: '/average' },
        { title: '물타기 계산기', href: '/water' },
        { title: '양도세 계산기', href: '/tax' },
        { title: '복리 계산기', href: '/compound' },
        { title: '환율 계산기', href: '/exchange' },
        { title: '목표수익 계산기', href: '/target' },
        { title: '손절가 계산기', href: '/losscut' },
        { title: '배당수익 계산기', href: '/dividend' },
      ].map((item) => (
        <a
          key={item.href}
          href={`https://calculator.stocktrend.co.kr${item.href}`}
          rel="noopener noreferrer"
          className="flex-shrink-0 w-32 bg-sky-100 border border-gray-300 rounded-xl shadow-md p-3 text-center transition-all duration-200 hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg active:bg-blue-100"
        >
          <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
        </a>
      ))}
    </div>
  </div>
</section>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">주당 배당금 (원)</label>
          <input
            type="text"
            value={dividend}
            onChange={handleChange(setDividend)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 2,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">현재 주가 (원)</label>
          <input
            type="text"
            value={price}
            onChange={handleChange(setPrice)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 70,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">보유 주식 수 (주)</label>
          <input
            type="text"
            value={quantity}
            onChange={handleChange(setQuantity)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 100"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2 px-4 rounded-md transition-colors"
        >
          계산하기
        </button>

        {result !== null && (
          <div className="mt-6 text-center text-gray-800 text-lg font-semibold space-y-2">
            <p>📈 배당수익률: <span className="text-blue-600">{result.yield.toFixed(2)}%</span></p>
            <p>💰 총 배당금: <span className="text-green-600">{result.total.toLocaleString()} 원</span></p>
          </div>
        )}
      </div>
      <div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 사용방법</h2>
  <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
    <li>주당 배당금과 현재 주가, 보유주식 수량을 입력하면 배당수익률이 계산됩니다.</li>
    <li>배당수익률과 총 배당금을 확인할 수 있습니다.</li>
  </ul>
</div>

<div className="mt-6">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 설명</h2>
  <p className="text-gray-700 text-base leading-relaxed">
    배당수익률 계산기는 현재 주가 대비 연간 배당금의 비율을 계산합니다. 배당주식 투자자에게 유용합니다.
  </p>
</div>

<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-2">배당수익률 계산 공식</h2>
  <p className="text-gray-700 text-base leading-relaxed">
    배당수익률(%) = (1주당 배당금 ÷ 주가) × 100
  </p>
  <div className="mt-4 text-gray-700 text-base">
    <p className="font-semibold">📌 예시</p>
    <p className="mt-1">현재 주가: 40,000원</p>
    <p>1주당 배당금: 2,000원</p>
    <p className="mt-1">→ 배당수익률 = (2,000 ÷ 40,000) × 100 = 5%</p>
  </div>
</div>

<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-2">배당소득 세금 안내</h2>

  <div className="mb-6">
    <h3 className="text-md font-semibold text-gray-700 mb-1">국내 주식</h3>
    <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
      <li>배당소득에 대해 <strong>15.4%</strong>의 세금이 원천징수됩니다 (소득세 14% + 지방소득세 1.4%).</li>
      <li>별도 신고는 필요하지 않으며 세금은 배당 지급 시 자동 차감됩니다.</li>
      <li>단, 연간 금융소득(이자+배당)이 <strong>2,000만 원 초과</strong> 시 종합과세 대상입니다.</li>
    </ul>
  </div>

  <div>
    <h3 className="text-md font-semibold text-gray-700 mb-1">미국 주식</h3>
    <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
      <li>미국 배당에는 <strong>15%</strong>의 세금이 미국에서 원천징수됩니다.</li>
      <li>한국과 미국의 조세조약에 따라 <strong>국내에서는 추가 과세되지 않습니다.</strong></li>
      <li>마찬가지로 연간 금융소득이 <strong>2,000만 원 초과</strong>하면 종합소득세 대상이 됩니다.</li>
    </ul>
  </div>
</div>

<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-2"> 자주 묻는 질문 (FAQ)</h2>
  <div className="text-gray-700 text-base space-y-4">
    <div>
      <p className="font-semibold">Q. 배당수익률이 높으면 좋은 건가요?</p>
      <p>높을수록 투자자 입장에선 유리할 수 있지만 일시적인 배당 증가나 주가 급락으로 인한 착시일 수도 있습니다.</p>
    </div>
    <div>
      <p className="font-semibold">Q. 배당금은 언제 받을 수 있나요?</p>
      <p>배당 기준일에 주식을 보유하고 있어야 하며 실제 지급은 통상 1~2개월 후 이뤄집니다.</p>
    </div>
    <div>
      <p className="font-semibold">Q. 모든 기업이 배당을 하나요?</p>
      <p>아닙니다. 배당은 회사의 이익 배분 결정에 따라 다르며 성장 중인 기업은 배당하지 않는 경우도 많습니다.</p>
    </div>
    <div>
      <p className="font-semibold">Q. 배당금에도 세금이 붙나요?</p>
      <p>네. 국내 상장주식 배당소득에는 15.4%의 배당소득세가 원천징수됩니다.</p>
    </div>
  </div>
</div>

    </PageLayout>
  );
}