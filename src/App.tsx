import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { useLenis } from './hooks/useLenis';
import { Preloader } from './components/Preloader';
import { Grain } from './components/Grain';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { BuildsCarousel } from './components/BuildsCarousel';
import { WorksDrum } from './components/WorksDrum';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { ProjectItem } from './content/content';

// Lazy-load modal overlay to avoid bundling all inspector tools into initial bundle
const ProjectOverlay = lazy(() =>
  import('./components/ProjectOverlay').then((m) => ({ default: m.ProjectOverlay }))
);

export const App: React.FC = () => {
  useLenis();

  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isAppReady, setIsAppReady] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsAppReady(true);
  }, []);

  // Efficient IntersectionObserver for active section pill nav (zero scroll event thrashing)
  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'builds', 'works', 'services', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-paper text-ink font-sans">
      {/* Accessible Skip to Main Content Link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Film grain overlay across entire viewport */}
      <Grain />

      {/* Custom desktop cursor with difference blending & labels */}
      <Cursor />

      {/* Fullscreen Initializing Preloader with Shadow Emergence */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Floating navigation bar with automatic difference inversion */}
      <Nav activeSection={activeSection} />

      {/* Main Chapter Feed */}
      <main id="main-content">
        {/* Section 1: Hero (Light, Cut-out portrait overlapping 2-line headline) */}
        <Hero isReady={isAppReady} />

        {/* Section 2: About (Dark, 2D Simplex flow field, light beam glass card, split glitch headline) */}
        <About />

        {/* Section 3: Experience (Dark, Stacking Phase Cards — Sticky Title + Cards piling up on scroll) */}
        <Experience />

        {/* Section 4: Hardware Builds (Light, 3D curved perspective carousel with drag & arrow controls) */}
        <BuildsCarousel onOpenProject={(proj) => setSelectedProject(proj)} />

        {/* Section 5: Works Drum (Light, Hexagonal rotating drum with WORKS '26 center, wheel/drag inertia) */}
        <WorksDrum onOpenProject={(proj) => setSelectedProject(proj)} />

        {/* Section 6: What I Build (Light, Scramble text heading, cursor preview follower, floating seam bar) */}
        <Services />

        {/* Section 7: Contact (Dark, LET'S TALK letter lift, magnetic pill links, live IST clock) */}
        <Contact />
      </main>

      {/* Full-screen slide-up project inspection overlay */}
      <Suspense fallback={null}>
        {selectedProject && (
          <ProjectOverlay
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </Suspense>
    </div>
  );
};

export default App;
