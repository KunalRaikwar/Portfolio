"use client";

import { useEffect, useRef } from "react";

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        const colors = ["#6366f1", "#8b5cf6", "#3b82f6", "#ffffff"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (canvas) {
          if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
          if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const init = () => {
      particlesArray = [];
      // Reduce particle count significantly for performance
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 25000), 60);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    // Throttle to ~30fps instead of 60fps — particles are subtle, no need for 60fps
    let lastTime = 0;
    const interval = 1000 / 30;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = time - lastTime;
      if (delta < interval) return;
      lastTime = time - (delta % interval);

      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-50"
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)"
      }}
    />
  );
}
