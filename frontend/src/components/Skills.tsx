import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { SkillCategory } from '../types/portfolio';
import { SectionHeading } from './SectionHeading';

interface SkillsProps {
  skills: SkillCategory[];
}

// Categories to explicitly exclude as requested by user
const EXCLUDED_CATEGORIES = ['Frontend', 'Backend', 'Database & Cloud', 'Programming'];

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const sectionRef = useReveal<HTMLElement>({ start: 'top 82%' });

  // Filter out any unwanted categories
  const filteredSkills = skills.filter(
    (group) => !EXCLUDED_CATEGORIES.some((excluded) => group.category.toLowerCase().includes(excluded.toLowerCase()))
  );

  return (
    <section ref={sectionRef} id="skills" className="border-b border-border bg-background transition-colors duration-200">
      <div className="container-portfolio py-20 md:py-28 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal>
            <SectionHeading index="02" label="capabilities" title="DevOps &amp; Infrastructure Stack" />
          </div>
          <p data-reveal className="font-mono text-xs uppercase tracking-tag text-foreground-muted">
            {filteredSkills.length} SPECIALIZED DOMAINS&nbsp;&nbsp;·&nbsp;&nbsp;PRACTICAL PRODUCTION TOOLING
          </p>
        </div>

        {/* Hairline Editorial Grid */}
        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((group, index) => (
            <article
              key={group.id || group.category}
              data-reveal
              className="group flex flex-col justify-between bg-surface p-6 transition-all duration-300 hover:bg-surface-subtle md:p-8"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3">
                  <span className="font-mono text-xs font-semibold text-foreground-muted">
                    {String(index + 1).padStart(2, '0')} // DOMAIN
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-muted/70">
                    {group.skills.length} TOOLS
                  </span>
                </div>

                <h3 className="mt-5 font-sans text-lg font-bold tracking-tight text-foreground md:text-xl">
                  {group.category}
                </h3>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <span className="chip group-hover:border-foreground/20">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-border/40 font-mono text-[10px] uppercase tracking-widest text-foreground-muted/60">
                STATUS: PRODUCTION READY
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
