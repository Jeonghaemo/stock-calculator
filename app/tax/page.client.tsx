// ✅ app/tax/page.tsx
"use client";
import GoogleAdsense from "@/components/GoogleAdsense";
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

<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-2">양도소득세 계산 공식</h2>
  <p className="text-gray-700 text-base leading-relaxed">
    양도차익 = 총 매도금액 - 총 매수금액 - 필요경비<br />
    국내 소액주주는 상장 주식 장내 거래 시 양도소득세가 부과되지 않습니다.<br />
    해외주식은 연간 양도차익 250만 원을 초과하는 금액에 대해 22% 세율이 적용됩니다.
  </p>
</div>

<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-2">국내 주식 양도소득세 설명</h2>
  <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
    <li>소액주주는 장내 상장주식 거래에 대해 양도소득세 비과세</li>
    <li>대주주 기준: 1종목 10억 원 이상 보유 또는 지분율 기준(1% 코스피, 2% 코스닥)</li>
    <li>비상장주식, 장외거래는 과세 대상</li>
    <li>세율: 20% + 지방세 2% → 총 22%</li>
  </ul>
</div>

<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-2">해외 주식 양도소득세 설명</h2>
  <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
    <li>연간 250만 원 초과 양도차익에 대해 과세</li>
    <li>세율: 22% (지방세 포함)</li>
    <li>환율은 결제일 기준 환율로 환산되며, 본 계산기에는 반영되지 않음</li>
    <li>손익 통산 및 필요경비 차감 후 과세표준 계산</li>
  </ul>
</div>

<div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-2">자주 묻는 질문 (FAQ)</h2>
  <div className="space-y-4 text-base text-gray-700">
    <div>
      <strong>Q. 나는 대주주가 아닌데 세금 신고 안 해도 되나요?</strong><br />
      네. 소액주주로서 장내 상장 주식을 거래한 경우 양도소득세는 부과되지 않습니다.
    </div>
    <div>
      <strong>Q. 대주주 기준은 매수금액인가요? 보유금액인가요?</strong><br />
      종목별 <b>보유 금액(시가 기준)</b>이 기준이며, 연말 또는 매도 시점 기준으로 판단합니다.
    </div>
    <div>
      <strong>Q. 해외주식 양도차익은 어떻게 계산하나요?</strong><br />
      매도금액 - 매수금액 - 필요경비로 계산하며, 250만 원 기본공제 이후 22% 세율이 적용됩니다.
    </div>
    <div>
      <strong>Q. 양도소득세는 언제 신고하나요?</strong><br />
      <b>해외주식</b>은 다음 해 5월에 <b>종합소득세 신고</b>와 함께 신고해야 하며, <b>국내 대주주</b>는 별도로 신고합니다.
    </div>
  </div>
</div>

    </PageLayout>
  );
}


