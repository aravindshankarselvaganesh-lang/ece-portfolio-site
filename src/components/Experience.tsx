import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { portfolioContent } from '../content/content';

const ease = [0.22, 1, 0.36, 1] as const;

// Hairline that draws in from the left when it scrolls into view
function Hairline() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="border-t border-white/20 origin-left w-full"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease }}
    />
  );
}

// Arrow icon matching the reference stacking work interaction
function StackArrow({ small = false }: { small?: boolean }) {
  return (
    <svg
      viewBox="0 0 38 38"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      className={`transition-transform duration-500 ease-out text-white/70 group-hover:text-signal group-hover:translate-x-1 group-hover:-translate-y-1 ${
        small ? 'w-5 h-5' : 'w-8 h-8'
      }`}
    >
      <path d="M9.5 30.08 30.08 9.5M10.32 9.5h19.76v19.76" />
    </svg>
  );
}

// Bespoke ECE Circuit & PCB Artwork for each Phase
const PhaseArt: React.FC<{ phaseIdx: number }> = ({ phaseIdx }) => {
  switch (phaseIdx) {
    case 0: // Discrete Circuits & Op-Amps
      return (
        <svg viewBox="0 0 800 400" className="w-full h-full p-2 sm:p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Op-Amp Triangle Schematic */}
          <polygon points="260,120 260,280 420,200" stroke="#39FF88" strokeWidth="2.5" fill="#0A0A0C" />
          <line x1="140" y1="160" x2="260" y2="160" stroke="#39FF88" strokeWidth="2" />
          <line x1="140" y1="240" x2="260" y2="240" stroke="#39FF88" strokeWidth="2" />
          <text x="270" y="165" fill="#EDEDEA" fontSize="18" fontFamily="JetBrains Mono">-</text>
          <text x="270" y="245" fill="#EDEDEA" fontSize="18" fontFamily="JetBrains Mono">+</text>
          
          {/* Resistors & Feedback Loop */}
          <path d="M 200 160 L 200 80 L 360 80 L 360 200 L 420 200" stroke="#39FF88" strokeWidth="1.8" strokeDasharray="4 2" />
          <rect x="250" y="70" width="60" height="20" rx="3" stroke="#39FF88" strokeWidth="1.5" fill="#17171C" />
          <text x="264" y="84" fill="#39FF88" fontSize="11" fontFamily="JetBrains Mono">Rf 10k</text>

          {/* Output Waveform */}
          <line x1="420" y1="200" x2="520" y2="200" stroke="#39FF88" strokeWidth="2" />
          <path d="M 520 200 Q 560 90, 600 200 T 680 200 T 760 200" stroke="#39FF88" strokeWidth="2.5" />
          <circle cx="420" cy="200" r="4" fill="#39FF88" />
          <circle cx="520" cy="200" r="4" fill="#39FF88" />

          {/* Oscilloscope Reticle Grids */}
          <line x1="520" y1="120" x2="760" y2="120" stroke="#39FF88" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3" />
          <line x1="520" y1="280" x2="760" y2="280" stroke="#39FF88" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3" />
          <text x="530" y="110" fill="#39FF88" fontSize="10" fontFamily="JetBrains Mono" opacity="0.8">GAIN = -10 (VOUT / VIN)</text>
          <text x="145" y="145" fill="#888" fontSize="10" fontFamily="JetBrains Mono">VIN(t)</text>
        </svg>
      );
    case 1: // ARM Cortex-M & 4-Layer PCB
      return (
        <svg viewBox="0 0 800 400" className="w-full h-full p-2 sm:p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Microcontroller QFN-32 Footprint */}
          <rect x="310" y="110" width="180" height="180" rx="8" stroke="#39FF88" strokeWidth="2" fill="#0A0A0C" />
          <rect x="340" y="140" width="120" height="120" rx="4" stroke="#39FF88" strokeWidth="1" opacity="0.5" />
          <circle cx="330" cy="130" r="4" fill="#39FF88" />
          <text x="348" y="195" fill="#EDEDEA" fontSize="13" fontFamily="Space Grotesk" fontWeight="bold">STM32F401</text>
          <text x="355" y="215" fill="#39FF88" fontSize="10" fontFamily="JetBrains Mono">ARM CORTEX-M4</text>

          {/* High-speed Bus Lines & Differential Pairs */}
          <path d="M 120 150 L 260 150 L 310 150" stroke="#39FF88" strokeWidth="1.8" />
          <path d="M 120 170 L 260 170 L 310 170" stroke="#39FF88" strokeWidth="1.8" />
          <path d="M 120 220 L 220 220 L 260 220 L 310 220" stroke="#39FF88" strokeWidth="1.8" strokeDasharray="4 2" />
          <path d="M 120 240 L 220 240 L 260 240 L 310 240" stroke="#39FF88" strokeWidth="1.8" strokeDasharray="4 2" />

          {/* Right-side 4-Layer Stackup Indicator */}
          <path d="M 490 160 L 580 160 L 620 120 L 700 120" stroke="#39FF88" strokeWidth="2" />
          <path d="M 490 200 L 580 200 L 620 200 L 700 200" stroke="#39FF88" strokeWidth="2" />
          <path d="M 490 240 L 580 240 L 620 280 L 700 280" stroke="#39FF88" strokeWidth="2" />

          <text x="710" y="124" fill="#39FF88" fontSize="10" fontFamily="JetBrains Mono">L1: TOP SIG (50Ω)</text>
          <text x="710" y="204" fill="#888" fontSize="10" fontFamily="JetBrains Mono">L2: SOLID GND</text>
          <text x="710" y="284" fill="#39FF88" fontSize="10" fontFamily="JetBrains Mono">L3: +3.3V PWR</text>
          <text x="130" y="140" fill="#39FF88" fontSize="10" fontFamily="JetBrains Mono">USB D+ / D- (90Ω DIFF)</text>
        </svg>
      );
    case 2: // Hardware Validation Intern
      return (
        <svg viewBox="0 0 800 400" className="w-full h-full p-2 sm:p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Saleae Logic Analyzer Waveform Channels */}
          <g transform="translate(80, 70)">
            <text x="0" y="25" fill="#39FF88" fontSize="11" fontFamily="JetBrains Mono">CH0: SPI SCK</text>
            <path d="M 110 20 L 130 20 L 130 5 L 160 5 L 160 20 L 190 20 L 190 5 L 220 5 L 220 20 L 250 20 L 250 5 L 280 5 L 280 20 L 310 20 L 310 5 L 340 5 L 340 20 L 370 20 L 370 5 L 400 5 L 400 20 L 430 20 L 430 5 L 460 5 L 460 20 L 490 20 L 490 5 L 520 5 L 520 20 L 550 20 L 550 5 L 580 5 L 580 20 L 610 20" stroke="#39FF88" strokeWidth="2" />
          </g>

          <g transform="translate(80, 140)">
            <text x="0" y="25" fill="#888" fontSize="11" fontFamily="JetBrains Mono">CH1: MOSI (TX)</text>
            <path d="M 110 20 L 160 20 L 160 5 L 250 5 L 250 20 L 310 20 L 310 5 L 400 5 L 400 20 L 490 20 L 490 5 L 580 5 L 580 20 L 610 20" stroke="#EDEDEA" strokeWidth="2" />
          </g>

          <g transform="translate(80, 210)">
            <text x="0" y="25" fill="#888" fontSize="11" fontFamily="JetBrains Mono">CH2: MISO (RX)</text>
            <path d="M 110 5 L 190 5 L 190 20 L 280 20 L 280 5 L 370 5 L 370 20 L 460 20 L 460 5 L 550 5 L 550 20 L 610 20" stroke="#39FF88" strokeWidth="1.8" strokeDasharray="5 3" />
          </g>

          <g transform="translate(80, 280)">
            <text x="0" y="25" fill="#39FF88" fontSize="11" fontFamily="JetBrains Mono">CH3: /CS CHIP</text>
            <path d="M 110 5 L 140 5 L 140 25 L 570 25 L 570 5 L 610 5" stroke="#39FF88" strokeWidth="2" />
          </g>

          {/* Validation pass badge */}
          <rect x="580" y="325" width="130" height="28" rx="4" stroke="#39FF88" strokeWidth="1.5" fill="#0A0A0C" />
          <text x="595" y="343" fill="#39FF88" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">PACKETS VALID [OK]</text>
        </svg>
      );
    case 3: // Sub-GHz Telemetry & Distributed Nodes
      return (
        <svg viewBox="0 0 800 400" className="w-full h-full p-2 sm:p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* RF LoRa Antenna & Transceiver */}
          <path d="M 180 260 L 180 140 M 150 110 L 180 140 L 210 110" stroke="#39FF88" strokeWidth="3" />
          <circle cx="180" cy="140" r="5" fill="#39FF88" />
          
          {/* LoRa CSS Chirp Waveform (Sweep from low to high frequency) */}
          <path d="M 240 200 Q 270 120, 300 200 T 340 200 T 370 200 T 395 200 T 415 200 T 430 200 T 442 200 T 452 200" stroke="#39FF88" strokeWidth="2.5" />
          <text x="240" y="110" fill="#39FF88" fontSize="12" fontFamily="JetBrains Mono">433 MHz CHIRP SPREAD SPECTRUM</text>

          {/* Solar MPPT & Supercapacitor Energy Harvest */}
          <rect x="490" y="130" width="160" height="90" rx="6" stroke="#39FF88" strokeWidth="1.5" fill="#17171C" />
          <text x="510" y="165" fill="#EDEDEA" fontSize="12" fontFamily="Space Grotesk" fontWeight="bold">SOLAR MPPT</text>
          <text x="510" y="185" fill="#39FF88" fontSize="11" fontFamily="JetBrains Mono">IQ = 14.8 µA SLEEP</text>

          {/* Range metric */}
          <line x1="180" y1="310" x2="650" y2="310" stroke="#39FF88" strokeWidth="1" strokeDasharray="4 4" />
          <text x="350" y="335" fill="#EDEDEA" fontSize="11" fontFamily="JetBrains Mono">4.2 KM LINE-OF-SIGHT RF LINK</text>
        </svg>
      );
    default:
      return null;
  }
};

