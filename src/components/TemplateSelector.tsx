"use client";

import { RepoData, TemplateType } from "./Generator";
import { Award, Star, Code, Calendar, Lock } from "lucide-react";

interface TemplateSelectorProps {
  selected: TemplateType;
  onSelect: (t: TemplateType) => void;
  data: RepoData;
}

export default function TemplateSelector({ selected, onSelect, data }: TemplateSelectorProps) {
  const templates = [
    {
      id: "birth" as TemplateType,
      name: "Official Repository Certificate",
      description: "Celebrate the creation and initialization of your project.",
      icon: Calendar,
      isUnlocked: true,
      requirementText: "Any public repository"
    },
    {
      id: "achievement" as TemplateType,
      name: "Achievement",
      description: "Official recognition of maintenance.",
      icon: Award,
      isUnlocked: data.hasReadme && data.commitCount > 0,
      requirementText: "Requires README & Commits"
    },
    {
      id: "star" as TemplateType,
      name: "Star Milestone",
      description: "Highlight your repository's popularity.",
      icon: Star,
      isUnlocked: data.stars > 0,
      requirementText: "Requires at least 1 Star"
    },
    {
      id: "developer" as TemplateType,
      name: "Top Developer",
      description: "Certified developer based on languages.",
      icon: Code,
      isUnlocked: data.languages && data.languages.length > 0,
      requirementText: "Requires detected languages"
    }
  ];

  return (
    <div className="flex flex-col gap-4 font-serif">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => {
            if (t.isUnlocked) {
              onSelect(t.id);
            }
          }}
          disabled={!t.isUnlocked}
          className={`relative p-4 text-left transition-all bg-white border-2 border-black ${
            selected === t.id 
              ? `paper-shadow translate-x-[-2px] translate-y-[-2px]` 
              : !t.isUnlocked
              ? `opacity-60 cursor-not-allowed bg-neutral-100 border-dashed`
              : `hover:paper-shadow hover:-translate-x-[2px] hover:-translate-y-[2px]`
          }`}
        >
          <div className="flex items-center justify-between mb-2 w-full border-b border-black pb-2">
            <div className="flex items-center gap-3">
              <div className="p-1 border border-black rounded-sm bg-neutral-100">
                <t.icon className="w-5 h-5 text-black" />
              </div>
              <span className="font-bold text-black uppercase tracking-widest text-sm">{t.name}</span>
            </div>
            {!t.isUnlocked && <Lock className="w-4 h-4 text-neutral-600" />}
          </div>
          <span className="text-sm text-neutral-800 font-serif italic block mb-1">{t.description}</span>
          {!t.isUnlocked && (
            <span className="text-xs text-neutral-500 font-sans font-bold uppercase tracking-widest block mt-2">Locked: {t.requirementText}</span>
          )}
        </button>
      ))}
    </div>
  );
}
