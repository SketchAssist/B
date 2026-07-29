/* ---------- TRY ---------- */
/* ---------- 投げ縄選択（実際にドラッグして範囲を描ける） ---------- */
/* ---------- 画像の「実際に表示されているコンテンツ範囲」を計算する ----------
   <img>はobject-fit:containでボックス全体(inset:0)に配置されるが、
   ボックスと画像の縦横比が違うと上下または左右に余白（レターボックス）ができる。
   投げ縄範囲はこの余白を除いた「画像そのもの」に対する相対位置で保持し、
   ボックスのサイズや形が画面ごとに変わっても常に同じ場所を指すようにする。 */
function getImageContentRect(imgEl){
  const bw = imgEl.clientWidth, bh = imgEl.clientHeight;
  const nw = imgEl.naturalWidth, nh = imgEl.naturalHeight;
  if(!bw || !bh || !nw || !nh){ return { x:0, y:0, w:100, h:100 }; } // 情報が無い場合はボックス全体を代用
  const boxRatio = bw / bh, imgRatio = nw / nh;
  let w, h, x, y;
  if(imgRatio > boxRatio){
    w = 100;
    h = (bw / imgRatio) / bh * 100;
    x = 0;
    y = (100 - h) / 2;
  } else {
    h = 100;
    w = (bh * imgRatio) / bw * 100;
    y = 0;
    x = (100 - w) / 2;
  }
  return { x, y, w, h };
}
function boxPctToImageFrac(pt, contentRect){
  const fx = contentRect.w > 0 ? (pt[0] - contentRect.x) / contentRect.w : 0.5;
  const fy = contentRect.h > 0 ? (pt[1] - contentRect.y) / contentRect.h : 0.5;
  return [Math.max(0, Math.min(1, fx)), Math.max(0, Math.min(1, fy))];
}
function imageFracToClipPolygon(fracPoints, imgEl){
  const cr = getImageContentRect(imgEl);
  return 'polygon(' + fracPoints.map(p => (cr.x + p[0]*cr.w) + '% ' + (cr.y + p[1]*cr.h) + '%').join(',') + ')';
}

