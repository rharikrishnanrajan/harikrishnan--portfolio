import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { Project } from '../types/portfolio';

interface ProjectItemProps {
  project: Project;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const itemRef = useReveal<HTMLElement>({ start: 'top 82%', stagger: 0.1 });

  return (
    <article ref={itemRef} className="relative border-t border-border py-12 md:py-16 transition-colors duration-200">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        
        {/* Left Column: Metadata & Metric */}
        <div className="lg:col-span-4">
          <div data-reveal className="flex items-baseline gap-4">
            <span className="font-mono text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {project.number}
            </span>
            <span className="font-mono text-xs uppercase tracking-tag text-foreground-muted">
              {project.category}
            </span>
          </div>

          {/* Metric / Architecture Indicator Box */}
          {project.metric && (
            <div data-reveal className="mt-6 border border-border bg-surface p-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-muted">
                VERIFIED OUTCOME
              </span>
              <p className="mt-1 font-mono text-xs font-semibold text-foreground">
                {project.metric}
              </p>
            </div>
          )}

          {project.architectureType && (
            <div data-reveal className="mt-3 flex items-center gap-2 font-mono text-[11px] text-foreground-secondary">
              <span className="inline-block h-1.5 w-1.5 bg-foreground-muted" aria-hidden="true" />
              <span>{project.architectureType}</span>
            </div>
          )}
        </div>

        {/* Right Column: Architectural Title, Summary, Execution Highlights, & Stack */}
        <div className="lg:col-span-8">
          <div className="flex items-start justify-between gap-4">
            <h3 data-reveal className="font-sans text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl">
              {project.title}
            </h3>

            {/* Top Right Corner Buttons */}
            <div data-reveal className="shrink-0 flex items-center gap-2">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border-strong bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground hover:border-[#507bf8] hover:bg-surface-elevated hover:text-[#507bf8] transition-all shadow-sm"
                  aria-label={`GitHub repository for ${project.title}`}
                  title="View on GitHub"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}

              {project.docUrl && (
                <a
                  href={project.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border-strong bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground hover:border-[#507bf8] hover:bg-surface-elevated hover:text-[#507bf8] transition-all shadow-sm"
                  aria-label={`Open link for ${project.title}`}
                  title="Open Project Link"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <p data-reveal className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-secondary md:text-lg">
            {project.description}
          </p>

          {/* Key Engineering Highlights */}
          <div data-reveal className="mt-6 border-l border-border-strong pl-5">
            <h4 className="font-mono text-[11px] uppercase tracking-tag text-foreground-muted">
              Engineering Implementation
            </h4>
            <ul className="mt-3 space-y-2.5">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm leading-relaxed text-foreground-secondary">
                  <span className="mt-1 font-mono text-xs text-foreground shrink-0" aria-hidden="true">
                    —
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Collaborator / Date details if present */}
          {(project.collaborator || project.date) && (
            <p data-reveal className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-tag text-foreground-muted">
              {project.collaborator && <span>Collaborator: {project.collaborator}</span>}
              {project.date && <span>Completed: {project.date}</span>}
            </p>
          )}

          {/* Technology Chips */}
          <div data-reveal className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
};

export default ProjectItem;
