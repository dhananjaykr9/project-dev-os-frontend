"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Clock } from "lucide-react";

const EDUCATION = [
    {
        degree: "B.Tech in Artificial Intelligence",
        institution: "JDCOEM, Nagpur",
        duration: "2022 - Present",
        status: "PURSUING",
        grade: "Current_Session",
        details: "Specializing in Machine Learning pipelines and AI-driven system architectures.",
        id: "EDU_01"
    },
    {
        degree: "HSC (Higher Secondary Certificate)",
        institution: "Maharashtra State Board",
        duration: "2020 - 2022",
        status: "COMPLETED",
        grade: "FIRST DIVISION",
        details: "Focus on Mathematics, Physics, and Computer Science fundamentals.",
        id: "EDU_02"
    },
    {
        degree: "SSC (Secondary School Certificate)",
        institution: "Maharashtra State Board",
        duration: "2019 - 2020",
        status: "COMPLETED",
        grade: "DISTINCTION",
        details: "Initial foundation in technical sciences and logic.",
        id: "EDU_03"
    }
];

export default function EducationRegistry() {
    return (
        <div className="w-full max-w-7xl mx-auto px-6">
            <div className="flex flex-col mb-20 text-center items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 px-4 py-2 border border-emerald-500/20 rounded-full mb-6 bg-emerald-500/5 backdrop-blur-md"
                >
                    <GraduationCap size={14} className="text-emerald-500" />
                    <span className="font-mono text-[9px] text-emerald-500 tracking-[0.5em] uppercase font-bold">
                        Schema_Definition // Academic_Ledger
                    </span>
                </motion.div>

                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
                    03_SCHEMA
                </h2>
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest italic">Core Knowledge Distribution</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {EDUCATION.map((edu, idx) => (
                    <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/30 transition-all duration-500 flex flex-col justify-between overflow-hidden"
                    >
                        {/* Hover Scanline */}
                        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-10">
                                <div className="p-3 bg-white/5 rounded-xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-300">
                                    <BookOpen size={20} />
                                </div>
                                <div className="text-right font-mono">
                                    <p className="text-[7px] text-slate-700 uppercase">Status</p>
                                    <p className={`text-[9px] font-bold ${edu.status === 'PURSUING' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                        {edu.status}
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-400 transition-colors">
                                {edu.degree}
                            </h3>
                            <p className="text-emerald-500/80 font-mono text-[10px] uppercase tracking-wider mb-6">
                                {edu.institution}
                            </p>

                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <div className="flex items-center gap-3 text-slate-500">
                                    <Clock size={12} className="text-emerald-500/50" />
                                    <span className="text-[10px] font-mono tracking-widest uppercase">{edu.duration}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500">
                                    <Award size={12} className="text-emerald-500/50" />
                                    <span className="text-[10px] font-mono tracking-widest uppercase">{edu.grade}</span>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed pt-2 group-hover:text-slate-400 transition-colors">
                                    {edu.details}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-20 group-hover:opacity-100 transition-opacity">
                            <span className="text-[8px] font-mono text-slate-500">Node_ID: {edu.id}</span>
                            <div className="h-1 w-12 bg-emerald-500/30 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-1/2 animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
