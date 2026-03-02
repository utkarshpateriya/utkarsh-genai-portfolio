import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const allSections = [{ href: "#hero" }, ...navLinks];
    const sections = allSections.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "py-3 bg-neural-black/80 backdrop-blur-xl border-b border-white/5"
            : "py-5 bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="font-display text-[18px] font-semibold tracking-[0.15em] transition-colors"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            U<span className="text-cyber-cyan">.</span>AI
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] uppercase rounded transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "text-cyber-cyan bg-cyber-cyan/8"
                    : "hover:text-white/70"
                }`}
                style={{
                  color: activeSection === link.href.slice(1) ? undefined : "rgba(255,255,255,0.4)",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-neural-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-5 right-5 p-2"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-[22px] font-semibold tracking-[0.08em] transition-colors"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
