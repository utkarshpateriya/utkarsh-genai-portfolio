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
    setRotateX((y - centerY) / 10);
    setRotateY((centerX - x) / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="holo-card glass rounded-xl p-6 h-full transition-all duration-200"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          boxShadow: `0 0 20px rgba(0, 245, 255, 0.05), inset 0 0 20px rgba(0, 245, 255, 0.02)`,
        }}
      >
        <h3 className="text-xl font-display text-white mb-3">{project.title}</h3>
        <p className="text-dim-gray text-sm leading-relaxed mb-4 font-mono">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono rounded-full border border-neon-violet/30 text-neon-violet bg-neon-violet/5"
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
            className="flex items-center gap-2 px-4 py-2 text-sm font-mono rounded-lg bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20 hover:bg-cyber-cyan/20 transition-colors"
          >
            <ExternalLink size={14} />
            View Project
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-dim-gray hover:text-white border border-white/10 hover:border-white/30 transition-colors"
            >
              <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
