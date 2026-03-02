import { motion } from "framer-motion";
import GlitchText from "../ui/GlitchText";
import HolographicCard from "../ui/HolographicCard";
import { projects as configProjects } from "../../config/projects.config";

export default function Projects() {
  const visibleProjects = configProjects.filter((p) => p.visible);

  return (
    <section id="projects" className="relative min-h-screen py-24 px-4 snap-section">
      <div className="max-w-6xl mx-auto">
        <GlitchText text="PROJECTS" as="h2" className="text-4xl md:text-5xl text-white mb-4 text-center" />
        <p className="text-center text-dim-gray font-mono text-sm mb-16">
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
            className="text-center text-dim-gray font-mono"
          >
            Projects loading...
          </motion.p>
        )}
      </div>
    </section>
  );
}
