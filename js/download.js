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
document.getElementById('dl-btn').onclick = () => {
  const os = OS_LIST[curOs];
  const fileName = 'SketchAssist-Setup-' + os.key + '-v0.1.0.' + os.ext + '.txt';
  const content =
    (lang==='ja'
      ? 'これはSketchAssist UIプロトタイプのテスト用ダミーファイルです。\n実際のインストーラーではありません。\n\n'
      : 'This is a dummy test file for the SketchAssist UI prototype.\nThis is not a real installer.\n\n') +
    'OS: ' + os.key + '\nVersion: v0.1.0\n' +
    (lang==='ja' ? 'ダウンロード日時: ' : 'Downloaded: ') + new Date().toLocaleString(lang==='ja'?'ja-JP':'en-US') + '\n';
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = fileName;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  document.getElementById('dl-note').textContent = t().download.note_dl(os.key, fileName);
};
function toggleGuide(){ document.getElementById('guide-box').classList.toggle('open'); }
