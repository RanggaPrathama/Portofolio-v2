"use client";

import { motion } from "framer-motion";
import { GitHubCalendar } from 'react-github-calendar';
import { FolderGit2, Award, Code2, GitCommit } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay?: number;
}

function StatCard({ icon, label, value, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2, scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-4"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-foreground/5 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {value}
          </span>
          <span className="text-xs text-muted-foreground tracking-wide">
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface GithubActivityProps {
  username: string;
  stats: {
    projects: number;
    certifications: number;
    skills: number;
    experience: number;
  };
}

export function GithubActivity({ username, stats }: GithubActivityProps) {
  return (
    <div className="w-full space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon={<FolderGit2 className="w-5 h-5" />}
          label="Projects"
          value={`${stats.projects}+`}
          delay={0}
        />
        <StatCard
          icon={<Code2 className="w-5 h-5" />}
          label="Tech Stack"
          value={`${stats.skills}+`}
          delay={0.1}
        />
        <StatCard
          icon={<Award className="w-5 h-5" />}
          label="Certifications"
          value={`${stats.certifications}`}
          delay={0.2}
        />
        <StatCard
          icon={<GitCommit className="w-5 h-5" />}
          label="Yrs Experience"
          value={`${stats.experience}+`}
          delay={0.3}
        />
      </div>

      {/* GitHub contribution graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative overflow-hidden rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-4 sm:p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">
            GitHub Contributions
          </span>
          <span className="text-xs text-muted-foreground/60 ml-auto">
            @{username}
          </span>
        </div>
        <div className="w-full overflow-x-auto [&_*]:!bg-transparent [&_.react-github-graph]:!bg-transparent">
          <GitHubCalendar
            username={username}
          />
        </div>
      </motion.div>
    </div>
  );
}
