# AGENTS.md — 「Agent 學習卡」專案員工手冊

> 每次開始工作前，請先完整讀完這份文件。
> 這份文件是本專案唯一的規則來源；若與對話中的臨時指示衝突，以使用者在對話中的明確指示為準，並提醒使用者是否要更新本文件。

---

## 1. 專案目的

「Agent 學習卡」是一個**靜態筆記網站**，把 AI / AI Agent 課程的重點整理成一張一張「學習卡」（每張卡 = 一個 HTML 頁面）。

- **讀者**：修課同學與未來複習的自己，具備基本電腦能力、但不一定會寫程式。
- **目標**：每一頁 3 分鐘內讀完，讀完能說出「這個概念是什麼、為什麼重要、怎麼用」。
- **長期目標**：每週上完課，把筆記丟進 `raw/`，請 AI 依本手冊產生新的一頁，網站就會自動長大。

## 2. 技術限制（不可違反）

- 純 **HTML + CSS + 原生 JavaScript**，不使用任何框架、建置工具或 npm 套件。
- 不載入外部 JS；字型只可使用 Google Fonts（目前用 `Noto Sans TC`）。
- 必須能**直接雙擊 `index.html` 在本機開啟**（因此頁面清單用 `data/pages.js`，不要改成 `fetch` JSON）。
- 部署於 **GitHub Pages**（`main` 分支根目錄），所有連結一律用**相對路徑**。
- 全站使用**繁體中文（台灣用語）**；專有名詞第一次出現時附英文，例如「代理（Agent）」。

## 3. 檔案結構

```
.
├── AGENTS.md           ← 本手冊（通用 AI 讀這份）
├── CLAUDE.md           ← 只有一行，引用 AGENTS.md（給 Claude Code）
├── README.md           ← 給人看的專案介紹
├── index.html          ← 首頁：自動依 data/pages.js 產生卡片列表
├── data/
│   └── pages.js        ← ★ 全站頁面清單（唯一的目錄來源）
├── pages/
│   ├── _template.html  ← ★ 新頁面模板，新增頁面一律從這裡複製
│   └── <slug>.html     ← 各學習卡頁面
├── raw/
│   └── <週次>-<主題>.md ← 原始筆記／素材（AI 只讀，不改）
├── scripts/
│   └── check.py        ← ★ 完成前檢查腳本（第 9 節）
└── assets/
    ├── style.css       ← 全站唯一樣式表
    └── main.js         ← 首頁卡片渲染、上一頁／下一頁、篩選
```

## 4. 命名規則

| 項目 | 規則 | 範例 |
|---|---|---|
| 頁面檔名（slug） | 英文小寫、單字用 `-` 連接、不含週次 | `pages/harness.html` |
| 原始筆記 | `週次兩位數-主題.md` | `raw/09-agentic-work.md` |
| 圖片 | 放 `assets/img/`，檔名 `<slug>-<描述>.png` | `assets/img/harness-diagram.png` |
| CSS class | 小寫加 `-`，沿用 `style.css` 既有 class，**不要新增 inline style** | `callout`, `compare` |

## 5. 頁面清單 `data/pages.js`

首頁、上一頁/下一頁、分類篩選全部讀這個檔案。**新增、改名或刪除頁面時一定要同步修改。**

```js
{
  slug: "harness",              // 與 pages/<slug>.html 檔名一致
  title: "Harness：AI 的工作裝備", // 與頁面 <h1> 一致
  summary: "一句話說明，30 字以內。",
  category: "概念",              // 只能是：概念、方法、工具、案例
  week: 9,                      // 課程週次（數字）
  date: "2026-11-16"            // 建立日期 YYYY-MM-DD
}
```

- 陣列順序 = 網站閱讀順序（上一頁/下一頁依此排列）。同週的卡片放在一起，由淺到深。
- 分類只能用上面四種；若需要新分類，先問使用者，並同時在 `style.css` 的 `.tag[data-cat=...]` 加上顏色。

## 6. 學習卡頁面格式（必須遵守）

每一頁都**從 `pages/_template.html` 複製**，保持以下區塊順序：

1. `<header class="page-head">`：麵包屑 → 分類標籤＋週次 → `<h1>` 標題
2. `<p class="tldr">`：**一句話重點**（必填，40 字以內）
3. 2～4 個 `<section>`，每個以 `<h2>` 開頭。建議順序：
   - 「是什麼」→「為什麼重要」→「怎麼用／例子」
