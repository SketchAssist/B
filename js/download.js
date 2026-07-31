/* ---------- DOWNLOAD ---------- */
function renderOsRow(){
  const el = document.getElementById('os-row');
  el.innerHTML = '';
  OS_LIST.forEach((os,i) => {
    const b = document.createElement('button');
    b.className = 'os-btn' + (i===curOs ? ' active':'');
    b.textContent = os.key;
    b.onclick = () => { curOs = i; renderOsRow(); };
    el.appendChild(b);
  });
}

// 選択中OSのGitHub Releasesアセットへ直リンクし、その場でダウンロードする
document.getElementById('dl-btn').onclick = () => {
  const os = OS_LIST[curOs];
  const url = SKETCHASSIST_RELEASE_BASE_URL + os.file;
  const a = document.createElement('a');
  a.href = url;
  a.download = os.file;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  document.getElementById('dl-note').textContent = t().download.note_dl(os.key, os.file);
};

function toggleGuide(){ document.getElementById('guide-box').classList.toggle('open'); }
