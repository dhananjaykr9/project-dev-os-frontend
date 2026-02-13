import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import PipelineNav from "@/components/layout/PipelineNav";
import DataDust from "@/components/visualization/DataDust";
import CommandPalette from "@/components/terminal/CommandPalette";
import SystemFooter from "@/components/layout/SystemFooter";
import CustomCursor from "@/components/layout/CustomCursor";

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
  description: "Official intelligence terminal of Dhananjay Kharkar. Specializing in Data Engineering, ML Ops, and Generative AI. Explore high-performance data pipelines and machine intelligence.",
  keywords: [
    "Dhananjay Kharkar",
    "Data Engineer",
    "System Architect",
    "ML Ops",
    "Generative AI",
    "Python",
    "SQL Server",
    "Machine Learning Pipelines",
    "Nagpur Data Enthusiast",
    "JFCOEM Nagpur",
    "B.Tech AI"
  ],
  authors: [{ name: "Dhananjay Kharkar" }],
  creator: "Dhananjay Kharkar",
  publisher: "Dhananjay Kharkar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Dhananjay Kharkar | System Architect & Data Engineer",
    description: "Forging Fault-Tolerant Pipelines and architecting machine intelligence for the next-gen web.",
    url: "https://dhananjaykharkar.com",
    siteName: "Dhananjay Kharkar Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhananjay Kharkar | System Architect & Data Engineer",
    description: "Forging Fault-Tolerant Pipelines and architecting machine intelligence for the next-gen web.",
    creator: "@dhanno_9",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#030712",
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

        {/* CRT OS Layers */}
        <div className="crt-overlay">
          <div className="crt-scanline" />
          <div className="crt-static" />
        </div>

        <CustomCursor />
      </body>
    </html>
  );
}