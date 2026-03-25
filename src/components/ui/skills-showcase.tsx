"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface SkillItem {
  name: string;
  level: number;
}

interface SkillsProps {
  skills: SkillItem[];
}

export function Skills({ skills }: SkillsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
        {skills.map((skill, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={skill.name}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={cn(
                  "relative flex items-center justify-between py-3 px-3 cursor-pointer",
                  "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "rounded-lg",
                  isHovered
                    ? "bg-foreground/[0.03] dark:bg-foreground/[0.05]"
                    : "bg-transparent",
                )}
              >
                {/* Left side */}
                <div className="relative flex items-center gap-3">
                  <div
                    className={cn(
                      "h-4 w-0.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isHovered
                        ? "bg-blue-500 scale-y-100 opacity-100"
                        : "bg-border scale-y-50 opacity-0",
                    )}
                  />

                  <span
                    className={cn(
                      "text-sm font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isHovered
                        ? "text-foreground translate-x-0"
                        : "text-muted-foreground -translate-x-4",
                    )}
                  >
                    {skill.name}
                  </span>
                </div>

                {/* Right side - progress */}
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-1 rounded-full overflow-hidden bg-border/50 dark:bg-border/30">
                    <div className="absolute inset-0 bg-muted/50 dark:bg-muted/20" />
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        "bg-gradient-to-r from-blue-500/80 to-cyan-400",
                      )}
                      style={{
                        width: isHovered ? `${skill.level}%` : "0%",
                        transitionDelay: isHovered ? "100ms" : "0ms",
                      }}
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
                        "transition-transform duration-700 ease-out",
                        isHovered ? "translate-x-full" : "-translate-x-full",
                      )}
                      style={{
                        transitionDelay: isHovered ? "300ms" : "0ms",
                      }}
                    />
                  </div>

                  <div className="relative w-8 overflow-hidden">
                    <span
                      className={cn(
                        "block text-xs font-mono tabular-nums text-right",
                        "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isHovered
                          ? "text-foreground opacity-100 translate-y-0 blur-0"
                          : "text-muted-foreground/40 opacity-0 translate-y-3 blur-sm",
                      )}
                    >
                      {skill.level}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border/30 dark:border-border/20">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60 animate-pulse" />
        <p className="text-[11px] text-muted-foreground tracking-wide">
          Hover to explore
        </p>
      </div>
    </div>
  );
}
