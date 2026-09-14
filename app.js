/* ==================================================================
   XIAOYUAN · 创作者主页 —— 渲染与路由
   依赖：data.js（SITE / UI / ENTRIES / PANELS / ABOUT）
        assets/visual/gallery.js（window.VISUAL_GALLERY，可选）
   ================================================================== */

const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const app = $('#app');
let LANG = localStorage.getItem('lang') || 'en';

// 双语取值：字符串原样返回，对象取当前语言
const t = o => !o ? '' : (typeof o === 'string' ? o : (o[LANG] || o.en || ''));
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- 语言切换 ---------- */
function setLang(l) {
  LANG = l; localStorage.setItem('lang', l);
  document.body.className = 'lang-' + l;
  $('#langEn').classList.toggle('on', l === 'en');
  $('#langZh').classList.toggle('on', l === 'zh');
  fillNav();
  route();
}
$('#langEn').onclick = () => setLang('en');
$('#langZh').onclick = () => setLang('zh');

// 用 UI 文案填充所有导航（含移动端菜单）
function fillNav() { $$('[data-key]').forEach(a => a.textContent = t(UI[a.dataset.key])); }

/* ---------- 通用块渲染（意向页 / About 共用） ---------- */
function blockHTML(b) {
  let inner = '';
  if (b.body)  inner += `<p class="body">${esc(t(b.body))}</p>`;
  if (b.list)  inner += `<ul class="body">${b.list.map(i => `<li>${esc(t(i))}</li>`).join('')}</ul>`;
  if (b.chips) inner += `<div class="chips">${b.chips.map(c => `<span class="chip">${esc(c)}</span>`).join('')}</div>`;
  return `<div class="sect"><h3>${esc(t(b.h))}</h3>${inner}</div>`;
}

function isPending(text) { return String(text).indexOf('[待补充') === 0 || String(text).indexOf('[PLACEHOLDER') === 0; }

/* ==================================================================
   Home
   ================================================================== */
function renderHome() {
  app.innerHTML = `
  <section class="egg-home" aria-labelledby="eggHomeTitle">
    <h1 class="sr-only" id="eggHomeTitle">${esc(t(SITE.name))} — ${esc(t(SITE.tagline))}</h1>
    <p class="sr-only">${esc(t(SITE.intro))}</p>

    <div class="egg-scene" id="eggScene" data-active="">
      <div class="home-copy">
        <span class="home-kicker">${LANG === 'zh' ? 'XIAOYUAN / JIANDAN' : 'XU XIAOYUAN / JIANDAN'}</span>
        <strong>${esc(t(SITE.name))}</strong>
        <p>${esc(t(SITE.intro))}</p>
      </div>
      <img class="egg-art" src="assets/home/jiandan-scene.png" alt="" draggable="false">
      <span class="egg-pop egg-pop-creative" aria-hidden="true"></span>
      <span class="egg-pop egg-pop-music" aria-hidden="true"></span>
      <span class="egg-pop egg-pop-visual" aria-hidden="true"></span>
      <span class="egg-pop egg-pop-dance" aria-hidden="true"></span>
      <div class="home-map" aria-hidden="true">
        <span>01 ${esc(t(UI.visual))}</span>
        <span>02 ${esc(t(UI.music))}</span>
        <span>03 ${esc(t(UI.creative))}</span>
        <span>04 ${esc(t(UI.dance))}</span>
      </div>
      <div class="home-social">
        <a href="${esc(SITE.xhs)}" target="_blank" rel="noopener">${esc(t(UI.xhs))}</a>
        <a href="${esc(SITE.bilibili)}" target="_blank" rel="noopener">${esc(t(UI.bilibili))}</a>
        <a href="${esc(SITE.douyin)}" target="_blank" rel="noopener">${esc(t(UI.douyin))}</a>
        <a href="mailto:${esc(SITE.email)}">${esc(t(UI.email))}</a>
      </div>

      <a class="egg-link egg-link-creative" href="#/creative" data-home-key="creative">
        <span class="egg-label"><b>${esc(t(UI.creative))}</b><small>${LANG === 'zh' ? 'IDEAS' : '创意'}</small></span>
      </a>
      <a class="egg-link egg-link-music" href="#/music" data-home-key="music">
        <span class="egg-label"><b>${esc(t(UI.music))}</b><small>${LANG === 'zh' ? 'MUSIC' : '音乐'}</small></span>
      </a>
      <a class="egg-link egg-link-visual" href="#/visual" data-home-key="visual">
        <span class="egg-label"><b>${esc(t(UI.visual))}</b><small>${LANG === 'zh' ? 'FILM' : '影像'}</small></span>
      </a>
      <a class="egg-link egg-link-dance" href="#/dance" data-home-key="dance">
        <span class="egg-label"><b>${esc(t(UI.dance))}</b><small>${LANG === 'zh' ? 'DANCE' : '舞蹈'}</small></span>
      </a>
    </div>
  </section>`;

  bindHome();
}

