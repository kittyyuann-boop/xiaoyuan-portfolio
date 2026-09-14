#!/bin/zsh
# 从作品集网站里去掉一张照片（原始照片不动，不删源文件）
#
# 用法：zsh tools/remove-visual.sh p-012
#
# 编号怎么查：网站上右键那张照片 →「复制图片地址」
#             地址里 .../portrait/thumb/p-012.jpg 的 p-012 就是编号
#             （人像 p-###，风景生活 l-###）
#
# 做了什么：查 tools/source-map.txt 找到原始文件 → 写进 tools/exclude.txt
#          → 提示你重建图库。原始照片不会被删、不会被改。
# 想恢复：打开 tools/exclude.txt 删掉那行（或前面加 #），再重建图库
set -euo pipefail

ROOT="${0:A:h}/.."
ID=${1:-}

if [[ -z "$ID" ]]; then
  echo "用法：zsh tools/remove-visual.sh <编号>   例如 p-012 / l-045"
  exit 1
fi

MAP="$ROOT/tools/source-map.txt"
G="$ROOT/assets/visual/gallery.js"
SRC=""

# 优先查映射表，其次查 gallery.js 里记录的原始路径（s 字段）
if [[ -f "$MAP" ]]; then
  SRC=$(awk -F'\t' -v id="$ID" '$1 == id { print $2; exit }' "$MAP")
fi
if [[ -z "$SRC" && -f "$G" ]]; then
  SRC=$(grep -o "{f:'[^']*/${ID}\.jpg'.*" "$G" | head -1 | grep -o 's:"[^"]*"' | sed 's/^s:"//; s/"$//')
fi

if [[ -z "$SRC" ]]; then
  echo "没找到编号 ${ID}。确认写法（人像 p-###，风景生活 l-###）；"
  echo "映射表不存在或过时就先跑一次：zsh tools/map-sources.sh"
  exit 1
fi

if ! grep -Fxq "$SRC" "$ROOT/tools/exclude.txt" 2>/dev/null; then
  print -r -- "$SRC" >> "$ROOT/tools/exclude.txt"
fi

echo "已加入排除名单：${SRC}"
echo ""
echo "现在重建图库让它生效："
echo "  zsh tools/build-visual.sh"
echo ""
echo "（重建只会覆盖 assets/visual/ 下生成的副本，不会碰原始照片）"
