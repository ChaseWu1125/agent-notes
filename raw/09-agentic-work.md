# 第 9 週：換你當老闆 — Agentic Work 與 AI 工作現場（原始筆記）

## AI Agent 定義
- LLM 時代的 AI Agent：教 AI 用「我們做事的方法」做事情
- AI Agent = AI Model + Harness
- 路線圖：Prompt Engineering → Context Engineering → Harness Engineering → Loop Engineering → Graph Engineering；Chat Bot → AI Agent
- 上次用 AISuite 手刻 Agent（Reflection / Tool Use / Planning），但還是麻煩，沒有當老闆的感覺

## 從「問 AI」到「交辦給 AI」
- 例子：桌面好亂。對話式：AI 要你貼 87 個檔名，給分類建議，最後你自己建資料夾、拖檔案 → AI 出一張嘴，事情都你做
- 代理式：你說「先給我看計畫」，AI 自己開資料夾、提分類計畫，你說「可以，照做」，AI 建資料夾、搬檔案、回報
- 對照：對話式 Chat（顧問、一問一答、全程在場、只碰對話框文字、拿到一段回答）vs 代理式 Agentic（員工、多步驟自己做、你可以離開、碰檔案瀏覽器工具、拿到一份成品）

## Harness
- LLM 本身只會生成文字：不會開資料夾、不會改檔案、不能自己上網
- AI Model（大腦）：理解、規劃、判斷、生成
- Harness（工作裝備）：把模型說的「我要開這個檔案」真的執行，再把結果回報給模型
- 完整 harness：工作環境（沙盒）、工具（讀寫檔、終端機、瀏覽器、搜尋）、連接器 MCP（Gmail、行事曆、雲端硬碟）、技能 Skills（資料夾 + SKILL.md，標準作業流程）、規則檔 CLAUDE.md / AGENTS.md、排程
- 模型大家都差不多，決定好不好用的是 Harness
- 之前 AISuite：自己寫 Python 函數當工具、system prompt 寫在程式裡、自己處理錯誤重試；現在產品幫你處理

## 好老闆交辦三件事
- 要什麼成品：做完拿到什麼？放哪？什麼格式？
- 怎麼算做完：怎麼驗收？
- 有什麼限制：哪些可以動、哪些不能動？
- 重點：不要讓我猜測
- 好的交辦：「幫我整理『桌面』這個資料夾。依用途分類，資料夾名稱用中文。不要刪除任何檔案，看不出用途的放進『待確認』。動手前先給我看分類計畫，做完列出每個檔案搬到哪裡。」
- 爛的交辦：「幫我整理桌面。」

## 專案型 Agent 與員工手冊
- 工具：ChatGPT Codex、Claude Code / Cowork、Gemini 等；也有開源可用開源模型
- 專案通常設一個專案資料夾，讓 AI 有存取權限
- 員工手冊：CLAUDE.md（Claude 專用）、AGENTS.md（一般通用）；規格書由我們和 AI 討論出來；也可以叫別的名字，請 AI 先讀
- 一直在同一個對話：對話越來越長、換電腦就讀不到
- 每次開對話先要求「請先讀 AGENTS.md」；不用寫完美，可以持續改寫
- 範例：呆一布講義（CLAUDE.md、ideas、assets、slide_notes、presentation、index.html）https://diveai-lab.github.io/diveai-lessons/
- 其他範例：粉專貼文工作室（每天一篇）、圖像風格轉換專案

## LLM Wiki（Karpathy）
- 打造你自己的 Wikipedia
- raw（你找的資料）→ 教 AI 怎麼把檔案產生/修改 wiki 檔 → wiki，index.md 當目錄
- Karpathy Gist：https://bit.ly/llmwiki
- Farzapedia 個人化 wikipedia：https://bit.ly/farzawiki
