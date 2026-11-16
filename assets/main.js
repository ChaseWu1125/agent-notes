// Agent 學習卡 — 共用腳本：首頁卡片列表、分類篩選、上一頁/下一頁
// 資料來源：data/pages.js（window.PAGES）。規則見 AGENTS.md。
(function () {
  var pages = window.PAGES || [];

  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }

  // ---- 首頁：卡片列表 ----
  var list = document.getElementById("cards");
  if (list) {
    function render(cat) {
      list.innerHTML = "";
      pages.forEach(function (p, i) {
        if (cat && p.category !== cat) return;
        var li = el("li");
        var a = el("a", { class: "card", href: "pages/" + p.slug + ".html" });
        var meta = el("div", { class: "meta" });
        meta.appendChild(el("span", { class: "tag", "data-cat": p.category }, p.category));
        meta.appendChild(el("span", { class: "num" }, "W" + p.week + " · #" + String(i + 1).padStart(2, "0")));
        a.appendChild(meta);
        a.appendChild(el("h2", null, p.title));
        a.appendChild(el("p", null, p.summary));
        li.appendChild(a);
        list.appendChild(li);
      });
    }

    var filters = document.getElementById("filters");
    var cats = ["全部"];
    pages.forEach(function (p) { if (cats.indexOf(p.category) < 0) cats.push(p.category); });
    cats.forEach(function (c, i) {
      var b = el("button", { type: "button", "aria-pressed": i === 0 ? "true" : "false" }, c);
      b.addEventListener("click", function () {
        filters.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        render(c === "全部" ? null : c);
      });
      filters.appendChild(b);
    });

    var count = document.getElementById("count");
    if (count) count.textContent = pages.length;
    render(null);
  }

  // ---- 內頁：上一頁/下一頁 ----
  var pager = document.querySelector(".pager[data-slug]");
  if (pager) {
    var idx = -1;
    pages.forEach(function (p, i) { if (p.slug === pager.dataset.slug) idx = i; });
    if (idx < 0) return;
    var prev = pages[idx - 1], next = pages[idx + 1];
    if (prev) {
      var a = el("a", { class: "prev", href: prev.slug + ".html" });
      a.appendChild(el("small", null, "← 上一張"));
      a.appendChild(document.createTextNode(prev.title));
      pager.appendChild(a);
    }
    if (next) {
      var b = el("a", { class: "next", href: next.slug + ".html" });
      b.appendChild(el("small", null, "下一張 →"));
      b.appendChild(document.createTextNode(next.title));
      pager.appendChild(b);
    }
  }
})();
