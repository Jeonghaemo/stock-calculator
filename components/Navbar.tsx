"use client";
import Link from "next/link";
import {
  Home,
  Percent,
  RefreshCcw,
  ListOrdered,
  DollarSign,
  Calculator,
  Globe,
  TrendingUp,
  Slash,
  FileText,
  PiggyBank,
} from "lucide-react";

export default function Navbar() {
  const menus = [
    { href: "/", label: "홈", icon: Home },
    { href: "/yield", label: "수익률", icon: Percent },
    { href: "/water", label: "물타기", icon: RefreshCcw },
    { href: "/average", label: "평단가", icon: ListOrdered },
    { href: "/fee", label: "수수료", icon: DollarSign },
    { href: "/compound", label: "복리", icon: Calculator },
    { href: "/exchange", label: "환율", icon: Globe },
    { href: "/target", label: "목표 수익", icon: TrendingUp },
    { href: "/losscut", label: "손절가", icon: Slash },
    { href: "/tax", label: "양도소득", icon: FileText },
    { href: "/dividend", label: "배당수익", icon: PiggyBank },
  ];

  return (
    <nav className="bg-white border-b border-gray-300 px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <div className="flex justify-center gap-2 min-w-fit py-1">
            {menus.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-md border border-gray-300 hover:bg-blue-50 hover:border-blue-400 text-gray-800 hover:text-blue-600 transition"
              >
                <Icon size={18} className="min-w-[18px]" />
                <span className="text-base font-semibold">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
