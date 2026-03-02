import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Typewriter from "../ui/Typewriter";
import { Github, Linkedin } from "lucide-react";
import { socialLinks } from "../../config/social.config";

const NeuralNetworkHero = lazy(() => import("../three/NeuralNetworkHero"));

const roles = [
  "LangGraph Architect",
  "Multi-Agent Systems",
  "Claude Code Power User",
  "Production AI Engineer",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center overflow-hidden snap-section">
      {/* Three.js Background */}
      <Suspense fallback={null}>
        <NeuralNetworkHero />
      </Suspense>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neural-black/50 via-transparent to-neural-black z-[1]" />

      {/* Content — left-aligned, max-width 800 */}
      <motion.div
        className="relative z-[2] px-6 md:px-12 lg:px-20 w-full"
        style={{ maxWidth: "800px" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow label */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="label-mono" style={{ color: "rgba(0, 245, 255, 0.7)" }}>
            SENIOR GENAI DEVELOPER
          </span>
        </motion.div>

        {/* Name — shimmer, not glitch */}
        <motion.div variants={itemVariants}>
          <h1
            className="shimmer-text font-display font-bold"
            style={{
              fontSize: "clamp(48px, 6vw, 88px)",
              letterSpacing: "0.2em",
              lineHeight: 1.1,
            }}
          >
            UTKARSH
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div variants={itemVariants} className="mt-5">
          <Typewriter words={roles} />
        </motion.div>

        {/* CTA buttons */}
        <motion.div variants={itemVariants} className="mt-12 flex items-center gap-4">
          <a
            href="#projects"
            className="px-7 py-2.5 font-mono text-[12px] tracking-[0.1em] uppercase rounded-lg border transition-all duration-300"
            style={{
              color: "rgba(0, 245, 255, 0.9)",
              borderColor: "rgba(0, 245, 255, 0.2)",
              backgroundColor: "rgba(0, 245, 255, 0.06)",
            }}
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-7 py-2.5 font-mono text-[12px] tracking-[0.1em] uppercase rounded-lg border transition-all duration-300"
            style={{
              color: "rgba(157, 0, 255, 0.85)",
              borderColor: "rgba(157, 0, 255, 0.2)",
              backgroundColor: "rgba(157, 0, 255, 0.06)",
            }}
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div variants={itemVariants} className="mt-8 flex items-center gap-3">
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg transition-all duration-300"
            style={{ color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Linkedin size={18} />
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg transition-all duration-300"
            style={{ color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Github size={18} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div
          className="w-5 h-8 rounded-full flex justify-center pt-1.5"
          style={{ border: "1.5px solid rgba(0, 245, 255, 0.2)" }}
        >
          <div className="w-1 h-2 rounded-full" style={{ backgroundColor: "rgba(0, 245, 255, 0.4)" }} />
        </div>
      </motion.div>
    </section>
  );
}
