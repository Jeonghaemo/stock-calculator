'use client';
interface Props {
  result: number;
  toCurrency: string;
}

// 통화 코드에 따른 로케일 매핑
const getLocale = (currency: string): string => {
  switch (currency) {
    case 'USD':
      return 'en-US';
    case 'EUR':
      return 'de-DE';
    case 'KRW':
      return 'ko-KR';
    case 'JPY':
      return 'ja-JP';
    default:
      return 'en-US';
  }
};

export default function ExchangeResult({ result, toCurrency }: Props) {
  const formatted = new Intl.NumberFormat(getLocale(toCurrency), {
    style: 'currency',
    currency: toCurrency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(result);

  return (
    <div className="text-lg font-semibold">
      환율 결과: {formatted}
    </div>
  );
}

