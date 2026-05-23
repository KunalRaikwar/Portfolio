"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotDOMRef = useRef<HTMLDivElement>(null);
  const ringDOMRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if device is touch-based or has no fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dotDOM = dotDOMRef.current;
    const ringDOM = ringDOMRef.current;
    const canvas = canvasRef.current;
    if (!dotDOM || !ringDOM || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Coordinate storage (Ref values to prevent re-renders)
    const mouse = { x: 0, y: 0 };
    const dot = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };
    
    let isVisible = false;
    let points: { x: number; y: number; age: number }[] = [];
    let animationFrameId: number;
    let isMoving = false;
    let moveTimeout: ReturnType<typeof setTimeout>;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMoving = true;

      // Reset moving flag after cursor stops
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => { isMoving = false; }, 100);

      if (!isVisible) {
        isVisible = true;
        dotDOM.style.opacity = "1";
        ringDOM.style.opacity = "1";
        canvas.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dotDOM.style.opacity = "0";
      ringDOM.style.opacity = "0";
      canvas.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      isVisible = true;
      dotDOM.style.opacity = "1";
      ringDOM.style.opacity = "1";
      canvas.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // High performance Event Delegation for hovers
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, [role="button"], .hover-target')) {
        ringDOM.classList.add("scale-[1.8]", "bg-indigo-500/10", "border-indigo-400");
        ringDOM.classList.remove("border-indigo-500");
        dotDOM.classList.add("scale-0");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, [role="button"], .hover-target')) {
        ringDOM.classList.remove("scale-[1.8]", "bg-indigo-500/10", "border-indigo-400");
        ringDOM.classList.add("border-indigo-500");
        dotDOM.classList.remove("scale-0");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Main animation loop (unified and running on GPU transforms)
    let lastPointX = 0;
    let lastPointY = 0;
    const maxAge = 18;
    const maxPoints = 40;

    const tick = () => {
      // 1. Lerping coordinates (Linear Interpolation)
      // Dot moves very fast for responsive feel
      dot.x += (mouse.x - dot.x) * 0.45;
      dot.y += (mouse.y - dot.y) * 0.45;

      // Ring follows faster to prevent "stuck" feeling
      ring.x += (mouse.x - ring.x) * 0.22;
      ring.y += (mouse.y - ring.y) * 0.22;

      // 2. Direct DOM Position Updates (GPU accelerated)
      dotDOM.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate3d(-50%, -50%, 0)`;
      ringDOM.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate3d(-50%, -50%, 0)`;

      // 3. Trail canvas calculation and drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isVisible && isMoving) {
        // Only push trail points when cursor moves significantly
        const dist = Math.hypot(dot.x - lastPointX, dot.y - lastPointY);
        if (dist > 3) {
          points.push({ x: dot.x, y: dot.y, age: 0 });
          lastPointX = dot.x;
          lastPointY = dot.y;
          // Cap points array to prevent memory buildup
          if (points.length > maxPoints) {
            points = points.slice(-maxPoints);
          }
        }
      }

      // Update and filter points
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age += 1;
        if (points[i].age >= maxAge) {
          points.splice(i, 1);
        }
      }

      if (points.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 2.5;

        // Batched path drawing — single stroke call per opacity group
        ctx.beginPath();
        for (let i = 1; i < points.length; i++) {
          const opacity = 1 - points[i].age / maxAge;
          ctx.strokeStyle = `rgba(99, 102, 241, ${Math.max(0, opacity * 0.5)})`;
          ctx.moveTo(points[i - 1].x, points[i - 1].y);
          ctx.lineTo(points[i].x, points[i].y);
          ctx.stroke();
          ctx.beginPath();
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(moveTimeout);
    };
  }, []);

  // Return markup (will be hidden on coarse pointers like mobile via CSS/JS)
  return (
    <>
      {/* Precision Inner Dot */}
      <div
        ref={dotDOMRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-indigo-500 rounded-full pointer-events-none z-[9999] opacity-0 transition-opacity duration-300 pointer-events-none will-change-transform"
        style={{ transform: "translate3d(0, 0, 0) translate3d(-50%, -50%, 0)" }}
      />
      {/* Smooth Outer Ring */}
      <div
        ref={ringDOMRef}
        className="fixed top-0 left-0 w-9 h-9 border-2 border-indigo-500 rounded-full pointer-events-none z-[9999] opacity-0 transition-[transform,opacity,background-color,border-color] duration-300 ease-out pointer-events-none will-change-transform"
        style={{ transform: "translate3d(0, 0, 0) translate3d(-50%, -50%, 0)" }}
      />
      {/* Canvas for trailing tail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] opacity-0 transition-opacity duration-300 pointer-events-none"
      />
    </>
  );
}
