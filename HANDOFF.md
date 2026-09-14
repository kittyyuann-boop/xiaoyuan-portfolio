# HANDOFF — XIAOYUAN 个人创作者主页

> 接手前先读这份。本文说明了技术栈、如何跑起来、已完成的页面与交互、未完成项、中英文切换、设计约定，以及外部/部署依赖。
> 配套 README.md 是给“使用者/内容维护者”看的（怎么改文案、怎么加照片）；本文是给“开发者”看的（怎么改代码、有什么坑）。

---

## 0. 一句话定位

纯静态单页站点（SPA，hash 路由），**无构建步骤、无运行时依赖、无后端、无数据库**。浏览器直接打开 `index.html` 就能跑。所有内容集中在 `data.js`，渲染逻辑在 `app.js`，样式在 `style.css`。

当前线上版本 = **四入口文字版首页**（大标题 + 四个板块入口）。
⚠️ **重要**：用户后来又提出了「煎蛋 / fried-egg」首页 redesign，并只确认了视觉与交互方案（纯黑底 + 拼贴线描，蛋黄=影像 / 蛋白=音乐 / 锅子=创意 / 两半蛋壳=舞蹈），**但方案尚未实现、网站代码未改动**。下一任开发者若要做这个 redesign，方案图在聊天记录里，不要误以为它已经上线。

---

## 1. 技术栈 & 安装 / 启动 / 构建

### 技术栈
- **前端**：原生 HTML + CSS + 原生 JS（ES5 风格，无框架、无打包器、无 TS）。
- **路由**：基于 `location.hash` 的 hash 路由（`#/visual`、`#/music` …），无 history API。
- **数据**：全部内容写在 `data.js` 的全局常量里（`SITE / UI / ENTRIES / PANELS / CASES / ABOUT`），`app.js` 读取并渲染。
- **图库**：`assets/visual/gallery.js`（`window.VISUAL_GALLERY = {portrait:[…], landscape:[…]}`），由 Python 脚本生成，**不要手工编辑**。
- **照片处理**：`tools/build-visual.py`（Python 3 + Pillow）。负责去重、按 EXIF 方向纠正画面、压缩成 full/thumb 两套、写 `gallery.js`。
- **字体**：**全部使用系统字体**（CSS `--serif`/`--sans` 走 Georgia / Songti SC / PingFang SC / 系统 sans）。**没有任何外部字体文件或 CDN**——所以换环境不受字体影响。
- **依赖**：运行时零依赖。开发期仅一个可选静态服务器（`npx serve` 或 `python3 -m http.server`），**不写进 package.json 的 dependencies**（因为不需要 npm install 任何东西）。

### 安装
```bash
# 1) 拿代码（本仓库已打包，直接解压即可；不是 git 仓库，建议接手后 git init）
cd xiaoyuan-portfolio

# 2) 照片流水线依赖（仅当要重新生成图库/加照片时需要）
#    macOS 自带 python3；其它平台装好 Python 3.9+ 然后：
pip install pillow
#    或：pip3 install pillow
```

### 启动（本地预览）
```bash
# 方式 A：Node 一枚静态服务器（推荐，避免 file:// 限制）
npm run dev          # → http://localhost:5173

# 方式 B：不需要 Node
npm run dev:py       # 或 python3 -m http.server 5173
# 然后浏览器开 http://localhost:5173

# 方式 C：直接双击 index.html 也能跑（部分浏览器对 file:// 下懒加载/灯箱有限制）
```

### 构建 / 重新生成图库
```bash
# 重新生成所有照片图库（去重 + 压缩 + 写 gallery.js）
# 默认源目录是作者本机的 ~/Desktop/yuyusai作品集/02摄影作品
# 换机器/换环境时用环境变量指定你自己的源目录：
VISUAL_SRC=/path/to/你的照片/02摄影作品 npm run build:visual
# 等价： python3 tools/build-visual.py
```
> 站点本身**不需要构建**；上面的“构建”仅指照片流水线的重新生成。线上交付的是已经生成好的 `assets/visual/` 副本，换机器后即使不跑流水线，网站也能正常显示现有 140 张照片。

