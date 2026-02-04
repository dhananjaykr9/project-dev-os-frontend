"use client";

import { useSystemStore } from "@/store/useSystemStore";
import { PROJECTS, Project } from "@/lib/projects"; // Import Project type
import ProjectCard from "./ProjectCard";
import SystemViewModal from "./SystemViewModal"; // Import your new modal
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { Database, ShieldAlert, Cpu, Activity, Hash } from "lucide-react";

export default function ProjectGrid() {
  const { activeRole } = useSystemStore();
  const [isGlitching, setIsGlitching] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Modal State Logic
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const filteredProjects = useMemo(() => 
    PROJECTS.filter((p) => activeRole === "ALL" || p.category === activeRole),
    [activeRole]
  );

  useEffect(() => {
    setIsGlitching(true);
    const timer = setTimeout(() => setIsGlitching(false), 350); 
    return () => clearTimeout(timer);
  }, [activeRole]);

  // Handler to open modal
  const handleOpenSystemView = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  if (!mounted) return null;

  return (
    <div className="w-full relative space-y-8 md:space-y-12 min-h-[600px] px-1">
      {/* Registry Status Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8 font-mono relative">
        <div className="space-y-2">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-emerald-500"
          >
            <Activity size={14} className="animate-pulse" />
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">
              ⚡ Status: Query_Optimized // Sector_{activeRole}
            </span>
          </motion.div>
          <h3 className="text-white text-lg md:text-xl font-black tracking-tighter uppercase flex items-center gap-3">
            <Hash size={18} className="text-emerald-500/50" /> Active_Module_Registry
          </h3>
        </div>

        <div className="flex gap-6 md:gap-8 text-[8px] md:text-[9px] tracking-widest text-slate-500 uppercase">
          <div className="flex flex-col gap-1 border-l border-emerald-500/20 pl-4">
            <span className="flex items-center gap-2"><Cpu size={10} /> Modules</span>
            <span className="text-white font-bold text-xs md:text-sm">
              {filteredProjects.length.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="flex flex-col gap-1 border-l border-white/10 pl-4 md:pl-8">
            <span className="flex items-center gap-2"><Database size={10} /> Data_Source</span>
            <span className="text-emerald-500 font-bold text-xs md:text-sm truncate max-w-[120px]">
              {activeRole === "ALL" ? "GLOBAL_DB" : activeRole}
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        <AnimatePresence>
          {isGlitching && (
            <>
              <motion.div
                initial={{ top: "0%", opacity: 0 }}
                animate={{ top: "100%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_30px_#10b981] z-50 pointer-events-none"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-emerald-500/[0.02] z-40 pointer-events-none backdrop-blur-[2px]"
              />
            </>
          )}
        </AnimatePresence>

        <LayoutGroup>
          <motion.div 
            layout
            className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-12 items-stretch transition-all duration-300 ${
              isGlitching ? "opacity-50 blur-[2px] scale-[0.99]" : "opacity-100 blur-0 scale-100"
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(15px)", transition: { duration: 0.2 } }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.03,
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="flex w-full min-w-0"
                >
                  <ProjectCard 
                    project={project} 
                    onViewSystem={() => handleOpenSystemView(project)} // Trigger the modal handler
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      {/* Modal Integration */}
      <SystemViewModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Empty State */}
      <AnimatePresence>
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="py-32 md:py-48 flex flex-col items-center justify-center rounded-[2rem] md:rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01] backdrop-blur-sm"
          >
            <div className="relative mb-8">
              <ShieldAlert size={40} className="text-slate-800" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_#ef4444]" />
            </div>
            <div className="text-center px-6 space-y-3">
              <p className="text-slate-400 font-mono text-xs tracking-[0.4em] uppercase font-black">
                ⚠️ Fatal_Error: Sector_Null
              </p>
              <p className="text-slate-600 font-mono text-[10px] uppercase tracking-widest max-w-[320px] mx-auto leading-relaxed">
                Specified coordinates contain no valid modules. <br />
                Try re-initializing the query parameters.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}