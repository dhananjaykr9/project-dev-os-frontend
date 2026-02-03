"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  ChevronDown, 
  Binary, 
  Linkedin, 
  Github, 
  Instagram, 
  MessageCircle,
  MapPin,
  GraduationCap
} from "lucide-react";

export default function HeroBoot() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  
  useEffect(() => {
    setMounted(true);
    const logs = [
      "INIT_KERNEL_0x2A...",
      "UPLINK_ESTABLISHED: NAGPUR_STATION",
      "MODEL_INF_STATUS: OPTIMIZED",
      "PIPELINE_LOADED: 100%",
      "ARCH_VERSION: 2.0.26"
    ];
    let i = 0;
    const interval = setInterval(() => {
      setSystemLogs(prev => [...prev.slice(-4), logs[i]]);
      i = (i + 1) % logs.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) - 0.5, 
        y: (e.clientY / window.innerHeight) - 0.5 
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socials = [
    { icon: <Linkedin size={16} />, href: "https://linkedin.com/in/dhananjaykharkar", label: "LI" },
    { icon: <Github size={16} />, href: "https://github.com/dhananjaykr9", label: "GH" },
    { icon: <Instagram size={16} />, href: "https://instagram.com/dhanno.9", label: "IG" },
    { icon: <MessageCircle size={16} />, href: "https://wa.me/919595167618", label: "WA" },
  ];

  return (
    <section className="relative h-screen min-h-[750px] w-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden selection:bg-emerald-500/30">
      
      {/* Top Navigation */}
      <div className="absolute top-6 md:top-10 right-8 md:right-16 z-30 flex items-center gap-6">
        {socials.map((social, i) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            className="group flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-all duration-300"
          >
            <span className="text-[9px] font-mono tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
              {social.label}
            </span>
            <span className="group-hover:scale-110 transition-transform">{social.icon}</span>
          </motion.a>
        ))}
      </div>

      {/* Floating Kernel Log Feed */}
      <div className="absolute top-10 left-8 md:left-16 z-20 hidden lg:block">
        <div className="font-mono text-[8px] text-emerald-500/40 uppercase tracking-widest space-y-1">
          {systemLogs.map((log, i) => (
            <motion.p key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}>
              {`> ${log}`}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Interactive Ambient Glows */}
      {mounted && (
        <motion.div 
          animate={{ x: mousePos.x * 60, y: mousePos.y * 60 }}
          transition={{ type: "spring", stiffness: 20, damping: 30 }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          <div className="absolute top-1/4 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-violet-600/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
        </motion.div>
      )}

      <div className="relative z-20 flex flex-col items-center text-center px-6">
        
        {/* Status Badge - UPDATED */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 mb-8 px-5 py-2 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-xl shadow-inner"
        >
          <div className="relative">
            <span className="block w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute inset-0" />
            <span className="relative block w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-emerald-500/90 font-bold">
            SYSTEM_STATUS // INFERENCE_READY
          </span>
        </motion.div>

        {/* Primary Typography */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black tracking-[-0.04em] text-white leading-[0.8] select-none text-nowrap">
              DHANANJAY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/60 to-white/5 uppercase">
                Kharkar
              </span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-slate-400 text-sm md:text-xl font-light max-w-2xl mx-auto leading-relaxed tracking-wide mt-8 px-4"
          >
            Forging <span className="text-white font-medium border-b border-emerald-500/30">Fault-Tolerant Pipelines</span> and 
            architecting machine intelligence for the next-gen web.
          </motion.p>
        </div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a 
            href="/resume.pdf" 
            download="Dhananjay_Kharkar_Resume.pdf"
            className="group flex items-center gap-4 px-12 py-5 bg-white hover:bg-emerald-500 text-black transition-all duration-500 text-[11px] font-bold tracking-[0.2em] rounded-full shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-emerald-500/20 active:scale-95 uppercase"
          >
            <Binary size={16} />
            Execute_Download_CV
          </a>
        </motion.div>
      </div>

      {/* Footer System Diagnostics */}
      <div className="absolute bottom-6 md:bottom-10 w-full px-8 md:px-16 z-10">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-end border-t border-white/5 pt-8 gap-8 md:gap-0">
          
          <div className="flex gap-12 font-mono text-[9px] tracking-[0.2em] w-full md:w-auto justify-between md:justify-start">
            <div className="space-y-3">
              <p className="text-slate-600 text-[8px] flex items-center gap-2 uppercase">
                <GraduationCap size={12} className="text-emerald-500/50" /> Academic_Credentials
              </p>
              <div className="space-y-1">
                <p className="text-white font-bold">B.Tech AI</p>
                <p className="text-slate-500">FINAL YEAR // 2026</p>
              </div>
            </div>
            <div className="hidden lg:block space-y-3">
              <p className="text-slate-600 text-[8px] uppercase">Operational_Sector</p>
              <p className="text-white font-bold">DATA & ML ARCHITECTURE</p>
            </div>
          </div>

          {/* Scroll Prompt */}
          <motion.div 
            onClick={scrollToProjects}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="hidden xl:flex flex-col items-center gap-3 cursor-pointer group absolute left-1/2 -translate-x-1/2 bottom-0 pb-4"
          >
            <span className="font-mono text-[8px] tracking-[0.5em] text-slate-600 group-hover:text-emerald-400 transition-colors uppercase">View_Registry</span>
            <ChevronDown size={14} className="text-slate-700 group-hover:text-emerald-400 transition-colors" />
          </motion.div>

          <div className="text-center md:text-right font-mono text-[9px] tracking-[0.2em] space-y-3 w-full md:w-auto">
            <p className="text-slate-600 text-[8px] flex items-center justify-center md:justify-end gap-2 uppercase">
              <MapPin size={12} className="text-emerald-500/50" /> Station_ID
            </p>
            <div className="space-y-1">
              <p className="text-white font-bold uppercase">NAGPUR, IN</p>
              <p className="text-slate-500">21.0950° N, 79.0935° E</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}