function bindHome() {
  const scene = $('#eggScene');
  if (!scene) return;
  const links = $$('.egg-link');
  const activate = link => { scene.dataset.active = link.dataset.homeKey; };
  const clear = () => { scene.dataset.active = ''; };

  links.forEach(link => {
    link.addEventListener('pointerenter', () => activate(link));
    link.addEventListener('pointerleave', clear);
    link.addEventListener('focus', () => activate(link));
    link.addEventListener('blur', clear);
    link.addEventListener('click', e => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      e.preventDefault();
      activate(link);
      scene.classList.add('leaving');
      setTimeout(() => { location.hash = link.getAttribute('href'); }, 460);
    });
  });
}

/* ==================================================================
   音乐人视频案例 —— 一份数据，Music 页与 Visual 视频组共用
   ================================================================== */

// 占位内容（还没填的字段）显示为灰色说明，不会被当成真实信息
const filled = s => String(s || '').trim() && String(s).charAt(0) !== '[';

function creditsHTML(c) {
  const parts = [];
  if (filled(c.credits && c.credits.company)) parts.push(c.credits.company);
  if (filled(c.credits && c.credits.artist))  parts.push(c.credits.artist);
  return parts.length ? `<p class="body">${esc(parts.join(' · '))}</p>` : '';
}

function videoHTML(c) {
  const v = c.video || {};
  if (filled(v.src))   return `<video class="clip" src="${esc(v.src)}" poster="${esc(v.cover || '')}" controls preload="metadata"></video>`;
  if (filled(v.cover)) return `<img class="clip" src="${esc(v.cover)}" alt="">`;
  if (filled(v.link))  return `<a class="btn" href="${esc(v.link)}" target="_blank" rel="noopener">${esc(t(UI.watched))} ↗</a>`;
  return `<p class="body muted">${esc(t(UI.noVideo))}</p>`;
}

function caseHTML(c, i) {
  return `
  <article class="case" data-i="${i}">
    <button class="case-head" aria-expanded="false">
      <span class="cnum">${String(i + 1).padStart(2, '0')}</span>
      <span class="ctitle">${esc(t(c.title))}</span>
      <span class="crole">${esc(t(c.role))}</span>
      <span class="toggle" aria-hidden="true"></span>
    </button>
    <div class="case-body">
      <div class="case-inner">
        <div class="cblock">
          <span class="label">${esc(t(UI.brief))}</span>
          <p class="body">${esc(t(c.brief))}</p>
          ${creditsHTML(c)}
        </div>
        <div class="cblock">
          <span class="label">${esc(t(UI.myPart))}</span>
          <p class="body">${esc(t(c.role))}</p>
          <div class="chips">${c.contributions.map(x => `<span class="chip">${esc(x)}</span>`).join('')}</div>
        </div>
        <div class="cblock">
          <span class="label">${esc(t(UI.shotList))}</span>
          <div class="tbl-scroll"><table class="tbl">
            <thead><tr>${c.script.head.map(h => `<th>${esc(t(h))}</th>`).join('')}</tr></thead>
            <tbody>${c.script.rows.map(r => `<tr>${r.map(td => `<td>${esc(t(td))}</td>`).join('')}</tr>`).join('')}</tbody>
          </table></div>
        </div>
        <div class="cblock">${videoHTML(c)}</div>
        <div class="cblock">
          <span class="label">${esc(t(UI.reflect))}</span>
          <p class="body">${esc(t(c.reflection))}</p>
        </div>
      </div>
    </div>
  </article>`;
}

function casesHTML() {
  return `<div class="cases">${CASES.map(caseHTML).join('')}</div>`;
}

function casesSectionHTML(titleObj) {
  return `
  <div class="sect">
    <h3>${esc(t(titleObj))}</h3>
    <p class="body">${esc(t(UI.caseNote))}</p>
    <div style="margin-top:26px">${casesHTML()}</div>
  </div>`;
}

/* ==================================================================
   Artist Content —— 四颗鸡蛋 / 四位艺人
   ================================================================== */
function artistName(a) {
  const name = t(a.name);
  return filled(name) ? name : `${t(UI.artistContent)} ${a.number}`;
}

function renderArtistContent() {
  app.innerHTML = `
  <section class="artist-index">
    <div class="wrap artist-index-head">
      <span class="label">02 — ${esc(t(UI.music))}</span>
      <h1 class="display">${esc(t(UI.artistContent))}</h1>
      <p>${esc(t(UI.artistApproach))}</p>
    </div>

    <div class="artist-carton-stage" id="artistCarton">
      <img class="artist-carton" src="assets/artist-content/carton.png" alt="" draggable="false">
      <div class="artist-eggs">
        ${ARTISTS.map(a => `
          <a class="artist-egg artist-egg-${a.number}" href="#/artist/${a.slug}" data-artist="${esc(a.slug)}" aria-label="${esc(artistName(a))}">
            <span class="artist-egg-image" style="--egg-pos:${a.egg * 33.333}%"></span>
            <span class="artist-egg-name" translate="no"><b>${esc(a.number)}</b><span>${esc(artistName(a))}</span></span>
            <span class="artist-view">VIEW</span>
          </a>`).join('')}
      </div>
    </div>
  </section>`;
  bindArtistEggs();
}

