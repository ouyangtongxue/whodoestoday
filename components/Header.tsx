"use client";

// ============================================================
// Header — 顶部可爱导航
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
    <header className="relative w-full max-w-md mx-auto pt-4 px-4 pb-2">
      {/* 顶部分享/添加到浮窗提示泡 */}
      {showTip && (
        <div className="animate-slide-up mb-3 flex justify-center">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-pink-200 rounded-full px-4 py-2 shadow-lg shadow-pink-100">
            <span className="text-sm">📌</span>
            <span className="text-xs text-text-secondary font-medium">
              点击右上角 ··· 添加到浮窗，随时打开～
            </span>
            <button
              onClick={() => setShowTip(false)}
              className="text-text-secondary/50 hover:text-text-secondary ml-1"
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
          <h1 className="text-3xl font-black tracking-tight text-gradient">
            {APP_TITLE}
          </h1>
        </button>
        <p className="text-xs text-text-secondary/60 mt-1 font-medium">
          恋爱决策神器 · 拒绝选择困难症 💘
        </p>
      </div>

      {/* 装饰分隔线 */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <span className="animate-twinkle text-sm">✨</span>
        <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        <span className="animate-twinkle animation-delay-300 text-sm">💖</span>
        <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
        <span className="animate-twinkle animation-delay-500 text-sm">✨</span>
      </div>
    </header>
  );
}
