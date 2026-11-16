# Agent 學習卡

把 AI Agent 課程重點整理成一張張「3 分鐘讀完」的學習卡的靜態網站。
網站內容由 AI 依照 [`AGENTS.md`](AGENTS.md)（員工手冊）產生，之後每週只要把筆記放進 `raw/`，就能請 AI 依同一套規則繼續新增頁面。

## 結構

| 路徑 | 用途 |
|---|---|
| `AGENTS.md` | 專案規則（目的、風格、結構、命名、頁面格式、流程、檢查清單） |
| `CLAUDE.md` | 以 `@AGENTS.md` 引用，讓 Claude Code 自動讀取 |
| `index.html` | 首頁，依 `data/pages.js` 自動產生卡片與分類篩選 |
| `data/pages.js` | 全站頁面清單（唯一目錄來源） |
| `pages/_template.html` | 新頁面模板 |
| `pages/*.html` | 學習卡 |
| `raw/` | 原始課堂筆記（AI 只讀不改） |
| `assets/` | 共用 CSS / JS |

## 新增一頁

對 AI 說：

> 請先讀 AGENTS.md，然後把 `raw/10-xxx.md` 整理成學習卡，先給我計畫。

AI 會依手冊：提出計畫 → 複製模板 → 登記 `data/pages.js` → 跑檢查清單 → 回報變更。

## 本機預覽

直接雙擊 `index.html` 即可（不需伺服器）。
