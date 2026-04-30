"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";

interface SampleRequest {
  _id: string;
  name: string;
  email: string;
  company: string;
  status: string;
  createdAt: string;
}

export default function SampleRequestsPage() {
  const [requests, setRequests] = useState<SampleRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch("/api/sample-requests");
        if (res.ok) {
          const data = await res.json();
          setRequests(data);
        }
      } catch (error) {
        console.error("Failed to fetch sample requests:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRequests();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/sample-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (res.ok) {
        setRequests(prev => prev.map(req => 
          req._id === id ? { ...req, status: newStatus } : req
        ));
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sample Requests</h1>
        <p className="text-gray-500 mt-2">Manage requests for sample kits.</p>
      </div>

      <div className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading requests...</div>
        ) : requests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No sample requests found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800">
                  <th className="py-4 px-6 font-medium text-sm text-gray-500">Date</th>
                  <th className="py-4 px-6 font-medium text-sm text-gray-500">Name</th>
                  <th className="py-4 px-6 font-medium text-sm text-gray-500">Email</th>
                  <th className="py-4 px-6 font-medium text-sm text-gray-500">Company</th>
                  <th className="py-4 px-6 font-medium text-sm text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50 dark:hover:bg-[#121212]/50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                      {format(new Date(req.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                      {req.name}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      <a href={`mailto:${req.email}`} className="text-[var(--color-brand-primary)] hover:underline">
                        {req.email}
                      </a>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {req.company}
                    </td>
                    <td className="py-4 px-6 text-sm">
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req._id, e.target.value)}
                        className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium cursor-pointer border-none focus:ring-2 focus:ring-offset-1 focus:outline-none ${
                          req.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 focus:ring-yellow-500' :
                          req.status === 'Sent' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500 focus:ring-green-500' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 focus:ring-gray-500'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Sent">Sent</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
