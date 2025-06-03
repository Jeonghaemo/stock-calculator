import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📊 계산기 모음</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/yield" className="text-blue-600 hover:underline">
            주식 수익률 계산기
          </Link>
        </li>
        <li>
          <Link href="/fee" className="text-green-600 hover:underline">
            주식 수수료 계산기
          </Link>
        </li>
      </ul>
    </div>
  );
}
