import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { Project } from '../types/portfolio';
import { SectionHeading } from './SectionHeading';
import ProjectItem from './ProjectItem';

interface ProjectsProps {
  projects: Project[];
  onViewMore?: () => void;
}

const FEATURED_LIMIT = 3;

export const Projects: React.FC<ProjectsProps> = ({ projects, onViewMore }) => {
  const sectionRef = useReveal<HTMLElement>({ start: 'top 82%' });
  const displayedProjects = projects.slice(0, FEATURED_LIMIT);

  return (
    <section ref={sectionRef} id="projects" className="border-b border-border bg-background transition-colors duration-200">
      <div className="container-portfolio py-20 md:py-28 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal>
            <SectionHeading index="03" label="architecture" title="Selected Systems &amp; Deployments" />
          </div>
          <p data-reveal className="font-mono text-xs uppercase tracking-tag text-foreground-muted">
            {displayedProjects.length} OF {projects.length} FEATURED CASE STUDIES&nbsp;&nbsp;·&nbsp;&nbsp;REPRODUCIBLE INFRASTRUCTURE
          </p>
        </div>

        <div className="mt-10 md:mt-16">
          {displayedProjects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>

        {/* View More Projects Action */}
        <div data-reveal className="mt-14 flex justify-center border-t border-border pt-12">
          <button
            type="button"
            onClick={onViewMore}
            className="btn-primary group !px-8 !py-4"
          >
            <span>View All Projects &amp; Architecture Archive ({projects.length})</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
