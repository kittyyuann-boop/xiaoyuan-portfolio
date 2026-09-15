/* ==================================================================
   XIAOYUAN · 创作者主页 —— 纯数据层
   ------------------------------------------------------------------
   这个文件没有任何渲染逻辑，只声明全局常量，供 app.js 读取。
   要改文案、加作品、换联系方式，都在这个文件里改，不用碰其他代码。
   加载顺序：data.js → gallery.js → app.js
   ================================================================== */

/* ---------- 1. 站点基本信息 ---------- */
const SITE = {
  name:      { en:'XIAOYUAN', zh:'徐小媛' },
  tagline:   { en:'Visual · Music · Planning · Dance', zh:'影像 · 音乐 · 策划 · 舞蹈' },
  intro:     { en:'Creator working across visual storytelling, music projects, planning and dance.',
               zh:'活跃于影像、音乐项目、策划与舞蹈的创作者。' },
  email:     '2952919277@qq.com',
  bilibili:  'https://b23.tv/V9etBII',
  xhs:       'https://xhslink.cn/o/8NfGdFO6KJ5',
  douyin:    'https://v.douyin.com/aCGdNvOpSUc/',
  danceAcc:  '[DANCE ACCOUNT LINK]',
  resume:    'assets/resume/徐小媛｜立即到岗.pdf',
  portrait:  '',            // About 页人像：把图片放进 assets/ 后写路径，如 'assets/portrait.jpg'
};

/* ---------- 2. 界面文案（中英双语） ---------- */
const UI = {
  visual:   { en:'Visual',   zh:'影像' },
  music:    { en:'Music',    zh:'音乐' },
  planning: { en:'Planning', zh:'策划' },
  creative: { en:'Planning', zh:'策划' },
  dance:    { en:'Dance',    zh:'舞蹈' },
  about:    { en:'About',    zh:'关于' },

  enter:     { en:'Enter', zh:'进入' },
  allPhotos: { en:'All',   zh:'全部' },
  portraits: { en:'Portraits',       zh:'人像' },
  landscape: { en:'Landscape & Life',zh:'风景生活' },
  video:     { en:'Video',           zh:'视频' },

  archiveNote:{ en:'Photos taken with my phone — arranged as a full archive, lazy-loaded. Click any photo to enlarge, use ← → to move through the set.',
                zh:'全部为手机拍摄的日常影像，完整展示并做了懒加载。点击任意照片可放大，← → 可翻阅。' },
  videoEmpty: { en:'Selected personal videos are being sorted. Meanwhile you can find my channels below.',
                zh:'个人影像代表作品整理中。在此之前可先去下方账号看看。' },
  lbHint:     { en:'Click outside the photo or press Esc to close · ← → to navigate', zh:'点击照片外或按 Esc 关闭 · ← → 切换' },

  openPhoto: { en:'View photo', zh:'查看照片' },
  close: { en:'Close', zh:'关闭' },
  previous: { en:'Previous photo', zh:'上一张' },
  next: { en:'Next photo', zh:'下一张' },
  resume: { en:'Resume', zh:'简历' },
  resumeReady: { en:'View or download my resume.', zh:'在线查看或下载我的简历。' },
  channels:   { en:'Channels', zh:'我的账号' },
  viewResume: { en:'View Resume', zh:'查看简历' },
  download:   { en:'Download PDF', zh:'下载 PDF' },
  resumeHint: { en:'Resume is being prepared. Please email me to get in touch.',
                zh:'简历整理中，欢迎通过邮件联系我。' },
  contact:    { en:'Get in touch', zh:'联系我' },
  bilibili:   { en:'Bilibili',     zh:'哔哩哔哩' },
  xhs:        { en:'Xiaohongshu',  zh:'小红书' },
  douyin:     { en:'Douyin',       zh:'抖音' },
  email:      { en:'Email',        zh:'邮箱' },
  danceAcc:   { en:'Dance Account',zh:'舞蹈账号' },
  pending:    { en:'Content coming soon — this section is being written.',
                zh:'内容待补充 —— 这一部分正在整理。' },
  caseList:   { en:'Musician Video Cases', zh:'音乐人视频案例' },
  caseNote:   { en:'Workflow behind one video — brief, my part, and the shot list. Click to expand.',
                zh:'一支视频背后的完整流程 —— Brief、我负责的部分、分镜表。点击展开。' },
  brief:      { en:'Brief / Background', zh:'Brief / 背景' },
  myPart:     { en:'My Role', zh:'我的角色' },
  shotList:   { en:'Script / Storyboard', zh:'脚本 / 分镜' },
  credits:    { en:'Credits', zh:'署名' },
  watched:    { en:'Watch', zh:'观看成片' },
  noVideo:    { en:'Final cut available on request.', zh:'成片可私下提供。' },
  reflect:    { en:'Reflection', zh:'复盘' },
  artistContent: { en:'Artist Content', zh:'音乐人内容' },
  artistApproach:{ en:'Different artists. Different approaches.', zh:'不同艺人，不同内容解法。' },
  observation: { en:'Observation', zh:'观察' },
  direction:   { en:'Direction', zh:'方向' },
  execution:   { en:'Execution', zh:'执行' },
  selectedWork:{ en:'Selected Work', zh:'代表作品' },
  myRole:      { en:'My Role', zh:'我的职责' },
  viewOriginal:{ en:'View Original', zh:'查看原作品' },
  viewArtist:  { en:'View Artist Profile', zh:'查看艺人主页' },
  artistPending:{ en:'Media pending.', zh:'素材待补充。' },
  profile: { en:'Profile', zh:'人物资料' },
  context: { en:'Context', zh:'背景' },
  approach: { en:'Approach', zh:'方法' },
  workResult: { en:'Work & Result', zh:'作品与结果' },
  review: { en:'Review', zh:'复盘' },
  videoContent: { en:'Video', zh:'视频' },
  videoMoved: { en:'My personal videos now live inside Visual — Vlog / Narrative, Talking / Expression and Concept / Creative.',
                zh:'个人影像内容已归入 VISUAL —— Vlog / 叙事、口播 / 表达、概念 / 创意。' },
  featuredWork: { en:'Featured Work', zh:'重点作品' },
  selectedVideos:{ en:'Selected Works', zh:'代表作品' },
  coverPending: { en:'Cover pending', zh:'封面待补' },
  vrole: { en:'Concept · Planning · Shooting · Editing', zh:'独立策划 · 拍摄 · 剪辑' },
  viewAllFilter: { en:'All', zh:'全部' },
  photo: { en:'Photo', zh:'摄影' },
  daily: { en:'Daily', zh:'日常' },
  letsConnect: { en:"Let's Connect", zh:'保持联系' },
  rednote: { en:'Rednote / Xiaohongshu', zh:'小红书' },
};

