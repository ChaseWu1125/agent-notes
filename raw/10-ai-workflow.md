# 第 10 週：把你的工作拆成 AI 能做的流程（原始筆記）

> 來源：課程講義《10 把你的工作拆成 AI 能做的流程》（53 頁），由 PDF 轉為 Markdown 筆記。
> 副標：從老闆到流程設計師。

## 0. 回顧與路線圖

- 上次學會當老闆，交辦三件事：要什麼成品（做完拿到什麼？放哪？什麼格式？）、有什麼限制（哪些可以動、哪些不能動？）、怎麼算做完（怎麼驗收？）。重點：不要讓 AI 猜。
- 課程大圖：Prompt Engineering → Context Engineering → Harness Engineering → Loop Engineering → Graph Engineering（Chat Bot → AI Agent）。今天補完最後兩格（Loop、Graph）。
- 問題：老闆還是一直盯著。你交辦 → AI 做出一版 → 你發現「第 5 頁字太多」（檢查）→ 再一次。這就是 loop！
- 今天路線：
  1. 換工具：Code Agent
  2. 觀念：Prompt → Loop → Graph
  3. 實作一：先討論，再建 LLM Wiki
  4. 實作二：主題 → HTML 簡報
  5. 拆解你自己的工作

## 1. 這次換用 Coding Agent

- 上週有同學發現 Gemini 對話介面讀不到電腦裡的資料，Antigravity 可以。
- Work Agent：ChatGPT Work、Claude（Cowork）、OpenWorker 等。
- Coding Agent：ChatGPT Codex、Claude Code、Antigravity（Google）、OpenCode（開源，可接任何模型）。
- 一樣從一個專案資料夾開始，讓 AI 有存取權限。
- 今天主示範 Antigravity；有訂閱可用 Claude Code、Codex；做法四套工具都通用。

### Work Agent vs Code Agent

| | Work Agent | Code Agent |
|---|---|---|
| 代表 | ChatGPT Work、Claude、OpenWorker | Antigravity、Claude Code、Codex |
| 預設看到 | 成品和摘要 | 每一行修改（diff） |
| 版本控制 | 要自己記得 | git 是基本盤 |
| 驗證 | 多半靠人讀 | 跑測試、跑腳本 |
| 資料夾・手冊・Skills | ✓ | ✓ |

### 兩個工程習慣

- **git**：每一步都能回去，看得出 AI 改了什麼。
- **可以執行的檢查**：「做完了」不是 AI 說了算，是腳本說了算。說「檢查一下」，不算驗證。

### 員工手冊各家都看得懂

- AGENTS.md（通用）、CLAUDE.md（Claude Code）、GEMINI.md（Gemini）。
- 用 Claude Code：CLAUDE.md 裡寫一行 `@AGENTS.md` 就好。
- Antigravity 也會讀 AGENTS.md，換工具不用重寫。

## 2. 從 Prompt 到 Loop 和 Graph

### 不要寫 prompt，寫 loop

- Boris Cherny（Claude Code 負責人）：我的工作是寫 loop。
- Peter Steinberger（OpenClaw 作者）：別再對 coding agent 下 prompt，去設計替你下 prompt 的 loop。
- Addy Osmani：2026 年 6 月命名 loop engineering，主張把你自己從下 prompt 的人換掉。
- Loop 不也是 prompt？對，差別在寫的是什麼：寫 prompt = 這一輪要做什麼；寫 loop = 一份會自己執行的規格。

### 最早的 loop 只有一行

```bash
while :; do cat PROMPT.md | claude ; done
```

- Geoffrey Huntley 的 Ralph loop（2025 年 7 月）：同一份 PROMPT.md 每一輪重餵一次。
- 讓它運作的是 prompt 以外的東西：重複、檢查、用檔案記進度。看起來很笨，但真的會動。

### 寫 prompt vs 寫 loop

| | 寫 prompt | 寫 loop |
|---|---|---|
| 寫的內容 | 這一輪要做什麼 | 目標、完成標準、驗證、停止規則 |
| 下一步誰決定 | 你讀完再寫下一句 | 系統依檢查結果決定 |
| 寫幾次 | 每一輪都寫 | 寫一次，跑很多輪 |
| 你的角色 | 黏著劑 | 設計者、審查者 |

### 一個 loop 要寫清楚五件事

1. 🎯 目標：要什麼成品
2. 🚧 限制：哪些不能動
3. ✅ 完成標準：怎麼算做完
4. 🛑 停止條件：做不到時何時停手
5. ⏰ 觸發：什麼時候開始跑