4. 至少使用一種輔助元件（見第 7 節），避免整頁都是長段落
5. `<section class="recap">`：**重點回顧**，3～5 條 `<li>`
6. `<nav class="pager" data-slug="<slug>">`：留空即可，`main.js` 會自動填入上一頁/下一頁

寫作風格：

- 段落短（每段 ≤ 3 句），多用條列。
- 語氣像學長姐講解，口語但精準；可以用比喻（例如「AI 是員工、你是老闆」）。
- 不捏造課堂沒提到的數據或引用；不確定的內容標註「（待確認）」。
- 外部連結加 `target="_blank" rel="noopener"`。

## 7. 可用元件（都已在 `style.css` 定義）

```html
<!-- 提示框：note（一般）/ tip（技巧）/ warn（注意） -->
<div class="callout tip"><strong>小技巧</strong><p>…</p></div>

<!-- 對照表：好 vs 壞、A vs B -->
<div class="compare">
  <div class="bad"><h3>爛的交辦</h3><p>…</p></div>
  <div class="good"><h3>好的交辦</h3><p>…</p></div>
</div>

<!-- 公式 / 一行重點 -->
<p class="formula">AI Agent = AI Model + Harness</p>

<!-- 步驟流程 -->
<ol class="steps"><li><strong>步驟</strong>說明</li></ol>

<!-- 一般表格直接用 <table>，外面包 <div class="table-wrap"> -->
```

## 8. 標準作業流程

### A. 新增一張學習卡（最常見）

1. 讀 `raw/` 中使用者指定的筆記（沒指定就問）。
2. **先提出計畫給使用者確認**：預計新增哪幾頁（slug、標題、分類、一句話重點）。
3. 複製 `pages/_template.html` → `pages/<slug>.html`，把所有 `{{…}}` 佔位文字換掉。
4. 在 `data/pages.js` 的正確位置加入一筆資料。
5. 執行 `python scripts/check.py`，有失敗就只修報告列出的問題，再重跑；**最多 3 輪**，仍失敗就停下來回報。
6. 回報：新增／修改了哪些檔案、檢查結果。

### B. 修改既有頁面

- 只改被要求的部分，不要順手重寫其他段落。
- 若改了標題，`data/pages.js` 的 `title` 要一起改。

### C. 修改樣式

- 只改 `assets/style.css`，且優先調整 `:root` 的色彩變數。
- 修改後確認淺色與深色模式、手機寬度（375px）都正常。

## 9. 完成前檢查

「做完了」不是 AI 說了算，是腳本說了算。在專案根目錄執行：

```bash
python scripts/check.py
```

必須輸出 `✓ 全部通過` 才算完成。腳本會自動檢查：

- [ ] `pages.js` 每筆欄位齊全、slug 不重複且格式正確、分類合法、summary ≤ 30 字、日期格式正確
- [ ] `<h1>`、`<title>`（「頁面標題｜Agent 學習卡」）、`pages.js` 的 `title` 一致
- [ ] `data-slug`、分類標籤與 `pages.js` 一致
- [ ] 一句話重點存在且 ≤ 40 字；內容 `<section>` 2～4 個；重點回顧 3～5 條
- [ ] 沒有殘留 `{{` `}}` 佔位文字、沒有 inline style
- [ ] CSS / JS 路徑正確；站內連結沒有失效；外部連結有 `target="_blank" rel="noopener"`
- [ ] `pages/` 裡每個頁面都有登記在 `pages.js`

腳本無法檢查、需要人工確認的項目：

- [ ] 內容忠於 `raw/` 的原始筆記，沒有講反或捏造
- [ ] 雙擊 `index.html` 可看到新卡片，排版正常，上一頁／下一頁正確

> 新增規則時，請同步更新 `scripts/check.py`，讓規則可以被執行檢查。

## 10. 不可以做的事

- ❌ 修改或刪除 `raw/` 內的原始筆記
- ❌ 引入框架（React、Vue、Tailwind…）或建置流程
- ❌ 每頁各自寫一份 CSS
- ❌ 未經確認就刪除頁面或大幅改版首頁
- ❌ 自行 `git push`；commit 前先列出變更讓使用者確認
