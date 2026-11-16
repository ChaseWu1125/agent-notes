"""Agent 學習卡 — 完成前檢查（AGENTS.md 第 9 節）

用法：在專案根目錄執行  python scripts/check.py
全部通過時結束碼為 0；有任何失敗則列出原因並以結束碼 1 結束。
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CATEGORIES = {"概念", "方法", "工具", "案例"}
SUMMARY_MAX = 30
TLDR_MAX = 40

errors = []


def fail(where, msg):
    errors.append(f"[{where}] {msg}")


def load_pages():
    js = (ROOT / "data/pages.js").read_text(encoding="utf-8")
    blocks = re.findall(r"\{(.*?)\}", js, flags=re.S)
    pages = []
    for b in blocks:
        entry = dict(re.findall(r'(\w+):\s*"(.*?)"', b))
        week = re.search(r"week:\s*(\d+)", b)
        entry["week"] = int(week.group(1)) if week else None
        pages.append(entry)
    return pages


def main():
    pages = load_pages()
    slugs = [p.get("slug") for p in pages]

    for dup in {s for s in slugs if slugs.count(s) > 1}:
        fail("pages.js", f"slug 重複：{dup}")

    for p in pages:
        slug = p.get("slug", "?")
        for key in ("slug", "title", "summary", "category", "date"):
            if not p.get(key):
                fail(slug, f"pages.js 缺少欄位 {key}")
        if p["week"] is None:
            fail(slug, "pages.js 缺少欄位 week")
        if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", slug):
            fail(slug, "slug 只能用英文小寫、數字和 -")
        if p.get("category") not in CATEGORIES:
            fail(slug, f"分類不合法：{p.get('category')}（只能是 {'、'.join(sorted(CATEGORIES))}）")
        if len(p.get("summary", "")) > SUMMARY_MAX:
            fail(slug, f"summary 超過 {SUMMARY_MAX} 字（目前 {len(p['summary'])}）")
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", p.get("date", "")):
            fail(slug, "date 格式須為 YYYY-MM-DD")

        f = ROOT / "pages" / f"{slug}.html"
        if not f.exists():
            fail(slug, f"找不到檔案 pages/{slug}.html")
            continue
        h = f.read_text(encoding="utf-8")
        title = p.get("title", "")

        h1 = re.search(r"<h1>(.*?)</h1>", h)
        if not h1 or h1.group(1) != title:
            fail(slug, "<h1> 與 pages.js 的 title 不一致")
        if f"<title>{title}｜Agent 學習卡</title>" not in h:
            fail(slug, "<title> 格式須為「頁面標題｜Agent 學習卡」")
        pager = re.search(r'class="pager" data-slug="(.*?)"', h)
        if not pager or pager.group(1) != slug:
            fail(slug, "<nav class=\"pager\"> 的 data-slug 與檔名不一致")
        tag = re.search(r'class="tag" data-cat="(.*?)"', h)
        if not tag or tag.group(1) != p.get("category"):
            fail(slug, "頁面分類標籤與 pages.js 不一致")
        tldr = re.search(r'<p class="tldr">(.*?)</p>', h)
        if not tldr:
            fail(slug, "缺少一句話重點 <p class=\"tldr\">")
        elif len(tldr.group(1)) > TLDR_MAX:
            fail(slug, f"一句話重點超過 {TLDR_MAX} 字（目前 {len(tldr.group(1))}）")
        if 'class="recap"' not in h:
            fail(slug, "缺少重點回顧 <section class=\"recap\">")
        else:
            recap = h.split('class="recap"', 1)[1].split("</section>", 1)[0]
            n = recap.count("<li>")
            if not 3 <= n <= 5:
                fail(slug, f"重點回顧須 3～5 條（目前 {n}）")
        n_sec = len(re.findall(r"<section>", h))
        if not 2 <= n_sec <= 4:
            fail(slug, f"內容段落 <section> 須 2～4 個（目前 {n_sec}）")
        if "{{" in h or "}}" in h:
            fail(slug, "殘留 {{ }} 佔位文字")
        if re.search(r"\sstyle=", h):
            fail(slug, "不可使用 inline style")
        if "../assets/style.css" not in h or "../data/pages.js" not in h or "../assets/main.js" not in h:
            fail(slug, "CSS / JS 路徑須為 ../assets/… 與 ../data/pages.js")
        for m in re.finditer(r'<a href="(https?://[^"]+)"([^>]*)>', h):
            if 'target="_blank"' not in m.group(2) or 'rel="noopener"' not in m.group(2):
                fail(slug, f"外部連結須加 target=\"_blank\" rel=\"noopener\"：{m.group(1)}")
        for m in re.finditer(r'href="([^":#]+\.html)"', h):
            target = (f.parent / m.group(1)).resolve()
            if not target.exists():
                fail(slug, f"站內連結失效：{m.group(1)}")

    listed = set(slugs)
    for f in (ROOT / "pages").glob("*.html"):
        if f.stem != "_template" and f.stem not in listed:
            fail(f.name, "頁面未登記在 data/pages.js")

    if errors:
        print(f"✗ 檢查失敗（{len(errors)} 項）：")
        for e in errors:
            print("  -", e)
        return 1
    print(f"✓ 全部通過：{len(pages)} 張學習卡")
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main())
