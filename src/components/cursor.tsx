"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, [role="button"], .hover-target'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [isVisible]);

  // Trail logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: { x: number; y: number; age: number }[] = [];
    let animationFrameId: number | null = null;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (!animationFrameId) {
        render();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update ages and filter dead points
      points.forEach(p => p.age += 1);
      const maxAge = 25;
      points = points.filter(p => p.age < maxAge);

      if (points.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 3;

        for (let i = 1; i < points.length; i++) {
          ctx.beginPath();
          ctx.moveTo(points[i - 1].x, points[i - 1].y);
          ctx.lineTo(points[i].x, points[i].y);
          
          // Calculate opacity based on age of the segment
          const opacity = 1 - (points[i].age / maxAge);
          ctx.strokeStyle = `rgba(99, 102, 241, ${Math.max(0, opacity)})`;
          ctx.stroke();
        }
      }

      if (points.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationFrameId = null;
      }
    };

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Don't render on mobile or touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[98]"
        style={{ 
          opacity: isVisible ? 1 : 0, 
          transition: "opacity 0.3s",
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)"
        }}
      />
    </>
  );
}
