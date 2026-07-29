/* =========================================================
   LEARN_CONTENT — Learnタブの本文（ja / en）
   段落は \n\n 区切り。renderLearnContent() 側で <p> に分割して表示する。
   ========================================================= */
const LEARN_CONTENT = {
  ja: {
    intro: `学術図版(標本や遺物の輪郭を線画で表現した図)は、分類・記載・比較研究に欠かせない資料でありながら、その作成には専門的な技能と多くの時間を要します。SketchAssistは、この学術図版の作成を支援するために作られたソフトウェアです。写真から輪郭線の候補を半自動で抽出し、最後の仕上げを人の手による修正に委ねることで、専門的な技能がなくても、また限られた時間の中でも、学術的な精度を保った図版を作成できるようにすることを目指しています。このソフトはインターネット接続を必要とせず、すべての処理は手元の環境で完結します。標本や資料の画像を外部に送信することはありません。`,

    what_is_a: `SketchAssistは、昆虫・化石・考古遺物・植物など、さまざまな標本の写真から学術図版用の輪郭線を作成するためのデスクトップアプリケーションです。対象物の写真を読み込み、対象範囲の指定・不要な陰影やテクスチャの除去・輪郭候補の抽出という段階を経て、最後に人の手で仕上げの修正を行うことで、1枚の完成した線画を作り出します。全自動で「それらしい線画」を出力するのではなく、各段階で何が起きているかを確認しながら進められる点、そして最終的な判断を常に人に委ねる点が、このソフトの設計の核にあります。標本ごとに適した設定を選べる「モード」も用意されており、対象物の種類に応じて作業を始めることができます。`,

    why_diagrams: `学術研究において、写真ではなく線画(スケッチ)が図版として用いられてきたのには理由があります。写真は対象をありのままに写しますが、それは同時に、影・光沢・傷・撮影条件によるノイズなど、分類や記載にとって本質的でない情報までも余さず記録してしまうということです。線画は、観察者が対象の構造を理解した上で、重要な輪郭・境界・構造線だけを取捨選択して描き出したものであり、写真では埋もれてしまう特徴(薄い縫合線、微細な突起、重なり合った構造の境界など)を明確に示すことができます。また、同じ分類群の複数の標本を比較する際にも、線画であれば個体差や撮影条件の違いに影響されず、構造そのものを一貫した基準で比較できます。写真が「何が写っていたか」を記録するのに対し、学術図版は「何が重要であるか」を伝えるための表現である、と言えます。`,

    academic_diagram: `学術図版とは、標本や資料の形態的特徴を、線のみによって正確かつ客観的に表現した図のことです。単なる美術的なスケッチとは異なり、学術図版には明確な目的があります。すなわち、対象を見たことのない読者が、その形態的特徴を誤解なく理解できるようにすることです。そのため、学術図版では実在する構造(輪郭・境界・縫合線・脈・使用痕など)だけが描かれ、描き手の解釈や誇張、装飾的な要素は原則として含まれません。線の太さや途切れ方にも意味が持たされることが多く(例えば、確実な輪郭は太く、不確実な部分は細く、あるいは点線で示すなど)、図そのものが観察と判断の記録としての役割を担います。SketchAssistが目指しているのは、この「客観性」と「取捨選択の的確さ」を、写真からの半自動処理によって支援することです。`,

    start: `SketchAssistを使い始めるにあたって必要なものは、線画化したい対象物の写真だけです。特別な機材や追加のソフトウェアは必要なく、インストール後すぐに作業を開始できます。次の章では、画像を読み込んでから図版が完成するまでの基本的な処理の流れ(ワークフロー)を、各段階の意味とあわせて説明します。まずは手元にある標本写真を1枚用意し、実際にソフトを動かしながら読み進めることをおすすめします。`,

    workflow: `このソフトは、1枚の標本写真を4つの段階に分けて順番に処理し、最終的に学術図版として使える線画(輪郭線データ)を作り出します。全自動で一発変換するのではなく、各段階の結果を確認しながら段階的に対象を絞り込み、最後に人の手で仕上げる設計になっています。

流れは次の通りです: 画像を読み込む → 対象を投げ縄で指定する(Stage1) → 影やテクスチャを整理する(Stage2) → エッジを抽出する(Stage3) → 手書きで仕上げ修正する。エッジ抽出までで「線になり得る候補」が出そろった時点で、そこから先は自動処理に委ねず、人の目で線を選び・つなぎ・整えることで図版を完成させます。各段階の出力はプレビューで確認でき、気になる段階があれば分岐してやり直せます。`,

    modes: `「モード」は、対象物の種類(昆虫・化石・考古遺物・植物など)に応じて、各段階のパラメータをあらかじめ最適化したプリセットです。同じ処理エンジンを使っていても、対象によって「残すべき構造」と「除去すべきノイズ」が大きく異なるため(例: 昆虫の斑紋は除去したいが、化石の縫合線は残したい)、モードを切り替えることで適切な初期設定から作業を始められます。汎用モードも用意されており、当てはまるモードがない対象物や、新しい対象物向けの設定を一から作りたい場合の出発点として使えます。モードはあくまで初期値であり、各段階のパラメータは処理後にいつでも個別に調整できます。`,

    stage1: `投げ縄選択は、写真の中から「実際に線画化したい対象」だけを指定する作業です。標本写真には対象物以外に、台紙・ピン・背景・撮影用の定規など、線画には不要な要素が写り込んでいることがほとんどです。これらを最初に除外しておかないと、後続のすべての段階(影・テクスチャ除去、エッジ抽出など)がその不要な要素にも反応してしまい、無関係な線やノイズが結果に混入します。投げ縄選択では、緑(選択)で対象を囲み、必要に応じて赤(除外)で対象内の不要な穴や写り込みを取り除くことで、以降の処理範囲を対象物だけに限定します。この指定は最初の1回で確定ではなく、後から選択し直して分岐することもできます。`,

    stage2: `特徴線強調は、輪郭として残すべき線を目立たせるために、輪郭とは無関係な明暗のムラ(照明ムラによる陰影、テクスチャ、光沢反射、斑紋、背景の色にじみなど)を先に整理しておく段階です。エッジ抽出(Stage3)は明暗の変化を機械的に拾うため、対象物の輪郭以外の要素(木肌の質感や、光の当たり方による影など)がそのまま強いエッジとして検出されてしまうと、後工程でそれらを見分けるのが難しくなります。そこでStage2では、対象物の種類に応じて「残したい構造(縫合線・葉脈・使用痕など)」を保ちながら、「除去したいノイズ(テクスチャ・陰影ムラ・ハイライト反射・斑紋など)」だけを選択的に平滑化します。これにより、次のエッジ抽出の精度と、その後の手書き修正のしやすさが大きく向上します。`,

    stage3: `エッジ抽出は、Stage2で整理した画像から「線として拾うべき輪郭の候補」をできるだけ多く検出する段階です。この段階ではまだ「重要な線かどうか」の取捨選択は行わず、見落としを避けることを優先します(再現率優先)。複数の色チャンネル・複数のぼかしスケールでエッジ検出を行い、その一致度を投票のように積み上げることで、単一のエッジ検出だけでは拾いきれない微弱な輪郭も含めた「エッジ強度マップ」を作ります。ここではまだ線を1本の輪郭としてつなげたり、不要な断片を取り除いたりはしません。それらの判断は自動処理には委ねず、この直後の手書き修正で人が行います。Stage3はあくまで「線になり得る画素」を漏れなく洗い出すための土台作りです。`,

    stage4: `手書き修正は、Stage3で抽出されたエッジ強度マップをもとに、最終的な輪郭線を人の手で描き起こす仕上げの工程です。エッジ抽出の時点では、線同士のつながりや、どの線が本当に輪郭として重要かはまだ判定されていません。影の重なりや線の絡み合いが激しい箇所、あるいは元の写真自体に情報が乏しい箇所では、機械的な線のつなぎ合わせや取捨選択がかえって誤りを生みやすいため、この判断は自動化せず、Stage3の結果を下敷きにしながら人の目と手で行います。エッジ抽出で洗い出された候補の中から必要な線を選び、途切れた線をつなぎ、不要な線を取り除くことで、学術図版として提出できる精度の輪郭線に仕上げます。`,

    use_cases: `SketchAssistは、形態の輪郭を線画として記録する必要がある研究分野であれば、幅広く活用できます。現在、昆虫・化石・考古遺物・植物の4つのモードを用意していますが、これは「この4分野にしか使えない」という意味ではなく、写真から輪郭線を抽出するという処理の性質上、特に相性の良い代表例として選んだものです。

昆虫分類学: 標本の外形・脚・触角・翅の境界線を抽出し、記載論文用の同定図や比較図を作成する用途を想定しています。斑紋や外骨格の光沢反射をノイズとして除去しつつ、細い脚や触角の輪郭を保持することに重点を置いています。

古生物学: 化石表面の縫合線・成長線・条線など、母岩や風化の影響で写真からは判読しにくい低コントラストな構造を捉えることを想定しています。母岩の除去や、破断面に残る深い陰影の持ち上げなど、化石特有の課題に対応しています。

考古学: 遺物の割れ目・文様・使用痕・器形の輪郭線を記録する用途を想定しています。使用痕や刻線のような、観察者の判断が特に重要になる構造を保持しながら、撮影背景の写り込みなどを除去します。

植物学: 葉脈・樹皮・節・花器官・果実表面の構造線を記録する用途を想定しています。他のモードとは異なり、テクスチャそのものが重要な観察対象になることが多いため、除去よりも保持を優先した設定になっています。

これら以外の対象物であっても、汎用モードを起点に設定を調整することで、輪郭線の抽出を試すことができます。新しい分野向けの設定を作りたい場合は、既存のモードの設定を参考にしながら独自の設定を組み立てることも可能です。`,

    using_a: `ここからは、実際にSketchAssistを操作しながら図版を作成する際の実践的な進め方を説明します。基本的な処理の流れ(ワークフロー)についてはすでに前章で説明した通りですが、実際の作業では、各段階を1回で完璧に終わらせる必要はありません。プレビューを確認しながら、必要に応じて前の段階に戻ってやり直す(分岐する)ことが、このソフトの通常の使い方です。

作業を始める際は、まず対象物の種類に近いモードを選び、そのままの初期設定で一通り最後まで進めてみることをおすすめします。細部を調整する前に全体の結果を見ることで、その標本にとって何が課題になりそうか(影が強すぎるのか、対象と背景の境界が曖昧なのか、輪郭が薄すぎるのか)が把握しやすくなります。全体の流れを一度確認したあとで、課題が見つかった段階に戻り、パラメータを調整しながら分岐して結果を比較していくと、無駄な手戻りが少なくなります。

投げ縄選択の段階は、後続のすべての処理に影響するため、多少時間をかけてでも対象物の範囲を丁寧に指定することをおすすめします。特徴線強調の段階では、一度に強い設定をかけるのではなく、まず標準的な設定で結果を見てから、残しすぎている、あるいは消えすぎている部分に応じて調整していくと、意図しない構造の消失を避けやすくなります。エッジ抽出の段階では、線が多少過剰に出ていても問題ありません。この段階での目的は候補を漏れなく出すことであり、取捨選択は次の手書き修正で行うためです。

最後の手書き修正では、エッジ抽出の結果を下敷きにしながら、必要な線を選び、途切れた線をつなぎ、不要な線を取り除いて図版を仕上げます。この段階の判断基準は、あくまで観察対象や研究の目的に即したものであるべきであり、SketchAssistはその判断を助けるための土台を提供するに留まります。最終的な図版の正しさを担保するのは、常に描き手自身の観察と判断です。`,

    faq: `このセクションには、通常であればユーザーの皆様から寄せられた質問とその回答をまとめる予定です。しかし、SketchAssistは公開されたばかりであり、現時点ではまだ十分な数のお問い合わせや使用時のフィードバックが蓄積されていません。実際に寄せられた疑問や困りごとを反映しないまま、想定だけでFAQを作成してしまうと、実際の利用者が抱える疑問とずれた内容になりかねないため、現時点では意図的に空の状態としています。

今後、実際の利用者の方々から寄せられた質問や、開発中に見えてきた分かりにくい点をもとに、このセクションを順次充実させていく予定です。操作方法やモードの選び方、各段階の結果の見方などで疑問点がありましたら、お気軽にお問い合わせください。いただいた質問は、今後のFAQ作成の参考にさせていただきます。`
  },
  en: {
    intro: `Academic diagrams—line drawings that represent the outlines of specimens or artifacts—are essential materials for taxonomy, description, and comparative research, yet producing them requires specialized skill and a great deal of time. SketchAssist was built to support the creation of these academic diagrams. By semi-automatically extracting candidate contour lines from a photograph and leaving the final finishing touches to manual correction, it aims to let people create diagrams that maintain academic accuracy even without specialized skill and within limited time. This software requires no internet connection; all processing is completed locally on your own machine. Images of specimens or materials are never sent externally.`,

    what_is_a: `SketchAssist is a desktop application for creating academic diagram contour lines from photographs of specimens such as insects, fossils, archaeological artifacts, and plants. It produces a finished line drawing by taking a photograph of the subject through a series of stages—specifying the target region, removing unnecessary shadows and texture, and extracting contour candidates—before handing the final finishing touches over to manual correction. At the core of its design is the ability to check what is happening at each stage rather than automatically producing a plausible-looking line drawing outright, and the principle that final judgment is always left to the person. "Modes" tailored to different specimen types are also provided, so you can start working with settings suited to your subject.`,

    why_diagrams: `There is a reason line drawings, rather than photographs, have long been used as diagrams in academic research. A photograph faithfully captures a subject as it is, but that also means it records, without discrimination, information that is not essential to taxonomy or description—shadows, glare, scratches, noise from shooting conditions, and so on. A line drawing, by contrast, is produced only after the observer has understood the subject's structure, selecting and drawing just the important contours, boundaries, and structural lines; it can clearly show features that get buried in a photograph, such as faint sutures, minute protrusions, or the boundaries of overlapping structures. When comparing multiple specimens within the same taxon, a line drawing also allows the structure itself to be compared on a consistent basis, unaffected by individual variation or differences in shooting conditions. Where a photograph records "what was there," an academic diagram is an expression that conveys "what matters."`,

    academic_diagram: `An academic diagram is a figure that represents the morphological features of a specimen or material accurately and objectively, using lines alone. Unlike a purely artistic sketch, an academic diagram has a clear purpose: to let a reader who has never seen the subject understand its morphological features without misunderstanding. For this reason, an academic diagram depicts only structures that actually exist—outlines, boundaries, sutures, veins, wear marks, and the like—and, in principle, excludes the artist's interpretation, exaggeration, or decorative elements. Line weight and how a line is broken are also often given meaning (for example, a confirmed outline drawn thick, an uncertain portion drawn thin or as a dotted line), so the diagram itself serves as a record of observation and judgment. What SketchAssist aims to support, through semi-automated processing from a photograph, is precisely this objectivity and the accuracy of that selection process.`,

    start: `All you need to get started with SketchAssist is a photograph of the subject you want to turn into a line drawing. No special equipment or additional software is required, and you can begin working immediately after installation. The next chapter explains the basic processing flow (workflow) from loading an image to completing a diagram, along with the meaning of each stage. We recommend preparing one specimen photograph you have on hand and reading along while actually running the software.`,

    workflow: `This software processes a single specimen photograph in four sequential stages to produce a line drawing (contour data) usable as an academic diagram. Rather than converting everything automatically in one pass, it is designed to progressively narrow down the subject while letting you check the results at each stage, with the final finishing done by hand.

The flow is as follows: load the image → specify the target with the lasso tool (Stage 1) → clean up shadows and texture (Stage 2) → extract edges (Stage 3) → finish with manual correction. Once edge extraction has produced the full set of "candidates that could become lines," the process is no longer left to automation from that point on; the diagram is completed by a person selecting, connecting, and refining lines by eye. The output of each stage can be checked in the preview, and if a stage's result is unsatisfactory, you can branch from it and try again.`,

    modes: `A "mode" is a preset that pre-optimizes the parameters of each stage according to the type of subject—insect, fossil, archaeological artifact, plant, and so on. Even though the same processing engine is used, what counts as "structure to preserve" versus "noise to remove" differs greatly by subject (for example, you want to remove an insect's body pattern but preserve a fossil's sutures), so switching modes lets you start from an appropriate initial configuration. A general-purpose mode is also provided as a starting point for subjects that don't fit an existing mode, or when you want to build settings for a new subject type from scratch. Modes are only starting values—the parameters of each stage can always be adjusted individually after processing.`,

    stage1: `The lasso selection is the step where you specify, from the photograph, only the subject you actually want to turn into a line drawing. Specimen photographs almost always contain elements besides the subject itself—mounting cards, pins, backgrounds, a measurement scale used during shooting—that are unnecessary for the line drawing. If these are not excluded first, every subsequent stage (shadow and texture removal, edge extraction, and so on) will react to those unnecessary elements too, letting unrelated lines and noise creep into the result. In lasso selection, you enclose the subject in green (include), and if needed remove unwanted holes or intrusions within the subject in red (exclude), restricting the processing range that follows to the subject alone. This designation is not fixed after the first pass—you can reselect later and branch from that point.`,

    stage2: `Feature enhancement is the stage where, in order to make the lines that should remain as contours stand out, unevenness in brightness unrelated to the contours—shading from uneven lighting, texture, specular reflection, patterning, color bleed from the background, and so on—is cleaned up beforehand. Because edge extraction (Stage 3) mechanically picks up changes in brightness, if elements other than the subject's true contour (such as bark texture or shadows caused by lighting direction) are detected as strong edges as-is, it becomes difficult to distinguish them in later stages. Stage 2 therefore selectively smooths only the "noise to remove" (texture, uneven shading, highlight reflection, patterning, etc.) while preserving the "structure to keep" (sutures, veins, wear marks, etc.) appropriate to the subject type. This substantially improves both the accuracy of the following edge extraction and the ease of the manual correction that comes after it.`,

    stage3: `Edge extraction is the stage that detects, from the image cleaned up in Stage 2, as many "candidate contours that should be picked up as lines" as possible. At this stage, no selection of "which lines matter" is made yet; avoiding oversight is the priority (recall over precision). Edge detection is run across multiple color channels and multiple blur scales, and their agreement is accumulated like a vote, producing an "edge strength map" that includes even faint contours that a single edge-detection pass would miss. Lines are not yet connected into single continuous contours, nor are unnecessary fragments removed here—those decisions are not left to automated processing but are made by a person in the manual correction step immediately following. Stage 3 is, in essence, groundwork: exhaustively surfacing "pixels that could become lines."`,

    stage4: `Manual correction is the finishing step in which the final contour lines are drawn by hand, based on the edge strength map extracted in Stage 3. At the point of edge extraction, the connections between lines and which lines truly matter as contours have not yet been determined. In areas where shadows overlap heavily or lines are tangled together, or where the original photograph simply lacks information, mechanically connecting or selecting lines tends to introduce errors—so this judgment is not automated, and is instead made by human eyes and hands using the Stage 3 result as a base. By selecting the necessary lines from the candidates surfaced during edge extraction, connecting broken lines, and removing unnecessary ones, the contour lines are finished to a level of accuracy suitable for submission as an academic diagram.`,

    use_cases: `SketchAssist can be broadly applied to any research field that needs to record morphological outlines as line drawings. It currently provides four modes—insect, fossil, archaeological artifact, and plant—but this does not mean it is limited to these four fields; they were chosen as representative examples particularly well suited to the nature of extracting contours from a photograph.

Insect taxonomy: Intended for extracting the boundary lines of a specimen's outline, legs, antennae, and wings to create identification or comparison figures for descriptive papers. Emphasis is placed on removing body patterning and the glossy reflection of the exoskeleton as noise, while preserving the outlines of thin legs and antennae.

Paleontology: Intended for capturing low-contrast structures on a fossil's surface—sutures, growth lines, striations—that are hard to discern in a photograph due to the surrounding matrix rock or weathering. It addresses fossil-specific challenges such as removing the matrix rock and lifting the deep shadows left in fracture surfaces.

Archaeology: Intended for recording an artifact's cracks, patterning, use-wear marks, and vessel-shape outlines. It preserves structures—such as use-wear marks and incised lines—where the observer's judgment is especially important, while removing intrusions such as the shooting background.

Botany: Intended for recording structural lines such as leaf veins, bark, nodes, and the surface of flower organs and fruit. Unlike the other modes, texture itself is often an important object of observation here, so the settings prioritize preservation over removal.

Even for subjects outside these four, you can try extracting contour lines by adjusting settings starting from the general-purpose mode. If you want to build settings for a new field, you can also construct your own configuration using the existing modes as a reference.`,

    using_a: `From here, we describe the practical approach to creating a diagram while actually operating SketchAssist. The basic processing flow (workflow) was already explained in the previous chapter, but in practice, you don't need to finish each stage perfectly on the first attempt. Checking the preview and, when necessary, going back to an earlier stage to redo it (branching) is the normal way of using this software.

When starting a project, we recommend first choosing the mode closest to your subject type and running through the entire process once with its default settings. Seeing the overall result before adjusting details makes it easier to grasp what issues that particular specimen presents—whether shadows are too strong, the boundary between subject and background is ambiguous, or contours are too faint. After confirming the overall flow once, going back to the stage where an issue was found, adjusting parameters, and comparing results by branching reduces unnecessary rework.

Because the lasso selection stage affects every subsequent process, we recommend taking the time to carefully specify the subject's extent. For feature enhancement, rather than applying strong settings all at once, it's easier to avoid unintentionally losing structure if you first check the result with standard settings, then adjust based on whether too much is being preserved or too much is disappearing. At the edge extraction stage, it's fine if somewhat more lines than necessary appear—the goal here is to surface candidates without omission, since selection is handled in the manual correction step that follows.

In the final manual correction, using the edge extraction result as a base, you select the necessary lines, connect broken ones, and remove unnecessary ones to finish the diagram. The criteria for this judgment should always be grounded in the subject of observation and the purpose of the research; SketchAssist only provides the groundwork to help with that judgment. The final accuracy of the diagram is always guaranteed by the observation and judgment of the person drawing it.`,

    faq: `This section would normally collect questions submitted by users along with their answers. However, SketchAssist has only just been released, and at this point a sufficient volume of inquiries or usage feedback has not yet accumulated. Creating an FAQ based purely on assumptions, without reflecting the actual questions and difficulties users encounter, risks diverging from what real users are actually wondering about—so this section is intentionally left empty for now.

Going forward, we plan to gradually build out this section based on questions submitted by actual users and points of confusion that surface during development. If you have any questions about how to operate the software, how to choose a mode, or how to read the results of each stage, please feel free to get in touch. Questions we receive will be used as reference material for building out the FAQ.`
  }
};
