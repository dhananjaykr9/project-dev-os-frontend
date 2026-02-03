"use client";

import { useEffect, useRef, useId } from "react";
import mermaid from "mermaid";

// Initialize outside the component to prevent redundant calls
if (typeof window !== "undefined") {
  mermaid.initialize({
    startOnLoad: false, // Set to false for manual control in React
    theme: "dark",
    securityLevel: "loose",
    themeVariables: {
      primaryColor: "#10b981",
      primaryTextColor: "#fff",
      lineColor: "#10b981",
      fontSize: "14px",
      fontFamily: "monospace",
      tertiaryColor: "#050505",
    },
  });
}

export default function SystemArchitecture({ definition }: { definition: string }) {
  const uniqueId = useId().replace(/:/g, ""); // Mermaid IDs cannot contain colons
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (demoRef.current && definition) {
        try {
          // Clear previous content
          demoRef.current.innerHTML = "";
          
          // Generate the SVG
          const { svg } = await mermaid.render(`mermaid-${uniqueId}`, definition);
          
          // Inject the SVG
          demoRef.current.innerHTML = svg;
        } catch (error) {
          console.error("Mermaid Render Error:", error);
        }
      }
    };

    renderDiagram();
  }, [definition, uniqueId]);

  return (
    <div className="w-full py-12 px-6 bg-[#080808] rounded-[2.5rem] border border-white/5 overflow-hidden group">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.4em] font-bold">
            Internal_Logic_Schema
          </span>
        </div>
        <span className="text-[8px] font-mono text-slate-700 tracking-widest uppercase">
          Render_Engine: Mermaid.js
        </span>
      </div>

      {/* Diagram Container */}
      <div 
        className="flex justify-center items-center overflow-x-auto custom-scrollbar"
        ref={demoRef}
      />
      
      {/* Decorative Blueprint Lines */}
      <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-30">
        <div className="flex gap-2">
          {[1, 2, 3].map(i => <div key={i} className="w-8 h-[1px] bg-slate-800" />)}
        </div>
        <span className="text-[7px] font-mono text-slate-600 uppercase">System_Blueprint_v1.0</span>
      </div>
    </div>
  );
}