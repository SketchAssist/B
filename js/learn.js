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
  [90,75,60].forEach(w => {
    const p = document.createElement('div');
    p.className = 'placeholder-line';
    p.style.width = w + '%';
    el.appendChild(p);
  });
  const box = document.createElement('div');
  box.className = 'detail-box';
  const closedText = lang === 'ja' ? '＋ 詳細説明を表示（仮）' : '+ Show details (placeholder)';
  const openText = lang === 'ja' ? '－ 詳細説明（プレースホルダー本文）' : '− Details (placeholder body text)';
  box.textContent = closedText;
  box.onclick = () => {
    box.classList.toggle('open');
    box.textContent = box.classList.contains('open') ? openText : closedText;
  };
  el.appendChild(box);
}