/* ---------- 3. 首页五个板块入口 ---------- */
const ENTRIES = [
  { key:'visual',   num:'01', title:UI.visual,   note:{ en:'People, everyday life, video — shot and edited by me',
                                                        zh:'人像、日常、视频 —— 自己拍也自己剪' } },
  { key:'music',    num:'02', title:UI.music,    note:{ en:'Musician content projects and artist case studies',
                                                        zh:'音乐人内容项目与艺人案例' } },
  { key:'planning', num:'03', title:UI.planning, note:{ en:'Content, account, activity and project planning',
                                                        zh:'内容、账号、活动与项目策划' } },
  { key:'dance',    num:'04', title:UI.dance,    note:{ en:'Choreography, stage work, competition pieces',
                                                        zh:'编舞、舞台、比赛作品' } },
  { key:'about',    num:'05', title:UI.about,    note:{ en:'Profile, experience, skills and contact',
                                                        zh:'个人介绍、经历、技能与联系' } },
];

/* ---------- 4. 四个板块页内容 ----------
   说明：Visual 的图片来自 assets/visual/gallery.js（tools/build-visual.sh 生成），
        不受这里控制。Music / Creative / Dance 目前是「意向页」，
        只写清楚方向与能力，不虚构任何经历或作品 —— 素材到位后往 blocks 里加即可。
   块类型：{ h, body }           标题 + 一段话
          { h, list:[{en,zh}] }  标题 + 要点列表
          { h, chips:['…'] }     标题 + 关键词标签
------------------------------------------------------------------- */
const PANELS = {

  visual: {
    lede:{ en:'Photography and video I made myself — mostly with a phone.',
           zh:'自己拍摄的影像与视频。' },
    blocks:[
      { h:{ en:'What You See Here', zh:'这里有什么' },
        list:[
          { en:'Video — selected personal works', zh:'视频 —— 个人代表作品' },
          { en:'Photo — portrait and daily archive', zh:'摄影 —— 人像与日常影像存档' },
        ] },
      { h:{ en:'How I Shoot', zh:'我怎么拍' },
        chips:['Available light','Everyday moments','Composition','Cutting rhythm'] },
    ],
  },

  /* ↓↓↓ 等你口述后由我们补写方向文案；目前只放占位，不虚构任何经历 ↓↓↓ */
  music: {
    lede:{ en:'[待补充 —— 一句话说清你和音乐的关系]', zh:'[待补充 —— 一句话说清你和音乐的关系]' },
    blocks:[
      { h:{ en:'Background', zh:'音乐背景' },
        list:[ { en:'[待补充：专业 / 乐器 / 做过什么]', zh:'[待补充：专业 / 乐器 / 做过什么]' } ] },
      { h:{ en:'What I Want To Make', zh:'想做的音乐' },
        list:[ { en:'[待补充：想做原创？什么风格？偏内容方向？]', zh:'[待补充：想做原创？什么风格？偏内容方向？]' } ] },
    ],
  },

  /* Creative —— 内容基于站内已有的四位音乐人真实案例，不引入任何虚构经历。
     cta：底部按钮，跳转到音乐人内容案例索引（#/music）。 */
  planning: {
    lede:{ en:'Planning is where ideas become structure, rhythm and execution.',
           zh:'策划是把想法变成结构、节奏和执行路径。' },
    blocks:[
      { h:{ en:'What This Section Is For', zh:'这个栏目放什么' },
        list:[
          { en:'Activity planning', zh:'活动策划' },
          { en:'Content planning', zh:'内容策划' },
          { en:'Account planning', zh:'账号策划' },
          { en:'Project planning and case studies', zh:'项目策划与 Case Study' },
        ] },
      { h:{ en:'Principle', zh:'归属原则' },
        body:{ en:'Each project should live in the section where it is easiest to understand. Personal visual works stay in Visual; musician content projects stay in Music; planning case studies will live here when the materials are ready.',
               zh:'每个项目放在最容易被理解的栏目里。个人视觉作品归入影像；音乐人内容项目归入音乐；之后有完整策划材料的 Case Study 再放在这里。' } },
    ],
  },
  creative: null,

  dance: {
    lede:{ en:'[待补充 —— 一句话说清你的舞蹈方向]', zh:'[待补充 —— 一句话说清你的舞蹈方向]' },
    blocks:[
      { h:{ en:'What I Dance', zh:'跳什么' },
        list:[ { en:'[待补充：舞种 / 学了多久 / 团或舞团经历]', zh:'[待补充：舞种 / 学了多久 / 团或舞团经历]' } ] },
      { h:{ en:'Works & Stage', zh:'作品与舞台' },
        list:[ { en:'[待补充：九子夺嫡等作品是比赛还是编排？你的角色是什么]', zh:'[待补充：九子夺嫡等作品是比赛还是编排？你的角色是什么]' } ] },
    ],
  },
};

/* ---------- 6. 音乐人视频案例 ----------
   说明：一份数据，两处展示 —— Music 页内展开/折叠，Visual 的「VIDEO / Selected Works」组
        也用同一份数据渲染。加新案例就复制一段，改字段即可。
   字段：
     title          项目名（署名信息先留空，等确认可公开后再填）
     cover          封面图路径，如 'assets/covers/xxx.jpg'（留空则显示占位块）
     brief          Brief / 背景：为谁做、解决什么问题、目标平台与人群
     role           我在这个项目里的角色
     contributions  具体贡献标签（脚本 / 拍摄 / 剪辑 / 执行 …）
     credits        { company, artist } 公司与音乐人署名 —— 目前留空，确认后再填
     script         分镜表格 { head:[…], rows:[[…]] }
     video          { src:'assets/videos/xxx.mp4', cover:'…', link:'https://…' }
                    src 留空时：有 cover 显示截图，有 link 显示外链按钮，都没有则显示「成片待提供」
     reflection     复盘 / 学到了什么
------------------------------------------------------------------- */
const CASES = [
  {
    slug:'musician-video-01',
    title:{ en:'[PROJECT TITLE]', zh:'[项目标题]' },
    cover:'',
    brief:{ en:'[这条视频为谁做、要解决什么问题、发在哪个平台、想打动谁]', zh:'[这条视频为谁做、要解决什么问题、发在哪个平台、想打动谁]' },
    role:{ en:'[MY ROLE]', zh:'[我的角色]' },
    contributions:['[CONTRIBUTION]'],
    credits:{ company:'', artist:'' },
    script:{
      head:[ { en:'Shot', zh:'镜号' }, { en:'Visual', zh:'画面' }, { en:'Copy / Subtitle', zh:'台词字幕' }, { en:'Audio', zh:'音乐音效' } ],
      rows:[
        ['1', '[画面]', '[台词字幕]', '[音乐音效]'],
        ['2', '[画面]', '[台词字幕]', '[音乐音效]'],
        ['3', '[画面]', '[台词字幕]', '[音乐音效]'],
      ],
    },
    video:{ src:'', cover:'', link:'' },
    reflection:{ en:'[这条视频哪里做得好 / 下次会怎么改]', zh:'[这条视频哪里做得好 / 下次会怎么改]' },
  },
];

