"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { Terminal, Cpu, Globe, Zap, ShieldCheck, Activity, Database } from "lucide-react";

export default function SystemFooter() {
  const [time, setTime] = useState("");
  const [uptime, setUptime] = useState({ h: 0, m: 0, s: 0 });
  const [bitrate, setBitrate] = useState("0.0");

  // 1. Precise Time and Bitrate Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false,
      }).format(now));
      
      // Simulate real-time data throughput
      setBitrate((Math.random() * (4.5 - 1.2) + 1.2).toFixed(1));
    }, 1000);

    const startTime = Date.now() - Math.floor(Math.random() * 10000000);
    const uptimeTimer = setInterval(() => {
      const diff = Math.floor((Date.now() - startTime) / 1000);
      setUptime({
        h: Math.floor(diff / 3600),
        m: Math.floor((diff % 3600) / 60),
        s: diff % 60,
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(uptimeTimer);
    };
  }, []);

  return (
    <footer className="w-full border-t border-white/5 bg-[#050505] py-16 px-6 relative overflow-hidden font-mono">
      {/* Background Cyber-Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Top Laser Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Main Telemetry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Node Location & Time */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-500">
              <Globe size={14} className="text-emerald-500" />
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Node_Coordinates</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black text-white tracking-tighter">
                {time || "00:00:00"}
              </p>
              <div className="flex items-center gap-2 text-[8px] text-slate-600 uppercase tracking-widest">
                <span className="text-emerald-500/50">●</span> NAGPUR_IN // SECTOR_CENTRAL
              </div>
            </div>
          </div>

          {/* System Heartbeat */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-500">
              <Activity size={14} className="text-emerald-500" />
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Sys_Heartbeat</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black text-white tracking-tighter">
                {uptime.h}h {uptime.m}m {uptime.s}s
              </p>
              <div className="flex items-center gap-3 text-[8px] text-slate-600 uppercase tracking-widest">
                <span className="flex items-center gap-1"><ShieldCheck size={10} className="text-emerald-500" /> SECURE</span>
                <span className="flex items-center gap-1"><Database size={10} /> {bitrate} MB/S</span>
              </div>
            </div>
          </div>

          {/* Neural Engine Load */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-500">
              <Cpu size={14} className="text-emerald-500" />
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Neural_Load</span>
            </div>
            <div className="space-y-3 pt-1">
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden flex">
                <motion.div 
                  animate={{ width: ["15%", "55%", "35%"] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" 
                />
              </div>
              <div className="flex justify-between text-[7px] text-slate-700 uppercase tracking-tighter font-bold">
                <span>Core_01: Active</span>
                <span>Threads: 12</span>
              </div>
            </div>
          </div>

          {/* Build Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-500">
              <Terminal size={14} className="text-emerald-500" />
              <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Deployment_ID</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black text-white tracking-tighter">
                v2.0.26_<span className="text-emerald-500">RC</span>
              </p>
              <p className="text-[8px] text-slate-600 uppercase tracking-widest flex items-center gap-2">
                <Zap size={10} className="fill-emerald-500 text-emerald-500" /> PROD_READY // CLOUD_SYNCED
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal & Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-8">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">
              &copy; 2026 DHANANJAY KHARKAR <span className="mx-2 opacity-20">|</span> 
              <span className="text-emerald-500/50">Protocol_Level_03</span>
            </p>
            <p className="text-[8px] text-slate-700 tracking-[0.3em] uppercase flex items-center justify-center md:justify-start gap-2">
              Hardware: React_Kernel <span className="opacity-20">//</span> Vercel_Interface
            </p>
          </div>

          {/* System Authentication Badge */}
          <div className="flex items-center gap-6 p-1 pr-4 bg-white/[0.02] border border-white/5 rounded-full">
            <div className="px-3 py-1 bg-emerald-500 rounded-full flex items-center gap-2">
              <ShieldCheck size={10} className="text-black" />
              <span className="text-[8px] font-black text-black uppercase">Identity_Verified</span>
            </div>
            <div className="flex items-center gap-2 text-[8px] font-bold text-slate-600 uppercase tracking-tighter">
              <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
              Nagpur // Maharashtra
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}