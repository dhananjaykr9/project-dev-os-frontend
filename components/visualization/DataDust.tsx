"use client";

import { useEffect, useRef } from "react";

export default function DataDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    // Increased radius slightly for a better "repulsion" feel
    let mouse = { x: -1000, y: -1000, radius: 200 };

    const COLORS = {
      particle: "rgba(16, 185, 129, 0.4)", // Emerald-500
      line: "rgba(16, 185, 129,",           // Emerald base
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      speedX: number;
      speedY: number;
      vx: number;
      vy: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        // Apply friction to interaction velocity
        this.vx *= 0.92;
        this.vy *= 0.92;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          // Repel from mouse logic
          this.vx -= (dx / distance) * force * 1.2;
          this.vy -= (dy / distance) * force * 1.2;
        }

        this.x += this.speedX + this.vx;
        this.y += this.speedY + this.vy;

        // Clean edge wrapping
        if (this.x > window.innerWidth) this.x = 0;
        if (this.x < 0) this.x = window.innerWidth;
        if (this.y > window.innerHeight) this.y = 0;
        if (this.y < 0) this.y = window.innerHeight;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = COLORS.particle;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      // Fix for Retina/High-DPI Displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      particles = [];
      // Calculate count based on total pixel area
      const count = Math.min((window.innerWidth * window.innerHeight) / 15000, 120); 
      
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const handleLines = () => {
      const maxDistance = 160;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.12;
            ctx.strokeStyle = `${COLORS.line}${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      handleLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    init();
    animate();

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // Added z-index to sit behind everything but above the base background
      className="fixed inset-0 -z-10 pointer-events-none opacity-50 bg-[#020617]"
    />
  );
}