// ============================================================
// 《今天谁干嘛》 - 常量 & 默认数据
// 懒人必备，万物初始
// ============================================================

import type { ChoreItem, FoodItem, PayResult } from "./types";

/** 默认食物池 — 涵盖中华美食图谱の冰山一角 */
export const DEFAULT_FOOD_POOL: FoodItem[] = [
  { id: "f1", name: "火锅", emoji: "🍲" },
  { id: "f2", name: "麻辣烫", emoji: "🥘" },
  { id: "f3", name: "螺蛳粉", emoji: "🍜" },
  { id: "f4", name: "汉堡", emoji: "🍔" },
  { id: "f5", name: "寿司", emoji: "🍣" },
  { id: "f6", name: "披萨", emoji: "🍕" },
  { id: "f7", name: "麻辣香锅", emoji: "🌶️" },
  { id: "f8", name: "黄焖鸡米饭", emoji: "🐔" },
  { id: "f9", name: "沙县小吃", emoji: "🥟" },
  { id: "f10", name: "兰州拉面", emoji: "🍝" },
  { id: "f11", name: "烧烤", emoji: "🍖" },
  { id: "f12", name: "炸鸡", emoji: "🍗" },
];

/** 默认家务池 */
export const DEFAULT_CHORE_POOL: ChoreItem[] = [
  {
    id: "c1",
    name: "洗碗",
    emoji: "🧼",
    gloryText: "懒猪盖章 🐷 不可抵赖！围裙已就位，水龙头在呼唤你！",
    lazyText: "对方已被命运选中，请微笑着递上手套 🙌",
  },
  {
    id: "c2",
    name: "倒垃圾",
    emoji: "🗑️",
    gloryText: "垃圾终结者 🦸 今日任务：清空所有垃圾桶！",
    lazyText: "垃圾桶表示：今天不是我满的日子，明天再倒也行...",
  },
  {
    id: "c3",
    name: "拖地",
    emoji: "🧹",
    gloryText: "地板美容师 ✨ 让每一寸地板反光到刺眼！",
    lazyText: "地板说：其实我还挺干净的，真的...",
  },
  {
    id: "c4",
    name: "做饭",
    emoji: "👨‍🍳",
    gloryText: "主厨登基 👑 今日厨房就是你的米其林战场！",
    lazyText: "外卖骑士已在路上，请耐心等待... 🛵",
  },
  {
    id: "c5",
    name: "洗衣服",
    emoji: "🧺",
    gloryText: "洗衣仙子上线 🧚 让每一件衣服香喷喷！",
    lazyText: "洗衣机：其实我可以自己转的...",
  },
  {
    id: "c6",
    name: "铲猫砂",
    emoji: "🐱",
    gloryText: "御前铲屎官驾到 💩 猫主子表示满意！",
    lazyText: "猫：喵？（翻译：快去铲！）",
  },
];

/** 默认支付结果集 */
export const PAY_RESULTS: PayResult[] = [
  {
    type: "male_pay",
    title: "尊贵的男主人",
    subtitle: "御赐本顿晚饭！刷卡姿势要帅，输密码要快 💳✨",
    emoji: "🤴",
  },
  {
    type: "female_pay",
    title: "女王大人买单",
    subtitle: "今天的消费由本宫承包！其他人退下～ 👸💅",
    emoji: "👸",
  },
  {
    type: "aa",
    title: "AA制",
    subtitle: "感情不伤钱包，各自扫码，爱情不打折 💕📱",
    emoji: "🤝",
  },
  {
    type: "cosmic_male",
    title: "宇宙神秘力量裁决",
    subtitle: "星象显示...男方全包！别挣扎了，这是天意 🌌🙇",
    emoji: "🌠",
  },
  {
    type: "cosmic_female",
    title: "宇宙神秘力量裁决",
    subtitle: "星象显示...女方全包！命运之轮已经转动 🔮💸",
    emoji: "🔮",
  },
];

/** 默认名 */
export const DEFAULT_PARTNER_NAME = "TA";
export const DEFAULT_MY_NAME = "我";

/** 存储键 */
export const STORAGE_KEY = "whodoestoday_data";

/** 分享数据版本 */
export const SHARE_VERSION = 1;

/** App 标题 */
export const APP_TITLE = "今天谁干嘛 💑";

/** 通用 Emoji 映射 */
export const FOOD_EMOJIS = ["🍲","🍜","🍔","🍣","🍕","🌮","🥗","🍝","🍖","🍗","🥘","🫕","🥟","🍱","🍛","🍤","🥩","🧆","🍿","🥨"];
export const CHORE_EMOJIS = ["🧼","🗑️","🧹","👨‍🍳","🧺","🐱","🪴","🛒","🧽","🫧"];
