interface Props {
  result: number;
  toCurrency: string;
}

export default function ExchangeResult({ result, toCurrency }: Props) {
  return (
    <div className="text-lg font-semibold">
      환율 결과: {result.toLocaleString()} {toCurrency}
    </div>
  );
}
