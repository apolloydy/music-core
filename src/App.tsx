const milestones = [
  {
    title: "作品库",
    description: "集中管理 demo、母带、封面、歌词与发行素材。",
    status: "基础能力",
  },
  {
    title: "创作流水线",
    description: "记录从灵感、编曲、混音到发布的推进状态。",
    status: "执行主线",
  },
  {
    title: "数据面板",
    description: "后续接入播放量、收藏、渠道反馈与版本表现。",
    status: "第二阶段",
  },
];

const focusAreas = [
  "先把项目主页和品牌感做出来，方便你对外展示",
  "把歌曲、专辑、素材这些核心实体定义清楚",
  "预留后端接口位，后面可以接 Supabase / Node API",
];

const nextSteps = [
  "创建 GitHub 仓库 `music-core`",
  "补作品数据结构和假数据",
  "接入登录、上传与曲目管理",
];

export default function App() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Apollo YDY / New Project</p>
          <h1>Music Core</h1>
          <p className="hero-text">
            这是一个为音乐项目搭底座的起点版本。先把品牌、结构和节奏立住，再逐步长成你的作品库、制作台和发行中心。
          </p>

          <div className="hero-actions">
            <a className="primary-action" href="#roadmap">
              查看路线
            </a>
            <a className="secondary-action" href="#focus">
              核心模块
            </a>
          </div>
        </div>

        <div className="hero-panel">
          <p className="panel-label">Launch Notes</p>
          <div className="signal-card">
            <span>项目阶段</span>
            <strong>0 → 1 起步中</strong>
          </div>
          <div className="signal-card">
            <span>建议栈</span>
            <strong>React + Vite + TypeScript</strong>
          </div>
          <div className="signal-card">
            <span>下一步</span>
            <strong>先做作品管理与展示</strong>
          </div>
        </div>
      </section>

      <section className="section-grid" id="roadmap">
        {milestones.map((item) => (
          <article className="milestone-card" key={item.title}>
            <p className="card-status">{item.status}</p>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="content-row" id="focus">
        <article className="content-card">
          <p className="section-label">当前重点</p>
          <ul>
            {focusAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="content-card accent-card">
          <p className="section-label">马上推进</p>
          <ol>
            {nextSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
      </section>
    </main>
  );
}