/* ---------- 7. 音乐人内容 / Artist Content ----------
   一位艺人对应一条记录。没有实际参与的环节请保持空字符串，页面会自动隐藏，
   不需要为了凑齐结构填写 Observation / Direction。
------------------------------------------------------------------- */
const ARTISTS = [
  {
    slug:'artist-01',
    number:'01',
    egg:0,
    name:{ en:'JIAYI / JIANYI', zh:'加一 / 减一' },
    category:{ en:'Artist Content / Douyin', zh:'音乐人内容 / 抖音' },
    accounts:[
      { name:{ en:'Jiayi', zh:'加一' }, image:'assets/artist-content/jiayi/jiayi-profile.jpg', stats:{ en:'508K Likes · 8,325 Followers', zh:'50.8万获赞 · 8325 粉丝' } },
      { name:{ en:'Jianyi', zh:'减一' }, image:'assets/artist-content/jiayi/jianyi-profile.jpg', stats:{ en:'95K Likes · 5,482 Followers', zh:'9.5万获赞 · 5482 粉丝' } },
    ],
    keywords:[{en:'Youthful',zh:'少年感'},{en:'Androgynous',zh:'中性气质'},{en:'Livehouse Singer',zh:'现场演出歌手'},{en:'Emotional',zh:'情绪感'},{en:'Natural',zh:'自然'}],
    role:[{en:'Content Planning',zh:'内容策划'},{en:'Shooting',zh:'拍摄'},{en:'Editing',zh:'剪辑'},{en:'Publishing',zh:'发布'}],
    profile:{
      title:{ en:'2 Douyin accounts. One artist case study.', zh:'两个抖音账号，一个音乐人案例。' },
      subtitle:{ en:'2 DOUYIN ACCOUNTS · 加一 / 减一', zh:'两个抖音账号 · 加一 / 减一' },
      body:{ en:'A livehouse singer with a youthful and androgynous presence, followed mainly by young female audiences. During the project, 加一 and 减一 were two Douyin accounts for the same artist.', zh:'一位具有少年感和中性气质的现场演出歌手，主要受众以年轻女性为主。项目中同时运营「加一」和「减一」两个抖音账号。' }
    },
    context:{
      kicker:{ en:'FINDING THE RIGHT VISUAL LANGUAGE', zh:'寻找适合他的视觉语言' },
      body:{ en:'The artist already had a clear youthful and androgynous quality. Some early visual expressions leaned more toward staged performance, with more complex styling and wardrobe. In the content I participated in, I wanted to reduce the overly staged feeling and let the artist’s presence, voice, and singing emotion become the center of the frame. The direction gradually moved from complex stage styling to more everyday clothing, from bright standard lighting to dark scenes with local ambience, and from conventional singing videos to a closer, more natural viewing experience. 加一 and 减一 are two accounts for the same artist; this page treats them as one artist case rather than a dual-account strategy report.', zh:'艺人本身具有比较明显的少年感和中性气质。项目早期的部分视觉表达相对偏舞台化，造型和服装也会更加复杂。在参与内容制作的过程中，我希望减少过强的舞台感和复杂视觉元素，让人物本身的气质、声音和演唱情绪成为画面主体。因此内容呈现逐渐从复杂舞台造型转向更生活化的造型，从常规明亮环境转向暗光与局部氛围灯，从传统演唱视频转向更近距离、更自然、更有情绪的观看体验。加一和减一是同一个艺人的两个账号，这里不展开成双账号运营分析报告。' },
      equation:[
        { h:{en:'FROM',zh:'从'}, b:{en:'STAGE / POLISHED / PERFORMANCE',zh:'舞台化 / 精致表演感'} },
        { h:{en:'TO',zh:'到'}, b:{en:'CLOSE / NATURAL / EMOTIONAL',zh:'近距离 / 自然 / 情绪感'} }
      ]
    },
    approach:{
      kicker:{ en:'LESS STAGING, MORE EMOTION', zh:'少一点舞台感，多一点情绪' },
      items:[
        { h:{ en:'VISUAL', zh:'视觉' }, body:{ en:'Reduce complex, stage-like styling. Use more everyday and natural clothing so the artist’s youthful and androgynous presence becomes clearer. The image uses less main light and more dark environments with local ambience near the artist. Keywords: Dark / Close / Natural / Emotional.', zh:'减少过于复杂、偏舞台化的造型表达。更多使用生活化、自然的服装，让人物本身的少年感和中性气质更加突出。画面整体减少主灯使用，更多使用暗光环境和人物附近的局部氛围灯。关键词：暗光、近距离、自然、情绪感。' } },
        { h:{ en:'SHOOTING', zh:'拍摄' }, body:{ en:'Two shooting formats were explored: fixed camera and friend POV. Fixed camera keeps the frame simple, turns down main lighting, and lets voice, expression, and performance state lead. Friend POV uses a more everyday handheld feeling, with conversation, facial reactions, slight movement, approach, pull-back, or small push-ins as possible hooks.', zh:'主要尝试两种拍摄形式：固定机位与好友视角。固定机位会关闭主要照明，在人物附近使用局部氛围灯，减少复杂运镜，让声音、表情和演唱状态成为主体。好友视角则更接近日常记录，视频开头可以加入对话、表情或情绪反应作为开头抓点，允许轻微晃动、靠近、拉远和轻微推拉。' } },
        { h:{ en:'EDITING', zh:'剪辑' }, body:{ en:'Keep the edit light. Most videos rely on one continuous take, with fewer transitions and effects. Lyrics, song title, and simple cover elements are added only to support the singing and emotional state. During my participation, publishing tests mainly focused on the 17:00–18:30 window.', zh:'整体保持轻剪辑。一镜到底为主，减少复杂转场和特效，主要加入歌词、歌名和简单封面，让演唱和人物情绪成为主体。我参与时期主要尝试的发布时间为 17:00–18:30。' } },
      ]
    },
    workTitle:{ en:'WORK & RESULT', zh:'代表作品' },
    productionNote:{ en:'', zh:'' },
    heroWork:{
      title:'心墙',
      video:'assets/artist-content/jiayi/xinqiang.mp4',
      proofImage:'assets/artist-content/jiayi/xinqiang-proof-new-20260913.png',
      role:{ en:'Content Planning / Shooting / Editing', zh:'内容策划 / 拍摄 / 剪辑' },
      originalUrl:'',
      artistUrl:'',
      metrics:[
        { value:'377K+', label:{en:'LIKES',zh:'点赞'}, primary:true },
        { value:'69K+', label:{en:'SHARES',zh:'分享'}, primary:true },
        { value:'17.5K+', label:{en:'SAVES',zh:'收藏'} },
        { value:'2635', label:{en:'COMMENTS',zh:'评论'} },
      ],
    },
    works:[],
    review:{
      kicker:{ en:'LOOKING BACK', zh:'回看这个项目' },
      body:{ en:'After leaving the project, I looked back at the public content and data of both accounts. The review made me realize that a music video receiving large-scale circulation does not necessarily mean the audience has built a clear memory of the artist. A highly singable and emotional song can help a piece of content spread quickly, but long-term artist operation also needs to answer another question: do people remember the song, or the person? If I were planning this project again, I would pay more attention to follow-up content after a viral work, the artist’s own visual identity, personality expression, and a clearer content division between the two accounts.', zh:'离开项目后，我重新回看了加一 / 减一两个账号的公开内容和数据。这次复盘让我意识到：一条音乐内容获得大量传播，并不意味着用户已经真正建立了对艺人的认知。高传唱度、强情绪的歌曲可以帮助内容更快获得传播，但音乐人长期运营还需要解决另一个问题：用户最终记住的是这首歌，还是这个人？如果现在重新规划这个项目，我会更关注爆款出现之后的连续内容承接、艺人自身的视觉识别、人物个性表达，以及两个账号之间更清晰的内容分工。' },
      statement:{ en:'REMEMBER THE SONG ↓ REMEMBER THE ARTIST', zh:'记住这首歌 ↓ 记住这个人' },
      note:{ en:'From remembering the song to remembering the artist.', zh:'从“记住这首歌”到“记住这个人”。' }
    },
    selectedWork:{ cover:'', video:'', metrics:['Likes: 377,411','Shares: 69,029','Saves: 17,586','Comments: 2,635'], originalUrl:'', artistUrl:'' },
  },
  {
    slug:'artist-02',
    number:'02',
    egg:1,
    name:{ en:'CHEN QINGYU', zh:'陈黥语' },
    category:{ en:'Artist Content / Douyin', zh:'音乐人内容 / 抖音' },
    accounts:[
      { name:{ en:'Chen Qingyu', zh:'陈黥语' }, image:'assets/artist-content/chenqingyu/profile.jpg', stats:{ en:'760K Likes · 13K Followers', zh:'76.0万获赞 · 1.3万粉丝' } },
    ],

    keywords:[
      { en:'College Student', zh:'大学生' },
      { en:'Independent Musician', zh:'独立音乐人' },
      { en:'R&B', zh:'节奏布鲁斯' },
      { en:'Distinctive Voice', zh:'独特音色' },
      { en:'Authentic', zh:'真实感' },
      { en:'Campus Feeling', zh:'校园感' },
    ],
    role:[
      { en:'Content Planning', zh:'内容策划' },
      { en:'Shooting', zh:'拍摄' },
      { en:'Editing', zh:'剪辑' },
      { en:'Publishing', zh:'发布' },
    ],
    profile:{
      title:{ en:'CHEN QINGYU', zh:'陈黥语' },
      subtitle:{ en:'Artist Content / Douyin', zh:'音乐人内容 / 抖音' },
      body:{ en:'A college musician with her own body of work, a distinctive voice, and strong vocal ability.', zh:'一名具有个人作品基础的大学生音乐人，拥有辨识度较高的音色和较强的演唱能力。' }
    },
    context:{
      kicker:{ en:'FROM MUSICIAN TO ARTIST', zh:'从音乐人到更完整的艺人呈现' },
      body:{ en:'Chen Qingyu was a senior student at the time. Before joining the company project, she had already started releasing her own music, had a foundation as a young musician, and had already seen high-performing content. The reason the company first noticed her was not appearance, but her distinctive vocal tone and strong singing ability. After she entered the project, the work focused on developing her image, camera presence, and content publishing more systematically while keeping musical ability as the core strength. In addition to image and visual direction adjustments, the company also arranged around two months of performance training during the project. Her early, more reserved camera expression gradually became more natural and vivid; later works showed richer facial expression, body state, emotional release, and interaction with the camera. More accurately, this was artist image and content development built on existing music ability and content foundations.', zh:'陈黥语当时是一名大四学生。在进入公司之前，她已经开始发布自己的音乐作品，是一个具有个人作品基础的小音乐人，也已经出现过高传播作品。公司最初关注到她，核心原因不是外形，而是她具有辨识度较高的音色和较强的演唱能力。进入公司后，项目开始在保留音乐能力这一核心优势的基础上，对她的外形、镜头呈现和内容发布进行更系统的调整。除了外形与视觉方向的调整，项目期间公司还安排了约两个月的表演课程训练。早期相对克制的镜头表达逐渐变得更加自然和生动，后期作品中可以明显看到更丰富的表情、肢体状态与情绪释放。更准确地说，这是在已有音乐能力与内容基础上，进行更系统的艺人形象和内容开发。' },
      equation:[
        { h:{ en:'CORE STRENGTH', zh:'核心优势' }, b:{ en:'Distinctive Voice + Strong Vocal Ability', zh:'有辨识度的音色 + 较强的演唱能力' } },
        { h:{ en:'ARTIST DEVELOPMENT', zh:'艺人开发' }, b:{ en:'Image + Camera + Content', zh:'形象 + 镜头 + 内容' } },
      ],
      progression:[
        { h:{ en:'BEFORE', zh:'训练前' }, b:{ en:'Reserved / Performance-focused', zh:'镜头表达相对克制，更多依靠演唱本身' } },
        { h:{ en:'2-MONTH PERFORMANCE TRAINING', zh:'约两个月表演课程训练' }, b:{ en:'Company-arranged training during the project', zh:'项目期间由公司安排' } },
        { h:{ en:'AFTER', zh:'训练后' }, b:{ en:'Expressive / Dynamic', zh:'更自然、更生动、更有情绪' } },
      ]
    },
    approach:{
      kicker:{ en:'MAKE THE IMAGE MATCH THE VOICE', zh:'让形象与声音更匹配' },
      items:[
        { h:{ en:'VISUAL', zh:'视觉' }, body:{ en:'Her early image leaned toward an ordinary student feeling, and the medium-length hairstyle felt relatively heavy. After entering the project, the image was adjusted more clearly: medium-length hair to short hair, eyebrow color adjustment, body management, and a reduction of the heavier student feeling. The direction was not to package her as a traditionally polished female artist, but to make the image lighter and more recognizable while keeping her original student-like and natural quality.', zh:'早期形象相对偏普通学生感，中长发造型较为厚重。进入项目后进行了更明显的外形调整：中长发转向短发，调整眉毛颜色，进行体态管理，减少原本较沉闷的学生感。整体方向不是把她包装成传统精致女艺人，而是让外形变得更轻、更有辨识度，同时保留她原本的学生感和自然感。' } },
        { h:{ en:'SHOOTING', zh:'拍摄' }, body:{ en:'At the early stage, the project tested close-up portrait shooting with high-definition equipment. One important visual method was half-face composition. Through closer camera distance and partial facial framing, the audience could first notice the voice, expression, eyes, and personal quality instead of relying on complex settings. As the artist image became clearer, content could also move into dorms, classrooms, corridors, outdoor spaces, and other more natural everyday scenes.', zh:'项目早期尝试使用高清设备进行近距离人物拍摄。其中一个重要的视觉方式是半脸构图。通过更近的人物距离和局部面部构图，让观众首先注意到声音、表情、眼神和人物气质，而不是依赖复杂场景和包装。随着人物形象逐渐建立，内容也可以进入宿舍、教室、楼道、户外等更自然的生活场景。拍摄整体保持近距离、自然、原生和私人感。' } },
        { h:{ en:'EDITING', zh:'剪辑' }, body:{ en:'Keep the edit light. Avoid heavy transitions and visual effects. Lyrics, song title, and simple subtitles carry the main information. The core is always voice first: let the voice become the first reason users enter the content.', zh:'保持轻剪辑，不使用大量复杂转场和视觉特效。歌词、歌名和简单字幕承担主要信息功能。核心始终是声音优先：让声音成为用户进入内容的第一理由。' } },
      ]
    },
    workTitle:{ en:'SELECTED WORK', zh:'代表作品' },
    productionNote:{ en:'', zh:'' },
    works:[
      { title:{ en:'VIDEO 01', zh:'视频 01' }, tag:{ en:'', zh:'' }, likes:{ en:'19K Likes · 2,323 Shares · 1,268 Saves · 385 Comments', zh:'1.9万点赞 · 2323 分享 · 1268 收藏 · 385 评论' }, role:{ en:'Content Planning / Shooting / Editing', zh:'内容策划 / 拍摄 / 剪辑' }, video:'assets/artist-content/chenqingyu/work-01.mp4', orientation:'landscape', proofImage:'assets/artist-content/chenqingyu/work-01-proof.png', originalUrl:'', artistUrl:'' },
      { title:{ en:'VIDEO 02', zh:'视频 02' }, tag:{ en:'', zh:'' }, likes:{ en:'13K Likes · 1,343 Shares · 447 Saves · 147 Comments', zh:'1.3万点赞 · 1343 分享 · 447 收藏 · 147 评论' }, role:{ en:'Content Planning / Shooting / Editing', zh:'内容策划 / 拍摄 / 剪辑' }, video:'assets/artist-content/chenqingyu/work-02.mp4', orientation:'landscape', proofImage:'assets/artist-content/chenqingyu/work-02-proof.png', originalUrl:'', artistUrl:'' },
    ],
    review:{
      kicker:{ en:'WHAT I LEARNED', zh:'我学到的事' },
      body:{ en:'Looking back, the most important point was not to package an ordinary student into an artist. She already had the most important core asset: her voice. Image adjustment, camera design, and content packaging should make that strength easier to see rather than cover it. Good artist development is not about remaking a person, but finding the part that is already most worth amplifying.', zh:'现在回看这个项目，我认为最重要的不是“把一个普通学生包装成艺人”。她本身已经拥有最重要的核心资产：声音。外形调整、镜头设计和内容包装真正应该做的，是让这个优势更容易被看见，而不是覆盖它。好的艺人开发不是重新制造一个人，而是找到她原本最值得被放大的部分。' },
      statement:{ en:'THE VOICE CAME FIRST.', zh:'声音先被听见。' },
      note:{ en:'Image and content should amplify the artist, not replace the artist.', zh:'形象和内容应该放大艺人，而不是替代艺人。' }
    },
    observation:{ en:'', zh:'' },
    direction:{ en:'', zh:'' },
    execution:{ en:'', zh:'' },
    selectedWork:{ cover:'', video:'', metrics:[], originalUrl:'', artistUrl:'' },
  },
  {
    slug:'artist-03',
    number:'03',
    egg:2,
    name:{ en:'TETE', zh:'忒忒' },
    category:{ en:'Artist Content / Douyin', zh:'音乐人内容 / 抖音' },
    accounts:[
      { name:{ en:'TETE', zh:'忒忒' }, image:'assets/artist-content/tete/profile.jpg', stats:{ en:'15K Likes · 718 Followers', zh:'1.5万获赞 · 718 粉丝' } },
    ],
    keywords:[{en:'Retro',zh:'复古'},{en:'Alternative',zh:'另类'},{en:'Playful Makeup',zh:'鬼马妆造'},{en:'Atmospheric Vocal',zh:'氛围型声音'},{en:'Indie',zh:'独立音乐'}],
    role:[{en:'Content Planning',zh:'内容策划'},{en:'Creative Direction',zh:'创意方向'}],
    profile:{
      title:{ en:'TETE', zh:'忒忒' },
      subtitle:{ en:'Artist Content / Douyin', zh:'音乐人内容 / 抖音' },
      body:{ en:'A musician one year after graduating from university, with a background in classical vocal training. Her voice has a retro, atmospheric quality, and she also has a strong ability in makeup and styling.',
             zh:'刚大学毕业一年的音乐人，有美声学习背景。她的声音具有偏复古、氛围型的质感，同时本人拥有很强的化妆与造型能力。' },
    },
    context:{
      kicker:{ en:'Finding the right match', zh:'找到更适合她的表达' },
      body:{ en:'At the early stage of the project, we noticed two clear personal assets: a retro, recognizable vocal tone, and strong personal makeup and styling ability. Early Chinese-song attempts did not clearly amplify her traits. As more English songs were tested, the content performance began to improve. Songs by Billie Eilish, Lana Del Rey, Laufey and related directions matched her retro, lazy, atmospheric voice and visual presence more naturally. Compared with emphasizing difficult vocal technique, the content was better suited to her tonal and atmospheric strengths.',
             zh:'项目初期，我们关注到她两个非常明显的个人资产：具有复古感和辨识度的音色，以及很强的个人化妆与造型能力。早期曾尝试中文歌曲，但内容表现没有明显放大她的个人特质。后续逐渐尝试更多英文歌曲后，数据表现开始改善。一些偏复古、慵懒、氛围型的英文歌曲，与她的声音和视觉气质更加匹配。相比强调高难度演唱，更适合发挥音色与氛围优势。' },
      equation:[
        { h:{en:'VOICE',zh:'声音'}, b:{en:'Retro / Atmospheric',zh:'复古 / 氛围型'} },
        { h:{en:'SONG',zh:'选曲'}, b:{en:'English / Alternative',zh:'英文歌 / 另类流行'} },
        { h:{en:'LOOK',zh:'妆造'}, b:{en:'Playful / Experimental',zh:'鬼马 / 实验感'} },
      ],
    },
    approach:{
      kicker:{ en:'Make the visual part of the music', zh:'让视觉成为音乐的一部分' },
      items:[
        { h:{ en:'SONG', zh:'选曲方向' },
          body:{ en:'After early Chinese-song attempts, we gradually increased tests around English songs. English Indie / Alternative / Pop matched her retro, atmospheric voice more closely. Later references included Billie Eilish, Lana Del Rey, Laufey, Ariana Grande and NIKI.',
                 zh:'前期尝试中文歌曲后，逐渐增加英文歌曲测试。相比部分中文歌曲，英文独立、另类、流行方向与她偏复古、氛围型的声音更加匹配。后续内容逐渐转向更复古、更慵懒、更有氛围的选曲方向。' } },
        { h:{ en:'LOOK', zh:'妆造' },
          body:{ en:'The artist herself has strong makeup ability. In the content ideas, this existing strength became part of the video language rather than only preparation before filming. Different songs could lead to different makeup, hair, accessories and styling: one song, one mood, one look.',
                 zh:'艺人本人具有很强的化妆能力。因此内容创意中，会主动把她原本拥有的妆造能力变成视频的一部分，而不是只把妆容当作拍摄前准备。不同歌曲可以对应不同妆容、发型、配饰和造型，形成“一首歌，一个情绪，一个造型”。' } },
        { h:{ en:'CONTENT IDEA', zh:'视频小巧思' },
          body:{ en:'Beyond traditional mirror-facing singing videos, the content added light but memorable ideas: two-look transitions, vocal layers using the artist’s own harmonies, and small cut-out or repeated-person elements. The principle was not to make the videos very complicated, but to add one thing viewers could remember beyond the song itself.',
                 zh:'在传统的“对镜唱歌”之外，内容中会加入一些轻量但有记忆点的小设计，例如双造型跳转、利用艺人自己的和声增加声音层次、加入人物小抠图或重复人物等鬼马变化。这些设计的共同原则不是把视频做得非常复杂，而是在歌曲本身之外，增加一个观众能够记住的小巧思。' } },
      ],
    },
    works:[
      { title:'wish you were gay', tag:{en:'TWO-LOOK TRANSITION',zh:'双造型过渡'}, likes:{en:'3,505 Likes',zh:'3,505 点赞'}, role:{en:'Content Planning / Creative Direction',zh:'内容策划 / 创意方向'}, video:'assets/artist-content/tete/wish-you-were-gay.mp4', originalUrl:'', artistUrl:'' },
      { title:'Salvatore', tag:{en:'TWO-LOOK TRANSITION',zh:'双造型过渡'}, likes:{en:'800 Likes',zh:'800 点赞'}, role:{en:'Content Planning / Creative Direction',zh:'内容策划 / 创意方向'}, video:'assets/artist-content/tete/salvatore.mp4', originalUrl:'', artistUrl:'' },
      { title:"when the party's over", tag:{en:'VOCAL LAYERS',zh:'和声层次'}, likes:{en:'795 Likes',zh:'795 点赞'}, role:{en:'Content Planning / Creative Direction',zh:'内容策划 / 创意方向'}, video:'assets/artist-content/tete/when-the-partys-over.mp4', originalUrl:'', artistUrl:'' },
    ],
    review:{
      kicker:{ en:'Find what only this artist can do', zh:'找到只有这个艺人能做的东西' },
      body:{ en:'Looking back, the important point is that content ideas do not always mean more complicated production. TETE already had two clear personal traits: a recognizable voice and strong makeup ability. Rather than creating a new persona from scratch, the work was about turning existing strengths into content language. Song choices moved closer to her vocal tone, makeup became the visual entrance of each video, and light ideas such as two-look transitions, vocal layers and cut-out elements added memorability.',
             zh:'现在回看这个项目，我认为比较重要的一点是：内容创意不一定意味着增加复杂的制作。忒忒本身已经拥有两个很明显的个人特点：有辨识度的声音，以及很强的妆造能力。相比重新创造一个人设，更重要的是把这些已经存在的特点转化成内容语言。选曲开始更贴近她的音色，妆造开始成为每条视频的视觉入口，再通过双造型跳转、和声、小抠图等轻量设计增加记忆点。' },
      statement:{ en:'VOICE × LOOK × IDEA', zh:'声音 × 妆造 × 小巧思' },
      note:{ en:'Turn what the artist already has into something people can remember.',
             zh:'找到艺人本来就有的东西，再把它变成观众能记住的内容。' },
    },
    productionNote:{ en:'', zh:'' },
    observation:{ en:'', zh:'' },
    direction:{ en:'', zh:'' },
    execution:{ en:'', zh:'' },
    selectedWork:{ cover:'', video:'assets/artist-content/tete/wish-you-were-gay.mp4', metrics:['3,505 Likes'], originalUrl:'', artistUrl:'' },
  },
  {
    slug:'artist-04',
    number:'04',
    egg:3,
    name:{ en:'SOPHIE', zh:'大表哥 Sophie' },
    category:{ en:'Artist Content / Douyin', zh:'音乐人内容 / 抖音' },
    accounts:[
      { name:{ en:'Sophie', zh:'大表哥 Sophie' }, image:'assets/artist-content/sophie/profile.png', stats:{ en:'76.286M Likes · 2.473M Followers', zh:'7628.6万获赞 · 247.3万粉丝' } },
    ],
    keywords:[
      { en:'Singer', zh:'歌手' },
      { en:'R&B', zh:'节奏布鲁斯' },
      { en:'Cover', zh:'翻唱' },
      { en:'Natural', zh:'自然' },
      { en:'Bedroom Live', zh:'卧室演唱' },
    ],
    role:[
      { en:'Artist Assistant', zh:'艺人助理' },
      { en:'Content Planning', zh:'内容策划' },
      { en:'Content Execution', zh:'账号内容执行' },
      { en:'Shooting', zh:'拍摄' },
    ],
    profile:{
      title:{ en:'SOPHIE', zh:'大表哥 Sophie' },
      subtitle:{ en:'Artist Content / Douyin', zh:'音乐人内容 / 抖音' },
      body:{ en:'I participated in Sophie’s account content work as an artist assistant, after the account had already built a mature content base and a stable personal style.', zh:'我以艺人助理身份参与大表哥 Sophie 的账号内容；在我接手之前，账号已经拥有成熟的内容基础和较稳定的个人风格。' }
    },
    context:{
      kicker:{ en:'WORKING WITH AN ESTABLISHED ARTIST', zh:'在成熟账号中继续工作' },
      body:{ en:'I participated in Sophie’s account content as an artist assistant. Before I joined, the account already had a mature content foundation and a stable personal style. My work was not to rebuild the account positioning, but to understand and continue the existing content language, participate in daily topic selection and content execution, and look for space for new attempts. The existing content was natural, close, bedroom-like, and centered on live singing. Historical account performance is treated as the artist’s existing asset, not my work result.', zh:'我以艺人助理的身份参与大表哥 Sophie 的账号内容。在我接手之前，账号已经拥有成熟的内容基础和较稳定的个人风格。因此我的工作并不是重新建立账号定位，而是在理解和延续原有内容语言的基础上，参与日常选题与内容执行，并寻找可以进行新尝试的空间。账号原有内容特点是自然、近距离、生活化的演唱内容。历史账号成绩属于艺人已有资产，不作为我的工作成果。' },
      equation:[
        { h:{ en:'ESTABLISHED STYLE', zh:'已有成熟风格' }, b:{ en:'Natural / Close / Bedroom / Live Singing', zh:'自然 / 近距离 / 生活化 / 现场演唱' } },
        { h:{ en:'KEEP THE CORE', zh:'保留核心' }, b:{ en:'Continue the viewing habit already built by the account', zh:'延续账号已经建立的观看习惯' } },
        { h:{ en:'TEST SOMETHING NEW', zh:'尝试新的空间' }, b:{ en:'New song choices and small content ideas inside the existing frame', zh:'在已有框架中尝试新的选曲和内容想法' } },
      ]
    },
    approach:{
      kicker:{ en:'KEEP THE CORE, TEST SOMETHING NEW', zh:'保留核心，再尝试新的东西' },
      items:[
        { h:{ en:'CONTINUITY', zh:'延续' }, body:{ en:'Most of the work was built on the existing account style. I continued the natural, everyday, close singing format that the account had already formed, instead of deliberately changing a mature viewing habit.', zh:'这个项目的大部分工作建立在已有账号风格之上。我延续账号原本已经形成的自然、生活化、近距离演唱方式，不刻意改变成熟账号已经建立的观看习惯。' } },
        { h:{ en:'SONG SELECTION', zh:'选曲' }, body:{ en:'While continuing the existing content, I looked for new song possibilities based on the artist’s real music preferences. One important attempt came from Avril Lavigne. Sophie herself is a fan of Avril Lavigne, so the idea was simple: since this is music she truly likes, why not let her sing it once? The final choice was Avril Lavigne’s Innocence.', zh:'在延续原有内容的同时，我会根据艺人本身的音乐偏好寻找新的选曲可能。其中一次比较重要的尝试来自 Avril Lavigne。Sophie 本身就是 Avril Lavigne 的粉丝，因此我产生了一个很简单的想法：既然这是她自己真正喜欢的音乐，为什么不让她唱一次？最终选择了 Avril Lavigne 的《Innocence》。' } },
        { h:{ en:'EMOTION', zh:'情绪' }, body:{ en:'After release, the work received visibly stronger public interaction than most content from the same period. The atmosphere was less like a formal cover performance and more like singing an Avril song together with a friend. As the person filming, I also joined the backing vocal, which made the video feel closer to a shared music moment than a solo performance. Looking back, I think what it touched was not only “people like Avril.” The song connected to a shared memory: when people miss Avril, they may also be missing the younger version of themselves who first heard her songs.', zh:'作品发布后获得了明显高于同期多数内容的公开互动表现。它营造的不是正式翻唱表演，更像是和朋友一起唱一首艾薇儿的歌。作为拍摄者，我也加入了和声，让视频更像一个共同发生的音乐瞬间，而不是单人的表演展示。现在重新回看，我认为它真正击中的可能不只是“大家喜欢艾薇儿”。这首歌连接的是一代人的共同记忆。观众怀念艾薇儿，某种程度上也在怀念第一次听她的歌时，那个更年轻的自己。' } },
      ]
    },
    workTitle:{ en:'SELECTED WORK', zh:'代表作品' },
    productionNote:{ en:'', zh:'' },
    heroWork:{
      title:{ en:'Avril Lavigne · Innocence', zh:'Avril Lavigne《Innocence》' },
      date:{ en:'2026.02.28', zh:'2026.02.28' },
      video:'assets/artist-content/sophie/innocence.mov',
      proofImage:'assets/artist-content/sophie/innocence-proof.png',
      role:{ en:'Song Selection / Content Idea / Shooting / Artist Assistant', zh:'选曲 / 内容创意 / 拍摄 / 艺人助理' },
      originalUrl:'',
      artistUrl:'',
      metrics:[
        { value:'205K+', label:{ en:'LIKES', zh:'点赞' }, primary:true },
        { value:'33K+', label:{ en:'SHARES', zh:'分享' }, primary:true },
        { value:'16K+', label:{ en:'SAVES', zh:'收藏' } },
        { value:'2.9K+', label:{ en:'COMMENTS', zh:'评论' } },
      ],
    },
    works:[],
    review:{
      kicker:{ en:'SOMETIMES THE IDEA IS PERSONAL', zh:'有时候想法来自真实喜欢' },
      body:{ en:'This content did not begin with complex data analysis. Sophie herself is a fan of Avril Lavigne. I simply thought: why not let her sing a song she truly likes, and one that also belongs to many people’s youth? During filming, I also joined the backing vocal, so the atmosphere became closer to singing with a friend. Innocence eventually received 205K+ likes and 32K+ shares. Looking back, I think the work touched more than the song itself. When many people heard Avril again, they were also remembering their own youth.', zh:'这次内容并不是从复杂的数据分析开始的。Sophie 本身就是 Avril Lavigne 的粉丝。我只是突然想到：为什么不让她唱一首自己真正喜欢、同时也是很多人青春记忆里的歌？拍摄过程中，我也加入了和声，所以这条视频的氛围更接近和朋友一起唱歌。《Innocence》最终获得了 20.5 万以上点赞和 3.2 万以上分享。现在重新回看这条内容，我认为它击中的不只是歌曲本身。很多人在听艾薇儿的时候，也在重新想起自己曾经的青春。' },
      statement:{ en:'WE DON’T JUST MISS THE SONG. WE MISS WHO WE WERE WHEN WE HEARD IT.', zh:'我们怀念的不只是那首歌，也包括第一次听见它时的自己。' },
      note:{ en:'Shared memory can make a simple song choice feel personal again.', zh:'共同记忆会让一次简单的选曲重新变得私人。' }
    },
    observation:{ en:'', zh:'' },
    direction:{ en:'', zh:'' },
    execution:{ en:'', zh:'' },
    selectedWork:{ cover:'', video:'', metrics:['Likes: 205,475','Shares: 32,502','Saves: 15,857','Comments: 2,978'], originalUrl:'', artistUrl:'' },
  },
];

