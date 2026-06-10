"use client";

// ============================================================
// TabSwitcher — 极简标签切换
// 拟人化图标，黑白灰配色
// ============================================================

import type { FeatureTab } from "@/lib/types";

interface TabSwitcherProps {
  active: FeatureTab;
  onChange: (tab: FeatureTab) => void;
}

const TABS: { key: FeatureTab; label: string; emoji: string }[] = [
  { key: "food", label: "吃啥", emoji: "🧑‍🍳" },
  { key: "chore", label: "谁干", emoji: "🙋" },
  { key: "pay", label: "买单", emoji: "💁" },
];

export default function TabSwitcher({ active, onChange }: TabSwitcherProps) {
  return (
    <nav className="sticky top-0 z-40 bg-bg/90 backdrop-blur-md pb-2 pt-1">
      <div className="max-w-md mx-auto px-4">
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-border">
          {TABS.map((tab) => {
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onChange(tab.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-muted"
                }`}
              >
                <span className="text-base">{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