function bindArtistEggs() {
  const stage = $('#artistCarton');
  if (!stage) return;
  $$('.artist-egg').forEach(egg => {
    egg.addEventListener('click', e => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      e.preventDefault();
      stage.dataset.opening = egg.dataset.artist;
      egg.classList.add('cracking');
      setTimeout(() => { location.hash = egg.getAttribute('href'); }, 700);
    });
  });
}

function artistSection(label, value) {
  if (!filled(t(value))) return '';
  return `<section class="artist-case-section"><span class="label">${esc(label)}</span><p>${esc(t(value))}</p></section>`;
}

function artistAccountsHTML(accounts) {
  if (!accounts || !accounts.length) return '';
  return `<div class="artist-account-tags">
    ${accounts.map((account, i) => `
      <div class="artist-account-tag">
        ${filled(account.image) ? `<img src="${esc(account.image)}" alt="${esc(t(account.name))}">` : ''}
        <span>${LANG === 'zh' ? '账号' : 'ACCOUNT'} ${String(i + 1).padStart(2, '0')}</span>
        <b>${esc(t(account.name))}</b>
        ${filled(t(account.stats)) ? `<small>${esc(t(account.stats))}</small>` : ''}
      </div>`).join('')}
  </div>`;
}

function artistProgressionHTML(items) {
  if (!items || !items.length) return '';
  return `<div class="artist-progression">
    ${items.map((item, i) => `
      ${i ? '<span class="artist-progress-arrow">↓</span>' : ''}
      <div>
        <b>${esc(t(item.h))}</b>
        <small>${esc(t(item.b))}</small>
      </div>`).join('')}
  </div>`;
}

function artistHeroWorkHTML(work) {
  if (!work) return '';
  const metrics = work.metrics || [];
  return `
  <section class="artist-hero-work">
    <div class="artist-hero-media">
      ${filled(work.video)
        ? `<video class="artist-work-media" src="${esc(work.video)}" controls preload="metadata"></video>`
        : `<div class="artist-work-placeholder">${esc(t(UI.artistPending))}</div>`}
    </div>
    <div class="artist-hero-result">
      <span class="label">${LANG === 'zh' ? '代表作品' : 'HERO WORK'}</span>
      <h3>${esc(t(work.title || ''))}</h3>
      <div class="artist-hero-metrics">
        ${metrics.map(m => `<div class="${m.primary ? 'primary' : ''}"><strong>${esc(t(m.value))}</strong><span>${esc(t(m.label))}</span></div>`).join('')}
      </div>
      <div class="artist-role-block">
        <span class="label">${esc(t(UI.myRole))}</span>
        <p>${esc(t(work.role || ''))}</p>
      </div>
      <div class="links-row">
        ${filled(work.originalUrl) ? `<a class="btn" href="${esc(work.originalUrl)}" target="_blank" rel="noopener">${esc(t(UI.viewOriginal))} ↗</a>` : ''}
        ${filled(work.artistUrl) ? `<a class="btn ghost" href="${esc(work.artistUrl)}" target="_blank" rel="noopener">${esc(t(UI.viewArtist))} ↗</a>` : ''}
      </div>
    </div>
    <div class="artist-proof">
      <span class="label">${LANG === 'zh' ? '公开数据证明' : 'PUBLIC PROOF'}</span>
      ${filled(work.proofImage)
        ? `<img src="${esc(work.proofImage)}" alt="${esc(work.title || '')} public proof">`
        : `<div class="artist-proof-placeholder">${esc(t(UI.artistPending))}</div>`}
    </div>
  </section>`;
}

