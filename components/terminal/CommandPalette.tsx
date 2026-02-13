"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Terminal, Mail, Github, ChevronRight, Activity } from "lucide-react";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // Defined handlers to make the commands functional
  const actions = useMemo(() => [
    { 
      icon: <FileText size={18} />, 
      label: "Download CV_Registry", 
      cmd: "resume", 
      color: "text-blue-400",
      handler: () => window.open('/resume.pdf', '_blank')
    },
    { 
      icon: <Terminal size={18} />, 
      label: "View SmartFlow Architecture", 
      cmd: "demo", 
      color: "text-emerald-400",
      handler: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    },
    { 
      icon: <Github size={18} />, 
      label: "Source Control (GitHub)", 
      cmd: "git", 
      color: "text-slate-400",
      handler: () => window.open('https://github.com/dhananjaykr9', '_blank')
    },
    { 
      icon: <Mail size={18} />, 
      label: "Initialize Contact_Protocol", 
      cmd: "mail", 
      color: "text-violet-400",
      handler: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    },
  ], []);

  const filtered = actions.filter(a => 
    a.label.toLowerCase().includes(query.toLowerCase()) || 
    a.cmd.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette with CMD+K or CTRL+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      if (!isOpen) return;

      if (e.key === "Escape") setIsOpen(false);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % filtered.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filtered.length) % filtered.length);
      }
      
      if (e.key === "Enter" && filtered[activeIndex]) {
        e.preventDefault();
        filtered[activeIndex].handler();
        setIsOpen(false);
        setQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, activeIndex]);

  // Reset selection when search changes
  useEffect(() => { setActiveIndex(0); }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Layer */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[#050505]/95 backdrop-blur-xl z-[100]"
          />

          {/* Palette Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl bg-[#0A0A0A] rounded-[2rem] overflow-hidden z-[101] shadow-[0_0_100px_rgba(16,185,129,0.1)] border border-white/10"
          >
            {/* Logic Header */}
            <div className="flex items-center gap-4 px-8 py-6 border-b border-white/5 bg-white/[0.02]">
              <Search className="text-emerald-500" size={18} />
              <input 
                autoFocus
                placeholder="Search commands (e.g. 'git', 'demo')..."
                className="bg-transparent border-none outline-none text-white w-full font-mono text-sm placeholder:text-slate-700"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-2">
                 <Activity size={12} className="text-emerald-500/50 animate-pulse" />
                 <kbd className="bg-white/5 px-2 py-1 rounded text-[9px] text-slate-500 font-mono border border-white/10">ESC</kbd>
              </div>
            </div>

            <div className="p-3 max-h-[380px] overflow-y-auto">
              {filtered.map((action, idx) => (
                <button 
                  key={action.label}
                  onClick={() => { action.handler(); setIsOpen(false); }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group relative ${
                    idx === activeIndex ? "bg-white/5 border-white/5 shadow-inner" : "border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`p-2.5 rounded-xl bg-black/50 border border-white/5 ${action.color}`}>
                      {action.icon}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className={`text-sm transition-colors ${idx === activeIndex ? "text-white" : "text-slate-400"}`}>
                        {action.label}
                      </span>
                      <span className="text-[9px] text-slate-600 font-mono uppercase tracking-widest mt-0.5">
                        Short_Code: {action.cmd}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <AnimatePresence>
                      {idx === activeIndex && (
                        <motion.span 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-emerald-500 flex items-center gap-2"
                        >
                          <span className="text-[9px] font-mono text-emerald-500/50 uppercase tracking-tighter">Execute</span>
                          <ChevronRight size={14} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              ))}

              {filtered.length === 0 && (
                <div className="py-20 text-center flex flex-col items-center gap-4">
                  <Terminal size={24} className="text-slate-800" />
                  <p className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.3em]">
                    Command_Not_Found
                  </p>
                </div>
              )}
            </div>

            {/* Sub-System Footer */}
            <div className="px-8 py-4 bg-white/[0.01] border-t border-white/5 flex justify-between items-center">
               <div className="flex gap-6">
                  <div className="flex items-center gap-2 opacity-40">
                    <div className="w-1 h-1 rounded-full bg-slate-500" />
                    <span className="text-[8px] text-slate-400 font-mono uppercase tracking-widest">Navigate: ↑↓</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-40">
                    <div className="w-1 h-1 rounded-full bg-slate-500" />
                    <span className="text-[8px] text-slate-400 font-mono uppercase tracking-widest">Select: Enter</span>
                  </div>
               </div>
               <span className="text-[8px] text-emerald-500/30 font-mono uppercase tracking-[0.4em]">Auth_Kernel: Active</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}