import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export interface RevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  ease?: string;
}

const DEFAULTS: Required<RevealOptions> = {
  y: 30,
  duration: 0.8,
  stagger: 0.1,
  start: 'top 80%',
  ease: 'power3.out',
};

/**
 * Animates every `[data-reveal]` descendant of the returned ref when it
 * scrolls into view. Animations are skipped entirely under
 * `prefers-reduced-motion: reduce`, leaving content fully visible.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions = {}
): React.RefObject<T> {
  const ref = useRef<T>(null);
  const settings = { ...DEFAULTS, ...options };

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const targets = element.querySelectorAll('[data-reveal]');
      if (targets.length === 0) return;

      const tl = gsap.timeline({
        defaults: { ease: settings.ease },
        scrollTrigger: {
          trigger: element,
          start: settings.start,
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        targets,
        { opacity: 0, y: settings.y },
        { opacity: 1, y: 0, duration: settings.duration, stagger: settings.stagger }
      );
    });

    return () => mm.revert();
  }, [settings.duration, settings.ease, settings.stagger, settings.start, settings.y]);

  return ref;
}
