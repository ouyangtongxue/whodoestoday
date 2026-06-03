"use client";

// ============================================================
// FoodRoulette — 功能 A：今天吃什么（干饭盲盒）
// 疯狂摇晃的炒锅 → 老虎机滚动 → 结果揭晓
// ============================================================

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FoodItem } from "@/lib/types";
import { saveFoodPool } from "@/lib/storage";
import { loadData } from "@/lib/storage";
import { FOOD_EMOJIS } from "@/lib/constants";
import ShareButton from "./ShareButton";
import ResultModal from "./ResultModal";

interface FoodRouletteProps {
  /** 外部传入的预选池（来自分享链接） */
  sharedPool?: FoodItem[];
}

export default function FoodRoulette({ sharedPool }: FoodRouletteProps) {
  const [foodPool, setFoodPool] = useState<FoodItem[]>([]);
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodEmoji, setNewFoodEmoji] = useState("🍲");
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<FoodItem | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [phase, setPhase] = useState<"idle" | "shaking" | "rolling" | "done">("idle");
  const [editMode, setEditMode] = useState(false);
  const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [displayItem, setDisplayItem] = useState<FoodItem | null>(null);

  // 初始化
  useEffect(() => {
    if (sharedPool && sharedPool.length > 0) {
      setFoodPool(sharedPool);
    } else {
      const data = loadData();
      setFoodPool(data.foodPool);
    }
  }, [sharedPool]);

  // 同步到 localStorage
  useEffect(() => {
    if (foodPool.length > 0 && !sharedPool) {
      saveFoodPool(foodPool);
    }
  }, [foodPool, sharedPool]);

  // 添加食物
  const addFood = useCallback(() => {
    const name = newFoodName.trim();
    if (!name) return;
    if (foodPool.some((f) => f.name === name)) {
      alert("这个已经加过了啦～别重复添加嘛 🥺");
      return;
    }
    const item: FoodItem = {
      id: `f${Date.now()}`,
      name,
      emoji: newFoodEmoji,
    };
    setFoodPool((prev) => [...prev, item]);
    setNewFoodName("");
  }, [newFoodName, newFoodEmoji, foodPool]);

  // 删除食物
  const removeFood = useCallback((id: string) => {
    setFoodPool((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // 开始抽选
  const startRoulette = useCallback(() => {
    if (foodPool.length === 0) {
      alert("食物池是空的！先加几个你想吃的吧～ 🍽️");
      return;
    }
    if (foodPool.length === 1) {
      // 只有一个就直接出结果
      setResult(foodPool[0]);
      setShowResult(true);
      return;
    }

    setSpinning(true);
    setPhase("shaking");

    // Phase 1: 摇晃 (1s)
    setTimeout(() => {
      setPhase("rolling");

      // Phase 2: 老虎机滚动 (1.5s)
      let count = 0;
      const maxCount = 20;
      spinIntervalRef.current = setInterval(() => {
        const idx = Math.floor(Math.random() * foodPool.length);
        setDisplayItem(foodPool[idx]);
        count++;
      }, 80);

      // Phase 3: 减速停止
      setTimeout(() => {
        let slowCount = 0;
        const slowMax = 10;
        if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
        spinIntervalRef.current = setInterval(() => {
          const idx = Math.floor(Math.random() * foodPool.length);
          setDisplayItem(foodPool[idx]);
          slowCount++;
          if (slowCount >= slowMax) {
            if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
            // 最终结果
            const finalIdx = Math.floor(Math.random() * foodPool.length);
            const finalItem = foodPool[finalIdx];
            setResult(finalItem);
            setDisplayItem(finalItem);
            setPhase("done");
            setSpinning(false);
            setTimeout(() => setShowResult(true), 200);
          }
        }, 150);
      }, 1600);
    }, 1000);
  }, [foodPool]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    };
  }, []);

  // 随机食物 Emoji
  const randomFoodEmoji = () => {
    const emoji = FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)];
    setNewFoodEmoji(emoji);
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 pb-24">
      {/* 卡片 */}
      <div className="glass-card p-5">
        {/* 标题 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-text-primary flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            今天吃什么 · 干饭盲盒
          </h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="text-xs font-bold text-pink-primary hover:text-purple-pop transition-colors"
          >
            {editMode ? "完成 ✅" : "编辑 ✏️"}
          </button>
        </div>

        {/* 编辑模式 — 食物池管理 */}
        <AnimatePresence>
          {editMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-pink-lighter/30 rounded-2xl p-3 space-y-3">
                {/* 添加行 */}
                <div className="flex gap-2">
                  <button
                    onClick={randomFoodEmoji}
                    className="shrink-0 w-10 h-10 rounded-xl bg-white border-2 border-pink-200 text-xl flex items-center justify-center hover:scale-110 transition-transform"
                    title="随机 emoji"
                  >
                    {newFoodEmoji}
                  </button>
                  <input
                    type="text"
                    value={newFoodName}
                    onChange={(e) => setNewFoodName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addFood()}
                    placeholder="输入菜名，如：黄焖鸡..."
                    className="flex-1 rounded-xl border-2 border-pink-200 px-3 py-2 text-sm font-medium text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-pink-primary transition-colors"
                    maxLength={12}
                  />
                  <button
                    onClick={addFood}
                    className="shrink-0 bg-pink-primary text-white rounded-xl px-4 py-2 text-sm font-bold hover:bg-purple-pop transition-colors"
                  >
                    添加
                  </button>
                </div>

                {/* 批量 Emoji 选择 */}
                <div className="flex flex-wrap gap-1.5">
                  {FOOD_EMOJIS.slice(0, 10).map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setNewFoodEmoji(emoji)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all ${
                        newFoodEmoji === emoji
                          ? "bg-pink-primary/20 scale-110 ring-2 ring-pink-primary"
                          : "bg-white hover:bg-pink-lighter/50"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                {/* 已有食物列表 */}
                {foodPool.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {foodPool.map((item) => (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-1 tag-pill cursor-pointer hover:line-through hover:opacity-60 transition-all"
                        onClick={() => removeFood(item.id)}
                        title="点击删除"
                      >
                        {item.emoji} {item.name}
                        <span className="text-[10px] ml-0.5">✕</span>
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-[10px] text-text-secondary/50 text-center">
                  点击已有标签可删除 ✨
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 抽选区域 */}
        <div className="text-center">
          {/* 展示区 */}
          <div className="relative mb-5">
            {/* 锅的背景 */}
            <div
              className={`mx-auto w-40 h-40 rounded-full bg-gradient-to-br from-orange-warm/20 via-yellow-light to-pink-lighter flex items-center justify-center transition-all duration-500 ${
                phase === "shaking" ? "animate-shake-pan" : ""
              } ${phase === "done" ? "animate-pulse-ring" : ""}`}
            >
              {/* 展示内容 */}
              {phase === "idle" && (
                <div className="text-center animate-float">
                  <span className="text-5xl">🍳</span>
                  <p className="text-xs text-text-secondary/60 mt-1 font-medium">
                    点击下方按钮开抽
                  </p>
                </div>
              )}
              {(phase === "shaking" || phase === "rolling" || phase === "done") && (
                <div className="text-center">
                  <motion.span
                    key={displayItem?.id ?? "rolling"}
                    className="text-5xl inline-block"
                    initial={phase === "shaking" ? { scale: 0.5, opacity: 0 } : false}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    {displayItem?.emoji ?? "🍳"}
                  </motion.span>
                  {displayItem && (
                    <motion.p
                      className="text-sm font-black text-text-primary mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1 }}
                    >
                      {displayItem.name}
                    </motion.p>
                  )}
                </div>
              )}
            </div>

            {/* 食材飞溅粒子 */}
            {phase === "shaking" && (
              <div className="absolute inset-0 pointer-events-none">
                <span className="absolute top-0 left-4 animate-confetti-1 text-lg">🥬</span>
                <span className="absolute top-1 right-3 animate-confetti-2 text-lg">🥩</span>
                <span className="absolute bottom-2 left-2 animate-confetti-3 text-lg">🌶️</span>
                <span className="absolute bottom-0 right-4 animate-confetti-4 text-lg">🧄</span>
              </div>
            )}
          </div>

          {/* 按钮 */}
          <button
            onClick={startRoulette}
            disabled={spinning}
            className={`btn-primary text-base px-10 py-3 transition-all duration-300 ${
              spinning ? "opacity-60 cursor-not-allowed scale-95" : "animate-pulse-ring"
            }`}
          >
            {spinning ? (
              <span className="flex items-center gap-2">
                <span className="inline-block animate-spin">🥘</span>
                正在疯狂翻炒中...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>🔥</span>
                开始干饭！
                <span>🔥</span>
              </span>
            )}
          </button>

          {foodPool.length === 0 && !editMode && (
            <p className="text-xs text-text-secondary/50 mt-3">
              👆 先点"编辑"添加你想吃的～
            </p>
          )}
        </div>
      </div>

      {/* 分享按钮 */}
      {foodPool.length > 0 && (
        <div className="mt-4 flex justify-center">
          <ShareButton
            foodPool={foodPool}
            type="food"
            label="把食物池发给另一半，一起决定吃啥～"
          />
        </div>
      )}

      {/* 结果弹窗 */}
      <ResultModal
        open={showResult}
        onClose={() => {
          setShowResult(false);
          setPhase("idle");
          setDisplayItem(null);
          setResult(null);
        }}
        emoji={result?.emoji ?? "🍽️"}
        title={`今天吃 —— ${result?.name ?? "???"}`}
        subtitle={`命运之锅已揭晓！别挣扎了，${result?.name ?? "这顿饭"}在召唤你 🍴\n干饭人，干饭魂，干饭都是人上人！`}
        badge="干饭盲盒 已开"
      >
        {result && (
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-2xl animate-float">🍚</span>
            <span className="text-2xl animate-float animation-delay-200">🥢</span>
            <span className="text-2xl animate-float animation-delay-400">🍵</span>
          </div>
        )}
      </ResultModal>
    </section>
  );
}
