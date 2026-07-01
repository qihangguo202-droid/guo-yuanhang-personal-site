import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Award,
  Boxes,
  Database,
  Download,
  FileCheck2,
  FileText,
  GitBranch,
  Mail,
  Moon,
  Send,
  Sparkles,
  Sun,
  Trophy,
  Workflow,
} from "lucide-react";

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "capabilities", label: "Capabilities" },
  { id: "timeline", label: "Timeline" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Honors" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

const capabilities = [
  { icon: Workflow, title: "运营协同", desc: "跨部门沟通与项目推进" },
  { icon: Database, title: "数据整理", desc: "数据清洗、分析与可视化" },
  { icon: Sparkles, title: "AI 工具", desc: "Claude / Codex / DeepSeek" },
  { icon: FileCheck2, title: "文档流程", desc: "材料整理与规范输出" },
  { icon: Boxes, title: "系统思维", desc: "从流程到治理的结构化思考" },
];

const timeline = [
  {
    date: "2025.12 - 2026.02",
    company: "尚士达汽美精细化工",
    role: "运营实习生",
    detail: "产品信息整理、页面展示优化与运营数据复盘",
    state: "已结束",
  },
  {
    date: "2026.04 - 2026.06",
    company: "蔚来乐道 · ROS",
    role: "运营实习生",
    detail: "门店协同、任务跟进、活动执行与数据维护",
    state: "已结束",
  },
  {
    date: "2026.05",
    company: "AI Resume Helper",
    role: "GitHub 开源项目",
    detail: "基于 Claude Code 的简历优化工具与版本管理流程",
    state: "持续迭代",
  },
  {
    date: "2026.06.29 起",
    company: "西安四叶草",
    role: "体系管理实习生",
    detail: "资质申报、材料规范、流程跟踪、知识产权协同",
    state: "进行中",
    current: true,
  },
];

const projects = [
  {
    title: "AI Resume Helper",
    type: "个人项目",
    image: asset("assets/project-ai-resume.png"),
    desc: "基于 Claude Code 开发的 AI 简历优化工具，支持岗位 JD 关键词提取、简历内容优化与版本管理。",
    tags: ["AI 应用", "效率工具", "内容生成"],
  },
  {
    title: "数字化人才画像研究",
    type: "研究项目",
    image: asset("assets/project-digital-map.png"),
    desc: "构建纺织行业岗位胜任力模型，结合 AI 与数据分析梳理关键能力维度，辅助人才管理决策。",
    tags: ["数据分析", "可视化", "研究报告"],
  },
  {
    title: "国家发明专利研发",
    type: "核心参与",
    image: asset("assets/project-patent.png"),
    desc: "参与实验数据整理、技术文档撰写与方案优化，已授权 1 项，另有 1 项专利实审中。",
    tags: ["专利", "研发", "文档协作"],
  },
];

const achievements = [
  {
    category: "发明专利",
    title: "一种具有可变弹性的高导电液态金属包覆纱及其制备方法",
    meta: "已授权 · ZL 2024 1 0040631.X",
    desc: "国家知识产权局授权发明专利，围绕导电液态金属包覆纱的结构设计、制备路径与材料性能展开。",
    image: asset("assets/patent-authorized-certificate.jpg"),
    tags: ["授权公告 CN 117721561 B", "2025.09.23", "共同发明"],
    featured: true,
  },
  {
    category: "发明专利",
    title: "一种双芯编织复合纱及加工方法",
    meta: "申请受理 · 202311713499.6",
    desc: "围绕复合纱结构与加工方法进行专利申请，已取得国家知识产权局受理通知。",
    image: asset("assets/patent-acceptance-notice.jpg"),
    tags: ["受理通知", "2023.12.14", "研发协作"],
  },
  {
    category: "竞赛奖项",
    title: "第十五届全国大学生纱线设计大赛二等奖",
    meta: "“白鲨杯” · 中国纺织服装教育学会",
    desc: "作品“蛇‘紫’嫣‘红’”：可控可逆型温敏变色弹性纱线的结构设计与开发。",
    image: asset("assets/award-yarn-15-second.jpg"),
    tags: ["二等奖", "2024.11.29", "团队作者"],
  },
  {
    category: "竞赛奖项",
    title: "第十五届全国大学生纱线设计大赛三等奖",
    meta: "“白鲨杯” · 中国纺织服装教育学会",
    desc: "作品“绿色焕新”：聚焦赛络纺纺制可回收再生涤纶短纤/棉混纺纱。",
    image: asset("assets/award-yarn-15-third.jpg"),
    tags: ["三等奖", "2024.11.29", "团队作者"],
  },
  {
    category: "竞赛奖项",
    title: "第十六届全国大学生纱线设计大赛三等奖",
    meta: "“白鲨杯” · 中国纺织服装教育学会",
    desc: "作品“银导纸护，感随形动”：面向智慧服饰的纸纱基镀银长丝应变传感包覆纱。",
    image: asset("assets/award-yarn-16-third.jpg"),
    tags: ["三等奖", "2025.11", "设计者"],
  },
];

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.12, 0.28, 0.5] },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function Sidebar({ active }) {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <a className="brand" href="#home" aria-label="Go to home">
        <img src={asset("assets/gyh-logo.png")} alt="GYH mountain logo" />
      </a>

      <nav className="side-nav">
        {sections.map((item, index) => (
          <a
            className={active === item.id ? "nav-item active" : "nav-item"}
            href={`#${item.id}`}
            key={item.id}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <small>{item.label}</small>
          </a>
        ))}
      </nav>

      <div className="socials">
        <a href="mailto:gyh050816@qq.com" aria-label="Email">
          <Mail size={18} />
        </a>
        <a href="#projects" aria-label="Projects">
          <GitBranch size={18} />
        </a>
        <a href={asset("assets/yuanhang-resume.pdf")} download aria-label="Resume">
          <FileText size={18} />
        </a>
      </div>
    </aside>
  );
}

