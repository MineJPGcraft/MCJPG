# CLAUDE.md

此文档为 MCJPG 组织网站代码仓库的完整开发指南，供 Claude/AI 助手和开发者参考。

---

## 项目概述

| 项目 | 说明 |
|------|------|
| 网站 | [mcjpg.org](https://mcjpg.org) |
| 仓库 | [github.com/MineJPGcraft/MCJPG](https://github.com/MineJPGcraft/MCJPG) |
| 技术栈 | **Vitepress** (v1.6.4) + **Vue 3** (v3.5) + **SCSS** + **Tailwind CSS** (v3.4) + **TypeScript** |
| 包管理 | npm/pnpm（见 `package.json` scripts） |
| 许可证 | 见 `LICENSE` |

---

## 目录结构

```
MCJPG/
├── .claude/
│   └── prompts/
│       └── auto-translate.md      # i18n 自动翻译工作流指引
├── .github/                       # GitHub Actions & workflows
├── docs/                          # Vitepress 文档根目录
│   ├── .vitepress/
│   │   ├── config.ts              # 主 VitePress 配置文件（入口）
│   │   ├── configs/               # 模块化配置
│   │   │   ├── zh_CN.ts           # 中文 locale（root）
│   │   │   ├── nav.ts             # 共享导航栏配置
│   │   │   ├── sidebar.ts         # 共享侧边栏配置
│   │   │   └── i18n/
│   │   │       ├── en_US/         # 英文 locale 配置
│   │   │       │   ├── en_US.ts   # 英文 locale 定义
│   │   │       │   ├── nav.ts     # 英文导航栏
│   │   │       │   ├── sidebar.ts # 英文侧边栏
│   │   │       │   └── index.ts   # barrel export
│   │   │       └── zh-classical/  # 文言文 locale 配置
│   │   │           ├── zh_classical.ts
│   │   │           ├── nav.ts     # 文言文导航栏
│   │   │           ├── sidebar.ts # 文言文侧边栏
│   │   │           └── index.ts   # barrel export
│   │   ├── theme/                 # 自定义主题
│   │   │   ├── index.ts           # 主题入口（注册组件、插件）
│   │   │   ├── components/        # Vue 组件
│   │   │   │   ├── MLayout.vue
│   │   │   │   ├── MNavLinks.vue
│   │   │   │   ├── ServerList.vue
│   │   │   │   ├── confetti.vue
│   │   │   │   ├── ArticleMetadata.vue
│   │   │   │   └── DifyChatbot.vue
│   │   │   ├── styles/
│   │   │   │   ├── index.scss
│   │   │   │   └── custom-block.scss
│   │   │   ├── data/
│   │   │   │   ├── serverlist.ts
│   │   │   │   └── servers-temple.json
│   │   │   └── plugins/
│   │   │       └── announcement/
│   │   └── cache/                 # Vite 依赖缓存（勿手动修改）
│   ├── index.md                   # 首页（Home layout）
│   ├── rules/index.md             # 组织规章制度
│   ├── structure/index.md         # 团队介绍
│   ├── project/index.md           # 项目列表
│   ├── press/                     # 组织专栏（特别栏目 + 月刊）
│   ├── nav/index.md               # MC 导航页
│   ├── en/                        # 英文内容（路径镜像，中文目录名不变）
│   │   ├── index.md
│   │   ├── rules/index.md
│   │   ├── structure/index.md
│   │   ├── press/...
│   │   └── nav/index.md
│   └── lch/                       # 文言文内容（路径镜像，中文目录名不变）
│       ├── index.md
│       ├── rules/index.md
│       └── ...
├── node_modules/
├── patches/                       # pnpm patch 文件
├── package.json
├── package-lock.json
├── README.md                      # 中文 README
├── README_EN.md                   # 英文 README
└── CLAUDE.md                      # 本文件
```

---

## 国际化 (i18n) 架构

### 支持的语言

| Locale | 语言 | 路由前缀 | VitePress label |
|--------|------|----------|-----------------|
| `root` | 简体中文 | `/` | `zh-Hans` |
| `en` | English | `/en/` | `en_US` |
| `lch` | 文言文（古典中文） | `/lch/` | `zh-classical` |

### 配置方式

- 主配置在 `docs/.vitepress/config.ts`，通过 `defineConfig` 的 `locales` 字段声明三种语言
- 每种语言的 locale 配置各自定义在 `configs/` 下独立的 TS 文件
- 导航栏 (`nav.ts`) 和侧边栏 (`sidebar.ts`) **按语言分别配置**，但中文版（root）的 nav 和 sidebar 位于 `configs/` 根目录，en/lch 位于各自的 `configs/i18n/` 子目录
- 各语言 nav/sidebar 通过 barrel export (`index.ts`) 统一导出

### 内容镜像规则（⚠️ 重要）

1. **目录路径保持中文不变**：所有语言目录下的 `特别栏目/`、`月刊/` 等中文路径**必须原样保留**
2. **仅翻译文本内容**：Markdown 文件正文、标题、frontmatter 描述等翻译，但目录结构不变
3. **i18n 翻译工作流**：详见 `.claude/prompts/auto-translate.md`

---

## 自定义主题与组件

### 主题入口：`docs/.vitepress/theme/index.ts`

集成了以下插件和组件：

| 组件/插件 | 说明 |
|-----------|------|
| `MLayout` | 自定义布局组件 |
| `MNavLinks` | 导航链接卡片组件（用于 `/nav/` 和 `/project/` 页面） |
| `ServerList` | 成员服务器列表，数据来自 `data/servers-temple.json` |
| `confetti` | 首页五彩纸屑特效 (canvas-confetti) |
| `ArticleMetadata` | 文章元数据展示（自动插在 h1 标题下方） |
| `DifyChatbot` | Dify AI 聊天机器人 |
| `giscusTalk` | Giscus 评论区组件（repo: MineJPGcraft/MCJPG） |
| `vitepressMusic` | 页面音乐播放器（播放列表在 theme/index.ts 底部） |
| `mediumZoom` | 图片放大预览 |
| `NProgress` | 页面加载进度条 |
| `announcement` | 公告插件 |

### 样式

- `index.scss`：全局主题样式
- `custom-block.scss`：自定义容器块样式
- 支持 `browser-chrome` / `browser-firefox` / `browser-safari` 浏览器特定样式类
- 首页有彩虹动画特效（`.m-home-layout` 内 logo 旋转动画）

---

## 页面类型与布局

| 页面 | 布局 | 特点 |
|------|------|------|
| `docs/index.md` | `home` + `m-home-layout` | Hero + ServerList + confetti |
| `docs/nav/index.md` | `m-nav-layout` | MNavLinks 卡片导航 |
| `docs/project/index.md` | `m-nav-layout` | MNavLinks 项目卡片 |
| `docs/structure/index.md` | `page` | VPTeamPage 团队展示 |
| `docs/rules/index.md` | 默认 | 纯文档页面 |
| `docs/press/` | 默认 | 专栏文章（侧边栏含特别栏目+月刊） |

---

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev
# 等同于：vitepress dev docs

# 构建生产版本（包含 git fetch --unshallow）
npm run docs:build
# 等同于：git fetch --unshallow && vitepress build docs

# 预览构建产物
npm run docs:preview
# 等同于：vitepress preview docs
```

---

## 提交流程与规范

### 🔴 重要规则

- **禁止直接 commit 到 `main` 主分支**
- 所有修改必须通过 **Pull Request (PR)** 提交
- 修改可以开启新 PR 或追加到已有的 PR

### 提交前检查清单

1. 运行 `npm run docs:dev` 确保网站正常启动
2. 确认所有语言版本的页面同步更新（参见 i18n 翻译工作流）
3. 配置变更需检查所有语言目录的一致性
4. 最后 commit 并 push 到远程分支

### i18n 自动翻译 Commit 规范

当提交 i18n 翻译更改时：
- **Commit 标题**：`Auto i18n`
- **Commit 描述**：说明本次修改的具体内容

---

## i18n 工作流（新增/修改页面）

提取自 `.claude/prompts/auto-translate.md`，详情务必阅读完整指引：

### 情况 1：新增页面
1. 更新主侧边栏 `docs/.vitepress/configs/sidebar.ts`
2. 更新所有语言的侧边栏 `configs/i18n/<语言>/sidebar.ts`
3. 将页面文件复制到 `/docs` 下各语言目录的相同路径中

### 情况 2：修改现有页面
- 标题未变 → 直接翻译并修改各语言对应文件
- 标题已变 → 先更新侧边栏，再修改翻译文件

### 情况 3：修改全局配置
1. 先读取所有语言目录结构
2. 同步翻译各语言目录下的对应文件

### 翻译规范
- 翻译前必须查明所有需要支持的语言
- **完整保留原有格式**（Markdown 语法、代码块、链接等）
- **专有名词不翻译**（人名、产品名等）
- **文言文内容**以信达雅为准则，使用繁体字翻译
- **路径中的中文目录名保持不变**

---

## 回应用户

- 优先使用用户发起 PR 和 Issue 时使用的语言进行回复
- 支持中文、English 的交流

---

## 技术细节补充

### Giscus 评论配置
```ts
repo: 'MineJPGcraft/MCJPG'
repoId: 'R_kgDOMmxeOw'
category: 'Announcements'
categoryId: 'DIC_kwDOMmxeO84CjDGB'
lang: 'zh-CN'  // 英文页面自动切换为 'en'
```

### Algolia 搜索
- App ID: `VTCVHVPS1J`
- Index: `mcjpg`
- 已集成 AI 搜索（Ask AI assistant ID: `3Q2omfOfl9eY`）
- 中文 (zh_CN) 和文言文 (lch) 已配置搜索 locale，英文尚未启用

### Markdown 增强
- 代码块行号默认开启 (`lineNumbers: true`)
- 图片懒加载默认开启
- `h1` 标题下方自动插入 `<ArticleMetadata />` 组件
- 支持 `vite-plugin-markdown-preview`

### 站点地图
- 自动生成，hostname: `https://mcjpg.org`

### Prettier & Lint-staged
- 使用 `@femm/prettier` 配置
- 保存时自动格式化：`js, jsx, tsx, vue, css, scss, less, md, json`
