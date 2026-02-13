"use client";

import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo, useRef } from "react";

const STAGES = [
  { id: "hero", label: "01_SOURCE", sub: "SYSTEM_START" },
  { id: "projects", label: "02_TRANSFORM", sub: "ENGINE_REGISTRY" },
  { id: "experience", label: "03_VALIDATE", sub: "WORK_HISTORY" },
  { id: "stack", label: "04_INFERENCE", sub: "TECH_CAPABILITIES" },
  { id: "contact", label: "05_DEPLOY", sub: "ESTABLISH_UPLINK" },
];

export default function PipelineNav() {
  const [mounted, setMounted] = useState(false);
  const [activeStage, setActiveStage] = useState("hero");
  const { scrollYProgress } = useScroll();
  const prevStageRef = useRef("hero"); 
  
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const movingDotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothDotY = useSpring(movingDotY, { stiffness: 80, damping: 20 });

  const [percent, setPercent] = useState(0);

  // 1. SAFE Audio Context Handler for Vercel Builds
  const playSectionBeep = () => {
    // FIX: Check if window is defined before accessing AudioContext
    if (typeof window === "undefined") return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const audioCtx = new AudioContextClass();
      
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = "sine"; 
      oscillator.frequency.setValueAtTime(900, audioCtx.currentTime); 
      
      gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime); 
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
      // Ignore errors if browser blocks autoplay
    }
  };

  const packets = useMemo(() => Array.from({ length: 3 }), []);

  useEffect(() => {
    if (mounted && activeStage !== prevStageRef.current) {
      playSectionBeep();
      prevStageRef.current = activeStage;
    }
  }, [activeStage, mounted]);

  useEffect(() => {
    setMounted(true);
    const observerOptions = {
      root: null,
      rootMargin: "-48% 0px -48% 0px", 
      threshold: 0, 
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveStage(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    STAGES.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    const unsubscribe = scrollYProgress.on("change", (v) => setPercent(Math.round(v * 100)));
    return () => {
      observer.disconnect();
      unsubscribe();
    };
  }, [scrollYProgress]);

  if (!mounted) return null;

  return (
    <nav className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-start gap-12 z-[100] font-mono">
      {/* Header: Live Status Terminal */}
      <div className="absolute -top-20 left-0 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[7px] text-emerald-500/40 uppercase tracking-widest">Pipeline_Monitor</span>
          <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
        </div>
        <div className="text-[10px] text-white font-black tracking-tighter bg-emerald-500/10 px-2 py-0.5 border-l-2 border-emerald-500">
          {percent.toString().padStart(3, '0')}%_SYNCED
        </div>
      </div>

      {/* The Main Pipeline Track */}
      <div className="absolute left-[3px] top-0 w-[1px] h-full bg-white/5 -z-10 overflow-visible">
        <motion.div
          className="w-full bg-gradient-to-b from-emerald-400 via-cyan-400 to-violet-500 origin-top h-full shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          style={{ scaleY }}
        />

        {packets.map((_, i) => (
          <motion.div
            key={i}
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
            className="absolute left-1/2 -translate-x-1/2 w-[3px] h-4 bg-emerald-500/20 blur-[1px]"
          />
        ))}

        <motion.div style={{ top: smoothDotY }} className="absolute left-1/2 -translate-x-1/2 w-4 h-4 z-20">
          <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_15px_#fff] scale-50" />
          <div className="absolute inset-0 bg-emerald-400 animate-ping rounded-full opacity-30 scale-150" />
        </motion.div>
      </div>

      {/* Navigation Stages */}
      {STAGES.map((stage, index) => {
        const isActive = activeStage === stage.id;

        return (
          <motion.button
            key={stage.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => {
              document.getElementById(stage.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative flex items-center gap-8 outline-none text-left"
          >
            <div className="relative flex items-center justify-center">
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    layoutId="active-nav-ring"
                    className="absolute w-8 h-8 rounded-full border border-emerald-500/10 bg-emerald-500/[0.03]"
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  />
                )}
              </AnimatePresence>

              <div className={`relative w-2 h-2 transition-all duration-500 ${
                isActive 
                ? "bg-white rotate-45 scale-125 shadow-[0_0_10px_#fff]" 
                : "bg-slate-900 border border-white/20 group-hover:border-emerald-500/50"
              }`} />
            </div>

            <div className="flex flex-col">
              <span className={`text-[9px] tracking-[0.4em] transition-all duration-500 ${
                isActive ? "text-emerald-400 font-bold translate-x-1" : "text-slate-500 group-hover:text-slate-300"
              }`}>
                {stage.label}
              </span>
              
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.span 
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    className="text-[7px] text-slate-500 uppercase tracking-widest mt-0.5"
                  >
                    {stage.sub}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        );
      })}

      {/* Footer: Live Coordinates */}
      <div className="absolute -bottom-24 left-0 space-y-1 opacity-40">
        <div className="text-[7px] text-slate-600 uppercase flex justify-between gap-4">
          <span>X_ADDR</span>
          <span className="text-emerald-500 font-mono">0x{percent.toString(16).padStart(2, '0')}</span>
        </div>
        <div className="text-[7px] text-slate-600 uppercase flex justify-between gap-4">
          <span>Y_ADDR</span>
          <span className="text-emerald-500 font-mono">0x{(percent * 2).toString(16).padStart(2, '0')}</span>
        </div>
        <div className="w-16 h-[1px] bg-white/5" />
      </div>
    </nav>
  );
}