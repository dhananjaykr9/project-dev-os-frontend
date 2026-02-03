"use client";

import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// 1. Move the stages array OUTSIDE the component
// This ensures the reference never changes between renders
const STAGES = [
  { id: "hero", label: "01_SOURCE", sub: "SYSTEM_START" },
  { id: "projects", label: "02_TRANSFORM", sub: "ENGINE_REGISTRY" },
  { id: "experience", label: "03_VALIDATE", sub: "WORK_HISTORY" },
  { id: "stack", label: "04_INFERENCE", sub: "TECH_CAPABILITIES" },
  { id: "contact", label: "05_DEPLOY", sub: "ESTABLISH_UPLINK" },
];

export default function PipelineNav() {
  const { scrollYProgress } = useScroll();
  const [activeStage, setActiveStage] = useState("hero");
  
  const translateY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const movingDotY = useSpring(translateY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0.1, 
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveStage(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // 2. Use the constant STAGES here
    STAGES.forEach((stage) => {
      const el = document.getElementById(stage.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []); // 3. Keep the dependency array empty (or remove STAGES)

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-start gap-12 z-50">
      
      {/* The Main Track */}
      <div className="absolute left-[3px] top-0 w-[2px] h-full bg-white/5 -z-10 rounded-full">
        <motion.div
          className="w-full bg-gradient-to-b from-violet-600 via-emerald-400 to-cyan-500 origin-top"
          style={{ scaleY, boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)" }}
        />

        <motion.div 
          style={{ top: movingDotY }}
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20"
        >
          <div className="absolute inset-0 bg-emerald-400 animate-ping rounded-full" />
        </motion.div>
      </div>

      {/* 4. Use the constant STAGES here for rendering */}
      {STAGES.map((stage) => {
        const isActive = activeStage === stage.id;

        return (
          <button
            key={stage.id}
            onClick={() => scrollTo(stage.id)}
            className="group relative flex items-center gap-6 outline-none text-left"
          >
            <div className="relative flex items-center justify-center">
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    layoutId="active-ring"
                    className="absolute w-6 h-6 rounded-full border border-emerald-500/30 bg-emerald-500/5"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              <div className={`relative w-2 h-2 rounded-full transition-all duration-500 border-2 ${
                isActive 
                ? "bg-emerald-400 border-emerald-200 shadow-[0_0_12px_#10b981]" 
                : "bg-slate-950 border-white/10 group-hover:border-white/40"
              }`} />
            </div>

            <div className="flex flex-col">
              <span className={`text-[10px] font-mono tracking-[0.4em] transition-all duration-500 flex items-center gap-3 ${
                isActive ? "text-white translate-x-2" : "text-slate-500 group-hover:text-slate-300"
              }`}>
                {stage.label}
                {isActive && (
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 1 }} 
                    className="w-1 h-3 bg-emerald-400 shadow-[0_0_8px_#10b981]" 
                  />
                )}
              </span>
              <span className={`text-[8px] font-mono transition-all duration-700 uppercase tracking-widest ${
                isActive ? "text-emerald-500/80 opacity-100 translate-x-2" : "text-slate-700 opacity-0"
              }`}>
                {stage.sub}
              </span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}