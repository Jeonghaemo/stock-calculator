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
      </div>
    </main>
  );
}

