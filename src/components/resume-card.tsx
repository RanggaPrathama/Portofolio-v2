"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import BlurFade from "./magicui/blur-fade";

interface ResumeCardItem {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}

interface ResumeCardProps {
  items: ResumeCardItem[];
}

export const ResumeCard = ({ items }: ResumeCardProps) => {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <BlurFade key={index} delay={0.1 * index}>
          <ResumeItem key={index} item={item} />
        </BlurFade>
      ))}
    </div>
  );
};

const ResumeItem = ({ item }: { item: ResumeCardItem }) => {
  const { logoUrl, altText, title, subtitle, href, period, description } = item;
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
    >
      <Card className="group relative flex overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm shadow-none p-4 transition-all duration-300 ease-out hover:border-border/80 hover:bg-muted/30 hover:shadow-lg hover:shadow-primary/5">
        {/* Gradient accent left border */}
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            isExpanded && "opacity-100",
          )}
        />

        <div className="flex-none">
          <Avatar className="border border-border/50 size-12 m-auto bg-muted-background dark:bg-foreground ring-2 ring-transparent transition-all duration-300 group-hover:ring-primary/20">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain"
            />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow ml-4 items-center flex-col group">
          <CardHeader>
            <div className="flex items-center justify-between gap-x-4 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                {title}
                {/* 2. Opsional: Icon hanya tampil kalau item tersebut punya deskripsi */}
                {description && (
                  <ChevronRightIcon
                    className={cn(
                      "size-4 transition-transform duration-300 ease-out ml-1",
                      isExpanded ? "rotate-90" : "rotate-0",
                    )}
                  />
                )}
              </h3>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                {period}
              </div>
            </div>
            {subtitle && (
              <div className="font-sans text-xs text-muted-foreground">
                {subtitle}
              </div>
            )}
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-2 text-xs sm:text-sm text-muted-foreground"
            >
              {description}
            </motion.div>
          )}
        </div>
      </Card>
    </Link>
  );
};
