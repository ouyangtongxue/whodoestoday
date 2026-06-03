// ============================================================
// 《今天谁干嘛》 - 核心类型定义
// 严格 Typed，拒绝 any 教
// ============================================================

/** 食物条目 */
export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
}

/** 家务条目 */
export interface ChoreItem {
  id: string;
  name: string;
  emoji: string;
  /** 对应的趣味文案 */
  gloryText: string;
  /** 偷懒被抓的文案 */
  lazyText: string;
}

/** 支付结果类型 */
export type PayResultType =
  | "male_pay"       // 男主人买单
  | "female_pay"     // 女主人买单
  | "aa"             // AA制
  | "cosmic_male"    // 宇宙神秘力量 — 男方输
  | "cosmic_female"; // 宇宙神秘力量 — 女方输

/** 支付结果 */
export interface PayResult {
  type: PayResultType;
  title: string;
  subtitle: string;
  emoji: string;
}

/** 功能标签 */
export type FeatureTab = "food" | "chore" | "pay";

/** 分享数据的载荷 */
export interface SharePayload {
  v: number;            // 版本号
  type: FeatureTab;
  foodPool?: FoodItem[];
  chorePool?: ChoreItem[];
  timestamp: number;
  /** 发起分享的人名（可选） */
  senderName?: string;
}

/** 用户本地持久化的完整数据 */
export interface LocalAppData {
  foodPool: FoodItem[];
  chorePool: ChoreItem[];
  partnerName: string;
  myName: string;
  lastUpdated: number;
}

/** 摇人结果 */
export interface RouletteResult<T = string> {
  item: T;
  displayText: string;
  emoji: string;
}
