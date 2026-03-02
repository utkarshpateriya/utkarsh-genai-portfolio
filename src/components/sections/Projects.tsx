import { motion } from "framer-motion";
import SectionHeading from "../ui/GlitchText";
import HolographicCard from "../ui/HolographicCard";
import { projects as configProjects } from "../../config/projects.config";

export default function Projects() {
  const visibleProjects = configProjects.filter((p) => p.visible);

  return (
    <section id="projects" className="relative min-h-screen pt-28 pb-24 px-4 snap-section">
      <div className="max-w-6xl mx-auto">
        <SectionHeading text="PROJECTS" as="h2" className="mb-3 text-center" />
        <p className="text-center label-mono mb-14" style={{ color: "rgba(255,255,255,0.35)" }}>
          Systems built. Problems solved. Production shipped.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {visibleProjects.map((project, index) => (
            <HolographicCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {visibleProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center label-mono"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Projects loading...
          </motion.p>
        )}
      </div>
    </section>
  );
}
