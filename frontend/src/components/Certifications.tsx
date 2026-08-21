import React from 'react';
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { Certification } from '../types/portfolio';
import { SectionHeading } from './SectionHeading';

interface CertificationsProps {
  certifications: Certification[];
  onViewMore?: () => void;
}

const FEATURED_LIMIT = 3;

export const Certifications: React.FC<CertificationsProps> = ({ certifications, onViewMore }) => {
  const sectionRef = useReveal<HTMLElement>({ start: 'top 82%' });
  const displayedCertifications = certifications.slice(0, FEATURED_LIMIT);

  return (
    <section ref={sectionRef} id="certifications" className="border-b border-border bg-background transition-colors duration-200">
      <div className="container-portfolio py-20 md:py-28 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal>
            <SectionHeading index="05" label="credentials" title="Certifications &amp; Training" />
          </div>
          <div data-reveal className="flex items-center gap-2 font-mono text-xs text-foreground-muted">
            <ShieldCheck className="h-4 w-4 text-foreground" />
            <span className="uppercase tracking-tag">
              {displayedCertifications.length} OF {certifications.length} ACCREDITED CREDENTIALS
            </span>
          </div>
        </div>

        <ol className="mt-12">
          {displayedCertifications.map((certification, index) => (
            <li
              key={certification.id}
              data-reveal
              className="group grid gap-4 border-t border-border py-7 transition-colors hover:bg-surface md:grid-cols-12 md:gap-6 md:px-4 md:items-center"
            >
              <div className="md:col-span-2">
                <span className="font-mono text-xs font-semibold text-foreground-muted">
                  {String(index + 1).padStart(2, '0')} // CERT
                </span>
              </div>
              
              <div className="md:col-span-6">
                <h3 className="font-sans text-base font-bold leading-snug tracking-tight text-foreground md:text-lg">
                  {certification.name}
                </h3>
                <p className="mt-1.5 font-mono text-xs uppercase tracking-tag text-foreground-secondary">
                  {certification.issuer}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 md:col-span-4 md:justify-end">
                <p className="font-mono text-xs uppercase tracking-tag text-foreground-muted">
                  {certification.date}
                </p>

                {certification.pdfUrl && (
                  <a
                    href={certification.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-border-strong bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground hover:border-[#507bf8] hover:bg-surface-elevated hover:text-[#507bf8] transition-all shadow-sm shrink-0"
                    aria-label={`Open certificate link for ${certification.name}`}
                    title="View Certificate"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* View More Certifications Action */}
        <div data-reveal className="mt-14 flex justify-center border-t border-border pt-12">
          <button
            type="button"
            onClick={onViewMore}
            className="btn-primary group !px-8 !py-4"
          >
            <span>View All Credentials &amp; Certifications Archive ({certifications.length})</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
