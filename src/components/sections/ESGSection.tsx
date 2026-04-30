"use client";

import React from "react";
import { motion } from "framer-motion";

export function ESGSection() {
  return (
    <section id="esg-impact" className="section-spacing bg-[var(--color-brand-dark-green)] text-white">
      <div className="container-default">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-cream)] mb-6">
              Data Ready for Your ESG Report
            </h2>
            <p className="text-lg text-[var(--color-brand-light-green)] mb-6">
              Don't just claim sustainability—prove it. Kanecraft provides verifiable data for every order, ready to plug directly into your annual sustainability reports.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
                <span className="text-white/90">Scope 3 Emissions Reduction Data</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
                <span className="text-white/90">Water Conservation Metrics</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
                <span className="text-white/90">Forest Preservation Equivalency</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[var(--color-brand-cream)] dark:bg-[#121212]/10 p-8 rounded-2xl border border-[var(--color-brand-cream)]/20 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <div>
                <div className="text-sm text-[var(--color-brand-light-green)] font-medium mb-1">Impact Report</div>
                <div className="font-bold">Q3 Purchase Summary</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/60 mb-1">Order Volume</div>
                <div className="font-bold text-[var(--color-brand-primary)]">2,500 Reams</div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Carbon Saved (kg CO2e)</span>
                  <span className="font-bold text-[var(--color-brand-primary)]">4,250</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2">
                  <div className="bg-[var(--color-brand-primary)] h-2 rounded-full" style={{ width: "70%" }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Water Saved (Liters)</span>
                  <span className="font-bold text-[var(--color-brand-light-green)]">18,500</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2">
                  <div className="bg-[var(--color-brand-light-green)] h-2 rounded-full" style={{ width: "85%" }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Trees Preserved</span>
                  <span className="font-bold text-[var(--color-brand-cream)]">142</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2">
                  <div className="bg-[var(--color-brand-cream)] dark:bg-[#121212] h-2 rounded-full" style={{ width: "60%" }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
