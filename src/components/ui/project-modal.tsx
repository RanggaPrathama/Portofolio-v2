"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Markdown from "react-markdown";
import { useEffect } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    dates: string;
    tags: readonly string[];
    image?: string;
    video?: string;
    href?: string;
    links?: readonly {
      icon: React.ReactNode;
      type: string;
      href: string;
    }[];
  } | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-border/50 bg-background shadow-2xl shadow-black/10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image/Video */}
            {(project.image || project.video) && (
              <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Title & date */}
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  {project.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.dates}
                </p>
              </div>

              {/* Description - full, no truncation */}
              <Markdown className="prose prose-sm max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert leading-relaxed">
                {project.description}
              </Markdown>

              {/* Tech tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-2.5 py-0.5 text-[11px] bg-muted/50 text-muted-foreground border border-border/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.links.map((link, idx) => (
                    <Link href={link.href} key={idx} target="_blank">
                      <Badge className="flex gap-2 px-3 py-1.5 text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer">
                        {link.icon}
                        {link.type}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}

              {/* Visit project link */}
              {project.href && project.href.length > 0 && (
                <Link
                  href={project.href}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mt-2"
                >
                  Visit Project →
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
