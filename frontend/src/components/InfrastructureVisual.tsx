import React from 'react';

export const InfrastructureVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg lg:max-w-none select-none">
      {/* Outer editorial frame with delicate 1px border */}
      <div className="relative border border-border bg-surface p-5 md:p-7 transition-colors duration-200">
        
        {/* Top telemetry bar */}
        <div className="flex items-center justify-between border-b border-border pb-3 text-[10px] font-mono uppercase tracking-tag text-foreground-muted">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>SYS_TOPOLOGY // V2.4.0</span>
          </div>
          <div className="flex items-center gap-3">
            <span>REGION: US-EAST-1 / AP-SOUTH-1</span>
            <span className="hidden sm:inline text-foreground-muted/40">|</span>
            <span className="hidden sm:inline">LATENCY: 21ms</span>
          </div>
        </div>

        {/* Abstract Architectural SVG Mesh */}
        <div className="relative my-6 aspect-[4/3] w-full overflow-hidden border border-border/60 bg-surface-subtle/50">
          {/* Subtle architectural background grid */}
          <svg
            className="absolute inset-0 h-full w-full stroke-foreground/[0.04] dark:stroke-foreground/[0.06]"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <pattern id="infra-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#infra-grid)" />
          </svg>

          {/* Interactive Topology Graph SVG */}
          <svg
            viewBox="0 0 440 320"
            className="absolute inset-0 h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Infrastructure automation topology graph"
            role="img"
          >
            {/* Connecting Pathways */}
            <g className="stroke-foreground/20 dark:stroke-foreground/25" strokeWidth="1.25" strokeDasharray="3 3">
              {/* Path 1: Source to CI/CD */}
              <path d="M 60 70 L 160 70" />
              {/* Path 2: CI/CD to Security Scanner */}
              <path d="M 160 70 L 160 140" />
              {/* Path 3: Scanner to ECR Registry */}
              <path d="M 160 140 L 260 140" />
              {/* Path 4: ECR to US-East-1 Cluster */}
              <path d="M 260 140 L 370 85" />
              {/* Path 5: ECR to AP-South-1 Cluster */}
              <path d="M 260 140 L 370 200" />
              {/* Path 6: Route 53 Edge Router between clusters */}
              <path d="M 370 85 L 370 200" strokeDasharray="2 2" />
            </g>

            {/* Animated Data Packets along paths (CSS animated stroke or pulses) */}
            <circle cx="110" cy="70" r="3" className="fill-[#507bf8] animate-ping opacity-75" />
            <circle cx="110" cy="70" r="2.5" className="fill-[#507bf8]" />
            <circle cx="210" cy="140" r="3" className="fill-[#507bf8] animate-pulse" />
            <circle cx="315" cy="112" r="2.5" className="fill-[#507bf8]" />

            {/* Node 1: Code Repository (Git) */}
            <g transform="translate(30, 45)">
              <rect width="60" height="50" className="fill-surface stroke-border-strong" strokeWidth="1" />
              <text x="30" y="24" textAnchor="middle" className="fill-foreground font-mono text-[9px] font-semibold tracking-wider">GIT:MAIN</text>
              <text x="30" y="38" textAnchor="middle" className="fill-foreground-muted font-mono text-[7.5px]">v2.4.19</text>
            </g>

            {/* Node 2: CI/CD Pipeline (Jenkins) */}
            <g transform="translate(130, 45)">
              <rect width="60" height="50" className="fill-surface stroke-border-strong" strokeWidth="1" />
              <text x="30" y="24" textAnchor="middle" className="fill-foreground font-mono text-[9px] font-semibold tracking-wider">JENKINS</text>
              <text x="30" y="38" textAnchor="middle" className="fill-foreground-muted font-mono text-[7.5px]">PIPELINE</text>
            </g>

            {/* Node 3: Trivy Security Scan */}
            <g transform="translate(130, 115)">
              <rect width="60" height="50" className="fill-surface stroke-border-strong" strokeWidth="1" />
              <text x="30" y="24" textAnchor="middle" className="fill-foreground font-mono text-[9px] font-semibold tracking-wider">TRIVY</text>
              <text x="30" y="38" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-mono text-[7.5px]">0 CVEs</text>
            </g>

            {/* Node 4: Amazon ECR Container Registry */}
            <g transform="translate(230, 115)">
              <rect width="60" height="50" className="fill-surface stroke-border-strong" strokeWidth="1" />
              <text x="30" y="24" textAnchor="middle" className="fill-foreground font-mono text-[9px] font-semibold tracking-wider">AWS:ECR</text>
              <text x="30" y="38" textAnchor="middle" className="fill-foreground-muted font-mono text-[7.5px]">IMMUTABLE</text>
            </g>

            {/* Node 5: Primary Cluster (ECS Fargate us-east-1) */}
            <g transform="translate(330, 60)">
              <rect width="80" height="52" className="fill-surface stroke-foreground/40" strokeWidth="1.25" />
              <text x="40" y="22" textAnchor="middle" className="fill-foreground font-mono text-[8.5px] font-bold tracking-wider">ECS:PRIMARY</text>
              <text x="40" y="34" textAnchor="middle" className="fill-foreground-muted font-mono text-[7px]">us-east-1</text>
              <text x="40" y="44" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-mono text-[7px]">● ACTIVE (3/3)</text>
            </g>

            {/* Node 6: Failover Cluster (ECS Fargate ap-south-1) */}
            <g transform="translate(330, 175)">
              <rect width="80" height="52" className="fill-surface stroke-border-strong" strokeWidth="1" />
              <text x="40" y="22" textAnchor="middle" className="fill-foreground font-mono text-[8.5px] font-bold tracking-wider">ECS:STANDBY</text>
              <text x="40" y="34" textAnchor="middle" className="fill-foreground-muted font-mono text-[7px]">ap-south-1</text>
              <text x="40" y="44" textAnchor="middle" className="fill-foreground-muted font-mono text-[7px]">○ SYNCED</text>
            </g>

            {/* Route 53 Gateway Indicator */}
            <g transform="translate(30, 230)">
              <rect width="180" height="42" className="fill-surface/90 stroke-border" strokeWidth="1" />
              <text x="14" y="20" className="fill-foreground font-mono text-[8.5px] font-semibold tracking-wider">ROUTE 53 HEALTH DNS</text>
              <text x="14" y="32" className="fill-foreground-muted font-mono text-[7.5px]">Failover Threshold: &lt; 2.4s · 100% Availability</text>
            </g>

            {/* Geometric Coordinate Crosshairs */}
            <g className="stroke-foreground/20" strokeWidth="1">
              <path d="M 15 15 L 25 15 M 20 10 L 20 20" />
              <path d="M 415 15 L 425 15 M 420 10 L 420 20" />
              <path d="M 15 295 L 25 295 M 20 290 L 20 300" />
              <path d="M 415 295 L 425 295 M 420 290 L 420 300" />
            </g>
          </svg>
        </div>

        {/* Floating Metadata Element (Part of the sophisticated design system) */}
        <div className="border border-border bg-surface-subtle p-4 transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-muted">
              CURRENTLY BUILDING
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              PROD
            </span>
          </div>
          <p className="mt-1.5 font-sans text-sm font-bold tracking-tight text-foreground">
            Cloud Infrastructure
          </p>
          <p className="mt-1 font-mono text-xs text-foreground-secondary">
            CI/CD&nbsp;&nbsp;·&nbsp;&nbsp;Docker&nbsp;&nbsp;·&nbsp;&nbsp;Kubernetes
          </p>
        </div>

        {/* Bottom terminal micro-element */}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 font-mono text-[10px] text-foreground-muted">
          <span className="truncate">$ terraform apply -auto-approve [done: 0 err]</span>
          <span className="shrink-0 pl-2 text-foreground-muted/60">0.42s</span>
        </div>

      </div>
    </div>
  );
};

export default InfrastructureVisual;
