"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface DailyItem {
  id: number;
  title: string;
  category: string;
  description: string;
  src: string;
  alt: string;
  accentColor: string;
  hoverTextClass: string;
  overlayClass: string;
}

const DAILY_ITEMS: DailyItem[] = [
  {
    id: 1,
    title: "Ngoding",
    category: "Development",
    description: "Menulis kode & memecahkan bug setiap hari",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
    alt: "Coding on laptop",
    accentColor: "bg-sky-500",
    hoverTextClass: "text-sky-400",
    overlayClass: "bg-sky-600/15",
  },
  {
    id: 2,
    title: "Membaca",
    category: "Knowledge",
    description: "Menambah wawasan lewat buku & dokumentasi",
    src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop&q=80",
    alt: "Stack of books",
    accentColor: "bg-violet-500",
    hoverTextClass: "text-violet-400",
    overlayClass: "bg-violet-600/15",
  },
  {
    id: 3,
    title: "Olahraga",
    category: "Wellness",
    description: "Menjaga kebugaran fisik & relaksasi pikiran",
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80",
    alt: "Gym equipment",
    accentColor: "bg-emerald-500",
    hoverTextClass: "text-emerald-400",
    overlayClass: "bg-emerald-600/15",
  },
  {
    id: 4,
    title: "Eksplorasi",
    category: "Adventure",
    description: "Mencoba teknologi baru & berjalan-jalan",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&auto=format&fit=crop&q=80",
    alt: "Nature exploration",
    accentColor: "bg-amber-500",
    hoverTextClass: "text-amber-400",
    overlayClass: "bg-amber-600/15",
  },
  {
    id: 5,
    title: "Kopi",
    category: "Ritual",
    description: "Titik temu inspirasi dari secangkir kopi",
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80",
    alt: "Cup of coffee",
    accentColor: "bg-rose-500",
    hoverTextClass: "text-rose-400",
    overlayClass: "bg-rose-600/15",
  },
];

function RollingTextItem({ item }: { item: DailyItem }) {
  return (
    <div className="group relative w-full border-b border-border/30 py-5 md:py-6 transition-colors duration-300 hover:border-border/60">
      {/* Number indicator */}
      <span className="absolute left-0 top-5 md:top-6 text-[10px] font-mono text-muted-foreground/30 tracking-wider transition-colors duration-500 group-hover:text-muted-foreground/60">
        {String(item.id).padStart(2, "0")}
      </span>

      {/* Rolling text */}
      <div className="relative overflow-hidden h-[44px] md:h-[64px] ml-8 md:ml-10">
        <div className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
          {/* State 1: Normal */}
          <div className="h-[44px] md:h-[64px] flex items-center gap-3">
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                item.accentColor,
              )}
            />
            <h2 className="text-3xl md:text-5xl font-black text-muted-foreground/70 uppercase tracking-tight transition-colors duration-500 group-hover:text-foreground">
              {item.title}
            </h2>
          </div>

          {/* State 2: Hover (Italic + Color) */}
          <div className="h-[44px] md:h-[64px] flex items-center gap-3">
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full shrink-0",
                item.accentColor,
              )}
            />
            <h2
              className={cn(
                "text-3xl md:text-5xl font-black uppercase tracking-tight italic",
                item.hoverTextClass,
              )}
            >
              {item.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Description - slides in on hover */}
      <div className="ml-8 md:ml-10 overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-out group-hover:max-h-8 group-hover:opacity-100">
        <p className="text-xs md:text-sm text-muted-foreground/60 pt-1">
          {item.description}
        </p>
      </div>

      {/* Category Label */}
      <span className="absolute top-6 md:top-7 right-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/25 transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-2 hidden sm:block">
        {item.category}
      </span>

      {/* Image Reveal Effect */}
      <div
        className={cn(
          "pointer-events-none absolute right-4 sm:right-6 top-1/2 z-40 h-24 w-32 md:h-32 md:w-48 -translate-y-1/2 overflow-hidden rounded-xl",
          "transition-all duration-500 ease-out",
          "opacity-0 scale-75 rotate-[15deg] translate-x-12",
          "group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 group-hover:translate-x-0",
          "shadow-2xl ring-1 ring-white/10",
        )}
      >
        <div className="relative h-full w-full">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 160px, 208px"
            className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
          />
          <div
            className={cn(
              "absolute inset-0 mix-blend-overlay",
              item.overlayClass,
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}

export function InteractiveHoverLinks() {
  return (
    <section className="w-full py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
            Daily Life
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Pengalaman Harian
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Aktivitas sehari-hari yang membentuk kebiasaan dan kreativitas saya.
          </p>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-2xl flex-col px-2">
        {DAILY_ITEMS.map((item) => (
          <RollingTextItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
