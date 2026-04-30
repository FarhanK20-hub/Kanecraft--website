"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Card } from "../ui/Card";

export function Comparison() {
  return (
    <section className="section-spacing bg-white dark:bg-[#1A1A1A]">
      <div className="container-default">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-black)] dark:text-white mb-4">
            The Smart Choice for Enterprise
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            See how Kanecraft Bagasse Paper stacks up against traditional wood pulp paper.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Traditional Paper */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border border-gray-100 bg-gray-50 dark:bg-gray-800/50/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 font-bold text-xl">T</span>
                </div>
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Traditional Paper</h3>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Contributes to deforestation</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">High water and energy consumption</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Requires harsh chemical bleaching</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">No ESG reporting data provided</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Kanecraft */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-2 border-[var(--color-brand-primary)] bg-[var(--color-brand-cream)] dark:bg-[#121212]/30 relative">
              <div className="absolute -top-4 -right-4 bg-[var(--color-brand-primary)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Our Solution
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[var(--color-brand-primary)]/10 flex items-center justify-center">
                  <span className="text-[var(--color-brand-primary)] font-bold text-xl">K</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-brand-dark-green)]">Kanecraft Bagasse</h3>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--color-brand-primary)] mt-0.5 shrink-0" />
                  <span className="text-gray-800 font-medium">100% Tree-Free, made from agricultural waste</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--color-brand-primary)] mt-0.5 shrink-0" />
                  <span className="text-gray-800 font-medium">Significantly lower water and carbon footprint</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--color-brand-primary)] mt-0.5 shrink-0" />
                  <span className="text-gray-800 font-medium">ECF / TCF bleaching process (safer for environment)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--color-brand-primary)] mt-0.5 shrink-0" />
                  <span className="text-gray-800 font-medium">Report-ready ESG data with every order</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
