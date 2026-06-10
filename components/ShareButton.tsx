"use client";

// ============================================================
// ShareButton — 分享链接生成器
// Base64 编码数据 → 生成分享 URL → 一键复制
// 极简黑白灰风格
// ============================================================

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FoodItem, ChoreItem, FeatureTab } from "@/lib/types";
import { generateShareUrl } from "@/lib/encrypt";
import { loadData } from "@/lib/storage";

interface ShareButtonProps {
  type: FeatureTab;
  foodPool?: FoodItem[];
  chorePool?: ChoreItem[];
  label?: string;
}

export default function ShareButton({
  type,
  foodPool,
  chorePool,
  label,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const handleGenerate = useCallback(() => {
    const data = loadData();
    const url = generateShareUrl({
      v: 1,
      type,
      foodPool: foodPool ?? data.foodPool,
      chorePool: chorePool ?? data.chorePool,
      timestamp: Date.now(),
      senderName: data.myName || "我",
    });
    setShareUrl(url);
  }, [type, foodPool, chorePool]);

  const handleCopy = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const handleOpenPanel = () => {
    setShowPanel(true);
    handleGenerate();
  };

  return (
    <>
      {/* 触发按钮 */}
      <button
        onClick={handleOpenPanel}
        className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 text-sm font-semibold text-text-primary hover:bg-muted hover:border-text-muted transition-all shadow-sm"
      >
        <span>🔗</span>
        发给另一半
      </button>

      {/* 分享面板 */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          >
            {/* 遮罩 */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setShowPanel(false)}
            />

            {/* 面板 */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-2xl p-5 w-full max-w-sm shadow-xl border border-border"
            >
              {/* 标题 */}
              <div className="text-center mb-3">
                <span className="text-4xl animate-float">🔗</span>
                <h3 className="text-lg font-bold text-text-primary mt-1">
                  把链接发给另一半
                </h3>
                <p className="text-xs text-text-secondary mt-1">
                  {label ?? "对方打开链接就能看到同样的配置"}
                </p>
              </div>

              {/* URL 展示 */}
              <div className="bg-muted rounded-xl p-3 mb-3">
                <p className="text-[10px] font-semibold text-text-secondary mb-1">
                  分享链接（已加密你的配置）：
                </p>
                <div className="bg-white rounded-lg p-3 break-all text-xs text-text-primary font-mono max-h-20 overflow-y-auto border border-border">
                  {shareUrl || "正在生成..."}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className={`flex-1 rounded-lg py-3 font-semibold text-sm transition-all ${
                    copied
                      ? "bg-muted text-text-primary border border-border"
                      : "bg-accent text-white hover:bg-accent-hover"
                  }`}
                >
                  {copied ? "已复制 ✓" : "一键复制链接"}
                </button>
                <button
                  onClick={() => setShowPanel(false)}
                  className="flex-1 bg-muted rounded-lg py-3 font-semibold text-sm text-text-secondary hover:bg-border transition-colors"
                >
                  关掉
                </button>
              </div>

              {/* 提示 */}
              <p className="text-[10px] text-text-muted text-center mt-3">
                如果对方用微信打开，直接粘贴到聊天框发送即可
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
