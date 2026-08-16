import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex h-9 w-9 items-center justify-center border border-border bg-surface text-foreground transition-all duration-200 hover:border-foreground hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform duration-300 hover:rotate-45" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-300 hover:-rotate-12" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
