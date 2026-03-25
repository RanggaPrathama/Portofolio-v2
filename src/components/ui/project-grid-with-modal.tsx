"use client";

import { useState, useCallback } from "react";
import { ProjectModal } from "@/components/ui/project-modal";
import { ProjectCard } from "@/components/project-card";
import BlurFade from "@/components/magicui/blur-fade";

interface ProjectItem {
  title: string;
  description: string;
  dates: string;
  technologies: readonly string[];
  image?: string;
  video?: string;
  href?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
}

interface ProjectGridWithModalProps {
  projects: readonly ProjectItem[];
  blurFadeDelay?: number;
}

export function ProjectGridWithModal({
  projects,
  blurFadeDelay = 0.48,
}: ProjectGridWithModalProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((project: ProjectItem) => {
    setSelectedProject(project);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
        {projects.map((project, id) => (
          <BlurFade key={project.title} delay={blurFadeDelay + id * 0.05}>
            <ProjectCard
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
              onClick={() => openModal(project)}
            />
          </BlurFade>
        ))}
      </div>
      <ProjectModal
        isOpen={isOpen}
        onClose={closeModal}
        project={
          selectedProject
            ? {
                title: selectedProject.title,
                description: selectedProject.description,
                dates: selectedProject.dates,
                tags: selectedProject.technologies,
                image: selectedProject.image,
                video: selectedProject.video,
                href: selectedProject.href,
                links: selectedProject.links,
              }
            : null
        }
      />
    </>
  );
}
