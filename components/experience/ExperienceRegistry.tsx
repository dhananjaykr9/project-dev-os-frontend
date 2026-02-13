"use client";

import { motion } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Terminal, 
  Box, 
  Download, 
  Lock, 
  Cpu 
} from "lucide-react";

const INTERNSHIPS = [
  {
    role: "Data Science Intern",
    company: "Primine Software Private Limited",
    duration: "Dec 2025 - Present",
    location: "Nagpur, India",
    details: [
      "Accelerating training in applied data science and production-grade enterprise project architectures.",
      "Developing familiarity with end-to-end data processing lifecycles and production model workflows.",
      "Optimizing internal documentation and supporting data team operational tasks."
    ],
    tech: ["Python", "Data Science", "Production_Env"],
    current: true,
    id: "XP_01",
    certificateUrl: null 
  },
  {
    role: "Summer Intern – IoT & Embedded Systems",
    company: "VNIT, Nagpur",
    duration: "Jun 2025 - Jul 2025",
    location: "Nagpur, India",
    details: [
      "Engineered a real-time IoT data pipeline utilizing ESP32, Mosquitto MQTT, and Node-RED architecture.",
      "Orchestrated structured data ingestion into SQL Server with real-time Grafana visualization.",
      "Designed intelligent threshold-based alert systems for industrial-scale sensor monitoring.",
      "Standardized hardware interfaces for DHT11, TDS, and GPS sensors using Arduino UNO/Mega."
    ],
    tech: ["ESP32", "MQTT", "Node-RED", "SQL Server", "Grafana"],
    current: false,
    id: "XP_02",
    certificateUrl: "/docs/vnit-internship.jpg" 
  }
];

export default function ExperienceRegistry() {
  return (
    <div id="experience" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 lg:py-32">
      {/* Section Header */}
      <div className="flex flex-col mb-12 lg:mb-20">
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="text-emerald-500 shrink-0" size={16} />
          <span className="text-[9px] md:text-[10px] font-mono text-emerald-500/80 tracking-[0.2em] md:tracking-[0.5em] uppercase font-bold">
            System_Logs // Work_History
          </span>
        </div>
        
        {/* Responsive Headline Fix: Dynamic sizing to prevent 'Registry' from dropping poorly */}
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight md:tracking-tighter uppercase leading-none">
          Experience_
          <span className="text-emerald-500 italic inline-block sm:inline">Registry</span>
        </h2>
      </div>

      {/* Vertical Timeline: Minimal margin-left on mobile (ml-1) to recover content space */}
      <div className="relative space-y-12 lg:space-y-20 border-l border-white/10 ml-1 sm:ml-4 pl-5 sm:pl-10 md:pl-16">
        {INTERNSHIPS.map((job, idx) => (
          <motion.div 
            key={job.id}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="group relative"
          >
            {/* Connection Node: Scaled and repositioned for mobile recovery */}
            <div className={`absolute -left-[25px] sm:-left-[45px] md:-left-[77px] top-2 w-4 h-4 md:w-5 md:h-5 rounded-full border-[2px] md:border-[3px] border-[#050505] z-10 transition-colors duration-500 ${
              job.current 
              ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' 
              : 'bg-slate-800 border-slate-900 group-hover:bg-slate-700'
            }`} />

            {/* Card Body: Fluid padding to ensure text doesn't compress */}
            <div className="relative bg-[#0A0A0A] border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 overflow-hidden shadow-xl transition-all duration-500 hover:border-emerald-500/20">
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg shrink-0 mt-1 ${job.current ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-slate-500'}`}>
                        {job.current ? <Cpu size={16} /> : <Box size={16} />}
                      </div>
                      {/* Responsive Role Title */}
                      <h3 className="text-base sm:text-2xl md:text-4xl font-bold text-white tracking-tight leading-snug break-words">
                        {job.role}
                      </h3>
                    </div>
                    <p className="text-emerald-500/80 font-mono text-[9px] sm:text-xs tracking-[0.2em] uppercase font-semibold pl-9 sm:pl-12">
                      {job.company}
                    </p>
                  </div>
                  
                  {/* Metadata Badges: Wrap naturally on small screens */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 font-mono text-[8px] md:text-[9px] tracking-widest uppercase lg:flex-col lg:items-end">
                    <span className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-full border border-white/10 text-slate-200">
                      <Calendar size={10} className="text-emerald-500 shrink-0"/> {job.duration}
                    </span>
                    <span className="flex items-center gap-2 px-2.5 py-1 text-slate-500">
                      <MapPin size={10} className="shrink-0"/> {job.location}
                    </span>
                  </div>
                </div>

                {/* Detail Logs */}
                <div className="space-y-4 md:space-y-6 mb-8 max-w-3xl">
                  {job.details.map((detail, i) => (
                    <div key={i} className="group/item flex items-start gap-3 sm:gap-5">
                      <div className="mt-1.5 w-1.5 h-[1px] bg-emerald-500/40 group-hover/item:bg-emerald-500 transition-all duration-300 shrink-0" />
                      <p className="text-slate-400 text-[10px] sm:text-xs md:text-base leading-relaxed font-light group-hover:text-slate-200 transition-colors">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {job.tech.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-white/[0.02] rounded border border-white/5 text-[8px] md:text-[10px] font-mono text-slate-400 uppercase tracking-tight">
                        {t}
                      </span>
                    ))}
                  </div>

                  {job.certificateUrl ? (
                    <motion.a 
                      whileTap={{ scale: 0.98 }}
                      href={job.certificateUrl} 
                      download 
                      className="flex items-center justify-center gap-3 px-6 py-3 bg-emerald-500 text-black font-black text-[9px] md:text-[11px] tracking-[0.1em] uppercase rounded-xl hover:bg-white transition-colors duration-300"
                    >
                      <Download size={14} />
                      Credential
                    </motion.a>
                  ) : (
                    <div className="flex items-center justify-center gap-3 px-6 py-3 bg-white/[0.02] text-slate-600 font-mono text-[9px] uppercase rounded-xl border border-white/5 cursor-not-allowed">
                      <Lock size={12} />
                      Active_Session
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}