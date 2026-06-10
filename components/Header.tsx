"use client";

// ============================================================
// Header — 极简顶部导航
// ============================================================

import { useState, useEffect } from "react";
import { APP_TITLE } from "@/lib/constants";

interface HeaderProps {
  onReset?: () => void;
}

export default function Header({ onReset }: HeaderProps) {
  const [showTip, setShowTip] = useState(true);
  const [wiggle, setWiggle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTip(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleTitleClick = () => {
    setWiggle(true);
    setTimeout(() => setWiggle(false), 600);
    onReset?.();
  };

  return (
    <header className="relative w-full max-w-md mx-auto pt-6 px-4 pb-2">
      {/* 顶部分享提示泡 */}
      {showTip && (
        <div className="animate-slide-up mb-3 flex justify-center">
          <div className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 shadow-sm">
            <span className="text-sm">📌</span>
            <span className="text-xs text-text-secondary font-medium">
              点击右上角 ··· 添加到浮窗，随时打开
            </span>
            <button
              onClick={() => setShowTip(false)}
              className="text-text-muted hover:text-text-secondary ml-1 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 标题 */}
      <div className="text-center">
        <button
          onClick={handleTitleClick}
          className={`inline-block transition-all duration-300 ${
            wiggle ? "animate-shake-pan" : ""
          }`}
        >
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            {APP_TITLE}
          </h1>
        </button>
        <p className="text-xs text-text-muted mt-1.5 font-normal">
          拒绝选择困难症
        </p>
      </div>

      {/* 装饰分隔线 — 极简单线 */}
      <div className="flex items-center justify-center mt-4">
        <div className="h-px w-20 bg-border" />
      </div>
    </header>
  );
}
