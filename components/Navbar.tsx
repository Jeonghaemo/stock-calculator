"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const menus = [
    { href: "/", label: "홈", emoji: "🏠" },
    { href: "/yield", label: "수익률", emoji: "📈" },
    { href: "/water", label: "물타기", emoji: "💧" },
    { href: "/average", label: "평단가", emoji: "🧮" },
    { href: "/fee", label: "수수료", emoji: "💸" },
    { href: "/compound", label: "복리", emoji: "📊" },
    { href: "/exchange", label: "환율", emoji: "💱" },
    { href: "/target", label: "목표 수익", emoji: "🎯" },
    { href: "/losscut", label: "손절가", emoji: "✂️" },
    { href: "/tax", label: "양도소득", emoji: "🧾" },
    { href: "/dividend", label: "배당수익", emoji: "🏦" },
  ];

  return (
    <nav className="bg-white border-b border-gray-300 px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <div className="flex gap-2 py-1 min-w-fit justify-start sm:justify-center">
            {menus.map(({ href, label, emoji }) => {
              // "/"(홈)과 나머지 경로 구분
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md border
                    transition whitespace-nowrap
                    ${isActive
                      ? "bg-blue-50 border-blue-500 text-blue-600 font-bold"
                      : "bg-gray-100 border-gray-300 text-gray-800 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600"
                    }`
                  }
                >
                  <span className="text-base">{emoji}</span>
                  <span className="text-base font-semibold">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}


