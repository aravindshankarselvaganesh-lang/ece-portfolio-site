import React, { useState, useEffect } from 'react';
import { portfolioContent } from '../content/content';
import { Magnetic } from './Magnetic';
import { ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const { contact, meta } = portfolioContent;
  const [timeStr, setTimeStr] = useState<string>('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: meta.timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [meta.timeZone]);

  const headingText = contact.headline; // "LET'S TALK"

  return (
    <footer
      id="contact"
      className="relative min-h-screen w-full bg-[#17171C] text-[#EDEDEA] flex flex-col justify-between pt-24 pb-10 px-6 md:px-12 overflow-hidden select-none"
    >
      {/* Top Header Tag */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-signal animate-ping" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/70">
            {contact.sectionTag}
          </span>
        </div>
        <span className="font-signal-sm uppercase hidden sm:inline">
          {meta.statusText}
        </span>
      </div>

      {/* Centerpiece: Giant Centered "LET'S TALK" + Magnetic Pills (Screenshot 8) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto my-auto flex flex-col items-center justify-center text-center py-8 sm:py-12">
        {/* Giant Centered Headline: Each letter lifts 8px and brightens on hover */}
        <div className="w-full flex items-center justify-center flex-wrap select-none px-2">
          <h2
            aria-label={headingText}
            className="font-display font-black text-[clamp(36px,12.5vw,220px)] leading-[0.88] tracking-[-0.04em] text-white flex flex-wrap justify-center gap-x-[0.28em]"
          >
            {headingText.split(' ').map((word, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap">
                {word.split('').map((char, cIdx) => (
                  <span
                    key={cIdx}
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 hover:-translate-y-2 hover:text-signal cursor-default will-change-transform"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>

        <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white/60 max-w-[540px] mt-6">
          {contact.subtitle}
        </p>

        {/* Row of Magnetic Pill Buttons: INSTAGRAM, LINKEDIN, GITHUB, and highlighted white "CONTACT ME" */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-12">
          {contact.pillButtons.map((pill) => {
            const isPrimary = pill.isPrimary;

            return (
              <Magnetic key={pill.label} strength={0.4} radius={65}>
                <a
                  href={pill.href}
                  target={pill.external ? '_blank' : undefined}
                  rel={pill.external ? 'noopener noreferrer' : undefined}
                  data-cursor={pill.label}
                  className={`px-5 sm:px-7 py-3 rounded-full font-mono text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                    isPrimary
                      ? 'bg-white text-black font-bold shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:bg-signal hover:text-black hover:scale-105'
                      : 'border border-white/20 text-white/80 hover:text-white hover:border-white hover:bg-white/10'
                  }`}
                >
                  <span>{pill.label}</span>
                  {pill.external && <ArrowUpRight size={14} />}
                </a>
              </Magnetic>
            );
          })}
        </div>
      </div>

      {/* Footer Credits & Live IST Clock */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 font-mono text-[11px] text-white/50 tracking-wider">
        <div>{contact.footerLeft}</div>

        {/* Live IST clock */}
        <div className="flex items-center gap-2 text-white/80">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          <span>{contact.liveClockLabel}:</span>
          <span className="text-signal font-bold">{timeStr || '12:00:00'}</span>
        </div>

        <div>{contact.footerRight}</div>
      </div>
    </footer>
  );
};
