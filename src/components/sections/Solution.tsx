"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Droplets, Factory } from "lucide-react";

export function Solution() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-[var(--color-brand-primary)]" />,
      title: "100% Tree-Free",
      description: "Made entirely from sugarcane bagasse, an agricultural byproduct that would otherwise be burned or sent to landfills."
    },
    {
      icon: <Droplets className="w-8 h-8 text-[var(--color-brand-primary)]" />,
      title: "Resource Efficient",
      description: "Our process uses significantly less water and energy compared to traditional wood pulp paper manufacturing."
    },
    {
      icon: <Factory className="w-8 h-8 text-[var(--color-brand-primary)]" />,
      title: "Drop-in Replacement",
      description: "Performs exactly like premium wood-pulp paper. No printer jams, no ink bleeding, just flawless execution."
    }
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const yTransforms = [y1, y2, y3];

  return (
    <section ref={ref} className="section-spacing bg-white dark:bg-[#1A1A1A] overflow-hidden">
      <div className="container-default">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--color-brand-primary)] font-semibold tracking-wider uppercase text-sm mb-4 block">The Solution</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-black)] dark:text-white mb-6">
            Sustainable Without Compromise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Kanecraft transforms agricultural waste into premium office paper. It's the easiest way to hit your sustainability targets without increasing your procurement budget.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              style={{ y: yTransforms[index] }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-[var(--color-brand-cream)] dark:bg-[#121212] border border-[var(--color-brand-cream)] hover:border-[var(--color-brand-primary)]/30 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#1A1A1A] flex items-center justify-center mb-6 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--color-brand-dark-green)] mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
