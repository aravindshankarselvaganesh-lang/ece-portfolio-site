import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ProjectItem } from '../content/content';
import { ProjectArt } from './art/ProjectArt';
import { SplinePowerRig } from './SplinePowerRig';
import { X, Github, ExternalLink, Cpu, Radio, Network, Wrench, Zap } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ProjectOverlayProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectOverlay: React.FC<ProjectOverlayProps> = ({ project, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'schematic' | 'spline'>('schematic');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;

    // Prevent body scroll when open
    document.body.style.overflow = 'hidden';

    // Slide up with clip-path
    if (containerRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        containerRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power4.inOut' }
      );
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseAnim();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, prefersReducedMotion]);

  if (!project) return null;

  const handleCloseAnim = () => {
    if (prefersReducedMotion || !containerRef.current) {
      onClose();
      return;
    }
    gsap.to(containerRef.current, {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 0.6,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="overlay-title"
      ref={containerRef}
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 bg-[#0A0A0C] text-[#EDEDEA] overflow-y-auto overflow-x-hidden flex flex-col justify-between"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      {/* Top HUD */}
      <div className="sticky top-0 z-40 bg-[#0A0A0C]/90 backdrop-blur-md px-6 md:px-12 py-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/80">
            SCHEMATIC INSPECTION // REV {project.number}
          </span>
        </div>

        <button
          onClick={handleCloseAnim}
          aria-label="Close Project Overlay"
          data-cursor="CLOSE"
          className="group px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black flex items-center gap-2 transition-all font-mono text-xs uppercase tracking-widest"
        >
          <span>CLOSE [ESC]</span>
          <X size={16} className="transition-transform group-hover:rotate-90" />
        </button>
      </div>

      {/* Main Body */}
      <div
        ref={contentRef}
        className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-10 flex flex-col gap-10 my-auto"
      >
        {/* Cover Art Stage: 2D Schematic PCB vs Interactive 3D Spline Power Rig */}
        <div className="w-full aspect-[16/9] min-h-[340px] max-h-[480px] rounded-xl overflow-hidden border border-white/15 bg-[#121218] relative shadow-2xl">
          {viewMode === 'schematic' ? (
            <ProjectArt type={project.artType} />
          ) : (
            <div className="w-full h-full pt-8 bg-[#0D0D11]">
              <SplinePowerRig className="w-full h-full" />
            </div>
          )}

          {/* Top-Left Project Tag */}
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded bg-black/70 backdrop-blur-md font-mono text-xs text-signal border border-white/10">
            PROJECT {project.number} // {viewMode === 'schematic' ? 'CIRCUIT VERIFICATION' : '3D HARDWARE RIG'}
          </div>

          {/* Top-Right Stage Mode Toggle */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setViewMode('schematic')}
              className={`px-3 py-1 rounded-full transition-all ${
                viewMode === 'schematic'
                  ? 'bg-white text-black font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              2D SCHEMATIC
            </button>
            <button
              type="button"
              onClick={() => setViewMode('spline')}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                viewMode === 'spline'
                  ? 'bg-signal text-black font-bold shadow-[0_0_12px_rgba(57,255,136,0.4)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Zap size={11} />
              <span>3D POWER CELL</span>
            </button>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-sm bg-signal/10 border border-signal/30 text-signal font-mono text-[10px] uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2
            id="overlay-title"
            className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mt-2"
          >
            {project.title}
          </h2>

          <p className="font-mono text-sm sm:text-base text-white/70 uppercase tracking-wide">
            {project.subtitle}
          </p>
        </div>

        {/* Specs Table */}
        <div className="border border-white/15 rounded-lg overflow-hidden bg-white/[0.02]">
          <div className="px-6 py-3 bg-white/5 border-b border-white/10 font-signal uppercase">
            HARDWARE SPECIFICATION TABLE
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="p-5 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-white/50 font-space text-xs uppercase tracking-tight">
                <Cpu size={14} className="text-signal" />
                <span>MCU / FPGA</span>
              </div>
              <div className="font-sans text-xs text-white/90 font-medium">
                {project.specs.mcuOrChip}
              </div>
            </div>

            <div className="p-5 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-white/50 font-space text-xs uppercase tracking-tight">
                <Radio size={14} className="text-signal" />
                <span>SENSORS / RADIO</span>
              </div>
              <div className="font-sans text-xs text-white/90 font-medium">
                {project.specs.sensorsOrRadio}
              </div>
            </div>

            <div className="p-5 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-white/50 font-space text-xs uppercase tracking-tight">
                <Network size={14} className="text-signal" />
                <span>BUS / PROTOCOL</span>
              </div>
              <div className="font-sans text-xs text-white/90 font-medium">
                {project.specs.protocol}
              </div>
            </div>

            <div className="p-5 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-white/50 font-space text-xs uppercase tracking-tight">
                <Wrench size={14} className="text-signal" />
                <span>EDA / TOOLS</span>
              </div>
              <div className="font-sans text-xs text-white/90 font-medium">
                {project.specs.tools}
              </div>
            </div>
          </div>
        </div>

        {/* Build Story & Analysis */}
        <div className="flex flex-col gap-4">
          <span className="font-signal uppercase">
            // ENGINEERING BUILD LOG & ANALYSIS
          </span>
          <p className="font-sans text-base sm:text-lg text-white/80 leading-relaxed max-w-[68ch]">
            {project.buildStory}
          </p>
        </div>

        {/* Links: GitHub & Schematic */}
        <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="SOURCE"
            className="px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-signal transition-colors flex items-center gap-2"
          >
            <Github size={16} />
            <span>GITHUB FIRMWARE REPO</span>
          </a>

          <a
            href={project.schematicUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="CIRCUIT"
            className="px-6 py-3 rounded-full border border-white/25 text-white font-mono text-xs uppercase tracking-widest hover:border-white hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <ExternalLink size={16} />
            <span>VIEW KICAD SCHEMATICS & BOM</span>
          </a>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="px-6 md:px-12 py-4 border-t border-white/10 font-mono text-[10px] text-white/40 flex justify-between items-center">
        <span>ARAVIND SHANKAR // HARDWARE TELEMETRY ARCHIVE</span>
        <span>PRESS ESCAPE TO RETURN TO MAIN FEED</span>
      </div>
    </div>
  );
};
