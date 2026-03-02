import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "../../config/projects.config";
import { Github, ExternalLink } from "lucide-react";

interface HolographicCardProps {
  project: Project;
  index: number;
}

export default function HolographicCard({ project, index }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 12);
    setRotateY((centerX - x) / 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="holo-card glass rounded-xl p-6 h-full transition-all duration-200"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        <h3 className="font-display text-[18px] font-semibold mb-3" style={{ color: "rgba(255,255,255,0.9)" }}>
          {project.title}
        </h3>
        <p className="font-body text-[14px] font-light leading-[1.7] mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[10px] font-mono tracking-[0.1em] uppercase rounded-full border border-neon-violet/20 bg-neon-violet/5"
              style={{ color: "rgba(157,0,255,0.65)" }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 font-mono text-[11px] tracking-[0.1em] uppercase rounded-lg border transition-colors"
            style={{
              color: "rgba(0,245,255,0.8)",
              borderColor: "rgba(0,245,255,0.15)",
              backgroundColor: "rgba(0,245,255,0.05)",
            }}
          >
            <ExternalLink size={12} />
            View Project
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors"
              style={{ color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Github size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
