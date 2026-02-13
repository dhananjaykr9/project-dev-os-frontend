"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal, CheckCircle2, Loader2, Code2, Linkedin, Github, Instagram, MessageCircle, Activity } from "lucide-react";
import { useState, useEffect } from "react";

export default function JsonContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const socials = [
    { icon: <Linkedin size={14} />, label: "LINKEDIN", href: "https://linkedin.com/in/dhananjaykharkar", color: "hover:text-blue-400" },
    { icon: <Github size={14} />, label: "GITHUB", href: "https://github.com/dhananjaykr9", color: "hover:text-slate-200" },
    { icon: <Instagram size={14} />, label: "INSTAGRAM", href: "https://instagram.com/dhanno.9", color: "hover:text-pink-400" },
    { icon: <MessageCircle size={14} />, label: "WHATSAPP", href: "https://wa.me/919595167618", color: "hover:text-emerald-400" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e2546650-4da0-4f91-9910-72253d17bff3",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSent(true);
      }
    } catch (error) {
      console.error("Transmission Failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Reduced outer padding for mobile viewports
    <div id="contact" className="w-full max-w-5xl mx-auto py-20 px-4 sm:px-6 lg:py-48 relative">
      {/* Header Section - Better mobile spacing */}
      <div className="flex flex-col mb-10 md:mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="text-emerald-500 shrink-0" size={18} />
          <span className="text-[9px] md:text-[10px] font-mono text-emerald-500/80 tracking-[0.3em] md:tracking-[0.5em] uppercase font-bold">
            06_DEPLOY // Establish_Uplink
          </span>
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-4">
          System_Contact
        </h2>
        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest italic">06_DEPLOY</p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 via-violet-500/10 to-emerald-500/10 rounded-[1.5rem] md:rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

        <div className="relative bg-[#0A0A0A] border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl">
          {/* Header - Optimized for narrow screens */}
          <div className="flex items-center justify-between px-5 md:px-8 py-4 md:py-5 border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
            </div>
            <div className="flex items-center gap-2 font-mono text-[8px] md:text-[9px] text-slate-500 uppercase tracking-widest truncate">
              <Activity size={12} className="text-emerald-500 shrink-0" />
              <span className="hidden xs:inline">POST /api/v1/message/send</span>
              <span className="xs:hidden">POST /send</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-10 font-mono relative">
            <div className="grid grid-cols-[30px_1fr] md:grid-cols-[40px_1fr] gap-4 md:gap-8">
              {/* Line Numbers - Smaller for mobile */}
              <div className="flex flex-col text-slate-700 text-[9px] md:text-[10px] leading-[2.5rem] md:leading-[3rem] select-none text-right border-r border-white/5 pr-4 md:pr-6">
                {Array.from({ length: 7 }).map((_, i) => <span key={i}>0{i + 1}</span>)}
              </div>

              {/* JSON Editor Input */}
              <div className="text-xs md:text-base space-y-0 md:space-y-1">
                <div className="text-slate-600">{"{"}</div>

                <div className="flex flex-wrap items-baseline gap-x-2 leading-[2.5rem] md:leading-[3rem] pl-4 border-l border-emerald-500/10">
                  <span className="text-emerald-400 shrink-0">&quot;sender&quot;</span>:
                  <input
                    required
                    type="text"
                    placeholder="&quot;Name&quot;"
                    className="bg-transparent border-none outline-none text-white placeholder:text-slate-800 flex-grow min-w-[100px]"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="flex flex-wrap items-baseline gap-x-2 leading-[2.5rem] md:leading-[3rem] pl-4 border-l border-emerald-500/10">
                  <span className="text-emerald-400 shrink-0">&quot;node&quot;</span>:
                  <input
                    required
                    type="email"
                    placeholder="&quot;email@node.com&quot;"
                    className="bg-transparent border-none outline-none text-white placeholder:text-slate-800 flex-grow min-w-[100px]"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="flex flex-wrap items-start gap-x-2 leading-[2.5rem] md:leading-[3rem] pl-4 border-l border-emerald-500/10">
                  <span className="text-emerald-400 shrink-0">&quot;payload&quot;</span>:
                  <textarea
                    required
                    placeholder="&quot;Message...&quot;"
                    rows={4}
                    className="bg-transparent border-none outline-none text-white placeholder:text-slate-800 flex-grow min-w-[120px] resize-none pt-3 md:pt-4"
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="text-slate-600">{"}"}</div>
              </div>
            </div>

            {/* Form Actions - Better stacking */}
            <div className="mt-10 md:mt-16 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 md:gap-10 border-t border-white/5 pt-8 md:pt-10">
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${isSent ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500' : 'border-white/5 bg-white/5 text-slate-500'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isSent ? 'bg-emerald-500' : 'bg-slate-700'} animate-pulse`} />
                  <span className="text-[8px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase truncate">
                    {isSent ? 'UPLINK_COMPLETE' : 'AWAITING_DATA'}
                  </span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSent}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full md:w-auto px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all duration-500 flex items-center justify-center gap-3 ${isSent ? "bg-emerald-500 text-black" : "bg-white text-black hover:bg-emerald-400"
                  }`}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div key="loading" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      SENDING... <Loader2 size={14} className="animate-spin" />
                    </motion.div>
                  ) : isSent ? (
                    <motion.div key="sent" className="flex items-center gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      ACK_SUCCESS <CheckCircle2 size={14} />
                    </motion.div>
                  ) : (
                    <motion.div key="default" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      EXEC_UPLINK <Send size={14} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </form>

          {/* Social Footer - Compact wrapping */}
          <div className="bg-white/[0.01] border-t border-white/5 px-6 md:px-10 py-5 md:py-6 flex flex-wrap justify-center md:justify-start gap-6 md:gap-10">
            <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest hidden xs:inline">Direct_Uplinks:</span>
            <div className="flex flex-wrap justify-center gap-6">
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-slate-500 transition-all duration-300 ${social.color} hover:scale-105`}>
                  {social.icon}
                  <span className="text-[9px] font-mono tracking-tighter">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Metadata - Optimized for single-line mobile */}
      <div className="mt-8 flex flex-col xs:flex-row justify-between items-center px-4 font-mono text-[8px] text-slate-700 uppercase tracking-widest gap-4">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full" /> Lat: 12ms</span>
          <span className="hidden sm:inline flex items-center gap-2"><div className="w-1 h-1 bg-violet-500 rounded-full" /> Node: AWS-Mumbai</span>
        </div>
        <span className="text-center">Sync_Gate: {mounted ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"}</span>
      </div>
    </div>
  );
}