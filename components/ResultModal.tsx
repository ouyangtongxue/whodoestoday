"use client";

// ============================================================
// ResultModal — 结果弹窗（通用）
// 带 confetti 飘落动画 ✨
// ============================================================

import { useEffect, useState } from "react";

interface ResultModalProps {
  open: boolean;
  onClose: () => void;
  emoji?: string;
  title: string;
  subtitle: string;
  /** 小标签 (e.g. "主厨登基") */
  badge?: string;
  /** 额外渲染内容 */
  children?: React.ReactNode;
  /** 是否自动关闭，默认 true（4秒后自动消失）*/
  autoClose?: boolean;
}

const CONFETTI = ["🌸", "💖", "✨", "🌟", "🎀", "💕", "🩷", "💫", "🍀", "🎉"];

export default function ResultModal({
  open,
  onClose,
  emoji = "🎉",
  title,
  subtitle,
  badge,
  children,
  autoClose = true,
}: ResultModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // 阻止背景滚动
      document.body.style.overflow = "hidden";
      // 自动关闭（仅当 autoClose 为 true）
      if (autoClose) {
        const timer = setTimeout(() => {
          onClose();
        }, 4000);
        return () => {
          clearTimeout(timer);
          document.body.style.overflow = "";
        };
      }
      return () => {
        document.body.style.overflow = "";
      };
    } else {
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-text-primary/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Confetti 粒子 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {CONFETTI.map((c, i) => (
          <span
            key={i}
            className={`absolute text-lg animate-confetti-${(i % 5) + 1}`}
            style={{
              left: `${10 + (i * 17) % 80}%`,
              top: "-20px",
            }}
          >
            {c}
          </span>
        ))}
      </div>

      {/* 卡片 */}
      <div
        className={`relative bg-white rounded-3xl p-6 w-full max-w-sm border-3 border-text-primary shadow-2xl transition-all duration-300 ${
          open ? "animate-bounce-in" : "scale-75 opacity-0"
        }`}
      >
        {/* 表情大图 */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-lighter via-purple-light to-yellow-light animate-float">
            <span className="text-5xl">{emoji}</span>
          </div>
        </div>

        {/* Badge */}
        {badge && (
          <div className="text-center mb-2">
            <span className="tag-pill animate-heartbeat">{badge}</span>
          </div>
        )}

        {/* 标题 */}
        <h2 className="text-xl font-black text-center text-text-primary mb-2">
          {title}
        </h2>

        {/* 副标题 */}
        <p className="text-sm text-text-secondary text-center leading-relaxed mb-4">
          {subtitle}
        </p>

        {/* 额外内容 */}
        {children}

        {/* 关闭按钮 */}
        <div className="text-center mt-4">
          <button
            onClick={onClose}
            className="btn-primary text-sm px-8 py-2.5"
          >
            知道啦 🎀
          </button>
        </div>

        {/* 底部水印 */}
        <p className="text-center text-[10px] text-text-secondary/30 mt-3">
          Powered by 恋爱决策神 · 今天谁干嘛
        </p>
      </div>
    </div>
  );
}
