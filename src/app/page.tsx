"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Comparison } from "@/components/sections/Comparison";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Products } from "@/components/sections/Products";
import { WhyKanecraft } from "@/components/sections/WhyKanecraft";
import { ESGSection } from "@/components/sections/ESGSection";
import { Calculator } from "@/components/sections/Calculator";
import { SocialProof } from "@/components/sections/SocialProof";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { LeadFormModal } from "@/components/LeadFormModal";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen">
      <Navbar onOpenModal={handleOpenModal} />
      <Hero onOpenModal={handleOpenModal} />
      <Stats />
      <Problem />
      <Solution />
      <Comparison />
      <HowItWorks />
      <Products onOpenModal={handleOpenModal} />
      <WhyKanecraft />
      <ESGSection />
      <Calculator />
      <SocialProof />
      <CTA onOpenModal={handleOpenModal} />
      <Footer />
      
      <LeadFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}
