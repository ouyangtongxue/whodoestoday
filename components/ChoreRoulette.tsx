"use client";

// ============================================================
// ChoreRoulette — 功能 B：家务大冒险（谁去洗碗）
// 刮刮乐 / 翻牌动画 — 命运之卡
// 极简黑白灰风格
// ============================================================

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChoreItem } from "@/lib/types";
import { saveChorePool, loadData } from "@/lib/storage";
import { CHORE_EMOJIS } from "@/lib/constants";
import ShareButton from "./ShareButton";
import ResultModal from "./ResultModal";

interface ChoreRouletteProps {
  sharedPool?: ChoreItem[];
}

export default function ChoreRoulette({ sharedPool }: ChoreRouletteProps) {
  const [chorePool, setChorePool] = useState<ChoreItem[]>([]);
  const [newChoreName, setNewChoreName] = useState("");
  const [newChoreEmoji, setNewChoreEmoji] = useState("🧤");
  const [newChoreGlory, setNewChoreGlory] = useState("");
  const [newChoreLazy, setNewChoreLazy] = useState("");
  const [result, setResult] = useState<ChoreItem | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [scratching, setScratching] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // 初始化
  useEffect(() => {
    const data = loadData();
    if (sharedPool && sharedPool.length > 0) {
      setChorePool(sharedPool);
    } else {
      setChorePool(data.chorePool);
    }
  }, [sharedPool]);

  // 同步
  useEffect(() => {
    if (chorePool.length > 0 && !sharedPool) {
      saveChorePool(chorePool);
    }
  }, [chorePool, sharedPool]);

  const addChore = useCallback(() => {
    const name = newChoreName.trim();
    if (!name) return;
    const item: ChoreItem = {
      id: `c${Date.now()}`,
      name,
      emoji: newChoreEmoji,
      gloryText: newChoreGlory || `${name}光荣使者 ✨ 命运选择了你！`,
      lazyText: newChoreLazy || `${name}豁免权 🎉 今天可以躺平！`,
    };
    setChorePool((prev) => [...prev, item]);
    setNewChoreName("");
    setNewChoreGlory("");
    setNewChoreLazy("");
  }, [newChoreName, newChoreEmoji, newChoreGlory, newChoreLazy]);

  const removeChore = useCallback((id: string) => {
    setChorePool((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const randomEmoji = () => {
    setNewChoreEmoji(CHORE_EMOJIS[Math.floor(Math.random() * CHORE_EMOJIS.length)]);
  };

  // 开始刮奖
  const startScratch = useCallback(() => {
    if (chorePool.length === 0) {
      alert("家务池是空的！先加几个家务吧");
      return;
    }
    setScratching(true);
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const idx = Math.floor(Math.random() * chorePool.length);
      setResult(chorePool[idx]);
      setScratching(false);
      setShowResult(true);
    }, delay);
  }, [chorePool]);

  return (
    <section className="w-full max-w-md mx-auto px-4 pb-24">
      <div className="glass-card p-5">
        {/* 标题 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <span className="text-xl">🙋</span>
            家务大冒险 · 命运刮刮乐
          </h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            {editMode ? "完成" : "编辑"}
          </button>
        </div>

        {/* 编辑模式 */}
        <AnimatePresence>
          {editMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-muted rounded-xl p-3 space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={randomEmoji}
                    className="shrink-0 w-10 h-10 rounded-lg bg-white border border-border text-xl flex items-center justify-center hover:border-text-muted transition-colors"
                  >
                    {newChoreEmoji}
                  </button>
                  <input
                    type="text"
                    value={newChoreName}
                    onChange={(e) => setNewChoreName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addChore()}
                    placeholder="家务名，如：洗碗..."
                    className="flex-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                    maxLength={10}
                  />
                  <button
                    onClick={addChore}
                    className="shrink-0 bg-accent text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-accent-hover transition-colors"
                  >
                    添加
                  </button>
                </div>

                {chorePool.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {chorePool.map((item) => (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-1 bg-muted text-text-primary font-medium text-sm rounded-full px-3 py-1 border border-border cursor-pointer hover:line-through hover:opacity-50 transition-all"
                        onClick={() => removeChore(item.id)}
                        title="点击删除"
                      >
                        {item.emoji} {item.name}
                        <span className="text-[10px]">✕</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 刮奖区 */}
        <div className="text-center">
          {/* 刮刮卡 */}
          <div className="relative mb-5">
            <div className="mx-auto w-56 h-56">
              {/* 刮开前 — 覆盖层 */}
              {!scratching && !showResult && (
                <motion.div
                  className="w-full h-full rounded-2xl bg-accent flex flex-col items-center justify-center cursor-pointer shadow-md border-2 border-accent"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={chorePool.length > 0 ? startScratch : undefined}
                >
                  <span className="text-5xl mb-2">🙋</span>
                  <p className="text-white font-bold text-lg">
                    点我刮奖
                  </p>
                  <p className="text-white/70 text-xs mt-1 font-medium">
                    看看今天谁干活
                  </p>
                </motion.div>
              )}

              {/* 刮开中 — 动画 */}
              {scratching && (
                <div className="w-full h-full rounded-2xl bg-accent flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: ["0%", "100%", "0%"] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative z-10 text-center">
                    <motion.span
                      className="text-5xl inline-block"
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 0.9, 1] }}
                      transition={{ duration: 0.3, repeat: Infinity }}
                    >
                      🙋
                    </motion.span>
                    <p className="text-white/90 font-semibold text-sm mt-2 animate-pulse">
                      命运转动中...
                    </p>
                  </div>
                  {/* 粒子 */}
                  <span className="absolute top-2 left-4 text-sm animate-confetti-1">▪</span>
                  <span className="absolute top-4 right-3 text-sm animate-confetti-2">▫</span>
                  <span className="absolute bottom-3 left-3 text-sm animate-confetti-3">▪</span>
                  <span className="absolute bottom-2 right-5 text-sm animate-confetti-4">▫</span>
                </div>
              )}

              {/* 刮开结果 */}
              {!scratching && showResult && result && (
                <motion.div
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full rounded-2xl bg-white border-2 border-accent flex flex-col items-center justify-center shadow-md"
                >
                  <span className="text-6xl mb-2">{result.emoji}</span>
                  <p className="text-lg font-bold text-text-primary">{result.name}</p>
                  <p className="text-xs text-text-muted mt-1">
                    已被命运选中
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* 按钮 */}
          <button
            onClick={startScratch}
            disabled={scratching || chorePool.length === 0}
            className={`btn-primary text-base px-10 py-3 transition-all duration-300 ${
              scratching ? "opacity-50 cursor-not-allowed" : ""
            } ${chorePool.length === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            {scratching ? (
              <span className="flex items-center gap-2">
                <span className="inline-block animate-spin">🙋</span>
                命运轮盘转动中...
              </span>
            ) : (
              <span>开始摇人</span>
            )}
          </button>

          {chorePool.length === 0 && (
            <p className="text-xs text-text-muted mt-3">
              👆 先点"编辑"添加家务项目
            </p>
          )}
        </div>
      </div>

      {/* 分享 */}
      {chorePool.length > 0 && (
        <div className="mt-4 flex justify-center">
          <ShareButton
            chorePool={chorePool}
            type="chore"
            label="把家务池发给另一半，一起刮奖"
          />
        </div>
      )}

      {/* 结果弹窗 */}
      <ResultModal
        open={showResult}
        onClose={() => {
          setShowResult(false);
          setResult(null);
        }}
        emoji={result?.emoji ?? "🧹"}
        title={`${result?.name ?? "家务"} — 由宇宙选中的人执行`}
        subtitle={
          result
            ? `${result.gloryText}\n\n对方的话：${result.lazyText}`
            : "命运真是残酷又美丽啊"
        }
        badge="家务刮刮乐 已开"
      >
        {result && (
          <div className="bg-muted rounded-xl p-3 mt-2">
            <p className="text-xs text-text-secondary text-center">
              用分享链接让对方也参与进来<br />
              这样输的人就没法抵赖啦
            </p>
          </div>
        )}
      </ResultModal>
    </section>
  );
}
