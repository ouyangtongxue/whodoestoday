"use client";

// ============================================================
// 《今天谁干嘛》— 主页面
// 三大功能模块 + Tab 切换 + 移动端优先
// ============================================================

import { useState, useEffect, useCallback } from "react";
import type { FeatureTab } from "@/lib/types";
import Header from "@/components/Header";
import TabSwitcher from "@/components/TabSwitcher";
import FoodRoulette from "@/components/FoodRoulette";
import ChoreRoulette from "@/components/ChoreRoulette";
import PayRoulette from "@/components/PayRoulette";
import { AnimatePresence, motion } from "framer-motion";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<FeatureTab>("food");
  const [mounted, setMounted] = useState(false);

  // 防止 SSR 水合不一致
  useEffect(() => {
    setMounted(true);
  }, []);

  // 重置应用（双击标题触发）
  const handleReset = useCallback(() => {
    if (typeof window === "undefined") return;
    const confirmed = window.confirm(
      "⚠️ 确定要重置所有数据吗？\n\n你的食物池、家务池都会回到默认状态～\n（分享出去的链接不受影响）"
    );
    if (confirmed) {
      // 动态导入避免打包问题
      import("@/lib/storage").then(({ resetData }) => {
        resetData();
        window.location.reload();
      });
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center animate-pulse">
          <span className="text-5xl animate-float">💖</span>
          <p className="text-sm text-text-secondary mt-2">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg bg-gradient-love">
      {/* 顶部背景装饰 */}
      <div className="relative overflow-hidden">
        {/* 浮动装饰 */}
        <div
          className="absolute top-4 left-4 text-2xl animate-float opacity-30 select-none pointer-events-none"
          style={{ animationDelay: "0s" }}
        >
          🌸
        </div>
        <div
          className="absolute top-8 right-6 text-2xl animate-float opacity-30 select-none pointer-events-none"
          style={{ animationDelay: "1s" }}
        >
          💖
        </div>
        <div
          className="absolute top-20 left-[20%] text-xl animate-float opacity-20 select-none pointer-events-none"
          style={{ animationDelay: "2s" }}
        >
          ✨
        </div>

        {/* Header */}
        <Header onReset={handleReset} />

        {/* Tab 切换 */}
        <TabSwitcher active={activeTab} onChange={setActiveTab} />
      </div>

      {/* 内容区 — 带过渡动画 */}
      <div className="relative mt-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {activeTab === "food" && <FoodRoulette />}
            {activeTab === "chore" && <ChoreRoulette />}
            {activeTab === "pay" && <PayRoulette />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 底部 */}
      <footer className="text-center py-6 pb-8">
        <p className="text-[10px] text-text-secondary/30 font-medium">
          Made with 💖 · 今天谁干嘛 · v1.0
        </p>
        <p className="text-[10px] text-text-secondary/20 mt-0.5">
          恋爱决策神器 · 无后端纯前端 · 数据仅存你手机里
        </p>
      </footer>
    </main>
  );
}
