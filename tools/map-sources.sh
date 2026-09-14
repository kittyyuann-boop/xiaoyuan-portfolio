#!/bin/zsh
# 生成「网页编号 → 原始文件」映射表：tools/source-map.txt
#
# 用途：网站上的 p-012 到底对应源文件夹里的哪张照片？查这张表就知道。
#       只读取原始照片并写一个新文本文件，不会改动或删除任何图片。
#
# 用法：zsh tools/map-sources.sh
set -euo pipefail

# 原始照片目录：换机器/环境时用环境变量 VISUAL_SRC 覆盖
SRC="${VISUAL_SRC:-/Users/omelette/Desktop/yuyusai作品集/02摄影作品}"
ROOT="${0:A:h}/.."
OUT="$ROOT/tools/source-map.txt"
EXCLUDE_FILE="$ROOT/tools/exclude.txt"

typeset -a EXCLUDES
if [[ -f "$EXCLUDE_FILE" ]]; then
  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ -z "${line// }" || "${line:0:1}" == "#" ]] && continue
    EXCLUDES+=("$line")
  done < "$EXCLUDE_FILE"
fi

excluded() { local f=$1 e; for e in "${EXCLUDES[@]}"; do [[ "$f" == *"$e"* ]] && return 0; done; return 1; }

collect() {
  if [[ "$1" == "portrait" ]]; then
    find "$SRC" -type f -not -path "*/风景照/*" \
      \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) -print0 | sort -z
  else
    find "$SRC" -type f -path "*/风景照/*" \
      \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) -print0 | sort -z
  fi
}

{
  print -r -- "# 网页编号 → 原始文件（tools/map-sources.sh 自动生成）"
  print -r -- "# 查编号：网站上右键照片 → 复制图片地址，如 .../portrait/thumb/p-012.jpg → p-012"
  print -r -- "# p- = 人像，l- = 风景生活"
} > "$OUT"

emit() {
  local prefix=$1 mode=$2 n=0
  local -A seen
  while IFS= read -r -d '' f; do
    excluded "$f" && continue
    local h; h=$(md5 -q "$f")
    [[ -n "${seen[$h]:-}" ]] && continue
    seen[$h]=1
    n=$((n+1))
    print -r -- "${prefix}-$(printf %03d $n)	$f" >> "$OUT"
  done < <(collect "$mode")
  echo "  $mode: $n 条"
}

echo "写入 $OUT"
emit p portrait
emit l landscape
