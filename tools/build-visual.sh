#!/bin/zsh
# 生成 Visual Archive 图库
#
#   1. 从源目录收集图片（人像 = 除「风景照」外全部；风景 = 「风景照」文件夹）
#   2. 按 MD5 去重；跳过 tools/exclude.txt 里的照片
#   3. 生成两套尺寸：full（最长边 1600）/ thumb（最长边 1000），比例与原图一致
#   4. 生成 assets/visual/gallery.js 清单（含宽高与原始文件溯源）
#
# 实际逻辑在 tools/build-visual.py：用 Pillow 处理，会按 EXIF 方向纠正画面，
# 竖拍照片不会再被当成横图显示（sips 方案会有这个问题，已弃用）。
#
# 用法：zsh tools/build-visual.sh
set -euo pipefail

ROOT="${0:A:h}/.."

# 找一个装了 Pillow 的 python
PY=""
for cand in "/Users/omelette/.workbuddy/binaries/python/envs/default/bin/python" \
            "python3" "python"; do
  if command -v "$cand" >/dev/null 2>&1 && "$cand" -c "import PIL" >/dev/null 2>&1; then
    PY="$cand"
    break
  fi
done

if [[ -z "$PY" ]]; then
  echo "需要 Pillow 才能生成图库，先安装："
  echo "  pip install pillow"
  exit 1
fi

exec "$PY" "$ROOT/tools/build-visual.py"
