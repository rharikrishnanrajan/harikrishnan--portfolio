import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { focusAreas, personal } from '../data/seed';
import { SectionHeading } from './SectionHeading';

export const About: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>({ start: 'top 82%' });

  return (
    <section ref={sectionRef} id="about" className="border-b border-border bg-background transition-colors duration-200">
      <div className="container-portfolio py-20 md:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Heading & Quick Credentials */}
          <div className="lg:col-span-5">
            <div data-reveal className="lg:sticky lg:top-28">
              <SectionHeading index="01" label="about" title="Professional Summary" />
              <p className="mt-2 font-mono text-xs uppercase tracking-tag text-foreground-muted">
                Cloud Architecture · CI/CD Automation · Containerization
              </p>

              {/* Quick Metadata Box */}
              <div className="mt-8 border border-border bg-surface p-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-muted">
                  OVERVIEW AT A GLANCE
                </span>
                <dl className="mt-4 space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <dt className="text-foreground-muted">Role</dt>
                    <dd className="font-semibold text-foreground">DevOps Engineer</dd>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <dt className="text-foreground-muted">Education</dt>
                    <dd className="font-semibold text-foreground">MCA (Pursuing) • BCA</dd>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <dt className="text-foreground-muted">Specialization</dt>
                    <dd className="font-semibold text-foreground">L&amp;T EduTech Certified</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-foreground-muted">Location</dt>
                    <dd className="font-semibold text-foreground">{personal.location}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Core Competencies */}
          <div className="lg:col-span-7">
            <div data-reveal className="border-l-2 border-foreground pl-6 md:pl-8">
              <p className="text-base leading-relaxed text-foreground md:text-lg font-normal">
                {personal.description}
              </p>
            </div>

            {/* Core Competencies & Areas of Practice */}
            <div data-reveal className="mt-12 border-t border-border pt-10 md:mt-14">
              <div className="flex items-baseline justify-between">
                <h3 className="font-mono text-xs uppercase tracking-tag text-foreground">
                  Core Competencies &amp; Technical Focus
                </h3>
                <span className="font-mono text-[11px] text-foreground-muted">
                  06 DOMAINS
                </span>
              </div>
              
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {focusAreas.map((area, index) => (
                  <div
                    key={area}
                    className="group flex items-start gap-3.5 border border-border bg-surface p-4 transition-all duration-150 hover:border-foreground/40 hover:bg-surface-elevated"
                  >
                    <span className="font-mono text-xs font-semibold text-foreground-muted group-hover:text-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-sm font-medium tracking-tight text-foreground leading-snug">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Highlights Metric Row */}
            <div data-reveal className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="border border-border bg-surface p-4">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-foreground-muted">
                  DEPLOYMENT
                </span>
                <p className="mt-1 font-mono text-xs font-semibold text-foreground">
                  Multi-Region AWS
                </p>
              </div>
              <div className="border border-border bg-surface p-4">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-foreground-muted">
                  PIPELINE AUTOMATION
                </span>
                <p className="mt-1 font-mono text-xs font-semibold text-foreground">
                  Jenkins Pipeline-as-Code
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1 border border-border bg-surface p-4">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-foreground-muted">
                  QUALITY &amp; CVE
                </span>
                <p className="mt-1 font-mono text-xs font-semibold text-foreground">
                  Trivy &amp; SonarQube
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
