"use client";

// ============================================================
// PayRoulette — 功能 C：今天谁买单（记账盲盒）
// 输入金额 → 旋转命运轮盘 → 揭晓谁买单
// 极简黑白灰风格
// ============================================================

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PayResult } from "@/lib/types";
import { PAY_RESULTS } from "@/lib/constants";
import ResultModal from "./ResultModal";

export default function PayRoulette() {
  const [amount, setAmount] = useState<string>("");
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<PayResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);

  const startSpin = useCallback(() => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("先输入今天的消费金额呀");
      return;
    }

    setSpinning(true);
    let count = 0;
    const maxCount = 25;
    const interval = setInterval(() => {
      setDisplayIndex(Math.floor(Math.random() * PAY_RESULTS.length));
      count++;
      if (count >= maxCount) {
        clearInterval(interval);
        // 加权随机
        const weights = [0.2, 0.2, 0.25, 0.15, 0.2];
        const total = weights.reduce((a, b) => a + b, 0);
        let r = Math.random() * total;
        let idx = 0;
        for (let i = 0; i < weights.length; i++) {
          r -= weights[i];
          if (r <= 0) {
            idx = i;
            break;
          }
        }
        const final = PAY_RESULTS[idx];
        setResult(final);
        setDisplayIndex(idx);
        setSpinning(false);
        setTimeout(() => setShowResult(true), 300);
      }
    }, 80);
  }, [amount]);

  return (
    <section className="w-full max-w-md mx-auto px-4 pb-24">
      <div className="glass-card p-5">
        {/* 标题 */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <span className="text-xl">💁</span>
            今天谁买单 · 记账盲盒
          </h2>
          <p className="text-xs text-text-muted mt-1 ml-9">
            输入金额，命运会告诉你答案
          </p>
        </div>

        {/* 金额输入 */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-text-secondary mb-2 ml-1">
            今天消费金额
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-text-muted">
              ¥
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="输入金额，如 188.00"
              className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-3.5 text-xl font-bold text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/5 transition-all"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* 命运转盘展示区 */}
        <div className="text-center mb-5">
          <div className="relative mx-auto w-44 h-44">
            {/* 外圈旋转光环 — 极简虚线 */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-dashed border-border transition-all ${
                spinning ? "animate-spin" : ""
              }`}
              style={{ animationDuration: spinning ? "1.2s" : "0s" }}
            />

            {/* 中间展示 */}
            <div className="absolute inset-3 rounded-full bg-muted flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayIndex}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-center"
                >
                  <span className="text-5xl">{PAY_RESULTS[displayIndex]?.emoji ?? "💁"}</span>
                  <p className="text-xs font-semibold text-text-primary mt-1 max-w-[100px] mx-auto leading-tight">
                    {PAY_RESULTS[displayIndex]?.title ?? "..."}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 装饰 */}
            {spinning && (
              <>
                <span className="absolute -top-2 -right-2 text-lg animate-float">▪</span>
                <span className="absolute -bottom-2 -left-2 text-lg animate-float animation-delay-300">▫</span>
              </>
            )}
          </div>

          {/* 金额展示 */}
          {amount && parseFloat(amount) > 0 && (
            <p className="mt-3 text-sm font-semibold text-text-secondary">
              本单金额：<span className="text-accent text-lg font-bold">¥{parseFloat(amount).toFixed(2)}</span>
            </p>
          )}
        </div>

        {/* 按钮 */}
        <div className="text-center">
          <button
            onClick={startSpin}
            disabled={spinning || !amount || parseFloat(amount) <= 0}
            className={`btn-primary text-base px-10 py-3 transition-all duration-300 ${
              spinning ? "opacity-50 cursor-not-allowed" : "animate-pulse-ring"
            }`}
          >
            {spinning ? (
              <span className="flex items-center gap-2">
                <span className="inline-block animate-spin">💫</span>
                命运裁决中...
              </span>
            ) : (
              <span>一键抽取</span>
            )}
          </button>

          {(!amount || parseFloat(amount) <= 0) && (
            <p className="text-xs text-text-muted mt-3">
              👆 先输入今天的消费金额
            </p>
          )}
        </div>
      </div>

      {/* 近期记录 */}
      {result && !showResult && (
        <div className="mt-4 glass-card p-3 flex items-center gap-3">
          <span className="text-3xl">{result.emoji}</span>
          <div>
            <p className="text-sm font-bold text-text-primary">{result.title}</p>
            <p className="text-xs text-text-secondary">{result.subtitle}</p>
          </div>
        </div>
      )}

      {/* 结果弹窗 */}
      <ResultModal
        open={showResult}
        onClose={() => {
          setShowResult(false);
        }}
        emoji={result?.emoji ?? "💁"}
        title={result?.title ?? "账单揭晓"}
        subtitle={
          result
            ? `${result.subtitle}\n\n本单 ¥${parseFloat(amount || "0").toFixed(2)} — 命运已做出裁决`
            : "命运还在加载中..."
        }
        badge="记账盲盒 已开"
        autoClose={false}
      >
        {result && (
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="text-2xl animate-float">💰</span>
            <span className="text-3xl font-extrabold text-text-primary">
              ¥{parseFloat(amount || "0").toFixed(2)}
            </span>
            <span className="text-2xl animate-float animation-delay-200">🧾</span>
          </div>
        )}
      </ResultModal>
    </section>
  );
}
