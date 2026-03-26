import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";
import { ProjectGridWithModal } from "@/components/ui/project-grid-with-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeroSection } from "@/components/ui/hero-with-product-mockup";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import HyperTextParagraph from "@/components/ui/hyper-text-with-decryption";
import { Skills } from "@/components/ui/skills-showcase";
import { UniqueAccordion } from "@/components/ui/interactive-accordion";
import { ContactSection } from "@/components/ui/contact-section";
import { InteractiveHoverLinks } from "@/components/ui/interactive-hover-links-icon";
import { Github, Linkedin } from "lucide-react";
import { DATA } from "@/data/resume";
const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className=" relative z-10 flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full space-y-12 mb-6 ">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <HeroSection
              title={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              description={DATA.description}
              avatarComponent={
                <div className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500/60 to-blue-600/60 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse" />
                  <div className="relative p-[3px] bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 rounded-full">
                    <Avatar className="size-20 sm:size-24 border-2 border-background">
                      <AvatarImage
                        alt={DATA.name}
                        src={DATA.avatarUrl}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-sky-500/60 to-blue-600/60 text-white">
                        {DATA.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              }
              aboutSection={
                <HyperTextParagraph
                  text="I'm a full-stack developer & Informatics Engineering student at Universitas Airlangga. I build real-world web solutions through freelance projects, leveraging modern tech like React, Node.js, Laravel, and Golang to tackle complex challenges."
                  highlightWords={[
                    "full-stack",
                    "Airlangga",
                    "React",
                    "Node.js",
                    "Laravel",
                    "Golang",
                  ]}
                  className="text-sm text-muted-foreground"
                />
              }
            >
              <ButtonWithIcon
                text="Let's Collaborate"
                href={`mailto:${DATA.contact.email}`}
              />
            </HeroSection>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-5 py-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start}  ${
                  work.end == "" ? "" : " - " + work.end
                }`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-5">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <Skills
              skills={[
                { name: "React / Next.js", level: 90 },
                { name: "Vue.js", level: 80 },
                { name: "Node.js / Express", level: 85 },
                { name: "Laravel", level: 88 },
                { name: "Golang", level: 75 },
                { name: "Python / FastAPI", level: 78 },
                { name: "TypeScript", level: 85 },
                { name: "PostgreSQL / MySQL", level: 82 },
                { name: "Docker", level: 70 },
                { name: "Machine Learning", level: 65 },
              ]}
            />
          </BlurFade>
        </div>
      </section>

      <section id="daily">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 10.2}>
            <InteractiveHoverLinks />
          </BlurFade>
        </div>
      </section>

      {/* <section id="github">
        <BlurFade delay={BLUR_FADE_DELAY * 10.5}>
          <GithubActivity
            username="RanggaPrathama"
            stats={{
              projects: DATA.projects.length,
              certifications: DATA.certifications.length,
              skills: DATA.skills.length,
              experience: 3,
            }}
          />
        </BlurFade>
      </section> */}
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <ProjectGridWithModal
            projects={DATA.projects}
            blurFadeDelay={BLUR_FADE_DELAY * 12}
          />
        </div>
      </section>
      <section id="certifications">
        <div className="space-y-8 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Certifications
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  My Certifications
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are some of the certifications I have earned through hard
                  work and dedication.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <div className="max-w-2xl mx-auto">
              <UniqueAccordion
                items={DATA.certifications.map((cert, i) => ({
                  id: cert.title,
                  number: String(i + 1).padStart(2, "0"),
                  title: cert.title,
                  content: cert.description,
                  image: cert.image,
                }))}
              />
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection
            email="ranggaprathama9@gmail.com"
            socials={[
              {
                name: "GitHub",
                url: "https://github.com/RanggaPrathama",
                icon: <Github className="w-4 h-4" />,
              },
              {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/rangga-prathama-05a066291/",
                icon: <Linkedin className="w-4 h-4" />,
              },
            ]}
          />
        </BlurFade>
      </section>
    </main>
  );
}
