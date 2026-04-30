"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

export function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{id: string, role: string, content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const newMessage = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#1A1A1A] w-[350px] sm:w-[400px] h-[500px] rounded-2xl shadow-2xl mb-4 border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[var(--color-brand-primary)] text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-bold">Kanecraft Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#121212]">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                  <p className="font-medium text-lg mb-2">Hello there! 👋</p>
                  <p className="text-sm">Ask me anything about Kanecraft's sustainable paper or ESG reporting.</p>
                </div>
              ) : (
                messages.map(m => (
                  <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                      m.role === 'user' 
                        ? 'bg-[var(--color-brand-primary)] text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-[#1A1A1A] text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800 rounded-tl-sm'
                    }`}>
                      <div className="flex items-start gap-2">
                        {m.role === 'assistant' && <Bot className="w-4 h-4 mt-0.5 opacity-70 shrink-0" />}
                        <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed">
                          {m.content}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#1A1A1A] text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800 rounded-2xl rounded-tl-sm p-4 shadow-sm flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={onSubmit} className="p-3 bg-white dark:bg-[#1A1A1A] border-t border-gray-200 dark:border-gray-800">
              <div className="relative flex items-center">
                <input
                  value={input || ""}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-gray-100 dark:bg-[#121212] text-gray-900 dark:text-white rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/50 border border-transparent focus:border-[var(--color-brand-primary)] text-sm transition-all"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !(input || "").trim()}
                  className="absolute right-2 p-2 bg-[var(--color-brand-primary)] text-white rounded-full disabled:opacity-50 hover:bg-[var(--color-brand-primary)]/90 transition-colors"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[var(--color-brand-primary)] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[var(--color-brand-primary)]/90 transition-colors z-50 relative group"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-4 bg-white dark:bg-[#1A1A1A] text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg text-sm font-medium shadow-md border border-gray-200 dark:border-gray-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with us!
          </div>
        )}
      </motion.button>
    </div>
  );
}
