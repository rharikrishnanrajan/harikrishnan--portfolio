import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { personal } from '../data/seed';
import { scrollToId } from '../lib/scroll';
import { NAV_LINKS } from './Navbar';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-surface transition-colors duration-200">
      <div className="container-portfolio py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center border border-border-strong bg-surface-subtle font-mono text-[11px] font-bold text-foreground">
                HK
              </span>
              <p className="font-sans text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {personal.name}
              </p>
            </div>

            <p className="mt-3 font-mono text-xs uppercase tracking-tag text-foreground-muted">
              DEVOPS ENGINEER · CLOUD · AUTOMATION
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground-secondary">
              Building reliable systems, automating software delivery pipelines, and maintaining high-availability cloud infrastructure on AWS.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer navigation">
            <p className="eyebrow text-foreground-muted">Index</p>
            <ul className="mt-4 space-y-1.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(link.id)}
                    className="min-h-8 py-1 font-mono text-xs uppercase tracking-tag text-foreground-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow text-foreground-muted">Direct</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground-secondary">
              <li>
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4 text-foreground" aria-hidden="true" />
                  <span>{personal.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Github className="h-4 w-4 text-foreground" aria-hidden="true" />
                  <span>github.com/rharikrishnanrajan</span>
                </a>
              </li>
              <li>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4 text-foreground" aria-hidden="true" />
                  <span>linkedin.com/in/rharikrishnanrajan</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                  className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Phone className="h-4 w-4 text-foreground" aria-hidden="true" />
                  <span>{personal.phone}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-xs text-foreground-muted">
            © 2026 {personal.name}. All rights reserved. Monochromatic Editorial Edition.
          </p>

          <div className="flex items-center gap-2 font-mono text-[11px] text-foreground-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            <span>SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
