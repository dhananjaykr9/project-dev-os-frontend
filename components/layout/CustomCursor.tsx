"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      );
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] hidden md:block select-none">
      {/* Central Tracking Dot */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          left: -2,
          top: -2,
        }}
        className="w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"
      />

      {/* Crosshair Corners */}
      <motion.div
        style={{
          translateX: springX,
          translateY: springY,
          left: -20,
          top: -20,
        }}
        animate={{
          width: isPointer ? 60 : 40,
          height: isPointer ? 60 : 40,
          rotate: isPointer ? 90 : 0,
          x: isPointer ? -10 : 0,
          y: isPointer ? -10 : 0,
        }}
        className="relative"
      >
        {/* Top Left */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500/50" />
        {/* Top Right */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500/50" />
        {/* Bottom Left */}
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-500/50" />
        {/* Bottom Right */}
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500/50" />
      </motion.div>

      {/* Floating Coordinates */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          left: 24,
          top: 10,
        }}
        className="font-mono text-[7px] text-emerald-500/40 uppercase tracking-tighter"
      >
        <span className="block">X: {coords.x}</span>
        <span className="block">Y: {coords.y}</span>
      </motion.div>
    </div>
  );
}
