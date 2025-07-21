"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileFooterNav() {
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-inner sm:hidden z-50">
      <div className="flex overflow-x-auto no-scrollbar whitespace-nowrap px-2 py-2 gap-4 text-xs font-medium text-gray-800">
        {menus.map(({ href, label, emoji }) => {
          // "/"(홈)과 다른 경로 구분 로직
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center flex-shrink-0 w-16 hover:text-blue-600 transition-colors ${
                isActive ? "text-blue-600 font-bold" : ""
              }`}
            >
              <span className="text-xl">{emoji}</span>
              <span className={`text-[12px] mt-1`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

