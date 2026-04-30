"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IProduct } from "@/models/Product";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

interface ProductFormProps {
  initialData?: Partial<IProduct>;
  isEdit?: boolean;
  productId?: string;
}

export function ProductForm({ initialData = {}, isEdit = false, productId }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    price: initialData.price || "",
    category: initialData.category || "Stationery",
    image: initialData.image || "",
    esgStats: initialData.esgStats || [""],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEsgChange = (index: number, value: string) => {
    const newStats = [...formData.esgStats];
    newStats[index] = value;
    setFormData((prev) => ({ ...prev, esgStats: newStats }));
  };

  const addEsgStat = () => {
    setFormData((prev) => ({ ...prev, esgStats: [...prev.esgStats, ""] }));
  };

  const removeEsgStat = (index: number) => {
    const newStats = [...formData.esgStats];
    newStats.splice(index, 1);
    setFormData((prev) => ({ ...prev, esgStats: newStats }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit ? `/api/products/${productId}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        ...formData,
        price: formData.price ? parseFloat(formData.price as string) : undefined,
        esgStats: formData.esgStats.filter((stat) => stat.trim() !== ""),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save product");

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error saving product.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]";

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {isEdit ? "Edit Product" : "New Product"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-[#121212] p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">Basic Info</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
              <input required name="title" value={formData.title} onChange={handleChange} className={inputClass} placeholder="e.g. Premium Notebook" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
              <select required name="category" value={formData.category} onChange={handleChange} className={inputClass}>
                <option value="Stationery">Stationery</option>
                <option value="Packaging">Packaging</option>
                <option value="Office Supplies">Office Supplies</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className={inputClass} placeholder="Product description..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
              <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className={inputClass} placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
              <input name="image" value={formData.image} onChange={handleChange} className={inputClass} placeholder="https://..." />
            </div>
          </div>
        </div>

        {/* ESG Stats */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">ESG Impact Stats</h2>
            <button type="button" onClick={addEsgStat} className="text-[var(--color-brand-primary)] hover:opacity-80 flex items-center gap-1 text-sm font-medium">
              <Plus className="w-4 h-4" /> Add Stat
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.esgStats.map((stat, idx) => (
              <div key={idx} className="flex gap-2">
                <input 
                  value={stat} 
                  onChange={(e) => handleEsgChange(idx, e.target.value)} 
                  className={inputClass} 
                  placeholder="e.g. Saves 10L of water per ream" 
                />
                {formData.esgStats.length > 1 && (
                  <button type="button" onClick={() => removeEsgStat(idx)} className="p-3 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg hover:bg-red-100 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center gap-2 bg-[var(--color-brand-primary)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50"
          >
            {loading ? "Saving..." : (
              <>
                <Save className="w-5 h-5" />
                Save Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
