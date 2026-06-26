# -*- coding: utf-8 -*-
"""把 runoob JS 教程同步到 Notion + 本地代码目录。

用法:
  python runoob_sync.py            # 全量同步
  python runoob_sync.py --dry-run  # 只解析不写 Notion，预览
  python runoob_sync.py --only 3   # 只处理第 N 节（1-based）
  python runoob_sync.py --resume   # 跳过已完成的节

环境:
  - 需要 ntn 已登录（NOTION_API_TOKEN 或 ntn login）。
  - 使用 venv 的 bs4: /tmp/ntn_env/bin/python 运行本脚本。
"""
import os
import re
import sys
import json
import subprocess
import unicodedata

sys.path.insert(0, "/tmp")
from runoob_parse import get_chapters, parse_section

PARENT_PAGE_ID = "38b445a7-c061-8094-b6fa-c03c7982a084"
CODE_ROOT = "/Users/zhihu/code/m_code/fullstack/learn-fullstack/js/runoob"
STATE_FILE = "/tmp/runoob_sync_state.json"


# ---------- 工具 ----------
def slugify(s):
    """把中文/英文标题转成安全的目录名（保留中文，去掉标点/空格）。"""
    s = s.strip()
    # 去掉常见标点
    s = re.sub(r"[\\/:*?\"<>|\(\)（）【】\[\],，。.!！?？;；:：'`]+", "", s)
    s = re.sub(r"\s+", "_", s)
    return s[:50] or "section"


def run_ntn_create(parent_id, title, body_md):
    """创建 Notion 子页面，返回 page_id。

    分两步以稳定设置页面标题（不依赖 markdown 首个 H1 的脆弱提取）：
      1. 用 API 创建空页面并显式设置 properties.title。
      2. 用 ntn pages update 写入正文 markdown（正文不含 H1，避免与标题冲突）。
    """
    # 1) 创建带标题的空页面
    create_body = json.dumps(
        {
            "parent": {"page_id": parent_id},
            "properties": {"title": [{"text": {"content": title}}]},
        },
        ensure_ascii=False,
    )
    proc = subprocess.run(
        ["ntn", "api", "v1/pages"],
        input=create_body,
        capture_output=True,
        text=True,
    )
    if proc.returncode != 0 or not proc.stdout.strip():
        raise RuntimeError(f"api create failed: rc={proc.returncode} stderr={proc.stderr!r}")
    try:
        page_id = json.loads(proc.stdout)["id"]
    except Exception:
        raise RuntimeError(f"api create: 无法解析 page id, stdout={proc.stdout[:200]!r}")

    # 2) 写入正文
    if body_md.strip():
        proc2 = subprocess.run(
            ["ntn", "pages", "update", page_id],
            input=body_md,
            capture_output=True,
            text=True,
        )
        if proc2.returncode != 0:
            raise RuntimeError(
                f"pages update failed: rc={proc2.returncode} stderr={proc2.stderr!r}"
            )
    return page_id


def load_state():
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE) as f:
                return json.load(f)
        except Exception:
            return {}
    return {}


def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, ensure_ascii=False, indent=2)


def write_code_files(dirpath, codes, section_title):
    """把代码样本写入子目录。返回写入的文件列表。"""
    os.makedirs(dirpath, exist_ok=True)
    written = []
    for i, (lang, code) in enumerate(codes, 1):
        ext = "html" if lang == "html" else "js"
        fn = f"demo{i}.{ext}"
        path = os.path.join(dirpath, fn)
        with open(path, "w", encoding="utf-8") as f:
            f.write(code.rstrip() + "\n")
        written.append(fn)
    # 写一个 README
    readme = os.path.join(dirpath, "README.md")
    with open(readme, "w", encoding="utf-8") as f:
        f.write(f"# {section_title}\n\n")
        f.write(f"本节共 {len(codes)} 个代码示例（按教程出现顺序编号）。\n\n")
        if written:
            f.write("代码文件：\n")
            for fn in written:
                f.write(f"- `{fn}`\n")
        f.write("\n> .html 文件可直接用浏览器打开运行；.js 文件可用 node 运行或嵌入 html 查看。\n")
    return written


# ---------- 主流程 ----------
def main():
    args = set(sys.argv[1:])
    dry_run = "--dry-run" in args
    resume = "--resume" in args
    only = None
    for a in sys.argv[1:]:
        if a.startswith("--only="):
            only = int(a.split("=", 1)[1])
        elif a == "--only" and sys.argv.index(a) + 1 < len(sys.argv):
            try:
                only = int(sys.argv[sys.argv.index(a) + 1])
            except ValueError:
                pass

    chapters = get_chapters()
    print(f"[info] 共 {len(chapters)} 节")
    state = load_state()

    os.makedirs(CODE_ROOT, exist_ok=True)

    total_code = 0
    for idx, (title, url, group) in enumerate(chapters, 1):
        if only and idx != only:
            continue
        # 目录页跳过代码、但仍然建页面
        key = url
        if resume and key in state:
            print(f"[{idx:2d}/{len(chapters)}] SKIP (done): {title}")
            continue

        print(f"\n[{idx:2d}/{len(chapters)}] {title}  ({group or '基础'})")
        print(f"        url: {url}")
        try:
            sec_title, md, codes = parse_section(url)
        except Exception as e:
            print(f"        !! 解析失败: {e}")
            continue

        if not sec_title:
            sec_title = title
        # 页面标题：用导航标题（空格更规范），统一规整多余空白
        nav_title = re.sub(r"\s+", " ", title).strip()
        page_title = f"{idx:02d}. {nav_title}"
        # 子目录与本地引用用规整后的导航标题
        sec_title = nav_title
        print(f"        解析: md={len(md)} 字符, 代码={len(codes)} 个")
        total_code += len(codes)

        # 1) 提取代码到本地
        slug = slugify(sec_title)
        codedir = os.path.join(CODE_ROOT, f"{idx:02d}-{slug}")
        written = write_code_files(codedir, codes, sec_title)
        if written:
            print(f"        代码 -> {codedir} ({', '.join(written)})")

        # 2) 在 markdown 末尾追加「本地代码」提示
        if written:
            rel = os.path.relpath(codedir, CODE_ROOT)
            md += f"\n\n---\n\n📂 **本节实例代码**已保存到本地目录 `js/runoob/{rel}/`，可直接运行：\n"
            for fn in written:
                md += f"- `{rel}/{fn}`\n"

        if dry_run:
            print(f"        [dry-run] 将创建页面: {page_title}")
            continue

        # 3) 创建 Notion 子页面
        try:
            page_id = run_ntn_create(PARENT_PAGE_ID, page_title, md)
            print(f"        ✅ Notion 页面创建: {page_id}")
            state[key] = {
                "idx": idx,
                "title": sec_title,
                "page_id": page_id,
                "group": group,
                "code_dir": codedir,
                "code_count": len(codes),
            }
            save_state(state)
        except Exception as e:
            print(f"        !! Notion 创建失败: {e}")

    print(f"\n[done] 处理完成。代码示例总数: {total_code}")
    print(f"[done] 代码根目录: {CODE_ROOT}")
    if state:
        print(f"[done] 状态文件: {STATE_FILE} ({len(state)} 节已记录)")


if __name__ == "__main__":
    main()
