"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Loader2 } from "lucide-react";
import { IProduct } from "@/models/Product";

interface ProductsProps {
  onOpenModal: () => void;
}

export function Products({ onOpenModal }: ProductsProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const yTransforms = [y1, y2, y3, y1, y2, y3];

  return (
    <section id="products" ref={ref} className="section-spacing bg-[var(--color-brand-cream)] dark:bg-[#121212] overflow-hidden">
      <div className="container-default">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-black)] dark:text-white mb-4">
            Enterprise-Grade Quality
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Available in standard pallets and custom container sizes for global distribution.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-[var(--color-brand-primary)]" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No products available.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id as string}
                style={{ y: yTransforms[index % yTransforms.length] }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:border-[var(--color-brand-primary)] border-2 border-transparent transition-colors">
                  <div className="bg-gray-100 dark:bg-gray-800 h-48 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-light-green)]/10 to-[var(--color-brand-primary)]/10" />
                    )}
                    <div className="w-32 h-40 bg-white dark:bg-[#1A1A1A] shadow-md flex items-end justify-center pb-4 relative absolute bottom-[-20px]">
                      <div className="w-full h-8 bg-[var(--color-brand-primary)]/10 absolute bottom-0 left-0 border-t border-[var(--color-brand-primary)]/20" />
                      <span className="text-[var(--color-brand-dark-green)] font-bold tracking-widest text-xs uppercase z-10">Kanecraft</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xl font-bold text-[var(--color-brand-black)] dark:text-white">{product.title}</h3>
                    </div>
                    <p className="text-[var(--color-brand-primary)] text-sm font-semibold mb-4">
                      {product.category} {product.price && `| $${product.price}`}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">{product.description}</p>
                    
                    <ul className="space-y-2 mb-8">
                      {product.esgStats && product.esgStats.map((stat, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-light-green)] mr-2 shrink-0" />
                          <span>{stat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button variant="secondary" className="w-full mt-auto" onClick={onOpenModal}>
                    Request Quote
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
