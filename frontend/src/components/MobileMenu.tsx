import React, { RefObject, useEffect, useRef } from 'react';
import { Github, Linkedin, X } from 'lucide-react';
import { getLenis } from '../hooks/useLenis';
import { personal } from '../data/seed';
import { NAV_LINKS } from './Navbar';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  toggleRef: RefObject<HTMLButtonElement>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, onNavigate, toggleRef }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      lenis?.start();
      document.body.style.overflow = '';
      toggleRef.current?.focus();
    };
  }, [open, onClose, toggleRef]);

  const handleLinkClick = (id: string): void => {
    onClose();
    onNavigate(id);
  };

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      className={`fixed inset-0 z-[60] flex flex-col bg-background transition-opacity duration-300 md:hidden ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
    >
      {/* Mobile Top Bar */}
      <div className="container-portfolio flex h-16 items-center justify-between border-b border-border">
        <span className="flex items-center gap-2.5 font-mono text-xs font-semibold text-foreground">
          <span className="flex h-6 w-6 items-center justify-center border border-border-strong bg-surface font-mono text-[10px] font-bold">
            HK
          </span>
          Harikrishnan R
        </span>
        <button
          ref={closeRef}
          type="button"
          className="inline-flex min-h-10 min-w-10 items-center justify-center border border-border bg-surface text-foreground"
          aria-label="Close menu"
          onClick={onClose}
          tabIndex={open ? 0 : -1}
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Nav List */}
      <nav
        className="container-portfolio flex flex-1 flex-col justify-center py-8"
        aria-label="Mobile Navigation"
      >
        <ul className="space-y-3">
          {NAV_LINKS.map((link, index) => (
            <li key={link.id} className="flex items-baseline gap-4 border-b border-border/40 pb-2">
              <span className="font-mono text-xs text-foreground-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => handleLinkClick(link.id)}
                tabIndex={open ? 0 : -1}
                className="py-1 font-sans text-3xl font-extrabold tracking-tighter text-foreground transition-colors hover:text-foreground-secondary"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Footer Contact Info */}
        <div className="mt-8 border-t border-border pt-6">
          <p className="eyebrow text-foreground-muted">Direct Inquiry</p>
          <a
            href={`mailto:${personal.email}`}
            tabIndex={open ? 0 : -1}
            className="mt-2 block font-sans text-base font-semibold text-foreground underline decoration-border-strong underline-offset-4"
          >
            {personal.email}
          </a>
          <div className="mt-4 flex items-center gap-5">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="inline-flex min-h-10 items-center gap-2 font-mono text-xs uppercase tracking-tag text-foreground-secondary hover:text-foreground"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="inline-flex min-h-10 items-center gap-2 font-mono text-xs uppercase tracking-tag text-foreground-secondary hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
