/* ---------- LEARN ---------- */
function renderToc(){
  const el = document.getElementById('toc');
  el.innerHTML = '';
  t().learn.toc.forEach(item => {
    const d = document.createElement('div');
    d.className = 'toc-item' + (item.indent ? ' toc-sub':'') + (item.id===curTopic ? ' active':'');
    d.textContent = item.label;
    d.onclick = () => { curTopic = item.id; renderToc(); renderLearnContent(); };
    el.appendChild(d);
  });
}
function findLabel(id){
  const found = t().learn.toc.find(x => x.id === id);
  return found ? found.label : id;
}
function renderLearnContent(){
  const el = document.getElementById('learn-content');
  el.innerHTML = '';
  const h = document.createElement('h2');
  h.textContent = findLabel(curTopic);
  el.appendChild(h);

  if(curTopic.startsWith('stage') || curTopic === 'modes'){
    const link = document.createElement('div');
    link.className = 'try-link';
    link.textContent = t().learn.try_link;
    link.onclick = () => goTo('try');
    el.appendChild(link);
  }

  const body = (LEARN_CONTENT[lang] && LEARN_CONTENT[lang][curTopic]) || '';
  body.split(/\n\n+/).forEach(para => {
    if(!para.trim()) return;
    const p = document.createElement('p');
    p.className = 'learn-para';
    p.textContent = para.trim();
    el.appendChild(p);
  });
}