### 部署
任意静态托管均可，零配置：Vercel / Netlify / GitHub Pages / EdgeOne Pages / 任意 Nginx。
```bash
npx vercel       # Vercel
# 或把整个 xiaoyuan-portfolio/ 目录上传到任意静态空间
```

---

## 2. 已完成的页面、功能与交互

| 路由 | 页面 | 内容与交互 |
| --- | --- | --- |
| `#/`（默认） | **Home** | 煎蛋拼贴场景（`assets/home/`）：4 个插画热区（蛋黄=影像 / 蛋白=音乐 / 锅子=创意 / 蛋壳=舞蹈）+ 底部 `home-map` 索引（4 行纯文字 span、`aria-hidden`，**不可点**；曾短暂改成 5 个可点链接加入视频入口，用户明确要求撤回，不要再改）+ 最底部 `.home-social` 社交账号入口行（小红书 / B站 / 抖音 / 邮箱，`justify-content:space-between` 与上方四列对齐；移动端两个断点里 `home-map` 已从 bottom:1%/0 上移到 11% 给它让位）。 |
| `#/visual` | **Visual** | 01 影像。图文 lede + 三个筛选标签（全部 / 人像 / 风景生活 / 视频作品）→ CSS columns 瀑布流（3 列桌面、2 列移动）→ 点击进灯箱。 |
| `#/music` | **Music** | 02 音乐，目前是**意向页**（占位文案）；底部内嵌「音乐人视频案例」手风琴（展开/折叠）。 |
| `#/creative` | **Creative** | 03 创意，意向页。 |
| `#/dance` | **Dance** | 04 舞蹈，意向页。 |
| `#/about` | **About** | 简介 + 简历查看/下载按钮 + 账号外链（B站/小红书/邮箱）。人像占位 `[PORTRAIT]`。 |

### 已实现的交互
- **中/英切换**：右上角 EN/中 按钮，写入 `localStorage.lang`，刷新保持。（见第 4 节）
- **移动端适配**：≤900px 收起导航为汉堡菜单；瀑布流降为 2 列；About 改单列。
- **瀑布流懒加载**：`IntersectionObserver` 进入视口附近才淡入；不支持 IO 的老浏览器直接全显（有兜底）。
- **灯箱**：点击照片放大；`←/→` 翻页、`Esc`/点击空白关闭；自动预加载相邻图。
- **筛选**：Visual 页按 全部/人像/风景生活 过滤；视频作品切到独立区块（含案例）。
- **案例手风琴**：Music 页与 Visual「视频作品」共用同一份 `CASES` 数据；`max-height` 过渡展开，展开结束后解除高度限制，避免图片/视频后续加载被裁。
- **照片原比例**：缩略图按原始宽高比显示，**不裁切、不拉伸**（之前踩过 EXIF 方向坑，见第 3 节）。

---

## 3. 尚未完成 & 已知问题

### 待填内容（占位符，刻意未编造）
- `data.js` 中多处 `[待补充…]` / `[PROJECT TITLE]`：**这些是真实空缺，不是 bug，不要当成已填内容**；接手者需等用户给真实素材再替换。
- **2026-09-13 起账号外链已是真实地址**（用户提供，勿再当占位符）：`SITE.email = '2952919277@qq.com'`、`SITE.bilibili = 'https://b23.tv/V9etBII'`（-煎蛋专家-）、`SITE.xhs = 'https://xhslink.cn/o/8NfGdFO6KJ5'`（@波点煎蛋^）、`SITE.douyin = 'https://v.douyin.com/aCGdNvOpSUc/'`（新增字段 + `UI.douyin` 文案）。About 页「我的账号」现有 B站/小红书/抖音/邮箱四个按钮。仍缺：`SITE.danceAcc`（从未使用）、`SITE.resume`（文件不存在）、`SITE.portrait`。
- **Music / Creative / Dance 三个意向页**目前只有占位方向文案，没有真实经历。
- **音乐人视频案例** `CASES[0]` 全部字段为空占位，待填 Brief / 角色 / 分镜 / 成片。
- **简历 PDF、About 人像、视频成片** 三个资源文件缺失（见第 5 节资源清单）。

