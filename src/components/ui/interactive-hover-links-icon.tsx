"use client";

import { useMotionValue, motion, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";
import {
  ArrowRight,
  Code2,
  BookOpen,
  Dumbbell,
  Compass,
  Coffee,
} from "lucide-react";

export const INTERACTIVE_LINKS = [
  {
    heading: "Ngoding",
    subheading: "Menulis kode dan memecahkan bug setiap hari",
    imgSrc:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    href: "#",
    icon: Code2,
    accent: "from-sky-400 to-blue-600",
  },
  {
    heading: "Membaca",
    subheading: "Menambah wawasan lewat buku dan dokumentasi",
    imgSrc:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
    href: "#",
    icon: BookOpen,
    accent: "from-violet-400 to-purple-600",
  },
  {
    heading: "Olahraga",
    subheading: "Menjaga kebugaran fisik dan relaksasi pikiran",
    imgSrc:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    href: "#",
    icon: Dumbbell,
    accent: "from-emerald-400 to-green-600",
  },
  {
    heading: "Eksplorasi",
    subheading: "Mencoba teknologi baru atau sekadar berjalan-jalan",
    imgSrc:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    href: "#",
    icon: Compass,
    accent: "from-amber-400 to-orange-600",
  },
  {
    heading: "Kopi Break",
    subheading: "Titik temu inspirasi dari secangkir kopi",
    imgSrc:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    href: "#",
    icon: Coffee,
    accent: "from-rose-400 to-red-600",
  },
];

interface InteractiveHoverLinksProps {
  links?: typeof INTERACTIVE_LINKS;
}

export function InteractiveHoverLinks({
  links = INTERACTIVE_LINKS,
}: InteractiveHoverLinksProps) {
  return (
    <section className="w-full">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
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
      <div className="w-full max-w-3xl mx-auto">
        {links.map((link, index) => (
          <InteractiveLink key={link.heading} index={index} {...link} />
        ))}
      </div>
    </section>
  );
}

interface LinkProps {
  heading: string;
  imgSrc: string;
  subheading: string;
  href: string;
  index: number;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

function InteractiveLink({
  heading,
  imgSrc,
  subheading,
  index,
  icon: Icon,
  accent,
}: Omit<LinkProps, "href">) {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "40%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = ref.current!.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center gap-4 border-b border-border/40 py-5 transition-all duration-500 hover:border-border hover:bg-muted/5 md:py-7 rounded-lg px-2 sm:px-4"
    >
      {/* Number + Icon */}
      <div className="relative z-10 flex items-center gap-3 sm:gap-4 shrink-0">
        <span className="text-xs font-mono text-muted-foreground/50 w-5 text-right">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div
          className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${accent} opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 shadow-lg`}
        >
          <Icon className="size-5 sm:size-6 text-white" />
        </div>
      </div>

      {/* Text */}
      <div className="relative z-10 flex-1 min-w-0 pr-12">
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -8 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.05,
            delayChildren: 0.15,
          }}
          className="block text-xl sm:text-2xl md:text-3xl font-bold text-muted-foreground/80 transition-colors duration-500 group-hover:text-foreground"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 8 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-0.5 block text-xs sm:text-sm text-muted-foreground/60 transition-colors duration-500 group-hover:text-muted-foreground">
          {subheading}
        </span>
      </div>

      {/* Hover image */}
      <motion.img
        style={{
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-15deg", opacity: 0 },
          whileHover: { scale: 1, rotate: "0deg", opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        src={imgSrc}
        className="absolute right-0 top-1/2 z-40 h-24 w-32 md:h-32 md:w-48 rounded-xl object-cover shadow-2xl ring-1 ring-white/10 pointer-events-none"
        alt={`Image representing ${heading}`}
      />
    </motion.div>
  );
}
