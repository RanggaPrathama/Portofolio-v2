"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillItem {
  name: string;
  level: number;
}

interface SkillsProps {
  skills: SkillItem[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export function Skills({ skills }: SkillsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-2"
      >
        {skills.map((skill, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={skill.name}
              variants={item}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <motion.div
                className={cn(
                  "relative rounded-xl border px-4 py-3 cursor-pointer",
                  "transition-colors duration-300",
                  isHovered
                    ? "border-blue-500/30 bg-blue-500/[0.04] dark:bg-blue-500/[0.06]"
                    : "border-border/40 bg-background/50",
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Top row: name + percentage */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-blue-500"
                      animate={{
                        scale: isHovered ? [1, 1.5, 1] : 1,
                        opacity: isHovered ? 1 : 0.4,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    <span
                      className={cn(
                        "text-sm font-medium transition-colors duration-300",
                        isHovered ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {skill.name}
                    </span>
                  </div>

                  <motion.span
                    className="text-xs font-mono tabular-nums text-muted-foreground"
                    animate={{
                      opacity: isHovered ? 1 : 0.4,
                      color: isHovered
                        ? "var(--foreground)"
                        : "var(--muted-foreground)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>

                {/* Progress bar */}
                <div className="relative w-full h-1.5 rounded-full overflow-hidden bg-border/40 dark:bg-border/25">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    animate={{
                      x: isHovered ? "100%" : "-100%",
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ width: "50%" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
