"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";

export function Calculator() {
  const [reams, setReams] = useState(1000);

  // Example calculation metrics (illustrative)
  const calculateImpact = (reams: number) => {
    return {
      trees: Math.floor(reams * 0.06), // roughly 6% of a tree per ream
      water: Math.floor(reams * 12.5), // liters
      carbon: Math.floor(reams * 2.8), // kg CO2
    };
  };

  const impact = calculateImpact(reams);

  return (
    <section id="calculator" className="section-spacing bg-white dark:bg-[#1A1A1A]">
      <div className="container-default max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-black)] dark:text-white mb-4">
            Calculate Your Impact
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            See the exact environmental savings when you switch your annual paper consumption to Kanecraft.
          </p>
        </div>

        <Card className="border-2 border-[var(--color-brand-cream)] p-8 md:p-12">
          <div className="mb-12">
            <div className="flex justify-between items-end mb-4">
              <label htmlFor="reams" className="text-lg font-semibold text-[var(--color-brand-dark-green)]">
                Annual Ream Consumption
              </label>
              <div className="text-2xl font-bold text-[var(--color-brand-primary)]">
                {reams.toLocaleString()} <span className="text-base font-normal text-gray-500">reams</span>
              </div>
            </div>
            <input
              type="range"
              id="reams"
              min="100"
              max="50000"
              step="100"
              value={reams}
              onChange={(e) => setReams(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-brand-primary)]"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>100</span>
              <span>50,000+</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              key={impact.trees}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[var(--color-brand-cream)] dark:bg-[#121212] p-6 rounded-2xl text-center"
            >
              <div className="text-3xl font-bold text-[var(--color-brand-dark-green)] mb-2">
                {impact.trees.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Trees Preserved</div>
            </motion.div>

            <motion.div
              key={impact.water}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[var(--color-brand-cream)] dark:bg-[#121212] p-6 rounded-2xl text-center"
            >
              <div className="text-3xl font-bold text-[var(--color-brand-primary)] mb-2">
                {impact.water.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Liters Water Saved</div>
            </motion.div>

            <motion.div
              key={impact.carbon}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[var(--color-brand-cream)] dark:bg-[#121212] p-6 rounded-2xl text-center"
            >
              <div className="text-3xl font-bold text-[var(--color-brand-dark-green)] mb-2">
                {impact.carbon.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">kg CO₂ Prevented</div>
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  );
}
