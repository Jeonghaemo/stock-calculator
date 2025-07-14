"use client";
import GoogleAdsense from "@/components/GoogleAdsense";
import { useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function AverageCalculatorPage() {
  const [originalPrice, setOriginalPrice] = useState('');
  const [originalQty, setOriginalQty] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [adds, setAdds] = useState([
    { price: '', qty: '' },
    { price: '', qty: '' },
    { price: '', qty: '' },
  ]);

  const [result, setResult] = useState<{
    average: number;
    totalQty: number;
    totalCost: number;
    profit: number;
  } | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const formatNumber = (value: string) => {
    const num = parseFloat(value.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString("ko-KR");
  };

  const handleChange = (
    index: number,
    field: "price" | "qty",
    value: string
  ) => {
    const raw = value.replace(/,/g, '');
    if (!/^\d*$/.test(raw)) return;
    const updated = [...adds];
    updated[index][field] = formatNumber(raw);
    setAdds(updated);
  };

  const calculate = () => {
    const originalP = parseFloat(originalPrice.replace(/,/g, ''));
    const originalQ = parseFloat(originalQty.replace(/,/g, ''));
    const cp = parseFloat(currentPrice.replace(/,/g, ''));

    if (isNaN(originalP) || isNaN(originalQ) || originalQ === 0) {
      setResult(null);
      return;
    }

    let totalCost = originalP * originalQ;
    let totalQty = originalQ;

    adds.forEach(({ price, qty }) => {
      const p = parseFloat(price.replace(/,/g, ''));
      const q = parseFloat(qty.replace(/,/g, ''));
      if (!isNaN(p) && !isNaN(q)) {
        totalCost += p * q;
        totalQty += q;
      }
    });

    if (totalQty === 0) {
      setResult(null);
      return;
    }

    const average = totalCost / totalQty;
    const profit = isNaN(cp) || average === 0 ? 0 : ((cp - average) / average) * 100;

    setResult({
      average,
      totalQty,
      totalCost,
      profit,
    });

    // 결과가 나타난 후 스크롤 이동
    setTimeout(() => {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100); // setState 반영 이후 DOM이 업데이트될 수 있도록 약간 지연
  };

  return (
    <PageLayout
      title="주식 평단가 계산기"
      description="기존 매수와 최대 3회까지 추가 매수를 입력하면 새로운 평단가를 계산하고, 수익률까지 확인할 수 있습니다."
    >
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">현재 주가 (원)</label>
          <input
            type="text"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(formatNumber(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 60,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">현재 평단가 (원)</label>
          <input
            type="text"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(formatNumber(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 60,000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">현재 보유 수량 (주)</label>
          <input
            type="text"
            value={originalQty}
            onChange={(e) => setOriginalQty(formatNumber(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 10"
          />
        </div>

        {adds.map((item, i) => (
          <div key={i} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-[16px]">
                추가 매수 단가 {i + 1} (원)
              </label>
              <input
                type="text"
                value={item.price}
                onChange={(e) => handleChange(i, "price", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={`예: ${formatNumber((60000 + i * 1000).toString())}`}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-[16px]">
                추가 매수 수량 {i + 1} (주)
              </label>
              <input
                type="text"
                value={item.qty}
                onChange={(e) => handleChange(i, "qty", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={`예: ${formatNumber((5 + i * 5).toString())}`}
              />
            </div>
          </div>
        ))}

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2 px-4 rounded-md transition-colors"
        >
          평단가 계산하기
        </button>

        <p className="text-base text-gray-500 mt-4 text-center">
          ※ 최대 3회까지 추가 매수 정보를 입력할 수 있습니다.
        </p>
        <GoogleAdsense />

        <div ref={resultRef}>
          {result !== null && (
            <div className="mt-6 text-center text-gray-800 space-y-2 text-lg font-semibold">
              <p>📌 평단가: <span className="text-blue-600">{result.average.toLocaleString("ko-KR")} 원</span></p>
              <p>📈 수익률: <span className="text-green-600">{result.profit.toFixed(2)}%</span></p>
              <p>총 수량: {result.totalQty.toLocaleString()} 주</p>
              <p>총 매수금액: {result.totalCost.toLocaleString()} 원</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 사용방법</h2>
        <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
          <li>기존 매수 정보와 추가 매수 정보를 입력하세요.</li>
          <li>현재 주가를 입력하면 수익률도 함께 계산됩니다.</li>
          <li>계산하기 버튼을 누르면 최종 평단가, 수익률, 총 매수 정보가 표시됩니다.</li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 설명</h2>
        <p className="text-gray-700 text-base leading-relaxed">
          평단가 계산기는 여러 차례에 걸쳐 매수한 주식의 평균 단가를 계산하며, 현재 주가를 입력하면 수익률도 함께 확인할 수 있습니다. 분할 매수 시 실제 투자 상태를 파악하는 데 도움이 됩니다.
        </p>
      </div>
      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">평단가 계산 공식</h2>
        <div className="text-base text-gray-700 leading-relaxed space-y-3">
          <p>
            평균 단가 = (매수1단가 × 수량1 + 매수2단가 × 수량2 + …) ÷ 총 수량
          </p>
          <p className="font-semibold">📌 예시</p>
          <ul className="list-disc list-inside space-y-1">
            <li>첫 매수: 10,000원 × 100주</li>
            <li>두 번째 매수: 8,000원 × 100주</li>
          </ul>
          <p>
            → 평균 단가 = (10,000 × 100 + 8,000 × 100) ÷ (100 + 100) = <strong>9,000원</strong>
          </p>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
        <div className="space-y-4 text-base text-gray-700 leading-relaxed">
          <div>
            <p className="font-semibold text-gray-800">Q. 평단가 계산이 실제 증권사 평단가랑 다를 수 있나요?</p>
            <p>네. 수수료 포함 여부, 소수점 처리 방식, 자동 합산 기준에 따라 약간 다르게 표시될 수 있습니다.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Q. 수량이 많을수록 더 영향을 많이 주나요?</p>
            <p>맞습니다. 수량이 많은 매수 구간이 평균 단가에 더 큰 영향을 미칩니다. 그래서 추가 매수 시 전략적으로 수량 조절이 중요합니다.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Q. 평단가를 낮추면 무조건 수익이 늘어나나요?</p>
            <p>아닙니다. 현재가가 평단가보다 높아야 수익이 발생합니다. 평단가를 낮춰도 주가가 더 떨어지면 손해가 더 커질 수 있습니다.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Q. 평단가만 알고 있어도 수익률을 알 수 있나요?</p>
            <p>현재가를 함께 알아야 계산됩니다. 수익률 = (현재가 ÷ 평단가 - 1) × 100 공식으로 구할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

