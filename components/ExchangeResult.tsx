'use client';

interface Props {
  result: number;
  toCurrency: string;
}

export default function ExchangeResult({ result, toCurrency }: Props) {
  const formatted = new Intl.NumberFormat(undefined, {
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


