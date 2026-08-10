"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageSliderProps {
  images: readonly string[];
  alt: string;
}

export function ImageSlider({ images, alt }: ImageSliderProps) {
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);

  const paginate = useCallback(
    (dir: number) =>
      setPage(([i]) => [
        ((i + dir) % images.length + images.length) % images.length,
        dir,
      ]),
    [images.length],
  );

  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  // touch swipe
  const [touchX, setTouchX] = useState<number | null>(null);

  return (
    <div
      className="relative w-full aspect-video overflow-hidden rounded-t-2xl"
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) paginate(dx > 0 ? -1 : 1);
        setTouchX(null);
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          variants={{
            enter: (dir: number) => ({
              x: dir >= 0 ? "100%" : "-100%",
              opacity: 0,
            }),
            center: { x: 0, opacity: 1 },
            exit: (dir: number) => ({
              x: dir >= 0 ? "-100%" : "100%",
              opacity: 0,
            }),
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 z-10"
        >
          <Image
            src={images[index]}
            alt={`${alt} — ${index + 1}`}
            fill
            sizes="(max-width: 512px) 100vw, 512px"
            className="object-cover object-top"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* counter */}
      <span className="absolute top-3 left-3 z-20 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
        {index + 1} / {images.length}
      </span>

      {/* arrows */}
      <button
        onClick={() => paginate(-1)}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => paginate(1)}
        aria-label="Next image"
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* dots */}
      <div className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > index ? 1 : -1])}
            aria-label={`Go to image ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index
                ? "w-4 bg-foreground"
                : "w-1.5 bg-foreground/30 hover:bg-foreground/60",
            )}
          />
        ))}
      </div>
    </div>
  );
}
