"use client";

import { useEffect, useRef, useId, useState } from "react";
import mermaid from "mermaid";
import { Maximize2, RefreshCw, ZoomIn } from "lucide-react";

const MERMAID_CONFIG = {
  startOnLoad: false,
  theme: "dark" as const,
  securityLevel: "loose" as const,
  fontFamily: "var(--font-mono)", 
  themeVariables: {
    primaryColor: "#10b981",
    primaryTextColor: "#fff",
    lineColor: "#10b981",
    fontSize: "12px",
    tertiaryColor: "#050505",
    mainBkg: "#0A0A0A",
    nodeBorder: "#10b98144",
    clusterBkg: "#0D0D0D",
    clusterBorder: "#ffffff10",
  },
  flowchart: {
    padding: 15,
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis' as const, // Makes lines smooth and professional
    rankSpacing: 40,
    nodeSpacing: 40,
  },
};

export default function SystemArchitecture({ definition }: { definition: string }) {
  const uniqueId = useId().replace(/[^a-zA-Z0-9]/g, ""); 
  const demoRef = useRef<HTMLDivElement>(null);
  const [hasRendered, setHasRendered] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    mermaid.initialize(MERMAID_CONFIG);

    const renderDiagram = async () => {
      if (demoRef.current && definition) {
        try {
          demoRef.current.innerHTML = "";
          const { svg } = await mermaid.render(`id-${uniqueId}`, definition);
          
          if (demoRef.current) {
            demoRef.current.innerHTML = svg;
            const svgElement = demoRef.current.querySelector("svg");
            if (svgElement) {
              svgElement.style.maxWidth = "100%";
              svgElement.style.maxHeight = isZoomed ? "80vh" : "320px";
              svgElement.style.height = "auto";
              svgElement.style.display = "block";
              svgElement.style.filter = "drop-shadow(0 0 10px rgba(16, 185, 129, 0.1))";
              svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
            }
            setHasRendered(true);
          }
        } catch (error) {
          console.error("Mermaid Render Error:", error);
          demoRef.current.innerHTML = `
            <div class="flex flex-col items-center gap-2 opacity-50 py-10">
              <RefreshCw class="w-4 h-4 text-red-500 animate-spin" />
              <span class="text-red-500 font-mono text-[10px] uppercase font-bold">[PROTOCOL_ERROR]</span>
            </div>
          `;
        }
      }
    };

    const timeout = setTimeout(renderDiagram, 300);
    return () => clearTimeout(timeout);
  }, [definition, uniqueId, isZoomed]);

  return (
    <div className={`w-full transition-all duration-500 bg-[#0A0A0A] border border-white/5 overflow-hidden group relative ${
      isZoomed ? "fixed inset-0 z-[200] p-10 flex flex-col justify-center" : "py-6 px-6 rounded-[1.5rem]"
    }`}>
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header Registry */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] relative">
               <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-emerald-500 uppercase tracking-[0.3em] font-bold">
                Infra_Registry
              </span>
              <span className="font-mono text-[6px] text-slate-600 uppercase">Status: Secure_Socket_Active</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 rounded-md bg-white/5 border border-white/10 text-slate-500 hover:text-emerald-400 hover:border-emerald-500/50 transition-all"
              title="Toggle Focal View"
            >
              {isZoomed ? <Maximize2 size={12} /> : <ZoomIn size={12} />}
            </button>
          </div>
        </div>

        {/* Viewport with Scanline Effect */}
        <div className="relative flex-grow flex items-center justify-center">
          {hasRendered && !isZoomed && (
             <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-xl">
                <div className="w-full h-full animate-scanline bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent opacity-30" style={{ height: '200%' }} />
             </div>
          )}
          
          <div 
            className={`flex justify-center items-center transition-all duration-1000 overflow-x-auto custom-scrollbar w-full ${
              hasRendered ? "opacity-100 scale-100" : "opacity-0 scale-95 translate-y-4"
            }`}
            ref={demoRef}
          />
        </div>
        
        {/* Footer Metrics */}
        <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center opacity-40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
               <div className="w-1 h-1 bg-emerald-500" />
               <span className="text-[6px] font-mono text-slate-500 uppercase">Encrypted_Flow</span>
            </div>
            <span className="text-[6px] font-mono text-slate-700 tracking-tighter">HEX: 0x{uniqueId.slice(0,8).toUpperCase()}</span>
          </div>
          
          <span className="text-[6px] font-mono text-emerald-500/60 uppercase font-bold tracking-[0.2em]">
            Verified_Architecture
          </span>
        </div>
      </div>

      {isZoomed && (
        <button 
          onClick={() => setIsZoomed(false)}
          className="absolute top-10 right-10 text-slate-500 hover:text-white font-mono text-[10px]"
        >
          [ ESC_EXIT ]
        </button>
      )}
    </div>
  );
}