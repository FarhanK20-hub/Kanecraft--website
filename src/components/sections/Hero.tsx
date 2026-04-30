"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import { InteractiveBackground } from "../ui/InteractiveBackground";

interface HeroProps {
  onOpenModal: () => void;
}

export function Hero({ onOpenModal }: HeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const yBadge = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--color-brand-cream)] dark:bg-[#121212] pt-20 pb-24">
      <motion.div
        style={{ y, opacity, scale }}
        className="container-default relative z-10 text-center flex flex-col items-center"
      >
        <motion.div
          style={{ y: yBadge }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--color-brand-light-green)]/10 dark:bg-[var(--color-brand-light-green)]/20 text-[var(--color-brand-dark-green)] dark:text-[var(--color-brand-light-green)] font-medium text-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)] mr-2 animate-pulse" />
            The Future of Enterprise Stationery
          </div>
        </motion.div>

        <motion.div
          style={{ y: yText }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--color-brand-black)] dark:text-white">
            Same cost. <br className="hidden md:block" />
            <span className="text-[var(--color-brand-primary)]">Bigger impact.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Replace your standard office paper with premium, sustainable bagasse paper. Report-ready ESG data with every order. No budget increase required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" onClick={onOpenModal} className="w-full sm:w-auto">
              Get Sample Kit
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => {
                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Calculate Impact
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive background elements */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <InteractiveBackground />
      </motion.div>
    </section>
  );
}
