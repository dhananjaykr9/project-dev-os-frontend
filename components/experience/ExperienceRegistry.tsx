"use client";

import { motion } from "framer-motion";
import { Database, Calendar, MapPin, Terminal, Box, Download, Lock, Cpu } from "lucide-react";

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
    // UPDATED: Correct path to your JPG file
    certificateUrl: "/docs/vnit-internship.jpg" 
  }
];

export default function ExperienceRegistry() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-24 lg:py-32">
      {/* Section Header */}
      <div className="flex flex-col mb-20">
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="text-emerald-500" size={18} />
          <span className="text-[10px] font-mono text-emerald-500/80 tracking-[0.5em] uppercase font-bold">
            System_Logs // Professional_Lifecycle
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase">
          Experience_<span className="text-emerald-500 italic">Registry</span>
        </h2>
      </div>

      <div className="relative space-y-20 border-l border-white/5 ml-4 pl-10 md:pl-16">
        {INTERNSHIPS.map((job, idx) => (
          <motion.div 
            key={job.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative"
          >
            {/* Connection Node */}
            <div className={`absolute -left-[51px] md:-left-[77px] top-2 w-5 h-5 rounded-full border-[3px] border-[#050505] z-10 transition-all duration-700 ${
              job.current 
              ? 'bg-emerald-500 shadow-[0_0_20px_#10b981]' 
              : 'bg-slate-800 border-slate-900 group-hover:bg-slate-700'
            }`} />

            {/* Content Card */}
            <div className="relative bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-8 md:p-12 transition-all duration-500 hover:border-emerald-500/20 hover:bg-[#0C0C0C] group-hover:shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
              
              <span className="absolute -top-4 -right-4 font-mono text-[100px] font-black text-white/[0.01] select-none group-hover:text-emerald-500/[0.02] transition-colors duration-700">
                {job.id}
              </span>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${job.current ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-slate-500'}`}>
                        {job.current ? <Cpu size={20} /> : <Box size={20} />}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                        {job.role}
                      </h3>
                    </div>
                    <p className="text-emerald-500/80 font-mono text-xs tracking-[0.3em] uppercase font-semibold pl-12">
                      {job.company}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 font-mono text-[9px] tracking-widest uppercase lg:flex-col lg:items-end">
                    <span className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-slate-200">
                      <Calendar size={12} className="text-emerald-500"/> {job.duration}
                    </span>
                    <span className="flex items-center gap-2 px-4 py-1.5 text-slate-500">
                      <MapPin size={12}/> {job.location}
                    </span>
                  </div>
                </div>

                {/* Detail Logs */}
                <div className="space-y-6 mb-12 max-w-3xl">
                  {job.details.map((detail, i) => (
                    <div key={i} className="group/item flex items-start gap-5">
                      <div className="mt-2.5 w-2 h-[1px] bg-emerald-500/40 group-hover/item:bg-emerald-500 group-hover/item:w-4 transition-all duration-300" />
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light group-hover/item:text-slate-200 transition-colors">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5">
                  <div className="flex flex-wrap gap-2.5">
                    {job.tech.map(t => (
                      <span key={t} className="px-4 py-2 bg-white/[0.02] rounded-xl border border-white/5 text-[10px] font-mono text-slate-400 uppercase tracking-widest hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 cursor-default">
                        {t}
                      </span>
                    ))}
                  </div>

                  {job.certificateUrl ? (
                    <motion.a 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={job.certificateUrl} 
                      download 
                      className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 text-black font-black text-[11px] tracking-[0.2em] uppercase rounded-2xl transition-all duration-300 hover:bg-white"
                    >
                      <Download size={16} strokeWidth={3} />
                      Download_Credential
                    </motion.a>
                  ) : (
                    <div className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/[0.02] text-slate-600 font-mono text-[11px] tracking-[0.2em] uppercase rounded-2xl border border-white/5 cursor-not-allowed">
                      <Lock size={14} />
                      Session_Active
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