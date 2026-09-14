# XIAOYUAN — Visual · Music · Creative · Dance

徐小媛的个人创作者主页。四个板块：**Visual**（摄影 & 视频剪辑）· **Music**（音乐）· **Creative**（创意策划）· **Dance**（舞蹈）。

用途：展示自己，也可以直接发给招聘方 / 合作方。不是传统简历网站。

**这是一个纯静态站点**：无构建步骤、无运行时依赖、无后端、无数据库。浏览器直接打开 `index.html` 即可运行。

---

## 目录结构

```
xiaoyuan-portfolio/
├── index.html              # 页面外壳：head、导航、main、footer、灯箱
├── style.css               # 所有样式（纯黑电影感 + 编辑排版）
├── data.js                 # 纯数据：站点信息、UI 文案、四板块内容、About
├── app.js                  # 渲染与路由
├── package.json            # 仅提供本地预览脚本（无 dependencies）
├── README.md               # 本文件
├── .env.example            # 环境变量模板（当前项目不需要，但保留规范）
├── .gitignore
├── tools/
│   └── build-visual.sh     # 图片流水线：去重 → 压缩 → 生成图库清单
└── assets/
    ├── README.md           # assets 目录说明
    └── visual/             # Visual 板块图库（自动生成）
        ├── gallery.js      #   图库清单 { portrait:[…], landscape:[…] }，含宽高
        ├── portrait/       #   人像 full/（最长边 1600px）+ thumb/（最长边 1000px）
        └── landscape/      #   风景生活 full/ + thumb/
```

### 文件职责（继续开发先看这里）

| 文件 | 作用 | 改它的时机 |
| --- | --- | --- |
| `data.js` | 全部文案与板块内容 | **几乎只改这一个文件** —— 换文案、加设想的方向、换联系方式 |
| `app.js` | 页面渲染、hash 路由、瀑布流、灯箱 | 加新页面 / 新交互 |
| `style.css` | 所有视觉 | 调色、改排版 |
| `index.html` | DOM 外壳 | 调整导航结构 |
| `assets/` | 简历 PDF、人像照 | 换真实素材 |

---

## 怎么跑起来

**方式 A：直接双击 `index.html`**（最简单，零依赖）

**方式 B：`npm run dev`**（推荐，避免浏览器对 `file://` 的限制）
```bash
cd xiaoyuan-portfolio
npm run dev
# 打开 http://localhost:5173
```

**方式 C：`npm run dev:py`**（不需要 Node）

---

## 页面结构

```
Home  首屏（名字 + 定位一句话）→ 四个板块入口
Visual    01  人像 / 风景生活 / 视频作品（完整图库，瀑布流 + 懒加载 + 灯箱）
Music     02  意向页
Creative  03  意向页
Dance     04  意向页
About         简介 · 简历查看/下载 · 账号链接
```

---

## 怎么改内容（都在 `data.js`）

### 1. 站点信息
```js
const SITE = {
  name: { en:'XIAOYUAN', zh:'徐小媛' },
  tagline: { … }, intro: { … },
  email: '[EMAIL]',            // 换成真实邮箱
  bilibili: '[BILIBILI LINK]', // 换成 B 站主页链接
  xhs: '[XIAOHONGSHU LINK]',   // 换成小红书主页链接
  resume: 'assets/resume.pdf', // 把简历 PDF 放进 assets/ 即可
  portrait: '',                // About 页人像，如 'assets/portrait.jpg'
};
```

### 2. Music / Creative / Dance 意向页
这三个板块目前**不虚构任何经历**，用 `[待补充…]` 占位。填内容时打开 `PANELS`，照这个格式写：

```js
music: {
  lede: { en:'一句话说清你和音乐的关系', zh:'…' },
  blocks: [
    // 段落
    { h:{ en:'Background', zh:'音乐背景' }, body:{ en:'…', zh:'…' } },
    // 要点列表
    { h:{ en:'What I Want To Make', zh:'想做的音乐' },
      list: [ { en:'…', zh:'…' }, { en:'…', zh:'…' } ] },
    // 关键词标签
    { h:{ en:'Skills', zh:'能力' }, chips:['Vocals','Composition','Live'] },
  ],
},
```
`blocks` 支持三种块：**`body`（一段话）/ `list`（要点）/ `chips`（标签）**，页面会自动排版，写多少块都行。

### 3. Navigation / UI 文案
`UI` 里的中英文案一一对应，改这里即可。双语字段写成 `{ en:'…', zh:'…' }`；只有一种语言也无妨（缺失时自动回落到英文）。

---

## Visual 图库更新照片

`data.js` **不管** Visual 的照片——图片来自 `assets/visual/gallery.js`，由脚本生成，**不要手工编辑**。

1. 照片放进源目录（默认是你的本机照片源目录，换机器时用环境变量 `VISUAL_SRC` 覆盖，无需改脚本）：
   - 人像：除「风景照」文件夹外的所有子文件夹
   - 风景生活：「风景照」文件夹
2. 运行：
   ```bash
   zsh tools/build-visual.sh
   ```
   脚本会自动：MD5 去重 → **按 EXIF 方向纠正画面**（竖拍照片不会被当成横图）→ 压缩成 full（1600px）+ thumb（1000px）两套 → 重生成 `gallery.js`。
   依赖 Python + Pillow（`pip install pillow`），macOS / Windows / Linux 都能跑。
3. 刷新页面即可。

「视频作品」组目前为空，页面显示待更新说明 + 两个账号入口。有视频后（Vlog、音乐人短视频），在 `app.js` 的 Visual 页加一组即可（封面图 + 外链）。

### 删掉某一张照片

网站里的照片是**源文件夹生成的副本**（`assets/visual/`），所以：

**不要**直接去 `assets/visual/` 里删文件 —— 下次重建图库它还会回来。

正确做法（原始照片不会被删、不会被改）：

```bash
# 1. 在网站上右键那张照片 →「复制图片地址」
#    地址里 .../portrait/thumb/p-012.jpg 的 p-012 就是编号（人像 p-###，风景生活 l-###）
# 2. 执行
zsh tools/remove-visual.sh p-012
# 3. 重建图库生效
zsh tools/build-visual.sh
```

- `remove-visual.sh` 会查 `tools/source-map.txt`（编号 → 原始文件映射表），把该原始文件写进 `tools/exclude.txt`
- 想恢复显示：打开 `tools/exclude.txt` 删掉那行（或行首加 `#`），再跑一次 `tools/build-visual.sh`
- 映射表过期了（比如源文件夹加过照片）就先跑：`zsh tools/map-sources.sh`
- 重建脚本不会整目录清空，只覆盖新文件 + 逐个清理不再需要的旧副本

---

## 部署

任何静态托管都行（Vercel / Netlify / GitHub Pages / EdgeOne Pages / 自建 Nginx）。

```bash
cd xiaoyuan-portfolio
npx vercel
```

---

## 环境变量

当前项目**不需要**任何环境变量。`.env.example` 仅作为规范占位。

## 浏览器兼容

Chrome / Edge / Safari / Firefox 最近两个大版本。移动端已适配（汉堡菜单 + 双列瀑布流）。
