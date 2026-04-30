"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function Counter({ from, to, duration, suffix = "" }: { from: number, to: number, duration: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration * 1000) {
        const currentCount = Math.floor(from + (to - from) * (progress / (duration * 1000)));
        setCount(currentCount);
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(to);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="section-spacing bg-[var(--color-brand-dark-green)] text-white">
      <div className="container-default">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="flex flex-col items-center justify-center text-center p-6">
            <div className="text-4xl md:text-5xl font-bold mb-2 text-[var(--color-brand-cream)]">
              <Counter from={0} to={100} duration={2} suffix="%" />
            </div>
            <p className="text-[var(--color-brand-light-green)] font-medium text-lg mb-1">Tree-Free</p>
            <p className="text-sm text-white/80">Made entirely from sugarcane waste</p>
          </div>
          
          <div className="flex flex-col items-center justify-center text-center p-6">
            <div className="text-4xl md:text-5xl font-bold mb-2 text-[var(--color-brand-cream)]">
              <Counter from={0} to={45} duration={2} suffix="%" />
            </div>
            <p className="text-[var(--color-brand-light-green)] font-medium text-lg mb-1">Less Water</p>
            <p className="text-sm text-white/80">Compared to traditional wood pulp</p>
          </div>
          
          <div className="flex flex-col items-center justify-center text-center p-6">
            <div className="text-4xl md:text-5xl font-bold mb-2 text-[var(--color-brand-cream)]">
              <Counter from={0} to={30} duration={2} suffix="%" />
            </div>
            <p className="text-[var(--color-brand-light-green)] font-medium text-lg mb-1">Lower Carbon</p>
            <p className="text-sm text-white/80">Carbon footprint reduction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
