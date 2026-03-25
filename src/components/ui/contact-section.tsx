"use client";

import { motion } from "framer-motion";
import {
  Mail,
  ArrowUpRight,
  Code2,
  Smartphone,
  Palette,
  Server,
  Github as GithubIcon,
  Database,
} from "lucide-react";
import Link from "next/link";
import { Radar, IconContainer } from "./radar-effect";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface ContactSectionProps {
  email: string;
  socials: SocialLink[];
}

export function ContactSection({ email, socials }: ContactSectionProps) {
  return (
    <div className="relative w-[100vw] -ml-[calc(50vw-50%)] -mb-12 sm:-mb-24 pb-24 sm:pb-32 pt-16 sm:pt-20 overflow-hidden">
      {/* Subtle top/bottom borders */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      </div> */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-50/60 to-blue-100/40 dark:from-transparent dark:via-transparent dark:to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent  to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent  to-transparent" />
      </div>

      {/* Radar background effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none h-full">
        <div className="relative flex h-full w-full max-w-4xl flex-col items-center justify-center overflow-hidden opacity-20 dark:opacity-35">
          {/* Row 1 - tech icons */}
          <div className="mx-auto w-full max-w-3xl px-4">
            <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
              <IconContainer
                text="Web Dev"
                delay={0.2}
                icon={<Code2 className="h-6 w-6 text-muted-foreground" />}
              />
              <IconContainer
                delay={0.4}
                text="Mobile"
                icon={<Smartphone className="h-6 w-6 text-muted-foreground" />}
              />
              <IconContainer
                text="Design"
                delay={0.3}
                icon={<Palette className="h-6 w-6 text-muted-foreground" />}
              />
            </div>
          </div>
          {/* Row 2 */}
          <div className="mx-auto w-full max-w-md mt-6 px-4">
            <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
              <IconContainer
                text="Backend"
                delay={0.5}
                icon={<Server className="h-6 w-6 text-muted-foreground" />}
              />
              <IconContainer
                text="DevOps"
                delay={0.8}
                icon={<Database className="h-6 w-6 text-muted-foreground" />}
              />
            </div>
          </div>
          {/* Row 3 */}
          <div className="mx-auto w-full max-w-3xl mt-6 px-4">
            <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
              <IconContainer
                delay={0.6}
                text="GitHub"
                icon={<GithubIcon className="h-6 w-6 text-muted-foreground" />}
              />
              <IconContainer
                delay={0.7}
                text="API"
                icon={<Code2 className="h-6 w-6 text-muted-foreground" />}
              />
            </div>
          </div>
          <Radar className="absolute -bottom-16" />
          <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 space-y-10">
        {/* Heading */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-foreground  dark:backdrop-blur-sm px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-background ">Available for work</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              amazing
            </span>{" "}
            together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto"
          >
            Got an idea or project? I&apos;d love to hear about it. Drop me a
            message and let&apos;s make it happen.
          </motion.p>
        </div>

        {/* CTA email button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <Link href={`mailto:${email}`}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 rounded-full bg-foreground text-background px-8 py-4 font-medium text-base overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Mail className="relative w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span className="relative">Send me an email</span>
              <ArrowUpRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-3"
        >
          <span className="text-xs text-muted-foreground/60 uppercase tracking-widest mr-2">
            Connect
          </span>
          <div className="h-px w-8 bg-border/50" />
          {socials.map((social) => (
            <Link key={social.name} href={social.url} target="_blank">
              <motion.div
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors duration-300"
              >
                {social.icon}
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Footer line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-xs text-muted-foreground/40"
        >
          Typically responds within 24 hours
        </motion.p>
      </div>
    </div>
  );
}
