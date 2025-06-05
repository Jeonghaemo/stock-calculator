// app/page.tsx 또는 src/app/page.tsx
export const metadata = {
  title: "주식 계산기 모음 - 주식 수익률 계산, 물타기 계산, 실시간 환율, 양도소득세까지",
  description:
    "주식 수익률, 물타기 계산, 평단가 계산, 손절가 계산, 실시간 환율, 양도소득세, 배당수익률까지 다양한 투자 계산기를 한 곳에서 간편하게 이용해보세요.",
  openGraph: {
    title: "주식 계산기 모음",
    description: "주식 수익률, 물타기 계산, 평단가 계산, 손절가 계산, 양도소득세, 환율까지 한 번에 계산",
    images: [
      {
        url: "/thumbnail.png", // public 폴더 기준 경로
        width: 1200,
        height: 630,
        alt: "주식 계산기 대표 이미지",
      },
    ],
  },
};


import Link from "next/link";

export default function Home() {
  const calculators = [
    { title: "수익률 계산기", href: "/yield", description: "매수·매도가 입력 시 수익률 계산" },
    { title: "수수료 계산기", href: "/fee", description: "매도금액 입력 시 수수료·세금 계산" },
    { title: "평단가 계산기", href: "/average", description: "매수 내역으로 평단가 계산" },
    { title: "물타기 계산기", href: "/water", description: "추가 매수로 변경된 평단가 계산" },
    { title: "양도소득세 계산기", href: "/tax", description: "양도차익에 따른 세금 계산" },
    { title: "복리 계산기", href: "/compound", description: "이자율로 복리 수익 계산" },
    { title: "환율 계산기", href: "/exchange", description: "여러 나라 통화를 실시간 환율로 간단하게 계산" },
    { title: "목표 수익률 계산기", href: "/target", description: "목표 수익률에 필요한 매도가 계산" },
    { title: "손절가 계산기", href: "/losscut", description: "매수가와 손실률을 기준으로 손절 가격을 계산" },
    { title: "배당수익률 계산기", href: "/dividend", description: "주가와 배당금 기준 배당수익률 계산" },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">주식 계산기 모음</h1>
<div className="text-center mt-10 mb-6 px-4">
  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 leading-snug">
    투자에 필요한 모든 계산기를 한 번에 확인!
  </h2>
  <p className="text-gray-600 mt-2 text-base sm:text-lg">
    실시간 환율부터 양도소득세까지, 수익률 계산 등 필요한 계산을 빠르게 확인할 수 있습니다.
  </p>
</div>

      <div className="grid gap-6 sm:grid-cols-2">
        {calculators.map(({ title, href, description }) => (
          <Link
            key={href}
            href={href}
            className="block p-6 border border-gray-200 rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-1 text-blue-600">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

