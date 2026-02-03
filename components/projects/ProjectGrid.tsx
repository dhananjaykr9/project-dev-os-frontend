"use client";

import { useSystemStore } from "@/store/useSystemStore";
import { PROJECTS } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { Terminal, Database } from "lucide-react";

export default function ProjectGrid() {
  const { activeRole } = useSystemStore();
  const [isGlitching, setIsGlitching] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const filteredProjects = useMemo(() => 
    PROJECTS.filter((p) => activeRole === "ALL" || p.category === activeRole),
    [activeRole]
  );

  useEffect(() => {
    setIsGlitching(true);
    const timer = setTimeout(() => setIsGlitching(false), 400);
    return () => clearTimeout(timer);
  }, [activeRole]);

  if (!mounted) return null;

  return (
    <div className="w-full relative space-y-12">
      {/* Registry Status Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8 font-mono">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500">
            <Terminal size={14} />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
              ⚡ Query_Status: Success
            </span>
          </div>
          <h3 className="text-white text-xl font-bold tracking-tighter uppercase">
            📂 Active_Module_Registry
          </h3>
        </div>

        <div className="flex gap-8 text-[9px] tracking-widest text-slate-500 uppercase">
          <div className="flex flex-col gap-1">
            <span>📊 Modules_Loaded</span>
            <span className="text-white font-bold">
              {filteredProjects.length.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="flex flex-col gap-1 border-l border-white/10 pl-8">
            <span>🌐 System_Sector</span>
            <span className="text-emerald-500 font-bold">{activeRole}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <AnimatePresence>
          {isGlitching && (
            <motion.div
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "linear" }}
              className="absolute inset-x-0 h-[2px] bg-emerald-500/50 shadow-[0_0_15px_#10b981] z-50 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <motion.div 
          key={activeRole}
          layout
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 items-stretch ${
            isGlitching ? "animate-recompile opacity-80" : ""
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.04,
                  ease: [0.23, 1, 0.32, 1] 
                }}
                className="flex w-full" 
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Enhanced Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-48 flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-white/5 bg-white/[0.01]"
        >
          <div className="relative mb-8">
            <Database size={40} className="text-slate-800" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-slate-400 font-mono text-xs tracking-[0.5em] uppercase font-bold">
              ⚠️ 0x404: Null_Registry_Entry
            </p>
            <p className="text-slate-600 font-mono text-[10px] uppercase tracking-widest">
              🔍 Specified sector currently contains no initialized modules
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}