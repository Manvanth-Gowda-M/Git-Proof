"use client";

import { useState } from "react";
import Hero from "./Hero";
import CertificatePreview from "./CertificatePreview";
import TemplateSelector from "./TemplateSelector";
import { motion, AnimatePresence } from "framer-motion";

export type RepoData = {
  name: string;
  owner: string;
  ownerAvatar: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  defaultBranch: string;
  topContributors: Array<{ login: string; avatar_url: string; contributions: number }>;
  contributorsCount: number;
  topics: string[];
  hasReadme: boolean;
  commitCount: number;
  languages: string[];
};

export type TemplateType = "birth" | "achievement" | "star" | "developer";

export default function Generator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("birth");

  const analyzeRepo = async (url: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analyze?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze repository");
      }
      
      setRepoData(data);
      setSelectedTemplate("birth"); // Default to birth since it is always available
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Hero onAnalyze={analyzeRepo} isLoading={isLoading} />

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-2xl mx-auto mt-4 p-4 border-2 border-red-900 bg-red-100 text-red-900 font-serif text-center font-bold uppercase tracking-widest text-sm"
          >
            Correction Notice: {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {repoData && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto px-4 pb-24 grid lg:grid-cols-[300px_1fr] gap-12 mt-12"
          >
            {/* Sidebar for Template Selection */}
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-black border-b-[4px] border-black pb-2 uppercase tracking-tight">Select Edition</h2>
              <TemplateSelector 
                selected={selectedTemplate} 
                onSelect={setSelectedTemplate}
                data={repoData}
              />
            </div>

            {/* Main Preview Area */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-[4px] border-black pb-2">
                <h2 className="text-2xl font-serif font-bold text-black uppercase tracking-tight">Press Preview</h2>
              </div>
              <CertificatePreview data={repoData} template={selectedTemplate} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
