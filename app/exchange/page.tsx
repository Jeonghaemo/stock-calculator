export const metadata = {
  title: "환율 계산기",
  description: "실시간 환율로 간편하게 계산할 수 있는 환율 계산기입니다. 여러 나라 통화 간 변환을 빠르고 정확하게 확인해보세요",
  openGraph: {
    title: "환율 계산기",
    description: "실시간 환율로 간편하게 계산할 수 있는 환율 계산기입니다. 여러 나라 통화 간 변환을 빠르고 정확하게 확인해보세요",
    url: "https://calculator.stocktrend.co.kr/exchange",
    siteName: "Stocktrend Calculator",
    locale: "ko_KR",
    type: "website"
  }
};

import PageLayout from "@/components/PageLayout";
import ExchangeForm from "@/components/ExchangeForm";

export default function ExchangePage() {
  return (
    <PageLayout
      title="환율 계산기"
      description="실시간 환율로 간편하게 계산할 수 있는 환율 계산기입니다. 여러 나라 통화 간 변환을 빠르고 정확하게 확인해보세요."
    >
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

    </PageLayout>
    
  );
}
