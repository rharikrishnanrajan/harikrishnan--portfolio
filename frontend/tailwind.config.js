/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-subtle': 'var(--color-surface-subtle)',
        'surface-elevated': 'var(--color-surface-elevated)',
        foreground: 'var(--color-text)',
        'foreground-secondary': 'var(--color-text-secondary)',
        'foreground-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          blue: '#5b87f9',
          glow: 'rgba(100, 149, 250, 0.15)',
        },
        status: {
          emerald: '#10B981',
          slate: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        container: '1440px',
      },
      letterSpacing: {
        tighter: '-0.045em',
        tight: '-0.025em',
        tag: '0.22em',
        widest: '0.28em',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
};