### 已知问题 / 坑
1. **EXIF 方向**：手机竖拍照片文件里是横存 + 旋转标记。早期用 macOS `sips` 压缩会丢掉旋转、变成横图（33 张受影响）。现用 Pillow `ImageOps.exif_transpose` 已修复；**不要退回 sips 方案**。
2. **`gallery.js` 的 `s` 字段**记录了原始照片在本机的绝对路径（作者 Desktop）。仅用于溯源/删除，**不含密钥**，但换机器后路径失效属正常；删照片走 `tools/remove-visual.sh`，不要手删 `assets/visual/`。
3. **`SITE.danceAcc`** 已定义但未在界面使用（About 只用了 bilibili/xhs/email），属遗留字段。
4. **煎蛋 redesign 未实现**：方案已确认但代码未动（见第 0 节）。
5. **无自动化测试、无 lint、无 git 历史**：接手后建议 `git init` 并补基础校验。

---

## 4. 中英文切换的实现方式

- 状态：`localStorage` 键 `lang`，值 `'en'` 或 `'zh'`，默认 `'en'`。
- 触发：`index.html` 里 `#langEn` / `#langZh` 两个按钮，`app.js` 中 `setLang(l)` 绑定。
- 作用：
  1. `document.body.className = 'lang-' + l`（页面可用 `body.lang-zh` 做样式微调，目前主要靠文本切换）。
  2. 切换两个按钮的 `on` 高亮类。
  3. `fillNav()`：遍历所有带 `data-key` 的导航项，用 `t(UI[key])` 填文字。
  4. `route()`：重渲染当前页，所有文案经 `t()` 取值。
- 文案约定：**所有双语字段写成 `{ en:'…', zh:'…' }`**。取值函数：
  ```js
  const t = o => !o ? '' : (typeof o === 'string' ? o : (o[LANG] || o.en || ''));
  ```
  即：字符串原样用；对象按当前语言取，缺字段回落到英文。**新增任何文案都请遵守这个 `{en,zh}` 结构**，否则不会随语言切换。

---

## 5. 资源清单（打包内容 vs. 不可打包项）

### 已打包进 ZIP、可直接使用的
- **照片图库**：`assets/visual/`
  - 人像 `portrait/`：full 62 张 + thumb 62 张
  - 风景生活 `landscape/`：full 78 张 + thumb 78 张
  - 合计 **280 张图片** + `gallery.js` 清单（140 条）。
  - 规格：full 最长边 1600px / q70；thumb 最长边 1000px / q66；JPEG，比例与原图一致。
- **代码与配置**：`index.html` / `style.css` / `data.js` / `app.js` / `package.json` / `.env.example` / `.gitignore` / `README.md` / `HANDOFF.md` / `tools/*`。

### 不可打包 / 当前缺失（需后续补真实素材）
| 资源 | 代码里的引用位置 | 当前状态 | 用途 |
| --- | --- | --- | --- |
| 简历 PDF | `SITE.resume = 'assets/resume.pdf'`；About 页查看/下载按钮 | **文件不存在**，按钮会 404 | 简历下载 |
| About 人像 | `SITE.portrait = ''`（空）→ About 页显示 `[PORTRAIT]` 占位块 | **未提供** | 关于页头像 |
| 音乐人视频成片 | `CASES[0].video = {src:'',cover:'',link:''}` | **未提供** | 案例区视频 |
| 原始照片源 | `tools/build-visual.py` 的 `SRC` / `VISUAL_SRC` | 在作者本机 `~/Desktop/yuyusai作品集/02摄影作品`，**未随仓库** | 仅用于重新生成图库 |
| 外部账号链接 | `SITE.email / bilibili / xhs / douyin` | **已为真实地址**（2026-09-13 用户提供）；仅 `danceAcc` 仍空 | 外链跳转 |
| 字体 | CSS `--serif` / `--sans` | 系统字体，**无文件、无 CDN** | —— |

