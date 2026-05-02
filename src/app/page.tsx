"use client";

import { useState, useEffect } from "react";
import Generator from "@/components/Generator";
import { BookOpen } from "lucide-react";
import { format } from "date-fns";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setMounted(true);
    setToday(format(new Date(), "EEEE, MMMM d, yyyy"));
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch


  return (
    <main className="min-h-screen relative flex flex-col items-center pt-8 pb-16 px-4 sm:px-8">
      {/* Newspaper Masthead */}
      <header className="w-full max-w-6xl mx-auto flex flex-col items-center z-10 mb-12">
        <div className="w-full flex justify-between items-end border-b-2 border-black pb-2 mb-2 font-sans text-sm font-semibold tracking-widest uppercase text-neutral-800">
          <span className="hidden sm:inline-block">Vol. 1 — No. 1</span>
          <span>{today}</span>
          <span className="hidden sm:inline-block">Open Source Edition</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-6 text-center">
          <BookOpen className="w-10 h-10 md:w-16 md:h-16 text-black hidden md:block" />
          <h1 className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-black uppercase">
            The GitProof Times
          </h1>
        </div>
        
        <div className="w-full border-t-[4px] border-b-[1px] border-black py-2 mb-8 flex justify-center md:justify-between items-center font-sans text-sm font-bold uppercase tracking-widest text-neutral-800">
          <span className="hidden md:inline-block">"All the Code That's Fit to Print"</span>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline hover:text-neutral-500 transition-colors"
          >
            Read Source Code
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto flex-1">
        <Generator />
      </div>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto mt-24 pt-8 border-t-2 border-black text-center font-sans text-neutral-800 text-sm font-medium">
        <p>Printed on the World Wide Web using Next.js and Tailwind CSS.</p>
        <p className="mt-2 uppercase tracking-widest text-xs">© {mounted ? new Date().getFullYear() : ""} GitProof Press. 100% Free and Open Source.</p>
      </footer>
    </main>
  );
}
