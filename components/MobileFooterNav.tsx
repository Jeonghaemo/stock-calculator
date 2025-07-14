"use client";
import { useState } from "react";
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

export default function MobileFooterNav() {
  const [active, setActive] = useState("");

  const menus = [
    { href: "/", label: "홈", icon: Home },
    { href: "/yield", label: "수익률", icon: Percent },
    { href: "/water", label: "물타기", icon: RefreshCcw },
    { href: "/average", label: "평단가", icon: ListOrdered },
    { href: "/fee", label: "수수료", icon: DollarSign },
    { href: "/compound", label: "복리", icon: Calculator },
    { href: "/exchange", label: "환율", icon: Globe },
    { href: "/target", label: "목표수익", icon: TrendingUp },
    { href: "/losscut", label: "손절가", icon: Slash },
    { href: "/tax", label: "양도소득", icon: FileText },
    { href: "/dividend", label: "배당수익", icon: PiggyBank },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-inner sm:hidden z-50">
      <div className="flex overflow-x-auto no-scrollbar whitespace-nowrap px-2 py-2 gap-4 text-xs font-medium text-gray-800">
        {menus.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center flex-shrink-0 w-16 hover:text-blue-600 transition-colors"
            onClick={() => setActive(label)}
          >
            <Icon size={20} className={active === label ? "text-blue-600" : ""} />
            <span className={`text-[12px] mt-1 ${active === label ? "text-blue-600" : ""}`}>
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

