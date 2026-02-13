import HeroBoot from "@/components/terminal/HeroBoot";
import RoleFilter from "@/components/navigation/RoleFilter";
import ProjectGrid from "@/components/projects/ProjectGrid";
import SkillMatrix from "@/components/skills/SkillMatrix";
import JsonContact from "@/components/contact/JsonContact";
import ExperienceRegistry from "@/components/experience/ExperienceRegistry";
import EducationRegistry from "@/components/experience/EducationRegistry";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      {/* 01_SOURCE: Initializing profile */}
      <section id="hero" className="min-h-screen">
        <HeroBoot />
      </section>

      {/* 02_TRANSFORM: Project Registry */}
      <section id="projects" className="py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">02_TRANSFORM</h2>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest italic">Filtering Registry Modules</p>
            <RoleFilter />
          </div>
          <ProjectGrid />
        </div>
      </section>

      {/* 03_SCHEMA: Education Ledger */}
      <section id="education" className="py-32 border-t border-white/5">
        <EducationRegistry />
      </section>

      {/* 04_VALIDATE: Work History */}
      {/* Important: Section ID must be 'experience' */}
      <section id="experience" className="py-40 border-t border-white/5 bg-[#030712]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase">04_VALIDATE</h2>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest italic">Experience Pipeline Integrity</p>
          </div>
          <ExperienceRegistry />
        </div>
      </section>

      {/* 05_INFERENCE: Skill Fact Table */}
      <section id="stack" className="py-32 border-t border-white/5">
        <SkillMatrix />
      </section>

      {/* 06_DEPLOY: Contact API */}
      <section id="contact" className="py-32 border-t border-white/5 bg-[#030712]/20">
        <JsonContact />
      </section>

      {/* System Status Footer */}
      <footer className="py-20 text-center border-t border-white/5 opacity-30">
        <p className="font-mono text-[10px] tracking-[0.5em] text-slate-500 uppercase">
          DHANANJAY KHARKAR // 2026
        </p>
      </footer>
    </main>
  );
}