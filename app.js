/* ==================================================================
   XIAOYUAN · 创作者主页 —— 渲染与路由
   依赖：data.js（SITE / UI / ENTRIES / PANELS / ABOUT）
        assets/visual/gallery.js（window.VISUAL_GALLERY，可选）
   ================================================================== */

const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const app = $('#app');
let LANG = 'en';
try { LANG = localStorage.getItem('lang') === 'zh' ? 'zh' : 'en'; } catch (_) {}

/* 图片缓存版本号。
   改了某张图的内容但文件名不变时，浏览器会一直用缓存里的旧图
   （CSS/JS 靠 index.html 的 ?v= 更新，图片没有这一层）。
   每次替换图片内容就把这个号加一，强制所有浏览器重新拉取。 */
const IMG_V = '20260915c';

// 双语取值：字符串原样返回，对象取当前语言
const t = o => !o ? '' : (typeof o === 'string' ? o : (o[LANG] || o.en || ''));
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- 语言切换 ---------- */
function setLang(l) {
  LANG = l === 'zh' ? 'zh' : 'en';
  try { localStorage.setItem('lang', LANG); } catch (_) {}
  document.documentElement.lang = LANG === 'zh' ? 'zh-CN' : 'en';
  document.body.className = 'lang-' + l;
  $('#langEn').classList.toggle('on', l === 'en');
  $('#langZh').classList.toggle('on', l === 'zh');
  fillNav();
  fillFooter();
  route();
}
$('#langEn').onclick = () => setLang('en');
$('#langZh').onclick = () => setLang('zh');

// 用 UI 文案填充所有导航（含移动端菜单）
function fillNav() { $$('[data-key]').forEach(a => a.textContent = t(UI[a.dataset.key])); }

function fillFooter() {
  const box = $('#footerLinks');
  if (!box) return;
  box.innerHTML = `
    <a href="${esc(SITE.douyin)}" target="_blank" rel="noopener">DOUYIN</a>
    <a href="${esc(SITE.xhs)}" target="_blank" rel="noopener">REDNOTE / XIAOHONGSHU</a>
    <a href="${esc(SITE.bilibili)}" target="_blank" rel="noopener">BILIBILI</a>
    <a href="mailto:${esc(SITE.email)}">EMAIL</a>`;
}

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
  const homeLabel = key => `<b>${esc((UI[key].en || '').toUpperCase())}</b><small>${esc(UI[key].zh || '')}</small>`;
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
      <span class="egg-pop egg-pop-about" aria-hidden="true"></span>
      <div class="home-map">
        <a href="#/visual">01 ${esc(t(UI.visual))}</a>
        <a href="#/music">02 ${esc(t(UI.music))}</a>
        <a href="#/planning">03 ${esc(t(UI.planning))}</a>
        <a href="#/dance">04 ${esc(t(UI.dance))}</a>
        <a href="#/about">05 ${esc(t(UI.about))}</a>
      </div>

      <a class="egg-link egg-link-planning" href="#/planning" data-home-key="planning">
        <span class="egg-label">${homeLabel('planning')}</span>
      </a>
      <a class="egg-link egg-link-music" href="#/music" data-home-key="music">
        <span class="egg-label">${homeLabel('music')}</span>
      </a>
      <a class="egg-link egg-link-visual" href="#/visual" data-home-key="visual">
        <span class="egg-label">${homeLabel('visual')}</span>
      </a>
      <a class="egg-link egg-link-dance" href="#/dance" data-home-key="dance">
        <span class="egg-label">${homeLabel('dance')}</span>
      </a>
      <a class="egg-link egg-link-about" href="#/about" data-home-key="about">
        <span class="egg-label">${homeLabel('about')}</span>
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

let eggTransitionTimers = [];
let eggTransitionRouting = false;

function cleanupEggTransition() {
  eggTransitionTimers.forEach(clearTimeout);
  eggTransitionTimers = [];
  const overlay = $('.egg-transition-overlay');
  if (overlay) overlay.remove();
  document.body.classList.remove('egg-transitioning');
}

function runEggClickTransition(targetHref, sourceEgg) {
  cleanupEggTransition();
  const rect = sourceEgg.getBoundingClientRect();
  const overlay = document.createElement('div');
  overlay.className = 'egg-transition-overlay is-select';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.setProperty('--egg-start-x', `${rect.left}px`);
  overlay.style.setProperty('--egg-start-y', `${rect.top}px`);
  overlay.style.setProperty('--egg-start-w', `${rect.width}px`);
  overlay.style.setProperty('--egg-start-h', `${rect.height}px`);
  overlay.innerHTML = `
    <div class="egg-transition-scene">
      <img class="egg-transition-asset egg-transition-whole" src="assets/egg-transition/egg.png" alt="">
      <img class="egg-transition-asset egg-transition-cracked" src="assets/egg-transition/cracked-egg.png" alt="">
    </div>`;
  document.body.appendChild(overlay);
  document.body.classList.add('egg-transitioning');

  const stage = (name, delay) => eggTransitionTimers.push(setTimeout(() => {
    overlay.className = `egg-transition-overlay is-${name}`;
  }, delay));
  stage('lift', 120);
  stage('crack', 600);
  eggTransitionTimers.push(setTimeout(() => {
    eggTransitionRouting = true;
    overlay.className = 'egg-transition-overlay is-open';
    location.hash = targetHref;
  }, 1180));
  eggTransitionTimers.push(setTimeout(() => {
    cleanupEggTransition();
    eggTransitionRouting = false;
  }, 1760));
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
      runEggClickTransition(egg.getAttribute('href'), egg.querySelector('.artist-egg-image'));
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

function artistProgressionHTML(items, horizontal=false) {
  if (!items || !items.length) return '';
  return `<div class="artist-progression">
    ${items.map((item, i) => `
      ${i ? `<span class="artist-progress-arrow">${horizontal ? '→' : '↓'}</span>` : ''}
      <div>
        <b>${esc(t(item.h))}</b>
        <small>${esc(t(item.b))}</small>
      </div>`).join('')}
  </div>`;
}

function artistSwitchHTML(activeSlug) {
  return `
  <nav class="artist-switch" aria-label="Artist case navigation">
    ${ARTISTS.map(a => `
      <a class="${a.slug === activeSlug ? 'current' : ''}" href="#/artist/${esc(a.slug)}" aria-current="${a.slug === activeSlug ? 'page' : 'false'}">
        <span>${a.slug === activeSlug ? '🍳' : '🥚'}</span>
        <b>${esc(a.number)}</b>
        <small translate="no">${esc(artistName(a))}</small>
      </a>`).join('')}
  </nav>`;
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
          <span class="label">${String(i + 1).padStart(2, '0')}${filled(t(w.tag || '')) ? ` / ${esc(t(w.tag))}` : ''}</span>
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
  <article class="artist-case-page structured-artist artist-${esc(a.slug)}">
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
          ${artistProgressionHTML(a.context.progression, a.slug === 'artist-02')}
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
      ${artistSwitchHTML(a.slug)}
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
        <div class="artist-omelette" aria-hidden="true">
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
      ${artistSwitchHTML(a.slug)}
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
   Visual —— VIDEO / PHOTO：Portrait / Daily
   ================================================================== */
let vgFilter = 'all';

function vgItems() {
  const vg = window.VISUAL_GALLERY;
  if (!vg) return [];
  const a = vg.portrait.map(x => ({ ...x }));
  const b = vg.landscape.map(x => ({ ...x }));
  if (vgFilter === 'portrait')  return a;
  if (vgFilter === 'daily') return b;
  const out = [];
  let i = 0, j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length) out.push(a[i++]);
    if (j < b.length) out.push(b[j++]);
  }
  return out;
}

