import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
}

export default function GlitchText({
  text,
  className = "",
  as: Tag = "h2",
}: GlitchTextProps) {
  return (
    <motion.div
      className="relative inline-block"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Tag className={`relative font-display ${className}`}>
        {text}
        <span
          className="absolute top-0 left-0 w-full h-full text-cyber-cyan opacity-80"
          style={{ animation: "glitch-1 3s infinite linear alternate-reverse" }}
          aria-hidden="true"
        >
          {text}
        </span>
        <span
          className="absolute top-0 left-0 w-full h-full text-neon-violet opacity-80"
          style={{ animation: "glitch-2 3s infinite linear alternate-reverse" }}
          aria-hidden="true"
        >
          {text}
        </span>
      </Tag>
    </motion.div>
  );
}
