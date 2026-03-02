import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import CustomCursor from "./components/ui/CustomCursor";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";
import AdminRoute from "./routes/AdminRoute";

const AdminLogin = lazy(() => import("./components/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));

function Portfolio() {
  return (
    <>
      <Navbar />
      <main className="scroll-snap-y scroll-snap-mandatory">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <div className="crt-overlay" />

      <Suspense
        fallback={
          <div className="min-h-screen bg-neural-black flex items-center justify-center">
            <div className="font-mono text-cyber-cyan text-sm animate-pulse">
              Initializing...
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}
