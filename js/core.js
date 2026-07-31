/* =========================================================
   STR — 全UI文字列（コードから分離、ja / en 切替）
   ========================================================= */
const STR = {
  ja: {
    nav: { home:'Home', try:'Try', learn:'Learn', download:'Download' },
    home: {
      title:'SketchAssist — 画像を段階的に処理するツール',
      desc:'誰でもすぐに仕組みを試せます。難しい設定は必要ありません。',
      cta1_title:'Try SketchAssist', cta1_desc:'サンプルでその場で体験する', cta1_go:'はじめる →',
      cta2_title:'Learn', cta2_desc:'SketchAssistの考え方と使い方を理解する', cta2_go:'読む →',
      cta3_title:'Download', cta3_desc:'SketchAssistを入手して使い始める', cta3_go:'入手する →'
    },
    try: {
      tag:'サンプル', export:'エクスポート',
      panel_title:'処理ステージ', engine:'エンジン接続済み', mode_label:'処理モード',
      prev:'← Previous', next:'Next →',
      run:'実行', rerun:'再実行',
      banner_title:'自分の写真で試してみたくなったら',
      banner_desc:'Web版はサンプルのみの体験です。ご自身の画像を処理するにはSketchAssistをダウンロードしてください。',
      banner_btn:'Download SketchAssist',
      result_note:'SketchAssistで事前に生成された結果を表示（仮）',
      modes:[
        { name:'昆虫モード' },
        { name:'植物モード' },
        { name:'化石モード' },
        { name:'考古遺物モード' },
        { name:'汎用モード' }
      ],
      hf_bg_label:'背景',
      hf_bg_none:'背景なし',
      hf_canvas_on:'キャンバスなし',
      hf_canvas_off:'キャンバスあり',
      hf_download:'図をダウンロード',
      stages:[
        { name:'元の写真', desc:'アップロード済みの原本画像', button:'none' },
        { name:'投げ縄選択', desc:'対象物を投げ縄で囲んで選択範囲を指定する（Stage 1）', button:'lasso', secondary:'対象を囲む', note:'※ 投げ縄で対象を囲んでから「実行」してください' },
        { name:'特徴線強調', desc:'陰影・テクスチャを除去し特徴線を強調する（Stage 2、Stage 1と同時実行）', button:'none' },
        { name:'エッジ抽出', desc:'特徴線強調画像から構造エッジを抽出する（Stage 3）', button:'run' },
        { name:'手書き修正', desc:'部位マップを参照しながらペン・消しゴムで手書き修正する', button:'none' }
      ]
    },
    learn: {
      toc:[
        { id:'intro', label:'Introduction' },
        { id:'what_is_a', label:'What is SketchAssist', indent:true },
        { id:'why_diagrams', label:'Why diagrams, not photos', indent:true },
        { id:'academic_diagram', label:'What is an academic diagram', indent:true },
        { id:'start', label:'Getting started' },
        { id:'workflow', label:'Basic workflow' },
        { id:'modes', label:'Modes overview', indent:true },
        { id:'stage1', label:'投げ縄選択の意味', indent:true },
        { id:'stage2', label:'特徴線強調の意味', indent:true },
        { id:'stage3', label:'エッジ抽出の意味', indent:true },
        { id:'stage4', label:'手書き修正の意味', indent:true },
        { id:'use_cases', label:'Use cases（対象研究）' },
        { id:'using_a', label:'Using SketchAssist' },
        { id:'faq', label:'FAQ' }
      ],
      try_link:'Tryで見た内容を確認する →'
    },
    download: {
      version:'Latest version — v1.0.0',
      dl:'Download',
      guide:'Installation guide',
      note_dl:(os,name)=> os + '版「' + name + '」のダウンロードを開始しました'
    }
  },
  en: {
    nav: { home:'Home', try:'Try', learn:'Learn', download:'Download' },
    home: {
      title:'SketchAssist — a tool for staged image processing',
      desc:'Try it right away — no setup required.',
      cta1_title:'Try SketchAssist', cta1_desc:'Experience it now with samples', cta1_go:'Start →',
      cta2_title:'Learn', cta2_desc:'Understand the ideas behind SketchAssist', cta2_go:'Read →',
      cta3_title:'Download', cta3_desc:'Get SketchAssist and start using it', cta3_go:'Get it →'
    },
    try: {
      tag:'SAMPLE', export:'Export',
      panel_title:'Processing stages', engine:'Engine connected', mode_label:'Processing mode',
      prev:'← Previous', next:'Next →',
      run:'Run', rerun:'Re-run',
      banner_title:'Want to try it with your own photos?',
      banner_desc:'This web preview only shows sample images. Download SketchAssist to process your own images.',
      banner_btn:'Download SketchAssist',
      result_note:'Showing a pre-generated result from SketchAssist (placeholder)',
      modes:[
        { name:'Insect mode' },
        { name:'Plant mode' },
        { name:'Fossil mode' },
        { name:'Artifact mode' },
        { name:'General mode' }
      ],
      hf_bg_label:'Background',
      hf_bg_none:'No background',
      hf_canvas_on:'Hide canvas',
      hf_canvas_off:'Show canvas',
      hf_download:'Download artwork',
      stages:[
        { name:'Original photo', desc:'The uploaded source image', button:'none' },
        { name:'Lasso selection', desc:'Lasso the subject to mark the selection area (Stage 1)', button:'lasso', secondary:'Draw lasso', note:'※ Draw a lasso around the subject, then press "Run".' },
        { name:'Feature line enhancement', desc:'Remove shading/texture and enhance feature lines (Stage 2, runs together with Stage 1)', button:'none' },
        { name:'Edge extraction', desc:'Extract structural edges from the enhanced image (Stage 3)', button:'run' },
        { name:'Hand-drawn correction', desc:'Manually correct with pen/eraser, referencing the part map', button:'none' }
      ]
    },
    learn: {
      toc:[
        { id:'intro', label:'Introduction' },
        { id:'what_is_a', label:'What is SketchAssist', indent:true },
        { id:'why_diagrams', label:'Why diagrams, not photos', indent:true },
        { id:'academic_diagram', label:'What is an academic diagram', indent:true },
        { id:'start', label:'Getting started' },
        { id:'workflow', label:'Basic workflow' },
        { id:'modes', label:'Modes overview', indent:true },
        { id:'stage1', label:'Meaning of Lasso selection', indent:true },
        { id:'stage2', label:'Meaning of Feature line enhancement', indent:true },
        { id:'stage3', label:'Meaning of Edge extraction', indent:true },
        { id:'stage4', label:'Meaning of Hand-drawn correction', indent:true },
        { id:'use_cases', label:'Use cases' },
        { id:'using_a', label:'Using SketchAssist' },
        { id:'faq', label:'FAQ' }
      ],
      try_link:'Revisit what you saw in Try →'
    },
    download: {
      version:'Latest version — v1.0.0',
      dl:'Download',
      guide:'Installation guide',
      note_dl:(os,name)=> 'Started downloading ' + name + ' for ' + os
    }
  }
};

