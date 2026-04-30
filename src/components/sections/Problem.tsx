"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Problem() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);
  return (
    <section ref={ref} className="section-spacing bg-[var(--color-brand-cream)] dark:bg-[#121212] overflow-hidden">
      <div className="container-default">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-black)] dark:text-white mb-6">
              The Hidden Cost of Standard Office Paper
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Every day, enterprises consume tons of paper, inadvertently contributing to massive deforestation and water waste. 
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Procurement teams are under increasing pressure to meet aggressive ESG targets, but sustainable alternatives often come with a premium price tag or compromise on quality.
            </p>
            
            <div className="p-6 bg-white dark:bg-[#1A1A1A] rounded-xl border-l-4 border-red-500 shadow-sm">
              <p className="text-gray-800 font-medium italic">
                "We needed to reduce our Scope 3 emissions, but we couldn't justify a 20% budget increase for recycled paper that jammed our printers."
              </p>
              <p className="text-sm text-gray-500 mt-2">— Enterprise Procurement Director</p>
            </div>
          </motion.div>
          
          <motion.div
            style={{ y }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-200"
          >
            {/* Placeholder for an image - using a subtle pattern/gradient instead as per instructions (no placeholder images) */}
            <motion.div style={{ scale }} className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 opacity-50 mix-blend-multiply origin-center" />
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
              <div className="text-white/80 font-semibold text-2xl tracking-widest uppercase">
                Deforestation Impact
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
