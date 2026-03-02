import { motion } from "framer-motion";

interface SectionHeadingProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
}

export default function SectionHeading({
  text,
  className = "",
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Tag className={`section-heading ${className}`}>{text}</Tag>
    </motion.div>
  );
}