function TopNav({ isDark, onToggle }) {
  return (
    <div className="top-nav">
      <button className="theme-toggle" type="button" onClick={onToggle}>
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
        <span>{isDark ? "浅色模式" : "深色模式"}</span>
      </button>
      <a className="download-btn" href={asset("assets/yuanhang-resume.pdf")} download>
        下载简历
        <Download size={16} />
      </a>
    </div>
  );
}

function Hero({ isDark, onToggle }) {
  return (
    <section className="hero section" id="home">
      <TopNav isDark={isDark} onToggle={onToggle} />

      <div className="hero-copy reveal">
        <div className="eyebrow">
          GUO YUANHANG
          <span />
        </div>
        <h1>
          郭远航<span>.</span>
        </h1>
        <p className="hero-role">27届本科生 / AI 工具实践者</p>
        <p className="hero-desc">从运营协同、项目实践到流程文档能力的成长路径</p>

        <div className="hero-actions">
          <a className="primary-btn" href="#projects">
            查看项目
            <ArrowRight size={18} />
          </a>
          <a className="secondary-btn" href="#about">
            了解更多
            <ArrowDown size={17} />
          </a>
        </div>

        <a className="scroll-cue" href="#capabilities">
          SCROLL
          <span />
        </a>
      </div>

      <div className="hero-visual">
        <div className="hero-mountain">
          <img src={asset("assets/hero-mountain.jpg")} alt="Mountain landscape" />
        </div>
        <div className="glass-panel" />
        <img
          className="hero-portrait"
          src={asset("assets/formal-portrait-cutout.png")}
          alt="郭远航正式证件照"
        />
        <div className="signature">
          <strong>Yuanhang</strong>
          <span>持续学习 · 解决问题 · 创造价值</span>
          <span>让系统更清晰，让协同更高效</span>
        </div>
      </div>
    </section>
  );
}

