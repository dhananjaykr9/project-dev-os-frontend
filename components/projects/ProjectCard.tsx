"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/projects";
import { ArrowUpRight, Cpu, Activity, BarChart3, Github, Globe } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  onViewSystem: () => void;
}

export default function ProjectCard({ project, onViewSystem }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // High-fidelity synthetic beep generator
  const playSystemBeep = () => {
    // FIX: Guard for Vercel Build (Server-side rendering)
    if (typeof window === "undefined") return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = "sine"; 
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); 
      
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); 
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      // Audio might be blocked by browser policy
    }
  };

  const handleInteraction = (callback?: () => void) => {
    playSystemBeep();
    if (callback) callback();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col w-full h-full bg-[#0D0D0D] rounded-[1.5rem] md:rounded-[2.5rem] p-5 sm:p-8 lg:p-10 transition-all duration-300 border border-white/10 hover:border-emerald-500/50 overflow-hidden shadow-2xl"
    >
      {/* ADVANCED MATRIX SCAN OVERLAY */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810a_1px,transparent_1px),linear-gradient(to_bottom,#10b9810a_1px,transparent_1px)] bg-[size:15px_15px] opacity-100" />
            <motion.div 
              initial={{ y: "-20%" }}
              animate={{ y: ["-20%", "120%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
              style={{ translateZ: 0 }}
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_25px_#10b981] z-30"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6 md:mb-10 gap-2">
          <div className="flex gap-2 md:gap-3">
            <motion.div 
              animate={isHovered ? { rotateY: 360, scale: 1.1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="p-2.5 md:p-3 bg-white/5 rounded-xl md:rounded-2xl text-emerald-400 border border-white/10 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300"
            >
              <Cpu size={20} className="md:w-6 md:h-6" />
            </motion.div>

            <div className="flex flex-col gap-2 pt-0.5">
              <AnimatePresence>
                {isHovered && (
                  <>
                    <motion.a 
                      key="github-link"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleInteraction()} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="text-slate-400 hover:text-emerald-400 transition-colors p-1"
                    >
                      <Github size={14} />
                    </motion.a>
                    <motion.a 
                      key="demo-link"
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleInteraction()}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      className="text-slate-400 hover:text-emerald-400 transition-colors p-1"
                    >
                      <Globe size={14} />
                    </motion.a>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1 text-right">
            <span className="font-mono text-[7px] text-slate-500 uppercase tracking-widest">⚙️ Engine</span>
            <span className="font-mono text-[9px] text-emerald-500/80 font-bold uppercase truncate max-w-[120px]">
              {project.specs.engine}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-3 flex-grow">
          <h3 className={`text-xl sm:text-2xl font-black text-white tracking-tighter leading-tight transition-colors uppercase ${isHovered ? 'text-emerald-400' : ''}`}>
            {project.title}
          </h3>
          <p className="text-slate-400 text-[11px] md:text-sm leading-relaxed font-light line-clamp-4 group-hover:text-slate-200 transition-colors">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.techStack.map(tech => (
              <span key={tech} className="px-2 py-0.5 rounded-sm border border-emerald-500/10 bg-emerald-500/5 text-[7px] md:text-[9px] font-mono text-emerald-400/70 uppercase">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="mt-8 pt-6 border-t border-white/5 relative">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-600 font-mono text-[7px] uppercase">
                <Activity size={10} /> Status_Registry
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
                <span className="text-[9px] font-mono text-emerald-400 font-black uppercase tracking-tight">
                  {project.specs.status}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-600 font-mono text-[7px] uppercase">
                <BarChart3 size={10} /> Latency_Check
              </div>
              <span className="text-[9px] font-mono text-white block uppercase font-black tracking-tight">
                {project.specs.latency || "0.00ms"}
              </span>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: "#fff", color: "#000" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleInteraction(onViewSystem)} 
            className="w-full py-4 bg-emerald-500 text-black font-black rounded-xl flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] transition-all duration-300"
          >
            EXEC_SYSTEM_VIEW
            <ArrowUpRight size={14} strokeWidth={3} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}