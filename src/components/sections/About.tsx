import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/GlitchText";
import CountUpStat from "../ui/CountUpStat";

const IcosahedronAbout = lazy(() => import("../three/IcosahedronAbout"));

export default function About() {
  return (
    <section id="about" className="relative min-h-screen pt-28 pb-24 px-4 snap-section">
      <div className="max-w-6xl mx-auto">
        <SectionHeading text="ABOUT" as="h2" className="mb-6 text-center" />

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20 mt-12">
          {/* 3D Icosahedron */}
          <motion.div
            className="h-[350px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center label-mono text-dim-gray">Loading...</div>}>
              <IcosahedronAbout />
            </Suspense>
          </motion.div>

          {/* Manifesto text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-body text-[18px] md:text-[20px] font-light leading-[1.8] mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
              I build AI systems that think in graphs, act in agents, and ship to production.
              <span className="text-cyber-cyan"> Not just prompting — engineering.</span>
            </p>

            {/* Quote block */}
            <div className="relative pl-6 py-4 border-l-2 border-neon-violet/40 rounded-r-lg" style={{ backgroundColor: "rgba(157,0,255,0.03)" }}>
              <p className="font-body text-[14px] font-light italic leading-[1.8]" style={{ color: "rgba(255,255,255,0.5)" }}>
                "6 enterprise-scale deliveries. Real systems. Real stakes. Real production."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stat counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <CountUpStat end={6} label="Successful Enterprise Deliveries" />
          <CountUpStat end={3} label="Years Building AI Systems" />
          <CountUpStat end={10} label="AI Agents Shipped to Production" />
          <CountUpStat end={0} label="Lines of Python Written" isInfinity />
        </div>
      </div>
    </section>
  );
}