function visualChooserHTML() {
  return `<div class="visual-chooser" aria-label="Choose a visual discipline">
    <a class="visual-choice visual-choice-video" href="#/visual/video"><span class="visual-choice-object" aria-hidden="true">▰</span><span class="label">VIDEO</span><strong>Video</strong><small>Selected Works</small></a>
    <a class="visual-choice visual-choice-photo" href="#/visual/photo"><span class="visual-choice-object" aria-hidden="true">◉</span><span class="label">PHOTOGRAPHY</span><strong>Photography</strong><small>Portrait / Daily</small></a>
  </div>`;
}

function renderVisual(mode='chooser') {
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
      ${mode === 'chooser' ? visualChooserHTML() : ''}
      ${mode === 'video' ? videoWorksSectionHTML() : ''}

      <div class="sect archive" ${mode === 'photo' ? '' : 'hidden'}>
        <h3>${esc(t(UI.photo))}</h3>
        <p class="body">${esc(t(UI.archiveNote))}</p>
        <div class="filters" id="vgFilters">
          <button data-g="all">${esc(t(UI.allPhotos))} · ${nP + nL}</button>
          <button data-g="portrait">${esc(t(UI.portraits))} · ${nP}</button>
          <button data-g="daily">${esc(t(UI.daily))} · ${nL}</button>
        </div>
        <div class="masonry" id="masonry"></div>
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
  bindVideoFilters(app);
  bindTypographyReveal(app);
}

