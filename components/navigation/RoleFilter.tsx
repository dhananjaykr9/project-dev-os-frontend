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

  const roles: { id: SystemRole; label: string }[] = [
    { id: "ALL", label: "Full_Stack" },
    { id: "DATA_ENGINEER", label: "Data_Eng" },
    { id: "ML_ENGINEER", label: "ML_Ops" },
    { id: "AI_ENGINEER", label: "Gen_AI" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Segmented Controller Container */}
      <div className="relative flex flex-wrap md:flex-nowrap p-1.5 gap-1 bg-[#080808] border border-white/5 rounded-2xl backdrop-blur-xl shadow-2xl">
        {roles.map((role) => {
          const isActive = activeRole === role.id;
          
          return (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`relative flex-1 group px-4 py-3 transition-all duration-500 rounded-xl outline-none ${
                isActive ? "text-white" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {/* Active Pill: Shared layoutId for smooth sliding */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="active-segment"
                    className="absolute inset-0 bg-white/[0.03] border border-white/10 rounded-xl -z-10 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  >
                    {/* Emerald Bottom Beam */}
                    <motion.div 
                      layoutId="active-beam"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" 
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10 flex flex-col items-center gap-1">
                {/* Technical Index Tag */}
                <span className={`text-[7px] font-mono uppercase tracking-[0.4em] transition-colors duration-500 ${
                  isActive ? "text-emerald-500" : "text-slate-700"
                }`}>
                  SEC_{role.id.substring(0, 3)}
                </span>
                
                {/* Main Label: Magnetic Slide effect on hover */}
                <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest whitespace-nowrap group-hover:translate-y-[-1px] transition-transform">
                  {role.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Environmental Status Display */}
      <div className="mt-6 flex justify-center h-4">
        {mounted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10"
          >
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-mono text-emerald-500/70 uppercase tracking-[0.2em]">
              Uplink_Active: <span className="text-emerald-500">{activeRole}</span>
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}