# 💑 今天谁干嘛 — 恋爱决策神器

> 今天吃啥？谁洗碗？谁买单？一键抽选，拒绝选择困难症！

专为情侣 / 伴侣设计的趣味生活决策 Web 应用。零后端、纯前端、移动端优先，完美适配微信内置浏览器。

---

## ✨ 三大核心功能

| 功能 | 说明 | 动画 |
|------|------|------|
| 🍳 **干饭盲盒** | 自定义食物池，一键抽取今天吃什么 | 疯锅颠勺 → 老虎机滚动 → 揭晓 |
| 🎰 **家务大冒险** | 刮刮乐盲盒翻牌，随机决定谁洗碗/倒垃圾 | 刮刮乐揭示 → 3D 翻转 → 宣判 |
| 💳 **今天谁买单** | 输入金额，命运转盘决定谁掏钱包 | 命运转盘旋转 → 加权随机 → 账单揭晓 |

每次抽选都有戏谑幽默的文案和 confetti 彩屑飘落特效。

---

## 🔗 双人同屏交互（核心亮点）

- **A 端**：选好菜单/家务池 → 点击「发给另一半」→ 自动生成 Base64 加密链接
- **B 端**：微信里点开链接 → 自动同步 A 的配置 → 同屏刮奖开盲盒

无需后端，无需登录，数据通过 URL 传递，所有配置存储在 LocalStorage 中。

```
https://你的域名/game?data=eyJ2IjoxLCJ0eXBlIjoiZm9vZCIs...
```

---

## 🛠️ 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript（严格模式） |
| 样式 | Tailwind CSS v4 |
| 动画 | Framer Motion + 原生 CSS Keyframes |
| 存储 | LocalStorage（零服务器开销） |
| 部署 | Vercel + 自定义域名 |

---

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 浏览器打开
open http://localhost:3000
```

---

## 📦 生产部署

### Vercel（推荐，免费）

1. 把代码推到 GitHub
2. 打开 [vercel.com/import](https://vercel.com/import) 导入仓库
3. 一键部署，获得 `*.vercel.app` 域名

### 绑定自定义域名（国内访问必备）

`*.vercel.app` 在国内可能被墙，建议绑定自有域名：

1. 在 Vercel 项目 → Settings → Domains 添加你的域名
2. 在域名 DNS 控制台添加 CNAME 记录指向 `cname.vercel-dns.com`
3. 等待 SSL 证书自动签发

---

## 📁 项目结构

```
whodoestoday/
├── app/
│   ├── globals.css           # 全局样式 + 15+ 自定义动画
│   ├── layout.tsx            # 根布局（SEO / Viewport）
│   ├── page.tsx              # 主页（Tab 切换 + 三大功能）
│   └── game/
│       └── page.tsx          # 分享链接着陆页（解析 URL 参数）
├── components/
│   ├── Header.tsx            # 顶部标题 + 微信浮窗提示
│   ├── TabSwitcher.tsx       # 底部标签导航
│   ├── FoodRoulette.tsx      # 功能 A：干饭盲盒
│   ├── ChoreRoulette.tsx     # 功能 B：家务大冒险
│   ├── PayRoulette.tsx       # 功能 C：谁买单
│   ├── ResultModal.tsx       # 通用结果弹窗
│   └── ShareButton.tsx       # 摇人链接生成器
└── lib/
    ├── types.ts              # TypeScript 类型定义
    ├── constants.ts          # 默认数据 & 文案
    ├── storage.ts            # LocalStorage 持久化工具
    └── encrypt.ts            # Base64 URL 编解码
```

---

## 🎨 视觉风格

- **MBE 插画风格**：粗边框 + 圆角 + 偏移阴影
- **多巴胺配色**：粉嫩渐变（#FF6B9D → #C084FC → #FFD700）
- **毛玻璃卡片**：`backdrop-blur` + 半透明白底
- **15+ 自定义动画**：颠勺、老虎机、刮刮乐、转盘、confetti 飘落

---

## 🔧 自定义配置

### 修改默认食物池

编辑 `lib/constants.ts` 中的 `DEFAULT_FOOD_POOL` 数组。

### 修改默认家务池

编辑 `lib/constants.ts` 中的 `DEFAULT_CHORE_POOL` 数组。

### 修改支付结果文案

编辑 `lib/constants.ts` 中的 `PAY_RESULTS` 数组。

---

## 📝 License

MIT

---

<p align="center">
  Made with 💖 by Charlie Young
</p>
