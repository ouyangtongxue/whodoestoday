// ============================================================
// 《今天谁干嘛》 - LocalStorage 持久化工具
// 前端即数据库，零服务器开销！穷且益坚 🚀
// ============================================================

import type { LocalAppData, FoodItem, ChoreItem } from "./types";
import { STORAGE_KEY, DEFAULT_FOOD_POOL, DEFAULT_CHORE_POOL, DEFAULT_MY_NAME, DEFAULT_PARTNER_NAME } from "./constants";

/** 获取默认数据 */
function getDefaultData(): LocalAppData {
  return {
    foodPool: [...DEFAULT_FOOD_POOL],
    chorePool: [...DEFAULT_CHORE_POOL],
    partnerName: DEFAULT_PARTNER_NAME,
    myName: DEFAULT_MY_NAME,
    lastUpdated: Date.now(),
  };
}

/** 从 LocalStorage 读取应用数据 */
export function loadData(): LocalAppData {
  if (typeof window === "undefined") return getDefaultData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    const parsed = JSON.parse(raw) as LocalAppData;
    // 基础校验
    if (!parsed.foodPool || !parsed.chorePool) return getDefaultData();
    return {
      ...parsed,
      foodPool: parsed.foodPool || [],
      chorePool: parsed.chorePool || [],
    };
  } catch {
    return getDefaultData();
  }
}

/** 保存应用数据到 LocalStorage */
export function saveData(data: LocalAppData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...data, lastUpdated: Date.now() })
    );
  } catch (e) {
    console.warn("💾 存储满了！是不是该清理一下？", e);
  }
}

/** 仅更新食物池 */
export function saveFoodPool(pool: FoodItem[]): void {
  const data = loadData();
  data.foodPool = pool;
  saveData(data);
}

/** 仅更新家务池 */
export function saveChorePool(pool: ChoreItem[]): void {
  const data = loadData();
  data.chorePool = pool;
  saveData(data);
}

/** 更新名字 */
export function saveNames(myName: string, partnerName: string): void {
  const data = loadData();
  data.myName = myName || DEFAULT_MY_NAME;
  data.partnerName = partnerName || DEFAULT_PARTNER_NAME;
  saveData(data);
}

/** 重置所有数据 */
export function resetData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