/* ---------- 9. VIDEO —— VISUAL 内的个人影像 Selected Works ----------
   8 个作品，全部由本人独立完成（Concept / Planning / Shooting / Editing）。
   分类只按内容形式：Vlog / Narrative、Talking / Expression、Concept / Creative；平台仅作信息与跳转。
   featured:true 的作品在页面顶部用大版式展示。
   cover / video：目前统一留空 → 显示占位；提供封面图或原视频后填路径即可，
   不要抓取小红书 / B站的外部缩略图。
   不填播放量、发布日期、时长等任何未确认数据。
------------------------------------------------------------------- */
const VIDEO_CATEGORIES = [
  { key:'short-vlog', label:{ en:'Short Vlog', zh:'短Vlog' } },
  { key:'long-vlog',  label:{ en:'Long Vlog', zh:'长Vlog' } },
  { key:'talking',    label:{ en:'Talking', zh:'口播' } },
  { key:'challenge',  label:{ en:'Challenge', zh:'挑战' } },
];

const VIDEO_WORKS = [
  /* ---- Featured 01：概念 / 挑战 ---- */
  {
    id:'movies-7days', featured:true, category:'challenge', platform:'douyin',
    title:'7天每天看电影写观后感，我坚持下来了吗？',
    titleEn:'7 DAYS OF MOVIES',
    type:{ en:'Challenge', zh:'挑战' },
    intro:{ en:'Watching one film and writing about it, every day for 7 days. There were interruptions — on day 7 I even fell asleep halfway through. The 7-day plan ended up taking 8 days. But that is exactly why it worked: an interruption is not an ending, and doing it imperfectly still counts as continuing.',
            zh:'连续 7 天每天看一部电影并写下观后感。中间有过中断，第 7 天甚至看到一半睡着了，最后这个「7 天计划」花了 8 天才完成。但也正因为这样，我开始觉得——中断不等于结束，做得不好也可以继续。' },
    focus:[ { en:'Concept Development', zh:'概念策划' }, { en:'Storytelling', zh:'故事结构' }, { en:'Personal Experiment', zh:'个人实验' }, { en:'Editing', zh:'剪辑' } ],
    links:[ { p:'douyin', url:'https://v.douyin.com/p0HT44eF3dk/' } ],
    cover:'assets/video-content/movies-7days-cover.jpg', video:'', ratio:'3/4', mediaRatio:'3/4',
  },
  /* ---- Featured 02：Vlog / Narrative ---- */
  {
    id:'vlog14-jiuzi', featured:true, category:'long-vlog', platform:'bili',
    title:'VLOG14｜九子夺嫡搜狐比赛全记录｜我们的冠军路',
    titleEn:'VLOG14 · ROAD TO THE CHAMPIONSHIP',
    type:{ en:'Long Vlog', zh:'长Vlog' },
    intro:{ en:'A full record of our dance competition journey — from preparation to the final result, told in one long-form edit.',
            zh:'完整记录我们的比赛之路 —— 从备赛到最终结果，用一条长视频讲完。' },
    focus:[ { en:'Long-form Storytelling', zh:'长视频叙事' }, { en:'Event Documentation', zh:'比赛记录' }, { en:'Editing', zh:'剪辑' } ],
    links:[ { p:'bili', url:'https://b23.tv/mpfZcgh' } ],
    cover:'assets/video-content/vlog14-jiuzi-cover.jpg', video:'', ratio:'16/9',
  },
  /* ---- Selected Videos ---- */
  {
    id:'danlog-pms', category:'short-vlog', platform:'xhs',
    title:'蛋log｜人生美好，PMS坏！',
    type:{ en:'Short Vlog', zh:'短Vlog' },
    focus:[ { en:'Lifestyle Storytelling', zh:'生活叙事' }, { en:'Mood', zh:'情绪表达' }, { en:'Visual Editing', zh:'视觉剪辑' } ],
    links:[ { p:'xhs', url:'https://xhslink.cn/o/57aKqqqgO5I' } ],
    cover:'assets/video-content/danlog-pms-cover.jpg', video:'', ratio:'3/4',
  },
  {
    id:'danlog-yellow-seoul', category:'short-vlog', platform:'xhs',
    title:'蛋log｜用 yellow 打开我的首尔逛吃 D-2',
    type:{ en:'Short Vlog', zh:'短Vlog' },
    focus:[ { en:'Visual Concept', zh:'视觉概念' }, { en:'Color', zh:'色彩线索' }, { en:'Travel Editing', zh:'旅行剪辑' } ],
    links:[ { p:'xhs', url:'https://xhslink.cn/o/7cTdDdrqZmy' } ],
    cover:'assets/video-content/danlog-yellow-seoul-cover.jpg', video:'', ratio:'4/3',
  },
  {
    id:'danlog-dongzhi', category:'short-vlog', platform:'xhs',
    title:'蛋log｜记一次25年冬至｜莲藕排骨汤初尝试',
    type:{ en:'Short Vlog', zh:'短Vlog' },
    focus:[ { en:'Daily Storytelling', zh:'日常叙事' }, { en:'Food', zh:'食物' }, { en:'Atmosphere', zh:'氛围' } ],
    links:[ { p:'xhs', url:'https://xhslink.cn/o/6p9lLu7ZV00' } ],
    cover:'assets/video-content/danlog-dongzhi-cover.jpg', video:'', ratio:'4/3',
  },
  {
    id:'wuhan-energy-map', category:'long-vlog', platform:'bili',
    title:'武汉生活片段｜我的能量修复地图',
    type:{ en:'Long Vlog', zh:'长Vlog' },
    focus:[ { en:'Lifestyle Storytelling', zh:'生活叙事' }, { en:'Rhythm', zh:'节奏' }, { en:'Atmosphere', zh:'氛围' } ],
    links:[ { p:'bili', url:'https://b23.tv/fHsTHMu' } ],
    cover:'assets/video-content/wuhan-energy-map-cover.jpg', video:'', ratio:'4/3',
  },
  {
    id:'vlog13-tianjin', category:'long-vlog', platform:'bili',
    title:'OMELETTE｜天津中转老友记｜江陵两日游',
    type:{ en:'Long Vlog', zh:'长Vlog' },
    focus:[ { en:'Travel Storytelling', zh:'旅行叙事' }, { en:'Long-form Editing', zh:'长视频剪辑' }, { en:'Visual Diary', zh:'影像日记' } ],
    links:[ { p:'bili', url:'https://b23.tv/5wt4J3r' } ],
    cover:'assets/video-content/vlog13-tianjin-cover.jpg', video:'', ratio:'4/3',
  },
  {
    id:'dantalk-first-class', category:'talking', platform:'xhs',
    title:'蛋talk｜第一次去舞室，怎么选第一节课？',
    type:{ en:'Talking', zh:'口播' },
    focus:[ { en:'Topic Planning', zh:'选题策划' }, { en:'Information Structure', zh:'信息结构' }, { en:'On-camera Communication', zh:'口播表达' } ],
    links:[ { p:'xhs', url:'https://xhslink.cn/o/7wzqCxvd81G' } ],
    cover:'assets/video-content/dantalk-first-class-cover.jpg', video:'', ratio:'3/4',
  },
  {
    id:'seoul-shopping-haul', category:'talking', platform:'xhs',
    title:'抠搜大学生首尔购物分享｜形容词匮乏版',
    type:{ en:'Talking', zh:'口播' },
    focus:[ { en:'On-camera Speaking', zh:'口播表达' }, { en:'Haul Storytelling', zh:'好物分享叙事' }, { en:'Editing', zh:'剪辑' } ],
    links:[ { p:'xhs', url:'https://xhslink.cn/o/8YOkudoXLBW' } ],
    cover:'assets/video-content/seoul-shopping-cover.jpg', video:'', ratio:'4/3',
  },
];