> 说明：简历/人像/视频是**用户还没给的真实素材**，不是漏打包；补上文件放到对应路径即可生效。原始照片源之所以不随仓库，是因为已在 `assets/visual/` 生成了可用的副本（140 张），仓库自包含可展示。

---

## 6. 当前设计方案 & 不能随意改动的设计约定

### 视觉规范（`style.css` 的 `:root` 变量，改色先改这里）
- 底色 `--bg: #0b0b0a`（**近黑、非纯黑**）；次底 `--bg-soft: #131211`。
- 文字 `--ink: #f2f0ea`（暖白）、`--ink-60` / `--ink-40` 两级灰。
- 线条 `--line: #26251f`；强调色 `--accent: #c4703f`（陶土橙，用于简历框左边线等）。
- 字体：衬线 `--serif: Georgia,"Songti SC",serif`；无衬线 `--sans: -apple-system,"PingFang SC",…`。
- 缓动 `--ease: cubic-bezier(.22,1,.36,1)`。

### 必须保留的设计约定（改动前先想清楚）
1. **纯黑电影感 + 编辑排版**：大留白、衬线大标题、窄字距小标签（`.label` 用 `letter-spacing:.32em`）。不要随意引入彩色背景或花哨组件。
2. **不编造内容**：所有空缺用 `[…]` 方括号占位，绝不写虚构的播放量/粉丝/合作方。这是用户明确要求的底线。
3. **照片原比例**：瀑布流 `height:auto`、灯箱 `object-fit:contain`，**不改原尺寸、不裁切、不拉伸**（EXIF 教训见第 3 节）。
4. **双语 `{en,zh}` 约定**：新增文案必须走 `t()` + 双语对象，否则语言切换会漏。
5. **hash 路由 + 内容集中在 `data.js`**：加页面/改文案优先改 `data.js`，不要散落到 `app.js`/HTML；路由用 hash，不要擅自改成 history API（会让静态托管刷新 404）。
6. **图库只读 `gallery.js`**：加/删照片走流水线（`build-visual.py` + `remove-visual.sh`），**不要手改 `assets/visual/` 或 `gallery.js`**，否则下次重建会覆盖。
7. **煎蛋 redesign 是待办**：若用户确认要上线，第 0 节提到的映射（蛋黄=影像 / 蛋白=音乐 / 锅=创意 / 蛋壳=舞蹈）和纯黑+拼贴线描风格要延续，不要另起炉灶。

---

## 7. 外部服务 & 部署平台依赖

- **部署平台**：任意静态托管，无平台锁定。推荐 Vercel / Netlify / GitHub Pages / EdgeOne Pages / Nginx。**无服务端代码、无 SSR**。
- **外部服务 / 第三方**：
  - 当前**未接入任何**分析、表单、CMS、评论、图床等第三方服务。
  - `.env.example` 预留了 `ANALYTICS_ID` / `CONTACT_FORM_ENDPOINT` / `RESUME_PDF_URL` 占位，但**代码中未使用**，接手者若接入需自行埋点。
- 外链：B站 / 小红书 / 抖音 / 邮箱均为用户 2026-09-13 提供的真实地址（`SITE.*`），无 API 调用。
- **字体/图标**：无外部字体；图标用 Unicode 字符（← → ↗ ↓），无图标库。
- **账号凭据**：**无任何密钥**。`.env` 不入库（`.gitignore` 已忽略），`.env.example` 仅占位、不含真实值。

---

## 8. 给下一任开发者的速查

