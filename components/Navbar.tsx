import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-300 px-4 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 overflow-x-auto text-base font-semibold whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <Link href="/" className="hover:text-blue-600 text-blue-800">홈</Link>
          <Link href="/yield" className="hover:text-blue-600">수익률 계산기</Link>
          <Link href="/fee" className="hover:text-blue-600">수수료 계산기</Link>
          <Link href="/average" className="hover:text-blue-600">평단가 계산기</Link>
          <Link href="/water" className="hover:text-blue-600">물타기 계산기</Link>
          <Link href="/tax" className="hover:text-blue-600">양도소득세 계산기</Link>
          <Link href="/compound" className="hover:text-blue-600">복리 계산기</Link>
          <Link href="/exchange" className="hover:text-blue-600">환전 계산기</Link>
          <Link href="/target" className="hover:text-blue-600">목표 수익률 계산기</Link>
          <Link href="/losscut" className="hover:text-blue-600">손절가 계산기</Link>
          <Link href="/dividend" className="hover:text-blue-600">배당수익률 계산기</Link>
        </div>
      </div>
    </nav>
  );
}


