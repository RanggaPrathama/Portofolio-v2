import React from "react";

interface LandingPageProps {
  title?: string;
  description?: string;
  aboutSection?: React.ReactNode;
  avatarComponent?: React.ReactNode;
  showMockups?: boolean;
  logoComponent?: React.ReactNode;
  children?: React.ReactNode;
}

export function HeroSection({
  title = "Transform your digital experience",
  description = "Streamline your daily tasks with fewer distractions and more focus.",
  aboutSection,
  avatarComponent,
  showMockups = true,
  logoComponent,
  children,
}: LandingPageProps) {
  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "Good morning"
      : hours < 18
        ? "Good afternoon"
        : "Good evening";
  return (
    <div className="flex flex-col items-center w-full gap-10 lg:gap-14">
      {/* Text area — centered */}
      <div className="flex flex-col items-center text-center max-w-2xl space-y-5">
        {/* Avatar above title */}
        {avatarComponent && <div className="mb-2">{avatarComponent}</div>}

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
          {title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal max-w-xl">
          {description}
        </p>

        {/* About text — right below description */}
        {aboutSection && <div className="max-w-xl pt-1">{aboutSection}</div>}

        <div className="pt-2 flex gap-3">{children}</div>
      </div>

      {/* Mockup area — desktop + mobile */}
      {showMockups && (
        <div className="relative w-full max-w-4xl">
          {/* Desktop browser window */}
          <div className="w-full bg-background rounded-xl sm:rounded-2xl shadow-2xl border border-border/40 overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40 bg-muted/20">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 mx-8">
                <div className="bg-muted/40 rounded-md px-3 py-1 text-[11px] text-muted-foreground text-center border border-border/20 max-w-xs mx-auto">
                  rangga.dev
                </div>
              </div>
            </div>

            {/* Browser content — two-column dashboard */}
            <div className="flex min-h-[280px] sm:min-h-[340px]">
              {/* Sidebar */}
              <div className="hidden sm:flex flex-col gap-3 p-4 w-48 border-r border-border/30 bg-muted/10">
                <div className="flex items-center gap-2.5 mb-2">
                  {logoComponent || (
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">
                        R
                      </span>
                    </div>
                  )}
                  <span className="font-semibold text-foreground text-sm">
                    Portfolio
                  </span>
                </div>
                {[
                  "Dashboard",
                  "Projects",
                  "Skills",
                  "Experience",
                  "Contact",
                ].map((item, i) => (
                  <div
                    key={item}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      i === 0
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/40"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-5 sm:p-6 space-y-5">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Projects", value: "6+" },
                    { label: "Skills", value: "11+" },
                    { label: "Experience", value: "3+" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-3 rounded-xl bg-muted/30 border border-border/20 text-center"
                    >
                      <div className="text-lg sm:text-xl font-bold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skill chips */}
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground font-medium">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "React",
                      "Next.js",
                      "Go",
                      "Laravel",
                      "Node.js",
                      "Python",
                      "Docker",
                      "Vue.js",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-muted/40 border border-border/20 text-[10px] sm:text-xs text-muted-foreground font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Activity bars */}
                <div className="space-y-2.5">
                  <div className="text-xs text-muted-foreground font-medium">
                    Activity
                  </div>
                  {["Frontend", "Backend", "AI / ML"].map((area, i) => (
                    <div key={area} className="flex items-center gap-3">
                      <span className="text-[10px] sm:text-xs text-muted-foreground w-16">
                        {area}
                      </span>
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                          style={{ width: `${[85, 90, 60][i]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile phone mockup */}
          <div className="absolute -bottom-8 -right-4 sm:-right-8 w-[120px] h-[210px] sm:w-[140px] sm:h-[245px] bg-slate-800 rounded-[1.5rem] p-1 shadow-2xl border border-slate-700/50 transform -rotate-6 hover:-rotate-3 transition-transform duration-300 z-10">
            <div className="w-full h-full bg-background rounded-[1.25rem] overflow-hidden border border-border/30">
              {/* Status bar */}
              <div className="flex justify-between items-center px-3 py-1.5 text-[8px]">
                <span className="font-medium text-foreground">{greeting}</span>
                <div className="flex items-center gap-0.5">
                  <div className="w-3 h-1.5 bg-green-500 rounded-sm" />
                </div>
              </div>
              {/* Phone content */}
              <div className="px-2.5 pt-1 space-y-3">
                <div className="flex items-center gap-2">
                  {logoComponent || (
                    <div className="w-5 h-5 bg-primary rounded-md flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-xs">
                        R
                      </span>
                    </div>
                  )}
                  <span className="text-[9px] font-semibold text-foreground">
                    Portfolio
                  </span>
                </div>
                {/* Mini stat cards */}
                <div className="grid grid-cols-2 gap-1.5">
                  {["6+", "11+", "3+", "8+"].map((v, i) => (
                    <div
                      key={i}
                      className="p-1.5 rounded-lg bg-muted/30 text-center"
                    >
                      <div className="text-[10px] font-bold text-foreground">
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Mini bars */}
                <div className="space-y-1.5">
                  {[75, 90, 55].map((w, i) => (
                    <div
                      key={i}
                      className="h-1 bg-muted rounded-full overflow-hidden"
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        style={{ width: `${w}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Subtle gradient glow */}
          <div className="absolute -inset-4 -z-10 bg-gradient-to-t from-blue-500/5 via-transparent to-transparent rounded-3xl blur-2xl" />
        </div>
      )}
    </div>
  );
}
