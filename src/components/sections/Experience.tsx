import { motion } from "framer-motion";
import SectionHeading from "../ui/GlitchText";

interface TimelineEntry {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

const timeline: TimelineEntry[] = [
  {
    role: "Senior AI Engineer",
    company: "Enterprise AI Company",
    period: "2023 — Present",
    bullets: [
      "Architected multi-agent systems using LangGraph processing 10K+ daily requests",
      "Led migration from monolithic prompts to graph-based agent orchestration",
      "Reduced inference costs by 40% through intelligent routing and caching",
    ],
  },
  {
    role: "AI Systems Developer",
    company: "Tech Startup",
    period: "2022 — 2023",
    bullets: [
      "Built production RAG pipeline handling 50K+ documents with sub-second latency",
      "Designed and shipped 5 AI agents to production serving enterprise clients",
      "Established CI/CD pipelines for ML model deployment with automated testing",
    ],
  },
  {
    role: "Software Engineer — AI Focus",
    company: "Digital Agency",
    period: "2021 — 2022",
    bullets: [
      "Developed NLP-powered content analysis tools reducing manual review by 70%",
      "Integrated LLM capabilities into existing SaaS products",
      "Built REST APIs serving ML model predictions at scale with FastAPI",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative min-h-screen pt-28 pb-24 px-4 snap-section">
      <div className="max-w-4xl mx-auto">
        <SectionHeading text="EXPERIENCE" as="h2" className="mb-14 text-center" />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, rgba(0,245,255,0.25), rgba(157,0,255,0.2), transparent)" }} />

          {timeline.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative mb-12 pl-12 md:pl-0 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-2 w-2.5 h-2.5 rounded-full left-[11px] md:left-auto ${
                  index % 2 === 0 ? "md:right-[-5px]" : "md:left-[-5px]"
                }`}
                style={{ backgroundColor: "#00f5ff", boxShadow: "0 0 8px rgba(0,245,255,0.4)" }}
              />

              <div className="glass rounded-xl p-6 hover:border-white/10 transition-colors">
                <div className="label-mono text-cyber-cyan mb-2">{entry.period}</div>
                <h3 className="font-display text-[18px] font-semibold mb-1" style={{ color: "rgba(255,255,255,0.9)" }}>{entry.role}</h3>
                <div className="label-mono mb-4" style={{ color: "rgba(157,0,255,0.7)" }}>{entry.company}</div>
                <ul className={`space-y-2.5 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                  {entry.bullets.map((bullet, i) => (
                    <li key={i} className="font-body text-[14px] font-light leading-[1.7]" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
