"use client";
import GoogleAdsense from "@/components/GoogleAdsense";
import { useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";

export default function WaterCalculatorPage() {
  const [avgPrice, setAvgPrice] = useState("");
  const [currentQty, setCurrentQty] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  // 추가 매수 가격/수량 state를 배열로 관리
  const [adds, setAdds] = useState([
    { price: "", qty: "" },
    { price: "", qty: "" },
    { price: "", qty: "" },
  ]);

  const [result, setResult] = useState<{
    avg: number;
    totalQty: number;
    totalCost: number;
    currentProfit: number;
    afterProfit: number;
  } | null>(null);

  // 결과 ref
  const resultRef = useRef<HTMLDivElement>(null);

  // 숫자 formatting
  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/,/g, "");
      if (!/^\d*$/.test(raw)) return;
      const num = parseFloat(raw);
      if (isNaN(num)) {
        setter("");
      } else {
        setter(num.toLocaleString());
      }
    };

  // 추가 매수용
  const handleAddChange = (idx: number, key: "price" | "qty", value: string) => {
    const arr = adds.map((item, i) =>
      i === idx
        ? {
            ...item,
            [key]: (() => {
              const raw = value.replace(/,/g, "");
              if (!/^\d*$/.test(raw)) return item[key];
              const num = parseFloat(raw);
              if (isNaN(num)) return "";
              return num.toLocaleString();
            })(),
          }
        : item
    );
    setAdds(arr);
  };

  const calculate = () => {
    const cp = parseFloat(currentPrice.replace(/,/g, ""));
    const currentP = parseFloat(avgPrice.replace(/,/g, ""));
    const currentQ = parseFloat(currentQty.replace(/,/g, ""));

    let totalCost = isNaN(currentP) || isNaN(currentQ) ? 0 : currentP * currentQ;
    let totalQty = isNaN(currentQ) ? 0 : currentQ;

    for (const { price, qty } of adds) {
      const p = parseFloat(price.replace(/,/g, ""));
      const q = parseFloat(qty.replace(/,/g, ""));
      if (!isNaN(p) && !isNaN(q)) {
        totalCost += p * q;
        totalQty += q;
      }
    }

    if (isNaN(currentP) || isNaN(currentQ) || currentQ === 0 || totalQty === 0) {
      setResult(null);
      return;
    }

    const newAvg = totalCost / totalQty;
    const currentProfit = isNaN(cp) || currentP === 0 ? 0 : ((cp - currentP) / currentP) * 100;
    const afterProfit = isNaN(cp) || newAvg === 0 ? 0 : ((cp - newAvg) / newAvg) * 100;

    setResult({
      avg: newAvg,
      totalQty,
      totalCost,
      currentProfit,
      afterProfit,
    });

    setTimeout(() => {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <PageLayout
      title="주식 물타기 계산기"
      description="현재 평단가, 수익률, 물타기 이후 예상 수익률까지 확인할 수 있습니다."
    >

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">현재 주가 (원)</label>
          <input
            type="text"
            value={currentPrice}
            onChange={handleChange(setCurrentPrice)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 13,000"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">현재 평단가 (원)</label>
          <input
            type="text"
            value={avgPrice}
            onChange={handleChange(setAvgPrice)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 15,000"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-[16px]">현재 보유 수량 (주)</label>
          <input
            type="text"
            value={currentQty}
            onChange={handleChange(setCurrentQty)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="예: 20"
          />
        </div>

        {[0, 1, 2].map((idx) => (
          <div key={idx} className="flex gap-2">
            <div className="w-1/2">
              <label className="block mb-1 font-medium text-gray-700 text-[16px]">
                추가 매수가 {idx + 1} (원)
              </label>
              <input
                type="text"
                value={adds[idx].price}
                onChange={(e) => handleAddChange(idx, "price", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="예: 13,000"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-medium text-gray-700 text-[16px]">
                추가 매수 수량 {idx + 1} (주)
              </label>
              <input
                type="text"
                value={adds[idx].qty}
                onChange={(e) => handleAddChange(idx, "qty", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="예: 10"
              />
            </div>
          </div>
        ))}

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2 px-4 rounded-md transition-colors"
        >
          계산하기
        </button>

        <div ref={resultRef}>
          {result !== null && (
            <div className="mt-6 text-center text-gray-800 space-y-2 text-lg font-semibold">
              <p>📉 최종 평단가: <span className="text-blue-600">{result.avg.toLocaleString()} 원</span></p>
              <p>📈 현재 수익률: <span className="text-red-600">{result.currentProfit.toFixed(2)}%</span></p>
              <p>📈 물타기 후 수익률: <span className="text-green-600">{result.afterProfit.toFixed(2)}%</span></p>
              <p>총 수량: {result.totalQty.toLocaleString()} 주</p>
              <p>총 매수금액: {result.totalCost.toLocaleString()} 원</p>
            </div>
          )}
        </div>

        <p className="text-base text-gray-500 mt-4 text-center">
          ※ 총 투자금액과 전체 수량을 바탕으로 평단가와 수익률을 계산합니다.
        </p>
      </div>
      <GoogleAdsense />
      <div className="mt-10">
        <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 사용방법</h2>
        <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
          <li>현재 평단가, 수량, 주가를 입력하세요.</li>
          <li>최대 3회까지 추가 매수 가격과 수량을 입력할 수 있습니다.</li>
          <li>추가 매수한 최종 평균 평단가 및 수익률이 계산됩니다.</li>
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 설명</h2>
        <p className="text-gray-700 text-base leading-relaxed">
          물타기 계산기는 여러 번의 매수에 따른 평균 매입단가뿐만 아니라 현재 수익률과 물타기 후 예상 수익률도 계산합니다. 투자 전략을 세우기 전에 참고하는 데 도움이 됩니다.
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">물타기 계산 공식</h2>
        <div className="text-base text-gray-700 leading-relaxed space-y-3">
          <p>
            평균 단가 = (기존 매수금 + 추가 매수금) ÷ (기존 수량 + 추가 수량)
          </p>
          <p className="font-semibold">📌예시</p>
          <ul className="list-disc list-inside space-y-1">
            <li>기존 매수: 20,000원 × 50주</li>
            <li>추가 매수: 15,000원 × 50주</li>
          </ul>
          <p>
            → 평균 단가 = (20,000 × 50 + 15,000 × 50) ÷ (50 + 50) = <strong>17,500원</strong>
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
        <div className="space-y-4 text-base text-gray-700 leading-relaxed">
          <div>
            <p className="font-semibold text-gray-800">Q. 물타기를 하면 무조건 손해를 줄일 수 있나요?</p>
            <p>
              아닙니다. 물타기는 손실을 줄이기 위한 전략이지만 주가가 계속 하락한다면 손실이 더 커질 수 있습니다.
              물타기는 방향성에 대한 확신이 있을 때 신중하게 접근해야 합니다.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Q. 몇 번까지 물타기하는 게 좋을까요?</p>
            <p>
              물타기의 횟수에 정해진 기준은 없지만 반복할수록 리스크는 커집니다.
              일반적으로 1~2회까지는 대응 전략의 일부로 보지만
              지속적인 물타기는 손실금이 더 커질 수 있습니다. 총 투자금 대비 비중을 고려하는 게 중요합니다.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Q. 평단가가 낮아지면 수익이 나는 건가요?</p>
            <p>
              아닙니다. 평단가가 낮아졌다고 해서 수익이 나는 건 아니며
              현재가가 평균 단가보다 높아야 수익이 발생합니다. 물타기 이후 주가가 상승한다면 본전 또는 수익권에 더 빨리 도달할 수 있습니다.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Q. 물타기보다 손절이 나은 경우도 있나요?</p>
            <p>
              네. 하락 원인이 기업 펀더멘털 악화, 구조적인 문제일 경우에는 손절이 더 나은 선택일 수 있습니다.
              무조건 물타기만 고집하면 오히려 손실이 더 커질 수 있습니다. 종목 상황과 시황 분석이 함께 필요합니다.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
