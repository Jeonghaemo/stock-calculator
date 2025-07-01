// ✅ app/losscut/page.tsx
"use client";
import GoogleAdsense from "@/components/GoogleAdsense";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function LosscutCalculatorPage() {
  const [buyPrice, setBuyPrice] = useState("");
  const [lossPercent, setLossPercent] = useState("");
  const [result, setResult] = useState<number | null>(null);

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
    const price = parseFloat(buyPrice.replace(/,/g, ""));
    const lossRate = parseFloat(lossPercent);

    if (isNaN(price) || isNaN(lossRate)) {
      setResult(null);
      return;
    }

    const stopPrice = price * (1 - lossRate / 100);
    setResult(stopPrice);
  };

  return (
    <PageLayout
      title="주식 손절가 계산기"
      description="매수가와 손실률을 기준으로 손절 가격을 빠르게 계산할 수 있는 손절가 계산기입니다."
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
        target="_blank"
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
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-32 bg-sky-100 border border-gray-300 rounded-xl shadow-md p-3 text-center transition-all duration-200 hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg active:bg-blue-100"
        >
          <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
        </a>
      ))}
    </div>
  </div>
</section>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">매수가 (원)</label>
          <input
            type="text"
            value={buyPrice}
            onChange={handleChange(setBuyPrice)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 75,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">손절 기준 손실률 (%)</label>
          <input
            type="text"
            value={lossPercent}
            onChange={handleChange(setLossPercent)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 5"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2 px-4 rounded-md transition-colors"
        >
          계산하기
        </button>

        {result !== null && (
          <div className="mt-6 text-center text-gray-800 text-lg font-semibold">
            ❌ 손절가는 <span className="text-red-600">{result.toLocaleString()} 원</span>입니다.
          </div>
        )}
      </div>
      <div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 사용방법</h2>
  <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
    <li>매수가와 손절기준 손실률(%)을 입력하세요.</li>
    <li>손절가가 바로 계산되어 표시됩니다.</li>
    <li>실제 매도 시 참고할 수 있는 기준가입니다.</li>
  </ul>
</div>

<div className="mt-6">
  <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 설명</h2>
  <p className="text-gray-700 text-base leading-relaxed">
    손절가 계산기는 매수가 대비 손절 기준 비율을 입력하면 매도 기준 가격을 계산합니다. 리스크 관리나 손절 금액 계산에 도움이 됩니다.
  </p>
</div>
<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-4">손절가 계산 공식</h2>
  <div className="text-base text-gray-700 leading-relaxed space-y-3">
    <p>
      손절가 = <strong>매수가 × (1 - 손실률 ÷ 100)</strong>
    </p>

    <p className="font-semibold mt-4">📌 예시</p>
    <ul className="list-disc list-inside space-y-1">
      <li>매수가: 50,000원</li>
      <li>손실 기준: 10%</li>
      <li>→ 손절가 = 50,000 × (1 - 10 ÷ 100) = <strong>45,000원</strong></li>
    </ul>
  </div>
</div>

<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
  <div className="space-y-4 text-base text-gray-700 leading-relaxed">
    <div>
      <p className="font-semibold text-gray-800">Q. 손절가는 꼭 설정해야 하나요?</p>
      <p>시장 상황이 급변할 수 있기 때문에 사전에 손절 기준을 정해두면 감정적인 매매를 피할 수 있습니다. 특히 초보 투자자에게는 손절 설정이 리스크 관리에 도움이 됩니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. 손절가는 얼마나로 설정하는 게 좋을까요?</p>
      <p>일반적으로 5~15% 범위 내에서 본인의 투자 성향과 종목의 변동성에 따라 설정합니다. 단기 매매일수록 좁게, 장기 투자일수록 넓게 설정하는 경우가 많습니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. 손절가에 도달하면 무조건 매도해야 하나요?</p>
      <p>반드시 그렇지는 않지만 사전에 정한 기준이라면 지키는 것이 장기적인 수익률에 도움이 됩니다. 손절 여부는 종목 상황과 전체 전략에 따라 판단하는 것이 좋습니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. 반등을 기대하고 손절을 늦추면 안 되나요?</p>
      <p>반등을 기대하며 손절을 미루는 것은 손실을 키우는 대표적인 실수입니다. 목표가와 손절가를 명확히 정하고 기준 없이 바꾸지 않는 것이 중요합니다.</p>
    </div>
  </div>
</div>

    </PageLayout>
  );
}
