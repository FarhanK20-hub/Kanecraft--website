"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, BarChart3, Truck } from "lucide-react";

export function WhyKanecraft() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yLeftCol = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yRightCol = useTransform(scrollYProgress, [0, 1], [60, -120]);

  return (
    <section id="why-us" ref={ref} className="section-spacing bg-white dark:bg-[#1A1A1A] overflow-hidden">
      <div className="container-default">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-black)] dark:text-white mb-6">
              Built for the Enterprise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We understand that enterprise procurement isn't just about the product—it's about reliability, compliance, and scale.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1">
                  <ShieldCheck className="w-8 h-8 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-brand-dark-green)] mb-2">Certified Supply Chain</h3>
                  <p className="text-gray-600 dark:text-gray-300">Our entire process from farm to final product is audited and certified to meet global environmental standards.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1">
                  <BarChart3 className="w-8 h-8 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-brand-dark-green)] mb-2">Automated ESG Reporting</h3>
                  <p className="text-gray-600 dark:text-gray-300">With every invoice, receive a detailed, audit-ready impact report quantifying your carbon, water, and tree savings.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1">
                  <Truck className="w-8 h-8 text-[var(--color-brand-primary)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-brand-dark-green)] mb-2">Global Logistics</h3>
                  <p className="text-gray-600 dark:text-gray-300">Warehousing across North America and Europe ensures consistent, on-time delivery for all your office locations.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            style={{ y: yLeftCol }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4 pt-12">
              <div className="bg-[var(--color-brand-cream)] dark:bg-[#121212] rounded-2xl p-6 aspect-square flex flex-col justify-center">
                <div className="text-3xl font-bold text-[var(--color-brand-primary)] mb-2">50+</div>
                <div className="text-sm font-medium text-[var(--color-brand-dark-green)]">Fortune 500 Clients</div>
              </div>
              <motion.div 
                style={{ y: yRightCol }}
                className="bg-[var(--color-brand-dark-green)] text-white rounded-2xl p-6 aspect-square flex flex-col justify-center"
              >
                <div className="text-3xl font-bold text-[var(--color-brand-light-green)] mb-2">12M+</div>
                <div className="text-sm font-medium">Reams Delivered</div>
              </motion.div>
            </div>
            <div className="space-y-4">
              <div className="bg-[var(--color-brand-light-green)] text-white rounded-2xl p-6 aspect-square flex flex-col justify-center">
                <div className="text-3xl font-bold text-[var(--color-brand-cream)] mb-2">100%</div>
                <div className="text-sm font-medium">Tree-Free Guarantee</div>
              </div>
              <motion.div 
                style={{ y: yRightCol }}
                className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 aspect-square flex flex-col justify-center border border-gray-200 dark:border-gray-800"
              >
                <div className="text-3xl font-bold text-[var(--color-brand-black)] dark:text-white mb-2">0</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Compromises</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
