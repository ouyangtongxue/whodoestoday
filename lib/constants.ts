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
    emoji: "🧤",
    gloryText: "围裙已就位，水龙头在呼唤你！手套戴好，开工吧",
    lazyText: "对方已被命运选中，请微笑着递上手套",
  },
  {
    id: "c2",
    name: "倒垃圾",
    emoji: "🚮",
    gloryText: "垃圾终结者上线！今日任务：清空所有垃圾桶",
    lazyText: "垃圾桶：今天还没满，明天再倒也行…",
  },
  {
    id: "c3",
    name: "拖地",
    emoji: "🧹",
    gloryText: "地板美容师！让每一寸地板反光到发光",
    lazyText: "地板：其实我还挺干净的，真的…",
  },
  {
    id: "c4",
    name: "做饭",
    emoji: "🧑‍🍳",
    gloryText: "主厨登基！今日厨房就是你的米其林战场",
    lazyText: "外卖骑士已在路上，请耐心等待…",
  },
  {
    id: "c5",
    name: "洗衣服",
    emoji: "🧺",
    gloryText: "洗衣达人上线！让每一件衣服干干净净",
    lazyText: "洗衣机：其实我可以自己转的…",
  },
  {
    id: "c6",
    name: "铲猫砂",
    emoji: "🐱",
    gloryText: "铲屎官驾到！猫主子表示满意",
    lazyText: "猫：喵？（翻译：还不快去铲！）",
  },
];

/** 默认支付结果集 */
export const PAY_RESULTS: PayResult[] = [
  {
    type: "male_pay",
    title: "男方请客",
    subtitle: "今天这顿你包了！刷卡姿势要帅，输密码要快",
    emoji: "🙋‍♂️",
  },
  {
    type: "female_pay",
    title: "女方请客",
    subtitle: "今天的消费由你承包！大方掏出手机扫码吧",
    emoji: "🙋‍♀️",
  },
  {
    type: "aa",
    title: "AA 制",
    subtitle: "感情不伤钱包，各自扫码，公平又自在",
    emoji: "🤝",
  },
  {
    type: "cosmic_male",
    title: "命运裁定：男方全包",
    subtitle: "星象显示…男方全包！别挣扎了，这是天意",
    emoji: "🤷‍♂️",
  },
  {
    type: "cosmic_female",
    title: "命运裁定：女方全包",
    subtitle: "星象显示…女方全包！命运之轮已经转动",
    emoji: "🤷‍♀️",
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
export const APP_TITLE = "今天谁干嘛";

/** 通用 Emoji 映射 */
export const FOOD_EMOJIS = ["🍲","🍜","🍔","🍣","🍕","🌮","🥗","🍝","🍖","🍗","🥘","🫕","🥟","🍱","🍛","🍤","🥩","🧆","🍿","🥨","🧑‍🍳","🥢"];
export const CHORE_EMOJIS = ["🧹","👨‍🍳","🧺","🪴","🛒","🧽","🧑‍🔧","🫧","🧤","🪣"];