/* ---------- 5. About 页 ---------- */
const ABOUT = {
  lede:{ en:'Music graduate turned creator — shooting, cutting, planning and dancing my way through ideas.',
         zh:'音乐专业出身的创作者 —— 自己拍、自己剪、自己做策划，也跳舞。' },
  blocks:[
    { h:{ en:'Background', zh:'背景' },
      list:[ { en:'Music major graduate — now shooting, editing, planning and dancing my way through ideas.', zh:'音乐专业毕业生 —— 自己拍、自己剪、自己做策划，也跳舞。' } ] },
    { h:{ en:'What I Do', zh:'我在做什么' },
      body:{ en:'I plan and produce content for musicians — positioning, shooting, editing and publishing — and I keep a personal archive of photos and videos on this site.',
             zh:'为音乐人策划并制作内容 —— 定位、拍摄、剪辑与发布；同时在这个站里保留自己拍的影像存档。' },
      chips:['Photography','Video Editing','Music','Content Planning','Dance'] },
    { h:{ en:'Open To', zh:'想做的方向' },
      body:{ en:'Currently looking for roles in music planning / marketing / promotion, content, and new-media operations.',
             zh:'正在求职音乐企划 / 营销 / 推广、内容、新媒体运营方向岗位。' },
      chips:['Music Content','Creative Planning','Visual Storytelling','Video Production','Live / Stage'] },
  ],
};
