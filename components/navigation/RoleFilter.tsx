"use client";

import { useSystemStore, SystemRole } from "@/store/useSystemStore";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function RoleFilter() {
  const { activeRole, setActiveRole } = useSystemStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use Web Audio API with SSR Safety guard
  const playClick = () => {
    // FIX: Guard for Vercel Build (Server-side rendering)
    if (typeof window === "undefined") return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const audioCtx = new AudioContextClass();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = "sine"; 
      oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); 
      
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); 
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 1);
    } catch (e) {
      // Audio context might be blocked by browser until user interaction
    }
  };

  const roles: { id: SystemRole; label: string }[] = [
    { id: "ALL", label: "Full_Stack" },
    { id: "DATA_ENGINEER", label: "Data_Eng" },
    { id: "ML_ENGINEER", label: "ML_Ops" },
    { id: "AI_ENGINEER", label: "Gen_AI" },
  ];

  const handleRoleChange = (roleId: SystemRole) => {
    if (roleId !== activeRole) {
      playClick();
      setActiveRole(roleId);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      <div className="relative grid grid-cols-2 md:flex md:flex-nowrap p-1.5 gap-1.5 bg-[#080808] border border-white/5 rounded-2xl md:rounded-full backdrop-blur-xl shadow-2xl">
        {roles.map((role) => {
          const isActive = activeRole === role.id;
          
          return (
            <button
              key={role.id}
              onClick={() => handleRoleChange(role.id)}
              className={`relative flex-1 group px-3 py-3 md:px-4 md:py-3.5 transition-all duration-500 rounded-xl md:rounded-full outline-none ${
                isActive ? "text-white" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="active-segment"
                    className="absolute inset-0 bg-white/[0.04] border border-white/10 rounded-xl md:rounded-full -z-10 shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  >
                    <motion.div 
                      layoutId="active-beam"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" 
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10 flex flex-col items-center gap-1">
                <span className={`text-[6px] md:text-[7px] font-mono uppercase tracking-[0.3em] md:tracking-[0.4em] transition-colors duration-500 ${
                  isActive ? "text-emerald-500" : "text-slate-700"
                }`}>
                  SEC_{role.id.substring(0, 3)}
                </span>
                
                <span className="text-[9px] md:text-xs font-mono font-bold uppercase tracking-wider md:tracking-widest whitespace-nowrap">
                  {role.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center h-4">
        {mounted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 md:gap-3 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10"
          >
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[7px] md:text-[8px] font-mono text-emerald-500/70 uppercase tracking-[0.2em]">
              Uplink_Active: <span className="text-emerald-500">{activeRole}</span>
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}