前三件上次當老闆就學過了。

### 完成標準的兩種檢查

- 🧮 程式檢查：測試有沒有過？連結斷了沒？每頁有沒有出處？
- 🧑‍⚖️ AI 審查：內容有沒有忠於來源？說法有沒有講反？
- 不要叫它審自己的作品！AI 審查要開新的對話，只給成品和來源。

### loop 也要剎車

- 硬上限：最多改 3 輪。
- 資料不足就停：不要用自己的知識硬湊。
- 會花錢：一個 loop 的 token 遠多於聊天。
- 沒人看管的 loop，就是在沒人看管下犯錯的 loop。

### Graph：改變的是「誰在控制」

- 🔁 Loop：像自己反覆改作業，改到檢查表全過。AI 決定下一步。
- 🕸️ Graph：像學校申請流程，系辦 → 院 → 教務處，不能跳關，卡住會退回特定一關。流程是你事先畫好的。

### 其實三個都是圖

- Prompt：一個節點，跑一次。
- Loop：加一條「回到自己」的邊。
- Graph：A → B → C，退回的邊可以接到任何一個節點。
- 順利跑完的 graph，其實就是一條流水線。

### 好的 graph：大圈很少轉，小圈轉得很快

- 例：檢索 → 大綱 → 逐頁稿 → 渲染 → 交件。
- 小圈：錯了就在附近修，很快。大圈：從最後一關退回起點，應該很少發生。
- 錯誤要在離源頭最近的地方被抓到；常常轉大圈，代表檢查該往前移。

### 讓問題告訴你需要多少結構

1. 一次性、自己會看 → 先用 Prompt
2. 一直重複說同樣的修正 → 升級成 Loop
3. loop 每次都整份重來、各階段標準不同 → 拆成 Graph

不一定要堅持用 graph。

## 3. 實作一：先討論，再建 LLM Wiki

- 上週：「請依 Karpathy 的 LLM Wiki，建立 AGENTS.md 和資料夾。」（一句話生成）
- 這週：先讓 AI 訪談你、整理需求，確認後才建檔。Karpathy 原文也說：把這份文件交給你的代理，和它一起做出適合你的版本。
- 準備：建專案資料夾 → `git init` → 放 3–5 篇 LLM 論文進 `raw/` → 用 Antigravity 開啟資料夾。小提醒：raw/ 不要放個資或機密文件。

### 開場 prompt：先不要建任何檔案

> 這是 Karpathy 的 LLM Wiki 構想（附上 gist）。我想用它來整理____的論文。先不要建立任何檔案。請一次問我一個問題，幫我釐清需求，大約 8–10 題。問完後整理成需求摘要給我確認，確認後才生成 AGENTS.md 和資料夾。

### AI 至少該問到這些

讀者是誰、要哪些頁面類型、用什麼語言、出處要多細、論文互相矛盾怎麼辦、一次一篇還是批次、之後要產出什麼、lint 要檢查什麼。

### 需求摘要 → AGENTS.md

- 需求摘要（你確認）→ AGENTS.md（AI 生成）→ 逐條對照（你檢查）：摘要裡說的，手冊裡都有寫進去嗎？

### 三個小提醒

- 📏 別寫太長：Antigravity 規則檔上限 12,000 字元，細節拆到 skill。
- 🥇 只維護一份：GEMINI.md 優先序比 AGENTS.md 高，兩份並存容易打架。
- 🔗 Claude Code：CLAUDE.md 寫 `@AGENTS.md` 共用。

### Ingest 1–2 篇，然後 commit

```
my-wiki/
├── AGENTS.md
├── raw/
└── wiki/
    ├── index.md
    └── log.md
```

`git commit -m "first ingest"`

- 小討論：上週「一句話生成」和這週「討論後生成」的 AGENTS.md 差在哪裡？

## 4. 實作二：主題 → HTML 簡報

- 使用者說一個主題（例：多模態 RAG）→ AI 只用 wiki 的內容 → 一份 HTML 簡報。
- 同一個 wiki、同一個模型，要做的事也一樣，只換做法。

### Prompt 版：一句話

- 「根據 wiki 裡關於多模態 RAG 的內容，做一份 HTML 簡報。」→ 做好了！
- 然後你開始一直修：第 5 頁字太多跑出畫面、這個 37% 是哪篇的？、8 篇相關論文只用了 3 篇、論文 A 的結論講反了。
- 這裡也有 loop——只是你自己就是那個 loop。

