// 全站頁面清單：首頁卡片、上一頁/下一頁、分類篩選都讀這裡。
// 規則見 AGENTS.md 第 5 節。陣列順序 = 閱讀順序。
window.PAGES = [
  {
    slug: "agent-definition",
    title: "AI Agent 到底是什麼？",
    summary: "模型加上 Harness，教 AI 用你的方法做事。",
    category: "概念",
    week: 9,
    date: "2026-11-16"
  },
  {
    slug: "harness",
    title: "Harness：AI 的工作裝備",
    summary: "模型負責想，Harness 負責做：工具、規則、排程等。",
    category: "概念",
    week: 9,
    date: "2026-11-16"
  },
  {
    slug: "good-delegation",
    title: "當個好老闆：怎麼交辦工作給 AI",
    summary: "說清楚要什麼成品、怎麼算做完、有什麼限制，不要讓 AI 猜。",
    category: "方法",
    week: 9,
    date: "2026-11-16"
  },
  {
    slug: "agents-md",
    title: "AGENTS.md：寫給 AI 的員工手冊",
    summary: "把專案規則寫成檔案，每次開工先讀，換對話、換電腦都不怕。",
    category: "工具",
    week: 9,
    date: "2026-11-16"
  },
  {
    slug: "llm-wiki",
    title: "LLM Wiki：讓 AI 幫你養一座知識庫",
    summary: "raw 放資料，AI 依規則整理成自己的 wiki。",
    category: "案例",
    week: 9,
    date: "2026-11-16"
  },
  {
    slug: "coding-agent",
    title: "Coding Agent：看得到每一行修改的 AI",
    summary: "用 git 留紀錄、用腳本驗證，做完不是 AI 說了算。",
    category: "工具",
    week: 10,
    date: "2026-11-16"
  },
  {
    slug: "prompt-to-loop",
    title: "從 Prompt 到 Loop：寫一份會自己跑的規格",
    summary: "寫清目標、限制、完成標準、停止條件、觸發，寫一次跑很多輪。",
    category: "概念",
    week: 10,
    date: "2026-11-16"
  },
  {
    slug: "graph",
    title: "Graph：先畫好流程，錯在哪關退回哪關",
    summary: "Loop 由 AI 決定下一步，Graph 由你事先畫好。",
    category: "概念",
    week: 10,
    date: "2026-11-16"
  },
  {
    slug: "discuss-then-build",
    title: "先討論再生成：讓 AI 先訪談你",
    summary: "先問 8～10 題、寫需求摘要，確認後才建手冊。",
    category: "方法",
    week: 10,
    date: "2026-11-16"
  },
  {
    slug: "topic-to-slides",
    title: "主題 → HTML 簡報的三種做法",
    summary: "同一任務用 Prompt、Loop、Graph 做的差別。",
    category: "案例",
    week: 10,
    date: "2026-11-16"
  },
  {
    slug: "design-your-workflow",
    title: "拆解你自己的工作",
    summary: "說「檢查一下」不算驗證，先寫好完成的定義再決定結構。",
    category: "方法",
    week: 10,
    date: "2026-11-16"
  }
];
