"use client";

// ============================================================
// 《今天谁干嘛》— 主页面
// 三大功能模块 + Tab 切换 + 移动端优先 · 极简风格
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
      "确定要重置所有数据吗？\n\n你的食物池、家务池都会回到默认状态。\n（分享出去的链接不受影响）"
    );
    if (confirmed) {
      import("@/lib/storage").then(({ resetData }) => {
        resetData();
        window.location.reload();
      });
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto rounded-full border-2 border-border border-t-accent animate-spin" />
          <p className="text-sm text-text-muted mt-3">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg">
      {/* Header */}
      <Header onReset={handleReset} />

      {/* Tab 切换 */}
      <TabSwitcher active={activeTab} onChange={setActiveTab} />

      {/* 内容区 — 带过渡动画 */}
      <div className="relative mt-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {activeTab === "food" && <FoodRoulette />}
            {activeTab === "chore" && <ChoreRoulette />}
            {activeTab === "pay" && <PayRoulette />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 底部 */}
      <footer className="text-center py-8 pb-10">
        <p className="text-xs text-text-muted">
          今天谁干嘛 · v1.0
        </p>
        <p className="text-[10px] text-text-muted/50 mt-1">
          无后端纯前端 · 数据仅存你手机里
        </p>
      </footer>
    </main>
  );
}
