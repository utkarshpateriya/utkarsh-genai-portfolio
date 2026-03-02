import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/GlitchText";

const SkillConstellation = lazy(() => import("../three/SkillConstellation"));

interface SkillCategory {
  name: string;
  headingClass: string;
  pillClass: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "AI / ML",
    headingClass: "text-cyber-cyan",
    pillClass:
      "border-cyber-cyan/15 text-cyber-cyan/70 bg-cyber-cyan/5 hover:bg-cyber-cyan/10",
    skills: [
      "LangGraph",
      "LangChain",
      "AI Agents",
      "Multi-Agent Architectures",
      "Claude Code",
      "Claude Skills",
    ],
  },
  {
    name: "BACKEND",
    headingClass: "text-neon-violet",
    pillClass:
      "border-neon-violet/15 text-neon-violet/70 bg-neon-violet/5 hover:bg-neon-violet/10",
    skills: ["Python", "FastAPI", "REST APIs", "Async Programming"],
  },
  {
    name: "INFRASTRUCTURE",
    headingClass: "text-green-400",
    pillClass:
      "border-green-400/15 text-green-400/70 bg-green-400/5 hover:bg-green-400/10",
    skills: ["Supabase", "Vercel", "Docker", "GitHub Actions"],
  },
  {
    name: "MINDSET",
    headingClass: "text-orange-400",
    pillClass:
      "border-orange-400/15 text-orange-400/70 bg-orange-400/5 hover:bg-orange-400/10",
    skills: ["Production-Grade", "Fast Shipping", "AI-First Development"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative min-h-screen pt-28 pb-24 px-4 snap-section">
      <div className="max-w-6xl mx-auto">
        <SectionHeading text="TECH STACK" as="h2" className="mb-3 text-center" />
        <p className="text-center label-mono mb-14" style={{ color: "rgba(255,255,255,0.35)" }}>
          Constellation of capabilities
        </p>

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="hidden md:block mb-16"
        >
          <Suspense
            fallback={
              <div className="h-[500px] flex items-center justify-center label-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                Loading constellation...
              </div>
            }
          >
            <SkillConstellation />
          </Suspense>
        </motion.div>

        {/* Skill category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="glass rounded-xl p-5"
            >
              <h3 className={`label-mono mb-4 ${category.headingClass}`}>
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 text-[11px] font-mono rounded-full border transition-colors ${category.pillClass}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
