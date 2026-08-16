import { getLenis } from '../hooks/useLenis';

const NAV_OFFSET = -72;

export function scrollToId(id: string, immediate = false): void {
  const target = document.getElementById(id);
  if (!target) return;

  const lenis = getLenis();
  if (lenis && !immediate) {
    lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.2 });
    return;
  }

  target.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' });
}

export function isPlaceholderUrl(url: string): boolean {
  return url.startsWith('[ADD');
}
