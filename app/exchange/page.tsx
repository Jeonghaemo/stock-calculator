import PageLayout from "@/components/PageLayout";
import ExchangeForm from "@/components/ExchangeForm";

export default function ExchangePage() {
  return (
    <PageLayout
      title="환율 계산기"
      description="실시간 환율로 간편하게 계산할 수 있는 환율 계산기입니다. 여러 나라 통화 간 변환을 빠르고 정확하게 확인해보세요.."
    >
      <ExchangeForm />
    </PageLayout>
  );
}
