import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { seedEducation } from '../data/seed';
import { SectionHeading } from './SectionHeading';

export const Education: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>({ start: 'top 82%' });

  return (
    <section ref={sectionRef} id="education" className="border-b border-border bg-background transition-colors duration-200">
      <div className="container-portfolio py-20 md:py-28 lg:py-32">
        <div data-reveal>
          <SectionHeading index="04" label="academics" title="Education" />
        </div>

        <div className="mt-12">
          {seedEducation.map((entry, index) => (
            <article
              key={entry.id}
              data-reveal
              className="grid gap-4 border-t border-border py-8 md:grid-cols-12 md:gap-8 transition-colors hover:bg-surface/50"
            >
              <div className="md:col-span-2">
                <span className="font-mono text-xs uppercase tracking-tag text-foreground-muted">
                  {String(index + 1).padStart(2, '0')} // DEGREE
                </span>
              </div>
              <div className="md:col-span-7">
                <h3 className="font-sans text-xl font-bold tracking-tight text-foreground md:text-2xl">
                  {entry.degree}
                </h3>
                <p className="mt-1.5 text-base text-foreground-secondary">{entry.institution}</p>
                {entry.status && (
                  <p className="mt-2 font-mono text-xs uppercase tracking-tag text-foreground-muted">
                    {entry.status}
                  </p>
                )}
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="inline-flex items-center gap-2 font-mono text-sm text-foreground">
                  CGPA <span className="border border-border bg-surface px-2.5 py-1 font-semibold">{entry.cgpa}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
