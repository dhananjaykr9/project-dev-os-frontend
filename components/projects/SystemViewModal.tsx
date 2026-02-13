"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, Cpu, ShieldCheck, Zap, Database, Copy, Check, Terminal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import SystemArchitecture from "./SystemArchitecture"; 
import { Project } from "@/lib/projects";

export default function SystemViewModal({ 
  project, 
  isOpen, 
  onClose 
}: { 
  project: Project | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  const [isInitializing, setIsInitializing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsInitializing(true);
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsInitializing(false), 500);
            return 100;
          }
          const jump = Math.floor(Math.random() * 25) + 5;
          return Math.min(prev + jump, 100);
        });
      }, 120);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [progress]);

  const copyToClipboard = () => {
    if (project?.architecture) {
      navigator.clipboard.writeText(project.architecture);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!project) return null;

  const systemLogs = [
    { threshold: 0, text: "Bypassing firewall..." },
    { threshold: 10, text: "Uplink handshake: ESTABLISHED" },
    { threshold: 25, text: `Pulling node_${project.id.slice(0, 4)} core details...` },
    { threshold: 40, text: "Running architecture sanity check..." },
    { threshold: 60, text: "Compiling system schematics..." },
    { threshold: 80, text: "Optimizing SVG vector rendering..." },
    { threshold: 95, text: "Handing over to GUI thread..." },
    { threshold: 100, text: "Success. Welcome, Admin." },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with grain texture */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[150] cursor-zoom-out"
          >
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>

          {/* Main Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateX: 20, y: 50 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotateY: 10, filter: "blur(20px)" }}
            transition={{ type: "spring", damping: 18, stiffness: 120 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-[#050505] border border-emerald-500/30 rounded-[1rem] md:rounded-[2rem] z-[151] overflow-hidden flex flex-col shadow-[0_0_80px_rgba(16,185,129,0.15)] perspective-1200"
          >
            {/* Top Scanning Laser Bar */}
            {isInitializing && (
              <motion.div 
                animate={{ top: ["-5%", "105%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 h-[2px] bg-emerald-400 shadow-[0_0_15px_#10b981] z-[160] pointer-events-none opacity-50"
              />
            )}

            {/* Header: Identity & Actions */}
            <div className="p-5 md:p-8 border-b border-white/5 flex justify-between items-center bg-emerald-500/[0.03] relative overflow-hidden">
               <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_5s_infinite_linear]" />
              
              <div className="space-y-1 relative z-10">
                <div className="flex items-center gap-2 text-emerald-500 font-mono text-[9px] uppercase tracking-[0.4em]">
                  <Terminal size={10} className="animate-pulse" /> 
                  Terminal_UID: {project.id.toUpperCase()}_v2
                </div>
                <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter">
                  {project.title}<span className="text-emerald-500 opacity-50">.env</span>
                </h2>
              </div>
              
              <div className="flex items-center gap-2 md:gap-4 relative z-10">
                <button 
                  onClick={copyToClipboard}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-emerald-400 transition-all font-mono text-[10px]"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  {copied ? "COPIED" : "GET_SCHEMA"}
                </button>
                <button 
                  onClick={onClose}
                  className="p-2.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Body Section */}
            <div className="flex-grow overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
              <AnimatePresence mode="wait">
                {isInitializing ? (
                  /* LOADER VIEW */
                  <motion.div 
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full flex flex-col items-center justify-center space-y-10"
                  >
                    <div className="relative">
                       {/* Circular Progress (Image tag used for reference if needed elsewhere) */}
                      <svg className="w-40 h-40 transform -rotate-90">
                        <circle cx="80" cy="80" r="75" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-emerald-500/10" />
                        <motion.circle 
                          cx="80" cy="80" r="75" stroke="currentColor" strokeWidth="3" fill="transparent" 
                          strokeDasharray="471"
                          animate={{ strokeDashoffset: 471 - (471 * progress) / 100 }}
                          className="text-emerald-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                         <span className="text-3xl font-bold text-white tracking-tighter">{progress}%</span>
                         <span className="text-[8px] text-emerald-500 animate-pulse">SYNCING</span>
                      </div>
                    </div>

                    <div className="w-full max-w-sm space-y-3 font-mono">
                      <div className="flex justify-between text-[8px] text-slate-600 mb-2">
                        <span>NODE_DATA_BUFFER</span>
                        <span>0x449FF_STATUS</span>
                      </div>
                      <div ref={scrollRef} className="h-28 overflow-hidden bg-emerald-500/[0.02] border border-emerald-500/10 rounded-lg p-4 space-y-1">
                        {systemLogs.map((log, i) => (
                          progress >= log.threshold && (
                            <motion.p 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              key={i} 
                              className="text-[9px] text-slate-400 font-mono tracking-tight"
                            >
                              <span className="text-emerald-500/40 mr-2">»</span> {log.text}
                            </motion.p>
                          )
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* MAIN DATA REVEAL */
                  <motion.div 
                    key="content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-10"
                  >
                    {/* Visualizer Block */}
                    <div className="relative group/arch">
                       <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-xl opacity-20 group-hover/arch:opacity-40 transition-opacity" />
                       <SystemArchitecture definition={project.architecture} />
                    </div>
                    
                    {/* Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 font-mono">
                      <div className="md:col-span-8 p-6 rounded-xl bg-white/[0.03] border border-white/5 space-y-4">
                        <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                          <Database size={12} /> Kernel_Description
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="md:col-span-4 p-6 rounded-xl bg-white/[0.03] border border-white/5 space-y-6">
                        <div className="space-y-4">
                           <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                             <Zap size={12} /> Tech_Manifest
                           </div>
                           <div className="flex flex-wrap gap-2">
                             {project.techStack.map(t => (
                               <span key={t} className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[9px] text-emerald-400">
                                 {t}
                               </span>
                             ))}
                           </div>
                        </div>
                        
                        <div className="pt-4 border-t border-white/5">
                           <p className="text-[8px] text-slate-600 mb-2 uppercase">Integrity_Check</p>
                           <div className="flex items-center justify-between">
                              <span className="text-[10px] text-white">VERIFIED</span>
                              <ShieldCheck size={14} className="text-emerald-500" />
                           </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Real-time Telemetry Footer */}
            <div className="px-8 py-3 border-t border-white/5 bg-black flex justify-between items-center font-mono">
              <div className="flex items-center gap-6 text-[8px] text-slate-600 uppercase">
                <span className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors cursor-default">
                  <Activity size={10} /> CORE_TEMP: 34°C
                </span>
                <span className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors cursor-default">
                  <Cpu size={10} /> THREADS: 16_ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-2 text-[8px] text-emerald-500/40">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                D-K_CLOUD_SERVER_ESTABLISHED
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}