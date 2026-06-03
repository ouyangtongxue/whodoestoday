"use client";

// ============================================================
// TabSwitcher — 底部可爱标签切换
// ============================================================

import type { FeatureTab } from "@/lib/types";

interface TabSwitcherProps {
  active: FeatureTab;
  onChange: (tab: FeatureTab) => void;
}

const TABS: { key: FeatureTab; label: string; emoji: string }[] = [
  { key: "food", label: "吃啥", emoji: "🍽️" },
  { key: "chore", label: "谁干", emoji: "🧹" },
  { key: "pay", label: "买单", emoji: "💳" },
];

export default function TabSwitcher({ active, onChange }: TabSwitcherProps) {
  return (
    <nav className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md pb-2 pt-1">
      <div className="max-w-md mx-auto px-4">
        <div className="flex bg-white/70 backdrop-blur-sm rounded-2xl p-1.5 shadow-sm shadow-pink-100 border border-pink-100">
          {TABS.map((tab) => {
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onChange(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-pink-primary to-purple-pop text-white shadow-md shadow-pink-200 scale-105"
                    : "text-text-secondary hover:text-pink-primary hover:bg-pink-lighter/50"
                }`}
              >
                <span className="text-lg">{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
