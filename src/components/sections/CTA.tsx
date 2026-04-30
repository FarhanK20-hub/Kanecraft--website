"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

interface CTAProps {
  onOpenModal: () => void;
}

export function CTA({ onOpenModal }: CTAProps) {
  return (
    <section className="section-spacing bg-[var(--color-brand-primary)] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      
      <div className="container-default relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make the Switch?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Request a free sample kit today. Test our paper on your toughest printers, evaluate the quality, and see the difference for yourself.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white dark:bg-[#1A1A1A] text-[var(--color-brand-primary)] hover:bg-gray-100 dark:bg-gray-800" onClick={onOpenModal}>
              Request Sample Kit
            </Button>
            <Button size="lg" variant="ghost" className="text-white border-2 border-white/20 hover:bg-white dark:bg-[#1A1A1A]/10" onClick={onOpenModal}>
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
