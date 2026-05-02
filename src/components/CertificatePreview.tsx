"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Image as ImageIcon, Loader2, GitBranch, Award, Star, Code, BookOpen, GitFork, Book, Lock } from "lucide-react";
import { RepoData, TemplateType } from "./Generator";
import { downloadAsPdf, downloadAsPng } from "@/lib/export";
import { format } from "date-fns";
import BirthCertificateTemplate from "./BirthCertificateTemplate";
import AchievementCertificateTemplate from "./AchievementCertificateTemplate";

interface CertificatePreviewProps {
  data: RepoData;
  template: TemplateType;
}

export default function CertificatePreview({ data, template }: CertificatePreviewProps) {
  const [isExporting, setIsExporting] = useState<"pdf" | "png" | null>(null);
  const certId = "certificate-element";
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateScale = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setScale(width / 1123);
      }
    };

    // Calculate immediately on mount
    updateScale();
    
    // Listen for resize events
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    
    window.addEventListener('resize', updateScale);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  const handleExport = async (format: "pdf" | "png") => {
    setIsExporting(format);
    try {
      const filename = `GitProof_${data.name}_${template}`;
      if (format === "pdf") {
        await downloadAsPdf(certId, filename);
      } else {
        await downloadAsPng(certId, filename);
      }
    } catch (error) {
      alert("Failed to export. Please try again.");
    } finally {
      setIsExporting(null);
    }
  };

  const renderTemplate = () => {
    switch (template) {
      case "birth":
        return <BirthCertificate data={data} />;
      case "achievement":
        return <AchievementCertificate data={data} />;
      case "star":
        return <StarCertificate data={data} />;
      case "developer":
        return <DeveloperCertificate data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Certificate Wrapper - Responsive scaling */}
      <div 
        ref={containerRef}
        className="w-full max-w-[800px] overflow-hidden bg-white relative paper-shadow border-2 border-black p-1"
      >
        <div className="w-full aspect-[1.414/1] relative bg-white border border-neutral-300"> 
          <div 
            id={certId}
            className="absolute top-0 left-0 w-[1123px] h-[794px] overflow-hidden transition-opacity duration-300 bg-white"
            style={{
              transform: `scale(${scale || 1})`,
              transformOrigin: 'top left',
              opacity: scale === null ? 0 : 1,
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>

      {/* Export Controls */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => handleExport("png")}
          disabled={isExporting !== null}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-black hover:bg-neutral-100 text-black font-bold uppercase tracking-widest text-sm transition-colors disabled:opacity-50 paper-shadow hover:-translate-x-[2px] hover:-translate-y-[2px]"
        >
          {isExporting === "png" ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
          Export PNG
        </button>
        <button
          onClick={() => handleExport("pdf")}
          disabled={isExporting !== null}
          className="flex items-center gap-2 px-6 py-3 bg-black border-2 border-black hover:bg-neutral-800 text-white font-bold uppercase tracking-widest text-sm transition-colors disabled:opacity-50 paper-shadow hover:-translate-x-[2px] hover:-translate-y-[2px]"
        >
          {isExporting === "pdf" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          Export PDF
        </button>
      </div>
    </div>
  );
}

// ==========================================
// TEMPLATE: Birth Certificate
// ==========================================
function BirthCertificate({ data }: { data: RepoData }) {
  return <BirthCertificateTemplate data={data} />;
}

const GithubLogo = ({ className, fill }: { className?: string, fill?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={fill || "currentColor"} 
    className={className}
    stroke="none"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

// ==========================================
// TEMPLATE: Achievement Certificate
// ==========================================
function AchievementCertificate({ data }: { data: RepoData }) {
  return <AchievementCertificateTemplate data={data} />;
}

// ==========================================
// TEMPLATE: Star Certificate
// ==========================================
function StarCertificate({ data }: { data: RepoData }) {
  return (
    <div className="w-full h-full bg-white p-8 relative overflow-hidden text-black font-serif">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-80 mix-blend-multiply pointer-events-none"></div>

      <div className="w-full h-full border-[12px] border-black p-12 flex flex-col items-center justify-center relative bg-[#f4f1ea] shadow-inner">
        
        <div className="absolute top-0 right-0 -mr-48 -mt-48 opacity-[0.05] pointer-events-none">
          <Star className="w-[600px] h-[600px] text-black" fill="currentColor" />
        </div>
        <div className="absolute bottom-0 left-0 -ml-48 -mb-48 opacity-[0.05] pointer-events-none">
          <Star className="w-[600px] h-[600px] text-black" fill="currentColor" />
        </div>

        <div className="z-10 text-center flex flex-col items-center w-full">
          <div className="flex items-center justify-center gap-8 mb-8 border-y-4 border-black py-4 w-full">
            <Star className="w-12 h-12 text-black" fill="currentColor" />
            <h1 className="text-6xl font-black text-black tracking-[0.2em] uppercase">STAR MILESTONE</h1>
            <Star className="w-12 h-12 text-black" fill="currentColor" />
          </div>

          <p className="text-2xl text-neutral-800 mb-8 italic">This certifies that the repository</p>
          
          <div className="inline-block px-16 py-6 bg-white border-4 border-black mb-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 bg-[#f4f1ea] border-2 border-black font-bold font-sans text-xs uppercase tracking-widest">
              Verified Ownership
            </div>
            <h2 className="text-6xl font-black tracking-tight">{data.owner}/<span className="underline decoration-4 underline-offset-8">{data.name}</span></h2>
          </div>

          <p className="text-2xl text-neutral-800 mb-6 italic">has officially achieved</p>
          
          <div className="flex items-end justify-center gap-6 relative">
            <span className="text-9xl font-black tabular-nums leading-none tracking-tighter">{data.stars.toLocaleString()}</span>
            <span className="text-5xl font-black pb-2 tracking-widest uppercase border-b-8 border-black">STARS</span>
          </div>
          
          <p className="text-xl text-neutral-800 mt-16 max-w-2xl text-center uppercase font-bold tracking-widest font-sans border-t-2 border-black pt-4">
            Recognized globally by the developer community for excellence in open source software.
          </p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// TEMPLATE: Developer Certificate
// ==========================================
function DeveloperCertificate({ data }: { data: RepoData }) {
  return (
    <div className="w-full h-full bg-white relative overflow-hidden flex flex-col justify-between text-black font-serif border-[1px] border-black">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-80 mix-blend-multiply pointer-events-none"></div>

      <div className="w-full h-full border-l-[32px] border-black p-16 z-10 flex flex-col justify-between">
        <div className="flex justify-between items-start border-b-4 border-black pb-6">
          <div>
            <h1 className="text-5xl font-black tracking-widest uppercase mb-2">CERTIFIED SKILLS & EXPERTISE</h1>
            <p className="text-neutral-600 font-sans font-bold uppercase tracking-widest text-sm">ID: {Buffer.from(data.name).toString('base64').substring(0, 12).toUpperCase()}</p>
          </div>
          <BookOpen className="w-20 h-20 text-black" />
        </div>

        <div className="pl-12 border-l-4 border-black py-8 my-8 relative bg-neutral-100/50 shadow-[inset_4px_0_0_rgba(0,0,0,1)]">
          <p className="text-2xl text-neutral-800 mb-4 italic">Presented to</p>
          <div className="flex items-center gap-8 mb-8">
            <img src={data.ownerAvatar} className="w-32 h-32 rounded-none grayscale border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]" alt="" />
            <div>
              <h2 className="text-7xl font-black mb-2 uppercase tracking-tighter">{data.owner}</h2>
              <p className="text-2xl italic font-serif text-neutral-700">Lead Developer of {data.name}</p>
            </div>
          </div>
          
          <p className="text-xl text-neutral-800 max-w-3xl leading-relaxed mb-8">
            For demonstrating practical implementation and exceptional proficiency in modern software development through a comprehensive open-source codebase.
          </p>

          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0_rgba(0,0,0,1)]">
            <p className="text-sm font-sans font-bold text-neutral-800 uppercase tracking-widest mb-4">Verified Technical Stack</p>
            <div className="flex flex-wrap gap-3">
              {data.languages && data.languages.length > 0 ? (
                data.languages.map((lang, idx) => (
                  <span key={idx} className="px-4 py-2 bg-neutral-100 border border-black font-sans font-bold text-lg uppercase tracking-wider">
                    {lang}
                  </span>
                ))
              ) : (
                <span className="px-4 py-2 bg-neutral-100 border border-black font-sans font-bold text-lg uppercase tracking-wider">
                  {data.language || "Software Development"}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-16 border-t-[4px] border-black pt-8 bg-white p-6 shadow-[0_-4px_0_rgba(0,0,0,1)]">
          <div>
            <p className="text-sm font-sans font-bold text-neutral-600 uppercase tracking-widest mb-2">Topics</p>
            <div className="flex gap-2">
              {data.topics.slice(0, 3).map(t => (
                <span key={t} className="px-3 py-1 bg-neutral-200 border border-black font-sans text-xs font-bold uppercase">{t}</span>
              ))}
              {data.topics.length === 0 && <span className="font-bold font-sans uppercase">None</span>}
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm font-sans font-bold text-neutral-600 uppercase tracking-widest mb-2">Last Validated</p>
            <p className="text-2xl font-black uppercase tracking-tight">{format(new Date(data.updatedAt), "MMM d, yyyy")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
