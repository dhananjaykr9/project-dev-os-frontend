import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import PipelineNav from "@/components/layout/PipelineNav";
import DataDust from "@/components/visualization/DataDust";
import CommandPalette from "@/components/terminal/CommandPalette";
import SystemFooter from "@/components/layout/SystemFooter";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dhananjay Kharkar | System Architect & Data Engineer",
  description: "Official intelligence terminal of Dhananjay Kharkar. Specializing in Data Engineering, ML Ops, and Generative AI.",
  // Viewport scale fix for mobile input compression
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className={`
          ${sans.className} 
          ${mono.variable} 
          antialiased 
          bg-[#030712] 
          text-slate-200
          selection:bg-emerald-500/30 
          selection:text-white
          overflow-x-hidden
          w-full
        `}
      >
        {/* Persistent UI Layers */}
        <PipelineNav />
        <DataDust />
        <CommandPalette />

        {/* Primary Content Stream */}
        <main className="relative z-10 w-full overflow-x-hidden flex flex-col min-h-screen">
          <div className="flex-grow">
            {children}
          </div>
          
          {/* Integrated System Metrics Footer */}
          <SystemFooter />
        </main>

        {/* Global Texture Overlay */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.02] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" 
          aria-hidden="true"
        />
      </body>
    </html>
  );
}