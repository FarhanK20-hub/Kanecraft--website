"use client";

import React from "react";
import { motion } from "framer-motion";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Sugarcane Harvesting",
      description: "Sugar is extracted from sugarcane, leaving behind fibrous stalks known as bagasse."
    },
    {
      number: "02",
      title: "Upcycling Process",
      description: "Instead of burning the waste, we collect the bagasse and process it using eco-friendly methods."
    },
    {
      number: "03",
      title: "Pulping & Papermaking",
      description: "The fibers are converted into high-quality pulp and pressed into premium office paper."
    },
    {
      number: "04",
      title: "Enterprise Delivery",
      description: "Delivered to your office with complete ESG reporting data to track your impact."
    }
  ];

  return (
    <section className="section-spacing bg-[var(--color-brand-dark-green)] text-white overflow-hidden">
      <div className="container-default">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-cream)] mb-6">
            From Waste to Workspace
          </h2>
          <p className="text-lg text-[var(--color-brand-light-green)]">
            How we transform agricultural byproducts into the finest sustainable paper on the market.
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-[var(--color-brand-light-green)]/30 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--color-brand-primary)] flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-[var(--color-brand-primary)]/20">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
