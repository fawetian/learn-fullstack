# -*- coding: utf-8 -*-
"""runoob JS 教程解析模块。

提供：
  - get_chapters(): 从教程首页抓取所有章节（含分组）。
  - parse_section(url): 抓取一节，返回 (title, markdown, code_samples)。
"""
import urllib.request
import re
from bs4 import BeautifulSoup, NavigableString

INDEX_URL = "https://www.runoob.com/js/js-tutorial.html"


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")


def get_chapters():
    """返回 [(title, url, group), ...]，按侧边栏顺序。group 可能为 ''。"""
    html = fetch(INDEX_URL)
    soup = BeautifulSoup(html, "html.parser")
    nav = soup.find("div", id="leftcolumn")
    if not nav:
        return []

    seen = set()
    chapters = []
    current_group = ""
    for el in nav.find_all(recursive=True):
        if el.name in ("h2", "h3") and el.get_text(strip=True):
            current_group = el.get_text(strip=True)
        elif el.name == "a" and el.get("href", "").startswith("/js/"):
            t = el.get_text(strip=True)
            h = el["href"]
            if t and h not in seen:
                seen.add(h)
                chapters.append((t, "https://www.runoob.com" + h, current_group))
    return chapters


def _detect_lang(code):
    c = code.strip()
    low = c.lower()
    # 完整 HTML 文档或含 HTML body 级结构 -> html
    if low.startswith("<!doctype") or low.startswith("<html"):
        return "html"
    # 同时含 html 标签 + script/style -> html（完整页面片段）
    has_html_tag = bool(re.search(r"<(?:html|body|head|div|p|h[1-6]|form|table|ul|ol|button|input|select|label|nav|section|article)\b", c, re.I))
    has_script = bool(re.search(r"<script\b", c, re.I))
    has_style = bool(re.search(r"<style\b", c, re.I))
    if has_html_tag and (has_script or has_style):
        return "html"
    if has_html_tag:
        return "html"
    # 只有 <script> 包裹纯 JS：剥掉标签后判
    if has_script:
        inner = re.sub(r"<script[^>]*>", "", c, flags=re.I)
        inner = re.sub(r"</script>", "", inner, flags=re.I).strip()
        # 剥离后若还剩 html 标签，仍算 html 片段
        if re.search(r"<(?:div|p|span|h[1-6]|body)\b", inner, re.I):
            return "html"
        return "javascript"
    return "javascript"


def _get_code_text(node):
    hl = node.find("div", class_="hl-main")
    if hl:
        text = hl.get_text().strip()  # 关键：无分隔符，否则 token 被拆开
    else:
        text = node.get_text().strip()
    # 清除控制字符（runoob 高亮 HTML 偶有残留的 \x08 backspace 等），保留 \n \r \t
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", text)
    return text


def parse_section(url):
    """返回 (title, markdown, code_samples)。code_samples=[(lang, code), ...]"""
    html = fetch(url)
    soup = BeautifulSoup(html, "html.parser")
    content = soup.find("div", id="content")
    if not content:
        return ("", "", [])

    title = ""
    h1 = content.find("h1")
    if h1:
        title = h1.get_text(strip=True)

    lines = []
    codes = []
    h1_seen = {"v": False}  # 闭包可变标记：跳过正文首个 h1（它与页面标题重复）

    def walk(node):
        for child in node.children:
            if isinstance(child, NavigableString):
                continue
            if isinstance(child, str):
                continue
            nm = child.name
            if nm == "h1":
                t = child.get_text(strip=True)
                if not h1_seen["v"]:
                    # 首个 h1 = 页面主标题，已作为 Notion 页面 title，正文不重复输出
                    h1_seen["v"] = True
                    continue
                if t:
                    lines.append(f"\n# {t}\n")
            elif nm == "h2":
                t = child.get_text(" ", strip=True)
                if t:
                    lines.append(f"\n## {t}\n")
            elif nm in ("h3", "h4"):
                t = child.get_text(" ", strip=True)
                if t:
                    lines.append(f"\n### {t}\n")
            elif nm == "p":
                t = child.get_text(" ", strip=True)
                if t:
                    lines.append(f"\n{t}\n")
            elif nm == "div" and "example_code" in (child.get("class") or []):
                code = _get_code_text(child)
                if code:
                    lang = _detect_lang(code)
                    lines.append(f"\n```{lang}\n{code}\n```\n")
                    codes.append((lang, code))
            elif nm == "pre":
                code = child.get_text().strip()
                if code:
                    lang = _detect_lang(code)
                    lines.append(f"\n```{lang}\n{code}\n```\n")
                    codes.append((lang, code))
            elif nm == "ul":
                for li in child.find_all("li", recursive=False):
                    t = li.get_text(" ", strip=True)
                    if t:
                        lines.append(f"- {t}")
                lines.append("")
            elif nm == "ol":
                for i, li in enumerate(child.find_all("li", recursive=False), 1):
                    t = li.get_text(" ", strip=True)
                    if t:
                        lines.append(f"{i}. {t}")
                lines.append("")
            elif nm == "table" and "lamp" in (child.get("class") or []):
                # runoob 提示框：取 td 文字，转 blockquote
                tds = child.find_all("td")
                txt = " ".join(td.get_text(" ", strip=True) for td in tds).strip()
                if txt:
                    lines.append(f"\n> 💡 {txt}\n")
            elif nm == "table":
                # 普通表格
                rows = child.find_all("tr")
                rendered = False
                for ri, row in enumerate(rows):
                    cells = [td.get_text(" ", strip=True) for td in row.find_all(["th", "td"])]
                    cells = [c for c in cells if c != ""]
                    if not cells:
                        continue
                    lines.append("| " + " | ".join(cells) + " |")
                    if not rendered:
                        lines.append("| " + " | ".join(["---"] * len(cells)) + " |")
                        rendered = True
                if rendered:
                    lines.append("")
            elif nm in ("div", "section", "article", "blockquote", "figure", "span"):
                walk(child)

    walk(content)
    md = "\n".join(lines)
    md = re.sub(r"\n{3,}", "\n\n", md).strip()
    return (title, md, codes)


if __name__ == "__main__":
    import sys
    chs = get_chapters()
    print(f"Total chapters: {len(chs)}")
    if len(sys.argv) > 1:
        url = sys.argv[1]
        title, md, codes = parse_section(url)
        print("TITLE:", title)
        print("CODES:", len(codes))
        print(md[:1000])
