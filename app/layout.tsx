// app/layout.tsx
import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import PipelineNav from "@/components/layout/PipelineNav";
import DataDust from "@/components/visualization/DataDust";
import CommandPalette from "@/components/terminal/CommandPalette";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className={`${sans.className} ${mono.variable} antialiased bg-[#030712] selection:bg-violet-500/30 selection:text-white`}
      >
        <PipelineNav />
        <DataDust />
        
        {/* The Power-User Command Palette */}
        <CommandPalette />

        <div className="relative z-10">
          {children}
        </div>

        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </body>
    </html>
  );
}