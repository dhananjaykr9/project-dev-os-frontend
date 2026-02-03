"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/projects";
import { ArrowUpRight, Cpu, Activity, BarChart3, Github, Globe } from "lucide-react";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col w-full h-full bg-[#0D0D0D] rounded-[2.5rem] p-8 lg:p-10 transition-all duration-500 border border-white/10 hover:border-emerald-500/50 overflow-hidden shadow-2xl"
    >
      {/* UPDATED: Optimized Scanning Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500">
        {/* Background Grid - Increased opacity for visibility */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810a_1px,transparent_1px),linear-gradient(to_bottom,#10b9810a_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Scanning Line - Switched from 'top' to 'y' for GPU acceleration */}
        <motion.div 
          initial={{ y: "-100%" }}
          animate={{ y: "1000%" }} // Adjusted to cover full height based on container
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ translateZ: 0 }} // Forces GPU rendering on Vercel
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_15px_#10b981]"
        />
      </div>

      {/* Background Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] group-hover:bg-emerald-500/20 transition-all duration-700 pointer-events-none z-0" />

      <div className="relative z-20 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex gap-3">
            <div className="p-3 bg-white/5 rounded-2xl text-emerald-400 border border-white/10 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
              <Cpu size={24} />
            </div>
            <div className="flex flex-col gap-1.5 pt-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
              <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors"><Github size={14} /></a>
              <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors"><Globe size={14} /></a>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-[8px] text-slate-400 uppercase tracking-[0.4em]">⚙️ Engine_Module</span>
            <span className="font-mono text-[10px] text-white font-medium uppercase tracking-widest">
              {project.specs.engine}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4 flex-grow">
          <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tighter leading-tight group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-300 text-sm lg:text-base leading-relaxed line-clamp-3 font-normal">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-4">
            {project.techStack.map(tech => (
              <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-[10px] font-mono text-emerald-100 uppercase tracking-widest">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Activity size={12} />
                <span className="text-[9px] font-mono uppercase tracking-[0.4em]">📡 Status</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                  {project.specs.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <BarChart3 size={12} />
                <span className="text-[9px] font-mono uppercase tracking-[0.4em]">⚡ Latency</span>
              </div>
              <span className="text-xs font-mono text-white block uppercase font-bold">
                {project.specs.latency || "0.00ms"}
              </span>
            </div>
          </div>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 bg-emerald-500 text-black font-black rounded-2xl flex items-center justify-center gap-3 text-[11px] tracking-[0.3em] transition-all duration-300 hover:bg-white group/btn"
          >
            📂 EXEC_SYSTEM_VIEW
            <ArrowUpRight size={18} strokeWidth={3} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
