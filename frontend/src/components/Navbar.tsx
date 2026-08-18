import React, { useLayoutEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import { gsap } from '../lib/gsap';
import { scrollToId } from '../lib/scroll';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
] as const;

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const targets = nav.querySelectorAll('[data-nav]');
      gsap.fromTo(
        targets,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out', delay: 0.1 }
      );
    });

    return () => mm.revert();
  }, []);

  const handleNavClick = (id: string): void => {
    setMenuOpen(false);
    window.setTimeout(() => scrollToId(id), menuOpen ? 80 : 0);
  };

  return (
    <>
      <header
        ref={navRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-200"
      >
        <nav
          className="container-portfolio relative flex h-14 items-center justify-between md:h-16"
          aria-label="Primary"
        >
          {/* Logo / Monogram Mark */}
          <a
            data-nav
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              scrollToId('top', true);
            }}
            className="group flex min-h-11 items-center gap-3 font-mono text-xs font-semibold tracking-wider text-foreground z-10"
            aria-label="Harikrishnan R — back to top"
          >
            <span className="flex h-7 w-7 items-center justify-center border border-border-strong bg-surface font-mono text-[11px] font-bold transition-all group-hover:border-[#648dfa] group-hover:bg-gradient-to-br group-hover:from-[#6e98ff] group-hover:to-[#e8f0fe] group-hover:text-[#0b2b5c]">
              HK
            </span>
            <span className="font-sans text-sm font-bold tracking-tight text-foreground">
              Harikrishnan R
            </span>
          </a>

          {/* Desktop Navigation Links (Pill centered) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center z-0" data-nav>
            <ul className="flex items-center gap-1 border border-border bg-surface-subtle/40 px-5 py-1.5 rounded-full backdrop-blur-md">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className="px-3.5 py-1 font-mono text-[10.5px] uppercase tracking-tag text-foreground-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Right Controls (Theme Toggle + Connect Button) */}
          <div className="hidden md:flex items-center gap-3 z-10" data-nav>
            <ThemeToggle />
            
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="btn-primary !min-h-9 px-4 !py-1.5 text-[11px]"
            >
              Let&apos;s Connect
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex min-h-10 min-w-10 items-center justify-center border border-border bg-surface text-foreground"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavClick}
        toggleRef={toggleRef}
      />
    </>
  );
};

export default Navbar;