```
改文案/加内容      → data.js（遵守 {en,zh}）
改渲染/加页面      → app.js（ROUTES 表 + renderXxx 函数）
改视觉            → style.css（先动 :root 变量）
加/删照片         → 放源目录 → VISUAL_SRC=… npm run build:visual；删单张 → tools/remove-visual.sh p-012
换语言            → 点 EN/中；新文案记得写双语
跑起来            → npm run dev（或 dev:py）
部署              → 整目录丢静态托管
```

> 最后提醒：这是**个人作品集 + 求职主页**，内容真实性优先于炫技。任何“看起来更丰富”的编造都违背用户要求。

---

## 9. 2026-09-13 更新记录（本节描述的是当前实际状态，覆盖前文过时描述）

### 9.1 新增：VIDEO & CONTENT 板块（`#/video`）
- 数据：`data.js` 的 `VIDEO_CATEGORIES`（4 类：short-vlog / long-vlog / talk / concept）+ `VIDEO_WORKS`（8 个作品，`featured:true` 的 2 个走大版式）。
- 渲染：`app.js` 的 `renderVideoContent()`；页面结构 = 标题 → 制作管线（IDEA→PLANNING→SHOOTING→EDITING→FINAL CUT）→ FEATURED WORK（Editorial 左右交替大版式）→ SELECTED VIDEOS / 更多作品（ALL / 四类筛选 + 按封面原比例的三列卡片网格）。
- **重点作品重复出现（设计意图）**：`renderVideoContent()` 里 `rest` 取的是 `VIDEO_WORKS` 全量（**不是** `filter(w => !w.featured)`）。两个 `featured:true` 的作品既在 FEATURED WORK 做大版式，也作为普通卡片出现在分类网格中，以保证四类筛选都有内容（CONCEPT / CHALLENGE 类目下只有「7天每天看电影」一条，若把它排除则点该筛选会得到空结果）。改动此处时务必保留这一行为。
- 卡片/Featured 的封面与视频**全部数据驱动**：`cover` / `video` 留空 → 显示统一占位（封面待补 + 平台名）。**严禁抓取小红书 / B站缩略图**。填入本地 `cover` 或 `video` 路径后自动升级为图片 / 内嵌播放器，无需改代码。
- 不展示播放量、发布日期、时长等未确认数据。
- 英文模式下 Featured 标题下方显示 `titleEn` 小字（原标题保持中文原样，`translate="no"`）。

### 9.2 改动到的其他位置
- `index.html`：桌面导航与移动菜单新增 `#/video` 入口（`data-key="video"`，复用 `UI.video`）。
- `style.css`：新增 `.video-*` / `.vfeat*` / `.vgrid` / `.vcard` 样式（文件末尾）。
- Visual 页的「视频作品」标签：原来的占位 CASES 手风琴已移除，改为指向 `#/video` 的入口。
- 缓存版本号：`index.html` 三个资源引用统一为 `?v=…`（改完 CSS/JS 记得同步改这个，否则浏览器拿旧文件）。

### 9.3 两条容易踩的主题规则（新增页面必看）
1. **非首页一律是暖米色 editorial 主题**：需要在 `style.css` 的 6 组 `body[data-route="…"]` 选择器里加上新路由名（home 与其余路由的配色不同）。新路由若不加，会掉回 `:root` 的深色底，和整站不一致。
2. **首页会隐藏导航前 N 项**：`body[data-route="home"] .nav-links li:nth-child(-n+5)`（加 Video 时已从 4 调整为 5）。再加导航项要同步改这个数字，否则首页会漏出多余的导航项。

