import { motion } from "framer-motion";
import GlitchText from "../ui/GlitchText";

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
    <section id="experience" className="relative min-h-screen py-24 px-4 snap-section">
      <div className="max-w-4xl mx-auto">
        <GlitchText text="EXPERIENCE" as="h2" className="text-4xl md:text-5xl text-white mb-16 text-center" />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-cyan/50 via-neon-violet/50 to-transparent" />

          {timeline.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative mb-12 pl-12 md:pl-0 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-2 w-3 h-3 rounded-full bg-cyber-cyan shadow-[0_0_10px_#00f5ff] left-[10px] md:left-auto ${
                  index % 2 === 0 ? "md:right-[-6px]" : "md:left-[-6px]"
                }`}
              />

              <div className="glass rounded-xl p-6 hover:border-cyber-cyan/20 transition-colors">
                <div className="font-display text-sm text-cyber-cyan mb-1">{entry.period}</div>
                <h3 className="text-lg font-display text-white mb-1">{entry.role}</h3>
                <div className="text-neon-violet font-mono text-sm mb-3">{entry.company}</div>
                <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                  {entry.bullets.map((bullet, i) => (
                    <li key={i} className="text-dim-gray text-sm font-mono leading-relaxed">
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