function artistWorksHTML(works) {
  return `
  <div class="artist-work-grid">
    ${works.map((w, i) => `
      <article class="artist-work-card ${w.orientation === 'landscape' ? 'landscape-work' : ''}">
        <div class="artist-work-top">
          <span class="label">${String(i + 1).padStart(2, '0')} / ${esc(t(w.tag || ''))}</span>
          <h3>${esc(t(w.title))}</h3>
        </div>
        ${filled(w.video)
          ? `<video class="artist-work-media" src="${esc(w.video)}" controls preload="metadata"></video>`
          : `<div class="artist-work-placeholder">${esc(t(UI.artistPending))}</div>`}
        <div class="artist-work-meta">
          <span>${esc(t(w.likes || ''))}</span>
          <span>${esc(t(w.role || ''))}</span>
        </div>
        ${filled(w.proofImage) ? `<figure class="artist-work-proof"><span class="label">${LANG === 'zh' ? '公开数据证明' : 'PUBLIC PROOF'}</span><img src="${esc(w.proofImage)}" alt="${esc(t(w.title))} ${LANG === 'zh' ? '公开数据证明' : 'public proof'}"></figure>` : ''}
        <div class="links-row">
          ${filled(w.originalUrl) ? `<a class="btn" href="${esc(w.originalUrl)}" target="_blank" rel="noopener">${esc(t(UI.viewOriginal))} ↗</a>` : ''}
          ${filled(w.artistUrl) ? `<a class="btn ghost" href="${esc(w.artistUrl)}" target="_blank" rel="noopener">${esc(t(UI.viewArtist))} ↗</a>` : ''}
        </div>
      </article>`).join('')}
  </div>`;
}

function renderStructuredArtistDetail(a) {
  app.innerHTML = `
  <article class="artist-case-page structured-artist">
    <div class="wrap">
      <a class="artist-back" href="#/music">← ${esc(t(UI.artistContent))}</a>
      <header class="artist-case-head">
        <span class="artist-case-num">${esc(a.number)}</span>
        <div>
          <span class="label">${esc(t(a.category))}</span>
          <h1 class="display" translate="no">${esc(t(a.name))}</h1>
        </div>
      </header>

      <section class="artist-story-section artist-profile-section">
        <span class="artist-story-num">01</span>
        <div class="artist-story-copy">
          <span class="label">${esc(t(UI.profile))}</span>
          <h2>${esc(t(a.profile.title))}</h2>
          <p>${esc(t(a.profile.subtitle))}</p>
          ${artistAccountsHTML(a.accounts)}
          <div class="chips">${(a.keywords || []).map(k => `<span class="chip">${esc(t(k))}</span>`).join('')}</div>
          <div class="artist-role-block">
            <span class="label">${esc(t(UI.myRole))}</span>
            <p>${a.role.map(r => esc(t(r))).join(' · ')}</p>
          </div>
          <p class="artist-body">${esc(t(a.profile.body))}</p>
        </div>
      </section>

      <section class="artist-story-section">
        <span class="artist-story-num">02</span>
        <div class="artist-story-copy">
          <span class="label">${esc(t(UI.context))}</span>
          <h2>${esc(t(a.context.kicker))}</h2>
          <p class="artist-body">${esc(t(a.context.body))}</p>
          <div class="artist-equation">
            ${a.context.equation.map((item, i) => `
              ${i ? '<span class="artist-times">×</span>' : ''}
              <div><b>${esc(t(item.h))}</b><small>${esc(t(item.b))}</small></div>`).join('')}
          </div>
          ${artistProgressionHTML(a.context.progression)}
        </div>
      </section>

      <section class="artist-story-section">
        <span class="artist-story-num">03</span>
        <div class="artist-story-copy">
          <span class="label">${esc(t(UI.approach))}</span>
          <h2>${esc(t(a.approach.kicker))}</h2>
          <div class="artist-approach-list">
            ${a.approach.items.map(item => `
              <article>
                <h3>${esc(t(item.h))}</h3>
                <p>${esc(t(item.body))}</p>
              </article>`).join('')}
          </div>
        </div>
      </section>

      <section class="artist-story-section">
        <span class="artist-story-num">04</span>
        <div class="artist-story-copy">
          <h2>${esc(t(a.workTitle || UI.selectedWork))}</h2>
          ${filled(t(a.productionNote)) ? `<p class="artist-body">${esc(t(a.productionNote))}</p>` : ''}
          ${artistHeroWorkHTML(a.heroWork)}
          ${artistWorksHTML(a.works || [])}
        </div>
      </section>

      <section class="artist-story-section artist-review-section">
        <span class="artist-story-num">05</span>
        <div class="artist-story-copy">
          <span class="label">${esc(t(UI.review))}</span>
          <h2>${esc(t(a.review.kicker))}</h2>
          <p class="artist-body">${esc(t(a.review.body))}</p>
          <strong class="artist-final-statement">${esc(t(a.review.statement))}</strong>
          <p class="artist-final-note">${esc(t(a.review.note))}</p>
        </div>
      </section>
    </div>
  </article>`;
}