let vgIO = null;
function renderMasonry() {
  const box = $('#masonry');
  if (!box) return;
  const slot = $('#videoSlot');
  const items = vgItems();

  box.hidden = false;

  box.innerHTML = items.map((g, i) => {
    // 按原始比例显示：只给宽度、高度自适应，不做裁切填充
    // srcset 让高清屏自动取更清晰的一张，普通屏仍用小的，不拖慢加载
    const scale = 1000 / Math.max(g.w, g.h);
    const tw = Math.max(1, Math.round(g.w * scale));
    return `
    <figure class="mitem" role="button" tabindex="0" aria-label="${esc(t(UI.openPhoto))} ${i + 1}" data-i="${i}" style="aspect-ratio:${g.w}/${g.h};transition-delay:${Math.min(i % 8, 7) * 60}ms">
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
    el.onkeydown = e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
    };
  });
}

/* ==================================================================
   Music / Creative / Dance —— 意向页
   ================================================================== */
function renderCreative() {
  const zh = LANG === 'zh';
  const txt = (cn, en) => zh ? cn : en;
  const img = (name, alt, style = '') => `<img src="assets/creative/${name}?v=${IMG_V}" alt="${esc(alt)}" loading="lazy" decoding="async"${style ? ` style="${style}"` : ''} onerror="var f=this.closest('figure');if(f){f.hidden=true}else{this.style.display='none'}">`;

  /* 统一格式的四个积木：头部 / 元信息栏 / 区块 / 图版 / 图片带 */
  const caseHead = (num, label, title, tag, lede, quote = '') => `<header class="cc-head" data-reveal>
      <div class="cc-head-meta"><span class="cc-num">${num}</span><span class="label">${label}</span><span class="cc-tag">${tag}</span></div>
      <h2 class="cc-title">${title}</h2>
      <p class="cc-lede">${lede}</p>
      ${quote ? `<p class="cc-quote">${quote}</p>` : ''}
    </header>`;
  const facts = rows => `<dl class="cc-facts" data-reveal>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
  const block = (num, label, body) => `<section class="cc-block" data-reveal>
      <div class="cc-block-head"><span class="cc-block-num">${num}</span><span class="label">${label}</span></div>
      <div class="cc-block-body">${body}</div>
    </section>`;
  const paper = (name, caption, cls = '', attrs = '') => `<figure class="cc-paper ${cls}"${attrs}>${img(name, caption)}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
  const rail = files => `<div class="cc-rail">${files.map(f => `<figure class="cc-rail-item">${img(f, '')}</figure>`).join('')}</div>`;
  const steps = list => `<div class="cc-steps">${list.map((s, i) => `${i ? '<i>→</i>' : ''}<span>${s}</span>`).join('')}</div>`;

  /* Case 04：小号内容策划。逻辑：为什么做小号 → 小号是什么 → 拍什么 → 原策划案证据 → 我的职责 */
  const sidePillars = [
    ['WORK', '主理人日常', ['主理人到公司第一件事', '一天如何排时间']],
    ['MUSIC', '音乐人幕后', ['一句歌录 20 遍的原因', '嗓子不舒服怎么护嗓']],
    ['PEOPLE', '新人培养与真实关系', ['看新人 demo 怎么提意见', '新人镜头表现指导']],
    ['OFF DUTY', '团队与长沙生活', ['长沙工作间隙吃什么', '团队谁最可能迟到']]
  ];
  const sideDocNote = '策划案原稿 — 小号整体定位 / 栏目设置 / 单条视频结构 / 数据复盘与 30 天目标';

  /* Case 05：脚本作品。顺序即两栏的阅读顺序，高度由图片自身比例决定 */
  const shootingScripts = [
    ['shooting-script-drink.png', '康师傅冰红茶 · 主题曲推广分镜'],
    ['shooting-script-dv.png', '脉动 · DV 随拍分镜'],
    ['shooting-script-game.png', '和平精英 · 变装短视频脚本'],
    ['shooting-script-auto.png', '汽车音乐推广 · 分镜脚本']
  ];

  app.innerHTML = `<section class="block panel creative-page"><div class="wrap fade-in"><div class="panel-head"><span class="label">03 — ${txt('策划','CREATIVE')}</span><h1 class="display">${txt('把想法变成结构、节奏和可以被看见的现场。','Turning ideas into structure, rhythm and visible evidence.')}</h1></div><div class="creative-index"><span class="label">SELECTED PROJECTS</span><p>${txt('每个案例都把原始策划、规则系统和现场记录放在同一条叙事里：文字解释为什么这样设计，图片只在能够证明现场的地方出现。','Every case connects source planning, systems and on-site records: text explains the decision; images appear only where they verify the work.')}</p></div>

  <article class="cc" data-reveal>
    ${caseHead('01', 'CREATIVE PROJECT', '艺人动员会<br>策划及执行', 'ARTIST KICK-OFF',
      '面向公司新招募艺人的破冰与动员活动。通过互动游戏、才艺展示与自由交流，让刚加入的艺人快速认识彼此、熟悉团队，在轻松的氛围中建立连接。')}
    ${facts([['ROLE', '活动策划 / 流程设计 / 游戏与互动环节设计 / 现场组织与执行'], ['TARGET', '公司新招募艺人'], ['FORMAT', '互动游戏 · 才艺展示 · 自由交流']])}
    ${block('01', 'LIVE MOMENTS / 现场记录', rail(['artist-kickoff-4099.jpg', 'artist-kickoff-1062.png', 'artist-kickoff-4094.jpg', 'artist-kickoff-1064.png', 'artist-kickoff-4100.jpg']))}
    ${block('02', 'SOURCE DOCUMENT / 策划原稿', paper('artist-kickoff-plan.png', '3月1日艺人动员会企划及执行方案', 'cc-paper-soft'))}
  </article>

  <article class="cc" data-reveal>
    ${caseHead('02', 'CREATIVE PROJECT', '青春江大，声耀未来<br>十佳歌手策划', 'CAMPUS SINGING COMPETITION',
      '江汉大学音乐学院“青春江大，声耀未来”十佳歌手活动，面向江汉大学全体学生开展，通过海选、复赛与决赛三个阶段完成赛事选拔与舞台呈现。')}
    ${facts([['ORGANISER', '江汉大学音乐学院'], ['STAGES', '海选 / 复赛 / 决赛'], ['YEAR', '2023'], ['ROLE', '赛事策划 / 流程设计 / 现场执行']])}
    ${block('01', 'RULES &amp; FLOW / 赛事流程', paper('voice-of-youth-process-map.png', '十佳歌手原始赛事流程图', 'cc-paper-tall'))}
    ${block('02', 'LIVE MOMENTS / 现场记录', rail(['voice-youth-1072.jpg', 'voice-youth-1073.jpg', 'voice-youth-1074.jpg', 'voice-youth-1075.jpg', 'voice-youth-1076.jpg']))}
    ${block('03', 'SOURCE DOCUMENT / 策划原稿', paper('voice-youth-plan.png', '青春江大声耀未来十佳歌手策划案原稿', 'cc-paper-soft'))}
  </article>

  <article class="cc" data-reveal>
    ${caseHead('03', 'CREATIVE PROJECT', '湖畔电影院', 'CAMPUS CINEMA PROJECT',
      '疫情封校期间，校园娱乐活动受限。我们尝试把学院的小音乐厅变成一间临时电影院，通过免费的电影放映，为同学提供一个可以走出宿舍、一起看电影的去处。',
      '把音乐厅，暂时变成电影院。')}
    ${facts([['DATE', '2022.11.18 — 2022.11.20'], ['VENUE', '学院小音乐厅'], ['FORMAT', '免费电影放映'], ['ROLE', '活动整体策划 · 放映内容与流程设计 · 宣传内容策划 · 现场组织与执行 · 活动复盘']])}
    ${block('01', 'PROJECT IDEA / 项目构思', `<ol class="cc-list">${['校园公共文化空间', '免费电影放映', '轻松、低门槛的线下文化活动'].map(x => `<li>${x}</li>`).join('')}</ol>`)}
    ${block('02', 'THE EXPERIENCE / 现场流程', steps(['影片预告', '现场签到 / 入场', '电影放映', '观影交流', '活动回顾']))}
    ${block('03', 'LIVE MOMENTS / 现场记录', rail(['lakeside-1066.jpg', 'lakeside-1067.jpg', 'lakeside-1077.jpg']))}
    ${block('04', 'SOURCE DOCUMENT / 策划原稿', paper('lakeside-plan.png', '江汉大学湖畔电影院活动策划案', 'cc-paper-soft'))}
    ${block('05', 'FROM THE ARCHIVE / 公众号记录', `<div class="creative-lakeside-archive-grid cc-archive"><figure><span class="label">BEFORE / 活动发布</span>${img('lakeside-opening.jpg', '湖畔电影院开映记录', 'object-position:50% 19%')}</figure><figure><span class="label">AFTER / 活动回顾</span>${img('lakeside-recap.jpg', '湖畔电影院活动回顾', 'object-position:50% 11%')}</figure></div><figure class="cc-ticket">${img('lakeside-ticket.jpg', '湖畔电影院真实电影票')}<figcaption>MOVIE TICKET / 真实电影票</figcaption></figure>`)}
  </article>

  <article class="cc" data-reveal>
    ${caseHead('04', 'CONTENT PROPOSAL · NOT IMPLEMENTED', '大表哥Sophie｜小号内容策划', 'ARTIST SIDE ACCOUNT STRATEGY',
      '大号负责音乐作品与歌手身份，小号则补充作品之外的人。')}
    ${block('01', 'CORE POSITIONING / 核心定位', `<p class="cc-quote">身份反差 × 幕后真实 × 人物关系</p><p class="cc-lede">从身边人的视角，记录一个歌手兼音乐公司主理人的幕后日常。</p>`)}
    ${block('02', 'CONTENT PILLARS / 内容方向', `<div class="cc-pillars">${sidePillars.map(([key, cat, items]) => `<section><span class="cc-pillar-key">${key}</span><p class="cc-pillar-cat">${cat}</p><ul>${items.map(x => `<li>${x}</li>`).join('')}</ul></section>`).join('')}</div>`)}
    ${block('03', 'ORIGINAL PLANNING DOCUMENT / 策划原稿', `<div class="cc-doc-full">${paper('side-account-plan-full.png', sideDocNote, 'cc-paper-soft cc-paper-wide')}</div>`)}
    ${block('04', 'MY ROLE / 我的职责', `<p class="cc-role">账号定位 · 内容方向 · 选题策划 · 拍摄思路</p>`)}
  </article>

  <article class="cc" data-reveal>
    ${caseHead('05', 'CREATIVE PRODUCTION', '拍摄脚本', 'SHOOTING SCRIPT / SHOT LIST',
      '品牌推广与达人内容的短视频分镜脚本：逐镜标注景别、画面内容、时长，以及音乐、花字与拍摄备注。')}
    ${block('01', 'SHOOTING SCRIPTS / 分镜脚本', `<div class="cc-scripts">${shootingScripts.map(([f, alt]) => `<figure class="cc-paper cc-paper-soft">${img(f, alt)}</figure>`).join('')}</div>`)}
  </article>

  <div class="panel-nav">${navSiblings('planning')}</div></div></section>`;

  bindCreativeMotion();
}

/* Creative 页面：进入视口时逐块浮起，同一案例内轻微错峰 */
let ccIO = null;
function bindCreativeMotion() {
  const items = [...app.querySelectorAll('.creative-page [data-reveal]')];
  if (!items.length) return;
  if (ccIO) { ccIO.disconnect(); ccIO = null; }
  const seen = new Map();
  items.forEach(el => {
    const key = el.closest('.cc') || el.parentElement;
    const n = seen.get(key) || 0;
    seen.set(key, n + 1);
    el.style.setProperty('--d', Math.min(n, 3) * 80 + 'ms');
  });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-in'));
    return;
  }
  ccIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    ccIO.unobserve(e.target);
  }), { rootMargin: '0px 0px -8%' });
  items.forEach(el => ccIO.observe(el));
}

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
const ABOUT_ARCHIVE_PHOTOS = ['44E8E532-2FAC-4F2A-956C-7B471E6BC813_1_105_c.jpeg','F4499102-E1C3-43E3-897C-A08BB7A1F669_1_105_c.jpeg','BF42C879-0122-41CF-8B2D-328D0E361821_1_105_c.jpeg','IMG_3731.JPG','7EDA0A8B-745B-440C-8A04-126BE163ED14_1_105_c.jpeg','A2A13BA7-613E-4C33-9377-6C47FEF03C4A_1_105_c.jpeg','52ED9595-CC9E-4C55-99A7-FF7D50AFECF3_1_105_c.jpeg','35FF8B9E-A01B-44DF-A918-7FBA3480A529_1_105_c.jpeg','C9344C20-D263-4010-978A-B14075CFB69C_1_105_c.jpeg','D47124B2-7BA8-4B66-8C24-D0C669551C42_1_105_c.jpeg','6C995405-9596-4A1F-8D0B-F2DC5E1BC460_1_105_c.jpeg','2E5332C2-658A-4ECC-96AA-3511A434B5_1_105_c.jpeg','BD6F1562-B34F-4A1A-9DAA-FDFEA6FC0D7F_1_105_c.jpeg','5D52E89C-8998-4DE1-86C3-6CB8E8C8865A_1_105_c.jpeg','CC260E8F-4AC2-4911-BBB6-A39C904A4563_1_105_c.jpeg','IMG_4980.JPG','1E47B0C6-FE08-4B69-9788-DADD33B133A2_1_105_c.jpeg','8EE3AD6D-2F61-48EC-9B3B-413F71306BE5_1_105_c.jpeg','01C7D311-D2D1-4EBF-B6C1-4934F7412941_1_105_c.jpeg','93E0DE17-2F5E-42B2-97AF-ECC48F618B12_1_105_c.jpeg','15D22047-E10B-40C5-B158-4FAD48E40843_1_105_c.jpeg','EF93E9E1-5865-4FE7-9575-8B3CEFD88588_1_105_c.jpeg','7ED59D9C-4019-42C1-9EFE-AB456AAFF38F_1_105_c.jpeg','B1AE14F8-61E0-4319-B956-6C753382B8DA_1_105_c.jpeg','98923917-D3E9-4C65-A406-5E5D1038EF07_1_105_c.jpeg','709FE414-DAC5-438F-AA66-A29AE2F7FD77_1_105_c.jpeg','31D0999E-2851-4F38-8FC8-18DCB435735C_1_105_c.jpeg','DB5C7310-1B40-457A-9B45-38DD4858662A_1_105_c.jpeg','6DD2EFD8-2272-454B-A141-9597FFBC3DBA_1_105_c.jpeg','ADFD46A5-98E0-415D-8FEB-2385378A27B4_1_105_c.jpeg','IMG_4900.JPG'];
function renderAbout() {
  const hasPortrait = filled(SITE.portrait);
  const randomPhotos = ABOUT_ARCHIVE_PHOTOS.slice(0,12);
  app.innerHTML = `
  <section class="block panel">
    <div class="wrap">
      <div class="about-grid ${hasPortrait ? '' : 'no-portrait'}">
        ${hasPortrait ? `<div>
          <div class="about-portrait">
            <img src="${esc(SITE.portrait)}" alt="">
          </div>
        </div>` : ''}
        <div class="about-text">
          <a class="about-home-link" href="#/">← BACK TO HOME</a><nav class="about-subnav" aria-label="About sections"><a class="active" href="#/about">ABOUT / MAIN</a><a href="#/about/archive">MY ARCHIVE</a></nav>
          <span class="label">${esc(t(UI.about))}</span>
          <h1 class="display">ABOUT XIAOYUAN</h1>
          <div class="about-editorial-intro"><p class="about-lead">我的很多选择，好像都从音乐开始，又慢慢走向了更远的地方。</p><p>大学学的是声乐表演，但音乐从来不是我生活里唯一的表达方式。舞蹈、影像、内容创作，也在不同阶段进入了我的生活。</p><p>我唱歌，也跳舞；参加比赛、组织团队，也拿起相机记录生活。后来进入音乐人项目工作，我开始参与内容策划、拍摄、剪辑和项目执行，也第一次更具体地看到，一个想法是怎样一点点变成真正被人看到的东西。</p><p>回头看，这些经历并没有把我带向完全不同的方向。相反，它们让我越来越清楚自己喜欢什么——</p><p class="about-pullquote">观察人，理解作品，把一个模糊的想法慢慢变成真实存在的东西。</p><p>我还在继续学习，也在尝试新的事情。比起急着给自己一个确定的标签，我更期待看看，这些经历还会把我带到哪里。</p></div>

          <section class="about-random sect" id="aboutRandom" aria-labelledby="randomPhotoTitle">
            <div class="random-photo-head"><div><span class="label">RANDOM MOMENTS</span><h2 id="randomPhotoTitle">作品之外，我大概是这样的。</h2><p class="random-photo-subtitle">这里没有什么需要被证明的东西。只是一些我喜欢留下来的瞬间。</p></div><button class="random-photo-button" type="button" id="randomPhotoButton">RANDOM / STOP</button></div>
            <div class="random-photo-window" id="randomPhotoWindow"><div class="random-photo-track" id="randomPhotoTrack">${[...randomPhotos, ...randomPhotos].map((file,i)=>`<img src="assets/dance/about/${file}" alt="" loading="${i < 5 ? 'eager' : 'lazy'}" decoding="async">`).join('')}</div></div>
            <div class="random-photo-footer"><p class="random-photo-note" id="randomPhotoNote">click and let it land.</p><div class="random-photo-links" id="randomPhotoLinks" hidden><button type="button" id="randomPhotoAgain">AGAIN ↻</button><a href="#/about/archive">VIEW MY ARCHIVE →</a></div></div>
          </section>

          <section class="about-path sect"><span class="label">MY PATH</span><p class="path-note">我没有沿着一条笔直的路线走到这里。<br>但每一段经历，都留下了一点现在的我。</p><div class="about-path-steps"><span>VOCAL PERFORMANCE</span><i>↓</i><span>DANCE &amp; VISUAL</span><i>↓</i><span>ARTIST CONTENT</span><i>↓</i><span>MUSIC &amp; CREATIVE</span></div></section>
          <section class="about-currently sect"><span class="label">CURRENTLY</span><h2>现在，我正在寻找音乐行业里的下一站。</h2><div class="links-row"><a class="btn" href="#/visual">VIEW MY WORK →</a><a class="btn ghost" href="${esc(SITE.resume)}" target="_blank" rel="noopener">RESUME ↗</a></div><section class="about-contact" aria-labelledby="aboutContactTitle"><span class="label" id="aboutContactTitle">CONTACT</span><dl><div><dt>EMAIL</dt><dd><a href="mailto:2952919277@qq.com">2952919277@qq.com</a></dd></div><div><dt>PHONE</dt><dd><a href="tel:13873508277">13873508277</a></dd></div><div><dt>WECHAT</dt><dd>13873508277</dd></div></dl></section></section>

        </div>
      </div>
    </div>
  </section>`;
  bindRandomPhoto(randomPhotos.length);
}

function renderAboutArchive() {
  app.innerHTML = `<section class="block panel"><div class="wrap"><div class="about-archive-page"><nav class="about-subnav" aria-label="About sections"><a href="#/about">ABOUT / MAIN</a><a class="active" href="#/about/archive">MY ARCHIVE</a></nav><button class="archive-back" type="button" id="archiveBack">← BACK TO ABOUT</button><span class="label">MY ARCHIVE</span><h1 class="display">Some ordinary days.</h1><p class="archive-intro">friends. places I've been. things I wanted to remember.</p><div class="about-archive-grid">${ABOUT_ARCHIVE_PHOTOS.map((file,i)=>`<button class="about-archive-photo" type="button" data-archive-index="${i}"><img src="assets/dance/about/${file}" alt="" loading="lazy" decoding="async"></button>`).join('')}</div></div></div></section>`;
  $('#archiveBack').onclick = () => { location.hash = '#/about'; };
  app.querySelectorAll('[data-archive-index]').forEach(photo => { photo.onclick = () => openLightbox(ABOUT_ARCHIVE_PHOTOS.map(file => `assets/dance/about/${file}`), Number(photo.dataset.archiveIndex), true); });
}

function bindRandomPhoto(count) {
  const windowEl = $('#randomPhotoWindow'), track = $('#randomPhotoTrack'), button = $('#randomPhotoButton'), note = $('#randomPhotoNote');
  if (!windowEl || !track) return;
  const links = $('#randomPhotoLinks'), again = $('#randomPhotoAgain');
  let offset = 0, velocity = .65, running = true, frame, lastIndex = -1;
  const clearPicked = () => [...track.children].forEach(item => item.classList.remove('random-picked','random-dim'));
  const tick = () => { if (!running) return; offset -= velocity; track.style.transform = `translate3d(${offset}px,0,0)`; if (Math.abs(offset) > track.scrollWidth / 2) offset += track.scrollWidth / 2; frame = requestAnimationFrame(tick); };
  const stopOnRandom = () => {
    cancelAnimationFrame(frame); running = false; button.disabled = true; note.textContent = 'letting it land…';
    const items = [...track.children]; let index = Math.floor(Math.random() * count); if (count > 1 && index === lastIndex) index = (index + 1) % count; lastIndex = index; const item = items[index + count];
    const target = windowEl.clientWidth / 2 - (item.offsetLeft + item.offsetWidth / 2);
    track.style.transition = 'transform 2.8s cubic-bezier(.12,.72,.18,1)'; track.style.transform = `translate3d(${target}px,0,0)`;
    setTimeout(() => { offset = target; clearPicked(); item.classList.add('random-picked'); items.forEach(other => { if (other !== item) other.classList.add('random-dim'); }); note.textContent = `${String(index + 1).padStart(2,'0')} / a random moment`; links.hidden = false; button.disabled = false; }, 2900);
  };
  const restart = () => { clearPicked(); links.hidden = true; track.style.transition='none'; track.style.transform=`translate3d(${offset}px,0,0)`; running=true; note.textContent='click and let it land.'; frame=requestAnimationFrame(tick); };
  button.onclick = () => { if (running) stopOnRandom(); else restart(); };
  windowEl.onclick = () => { if (running) stopOnRandom(); };
  again.onclick = restart;
  frame = requestAnimationFrame(tick);
}

/* ==================================================================
   Video —— VISUAL 内的个人影像 Selected Works
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

function videoWorksSectionHTML() {
  const featured = VIDEO_WORKS.filter(w => w.featured);
  const rest = VIDEO_WORKS.filter(w => !w.featured);
  return `
      <div class="sect video-page visual-video">
        <h3>VIDEO</h3>
      <div class="video-pipeline" aria-label="Idea, Planning, Shooting, Editing, Final cut">
        <span class="label">IDEA</span><span class="video-pipe-arrow">→</span>
        <span class="label">PLANNING</span><span class="video-pipe-arrow">→</span>
        <span class="label">SHOOTING</span><span class="video-pipe-arrow">→</span>
        <span class="label">EDITING</span><span class="video-pipe-arrow">→</span>
        <span class="label">FINAL CUT</span>
      </div>

      <div class="filters" id="vwFilters">
        <button data-g="all" class="on">${esc(t(UI.viewAllFilter))}</button>
        ${VIDEO_CATEGORIES.map(c => `<button data-g="${c.key}">${esc(t(c.label))}</button>`).join('')}
      </div>
      <div class="video-featured-sect">
        <h4 class="subhead">${esc(t(UI.selectedVideos))}</h4>
        ${featured.map((w, i) => {
          const mr = w.mediaRatio || '16/9';
          const [mw, mh] = mr.split('/').map(Number);
          const portrait = mh > mw;
          return `
        <article class="vfeat ${i % 2 ? 'flip' : ''}${portrait ? ' portrait' : ''}" data-cat="${esc(w.category)}">
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

      <div class="video-selected-sect">
        <div class="vgrid" id="vgrid">
          ${rest.map((w, i) => {
            const ratio = w.ratio || '4/3';
            const [rw, rh] = ratio.split('/').map(Number);
            const portrait = rh > rw;
            return `
          <article class="vcard ${i % 2 ? 'flip' : ''}${portrait ? ' portrait' : ''}" data-cat="${esc(w.category)}">
            <div class="vcard-media" style="aspect-ratio:${esc(ratio)}">${videoCoverHTML(w, 'vcard-cover')}</div>
            <div class="vcard-copy">
              <span class="label">${String(i + 1).padStart(2, '0')} — ${esc(t(w.type))}</span>
              <h3>${esc(t(w.title))}</h3>
              ${LANG === 'en' && w.titleEn ? `<p class="vfeat-titleen">${esc(w.titleEn)}</p>` : ''}
              ${filled(t(w.intro || '')) ? `<p class="body">${esc(t(w.intro))}</p>` : ''}
              <div class="chips">${(w.focus || []).map(f => `<span class="chip">${esc(t(f))}</span>`).join('')}</div>
              <div class="artist-role-block">
                <span class="label">${esc(t(UI.myRole))}</span>
                <p>${esc(t(UI.vrole))}</p>
              </div>
              <div class="vcard-foot">
                <span class="vcard-platform">${esc(PLATFORM_LABEL[w.platform] || w.platform)}</span>
                <span class="vcard-links">${videoLinksHTML(w, true)}</span>
              </div>
            </div>
          </article>`; }).join('')}
        </div>
      </div>
      <section class="video-more reveal" aria-labelledby="videoMoreTitle">
        <span class="label">SEE MORE / SOCIAL</span>
        <h2 id="videoMoreTitle">${LANG === 'zh' ? '想看更多？去我的社交媒体看看。' : 'WANT TO SEE MORE?'}</h2>
        <p class="body">${LANG === 'zh' ? '更多作品，可以在这里找到我。' : 'More work lives on my social channels.'}</p>
        <div class="video-social-cards">
          <a href="${esc(SITE.douyin)}" target="_blank" rel="noopener">DOUYIN <span>↗</span></a>
          <a href="${esc(SITE.xhs)}" target="_blank" rel="noopener">REDNOTE <span>↗</span></a>
          <a href="${esc(SITE.bilibili)}" target="_blank" rel="noopener">BILIBILI <span>↗</span></a>
          <a href="mailto:${esc(SITE.email)}">EMAIL <span>↗</span></a>
        </div>
      </section>
      </div>`;
}

let typoIO = null;
function bindTypographyReveal(scope=document) {
  const items = [...scope.querySelectorAll('.display, .panel-head .label, .sect > h3, .sect > .body, .video-more, .vcard, .vfeat, .artist-story-section')];
  items.forEach((el,i) => { el.classList.add('reveal'); el.style.setProperty('--reveal-delay', `${Math.min(i,8)*55}ms`); });
  if (typoIO) typoIO.disconnect();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { items.forEach(el=>el.classList.add('revealed')); return; }
  typoIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); typoIO.unobserve(e.target); } }), {rootMargin:'0px 0px -8%'});
  items.forEach(el=>typoIO.observe(el));
}

function bindVideoFilters(scope) {
  const btns = [...scope.querySelectorAll('#vwFilters button')];
  const cards = [...scope.querySelectorAll('.video-page article[data-cat]')];
  const sections = [...scope.querySelectorAll('.video-featured-sect, .video-selected-sect')];
  vwFilter = 'all';
  btns.forEach(b => {
    b.setAttribute('aria-pressed', String(b.dataset.g === vwFilter));
    b.onclick = () => {
      vwFilter = b.dataset.g;
      btns.forEach(x => {
        x.classList.toggle('on', x === b);
        x.setAttribute('aria-pressed', String(x === b));
      });
      cards.forEach(card => {
        card.hidden = vwFilter !== 'all' && card.dataset.cat !== vwFilter;
        if (card.hidden) card.querySelectorAll('video').forEach(video => video.pause());
      });
      sections.forEach(section => {
        section.hidden = ![...section.querySelectorAll('article[data-cat]')].some(card => !card.hidden);
      });
    };
  });
}

/* Dance — selected performances, team projects and practice. */
function renderDance() {
  const copy = (zh, en) => LANG === 'zh' ? zh : en;
  const photo = (name, alt, extra = '') => `<img src="assets/dance/web/${name}.jpg" alt="${esc(alt)}" ${extra || 'loading="lazy" decoding="async"'}>`;
  const external = (url, label, cls = '') => `<a class="dance-out ${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span></a>`;
  const jiuzi = 'https://v.douyin.com/CkQWfdUoKEw/';
  const heading = (n, title, subtitle) => `<header class="dance-section-head"><span class="dance-index">${n} /</span><div><h2>${title}</h2><p>${subtitle}</p></div></header>`;
  /* 线上播放的是 assets/dance/web/ 下的 H.264 压缩版（原片体积过大，无法上线）。
     原片仍在 assets/dance/ 根目录，已被 .gitignore 排除。 */
  const solos = [
    { title:'KOONG', poster:'koong', file:'web/koong.mp4', tag:'LIVE / PERFORMANCE', size:'42 MB' },
    { title:'we don’t stop', poster:'we-dont-stop', file:'web/we-dont-stop.mp4', tag:'LIVE / PERFORMANCE', size:'56 MB' },
    { title:'unique', poster:'unique', file:'web/unique.mp4', tag:'LIVE / PERFORMANCE', size:'13 MB' },
    { title:'iconic by mistake', poster:'iconic', file:'web/iconic.mp4', tag:'OUTDOOR / PRACTICE', size:'2.5 MB' },
    { title:'bad', poster:'bad', file:'web/bad.mp4', tag:'OUTDOOR / PRACTICE', size:'4.7 MB' },
    { title:'she will', poster:'she-will', file:'web/she-will.mp4', tag:'STUDIO / PRACTICE', size:'6.2 MB' },
    { title:'wicked', poster:'wicked', file:'web/wicked.mp4', tag:'STUDIO / PRACTICE', size:'4.1 MB' },
    { title:'itis', poster:'itis', file:'web/itis.mp4', tag:'STUDIO / PRACTICE', size:'4.5 MB', orientation:'landscape', ratio:'4/3' },
    { title:'meow', poster:'meow', file:'web/meow.mp4', tag:'STUDIO / PRACTICE', size:'3.4 MB', orientation:'landscape', ratio:'4/3' },
    { title:'stay in', poster:'stay-in', file:'web/stay-in.mp4', tag:'STUDIO / PRACTICE', size:'4.4 MB', orientation:'landscape', ratio:'16/9' },
    { title:'slow motion', poster:'slow-motion', file:'web/slow-motion.mp4', tag:'STUDIO / PRACTICE', size:'4.3 MB', orientation:'landscape', ratio:'4/3' },
    { title:'NOKIA', poster:'nokia', file:'web/nokia.mp4', tag:'STUDIO / PRACTICE', size:'5.2 MB', orientation:'landscape', ratio:'16/9' },
  ];
  const awards = [
    ['2026', [copy('搜狐关注流舞蹈大赛冠军','Champion · Sohu Follow Feed Dance Competition'),copy('武汉 OPPO 翻跳大赛冠军','Champion · Wuhan OPPO Cover Dance Competition')]],
    ['2025', [copy('搜狐视频舞蹈翻跳大赛长沙赛区冠军','Champion · Sohu Video Cover Dance Competition, Changsha'),copy('武汉 OPPO 翻跳大赛亚军','Runner-up · Wuhan OPPO Cover Dance Competition'),copy('华中地区 KPOP 翻跳大赛冠军','Champion · Central China KPOP Cover Dance Competition'),copy('考入 RGM 舞队','Selected for RGM dance crew'),copy('受邀参加搜狐舞蹈盛典','Invited to the Sohu Dance Festival'),copy('芒果招商会伴舞，与何炅、汪涵、沈梦辰、齐思钧、谭薇、张雅琪等同台演出','Backup dancer at the Mango TV showcase, appearing on stage with He Jiong, Wang Han, Shen Mengchen, Qi Sijun, Tan Wei, Zhang Yaqi and others')]],
    ['2024', [copy('搜狐 KPOP 舞蹈视频翻跳大赛武汉赛区季军','Third place · Sohu KPOP Cover Dance Competition, Wuhan'),copy('受邀参加搜狐舞蹈盛典','Invited to the Sohu Dance Festival')]],
    ['2023', [copy('考入 Level Up 大学生联队 UP NOW','Selected for UP NOW, the Level Up university dance crew'),copy('武汉 Omolet’s KPOP 翻跳大赛冠军','Champion · Wuhan Omolet’s KPOP Cover Dance Competition'),copy('武汉舞征高校齐舞大赛冠军','Champion · Wuhan Wuzheng University Group Dance Competition'),copy('武汉舞动青春大学生齐舞挑战赛第四名','Fourth place · Wuhan Wudong Qingchun University Group Dance Challenge')]],
  ];
  app.innerHTML = `<article class="dance-page">
    <header class="dance-hero">
      <div class="dance-hero-copy"><p class="dance-eyebrow">04 / MOVEMENT NOTES</p><h1>DANCE</h1><p class="dance-disciplines">KPOP · HIPHOP · JAZZ · PERFORMANCE · TEACHING</p>
        <p class="dance-hero-note">${copy('从练习室，到舞台。','From the studio,<br>to the stage.')}</p>
        <div class="dance-credentials"><span>SOHU DANCE FESTIVAL 2024 / 2025</span><span>MANGO TV STAGE</span><span>MULTIPLE COMPETITION WINS</span></div>
      </div>
      <figure class="dance-hero-photo">${photo('hero',copy('红衣个人舞台照片','Solo stage portrait in red'),'fetchpriority="high" decoding="async"')}<figcaption>ON STAGE / 2025</figcaption></figure>
      <span class="dance-handnote" aria-hidden="true">5, 6, 7, 8!</span>
    </header>

    <section class="dance-section dance-solo" aria-labelledby="dance-solo-title">
      ${heading('02','<span id="dance-solo-title">SOLO</span> — PERSONAL DANCE',copy('个人表现力 / 身体控制 / 风格驾驭','Expression / body control / range'))}
      <div class="dance-solo-grid">${solos.map((s,i)=>`<article class="dance-solo-item">
        <div class="dance-video-frame ${s.orientation === 'landscape' ? 'dance-video-landscape' : ''} ${s.file ? '' : 'dance-video-pending'}" style="--video-ratio:${s.ratio || '9/16'}" data-solo-frame="${i}">
          ${photo(s.poster+'-poster',`${s.title} — ${copy('视频画面','video still')}`)}
          ${s.file ? `<button class="dance-play" data-solo="${i}" aria-label="${esc(copy('播放 ','Play ')+s.title)}"><span aria-hidden="true">▶</span> ${copy('播放','PLAY')}</button>` : `<span class="dance-pending-label">${copy('Web 版本待补充','WEB VERSION PENDING')}</span>`}
        </div><div class="dance-video-caption"><span class="dance-eyebrow">0${i+1} / ${s.tag}</span><h3>${esc(s.title)}</h3><p>${s.file ? copy('点击播放 · ','Play on demand · ')+s.size : copy('个人演出 · 封面预览','Solo performance · preview')}</p></div>
        <p class="dance-play-status" data-solo-status="${i}" role="status"></p>
      </article>`).join('')}</div>
    </section>

    <section class="dance-section dance-team">
      ${heading('03','TEAM &amp; COMPETITION',copy('一起排练，一起上场。','Rehearse together. Take the stage together.'))}
      <div class="dance-team-grid">
        <article class="dance-team-lead"><a class="dance-photo-link" href="${jiuzi}" target="_blank" rel="noopener noreferrer" aria-label="${copy('观看九子夺嫡比赛视频','Watch the 9-person competition video')}">${photo('jiuzi',copy('九子夺嫡九人持扇合照','Nine-person team portrait with fans'))}<span class="dance-ticket">2026 / CHAMPION ↗</span></a><h3>${copy('九子夺嫡','9-Person Dance Project')}</h3><p>${copy('2026 搜狐关注流舞蹈大赛冠军','2026 Sohu Follow Feed Dance Competition · Champion')}</p></article>
        <article class="dance-team-second"><a class="dance-photo-link" href="https://v.douyin.com/qPwoAv9oKcA/" target="_blank" rel="noopener noreferrer" aria-label="${copy('观看 We Don’t Stop 比赛视频','Watch We Don’t Stop')}">${photo('changsha',copy('2025 搜狐长沙赛区团队获奖合照','Team award photo at the 2025 Sohu Changsha competition'))}</a><span class="dance-eyebrow">2025 / CHAMPION</span><h3>Xikers — We Don’t Stop</h3><p>${copy('搜狐视频舞蹈翻跳大赛长沙赛区冠军','Sohu Video Cover Dance Competition, Changsha · Champion')}</p></article>
        <article class="dance-team-type"><span class="dance-eyebrow">ORIGINAL / GROUP WORK</span><h3>SWAG</h3><p>${copy('原创齐舞作品','Original group dance piece')}</p>${external('https://weixin.qq.com/sph/A08CoR8xW3',copy('观看作品 · 视频号','WATCH · WECHAT CHANNELS'))}</article>
      </div>
      <div class="dance-archive"><h3>MORE WORKS / ARCHIVE</h3>${[
        ['https://weixin.qq.com/sph/A9krB2e7zl',copy('舞征高校齐舞比赛冠军','Wuzheng University Group Dance · Champion')],
        ['https://weixin.qq.com/sph/An0G9EgwnH',copy('OPPO 冠军','OPPO · Champion')],
        ['https://weixin.qq.com/sph/AvDjm5g3n7',copy('2024 搜狐 KPOP 舞蹈视频翻跳大赛武汉赛区季军','2024 Sohu KPOP Cover Dance Competition, Wuhan · Third place')],
        ['https://www.bilibili.com/video/BV1fwUGBJEJy?vd_source=c18feebb2deabefbe7c29cf7cfa7dc67',copy('武汉 OPPO 翻跳大赛亚军','Wuhan OPPO Cover Dance Competition · Runner-up')]
      ].map(([url,label])=>external(url,label)).join('')}</div>
    </section>

    <section class="dance-section dance-case">
      ${heading('04','FEATURED PROJECT', '9-PERSON DANCE PROJECT')}
      <div class="dance-case-top"><h2>${copy('九子夺嫡','Nine dancers.<br>One stage.')}</h2><p class="dance-case-result">2026<br>${copy('搜狐关注流舞蹈大赛','Sohu Follow Feed Dance Competition')}<strong>${copy('冠军','CHAMPION')}</strong></p></div>
      <figure class="dance-case-photo">${photo('festival',copy('2025 搜狐舞蹈盛典团队合照','Team photo at the 2025 Sohu Dance Festival'))}<figcaption>9 PEOPLE / ONE PROJECT / 2026</figcaption></figure>
      <div class="dance-case-body"><div><span class="dance-eyebrow">BEYOND THE PERFORMANCE</span><h3>${copy('让九个人的创意，<br>成为同一个舞台。','Bringing nine people<br>onto one stage.')}</h3><p>${copy('除了舞蹈参与，我也承担团队组织与项目执行工作。从九人协调、排练安排到音频剪辑、创意与舞台呈现，再到比赛和行程执行，让多人创意项目真正落地。','Alongside performing, I handled team organization and project execution: coordinating nine people and rehearsals, editing audio, shaping the creative and stage presentation, and managing competition and travel logistics.')}</p>${external(jiuzi,copy('观看完整比赛 · 抖音','WATCH THE PERFORMANCE · DOUYIN'))}</div>
      <div class="dance-roles"><span class="dance-eyebrow">MY ROLE / ${copy('实际职责','CONTRIBUTIONS')}</span><ol>${[copy('团队组织','Team organization'),copy('9人协调','Nine-person coordination'),copy('排练协调','Rehearsal coordination'),copy('音频剪辑','Audio editing'),copy('创意与舞台呈现','Creative & stage presentation'),copy('比赛及行程执行','Competition & travel execution')].map(r=>`<li>${r}</li>`).join('')}</ol></div></div>
    </section>

    <section class="dance-section dance-experience">
      ${heading('05','EXPERIENCE &amp; AWARDS',copy('一些走过的舞台。','A few stages along the way.'))}
      <div class="dance-experience-grid"><div class="dance-timeline">${awards.map(([year,items])=>`<div class="dance-year"><h3>${year}</h3><ul>${items.map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>
      <div class="dance-scrapbook"><figure>${photo('festival-2025-group',copy('2025 搜狐舞蹈盛典团队合照','Team photo at the 2025 Sohu Dance Festival'))}<figcaption>01 / SOHU DANCE FESTIVAL · 2025</figcaption></figure><figure>${photo('kpop-2025',copy('2025 华中地区 KPOP 比赛获奖照片','Award photo at the 2025 Central China KPOP competition'))}<figcaption>02 / KPOP FESTIVAL · 2025</figcaption></figure><figure>${photo('wuhan-2024',copy('2024 搜狐武汉赛区获奖合照','Award photo at the 2024 Sohu Wuhan competition'))}<figcaption>03 / WUHAN · 2024</figcaption></figure></div></div>
    </section>

    <section class="dance-section dance-life">
      ${heading('06','TEACHING &amp; DANCE LIFE',copy('舞台之外，持续练习。','Off stage, still moving.'))}
      <div class="dance-life-grid"><div><h3>TEACHING</h3><ul>${[copy('KPOP 女团 / 男团','KPOP girl groups / boy groups'),'Hip-hop / SWAG',copy('扒舞与动作拆解','Learning choreography & movement breakdown'),copy('数拍与节奏讲解','Counts & rhythm'),copy('课堂教学','Classroom teaching'),copy('团队排练','Team rehearsals')].map(x=>`<li>${x}</li>`).join('')}</ul></div><div><h3>DANCE PRACTICE</h3><p>${copy('长期参与 KPOP 路演、齐舞比赛、舞队训练及 Workshop / Masterclass。','Regularly involved in KPOP street performances, group dance competitions, crew training and workshops / masterclasses.')}</p><p>${copy('曾参加 Moony、Ving、Kasper、方咏琳、嘉敏、罗雨、面条等舞者课程。','Attended classes and workshops by Moony, Ving, Kasper, Fang Yonglin, Jiamin, Luo Yu, Miantiao and other dancers.')}</p></div><figure>${photo('practice',copy('户外舞蹈练习日常','An outdoor dance practice moment'))}<figcaption>KEEP PRACTICING.</figcaption></figure></div>
    </section>
  </article>`;
  app.querySelectorAll('[data-solo]').forEach(button => {
    button.onclick = () => {
      const index = Number(button.dataset.solo), solo = solos[index];
      const frame = button.closest('[data-solo-frame]');
      const video = document.createElement('video');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'none';
      video.poster = `assets/dance/web/${solo.poster}-poster.jpg`;
      video.setAttribute('aria-label', solo.title);
      video.src = `assets/dance/${solo.file}`;
      video.addEventListener('play', () => app.querySelectorAll('.dance-page video').forEach(other => { if (other !== video) other.pause(); }));
      video.addEventListener('error', () => {
        app.querySelector(`[data-solo-status="${index}"]`).textContent = copy('当前浏览器无法播放此原片，兼容的 Web 版本待补充。','This browser cannot play the original format. A compatible web version is pending.');
      });
      frame.replaceChildren(video);
      video.focus();
      video.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
    };
  });
}

function renderVideoContent() {
  location.replace('#/visual');
}


/* ==================================================================
   路由
   ================================================================== */
const ROUTES = { visual:()=>renderVisual('chooser'), 'visual/video':()=>renderVisual('video'), 'visual/photo':()=>renderVisual('photo'), music:renderArtistContent, planning:renderCreative,
                 creative:()=>{ location.replace('#/planning'); }, video:renderVideoContent,
                 dance:renderDance, about:renderAbout, 'about/archive':renderAboutArchive };

function route() {
  closeLightbox();
  if (vgIO) vgIO.disconnect();
  if (!eggTransitionRouting) cleanupEggTransition();
  const key = (location.hash || '#/').replace('#/', '');
  const artistSlug = key.startsWith('artist/') ? key.split('/')[1] : '';
  document.body.dataset.route = artistSlug ? 'artist' : (ROUTES[key] ? (key.startsWith('about/') ? 'about' : key) : 'home');
  $$('[data-nav][data-key]').forEach(a => a.classList.remove('active'));
  $('#mobileMenu').classList.remove('open');
  $('#burger').classList.remove('open');
  $('#burger').setAttribute('aria-expanded', 'false');
  if (artistSlug) {
    renderArtistDetail(artistSlug);
    const a = $('[data-nav][data-key="music"]');
    if (a) a.classList.add('active');
  } else if (ROUTES[key]) {
    ROUTES[key]();
    const a = $(`[data-nav][data-key="${key.startsWith('about/') ? 'about' : key}"]`);
    if (a) a.classList.add('active');
  } else {
    renderHome();
  }
  bindTypographyReveal(app);
  scrollTo(0, 0);
}
addEventListener('hashchange', route);

/* ---------- 移动端菜单 ---------- */
$('#burger').onclick = () => {
  $('#mobileMenu').classList.toggle('open');
  $('#burger').classList.toggle('open');
  $('#burger').setAttribute('aria-expanded', String($('#mobileMenu').classList.contains('open')));
};

/* ---------- 导航滚动态 ---------- */
addEventListener('scroll', () => $('#nav').classList.toggle('scrolled', scrollY > 30), { passive:true });

/* ==================================================================
   灯箱（← → 切换 / Esc 关闭 / 点击空白关闭）
   ================================================================== */
const lb = $('#lightbox'), lbImg = $('#lbImg');
let lbList = [], lbIndex = 0, lbReturnFocus = null;

function showLb() {
  lbImg.classList.remove('zoom'); void lbImg.offsetWidth;
  lbImg.src = lbList[lbIndex];
  lbImg.alt = `${t(UI.openPhoto)} ${lbIndex + 1}`;
  $('#lbCount').textContent = lbList.length > 1 ? `${lbIndex + 1} / ${lbList.length}` : '';
  [lbIndex + 1, lbIndex - 1].forEach(i => { if (lbList[i]) { const im = new Image(); im.src = lbList[i]; } });
}
function openLightbox(list, idx, archiveTone = false, longArchive = false) {
  lbReturnFocus = document.activeElement;
  lbList = list; lbIndex = idx; showLb();
  $('#lbClose').setAttribute('aria-label', t(UI.close));
  $('#lbPrev').setAttribute('aria-label', t(UI.previous));
  $('#lbNext').setAttribute('aria-label', t(UI.next));
  lb.setAttribute('aria-label', t(UI.openPhoto));
  $('#lbHint').textContent = t(UI.lbHint);
  lb.classList.toggle('archive-lightbox', archiveTone); lb.classList.toggle('long-archive-lightbox', longArchive); lb.classList.add('open'); document.body.style.overflow = 'hidden';
  [...document.body.children].forEach(el => { if (el !== lb && el.tagName !== 'SCRIPT') el.inert = true; });
  $('#lbClose').focus();
}
app.addEventListener('click', event => {
  const image = event.target.closest('.creative-lakeside-archive-grid img');
  if (!image) return;
  const files = ['assets/creative/lakeside-opening.jpg', 'assets/creative/lakeside-recap.jpg'];
  openLightbox(files, image.alt.includes('活动回顾') ? 1 : 0, true, true);
});
/* 策划案原稿与拍摄脚本属于保密内容：只展示烤进图片里的模糊版，
   不提供点击放大（灯箱会拿到清晰文件，等于泄密）。 */
function closeLightbox() {
  if (!lb.classList.contains('open')) return;
  lb.classList.remove('open','archive-lightbox','long-archive-lightbox'); document.body.style.overflow = '';
  [...document.body.children].forEach(el => { if (el !== lb) el.inert = false; });
  if (lbReturnFocus && lbReturnFocus.isConnected) lbReturnFocus.focus({preventScroll:true});
}
$('#lbClose').onclick = closeLightbox;
function lbStep(d) {
  if (lbList.length < 2) return;
  lbIndex = (lbIndex + d + lbList.length) % lbList.length; showLb();
}
lb.onclick = e => { if (e.target === lb) closeLightbox(); };
$('#lbPrev').onclick = e => { e.stopPropagation(); lbStep(-1); };
$('#lbNext').onclick = e => { e.stopPropagation(); lbStep(1); };
addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Tab') {
    const buttons = [...lb.querySelectorAll('button')];
    const first = buttons[0], last = buttons[buttons.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowRight') lbStep(1);
  else if (e.key === 'ArrowLeft')  lbStep(-1);
});

/* ---------- 启动 ---------- */
setLang(LANG);
