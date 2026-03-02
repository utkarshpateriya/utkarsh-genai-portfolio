import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import GlitchText from "../ui/GlitchText";
import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "../../config/social.config";

function SignalWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (let line = 0; line < 3; line++) {
        ctx.beginPath();
        ctx.strokeStyle = line === 0 ? "#00f5ff15" : line === 1 ? "#9d00ff10" : "#00f5ff08";
        ctx.lineWidth = 1.5;

        for (let x = 0; x < w; x += 2) {
          const y =
            h / 2 +
            Math.sin((x * 0.01) + time * (0.5 + line * 0.3)) * (20 + line * 10) +
            Math.sin((x * 0.02) + time * 0.8) * (10 + line * 5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.02;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      style={{ pointerEvents: "none" }}
    />
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-[60vh] py-24 px-4 flex items-center justify-center snap-section">
      <SignalWave />

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center flex flex-col items-center">
        <GlitchText
          text="LET'S BUILD"
          as="h2"
          className="text-4xl md:text-5xl text-white mb-2"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-xl md:text-2xl text-cyber-cyan/80 mb-12"
        >
          SOMETHING INTELLIGENT
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-6"
        >
          <a
            href={`mailto:${socialLinks.email}`}
            className="flex items-center gap-2 px-6 py-3 font-mono text-sm rounded-lg bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/20 hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transition-all duration-300"
          >
            <Mail size={16} />
            Email Me
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg text-dim-gray hover:text-neon-violet border border-white/10 hover:border-neon-violet/30 hover:shadow-[0_0_15px_rgba(157,0,255,0.2)] transition-all duration-300"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg text-dim-gray hover:text-neon-violet border border-white/10 hover:border-neon-violet/30 hover:shadow-[0_0_15px_rgba(157,0,255,0.2)] transition-all duration-300"
          >
            <Github size={20} />
          </a>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-dim-gray/50 text-xs font-mono"
        >
          Built with Claude Code. Powered by curiosity.
        </motion.p>
      </div>
    </section>
  );
}