// Additional Milestones for the Numbered Index
const additionalMilestones = [
  {
    num: "05",
    name: "16-BIT PIPELINED ALU ARCHITECTURE",
    domain: "DIGITAL VLSI / FPGA",
    service: "VERILOG IEEE 1364",
    href: "#builds",
  },
  {
    num: "06",
    name: "HIGH-SPEED IMPEDANCE MATCHED BUSES",
    domain: "RF & TRANSMISSION LINES",
    service: "KICAD 8 & SMITH CHARTS",
    href: "#builds",
  },
  {
    num: "07",
    name: "EMC PRE-COMPLIANCE FIXTURE AUTOMATION",
    domain: "SIGNAL INTEGRITY",
    service: "SPECTRUM ANALYZER",
    href: "#builds",
  },
  {
    num: "08",
    name: "AUTONOMOUS CAPSTONE SENSOR TELEMETRY",
    domain: "EDGE EMBEDDED IoT",
    service: "FREERTOS & SUB-GHZ",
    href: "#builds",
  },
];

// Realistic imagery for each career phase to bring them to life
const phaseImages = [
  '/images/experience-embedded.jpg',
  '/images/experience-pcb.jpg',
  '/images/experience-vlsi.jpg',
  '/images/experience-telemetry.jpg',
];

