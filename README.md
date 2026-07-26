# サンプル画像の配置ルール

Try画面の各ステージに実画像を表示するには、以下の命名規則でファイルを配置してください。
コード側の変更は不要です（パスを見つけられればそのまま表示されます）。

パス形式:
assets/samples/{mode}/{sample}/{stage}.jpg

mode:   insect | plant | fossil | artifact
sample: sample1 | sample2 | sample3
stage:  original | lasso | feature | edge | line | svg | handfix

例:
assets/samples/insect/sample1/original.jpg
assets/samples/insect/sample1/lasso.jpg
assets/samples/insect/sample1/feature.jpg
assets/samples/insect/sample1/edge.jpg
assets/samples/insect/sample1/line.jpg
assets/samples/insect/sample1/svg.jpg
assets/samples/insect/sample1/handfix.jpg

画像が未配置のステージは、代わりにプレースホルダー表示（期待されるファイルパスの案内）が出ます。
