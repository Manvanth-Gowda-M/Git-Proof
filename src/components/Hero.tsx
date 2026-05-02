"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export default function Hero({ onAnalyze, isLoading }: HeroProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onAnalyze(url.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pt-8 pb-16 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center justify-center px-4 py-1 mb-8 text-xs font-bold uppercase tracking-widest border-2 border-black text-black">
          <span className="flex w-2 h-2 rounded-full bg-black mr-2 animate-pulse"></span>
          GitProof Printing Press 1.0
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tight mb-6 text-black uppercase">
          Certify Your Code.<br />Prove Your Impact.
        </h1>
        <p className="text-lg md:text-xl text-neutral-700 mb-12 max-w-2xl mx-auto font-serif italic">
          Generate classic, shareable certificates from your GitHub repository data. 100% free and client-side.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center paper-shadow bg-white border-2 border-black">
            <Search className="absolute left-4 w-6 h-6 text-black" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="github.com/owner/repo"
              className="w-full h-16 pl-14 pr-32 bg-transparent text-black placeholder-neutral-500 focus:outline-none text-lg font-serif"
              required
            />
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="absolute right-2 top-2 bottom-2 px-6 bg-black hover:bg-neutral-800 text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px] uppercase tracking-widest text-sm"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Print"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