function renderArtistDetail(slug) {
  const a = ARTISTS.find(x => x.slug === slug);
  if (!a) { renderArtistContent(); return; }
  if (a.profile && a.context && a.approach && a.review) {
    renderStructuredArtistDetail(a);
    return;
  }
  const work = a.selectedWork || {};
  const hasDetails = filled(t(a.observation)) || filled(t(a.direction)) || filled(t(a.execution));
  const hasWork = filled(work.cover) || filled(work.video);

  app.innerHTML = `
  <article class="artist-case-page">
    <div class="wrap">
      <a class="artist-back" href="#/music">← ${esc(t(UI.artistContent))}</a>
      <header class="artist-case-head">
        <span class="artist-case-num">${esc(a.number)}</span>
        <h1 class="display" translate="no">${esc(artistName(a))}</h1>
      </header>

      <div class="artist-case-grid">
        <div class="artist-fried-egg" aria-hidden="true">
          <img src="assets/home/jiandan-scene.png" alt="">
        </div>
        <div class="artist-case-copy">
          ${artistSection(`01 ${t(UI.observation).toUpperCase()}`, a.observation)}
          ${artistSection(`02 ${t(UI.direction).toUpperCase()}`, a.direction)}
          ${artistSection(`03 ${t(UI.execution).toUpperCase()}`, a.execution)}
          ${!hasDetails ? `<p class="artist-pending">${esc(t(UI.artistPending))}</p>` : ''}
          ${a.role.length ? `<section class="artist-case-section"><span class="label">${esc(t(UI.myRole))}</span><div class="chips">${a.role.map(r => `<span class="chip">${esc(t(r))}</span>`).join('')}</div></section>` : ''}
        </div>
      </div>

      <section class="artist-selected">
        <span class="label">${esc(t(UI.selectedWork))}</span>
        ${hasWork ? (filled(work.video)
          ? `<video class="artist-work-media" src="${esc(work.video)}" poster="${esc(work.cover || '')}" controls preload="metadata"></video>`
          : `<img class="artist-work-media" src="${esc(work.cover)}" alt="">`)
          : `<div class="artist-work-placeholder">${esc(t(UI.artistPending))}</div>`}
        ${work.metrics && work.metrics.length ? `<div class="artist-metrics">${work.metrics.map(m => `<span>${esc(t(m))}</span>`).join('')}</div>` : ''}
        <div class="links-row">
          ${filled(work.originalUrl) ? `<a class="btn" href="${esc(work.originalUrl)}" target="_blank" rel="noopener">${esc(t(UI.viewOriginal))} ↗</a>` : ''}
          ${filled(work.artistUrl) ? `<a class="btn ghost" href="${esc(work.artistUrl)}" target="_blank" rel="noopener">${esc(t(UI.viewArtist))} ↗</a>` : ''}
        </div>
      </section>
    </div>
  </article>`;
}

// 展开 / 折叠：用 max-height 做过渡，展开时按内容高度赋值
function bindCases(scope) {
  scope.querySelectorAll('.case').forEach(el => {
    const head = el.querySelector('.case-head');
    const body = el.querySelector('.case-body');
    head.onclick = () => {
      const open = el.classList.toggle('open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open) { body.style.maxHeight = '0px'; return; }
      // scrollHeight 为 0 时给个兜底值；展开动画结束后解除限制，
      // 这样图片 / 视频随后加载变大也不会被裁掉
      body.style.maxHeight = (body.scrollHeight || 2400) + 'px';
      body.addEventListener('transitionend', function done() {
        if (el.classList.contains('open')) body.style.maxHeight = 'none';
        body.removeEventListener('transitionend', done);
      });
    };
  });
}

/* ==================================================================
   Visual —— 人像 / 风景生活 / 视频作品
   ================================================================== */
let vgFilter = 'all';

function vgItems() {
  const vg = window.VISUAL_GALLERY;
  if (!vg) return [];
  const a = vg.portrait.map(x => ({ ...x }));
  const b = vg.landscape.map(x => ({ ...x }));
  if (vgFilter === 'portrait')  return a;
  if (vgFilter === 'landscape') return b;
  const out = [];
  let i = 0, j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length) out.push(a[i++]);
    if (j < b.length) out.push(b[j++]);
  }
  return out;
}

