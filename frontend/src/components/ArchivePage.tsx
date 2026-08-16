import React, { useState, useMemo } from 'react';
import { ArrowLeft, ExternalLink, Search, ShieldCheck } from 'lucide-react';
import { Certification, Project } from '../types/portfolio';
import ThemeToggle from './ThemeToggle';

interface ArchivePageProps {
  initialTab?: 'projects' | 'certifications';
  projects: Project[];
  certifications: Certification[];
  onBackToHome: (targetSection?: string) => void;
}

export const ArchivePage: React.FC<ArchivePageProps> = ({
  initialTab = 'projects',
  projects,
  certifications,
  onBackToHome,
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'certifications'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Available categories for filtering
  const projectCategories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => cats.add(p.category));
    return ['all', ...Array.from(cats)];
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [projects, searchQuery, selectedCategory]);

  // Filtered certifications
  const filteredCertifications = useMemo(() => {
    return certifications.filter((c) => {
      return (
        searchQuery === '' ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.date.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [certifications, searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container-portfolio flex h-16 items-center justify-between md:h-20">
          <button
            type="button"
            onClick={() => onBackToHome(activeTab === 'projects' ? 'projects' : 'certifications')}
            className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:text-foreground-secondary"
          >
            <span className="flex h-7 w-7 items-center justify-center border border-border bg-surface transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
              <ArrowLeft className="h-3.5 w-3.5" />
            </span>
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-xs uppercase tracking-tag text-foreground-muted sm:inline">
              ARCHIVE &amp; VERIFIED RECORDS
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container-portfolio py-12 md:py-20">
        {/* Page Heading & Breadcrumb */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 font-mono text-xs text-foreground-muted">
            <span>Portfolio Index</span>
            <span>/</span>
            <span className="text-foreground">Full Repository</span>
          </div>

          <h1 className="mt-4 font-sans text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Systems &amp; Credentials Archive
          </h1>

          <p className="mt-4 text-base leading-relaxed text-foreground-secondary md:text-lg">
            Comprehensive breakdown of production-ready cloud architectures, container orchestration deployments, CI/CD automation pipelines, and verified engineering certifications.
          </p>
        </div>

        {/* Navigation Tabs & Search Controls */}
        <div className="mt-10 flex flex-col gap-6 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Tab Switchers */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab('projects');
                setSelectedCategory('all');
              }}
              className={`px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-tag transition-all ${
                activeTab === 'projects'
                  ? 'btn-primary !min-h-0'
                  : 'border border-border bg-surface text-foreground-secondary hover:border-foreground/50 hover:text-foreground'
              }`}
            >
              All Projects ({projects.length})
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('certifications');
                setSelectedCategory('all');
              }}
              className={`px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-tag transition-all ${
                activeTab === 'certifications'
                  ? 'btn-primary !min-h-0'
                  : 'border border-border bg-surface text-foreground-secondary hover:border-foreground/50 hover:text-foreground'
              }`}
            >
              All Certifications ({certifications.length})
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === 'projects' ? 'Search by tech, tool, keyword...' : 'Search by certification or issuer...'}
              className="w-full border border-border bg-surface py-2 pl-9 pr-4 font-mono text-xs text-foreground placeholder-foreground-muted transition-colors focus:border-foreground focus:outline-none"
            />
          </div>
        </div>

        {/* Tab 1: Projects View */}
        {activeTab === 'projects' && (
          <div className="mt-10">
            {/* Category Filter Pills */}
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-tag text-foreground-muted mr-2">
                FILTER:
              </span>
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`border px-3 py-1 font-mono text-[11px] uppercase tracking-tag transition-all ${
                    selectedCategory === cat
                      ? 'border-foreground bg-surface-elevated font-semibold text-foreground'
                      : 'border-border bg-surface text-foreground-muted hover:border-foreground/40 hover:text-foreground'
                  }`}
                >
                  {cat === 'all' ? 'All Types' : cat}
                </button>
              ))}
            </div>

            {filteredProjects.length === 0 ? (
              <div className="border border-dashed border-border p-12 text-center">
                <p className="font-mono text-sm text-foreground-muted">No projects found matching &ldquo;{searchQuery}&rdquo;</p>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredProjects.map((project) => (
                  <article
                    key={project.id}
                    className="relative border border-border bg-surface p-6 transition-all duration-200 hover:border-foreground/40 md:p-10 shadow-sm"
                  >
                    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                      {/* Left: Project Metadata */}
                      <div className="lg:col-span-4 border-b border-border/60 pb-6 lg:border-b-0 lg:pb-0">
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                            {project.number}
                          </span>
                          <span className="font-mono text-xs uppercase tracking-tag text-foreground-muted">
                            {project.category}
                          </span>
                        </div>

                        {project.metric && (
                          <div className="mt-6 border border-border bg-surface-elevated p-4">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-muted">
                              VERIFIED OUTCOME
                            </span>
                            <p className="mt-1 font-mono text-xs font-semibold text-foreground">
                              {project.metric}
                            </p>
                          </div>
                        )}

                        {project.architectureType && (
                          <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-foreground-secondary">
                            <span className="inline-block h-1.5 w-1.5 bg-foreground" aria-hidden="true" />
                            <span>{project.architectureType}</span>
                          </div>
                        )}
                      </div>

                      {/* Right: Detailed Content */}
                      <div className="lg:col-span-8">
                        <div className="flex items-start justify-between gap-4">
                          <h2 className="font-sans text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl">
                            {project.title}
                          </h2>

                          {project.docUrl && (
                            <a
                              href={project.docUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 inline-flex items-center gap-2 border border-border-strong bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground hover:border-[#507bf8] hover:bg-surface-elevated hover:text-[#507bf8] transition-all shadow-sm"
                              aria-label={`Open documentation or PDF for ${project.title}`}
                              title="Open Project Documentation / PDF"
                            >
                              <span>Docs / PDF</span>
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                          )}
                        </div>

                        <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
                          {project.description}
                        </p>

                        {/* Engineering Implementation Steps */}
                        <div className="mt-6 border-l-2 border-border-strong pl-5">
                          <h3 className="font-mono text-[11px] uppercase tracking-tag text-foreground-muted">
                            Implementation Details &amp; Key Deliverables
                          </h3>
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

                        {(project.collaborator || project.date) && (
                          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-tag text-foreground-muted">
                            {project.collaborator && <span>Collaborator: {project.collaborator}</span>}
                            {project.date && <span>Completed: {project.date}</span>}
                          </p>
                        )}

                        {/* Technologies */}
                        <div className="mt-6 flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="chip">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Certifications View */}
        {activeTab === 'certifications' && (
          <div className="mt-10">
            {filteredCertifications.length === 0 ? (
              <div className="border border-dashed border-border p-12 text-center">
                <p className="font-mono text-sm text-foreground-muted">No certifications found matching &ldquo;{searchQuery}&rdquo;</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredCertifications.map((cert, index) => (
                  <div
                    key={cert.id}
                    className="flex flex-col justify-between border border-border bg-surface p-6 md:p-8 transition-all hover:border-foreground/40 hover:bg-surface-elevated shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-border/60 pb-3 font-mono text-xs text-foreground-muted">
                        <span>CREDENTIAL #{String(index + 1).padStart(2, '0')}</span>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-foreground">
                            <ShieldCheck className="h-4 w-4 text-[#507bf8]" />
                            <span className="text-[10px] uppercase tracking-widest font-semibold">VERIFIED</span>
                          </div>

                          {cert.pdfUrl && (
                            <a
                              href={cert.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 border border-border-strong bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground hover:border-[#507bf8] hover:bg-surface hover:text-[#507bf8] transition-all"
                              aria-label={`Open certificate PDF for ${cert.name}`}
                              title="View Certificate PDF / Verification"
                            >
                              <span>PDF</span>
                              <ExternalLink className="h-3 w-3" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>

                      <h2 className="mt-5 font-sans text-xl font-bold tracking-tight text-foreground">
                        {cert.name}
                      </h2>

                      <div className="mt-4 inline-block border border-border/80 bg-background px-3 py-1 font-mono text-xs uppercase tracking-tag text-foreground font-medium">
                        {cert.issuer}
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-border/40 flex items-center justify-between font-mono text-xs text-foreground-muted">
                      <span>TIMELINE</span>
                      <span className="font-semibold text-foreground">{cert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="mt-16 flex justify-center border-t border-border pt-12">
          <button
            type="button"
            onClick={() => onBackToHome(activeTab === 'projects' ? 'projects' : 'certifications')}
            className="btn-primary"
          >
            ← Return to Main Portfolio
          </button>
        </div>
      </main>
    </div>
  );
};

export default ArchivePage;
