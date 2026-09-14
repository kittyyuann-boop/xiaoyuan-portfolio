# assets/

把真实素材文件放在这个目录里，然后在 `data.js` 里引用即可。

## 推荐的文件命名

```
assets/
├── resume.pdf                 # 简历，Resume 页直接引用
├── about-portrait.jpg         # 关于页个人照片
├── projects/
│   ├── music-content-01/      # 每个项目一个子目录
│   │   ├── cover.jpg
│   │   ├── 01.jpg
│   │   └── 02.jpg
│   ├── marketing-sim-01/
│   │   └── cover.jpg
│   └── ...
└── visuals/                   # Visual Archive 的精选照片
    ├── 01.jpg
    └── ...
```

## 引用方式（在 `data.js` 里）

```js
// 项目封面
cover: { img: 'assets/projects/music-content-01/cover.jpg' }

// 详情页图库（点击放大）
gallery: [
  'assets/projects/music-content-01/01.jpg',
  'assets/projects/music-content-01/02.jpg',
]

// About 头像（目前是占位，替换 .about-portrait 里的 phHTML 即可）
```

## 关于"占位" vs "真实素材"

- `gallery: ['ph', 'ph']` —— 用占位块（灰底 + 标签），适合还没填入真实内容时
- `gallery: ['assets/.../01.jpg']` —— 真实图片，加载并可点击放大
- 同一项目可以混合：`['ph', 'assets/.../01.jpg', 'ph']`

> 提醒：不要往 `data.js` 里写虚构的播放量 / 粉丝数 / 合作方 / 真实数据。占位就保留 `[PROJECT TITLE]` 这样的方括号占位符，真实素材到位再替换。
