import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import GlitchText from "../ui/GlitchText";
import Typewriter from "../ui/Typewriter";
import { Github, Linkedin } from "lucide-react";
import { socialLinks } from "../../config/social.config";

const NeuralNetworkHero = lazy(() => import("../three/NeuralNetworkHero"));

const roles = [
  "LangGraph Architect",
  "Multi-Agent Builder",
  "AI Systems Engineer",
  "Claude Code Power User",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden snap-section">
      {/* Three.js Background */}
      <Suspense fallback={null}>
        <NeuralNetworkHero />
      </Suspense>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neural-black/40 via-transparent to-neural-black z-[1]" />

      {/* Content */}
      <motion.div
        className="relative z-[2] text-center px-4 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-2">
          <span className="font-display text-sm tracking-[0.3em] text-neon-violet/80 uppercase">
            AI Systems Engineer
          </span>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlitchText
            text="UTKARSH"
            as="h1"
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider text-white"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 text-lg md:text-xl">
          <Typewriter words={roles} />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-3 font-mono text-sm rounded-lg bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/20 hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transition-all duration-300"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 font-mono text-sm rounded-lg bg-neon-violet/10 text-neon-violet border border-neon-violet/30 hover:bg-neon-violet/20 hover:shadow-[0_0_30px_rgba(157,0,255,0.2)] transition-all duration-300"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center gap-4">
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg text-dim-gray hover:text-cyber-cyan border border-white/10 hover:border-cyber-cyan/30 hover:shadow-[0_0_15px_rgba(0,245,255,0.15)] transition-all duration-300"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg text-dim-gray hover:text-cyber-cyan border border-white/10 hover:border-cyber-cyan/30 hover:shadow-[0_0_15px_rgba(0,245,255,0.15)] transition-all duration-300"
          >
            <Github size={20} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 rounded-full border-2 border-cyber-cyan/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-cyber-cyan/60" />
        </div>
      </motion.div>
    </section>
  );
}