function CapabilityStrip() {
  return (
    <section className="capability-strip section" id="capabilities">
      <div className="strip-title">
        <strong>核心能力</strong>
        <span>在运营与数据中洞察，在系统与工具中落地</span>
      </div>
      <div className="capability-list">
        {capabilities.map((item) => {
          const Icon = item.icon;
          return (
            <article className="capability-item" key={item.title}>
              <Icon size={26} strokeWidth={1.8} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section" id="about">
      <div className="section-heading">
        <span>ABOUT</span>
        <h2>不急着给自己贴单一岗位标签，先把可迁移能力做扎实。</h2>
      </div>
      <div className="about-text">
        <p>
          我是安徽工程大学纺织工程专业 27届本科生。过去的经历横跨门店运营协同、
          运营素材管理、AI 工具开发、数字化人才画像研究和专利研发文档协作。
        </p>
        <p>
          目前更关注的是可迁移能力：把复杂信息整理清楚，把协作流程推进下去，
          用 AI 工具提高产出效率，并在真实业务场景里持续校准自己的判断。
        </p>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="timeline-section section" id="timeline">
      <div className="section-row">
        <div className="section-title">
          <h2>成长轨迹</h2>
          <span />
        </div>
        <a href="#projects" className="subtle-link">
          查看项目细节
          <ArrowRight size={15} />
        </a>
      </div>

      <div className="timeline-layout">
        <div className="timeline-track">
          <div className="timeline-line" />
          {timeline.map((item) => (
            <article
              className={item.current ? "timeline-item current" : "timeline-item"}
              key={`${item.company}-${item.date}`}
            >
              <span className="timeline-dot" />
              <time>{item.date}</time>
              <h3>{item.company}</h3>
              <strong>{item.role}</strong>
              <p>{item.detail}</p>
              <em>{item.state}</em>
            </article>
          ))}
        </div>

        <aside className="quote-card">
          <img src={asset("assets/hero-mountain.jpg")} alt="Snow mountain background" />
          <div>
            <span>“</span>
            <p>用系统思维解决问题，在长期主义中构建价值。</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="section-row">
        <div className="section-title">
          <h2>精选项目</h2>
          <span />
        </div>
        <a className="subtle-link" href={asset("assets/yuanhang-resume.pdf")} download>
          下载完整简历
          <Download size={15} />
        </a>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <img src={project.image} alt={`${project.title} thumbnail`} />
            <div className="project-body">
              <div className="project-heading">
                <h3>{project.title}</h3>
                <span>{project.type}</span>
              </div>
              <p>{project.desc}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <ArrowRight className="project-arrow" size={18} />
          </article>
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section className="achievements section" id="achievements">
      <div className="section-row">
        <div className="section-title">
          <h2>成果与荣誉</h2>
          <span />
        </div>
        <div className="achievement-count">
          <Award size={16} />
          <span>专利与竞赛成果</span>
        </div>
      </div>

      <div className="achievement-summary">
        <div className="achievement-lead">
          <Trophy size={30} />
          <div>
            <span>PROOF OF WORK</span>
            <h3>把纺织材料、专利文档和竞赛项目落到真实成果里。</h3>
          </div>
        </div>
        <div className="achievement-metrics">
          <div>
            <strong>1</strong>
            <span>发明专利授权</span>
          </div>
          <div>
            <strong>1</strong>
            <span>专利申请受理</span>
          </div>
          <div>
            <strong>3</strong>
            <span>全国赛事奖项</span>
          </div>
        </div>
      </div>

      <div className="achievement-grid">
        {achievements.map((item) => (
          <article
            className={item.featured ? "achievement-card featured" : "achievement-card"}
            key={`${item.category}-${item.title}`}
          >
            <div className="achievement-image">
              <img src={item.image} alt={`${item.title} certificate`} />
            </div>
            <div className="achievement-body">
              <span className="achievement-category">{item.category}</span>
              <h3>{item.title}</h3>
              <strong>{item.meta}</strong>
              <p>{item.desc}</p>
              <div className="tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a className="certificate-link" href={item.image} target="_blank" rel="noreferrer">
                查看原图
                <ArrowRight size={15} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section className="resume section" id="resume">
      <div className="resume-panel">
        <div>
          <span className="panel-label">RESUME</span>
          <h2>简历不是终点，是把经历整理成下一段机会的入口。</h2>
        </div>
        <div className="resume-stats">
          <div>
            <strong>2</strong>
            <span>段实习经历</span>
          </div>
          <div>
            <strong>3</strong>
            <span>重点项目</span>
          </div>
          <div>
            <strong>1+</strong>
            <span>授权专利</span>
          </div>
        </div>
        <a className="primary-btn" href={asset("assets/yuanhang-resume.pdf")} download>
          下载 PDF 简历
          <Download size={18} />
        </a>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="contact-banner">
        <img src={asset("assets/lake-portrait.jpg")} alt="Lake landscape contact banner" />
        <div className="contact-copy">
          <Send size={32} />
          <div>
            <h2>期待与你的连接</h2>
            <p>如果你对我的项目、经历或成长背景感兴趣，欢迎交流。</p>
          </div>
        </div>
        <div className="contact-actions">
          <a className="primary-btn" href="mailto:gyh050816@qq.com">
            联系我
          </a>
          <a className="secondary-btn" href={asset("assets/yuanhang-resume.pdf")} download>
            下载简历
            <Download size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function App() {
  const active = useActiveSection();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className="site-shell">
      <Sidebar active={active} />
      <main className="page">
        <Hero isDark={isDark} onToggle={() => setIsDark((value) => !value)} />
        <div className="content-wrap">
          <CapabilityStrip />
          <About />
          <Timeline />
          <Projects />
          <Achievements />
          <Resume />
          <Contact />
        </div>
      </main>
      <button
        className="floating-theme"
        type="button"
        onClick={() => setIsDark((value) => !value)}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}
