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
    let mouse = { x: 0, y: 0, radius: 180 };

    // Unified Theme Colors
    const COLORS = {
      particle: "rgba(167, 139, 250, 0.4)", // Violet
      line: "rgba(167, 139, 250,",        // Violet base for dynamic opacity
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      vx: number;
      vy: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.2 + 0.5;
        // Base drift speed
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        // Velocity for smooth physics
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        // Apply friction to velocity
        this.vx *= 0.95;
        this.vy *= 0.95;

        // Mouse Interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.vx -= (dx / distance) * force * 0.8;
          this.vy -= (dy / distance) * force * 0.8;
        }

        this.x += this.speedX + this.vx;
        this.y += this.speedY + this.vy;

        // Edge wrapping with padding to prevent flicker
        if (this.x > canvas!.width + 10) this.x = -10;
        if (this.x < -10) this.x = canvas!.width + 10;
        if (this.y > canvas!.height + 10) this.y = -10;
        if (this.y < -10) this.y = canvas!.height + 10;
      }

      draw() {
        ctx!.fillStyle = COLORS.particle;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      particles = [];
      // Dynamic density based on screen size
      const density = (window.innerWidth * window.innerHeight) / 18000;
      const count = Math.min(density, 100); 
      
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const handleLines = () => {
      const maxDistance = 150;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15;
            ctx.strokeStyle = `${COLORS.line}${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    init();
    animate();

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none opacity-40 bg-[#050505]"
    />
  );
}