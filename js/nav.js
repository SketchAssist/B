/* ---------- top nav / lang / theme ---------- */
function goTo(name){
  document.querySelectorAll('.tab').forEach(tb => tb.classList.toggle('active', tb.dataset.screen === name));
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === 'screen-' + name));
}
document.querySelectorAll('.tab').forEach(tb => tb.addEventListener('click', () => goTo(tb.dataset.screen)));
document.querySelectorAll('.lang-btn').forEach(b => b.addEventListener('click', () => {
  lang = b.dataset.lang;
  document.querySelectorAll('.lang-btn').forEach(x => x.classList.toggle('active', x.dataset.lang === lang));
  renderAll();
}));
document.getElementById('theme-btn').addEventListener('click', () => {
  const root = document.documentElement;
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  if(next === 'dark'){ root.setAttribute('data-theme','dark'); } else { root.removeAttribute('data-theme'); }
  document.getElementById('theme-btn').textContent = next === 'dark' ? '◑' : '◐';
});

/* ---------- static text ---------- */
function renderStaticText(){
  const s = t();
  document.getElementById('tabs').children[0].textContent = s.nav.home;
  document.getElementById('tabs').children[1].textContent = s.nav.try;
  document.getElementById('tabs').children[2].textContent = s.nav.learn;
  document.getElementById('tabs').children[3].textContent = s.nav.download;

  document.getElementById('home-title').textContent = s.home.title;
  document.getElementById('home-desc').textContent = s.home.desc;
  document.getElementById('cta1-title').textContent = s.home.cta1_title;
  document.getElementById('cta1-desc').textContent = s.home.cta1_desc;
  document.getElementById('cta1-go').textContent = s.home.cta1_go;
  document.getElementById('cta2-title').textContent = s.home.cta2_title;
  document.getElementById('cta2-desc').textContent = s.home.cta2_desc;
  document.getElementById('cta2-go').textContent = s.home.cta2_go;
  document.getElementById('cta3-title').textContent = s.home.cta3_title;
  document.getElementById('cta3-desc').textContent = s.home.cta3_desc;
  document.getElementById('cta3-go').textContent = s.home.cta3_go;

  document.getElementById('work-tag').textContent = s.try.tag;
  document.getElementById('export-btn').textContent = '⭳ ' + s.try.export;
  document.getElementById('btn-prev').textContent = s.try.prev;
  document.getElementById('btn-next').textContent = s.try.next;
  document.getElementById('banner-title').textContent = s.try.banner_title;
  document.getElementById('banner-desc').textContent = s.try.banner_desc;
  document.getElementById('banner-btn').textContent = s.try.banner_btn;
  document.getElementById('panel-head-title').textContent = s.try.panel_title;
  document.getElementById('engine-tag').textContent = s.try.engine;
  document.getElementById('mode-label').textContent = s.try.mode_label;

  document.getElementById('dl-version').textContent = s.download.version;
  document.getElementById('dl-btn').textContent = s.download.dl;
  document.getElementById('guide-link').textContent = s.download.guide;
}