export const Experience: React.FC = () => {
  const { experience } = portfolioContent;
  const panels = experience.panels;
  const reduce = useReducedMotion();

  const title = "WHERE I'VE BEEN";

  return (
    <section id="experience" className="relative w-full bg-[#0A0A0C] text-[#EDEDEA] px-4 sm:px-6 md:px-12 select-none">
      
      {/* 1. Section Header: Introduces the trajectory cleanly above the stacking cards */}
      <div className="relative z-10 max-w-[1130px] mx-auto pt-24 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-signal/10 border border-signal/30 text-signal font-mono text-xs tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          CH.03 — CAREER TRAJECTORY // 2023 — 2026
        </div>
        <h2
          className="m-0 font-syne font-extrabold text-[clamp(32px,7.5vw,108px)] leading-[0.95] tracking-[-0.03em] uppercase text-white flex flex-wrap justify-center gap-x-[0.28em] gap-y-1"
          aria-label={title}
        >
          {title.split(' ').map((word, wIdx) => {
            const charOffset = title.split(' ').slice(0, wIdx).join(' ').length + (wIdx > 0 ? 1 : 0);
            return (
              <span key={wIdx} className="inline-block whitespace-nowrap">
                {[...word].map((ch, cIdx) => (
                  <motion.span
                    key={cIdx}
                    aria-hidden
                    className="inline-block"
                    initial={reduce ? false : { opacity: 0, y: '0.3em' }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7, ease, delay: (charOffset + cIdx) * 0.045 }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            );
          })}
        </h2>
        <p className="mt-4 font-jakarta font-medium text-xs sm:text-sm text-white/60 tracking-wider uppercase">
          [ 4 Engineering Phases · Circuits, Firmware, Power & RF ]
        </p>
      </div>

      {/* 2. Piling Sticky Phase Cards: each stopping 24px lower than the last */}
      <ul className="relative z-10 flex flex-col max-w-[1130px] mx-auto p-0 list-none">
        {panels.map((panel, idx) => (
          <li
            key={panel.id}
            className={`sticky pb-6 sm:pb-7 ${
              idx === panels.length - 1 ? 'pb-12 sm:pb-16' : ''
            }`}
            style={{
              top: `calc(74px + ${idx * 16}px)`,
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          >
            <div className="group block bg-[#121217] rounded-2xl border border-white/15 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-signal/70 hover:shadow-[0_0_40px_rgba(57,255,136,0.15)] text-[#EDEDEA] no-underline">
              
              {/* Media Area: calibrated height and proportional gap matching site flow */}
              <div
                className="relative flex items-center justify-center overflow-hidden h-[210px] sm:h-[250px] md:h-[280px] w-full"
                style={{
                  backgroundImage:
                    idx === 0
                      ? 'linear-gradient(142deg, #1f2722 5%, #0A0A0C 104%)'
                      : idx === 1
                      ? 'linear-gradient(142deg, #1b2628 5%, #0A0A0C 104%)'
                      : idx === 2
                      ? 'linear-gradient(142deg, #24222f 5%, #0A0A0C 104%)'
                      : 'linear-gradient(142deg, #25281e 5%, #0A0A0C 104%)',
                }}
              >
                {/* Realistic Hardware Photography that zooms to 1.05x on card hover */}
                <div className="relative w-[92%] sm:w-[86%] h-[88%] rounded-xl border border-white/15 bg-[#0A0A0C] shadow-2xl overflow-hidden group-hover:scale-[1.02] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center">
                  <img
                    src={phaseImages[idx]}
                    alt={panel.title}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover filter brightness-90 contrast-110 transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center">
                    <PhaseArt phaseIdx={idx} />
                  </div>

                  {/* Cinematic subtle vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />
                </div>

                {/* Corner Technical Phase Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase px-2.5 py-1 rounded bg-black/80 text-signal border border-signal/30 backdrop-blur-md">
                  PHASE 0{idx + 1} // {panel.bgWord}
                </div>
              </div>

              {/* Card Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-5 sm:px-8 pt-4 text-[11px] sm:text-xs uppercase tracking-wider text-white/60">
                <span className="font-syne font-bold text-signal text-xs sm:text-sm tracking-wide">{panel.year}</span>
                <span className="font-jakarta font-semibold text-white/90">{panel.category}</span>
                <span className="font-mono text-white/50 text-[11px] hidden sm:inline">{panel.tag}</span>
              </div>

              {/* Title & Arrow Row */}
              <div className="flex items-center justify-between gap-3 px-5 sm:px-8 pt-2 pb-1">
                <h3 className="font-syne font-bold text-xl sm:text-2xl md:text-[26px] uppercase tracking-tight text-white group-hover:text-signal transition-colors duration-300">
                  {panel.title}
                </h3>
                <StackArrow />
              </div>

              <div className="px-5 sm:px-8 pb-3">
                <p className="font-bricolage text-sm sm:text-[15px] font-normal text-white/80 leading-relaxed max-w-[72ch]">
                  {panel.description}
                </p>
              </div>

              {/* Three Technical Columns: Hardware, Firmware, Verification — fully visible */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 px-5 sm:px-8 py-3.5 border-t border-white/10 bg-black/40">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold text-signal uppercase tracking-wider">
                    // HARDWARE
                  </span>
                  <span className="font-jakarta font-medium text-[11px] sm:text-xs text-white/85 leading-snug">
                    {panel.columns.hardware}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold text-signal uppercase tracking-wider">
                    // FIRMWARE
                  </span>
                  <span className="font-jakarta font-medium text-[11px] sm:text-xs text-white/85 leading-snug">
                    {panel.columns.firmware}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold text-signal uppercase tracking-wider">
                    // VERIFICATION
                  </span>
                  <span className="font-jakarta font-medium text-[11px] sm:text-xs text-white/85 leading-snug">
                    {panel.columns.verification}
                  </span>
                </div>
              </div>

            </div>
          </li>
        ))}
      </ul>

      {/* 3. Numbered Index of Milestones & Lab Capstones (follows the pile) */}
      <div className="relative z-10 max-w-[1130px] mx-auto py-8 sm:py-16 bg-[#0A0A0C]">
        <div className="flex items-center justify-between pb-6 font-mono text-xs sm:text-sm uppercase tracking-wider text-white/60">
          <span className="text-signal font-bold">[ MORE MILESTONES & LAB CAPSTONES ]</span>
          <span>0{additionalMilestones.length}</span>
        </div>

        <ol className="m-0 p-0 list-none">
          {additionalMilestones.map((m) => (
            <li key={m.num}>
              <Hairline />
              <a
                href={m.href}
                className="group grid grid-cols-1 sm:grid-cols-[3rem_1fr_1fr_4rem] md:grid-cols-[3.5rem_1.8fr_1.2fr_6rem_2.5rem] items-center gap-4 py-6 text-inherit no-underline"
                data-cursor="INSPECT"
              >
                <span className="font-mono text-xs text-signal font-bold">{m.num}</span>
                <span className="font-syne font-bold text-lg sm:text-xl uppercase tracking-tight text-white group-hover:text-signal group-hover:translate-x-2 transition-all duration-400">
                  {m.name}
                </span>
                <span className="font-jakarta font-medium text-xs text-white/65 uppercase hidden sm:block">
                  {m.domain}
                </span>
                <span className="font-mono text-xs text-white/40 uppercase hidden md:block">
                  {m.service}
                </span>
                <StackArrow small />
              </a>
            </li>
          ))}
        </ol>
        <Hairline />
      </div>

    </section>
  );
};
