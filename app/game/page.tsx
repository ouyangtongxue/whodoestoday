"use client";

// ============================================================
// Game 页面 — 解析 URL 中的分享数据
// 对方点击链接后自动同步配置，进入同屏操作
// ============================================================

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import type { SharePayload, FoodItem, ChoreItem } from "@/lib/types";
import { decodeShareData } from "@/lib/encrypt";
import { saveFoodPool, saveChorePool } from "@/lib/storage";
import FoodRoulette from "@/components/FoodRoulette";
import ChoreRoulette from "@/components/ChoreRoulette";
import PayRoulette from "@/components/PayRoulette";
import { motion, AnimatePresence } from "framer-motion";

// ----------------------------------------------------------
// 内部组件 — 用 useSearchParams 必须在 Suspense 里
// ----------------------------------------------------------
function GameContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<SharePayload | null>(null);
  const [activeTab, setActiveTab] = useState<"food" | "chore" | "pay">("food");
  const [synced, setSynced] = useState(false);

  // 解析 URL 参数
  useEffect(() => {
    const encoded = searchParams.get("data");
    if (!encoded) {
      setError("没找到分享数据～请确认链接完整 🤔");
      setLoading(false);
      return;
    }

    const decoded = decodeShareData(encoded);
    if (!decoded) {
      setError("数据解析失败！链接可能被截断了 😵");
      setLoading(false);
      return;
    }

    setPayload(decoded);
    setActiveTab(decoded.type === "food" ? "food" : decoded.type === "chore" ? "chore" : "pay");

    // 同步到 localStorage
    if (decoded.foodPool && decoded.foodPool.length > 0) {
      saveFoodPool(decoded.foodPool);
    }
    if (decoded.chorePool && decoded.chorePool.length > 0) {
      saveChorePool(decoded.chorePool);
    }

    setSynced(true);
    setLoading(false);
  }, [searchParams]);

  // 回到主页
  const goHome = useCallback(() => {
    router.push("/");
  }, [router]);

  // Tab 标签
  const tabs: { key: "food" | "chore" | "pay"; label: string; emoji: string }[] = [
    { key: "food", label: "吃啥", emoji: "🍽️" },
    { key: "chore", label: "谁干", emoji: "🧹" },
    { key: "pay", label: "买单", emoji: "💳" },
  ];

  // 加载中
  if (loading) {
    return (
      <div className="min-h-screen bg-bg bg-gradient-love flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            💌
          </motion.div>
          <p className="text-lg font-black text-gradient">正在同步 TA 的菜单...</p>
          <p className="text-xs text-text-secondary mt-2">稍等一下下～</p>
        </div>
      </div>
    );
  }

  // 错误
  if (error) {
    return (
      <div className="min-h-screen bg-bg bg-gradient-love flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">😵</div>
          <h2 className="text-xl font-black text-text-primary mb-2">出错了</h2>
          <p className="text-sm text-text-secondary mb-6">{error}</p>
          <button onClick={goHome} className="btn-primary">
            🏠 回到首页
          </button>
        </div>
      </div>
    );
  }

  // 渲染对应功能
  const renderFeature = () => {
    if (!payload) return null;
    switch (activeTab) {
      case "food":
        return <FoodRoulette sharedPool={payload.foodPool} />;
      case "chore":
        return <ChoreRoulette sharedPool={payload.chorePool} />;
      case "pay":
        return <PayRoulette />;
    }
  };

  return (
    <main className="min-h-screen bg-bg bg-gradient-love">
      {/* 顶部提示横幅 */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-pink-primary to-purple-pop text-white px-4 py-3 shadow-lg shadow-pink-200">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl animate-heartbeat">💘</span>
            <div>
              <p className="text-sm font-black leading-tight">
                {payload?.senderName ? `${payload.senderName}` : "TA"} 发来了链接
              </p>
              <p className="text-[10px] text-white/80 leading-tight">
                已同步菜单配置，一起开盲盒吧～
              </p>
            </div>
          </div>
          <button
            onClick={goHome}
            className="shrink-0 bg-white/20 hover:bg-white/30 rounded-full px-3 py-1.5 text-xs font-bold transition-colors"
          >
            去首页
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="text-center pt-5 pb-2">
        <h1 className="text-2xl font-black text-gradient">
          今天谁干嘛 💑
        </h1>
        <p className="text-xs text-text-secondary/60 mt-1">
          同步模式 · 命运双人局
        </p>
      </div>

      {/* Tab */}
      <nav className="sticky top-[53px] z-40 bg-bg/80 backdrop-blur-md pb-2 pt-1">
        <div className="max-w-md mx-auto px-4">
          <div className="flex bg-white/70 backdrop-blur-sm rounded-2xl p-1.5 shadow-sm shadow-pink-100 border border-pink-100">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              // 只能切换到有数据的 tab
              const hasData =
                tab.key === "pay" ||
                (tab.key === "food" && payload?.foodPool) ||
                (tab.key === "chore" && payload?.chorePool);
              return (
                <button
                  key={tab.key}
                  onClick={() => hasData && setActiveTab(tab.key)}
                  disabled={!hasData}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-pink-primary to-purple-pop text-white shadow-md shadow-pink-200 scale-105"
                      : hasData
                        ? "text-text-secondary hover:text-pink-primary hover:bg-pink-lighter/50"
                        : "text-text-secondary/30 cursor-not-allowed"
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

      {/* 内容 */}
      <div className="mt-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {renderFeature()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 成功同步提示 */}
      {synced && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-white/95 backdrop-blur-sm border border-green-200 rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
            <span className="text-sm">✅</span>
            <span className="text-xs font-bold text-green-600">
              TA 的菜单配置已同步到你的设备
            </span>
          </div>
        </motion.div>
      )}
    </main>
  );
}

// ----------------------------------------------------------
// 页面导出 — Suspense 包裹（Next.js App Router 要求）
// ----------------------------------------------------------
export default function GamePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg flex items-center justify-center">
          <div className="text-center">
            <span className="text-5xl animate-float">💖</span>
            <p className="text-sm text-text-secondary mt-2">加载中...</p>
          </div>
        </div>
      }
    >
      <GameContent />
    </Suspense>
  );
}