function resetLasso(){
  lassoPoints = [];
  lassoImageFrac = [];
  lassoIsDrawing = false;
  lassoApplied = false;
  handfixBg = 0;
  handfixCanvasOn = true;
  const svg = document.getElementById('lasso-svg');
  svg.innerHTML = '';
  svg.classList.remove('drawing');
  document.getElementById('stage-img').style.clipPath = '';
  const canvas = document.getElementById('handfix-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(window._clearTextBoxes) window._clearTextBoxes();
}
function pointToPct(evt, svg){
  const pt = svg.createSVGPoint();
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  const ctm = svg.getScreenCTM();
  if(!ctm){
    // フォールバック：CTMが取得できない場合は矩形ベースで計算
    const rect = svg.getBoundingClientRect();
    const x = ((evt.clientX - rect.left) / rect.width) * 100;
    const y = ((evt.clientY - rect.top) / rect.height) * 100;
    return [Math.max(0,Math.min(100,x)), Math.max(0,Math.min(100,y))];
  }
  const svgP = pt.matrixTransform(ctm.inverse());
  return [Math.max(0,Math.min(100,svgP.x)), Math.max(0,Math.min(100,svgP.y))];
}
function drawLassoPreview(){
  const svg = document.getElementById('lasso-svg');
  svg.innerHTML = '';
  let points;
  if(lassoIsDrawing || !lassoApplied){
    points = lassoPoints; // 描画中はその場のボックス%座標をそのまま使う
  } else {
    // 確定済みの範囲は、画像内相対分数から現在のボックスに合わせて再計算する
    const stageImg = document.getElementById('stage-img');
    const cr = getImageContentRect(stageImg);
    points = lassoImageFrac.map(p => [cr.x + p[0]*cr.w, cr.y + p[1]*cr.h]);
  }
  if(points.length < 2) return;
  const pts = points.map(p => p.join(',')).join(' ');
  const el = document.createElementNS('http://www.w3.org/2000/svg', lassoIsDrawing ? 'polyline' : 'polygon');
  el.setAttribute('points', pts);
  el.setAttribute('class', 'lasso-path');
  svg.appendChild(el);
}
function startLassoDrawing(){
  lassoPoints = [];
  lassoImageFrac = [];
  lassoIsDrawing = false;
  lassoApplied = false;
  document.getElementById('stage-img').style.clipPath = '';
  const svg = document.getElementById('lasso-svg');
  svg.innerHTML = '';
  svg.classList.add('drawing');
}
(function setupLassoPointerEvents(){
  const svg = document.getElementById('lasso-svg');
  svg.addEventListener('pointerdown', (e) => {
    if(!svg.classList.contains('drawing')) return;
    lassoIsDrawing = true;
    lassoPoints = [pointToPct(e, svg)];
    svg.setPointerCapture(e.pointerId);
  });
  svg.addEventListener('pointermove', (e) => {
    if(!lassoIsDrawing) return;
    lassoPoints.push(pointToPct(e, svg));
    drawLassoPreview();
  });
  svg.addEventListener('pointerup', () => {
    if(!lassoIsDrawing) return;
    lassoIsDrawing = false;
    svg.classList.remove('drawing');
    if(lassoPoints.length < 3){ lassoPoints = []; }
    drawLassoPreview();
  });
})();
function runLassoStage(){
  curStage = 1;
  if(lassoPoints.length >= 3){
    const stageImg = document.getElementById('stage-img');
    const contentRect = getImageContentRect(stageImg);
    lassoImageFrac = lassoPoints.map(p => boxPctToImageFrac(p, contentRect));
    document.getElementById('stage-img').style.clipPath = imageFracToClipPolygon(lassoImageFrac, stageImg);
    lassoApplied = true;
    curStage = 2; // 特徴線強調はStage1と同時実行のため、自動的に進める
  }
  renderTry();
}

/* ---------- 手書き修正：背景レイヤー選択 ---------- */
function renderHandfixBgButtons(){
  const s = t();
  const el = document.getElementById('hf-bg-buttons');
  document.getElementById('hf-label-bg').textContent = s.try.hf_bg_label;
  el.innerHTML = '';
  s.try.stages.slice(0, TOPTAB_STAGE_COUNT).forEach((st, i) => {
    if(i === 4) return;
    const b = document.createElement('button');
    b.className = 'hf-btn' + (handfixBg === i ? ' active' : '');
    b.textContent = st.name;
    b.onclick = () => { handfixBg = i; renderTry(); };
    el.appendChild(b);
  });
  const noneBtn = document.createElement('button');
  noneBtn.className = 'hf-btn' + (handfixBg === -1 ? ' active' : '');
  noneBtn.textContent = s.try.hf_bg_none;
  noneBtn.onclick = () => { handfixBg = -1; renderTry(); };
  el.appendChild(noneBtn);
}
document.getElementById('hf-canvas-toggle').addEventListener('click', () => {
  handfixCanvasOn = !handfixCanvasOn;
  renderTry();
});
document.getElementById('hf-undo-btn').addEventListener('click', () => {
  if(window._handfixUndo) window._handfixUndo();
});
document.getElementById('hf-redo-btn').addEventListener('click', () => {
  if(window._handfixRedo) window._handfixRedo();
});
document.getElementById('export-btn').addEventListener('click', () => {
  downloadHandfixCanvas();
});
function downloadHandfixCanvas(){
  // エクスポートするのはcanvas（手描き部分）そのもの。背景は含めない。
  const canvas = document.getElementById('handfix-canvas');
  if(!canvas.width || !canvas.height) return;
  const link = document.createElement('a');
  link.download = 'sketchassist-handfix.png';
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ---------- 手書き修正：キャンバスに描画（背景をなぞって作業できる） ---------- */
function setHandfixTool(toolName){
  handfixTool = toolName;
  document.getElementById('tool-pen').classList.toggle('tool-active', toolName === 'pen');
  document.getElementById('tool-eraser').classList.toggle('tool-active', toolName === 'eraser');
  document.getElementById('tool-text').classList.toggle('tool-active', toolName === 'text');
  document.getElementById('tool-scale').classList.toggle('tool-active', toolName === 'scale');
  const textLayer = document.getElementById('text-layer');
  textLayer.classList.toggle('placing', toolName === 'text');
}
document.getElementById('tool-pen').addEventListener('click', () => setHandfixTool('pen'));
document.getElementById('tool-eraser').addEventListener('click', () => setHandfixTool('eraser'));
document.getElementById('tool-text').addEventListener('click', () => setHandfixTool('text'));
setHandfixTool('pen');

document.getElementById('tool-scale').addEventListener('click', () => {
  setHandfixTool('scale');
});

/* ---------- 手書き修正：テキストボックスをドロップして配置 ---------- */
(function setupTextLayer(){
  const layer = document.getElementById('text-layer');
  let dragBox = null, dragOffsetX = 0, dragOffsetY = 0;
  let selectedBox = null;

  function selectBox(box){
    if(selectedBox) selectedBox.classList.remove('selected');
    selectedBox = box;
    if(selectedBox) selectedBox.classList.add('selected');
  }

  function createTextBox(x, y){
    const box = document.createElement('div');
    box.className = 'text-box';
    box.style.left = x + 'px';
    box.style.top = y + 'px';

    const handle = document.createElement('div');
    handle.className = 'tb-handle';
    handle.textContent = '⠿';
    box.appendChild(handle);

    const textEl = document.createElement('div');
    textEl.className = 'tb-text';
    textEl.contentEditable = 'true';
    box.appendChild(textEl);

    layer.appendChild(box);
    textEl.focus();
    selectBox(box);

    handle.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      selectBox(box);
      dragBox = box;
      const boxRect = box.getBoundingClientRect();
      dragOffsetX = e.clientX - boxRect.left;
      dragOffsetY = e.clientY - boxRect.top;
      handle.setPointerCapture(e.pointerId);
    });
    textEl.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      selectBox(box);
    });
  }

  layer.addEventListener('pointerdown', (e) => {
    if(e.target === layer){
      selectBox(null);
      if(handfixTool === 'text'){
        const rect = layer.getBoundingClientRect();
        createTextBox(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
  });
  layer.addEventListener('pointermove', (e) => {
    if(!dragBox) return;
    const rect = layer.getBoundingClientRect();
    dragBox.style.left = (e.clientX - rect.left - dragOffsetX) + 'px';
    dragBox.style.top = (e.clientY - rect.top - dragOffsetY) + 'px';
  });
  window.addEventListener('pointerup', () => { dragBox = null; });

  window.addEventListener('keydown', (e) => {
    if(e.key !== 'Backspace' && e.key !== 'Delete') return;
    if(!selectedBox) return;
    const textEl = selectedBox.querySelector('.tb-text');
    if(document.activeElement === textEl) return; // 文字編集中は通常のBackspaceとして扱う
    e.preventDefault();
    selectedBox.remove();
    selectedBox = null;
  });

  window._clearTextBoxes = () => { layer.innerHTML = ''; selectedBox = null; };
})();


(function setupHandfixCanvas(){
  const canvas = document.getElementById('handfix-canvas');
  const ctx = canvas.getContext('2d');
  const previewCanvas = document.getElementById('scale-preview-canvas');
  const pctx = previewCanvas.getContext('2d');
  let lastX = 0, lastY = 0;
  let undoStack = [];
  let redoStack = [];
  let scaleStart = null;

  function syncCanvasSize(){
    const rect = canvas.getBoundingClientRect();
    if(rect.width === 0 || rect.height === 0) return;
    const w = Math.round(rect.width), h = Math.round(rect.height);
    if(canvas.width !== w || canvas.height !== h){
      // サイズがずれていた場合、内容を退避してから正しいサイズへ合わせ直す
      let snapshot = null;
      if(canvas.width > 0 && canvas.height > 0){
        snapshot = document.createElement('canvas');
        snapshot.width = canvas.width;
        snapshot.height = canvas.height;
        snapshot.getContext('2d').drawImage(canvas, 0, 0);
      }
      canvas.width = w;
      canvas.height = h;
      if(snapshot){ ctx.drawImage(snapshot, 0, 0, w, h); }
    }
    if(previewCanvas.width !== w || previewCanvas.height !== h){
      previewCanvas.width = w;
      previewCanvas.height = h;
    }
  }
  window.addEventListener('resize', syncCanvasSize);
  // ツールバーの表示/非表示やタブ切替など、理由を問わずviewerのサイズが変わったら
  // 常にキャンバスの内部解像度を追従させる（サイズや位置のズレを気にしなくてよいようにする）
  if(window.ResizeObserver){
    const ro = new ResizeObserver(() => { syncCanvasSize(); });
    ro.observe(document.getElementById('stage-display'));
  }

  function posFromEvent(e){
    const rect = canvas.getBoundingClientRect();
    if(rect.width === 0 || rect.height === 0) return [0, 0];
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return [(e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY];
  }

  function pushUndoSnapshot(){
    if(canvas.width === 0 || canvas.height === 0) return;
    undoStack.push(canvas.toDataURL());
    if(undoStack.length > 30) undoStack.shift();
    redoStack = [];
  }
  function restoreSnapshot(dataUrl){
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = dataUrl;
  }
  window._handfixUndo = () => {
    if(undoStack.length === 0) return;
    redoStack.push(canvas.toDataURL());
    const prev = undoStack.pop();
    restoreSnapshot(prev);
  };
  window._handfixRedo = () => {
    if(redoStack.length === 0) return;
    undoStack.push(canvas.toDataURL());
    const next = redoStack.pop();
    restoreSnapshot(next);
  };

  function drawScaleLine(targetCtx, p1, p2, live, labelValue){
    const dx = p2[0]-p1[0], dy = p2[1]-p1[1];
    targetCtx.save();
    targetCtx.lineCap = 'round';
    targetCtx.strokeStyle = live ? 'rgba(43,110,95,0.85)' : '#111';
    targetCtx.lineWidth = live ? 2 : 3;
    if(live){ targetCtx.setLineDash([6,4]); }
    targetCtx.beginPath();
    targetCtx.moveTo(p1[0], p1[1]);
    targetCtx.lineTo(p2[0], p2[1]);
    targetCtx.stroke();
    // 端のヒゲ（Wordの目盛り線ふうに両端に短い縦線を入れる）
    const angle = Math.atan2(dy, dx);
    const tick = 6;
    [p1, p2].forEach(p => {
      targetCtx.beginPath();
      targetCtx.moveTo(p[0] - Math.sin(angle)*tick, p[1] + Math.cos(angle)*tick);
      targetCtx.lineTo(p[0] + Math.sin(angle)*tick, p[1] - Math.cos(angle)*tick);
      targetCtx.stroke();
    });
    targetCtx.setLineDash([]);
    // ラベルは自動計算のピクセル距離ではなく、確定時に手動入力された数値のみを表示する
    if(!live && labelValue){
      targetCtx.font = '12px sans-serif';
      targetCtx.fillStyle = '#111';
      const midX = (p1[0]+p2[0])/2, midY = (p1[1]+p2[1])/2;
      targetCtx.fillText(labelValue, midX + 6, midY - 6);
    }
    targetCtx.restore();
  }

  let scaleDragging = false;

  canvas.addEventListener('pointerdown', (e) => {
    if(curStage !== 4 || !handfixCanvasOn) return;
    syncCanvasSize();
    if(handfixTool === 'scale'){
      scaleStart = posFromEvent(e);
      scaleDragging = true;
      canvas.setPointerCapture(e.pointerId);
      e.preventDefault();
      return;
    }
    pushUndoSnapshot();
    handfixDrawing = true;
    [lastX, lastY] = posFromEvent(e);
    canvas.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  canvas.addEventListener('pointermove', (e) => {
    if(scaleDragging && scaleStart){
      const cur = posFromEvent(e);
      pctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      drawScaleLine(pctx, scaleStart, cur, true);
      return;
    }
    if(!handfixDrawing) return;
    const [x, y] = posFromEvent(e);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if(handfixTool === 'eraser'){
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 16;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 3;
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
  });
  function finishScaleDrag(e){
    if(!scaleDragging || !scaleStart) return;
    const end = posFromEvent(e);
    pctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    scaleDragging = false;
    const startPt = scaleStart;
    scaleStart = null;
    const dx = end[0]-startPt[0], dy = end[1]-startPt[1];
    if(Math.sqrt(dx*dx + dy*dy) < 4) return; // ほぼ動いていない場合は無視

    const promptText = lang === 'ja'
      ? '目盛りの数値を入力してください'
      : 'Enter the scale value';
    const input = window.prompt(promptText, '');
    if(input === null || input.trim() === '') return; // キャンセル・未入力時は描画しない

    pushUndoSnapshot();
    ctx.globalCompositeOperation = 'source-over';
    drawScaleLine(ctx, startPt, end, false, input.trim());
  }
  canvas.addEventListener('pointerup', (e) => {
    finishScaleDrag(e);
    handfixDrawing = false;
  });
  canvas.addEventListener('pointercancel', (e) => {
    finishScaleDrag(e);
    handfixDrawing = false;
  });
  // 投げ縄描画と同様、キャプチャ中はpointerleaveで中断しない
  // （スケール線のドラッグ中に一瞬カーソルが外れても線が消えないようにする）

  // 手書き修正タブに入るたびキャンバスサイズを合わせておく
  window._resizeHandfixCanvas = syncCanvasSize;
})();

function renderModeGrid(){
  const el = document.getElementById('mode-grid');
  el.innerHTML = '';
  t().try.modes.forEach((m,i) => {
    const b = document.createElement('button');
    b.className = 'mode-chip' + (i===curMode ? ' active':'');
    b.textContent = m.name;
    b.onclick = () => { curMode = i; curStage = 0; resetLasso(); renderTry(); };
    el.appendChild(b);
  });
  const soon = document.createElement('button');
  soon.className = 'mode-chip soon';
  soon.textContent = t().try.mode_soon_name;
  soon.disabled = true;
  el.appendChild(soon);
}

function renderStageTabstrip(){
  const el = document.getElementById('stage-tabstrip');
  el.innerHTML = '';
  t().try.stages.slice(0, TOPTAB_STAGE_COUNT).forEach((st,i) => {
    const b = document.createElement('button');
    b.className = 'stage-tab' + (i===curStage ? ' active':'');
    b.innerHTML = (i>0 ? '<span class="n">'+i+'</span>' : '') + st.name;
    b.onclick = () => { curStage = i; renderTry(); };
    el.appendChild(b);
  });
}

function renderStageCards(){
  const el = document.getElementById('stage-cards');
  el.innerHTML = '';
  const s = t();
  s.try.stages.forEach((st,i) => {
    const card = document.createElement('div');
    const isDone = i <= curStage;
    card.className = 'stage-card' + (i===curStage ? ' active':'') + (isDone ? ' done':'');

    const num = document.createElement('div');
    num.className = 'sc-num';
    num.textContent = isDone ? '✓' : i;
    card.appendChild(num);

    const body = document.createElement('div');
    body.className = 'sc-body';
    const title = document.createElement('div');
    title.className = 'sc-title';
    title.textContent = i + ' ' + st.name;
    const desc = document.createElement('div');
    desc.className = 'sc-desc';
    desc.textContent = st.desc;
    body.appendChild(title);
    body.appendChild(desc);

    if(st.button === 'lasso'){
      const secBtn = document.createElement('button');
      secBtn.className = 'btn sc-btn sc-btn-secondary';
      secBtn.textContent = st.secondary;
      secBtn.onclick = (e) => { e.stopPropagation(); curStage = 1; renderTry(); startLassoDrawing(); };
      body.appendChild(secBtn);

      const note = document.createElement('div');
      note.className = 'sc-note';
      note.textContent = st.note;
      body.appendChild(note);

      const runBtn = document.createElement('button');
      runBtn.className = 'btn primary sc-btn';
      runBtn.textContent = isDone ? s.try.rerun : s.try.run;
      runBtn.onclick = (e) => { e.stopPropagation(); runLassoStage(); };
      body.appendChild(runBtn);
    } else if(st.button === 'run'){
      const runBtn = document.createElement('button');
      runBtn.className = 'btn primary sc-btn';
      runBtn.textContent = isDone ? s.try.rerun : s.try.run;
      runBtn.onclick = (e) => { e.stopPropagation(); curStage = i; renderTry(); };
      body.appendChild(runBtn);
    }
    card.appendChild(body);

    const thumb = document.createElement('div');
    thumb.className = 'sc-thumb';
    const img = document.createElement('img');
    img.src = imagePath(curMode, i);
    img.alt = '';
    img.onerror = () => {
      if(img.src.indexOf(TEMP_IMAGE) === -1){ img.src = TEMP_IMAGE; }
      else{ thumb.style.display = 'none'; }
    };
    thumb.appendChild(img);
    card.appendChild(thumb);

    card.onclick = () => { curStage = i; renderTry(); };
    el.appendChild(card);
  });
}

function renderTry(){
  const s = t();
  document.getElementById('work-mode-name').textContent = s.try.modes[curMode].name;
  renderModeGrid();
  renderStageTabstrip();
  renderStageCards();

  document.getElementById('stage-badge').textContent = curStage === 4 ? '' : s.try.result_note;
  document.getElementById('stage-badge').style.display = curStage === 4 ? 'none' : 'block';
  document.getElementById('stage-label').textContent =
    s.try.modes[curMode].name + ' / ' + s.try.stages[curStage].name;

  const stageImg = document.getElementById('stage-img');
  const glyphEl = document.getElementById('stage-glyph');
  const canvas = document.getElementById('handfix-canvas');
  const lassoSvg = document.getElementById('lasso-svg');
  const hfToolbar = document.getElementById('handfix-toolbar');

  // ツールバーの中身は常に描画しておく（visibilityで隠すだけなので、
  // 中身が空だと高さが変わってしまい、viewerのサイズが段によってずれる）
  renderHandfixBgButtons();
  document.getElementById('hf-canvas-toggle').textContent = handfixCanvasOn ? s.try.hf_canvas_on : s.try.hf_canvas_off;
  document.getElementById('hf-canvas-toggle').classList.toggle('active', !handfixCanvasOn);

  function clipFor(){
    if(lassoApplied && lassoImageFrac.length >= 3){
      return imageFracToClipPolygon(lassoImageFrac, stageImg);
    }
    return '';
  }
  // 画像の読み込みが完了した瞬間のnaturalWidth/Heightを使って再計算しないと、
  // 読み込みタイミングによってはズレたクリップ範囲のまま固定されてしまうため、
  // load完了時にも同じクリップを再適用する
  stageImg.onload = () => {
    if(curStage === 4){
      if(handfixBg >= 1){ stageImg.style.clipPath = clipFor(); }
    } else if(curStage >= 1){
      stageImg.style.clipPath = clipFor();
    }
  };

  if(curStage === 4){
    // 手書き修正：背景レイヤー + キャンバスレイヤー
    hfToolbar.classList.add('show');
    document.getElementById('undo-redo-group').classList.add('show');
    lassoSvg.innerHTML = '';
    lassoSvg.classList.remove('drawing');

    if(handfixBg === -1){
      stageImg.style.display = 'none';
    } else {
      const bgPath = imagePath(curMode, handfixBg);
      stageImg.src = bgPath;
      stageImg.style.display = 'block';
      stageImg.style.clipPath = handfixBg >= 1 ? clipFor() : '';
      stageImg.onerror = () => {
        if(stageImg.src.indexOf(TEMP_IMAGE) === -1){ stageImg.src = TEMP_IMAGE; }
      };
    }
    canvas.classList.toggle('on', handfixCanvasOn);
    document.getElementById('scale-preview-canvas').classList.toggle('on', handfixCanvasOn);
    document.getElementById('text-layer').classList.add('on');
    if(handfixCanvasOn && window._resizeHandfixCanvas){
      window._resizeHandfixCanvas();
    }
    glyphEl.style.display = 'none';
  } else {
    hfToolbar.classList.remove('show');
    document.getElementById('undo-redo-group').classList.remove('show');
    canvas.classList.remove('on');
    document.getElementById('scale-preview-canvas').classList.remove('on');
    document.getElementById('text-layer').classList.remove('on');
    const path = imagePath(curMode, curStage);
    stageImg.src = path;
    stageImg.style.display = 'block';
    glyphEl.style.display = 'none';

    if(curStage >= 1){
      stageImg.style.clipPath = clipFor();
      if(curStage === 1){ drawLassoPreview(); }
      else { lassoSvg.innerHTML = ''; lassoSvg.classList.remove('drawing'); }
    } else {
      stageImg.style.clipPath = '';
      lassoSvg.innerHTML = '';
      lassoSvg.classList.remove('drawing');
    }

    stageImg.onerror = () => {
      if(stageImg.src.indexOf(TEMP_IMAGE) === -1){
        stageImg.src = TEMP_IMAGE;
        return;
      }
      stageImg.style.display = 'none';
      glyphEl.style.display = 'flex';
      glyphEl.style.alignItems = 'center';
      glyphEl.style.justifyContent = 'center';
      glyphEl.textContent = SAMPLE_GLYPH;
    };
  }

  const isLast = curStage === s.try.stages.length - 1;
  document.getElementById('own-photo-banner').classList.toggle('show', isLast);
}
document.getElementById('btn-prev').onclick = () => { if(curStage>0){ curStage--; renderTry(); } };
document.getElementById('btn-next').onclick = () => { if(curStage < t().try.stages.length-1){ curStage++; renderTry(); } };
