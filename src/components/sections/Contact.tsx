import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
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
        ctx.strokeStyle = line === 0 ? "#00f5ff12" : line === 1 ? "#9d00ff0d" : "#00f5ff08";
        ctx.lineWidth = 1;

        for (let x = 0; x < w; x += 2) {
          const y =
            h / 2 +
            Math.sin(x * 0.01 + time * (0.5 + line * 0.3)) * (20 + line * 10) +
            Math.sin(x * 0.02 + time * 0.8) * (10 + line * 5);
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
      className="absolute inset-0 w-full h-full opacity-50"
      style={{ pointerEvents: "none" }}
    />
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-[60vh] pt-28 pb-24 px-4 flex items-center justify-center snap-section">
      <SignalWave />

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-heading mb-3"
        >
          LET'S BUILD
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-display text-[20px] md:text-[24px] font-semibold mb-14"
          style={{ color: "rgba(0, 245, 255, 0.6)" }}
        >
          SOMETHING INTELLIGENT
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-5"
        >
          <a
            href={`mailto:${socialLinks.email}`}
            className="flex items-center gap-2 px-6 py-2.5 font-mono text-[12px] tracking-[0.1em] uppercase rounded-lg border transition-all duration-300"
            style={{
              color: "rgba(0, 245, 255, 0.85)",
              borderColor: "rgba(0, 245, 255, 0.2)",
              backgroundColor: "rgba(0, 245, 255, 0.06)",
            }}
          >
            <Mail size={14} />
            Email Me
          </a>
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

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 font-body text-[12px] font-light"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Built with Claude Code. Powered by curiosity.
        </motion.p>
      </div>
    </section>
  );
}