/* =========================================================
   画像/サンプルデータ（言語非依存）。
   assets/samples/{mode}/{sample}/{stage}.jpg に画像を置くと自動反映。
   ========================================================= */
const MODE_KEYS = ['insect','plant','fossil','artifact','general'];
const STAGE_KEYS = ['original','lasso','feature','edge','handfix'];
const TOPTAB_STAGE_COUNT = 5; // 元写真〜手書き修正まで、すべてタブで直接切替できる
const SAMPLE_GLYPH = '●';

// SketchAssist本体（実際のアプリ）v1.0.0 のGitHub Releases直リンク
const SKETCHASSIST_VERSION = '1.0.0';
const SKETCHASSIST_RELEASE_BASE_URL =
  'https://github.com/SketchAssist/SketchAssist/releases/download/v' + SKETCHASSIST_VERSION + '/';

const OS_LIST = [
  { key:'Windows', file:'SketchAssist-Setup-1.0.0.exe' },
  { key:'macOS (Intel)', file:'SketchAssist-1.0.0.dmg' },
  { key:'macOS (Apple Silicon)', file:'SketchAssist-1.0.0-arm64.dmg' },
  { key:'Linux', file:'SketchAssist-1.0.0.AppImage' }
];

const IMAGE_DIR = 'picture/'; // css/・js/と並ぶ画像フォルダ

function imagePath(modeIdx, stageIdx){
  // 投げ縄選択（stage1）は、投げ縄で範囲を指定するまでは元の写真をそのまま表示する
  const key = stageIdx === 1 ? STAGE_KEYS[0] : STAGE_KEYS[stageIdx];
  // ファイル名だけで区別するフラット構成（pictureフォルダ直下に置くだけでよい）
  // 例: picture/insect-original.jpg, picture/insect-feature.jpg, picture/plant-edge.jpg ...
  return IMAGE_DIR + MODE_KEYS[modeIdx] + '-' + key + '.jpg';
}

/* 仮の暫定画像：本物の写真が各パスに用意されるまで、
   すべてのモード・ステージでこの1枚を代わりに表示する。
   画像はpictureフォルダに置いた実ファイルをそのまま参照する。
   該当ファイルが本物の画像に差し替えられれば、そちらが自動的に優先される。 */
const TEMP_IMAGE = IMAGE_DIR + 'insect-original.jpg';



let lang = 'ja';
let lassoPoints = [];      // 描いている最中の投げ縄の頂点（現在のボックスに対する%座標。プレビュー表示専用）
let lassoImageFrac = [];   // 「実行」で確定した投げ縄範囲。画像コンテンツ内の相対位置（0〜1）で保持し、
                            // 画面のサイズや余白（レターボックス）が変わっても常に画像の同じ部分を指すようにする
let lassoIsDrawing = false;
let lassoApplied = false;  // 「実行」で範囲確定済みか
let handfixBg = 0;         // 手書き修正の背景：0=元の写真,1=投げ縄選択,2=特徴線強調,3=エッジ抽出,-1=背景なし
let handfixCanvasOn = true;
let handfixTool = 'pen';   // 'pen' | 'eraser'
let handfixDrawing = false;
let curMode = 0, curStage = 0, curOs = 0, curTopic = 'intro';

function t(){ return STR[lang]; }
