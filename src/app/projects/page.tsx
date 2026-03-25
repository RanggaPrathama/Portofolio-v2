import BlurFade from "@/components/magicui/blur-fade";
import { ProjectGridWithModal } from "@/components/ui/project-grid-with-modal";
import { DATA } from "@/data/resume";

export const metadata = {
  title: "Projects",
  description: "A showcase of my projects.",
};

const BLUR_FADE_DELAY = 0.04;

export default function ProjectPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] ">
      <section id="projects">
        <div className="w-full space-y-12">
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
    </div>
  );
}
