import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import GlitchText from "../ui/GlitchText";

const SkillConstellation = lazy(() => import("../three/SkillConstellation"));

interface SkillCategory {
  name: string;
  headingClass: string;
  pillClass: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "AI/ML",
    headingClass: "text-cyber-cyan",
    pillClass:
      "border-cyber-cyan/20 text-cyber-cyan/80 bg-cyber-cyan/5 hover:bg-cyber-cyan/10",
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
    name: "Backend",
    headingClass: "text-neon-violet",
    pillClass:
      "border-neon-violet/20 text-neon-violet/80 bg-neon-violet/5 hover:bg-neon-violet/10",
    skills: ["Python", "FastAPI", "REST APIs", "Async Programming"],
  },
  {
    name: "Infrastructure",
    headingClass: "text-green-400",
    pillClass:
      "border-green-400/20 text-green-400/80 bg-green-400/5 hover:bg-green-400/10",
    skills: ["Supabase", "Vercel", "Docker", "GitHub Actions"],
  },
  {
    name: "Mindset",
    headingClass: "text-orange-400",
    pillClass:
      "border-orange-400/20 text-orange-400/80 bg-orange-400/5 hover:bg-orange-400/10",
    skills: ["Production-Grade", "Fast Shipping", "AI-First Development"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative min-h-screen py-24 px-4 snap-section">
      <div className="max-w-6xl mx-auto">
        <GlitchText
          text="TECH STACK"
          as="h2"
          className="text-4xl md:text-5xl text-white mb-4 text-center"
        />
        <p className="text-center text-dim-gray font-mono text-sm mb-12">
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
              <div className="h-[500px] flex items-center justify-center text-dim-gray font-mono text-sm">
                Loading constellation...
              </div>
            }
          >
            <SkillConstellation />
          </Suspense>
        </motion.div>

        {/* Fallback skill pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="glass rounded-xl p-5"
            >
              <h3 className={`font-display text-sm mb-4 ${category.headingClass}`}>
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 text-xs font-mono rounded-full border transition-colors ${category.pillClass}`}
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
