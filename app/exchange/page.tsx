import ExchangeForm from "@/components/ExchangeForm";
import GoogleAdsense from "@/components/GoogleAdsense";

export const metadata = {
  title: "환율 계산기",
  description: "실시간 환율로 간편하게 계산할 수 있는 환율 계산기입니다. 여러 나라 통화 간 변환을 빠르고 정확하게 확인해보세요",
};

export default function ExchangePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">환율 계산기</h1>
      <p className="text-gray-700 mb-6 text-base leading-relaxed font-medium">
        실시간 환율로 간편하게 계산할 수 있는 환율 계산기입니다. 여러 나라 통화 간 변환을 빠르고 정확하게 확인해보세요.
      </p>
<GoogleAdsense />
      <div className="bg-white p-6 rounded-lg shadow">
        <ExchangeForm />

        <div className="mt-10">
          <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 사용방법</h2>
          <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
            <li>금액을 입력하고, 환전할 통화를 선택하세요.</li>
            <li>환율 계산하기를 누르면 환전된 금액이 표시됩니다.</li>
            <li>양방향 통화 전환도 버튼으로 쉽게 가능합니다.</li>
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">계산기 설명</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            환율 계산기는 실시간 환율을 기반으로 다양한 국가 통화 간 금액을 변환해줍니다. 해외여행, 송금, 외화 투자 시 활용할 수 있습니다.
          </p>
        </div>
        <div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-4">환율 계산 공식</h2>
  <div className="text-base text-gray-700 leading-relaxed space-y-3">
    <p>
      환전 후 금액 = <strong>입력 금액 × 환율</strong>
    </p>

    <p className="font-semibold mt-4">📌 예시</p>
    <ul className="list-disc list-inside space-y-1">
      <li>100 USD × 1,380원/USD = <strong>138,000원</strong></li>
      <li>100,000 JPY × 9.3원/JPY = <strong>930,000원</strong></li>
    </ul>
  </div>
</div>
<div className="mt-8">
  <h2 className="text-lg font-bold text-gray-800 mb-4">환전 시 유의사항</h2>
  <ul className="list-disc list-inside text-base text-gray-700 space-y-1">
    <li>은행마다 환전 수수료가 다르며 온라인 환전 시 우대율이 적용되기도 합니다.</li>
    <li>해외 결제 시에는 카드사 환율 + 국제 브랜드 수수료가 적용됩니다.</li>
    <li>공휴일/주말에는 환율 고정값이 적용되어 실제 거래와 차이가 발생할 수 있습니다.</li>
  </ul>
</div>
        <div className="mt-10">
  <h2 className="text-lg font-bold text-gray-800 mb-4">자주 묻는 질문 (FAQ)</h2>
  <div className="space-y-4 text-base text-gray-700 leading-relaxed">
    <div>
      <p className="font-semibold text-gray-800">Q. 매매기준율과 송금 환율은 어떤 차이가 있나요?</p>
      <p>매매기준율은 참고용 중간값이고, 실제 환전 시에는 송금보낼 때/받을 때 환율이 적용됩니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. 실시간 환율은 얼마나 자주 바뀌나요?</p>
      <p>일반적으로 평일 오전 9시~오후 3시 사이 15초 단위로 변동됩니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. 환전 수수료는 자동 반영되나요?</p>
      <p>계산기에는 기본 환율만 반영됩니다. 실제 환전 시 수수료가 별도로 적용될 수 있습니다.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-800">Q. 원화 외 통화끼리도 계산할 수 있나요?</p>
      <p>네. 엔화-달러, 유로-달러 등 다른 통화 간 계산도 가능합니다.</p>
    </div>
  </div>
</div>

      </div>
      
    </main>
  );
}

