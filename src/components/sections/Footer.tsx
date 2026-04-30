import React from "react";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--color-brand-black)] text-white py-16">
      <div className="container-default">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-primary)] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">KANECRAFT</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium sustainable bagasse paper for forward-thinking enterprises. Same cost, bigger impact.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[var(--color-brand-primary)] transition-colors">Standard A4 Copy</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-primary)] transition-colors">Premium A4 Presentation</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-primary)] transition-colors">A3 Ledger</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-primary)] transition-colors">Custom Sizes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[var(--color-brand-primary)] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-primary)] transition-colors">Sustainability Report</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-primary)] transition-colors">Certifications</a></li>
              <li><a href="#" className="hover:text-[var(--color-brand-primary)] transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>sales@kanecraft.com</li>
              <li>1-800-KANE-ECO</li>
              <li className="pt-2">
                123 Green Way, Suite 400<br />
                San Francisco, CA 94107
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Kanecraft Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
