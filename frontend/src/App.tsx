import { useEffect, useState } from 'react';
import About from './components/About';
import ArchivePage from './components/ArchivePage';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Education from './components/Education';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';
import { ThemeProvider } from './context/ThemeContext';
import {
  seedCertifications,
  seedEducation,
  seedProjects,
  seedSkills,
} from './data/seed';
import { useLenis } from './hooks/useLenis';
import { useReducedMotion } from './hooks/useReducedMotion';
import { scrollToId } from './lib/scroll';
import {
  fetchCertifications,
  fetchProjects,
  fetchSkills,
} from './services/api';
import { PortfolioData } from './types/portfolio';

const INITIAL_DATA: PortfolioData = {
  projects: seedProjects,
  skills: seedSkills,
  certifications: seedCertifications,
  education: seedEducation,
};

type ViewMode = 'home' | 'archive';

function PortfolioApp(): JSX.Element {
  const reducedMotion = useReducedMotion();
  useLenis(!reducedMotion);

  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [archiveTab, setArchiveTab] = useState<'projects' | 'certifications'>('projects');

  // Handle URL hash changes for deep linking & back button support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#projects-archive' || hash === '#all-projects') {
        setCurrentView('archive');
        setArchiveTab('projects');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#certifications-archive' || hash === '#all-certifications') {
        setCurrentView('archive');
        setArchiveTab('certifications');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#archive') {
        setCurrentView('archive');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    let cancelled = false;

    void Promise.all([
      fetchProjects(),
      fetchSkills(),
      fetchCertifications(),
    ]).then(([projects, skills, certifications]) => {
      if (cancelled) return;
      setData((current) => ({
        ...current,
        projects,
        skills,
        certifications,
      }));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const openArchive = (tab: 'projects' | 'certifications') => {
    setArchiveTab(tab);
    setCurrentView('archive');
    window.location.hash = tab === 'projects' ? '#projects-archive' : '#certifications-archive';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToHome = (targetSection?: string) => {
    setCurrentView('home');
    window.history.pushState(null, '', window.location.pathname);
    if (targetSection) {
      window.setTimeout(() => scrollToId(targetSection), 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (currentView === 'archive') {
    return (
      <ArchivePage
        initialTab={archiveTab}
        projects={data.projects}
        certifications={data.certifications}
        onBackToHome={backToHome}
      />
    );
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-border-strong focus:bg-surface focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:text-foreground shadow-lg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} onViewMore={() => openArchive('projects')} />
        <Education />
        <Certifications certifications={data.certifications} onViewMore={() => openArchive('certifications')} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export function App(): JSX.Element {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}

export default App;
