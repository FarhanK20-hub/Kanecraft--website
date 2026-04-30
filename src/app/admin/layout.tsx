"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, Settings, LogOut, ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  // If we are on the login page, don't show the sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[#121212] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#1A1A1A] border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <Link href="/admin/products" className="text-xl font-bold text-[var(--color-brand-primary)]">
            Kanecraft Admin
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === "/admin" 
                ? "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] font-medium" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link 
            href="/admin/products" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname.includes("/admin/products")
                ? "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] font-medium" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Package className="w-5 h-5" />
            Products
          </Link>
          <Link 
            href="/admin/sample-requests" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname.includes("/admin/sample-requests")
                ? "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] font-medium" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Sample Requests
          </Link>
          <Link 
            href="#" 
            className="flex items-center gap-3 px-4 py-3 text-gray-400 dark:text-gray-600 rounded-lg cursor-not-allowed"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Site
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
