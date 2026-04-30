"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";

export function InteractiveBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scrollY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scrollY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    // Only update if we didn't have window initially
    if (mouseX.get() === 0) {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary interactive glowing orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, var(--color-brand-primary) 0%, transparent 70%)",
          left: smoothX,
          top: smoothY,
          x: "-50%",
          y: "-50%",
        }}
      />
      
      {/* Secondary slow moving background shape */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ y: scrollY1 }}
        className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] rounded-full bg-[var(--color-brand-light-green)]/10 dark:bg-[var(--color-brand-light-green)]/20 blur-3xl"
      />
      
      {/* Tertiary slow moving background shape */}
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ y: scrollY2 }}
        className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[40%] rounded-full bg-[var(--color-brand-primary)]/10 dark:bg-[var(--color-brand-primary)]/15 blur-3xl"
      />

      {/* Grid overlay for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
