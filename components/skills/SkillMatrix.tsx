"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Database, Zap, Code, Activity, Terminal, Layers, ArrowUpRight } from "lucide-react";

export default function SkillMatrix() {
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dimensions = [
    {
      title: "LANGUAGES",
      icon: <Code size={18} />,
      skills: ["Python", "SQL (T-SQL)", "TypeScript"],
      accent: "from-blue-500/20",
      glow: "group-hover:shadow-[0_0_50px_rgba(59,130,246,0.15)]"
    },
    {
      title: "DATA_ENG",
      icon: <Database size={18} />,
      skills: ["SQL Server", "SSMS", "ETL Pipelines", "Star Schema"],
      accent: "from-emerald-500/20",
      glow: "group-hover:shadow-[0_0_50px_rgba(16,185,129,0.15)]"
    },
    {
      title: "ML_OPS",
      icon: <Zap size={18} />,
      skills: ["FastAPI", "Docker", "ONNX", "Scikit-Learn"],
      accent: "from-violet-500/20",
      glow: "group-hover:shadow-[0_0_50px_rgba(139,92,246,0.15)]"
    },
    {
      title: "AI_GEN",
      icon: <Layers size={18} />,
      skills: ["LangChain", "RAG", "Prompt Eng", "Gemini API"],
      accent: "from-cyan-500/20",
      glow: "group-hover:shadow-[0_0_50px_rgba(6,182,212,0.15)]"
    },
  ];

  if (!mounted) return null;

  return (
    <div id="stack" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:80px_80px] -z-10" />

      <div className="flex flex-col items-center mb-16 md:mb-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 px-4 py-2 border border-emerald-500/20 rounded-full mb-6 bg-emerald-500/5 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.1)]"
        >
          <Terminal size={12} className="text-emerald-500 animate-pulse" />
          <span className="font-mono text-[8px] md:text-[9px] text-emerald-500 tracking-[0.3em] md:tracking-[0.5em] uppercase font-bold">
            System_Architecture // Intelligence_Hub
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 uppercase leading-none"
        >
          Inference_Engine
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 font-mono text-xs uppercase tracking-widest italic"
        >
          05_INFERENCE
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
        {dimensions.map((dim, idx) => (
          <motion.div
            key={dim.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group relative bg-[#0A0A0A] border border-white/5 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] transition-all duration-700 hover:border-emerald-500/30 ${dim.glow} flex flex-col justify-between overflow-hidden perspective-1000`}
          >
            {/* MATRIX SCAN EFFECT */}
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.div
                  initial={{ top: "-100%" }}
                  animate={{ top: "200%" }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent z-20 pointer-events-none"
                >
                  {/* Bright scanning edge */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-emerald-500/40 shadow-[0_0_15px_#10b981]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gradient Accent Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${dim.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8 md:mb-14">
                <motion.div
                  className="relative p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl text-white group-hover:text-black overflow-hidden shadow-xl"
                  animate={{
                    rotateY: hoveredIndex === idx ? 360 : 0,
                    z: hoveredIndex === idx ? 50 : 0
                  }}
                  transition={{
                    rotateY: { duration: 1, ease: "circOut" },
                    z: { duration: 0.3 }
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="relative z-10">
                    {dim.icon}
                  </div>
                </motion.div>

                <div className="text-right font-mono space-y-1">
                  <p className="text-[7px] text-slate-700 uppercase tracking-widest">Dim_ID</p>
                  <p className="text-[10px] text-emerald-500 font-bold">0x0{idx + 1}</p>
                </div>
              </div>

              <h3 className="text-[10px] md:text-[12px] font-mono font-black tracking-[0.3em] md:tracking-[0.5em] text-slate-500 group-hover:text-white transition-colors mb-8 md:mb-12 border-l-2 border-emerald-500/20 pl-4 md:pl-6 uppercase">
                {dim.title}
              </h3>

              <div className="space-y-6 md:space-y-8">
                {dim.skills.map((skill, sIdx) => (
                  <div key={skill} className="group/item relative">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] md:text-[13px] font-medium text-slate-400 group-hover/item:text-white transition-colors">
                          {skill}
                        </span>
                        <span className="text-[7px] font-mono text-slate-600 uppercase tracking-tighter opacity-0 group-hover/item:opacity-100 transition-opacity">
                          SYSTEM_ALLOCATED // ADDR_0x{((idx + 1) * (sIdx + 1)).toString(16).padStart(2, '0').toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Activity size={10} className="text-emerald-500/10 group-hover/item:text-emerald-500 transition-colors" />
                        <span className="text-[7px] font-mono text-emerald-500/50 group-hover/item:text-emerald-500 transition-colors">
                          LOAD: {75 + (idx * 5) + (sIdx * 2)}%
                        </span>
                      </div>
                    </div>

                    <div className="h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full">
                      <motion.div
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "0%" }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 2,
                          delay: (idx * 0.1) + (sIdx * 0.15),
                          ease: [0.23, 1, 0.32, 1]
                        }}
                        className="h-full w-full bg-gradient-to-r from-transparent via-emerald-500/80 to-emerald-500/10"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-10 md:mt-14 pt-6 md:pt-8 border-t border-white/5 flex items-center justify-between opacity-30 group-hover:opacity-100 transition-all duration-700">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter">Optimized_Flow</span>
              </div>
              <motion.div whileHover={{ x: 3 }} className="flex items-center gap-1 cursor-pointer">
                <span className="text-[8px] font-mono text-slate-700 uppercase">Layer_0{idx + 1}</span>
                <ArrowUpRight size={8} className="text-slate-700 group-hover:text-emerald-500 transition-colors" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}