"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Database, Zap, Code, Shield, Activity, Terminal, Layers } from "lucide-react";

export default function SkillMatrix() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dimensions = [
    { 
      title: "LANGUAGES", 
      icon: <Code size={18} />, 
      skills: ["Python", "SQL (T-SQL)", "TypeScript"], 
      accent: "from-blue-500/10",
      glow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]"
    },
    { 
      title: "DATA_ENG", 
      icon: <Database size={18} />, 
      skills: ["SQL Server", "SSMS", "ETL Pipelines", "Star Schema"], 
      accent: "from-emerald-500/10",
      glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]"
    },
    { 
      title: "ML_OPS", 
      icon: <Zap size={18} />, 
      skills: ["FastAPI", "Docker", "ONNX", "Scikit-Learn"], 
      accent: "from-violet-500/10",
      glow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]"
    },
    { 
      title: "AI_GEN", 
      icon: <Layers size={18} />, 
      skills: ["LangChain", "RAG", "Prompt Eng", "Gemini API"], 
      accent: "from-cyan-500/10",
      glow: "group-hover:shadow-[0_0_40px_rgba(6,182,212,0.1)]"
    },
  ];

  if (!mounted) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-40 relative">
      {/* Background Schema Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:80px_80px] -z-10" />

      {/* Header Section */}
      <div className="flex flex-col items-center mb-32 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-2 border border-emerald-500/20 rounded-full mb-8 bg-emerald-500/5 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.1)]"
        >
          <Terminal size={14} className="text-emerald-500" />
          <span className="font-mono text-[9px] text-emerald-500 tracking-[0.5em] uppercase font-bold">
            Schema_Validation // Authorized
          </span>
        </motion.div>
        
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 uppercase">
          Inference_<span className="text-emerald-500 italic">Engine</span>
        </h2>
        
        <p className="text-slate-500 font-mono text-[9px] tracking-[0.6em] uppercase max-w-2xl mx-auto leading-relaxed border-t border-white/5 pt-8">
          Multi-Dimensional Skill Fact Tables & Domain Architecture
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connection Architecture SVG (Dynamic Data Flow) */}
        <div className="hidden lg:block absolute inset-0 -z-10 overflow-visible pointer-events-none translate-y-20">
          <svg className="w-full h-full opacity-30">
            <motion.path
              d="M 0 100 C 300 50, 600 150, 1200 100"
              fill="transparent"
              stroke="url(#logic-gradient)"
              strokeWidth="1.5"
              strokeDasharray="10 15"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 5, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="logic-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {dimensions.map((dim, idx) => (
          <motion.div
            key={dim.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative bg-[#0A0A0A] border border-white/5 p-10 rounded-[3rem] transition-all duration-700 hover:border-emerald-500/30 ${dim.glow}`}
          >
            {/* Contextual Glow Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${dim.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-14">
                <div className="p-4 bg-white/5 rounded-2xl text-white group-hover:bg-emerald-500 group-hover:text-black transition-all duration-700 group-hover:rotate-[360deg] shadow-inner">
                  {dim.icon}
                </div>
                <div className="text-right font-mono">
                  <p className="text-[8px] text-slate-700 uppercase tracking-widest mb-1">Dim_ID</p>
                  <p className="text-[11px] text-emerald-500 font-bold">0x0{idx + 1}</p>
                </div>
              </div>

              <h3 className="text-[12px] font-mono font-black tracking-[0.5em] text-slate-500 group-hover:text-white transition-colors mb-12 border-l-2 border-emerald-500/20 pl-6 uppercase">
                {dim.title}
              </h3>

              <div className="space-y-8">
                {dim.skills.map((skill, sIdx) => (
                  <div key={skill} className="group/item relative">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[13px] font-medium text-slate-400 group-hover/item:text-white transition-colors tracking-tight">
                        {skill}
                      </span>
                      <Activity size={12} className="text-emerald-500/10 group-hover/item:text-emerald-500 transition-colors" />
                    </div>
                    {/* Visual Loading Bar */}
                    <div className="h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full">
                      <motion.div 
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "0%" }}
                        transition={{ duration: 2, delay: 1 + (sIdx * 0.1), ease: "circOut" }}
                        className="h-full w-full bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" 
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Footer Metadata */}
              <div className="mt-14 pt-8 border-t border-white/5 flex items-center justify-between opacity-30 group-hover:opacity-100 transition-all duration-700">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                  <span className="text-[9px] font-mono text-slate-400">STATUS_OPTIMIZED</span>
                </div>
                <span className="text-[9px] font-mono text-slate-700 tracking-tighter">REF_LAYER_0{idx + 1}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}