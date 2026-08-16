import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from '../lib/gsap';
import { scrollToId } from '../lib/scroll';
import InfrastructureVisual from './InfrastructureVisual';

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      timeline
        .fromTo(
          '.hero-status-label',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
        )
        .fromTo(
          '.hero-title-line',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.12 },
          '-=0.2'
        )
        .fromTo(
          '.hero-description',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          '.hero-cta-group',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          '-=0.4'
        )
        .fromTo(
          '.hero-metrics-bar',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          '.hero-visual-container',
          { opacity: 0, scale: 0.98, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power2.out' },
          '-=0.7'
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden border-b border-border bg-background pt-24 md:pt-28 lg:pt-32"
    >
      {/* Background Engineering Grid with subtle radial mask */}
      <div className="pointer-events-none absolute inset-0 hero-grid" aria-hidden="true" />

      {/* Main 12-Column Responsive Desktop Grid */}
      <div className="container-portfolio relative z-10 flex flex-1 flex-col justify-center py-10 md:py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          
          {/* Left-aligned Content Block (~58% hero width on desktop: 7 cols of 12) */}
          <div className="lg:col-span-7 xl:col-span-7">
            
            {/* Understated Availability / Status Label */}
            <div className="hero-status-label inline-flex items-center gap-3 border border-border bg-surface px-3 py-1.5 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-foreground-secondary md:text-[11px]">
                DEVOPS ENGINEER&nbsp;&nbsp;·&nbsp;&nbsp;CLOUD&nbsp;&nbsp;·&nbsp;&nbsp;AUTOMATION
              </span>
            </div>

            {/* Oversized Dominant Editorial Headline with tight line-height */}
            <h1 className="mt-8 font-sans text-[clamp(2.5rem,6.5vw,5.4rem)] font-extrabold leading-[0.96] tracking-tighter text-foreground">
              <span className="block overflow-hidden pb-1">
                <span className="hero-title-line block">
                  Building <span className="font-normal italic text-foreground-secondary">Reliable</span> Systems,
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="hero-title-line block text-foreground">
                  One Deployment at a Time.
                </span>
              </span>
            </h1>

            {/* Concise Supporting Paragraph (Narrow editorial composition) */}
            <p className="hero-description mt-7 max-w-xl text-base leading-[1.65] text-foreground-secondary md:text-lg">
              Specializing in cloud infrastructure, containerized architectures, CI/CD automation pipelines,
              and deterministic software delivery with AWS, Docker, Jenkins, and modern systems engineering.
            </p>

            {/* Rectangular CTA Actions */}
            <div className="hero-cta-group mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToId('projects')}
                className="btn-primary group"
              >
                <span>View My Work</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
              
              <button
                type="button"
                onClick={() => scrollToId('contact')}
                className="btn-secondary"
              >
                <span>Let&apos;s Connect</span>
              </button>
            </div>

            {/* Understated Tech Spec Metadata Row */}
            <div className="hero-metrics-bar mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-tag text-foreground-muted">
              <div>
                <span className="text-foreground-muted/60">01 /</span> INFRASTRUCTURE: <span className="text-foreground font-medium">AWS &amp; ECS</span>
              </div>
              <div>
                <span className="text-foreground-muted/60">02 /</span> PIPELINE: <span className="text-foreground font-medium">JENKINS AS CODE</span>
              </div>
              <div>
                <span className="text-foreground-muted/60">03 /</span> RESILIENCE: <span className="text-foreground font-medium">MULTI-REGION</span>
              </div>
            </div>

          </div>

          {/* Right-side Abstract Infrastructure Topology Visual (5 cols of 12) */}
          <div className="hero-visual-container lg:col-span-5 xl:col-span-5">
            <InfrastructureVisual />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
