"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function SocialProof() {
  const testimonials = [
    {
      quote: "Switching to Kanecraft was the easiest procurement win of the year. The paper quality is indistinguishable from premium wood pulp, but the ESG impact is massive.",
      author: "Sarah J.",
      role: "VP of Global Procurement, Tech Enterprise",
    },
    {
      quote: "The automated ESG reporting data Kanecraft provides has saved our sustainability team hundreds of hours. It plugs right into our quarterly reports.",
      author: "David M.",
      role: "Director of Sustainability, Finance Group",
    },
    {
      quote: "We were hesitant about printer compatibility, but Kanecraft performs flawlessly across our fleet of 2,000+ office printers. Zero jams, zero issues.",
      author: "Elena R.",
      role: "IT Operations Manager, Healthcare Network",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-spacing bg-[var(--color-brand-cream)] dark:bg-[#121212]">
      <div className="container-default">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-12 h-12 text-[var(--color-brand-primary)]/40 mx-auto mb-8" />

          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <p className="text-2xl md:text-3xl font-medium text-[var(--color-brand-dark-green)] mb-8 leading-relaxed">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <div className="font-bold text-[var(--color-brand-black)] dark:text-white">{testimonials[currentIndex].author}</div>
                  <div className="text-[var(--color-brand-primary)] text-sm">{testimonials[currentIndex].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-gray-300 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentIndex ? "bg-[var(--color-brand-primary)]" : "bg-gray-300"
                    }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full border border-gray-300 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
