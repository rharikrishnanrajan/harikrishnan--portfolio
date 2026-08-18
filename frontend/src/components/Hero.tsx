import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { gsap } from '../lib/gsap';
import { scrollToId } from '../lib/scroll';
import { personal } from '../data/seed';

const LEFT_PILLS = [
  { label: 'AWS & ECS Fargate', offset: 'ml-0' },
  { label: 'CI/CD Pipelines', offset: 'ml-[-1.5rem]' },
  { label: 'Docker & Swarm', offset: 'ml-4' },
];

const RIGHT_PILLS = [
  { label: 'Jenkins As Code', offset: 'mr-0' },
  { label: 'DevSecOps & Trivy', offset: 'mr-[-1.5rem]' },
  { label: 'Linux & Shell', offset: 'mr-4' },
];

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Set initial states
      gsap.set(card, { opacity: 0, scale: 0.96 });
      gsap.set('.hero-watermark', { opacity: 0 });
      gsap.set('.hero-portrait', { opacity: 0, y: 40, filter: 'blur(8px)' });
      gsap.set('.hero-headline', { opacity: 0, y: 24 });
      gsap.set('.hero-subtitle', { opacity: 0, y: 16 });
      gsap.set('.hero-pill', { opacity: 0, scale: 0.85 });
      gsap.set('.hero-cta-group', { opacity: 0, y: 16 });
      gsap.set('.hero-meta-bar', { opacity: 0, y: 12 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl
        // 1. Card scales in
        .to(card, { opacity: 1, scale: 1, duration: 0.85, ease: 'expo.out' })
        // 2. Watermark background text fades in
        .to('.hero-watermark', { opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=0.6')
        // 3. Portrait slides up and deblurs
        .to('.hero-portrait', {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
        }, '-=0.7')
        // 4. Headline
        .to('.hero-headline', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        // 5. Subtitle
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        // 6. Floating tech pills stagger in
        .to('.hero-pill', {
          opacity: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'back.out(1.7)',
        }, '-=0.4')
        // 7. CTAs
        .to('.hero-cta-group', { opacity: 1, y: 0, duration: 0.55 }, '-=0.3')
        // 8. Meta bar
        .to('.hero-meta-bar', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-8 pt-20 md:pt-24 lg:pt-28"
    >
      {/* Outer ambient glow blob (dark mode only) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 dark:opacity-100"
          style={{
            background:
              'radial-gradient(circle, rgba(77,119,248,0.08) 0%, rgba(77,119,248,0.03) 50%, transparent 80%)',
          }}
        />
      </div>

      {/* Hero Card Container */}
      <div
        ref={cardRef}
        className="relative w-full max-w-7xl overflow-hidden rounded-[2.5rem] border-2 border-border-strong bg-surface-subtle/50 shadow-2xl backdrop-blur-sm md:rounded-[3rem]"
        style={{
          boxShadow:
            '0 0 0 1px rgba(77,119,248,0.18), 0 32px 80px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.04)',
        }}
      >
        {/* Background Watermark Typography */}
        <div
          className="hero-watermark pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-black uppercase leading-none tracking-tighter text-foreground"
            style={{
              fontSize: 'clamp(3rem, 16vw, 22rem)',
              opacity: 0.04,
              letterSpacing: '-0.04em',
            }}
          >
            DEVOPS
          </span>
        </div>

        {/* Left Floating Pills Column */}
        <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex xl:left-10">
          {LEFT_PILLS.map((pill) => (
            <span
              key={pill.label}
              className={`hero-pill ${pill.offset} inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground-muted shadow-sm`}
            >
              {pill.label}
            </span>
          ))}
        </div>

        {/* Right Floating Pills Column */}
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex xl:right-10">
          {RIGHT_PILLS.map((pill) => (
            <span
              key={pill.label}
              className={`hero-pill ${pill.offset} inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground-muted shadow-sm`}
            >
              {pill.label}
            </span>
          ))}
        </div>

        {/* Central Hero Core */}
        <div className="relative z-10 flex flex-col items-center px-6 pt-10 pb-8 text-center md:px-24 md:pt-12 md:pb-10 lg:px-32 lg:pt-14 lg:pb-12">



          {/* Circular Profile Portrait */}
          <div className="hero-portrait relative mb-6 md:mb-8">
            {/* Outer glow ring */}
            <div
              className="absolute -inset-1 rounded-full opacity-60"
              style={{
                background: 'linear-gradient(135deg, #4d77f8, #abc5ff, transparent)',
                padding: '2px',
              }}
            />
            <div
              className="absolute -inset-3 rounded-full opacity-20 blur-xl dark:opacity-30"
              style={{ background: 'linear-gradient(135deg, #4d77f8, #729bfe)' }}
              aria-hidden="true"
            />
            <img
              src="./images/profile.jpg"
              alt={`${personal.name} — DevOps Engineer`}
              className="relative h-36 w-36 rounded-full border-4 border-surface object-cover object-top shadow-2xl md:h-48 md:w-48 lg:h-52 lg:w-52"
              loading="eager"
              draggable={false}
            />
          </div>

          {/* Headline */}
          <h1
            className="hero-headline font-sans font-extrabold leading-[0.92] tracking-tighter text-foreground"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
          >
            {personal.name}
          </h1>

          {/* Role label */}
          <p className="hero-subtitle mt-3 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-foreground-muted md:text-sm">
            {personal.title} &nbsp;·&nbsp; Cloud &nbsp;·&nbsp; Automation
          </p>

          {/* Tagline */}
          <p className="hero-subtitle mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground-secondary md:text-lg">
            {personal.tagline}
          </p>

          {/* CTA Button Group */}
          <div className="hero-cta-group mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {/* Primary CTA */}
            <button
              type="button"
              onClick={() => scrollToId('projects')}
              className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200"
              style={{
                background: 'var(--btn-gradient)',
                color: 'var(--btn-gradient-text)',
                boxShadow: 'var(--btn-shadow)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--btn-gradient-hover)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = 'var(--btn-shadow-hover)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--btn-gradient)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = 'var(--btn-shadow)';
              }}
            >
              <span>View My Work</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            {/* Secondary CTA */}
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="group inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-surface px-7 py-3 font-mono text-xs font-bold uppercase tracking-wider text-foreground-secondary transition-all duration-200 hover:border-[#4d77f8] hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Let&apos;s Connect</span>
            </button>
          </div>

          {/* Meta bar */}
          <div className="hero-meta-bar mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-border pt-6 font-mono text-[10.5px] uppercase tracking-widest text-foreground-muted">
            <div>INFRA:&nbsp;<span className="text-foreground">AWS &amp; ECS</span></div>
            <div>PIPELINE:&nbsp;<span className="text-foreground">JENKINS AS CODE</span></div>
            <div>SECURITY:&nbsp;<span className="text-foreground">DEVSECOPS</span></div>
            <div>RUNTIME:&nbsp;<span className="text-foreground">DOCKER &amp; SWARM</span></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
