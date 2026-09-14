#!/usr/bin/env python3
# 生成 Visual Archive 图库（替代 sips 方案）
#
# 相比 sips 的关键改进：正确处理手机照片的 EXIF 方向。
# 竖拍的照片在文件里其实是横着存的，靠一个"旋转 90°"的标记让手机正确显示。
# 如果压缩时没把旋转真正做进画面，浏览器就会把它当横图 —— 竖图变横图。
# 这里用 ImageOps.exif_transpose 把旋转烤进像素，并清掉方向标记。
#
# 用法：python3 tools/build-visual.py（需要 pillow）
import os, re, sys, glob, hashlib
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# 原始照片目录：换机器/环境时用环境变量 VISUAL_SRC 覆盖，默认仍是本机原始路径。
# 注意：网站里用的是 assets/visual/ 下生成的副本，源目录只用于重新跑流水线。
SRC = os.environ.get('VISUAL_SRC', '/Users/omelette/Desktop/yuyusai作品集/02摄影作品')
DST = os.path.join(ROOT, 'assets/visual')
EXCLUDE_FILE = os.path.join(ROOT, 'tools', 'exclude.txt')

FULL_MAX, FULL_Q = 1600, 70      # 灯箱用
THUMB_MAX, THUMB_Q = 1000, 66    # 网格展示用
EXTS = ('.jpg', '.jpeg', '.png', '.webp')


def load_excludes():
    out = []
    if os.path.exists(EXCLUDE_FILE):
        with open(EXCLUDE_FILE, encoding='utf-8') as fh:
            for line in fh:
                line = line.strip()
                if line and not line.startswith('#'):
                    out.append(line)
    return out


def collect(mode):
    """portrait = 除「风景照」外全部；landscape = 仅「风景照」"""
    files = []
    for dirpath, _, filenames in os.walk(SRC):
        is_landscape = '风景照' in dirpath
        if (mode == 'landscape') != is_landscape:
            continue
        for fn in filenames:
            if fn.lower().endswith(EXTS):
                files.append(os.path.join(dirpath, fn))
    return sorted(files)


def md5(path):
    h = hashlib.md5()
    with open(path, 'rb') as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b''):
            h.update(chunk)
    return h.hexdigest()


def save_variants(src_path, prefix, index):
    name = f'{prefix}-{index:03d}'
    img = Image.open(src_path)
    img = ImageOps.exif_transpose(img)          # 按 EXIF 方向纠正画面
    if img.mode not in ('RGB', 'L'):
        img = img.convert('RGB')
    w, h = img.size

    full = img.copy()
    full.thumbnail((FULL_MAX, FULL_MAX), Image.LANCZOS)
    full.save(os.path.join(DST, prefix_dir(prefix), 'full', name + '.jpg'),
              'JPEG', quality=FULL_Q, optimize=True, progressive=True)

    thumb = img.copy()
    thumb.thumbnail((THUMB_MAX, THUMB_MAX), Image.LANCZOS)
    thumb.save(os.path.join(DST, prefix_dir(prefix), 'thumb', name + '.jpg'),
               'JPEG', quality=THUMB_Q, optimize=True, progressive=True)

    return name, full.size[0], full.size[1]


def prefix_dir(prefix):
    return 'portrait' if prefix == 'p' else 'landscape'


def build(mode, prefix):
    os.makedirs(os.path.join(DST, prefix_dir(prefix), 'full'), exist_ok=True)
    os.makedirs(os.path.join(DST, prefix_dir(prefix), 'thumb'), exist_ok=True)
    excludes = load_excludes()
    seen, entries, dup, skip = set(), [], 0, 0
    n = 0
    for path in collect(mode):
        if any(e in path for e in excludes):
            skip += 1
            continue
        digest = md5(path)
        if digest in seen:
            dup += 1
            continue
        seen.add(digest)
        n += 1
        name, w, h = save_variants(path, prefix, n)
        rel = f"{prefix_dir(prefix)}/full/{name}.jpg"
        rel_t = f"{prefix_dir(prefix)}/thumb/{name}.jpg"
        entries.append(f"  {{f:'{rel}',t:'{rel_t}',w:{w},h:{h},s:\"{path}\"}},")
    print(f'  {prefix_dir(prefix)}: {n} 张（去重跳过 {dup} 张，排除名单跳过 {skip} 张）')
    return entries


def main():
    if not os.path.isdir(SRC):
        sys.exit(f'找不到源目录：{SRC}')
    portrait = build('portrait', 'p')
    landscape = build('landscape', 'l')

    out = [
        '// 自动生成：tools/build-visual.sh —— 请勿手工编辑',
        '// 图源：~/Desktop/yuyusai作品集/02摄影作品（人像 / 风景生活）',
        '// 已按 EXIF 方向纠正画面，竖拍照片不会再变成横图',
        'window.VISUAL_GALLERY = {',
        'portrait: [', *portrait, ']',
        ',',
        'landscape: [', *landscape, ']',
        '};',
    ]
    gallery = os.path.join(DST, 'gallery.js')
    with open(gallery, 'w', encoding='utf-8') as fh:
        fh.write('\n'.join(out) + '\n')

    # 清理：只删新清单里查不到的旧文件，逐个删除
    text = '\n'.join(out)
    removed = 0
    for path in sorted(glob.glob(os.path.join(DST, '*', '*', '*.jpg'))):
        if os.path.basename(path) not in text:
            os.remove(path)
            removed += 1
    print(f'  清理旧文件：{removed} 个')
    print(f'完成：{gallery}  （共 {len(portrait) + len(landscape)} 张）')


if __name__ == '__main__':
    main()
