import React, { useState, useEffect } from 'react';
import { portfolioContent } from '../content/content';
import { Github, Linkedin, Instagram, Mail, Menu, X } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface NavProps {
  activeSection: string;
}

export const Nav: React.FC<NavProps> = ({ activeSection }) => {
  const { meta, nav } = portfolioContent;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <Github size={14} />;
      case 'linkedin':
        return <Linkedin size={14} />;
      case 'instagram':
        return <Instagram size={14} />;
      case 'mail':
        return <Mail size={14} />;
      default:
        return null;
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-40 px-5 md:px-8 py-5 transition-transform duration-300 pointer-events-none"
        style={{ mixBlendMode: 'difference' }}
      >
        <div className="max-w-content mx-auto flex items-center justify-between pointer-events-auto">
          {/* Left: Logo & blinking signal dot */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-2.5 text-white no-underline focus:outline-none focus:ring-1 focus:ring-signal"
            data-cursor="HOME"
          >
            <span className="font-display font-black text-xl md:text-2xl tracking-tight">
              {meta.initials}
            </span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-signal"></span>
            </span>
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-white/60">
              {meta.name}
            </span>
          </a>

          {/* Desktop Center: Pill navigation bar */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md"
          >
            {nav.links.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  data-cursor="GOTO"
                  className={`relative px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-black font-semibold'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-signal inline-block" />
                  )}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right: Circular Icon Buttons + Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5">
              {nav.socials.map((social) => {
                const isExternal = !social.href.startsWith('mailto:');
                return (
                  <Magnetic key={social.name} strength={0.4} radius={40}>
                    <a
                      href={social.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      aria-label={social.name}
                      data-cursor={social.name.toUpperCase()}
                      className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white hover:text-black transition-colors duration-200"
                    >
                      {getSocialIcon(social.icon)}
                    </a>
                  </Magnetic>
                );
              })}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 bg-[#0A0A0C] text-[#EDEDEA] flex flex-col justify-between p-8 lg:hidden animate-in fade-in duration-300"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-2xl text-white">{meta.initials}</span>
              <span className="w-2 h-2 rounded-full bg-signal" />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-4 my-auto py-8">
            {nav.links.map((link, idx) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group flex items-center justify-between py-2 border-b border-white/5"
                >
                  <span
                    className={`font-display font-black text-4xl sm:text-5xl uppercase tracking-tight transition-transform duration-200 group-hover:translate-x-3 ${
                      isActive ? 'text-signal' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </span>
                  <span className="font-mono text-xs text-white/40">0{idx + 1}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <div className="font-mono text-xs text-white/50">{meta.university}</div>
            <div className="flex gap-3">
              {nav.socials.map((social) => {
                const isExternal = !social.href.startsWith('mailto:');
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-signal"
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
