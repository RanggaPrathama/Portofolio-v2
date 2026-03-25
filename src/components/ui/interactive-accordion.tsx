"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  number: string;
  title: string;
  content: string;
  image?: string;
}

interface UniqueAccordionProps {
  items: AccordionItem[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export function UniqueAccordion({ items }: UniqueAccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className="w-full space-y-3"
    >
      {items.map((item, index) => {
        const isActive = activeId === item.id;

        return (
          <motion.div
            key={item.id}
            variants={cardVariant}
            layout
            className={cn(
              "relative rounded-xl border overflow-hidden transition-colors duration-300",
              isActive
                ? "border-blue-500/30 bg-blue-500/[0.03] dark:bg-blue-500/[0.05]"
                : "border-border/40 bg-background/50 hover:border-border/60",
            )}
          >
            {/* Active indicator bar */}
            <motion.div
              className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-500 to-cyan-400 rounded-l-xl"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scaleY: isActive ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />

            {/* Header button */}
            <motion.button
              onClick={() => setActiveId(isActive ? null : item.id)}
              className="w-full text-left"
              whileTap={{ scale: 0.995 }}
            >
              <div className="flex items-center gap-4 p-4">
                {/* Image / number */}
                <motion.div
                  className="relative flex-shrink-0"
                  animate={{
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {item.image ? (
                    <div
                      className={cn(
                        "w-11 h-11 rounded-xl overflow-hidden border-2 transition-colors duration-300",
                        isActive ? "border-blue-500/50" : "border-border/50",
                      )}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300",
                        isActive
                          ? "bg-blue-500 text-white"
                          : "bg-muted/50 text-muted-foreground",
                      )}
                    >
                      {item.number}
                    </div>
                  )}
                </motion.div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <motion.h3
                    className={cn(
                      "text-base sm:text-lg font-semibold tracking-tight truncate transition-colors duration-300",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {item.title}
                  </motion.h3>
                  {!isActive && (
                    <p className="text-xs text-muted-foreground/50 mt-0.5 truncate">
                      Click to expand
                    </p>
                  )}
                </div>

                {/* Toggle icon */}
                <motion.div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-300",
                    isActive
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-muted/30 text-muted-foreground",
                  )}
                  animate={{ rotate: isActive ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M7 1v12M1 7h12" />
                  </svg>
                </motion.div>
              </div>
            </motion.button>

            {/* Expandable content */}
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.25, delay: 0.08 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.1 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-0">
                    <div className="ml-[3.75rem] border-t border-border/30 pt-3">
                      <motion.p
                        className="text-sm text-muted-foreground leading-relaxed"
                        initial={{ y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                          delay: 0.05,
                        }}
                      >
                        {item.content}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
