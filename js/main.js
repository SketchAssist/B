/* ---------- full render ---------- */
function renderAll(){
  renderStaticText();
  renderTry();
  renderToc();
  renderLearnContent();
  renderOsRow();
  document.getElementById('dl-note').textContent = '';
}
renderAll();
