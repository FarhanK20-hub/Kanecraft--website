import React from "react";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import SampleRequest from "@/models/SampleRequest";
import { Package, Tag, FileText, ArrowRight, ClipboardList } from "lucide-react";
import Link from "next/link";

// Force dynamic rendering to ensure stats are always up to date
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await connectToDatabase();

  // Fetch metrics in parallel
  const [totalProducts, categoryStats, recentProducts, totalSampleRequests] = await Promise.all([
    Product.countDocuments(),
    Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]),
    Product.find().sort({ createdAt: -1 }).limit(5).lean(),
    SampleRequest.countDocuments()
  ]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Welcome to your Kanecraft Admin Panel.</p>
      </div>

      {/* High-level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalProducts}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 rounded-lg flex items-center justify-center">
            <ClipboardList className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sample Requests</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalSampleRequests}</p>
          </div>
        </div>

        {/* Dynamic Category Cards based on DB */}
        {categoryStats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#1A1A1A] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-lg flex items-center justify-center">
              <Tag className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat._id}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-400" />
            Recently Added Products
          </h2>
          <Link href="/admin/products" className="text-sm text-[var(--color-brand-primary)] hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {recentProducts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No products found. Start adding some to your catalog!
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {recentProducts.map((product: any) => (
              <div key={product._id.toString()} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#121212]/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                    {product.image ? (
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">?</div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{product.title}</h3>
                    <p className="text-sm text-gray-500">{product.category} • Added {new Date(product.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <Link 
                  href={`/admin/products/${product._id.toString()}/edit`}
                  className="text-sm text-gray-500 hover:text-[var(--color-brand-primary)]"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
