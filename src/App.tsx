import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Loader3D from "./components/Loader3D";
import ThreeBackground from "./components/ThreeBackground";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// ── Scroll to top on every route change ──────────────────────────────────────
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

// ── Animated page routes ──────────────────────────────────────────────────────
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* Cursor renders globally across all pages always */}
        <Cursor />

        {loading && <Loader3D onComplete={() => setLoading(false)} />}
        {!loading && (
          <BrowserRouter>
            <ScrollToTop />
            <ThreeBackground />
            <Header />
            <main
              className="min-h-screen overflow-hidden"
              style={{
                isolation: "isolate",
                position: "relative",
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
            >
              <AnimatedRoutes />
            </main>
            <Footer />
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;