function renderVisual() {
  const vg = window.VISUAL_GALLERY;
  const nP = vg ? vg.portrait.length : 0;
  const nL = vg ? vg.landscape.length : 0;

  app.innerHTML = `
  <section class="block panel">
    <div class="wrap">
      <div class="panel-head">
        <span class="label">01 — ${esc(t(UI.visual))}</span>
        <h1 class="display">${esc(t(PANELS.visual.lede))}</h1>
      </div>
      ${PANELS.visual.blocks.map(blockHTML).join('')}

      <div class="sect archive">
        <h3>${esc(t(UI.portraits))} · ${esc(t(UI.landscape))}</h3>
        <p class="body">${esc(t(UI.archiveNote))}</p>
        <div class="filters" id="vgFilters">
          <button data-g="all">${esc(t(UI.allPhotos))} · ${nP + nL}</button>
          <button data-g="portrait">${esc(t(UI.portraits))} · ${nP}</button>
          <button data-g="landscape">${esc(t(UI.landscape))} · ${nL}</button>
          <button data-g="video">${esc(t(UI.video))}</button>
        </div>
        <div class="masonry" id="masonry"></div>
        <div id="videoSlot" hidden>
          <div class="sect">
            <h3>${esc(t(UI.videoContent))}</h3>
            <p class="body">${esc(t(UI.videoMoved))}</p>
            <div class="links-row" style="margin-top:24px">
              <a class="btn" href="#/video">${esc(t(UI.videoContent))} →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  vgFilter = 'all';
  const btns = $$('#vgFilters button');
  btns.forEach(b => {
    b.classList.toggle('on', b.dataset.g === 'all');
    b.onclick = () => {
      vgFilter = b.dataset.g;
      btns.forEach(x => x.classList.toggle('on', x === b));
      renderMasonry();
    };
  });
  renderMasonry();
}

let vgIO = null;
function renderMasonry() {
  const box = $('#masonry');
  if (!box) return;
  const slot = $('#videoSlot');
  const items = vgItems();

  if (vgFilter === 'video') {
    box.innerHTML = ''; box.hidden = true; slot.hidden = false; return;
  }
  box.hidden = false; slot.hidden = true;

  box.innerHTML = items.map((g, i) => {
    // 按原始比例显示：只给宽度、高度自适应，不做裁切填充
    // srcset 让高清屏自动取更清晰的一张，普通屏仍用小的，不拖慢加载
    const scale = 1000 / Math.max(g.w, g.h);
    const tw = Math.max(1, Math.round(g.w * scale));
    return `
    <figure class="mitem" data-i="${i}" style="aspect-ratio:${g.w}/${g.h};transition-delay:${Math.min(i % 8, 7) * 60}ms">
      <img src="assets/visual/${g.t}"
           srcset="assets/visual/${g.t} ${tw}w, assets/visual/${g.f} ${g.w}w"
           sizes="(max-width:900px) 50vw, 33vw"
           width="${g.w}" height="${g.h}" alt="" loading="lazy" onload="this.classList.add('ok')">
    </figure>`;
  }).join('');

  const cells = box.querySelectorAll('.mitem');

  // 滚动到可视区附近才入场（交错节奏由 transition-delay 控制）
  // 不支持 IntersectionObserver 的老浏览器直接全部显示，避免图片停在不可见状态
  if ('IntersectionObserver' in window) {
    if (vgIO) vgIO.disconnect();
    vgIO = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); vgIO.unobserve(e.target); }
    }), { rootMargin: '300px' });
    cells.forEach(el => vgIO.observe(el));
  } else {
    cells.forEach(el => el.classList.add('in'));
  }

  cells.forEach(el => {
    el.onclick = () => openLightbox(items.map(g => 'assets/visual/' + g.f), +el.dataset.i);
  });
}

/* ==================================================================
   Music / Creative / Dance —— 意向页
   ================================================================== */
function renderPanel(key) {
  const p = PANELS[key];
  const pending = isPending(t(p.lede));
  app.innerHTML = `
  <section class="block panel">
    <div class="wrap fade-in">
      <div class="panel-head">
        <span class="label">${ENTRIES.find(e => e.key === key).num} — ${esc(t(UI[key]))}</span>
        <h1 class="display">${esc(t(p.lede))}</h1>
      </div>
      ${p.blocks.map(blockHTML).join('')}

      ${pending ? `<div class="sect"><div class="result-box"><p class="body">${esc(t(UI.pending))}</p></div></div>` : ''}

      ${p.cta ? `<div class="links-row" style="margin-top:34px"><a class="btn" href="${esc(p.cta.href)}">${esc(t(p.cta.label))} →</a></div>` : ''}

      <div class="panel-nav">
        ${navSiblings(key)}
      </div>
    </div>
  </section>`;

  if (key === 'music') bindCases(app);
}

function navSiblings(key) {
  const i = ENTRIES.findIndex(e => e.key === key);
  const prev = ENTRIES[(i - 1 + ENTRIES.length) % ENTRIES.length];
  const next = ENTRIES[(i + 1) % ENTRIES.length];
  return `
    <a class="pnav" href="#/${prev.key}"><span class="label">← ${esc(t(prev.title))}</span></a>
    <a class="pnav right" href="#/${next.key}"><span class="label">${esc(t(next.title))} →</span></a>`;
}

/* ==================================================================
   About
   ================================================================== */
function renderAbout() {
  app.innerHTML = `
  <section class="block panel">
    <div class="wrap">
      <div class="about-grid">
        <div>
          <div class="about-portrait">
            ${SITE.portrait ? `<img src="${esc(SITE.portrait)}" alt="">` : `<div class="ph">[PORTRAIT]</div>`}
          </div>
        </div>
        <div class="about-text">
          <span class="label">${esc(t(UI.about))}</span>
          <h1 class="display">${esc(t(ABOUT.lede))}</h1>
          ${ABOUT.blocks.map(blockHTML).join('')}

          <div class="sect">
            <h3>${esc(t(UI.resume))}</h3>
            <p class="body">${esc(t(UI.resumeHint))}</p>
            <div class="links-row" style="margin-top:20px">
              <a class="btn" href="${esc(SITE.resume)}" target="_blank">${esc(t(UI.viewResume))} ↗</a>
              <a class="btn ghost" href="${esc(SITE.resume)}" download>${esc(t(UI.download))} ↓</a>
            </div>
          </div>

          <div class="sect">
            <h3>${esc(t(UI.channels))}</h3>
            <div class="links-row">
              <a class="btn" href="${esc(SITE.bilibili)}" target="_blank" rel="noopener">${esc(t(UI.bilibili))} ↗</a>
              <a class="btn ghost" href="${esc(SITE.xhs)}" target="_blank" rel="noopener">${esc(t(UI.xhs))} ↗</a>
              <a class="btn ghost" href="${esc(SITE.douyin)}" target="_blank" rel="noopener">${esc(t(UI.douyin))} ↗</a>
              <a class="btn ghost" href="mailto:${esc(SITE.email)}">${esc(t(UI.email))} ↗</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ==================================================================
   Video & Content —— 个人视频作品（8 个，全部独立完成）
   封面策略：只用本地 cover/video 字段，留空即显示统一占位，
   绝不抓取小红书 / B站缩略图。不展示任何未确认的数据。
   ================================================================== */
const PLATFORM_LABEL = { xhs:'Xiaohongshu', bili:'Bilibili', douyin:'Douyin' };
let vwFilter = 'all';

function videoCoverHTML(w, cls) {
  // 有本地视频：内嵌播放器（poster=封面）；只有封面：显示图片；都没有：统一占位
  if (filled(w.video)) {
    return `<video class="${cls}" src="${esc(w.video)}" poster="${esc(w.cover || '')}" controls preload="metadata"></video>`;
  }
  if (filled(w.cover)) {
    return `<img class="${cls}" src="${esc(w.cover)}" alt="${esc(t(w.title))}" loading="lazy">`;
  }
  return `<div class="${cls} cover-pending"><span class="label">${esc(t(UI.coverPending))}</span><span class="cover-platform">${esc(PLATFORM_LABEL[w.platform] || w.platform)}</span></div>`;
}

function videoLinksHTML(w, cardMode) {
  return (w.links || []).map(l => cardMode
    ? `<a class="btn ghost vlink" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(t(UI.viewOriginal))} ↗</a>`
    : `<a class="btn ghost" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(PLATFORM_LABEL[l.p] || l.p)} ↗</a>`
  ).join('');
}

function renderVideoContent() {
  const featured = VIDEO_WORKS.filter(w => w.featured);
  /* 重点作品同时保留大版式与分类卡片：网格展示全部作品，确保各类目筛选完整 */
  const rest = VIDEO_WORKS;
  const catLabel = key => { const c = VIDEO_CATEGORIES.find(c => c.key === key); return c ? t(c.label) : key; };

  app.innerHTML = `
  <section class="block panel video-page">
    <div class="wrap">
      <div class="panel-head">
        <span class="label">${esc(t(UI.videoContent))}</span>
        <h1 class="display">${LANG === 'zh'
          ? '从想法到成片 —— 每支视频都由我独立完成。'
          : 'From idea to final cut — every video made on my own.'}</h1>
      </div>

      <div class="video-pipeline" aria-label="Idea, Planning, Shooting, Editing, Final cut">
        <span class="label">IDEA</span><span class="video-pipe-arrow">→</span>
        <span class="label">PLANNING</span><span class="video-pipe-arrow">→</span>
        <span class="label">SHOOTING</span><span class="video-pipe-arrow">→</span>
        <span class="label">EDITING</span><span class="video-pipe-arrow">→</span>
        <span class="label">FINAL CUT</span>
      </div>

      <div class="sect video-featured-sect">
        <h3>${esc(t(UI.featuredWork))}</h3>
        ${featured.map((w, i) => {
          const mr = w.mediaRatio || '16/9';
          const [mw, mh] = mr.split('/').map(Number);
          const portrait = mh > mw;
          return `
        <article class="vfeat ${i % 2 ? 'flip' : ''}${portrait ? ' portrait' : ''}">
          <div class="vfeat-media" style="aspect-ratio:${esc(mr)}">${videoCoverHTML(w, 'vfeat-cover')}</div>
          <div class="vfeat-copy">
            <span class="label">${String(i + 1).padStart(2, '0')} — ${esc(t(w.type))}</span>
            <h2 translate="no">${esc(t(w.title))}</h2>
            ${LANG === 'en' && w.titleEn ? `<p class="vfeat-titleen">${esc(w.titleEn)}</p>` : ''}
            <p class="body">${esc(t(w.intro || ''))}</p>
            <div class="chips">${(w.focus || []).map(f => `<span class="chip">${esc(t(f))}</span>`).join('')}</div>
            <div class="artist-role-block">
              <span class="label">${esc(t(UI.myRole))}</span>
              <p>${esc(t(UI.vrole))}</p>
            </div>
            <div class="links-row">${videoLinksHTML(w)}</div>
          </div>
        </article>`; }).join('')}
      </div>

      <div class="sect">
        <h3>${esc(t(UI.selectedVideos))}</h3>
        <div class="filters" id="vwFilters">
          <button data-g="all" class="on">${esc(t(UI.viewAllFilter))}</button>
          ${VIDEO_CATEGORIES.map(c => `<button data-g="${c.key}">${esc(t(c.label))}</button>`).join('')}
        </div>
        <div class="vgrid" id="vgrid">
          ${rest.map(w => `
          <article class="vcard" data-cat="${esc(w.category)}">
            <div class="vcard-media" style="aspect-ratio:${esc(w.ratio || '4/3')}">${videoCoverHTML(w, 'vcard-cover')}</div>
            <h3>${esc(t(w.title))}</h3>
            <span class="label">${esc(t(w.type))}</span>
            <div class="chips">${(w.focus || []).slice(0, 3).map(f => `<span class="chip">${esc(t(f))}</span>`).join('')}</div>
            <div class="vcard-foot">
              <span class="vcard-platform">${esc(PLATFORM_LABEL[w.platform] || w.platform)}</span>
              <span class="vcard-links">${videoLinksHTML(w, true)}</span>
            </div>
          </article>`).join('')}
        </div>
      </div>
    </div>
  </section>`;

  const btns = $$('#vwFilters button');
  btns.forEach(b => {
    b.onclick = () => {
      vwFilter = b.dataset.g;
      btns.forEach(x => x.classList.toggle('on', x === b));
      $$('#vgrid .vcard').forEach(card => {
        card.hidden = vwFilter !== 'all' && card.dataset.cat !== vwFilter;
      });
    };
  });
}


/* ==================================================================
   路由
   ================================================================== */
const ROUTES = { visual:renderVisual, music:renderArtistContent, video:renderVideoContent, creative:()=>renderPanel('creative'),
                 dance:()=>renderPanel('dance'), about:renderAbout };

function route() {
  const key = (location.hash || '#/').replace('#/', '');
  const artistSlug = key.startsWith('artist/') ? key.split('/')[1] : '';
  document.body.dataset.route = artistSlug ? 'artist' : (ROUTES[key] ? key : 'home');
  $$('[data-nav][data-key]').forEach(a => a.classList.remove('active'));
  $('#mobileMenu').classList.remove('open');
  $('#burger').classList.remove('open');
  if (artistSlug) {
    renderArtistDetail(artistSlug);
    const a = $('[data-nav][data-key="music"]');
    if (a) a.classList.add('active');
  } else if (ROUTES[key]) {
    ROUTES[key]();
    const a = $(`[data-nav][data-key="${key}"]`);
    if (a) a.classList.add('active');
  } else {
    renderHome();
  }
  scrollTo(0, 0);
}
addEventListener('hashchange', route);

/* ---------- 移动端菜单 ---------- */
$('#burger').onclick = () => {
  $('#mobileMenu').classList.toggle('open');
  $('#burger').classList.toggle('open');
};

/* ---------- 导航滚动态 ---------- */
addEventListener('scroll', () => $('#nav').classList.toggle('scrolled', scrollY > 30), { passive:true });

/* ==================================================================
   灯箱（← → 切换 / Esc 关闭 / 点击空白关闭）
   ================================================================== */
const lb = $('#lightbox'), lbImg = $('#lbImg');
let lbList = [], lbIndex = 0;

function showLb() {
  lbImg.classList.remove('zoom'); void lbImg.offsetWidth;
  lbImg.src = lbList[lbIndex];
  $('#lbCount').textContent = lbList.length > 1 ? `${lbIndex + 1} / ${lbList.length}` : '';
  [lbIndex + 1, lbIndex - 1].forEach(i => { if (lbList[i]) { const im = new Image(); im.src = lbList[i]; } });
}
function openLightbox(list, idx) {
  lbList = list; lbIndex = idx; showLb();
  $('#lbHint').textContent = t(UI.lbHint);
  lb.classList.add('open'); document.body.style.overflow = 'hidden';
}
function closeLightbox() { lb.classList.remove('open'); document.body.style.overflow = ''; }
function lbStep(d) {
  if (lbList.length < 2) return;
  lbIndex = (lbIndex + d + lbList.length) % lbList.length; showLb();
}
lb.onclick = e => { if (e.target === lb) closeLightbox(); };
$('#lbPrev').onclick = e => { e.stopPropagation(); lbStep(-1); };
$('#lbNext').onclick = e => { e.stopPropagation(); lbStep(1); };
addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowRight') lbStep(1);
  else if (e.key === 'ArrowLeft')  lbStep(-1);
});

/* ---------- 启动 ---------- */
setLang(LANG);