### Loop 版：把你的修正寫成規格（SKILL.md）

- 🎯 目標：只用 wiki，產出 HTML 簡報
- ✅ 程式檢查：每頁有出處、引用頁面存在、數字找得到、8–15 頁、渲染後沒有溢出
- 🧑‍⚖️ AI 審查：新對話，只給簡報和引用頁，檢查忠實度和覆蓋率
- 🔁 每一輪：只修檢查報告列出的問題
- 🛑 停止：全過／改滿 3 輪／相關頁面少於 3 頁就一開始停下

跑起來：

- 第 1 輪：腳本：3 頁溢出、2 處沒出處；審查：第 6 頁講反了。
- 第 2 輪：腳本全過；審查：論文 D 沒用到。
- 第 3 輪：補進論文 D → 全過 → 交件，附檢查報告。
- 我只要最後看報告就好！

### Graph 版：先畫好流程

- 檢索 wiki → 覆蓋率關卡（不足 → 停下）→ 證據卡（平行）→ 大綱 → 人工確認（退回 → 修大綱或補檢索）→ 逐頁稿 → 忠實度檢查（退回 → 只修那頁）→ 渲染 HTML → 渲染檢查（退回 → 逐頁稿）→ 交件。
- 圖例：AI 節點、人工確認、檢查關卡、退回路線。

### 每一關只能看什麼、改什麼

| 節點 | 只能看 | 不能做 |
|---|---|---|
| 證據卡 | 一篇論文 | 混入其他來源 |
| 逐頁稿 | 大綱＋對應卡片 | 引用卡片以外的內容 |
| 渲染 HTML | 已通過的逐頁稿 | 改任何一個字 |
| 檢查關卡 | 成品＋來源 | 自己動手改 |

排版時想順手改句子？不行！

### 錯在哪一關，就退回哪一關

- 📄 只修那頁：第 6 頁講錯，其他 14 頁不動。
- 🃏 卡片本身錯：退回重抽那一篇的證據卡。
- ✂️ 字太多：不是硬塞，退回逐頁稿縮短。
- 🧩 缺子題：人看大綱時發現，退回檢索補資料。
- 退回路線是你事先設計好的。

### 每一格裡面，還是 loop

- 逐頁稿節點：寫一頁 → 檢查出處 → 修，最多 2 輪。
- 渲染節點：產生 HTML → 截圖 → 修版面 → 再截圖。
- graph 決定大流程，loop 負責每一格的反覆修正。

### 狀態都是檔案，也是 Workflow Prototype

```
topic-multimodal-rag/
├── sources.md
├── cards/
├── outline.md
├── drafts/
├── deck.html
└── report.md
```

- 把流程寫成 workflow 檔，放進 `.agents/workflows/`，用 `/topic-slides` 呼叫。
- 每一道檢查關卡 = 一支腳本。
- 每一關的產出都能打開看、放進 git、單獨重跑。

### 三種做法對照

| | Prompt | Loop | Graph |
|---|---|---|---|
| 流程誰決定 | 你，即時 | AI，在規格內 | 你，事先畫好 |
| 出錯怎麼修 | 你發現、你下指令 | 整份再跑一輪 | 退回出錯那一關 |
| 人在哪裡介入 | 隨時 | 最後驗收 | 指定關卡 |
| 適合 | 一次性、自己看 | 標準明確的重複任務 | 多階段、多人使用 |

## 5. 拆解你自己的工作

畫出你的 workflow（先用紙畫，不要急著叫 AI 做！）：

1. 可以拆成哪幾個節點？
2. 每個節點的輸入、輸出是什麼檔案？
3. 每個節點怎麼檢查？程式、人，還是審查？
4. 人要在哪一關介入？
5. 出錯時退回哪裡？
6. prompt、loop 還是 graph 就夠了？

### 今天的一句話

說「檢查一下」不算驗證；說「做好一點」不算規格。先寫好「完成的定義」，再決定要不要加上 loop 或 graph。

## 6. 本週作業（講義原文整理）

- 建 Wiki：用「先討論、後生成」建立自己主題的 LLM Wiki，至少 ingest 數篇（PDF 數字無法辨識，待確認）。
- 產生 HTML：設計 Graph 或 Loop 的 workflow，生成簡報。
- 反思：1. 分享建 Wiki 時特別考量的事情；2. 分享 Graph 或 Loop 的設計；3. 其他心得。