### 9.4 封面文件与比例字段约定
- 本地封面统一放 `assets/video-content/`，命名 `<work-id>-cover.jpg`。处理方式：`ImageOps.exif_transpose` 校正方向 → 长边压到 ≤1600px → JPEG q72（**不要用 macOS 的 `sips`，会丢 EXIF 旋转方向**；managed python 3.13.12 没有 PIL，可用 `/Users/omelette/.workbuddy/binaries/python/envs/default/bin/python`，里面已装 Pillow）。
- 两个比例字段，均按 `"宽/高"` 写（如 `'3/4'`）：
  - `mediaRatio`：FEATURED 大版式媒体框的比例，缺省 `16/9`。若为竖版（高 > 宽），`app.js` 会自动给 `<article>` 加 `.portrait` 类，`style.css` 里该类的列宽收窄并把媒体宽度限制在 480px，避免竖版海报被放大到占满整列。
  - `ratio`：SELECTED VIDEOS 卡片媒体框的比例，**按封面原图比例写**（渲染时内联为 `aspect-ratio`，缺省 `4/3`）。改封面图后必须同步这一字段，否则 `object-fit:cover` 会裁掉封面内容。
- **卡片封面按原格式（2026-09-13 最终定案）**：`ratio` 与图片实际比例一致 → `.vcard-media` 只负责边框/底色，`img { object-fit:cover }` 实际不裁不拉。竖版 3:4、横版 4:3、九子 16:9 各显示原样，**不再有统一画框与衬边**。
  - 因为同一行媒体高度不同，`.vgrid` 加了 `align-items:start`：让每张卡片保持自身高度。若不写，CSS Grid 默认拉伸会让矮卡片（如 16:9 的九子）被撑到与竖版邻居等高，加上 `.vcard-foot{margin-top:auto}` 会在卡片中间留出一大片空洞。
  - `.vcard` 仍是 flex 纵向 + `margin-top:auto` 的底边对齐结构，标题/关键词的 `min-height` 保留（对单行/双行标题仍有对齐作用），但跨卡片严格对齐已不可能（媒体高度本就不同），属预期。
  - 历史记录：曾短暂采用「统一 4:3 画框 + `object-fit:contain`」（横版铺满、竖版两侧衬边）来解决横竖混排，2026-09-13 用户明确要求「更多作品里的排版和重点作品一样，封面是原格式」，故改回按原比例。**不要再自作主张统一画框。**
- 响应式注意：`.vfeat.portrait` 的优先级高于媒体查询里的 `.vfeat`，900px 断点内必须显式写出 `.vfeat.portrait` / `.vfeat.portrait.flip` 才会正确堆叠（已处理）。
- **手机截图要去黑边**：用户给的封面常是手机截屏（如 887×1920 竖长图，内容区上下各带 368px 纯黑边）。直接使用会在卡片里露出两条黑杠。用差异法自动定位内容区再裁：
  ```python
  bg = Image.new('RGB', im.size, (0,0,0))
  bbox = ImageChops.difference(im, bg).convert('L').point(lambda p: 255 if p > 18 else 0).getbbox()
  im = im.crop(bbox)
  ```
- 换封面后务必先目视检查裁切结果（读出保存后的 jpg 看一眼），确认黑边已去、封面图上的标题文字没有被切掉。
- 封面文件清单（截至 2026-09-13，全部位于 `assets/video-content/`）：`movies-7days-cover.jpg`(3:4)、`danlog-pms-cover.jpg`(3:4)、`danlog-yellow-seoul-cover.jpg`(4:3)、`danlog-dongzhi-cover.jpg`(4:3)、`wuhan-energy-map-cover.jpg`(4:3)、`vlog13-tianjin-cover.jpg`(4:3)、`dantalk-first-class-cover.jpg`(3:4)、`seoul-shopping-cover.jpg`(4:3)、`vlog14-jiuzi-cover.jpg`(16:9)。9 个作品已全部到位，占位逻辑仍保留以备用。

### 9.5 前文过时之处
- 第 0 / 6.7 节说「煎蛋 redesign 未实现」——**已实现**：首页即煎蛋拼贴场景（`assets/home/`），Music 板块已变成「音乐人内容」四颗鸡蛋索引 + 4 个艺人案例页（artist-01…04）。
- 第 6.3 节提到的 Music / Creative 意向页：Music 已改为艺人案例索引；Creative 已用站内真实案例重写；Dance 与 About 的部分文案仍待用户提供真实素材。
