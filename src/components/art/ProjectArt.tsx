import React from 'react';

interface ProjectArtProps {
  type: string;
  className?: string;
  isLightCard?: boolean;
}

export const ProjectArt: React.FC<ProjectArtProps> = ({
  type,
  className = '',
  isLightCard = false,
}) => {
  const bg = isLightCard ? '#E4E4DF' : '#0F0F13';
  const strokeColor = isLightCard ? '#232328' : '#D0D0D8';
  const subtleStroke = isLightCard ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.12)';
  const copperTrack = isLightCard ? '#3a3a40' : '#454552';
  const signal = '#39FF88';

  switch (type) {
    case 'energy-meter':
      return (
        <svg viewBox="0 0 640 400" fill="none" className={`w-full h-full object-cover select-none ${className}`}>
          <rect width="640" height="400" fill={bg} />
          {/* PCB Ground Pour Hatching */}
          <g stroke={subtleStroke} strokeWidth="0.5" opacity="0.25">
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={i} x1={i * 45} y1="0" x2={i * 45} y2="400" />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={i} x1="0" y1={i * 45} x2="640" y2={i * 45} />
            ))}
          </g>

          {/* Copper High-Current Shunt Traces */}
          <path d="M 60 180 L 180 180 L 220 220 L 320 220" stroke={copperTrack} strokeWidth="12" strokeLinecap="round" />
          <path d="M 60 220 L 160 220 L 200 260 L 320 260" stroke={copperTrack} strokeWidth="12" strokeLinecap="round" />
          
          {/* ACS712 Current Sensor IC */}
          <rect x="220" y="160" width="100" height="120" rx="4" fill="#1b1b22" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="235" cy="175" r="4" fill={signal} />
          <text x="245" y="225" fill="#fff" fontSize="11" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
            ACS712-20A
          </text>
          {/* IC Pins */}
          {[-30, -10, 10, 30].map((dy, i) => (
            <React.Fragment key={i}>
              <rect x="208" y={210 + dy} width="12" height="6" fill="#888" />
              <rect x="320" y={210 + dy} width="12" height="6" fill="#888" />
            </React.Fragment>
          ))}

          {/* ESP32 Module with Meander Trace Antenna */}
          <rect x="420" y="80" width="160" height="240" rx="6" fill="#141418" stroke={strokeColor} strokeWidth="2" />
          {/* Serpentine Antenna PCB track */}
          <path
            d="M 440 100 H 560 V 110 H 450 V 120 H 550 V 130 H 460 V 140 H 540"
            fill="none"
            stroke={copperTrack}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect x="440" y="160" width="120" height="90" rx="3" fill="#08080a" stroke={subtleStroke} />
          <text x="465" y="210" fill={signal} fontSize="12" fontFamily="'JetBrains Mono', monospace">
            ESP32-WROOM
          </text>

          {/* Telemetry Waveform Oscilloscope Inset */}
          <g transform="translate(60, 60)">
            <rect width="180" height="80" rx="4" fill="#09090c" stroke={subtleStroke} />
            <path
              d="M 10 40 Q 30 10, 50 40 T 90 40 T 130 40 T 170 40"
              fill="none"
              stroke={signal}
              strokeWidth="1.8"
            />
            <text x="12" y="24" fill={signal} fontSize="8" fontFamily="'JetBrains Mono', monospace">
              4.0 kHz RMS / 238.4 V
            </text>
          </g>

          {/* Silkscreen labels */}
          <text x="60" y="360" fill={strokeColor} fontSize="11" fontFamily="'JetBrains Mono', monospace" opacity="0.6">
            REV 2.1 — PCB STACKUP: 1.6MM FR-4 / ENIG
          </text>
        </svg>
      );

    case 'fm-receiver':
      return (
        <svg viewBox="0 0 640 400" fill="none" className={`w-full h-full object-cover select-none ${className}`}>
          <rect width="640" height="400" fill={bg} />
          {/* RF Radial Ground Islands */}
          <circle cx="320" cy="200" r="160" stroke={subtleStroke} strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="320" cy="200" r="120" stroke={subtleStroke} strokeWidth="0.8" />
          
          {/* RF Inductor Spiral Coil */}
          <path
            d="M 120 200 A 30 30 0 0 1 180 200 A 45 45 0 0 1 90 200 A 60 60 0 0 1 210 200"
            fill="none"
            stroke={signal}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* TEA5767 IC */}
          <rect x="270" y="150" width="100" height="100" rx="4" fill="#15151c" stroke={strokeColor} strokeWidth="1.5" />
          <text x="282" y="205" fill="#fff" fontSize="11" fontFamily="'JetBrains Mono', monospace">
            TEA5767HN
          </text>
          <circle cx="350" cy="165" r="3" fill={signal} />

          {/* TDA2822 Audio Amp */}
          <rect x="450" y="170" width="90" height="80" rx="3" fill="#181820" stroke={strokeColor} strokeWidth="1.5" />
          <text x="465" y="215" fill={signal} fontSize="10" fontFamily="'JetBrains Mono', monospace">
            TDA2822M
          </text>

          {/* Audio Output Jack Footprint */}
          <rect x="560" y="180" width="45" height="60" rx="2" fill="#252530" stroke={strokeColor} />
          <circle cx="582" cy="210" r="12" fill="#000" stroke={signal} strokeWidth="1" />

          {/* Frequency Tuning Bar */}
          <g transform="translate(160, 70)">
            <rect width="320" height="36" rx="4" fill="#0c0c10" stroke={strokeColor} />
            <line x1="230" y1="6" x2="230" y2="30" stroke={signal} strokeWidth="2" />
            <text x="20" y="23" fill="#fff" fontSize="12" fontFamily="'JetBrains Mono', monospace">
              PLL: 102.10 MHz
            </text>
            <text x="250" y="23" fill={signal} fontSize="10" fontFamily="'JetBrains Mono', monospace">
              STEREO // LOCK
            </text>
          </g>

          <text x="60" y="360" fill={strokeColor} fontSize="11" fontFamily="'JetBrains Mono', monospace" opacity="0.6">
            50-OHM IMPEDANCE MATCHED COAXIAL INLET
          </text>
        </svg>
      );

    case 'fpga-alu':
      return (
        <svg viewBox="0 0 640 400" fill="none" className={`w-full h-full object-cover select-none ${className}`}>
          <rect width="640" height="400" fill={bg} />
          {/* FPGA Basys 3 Board Outline */}
          <rect x="50" y="40" width="540" height="320" rx="8" fill={isLightCard ? "#DBDBD4" : "#121217"} stroke={strokeColor} strokeWidth="2" />

          {/* Artix-7 BGA Chip */}
          <rect x="240" y="120" width="160" height="160" rx="6" fill="#1b1b22" stroke={signal} strokeWidth="1.5" />
          <text x="268" y="195" fill="#fff" fontSize="13" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
            ARTIX-7
          </text>
          <text x="268" y="215" fill={signal} fontSize="10" fontFamily="'JetBrains Mono', monospace">
            XC7A35T-CPG236
          </text>

          {/* High-density BGA balls & bus routes */}
          <g stroke={subtleStroke} strokeWidth="1">
            {Array.from({ length: 8 }).map((_, i) => (
              <React.Fragment key={i}>
                <line x1="80" y1={140 + i * 15} x2="240" y2={140 + i * 15} />
                <line x1="400" y1={140 + i * 15} x2="560" y2={140 + i * 15} />
              </React.Fragment>
            ))}
          </g>

          {/* 16 Slide Switches at bottom */}
          <g transform="translate(90, 310)">
            {Array.from({ length: 16 }).map((_, i) => (
              <g key={i} transform={`translate(${i * 28}, 0)`}>
                <rect width="18" height="24" rx="2" fill="#252530" stroke={strokeColor} strokeWidth="0.8" />
                <circle cx="9" cy={i % 3 === 0 ? "7" : "17"} r="3" fill={i % 2 === 0 ? signal : "#888"} />
              </g>
            ))}
          </g>

          {/* 7-Segment Display Quad */}
          <g transform="translate(100, 70)">
            {['1', '0', 'F', 'C'].map((char, i) => (
              <g key={i} transform={`translate(${i * 26}, 0)`}>
                <rect width="22" height="34" rx="2" fill="#000" stroke={strokeColor} />
                <text x="6" y="24" fill={signal} fontSize="15" fontFamily="'JetBrains Mono', monospace">
                  {char}
                </text>
              </g>
            ))}
          </g>

          {/* Clock crystal */}
          <rect x="460" y="70" width="50" height="30" rx="3" fill="#2c2c38" stroke={strokeColor} />
          <text x="467" y="90" fill="#fff" fontSize="9" fontFamily="'JetBrains Mono', monospace">
            100MHz
          </text>
        </svg>
      );

    case 'pid-robot':
      return (
        <svg viewBox="0 0 640 400" fill="none" className={`w-full h-full object-cover select-none ${className}`}>
          <rect width="640" height="400" fill={bg} />
          {/* Grid Background */}
          <g stroke={subtleStroke} strokeWidth="0.5" opacity="0.2">
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={i} x1="0" y1={i * 40} x2="640" y2={i * 40} />
            ))}
          </g>

          {/* Trajectory Guide Line with Sharp Curve */}
          <path
            d="M 60 300 C 180 300, 240 100, 380 100 C 500 100, 560 260, 620 260"
            fill="none"
            stroke={signal}
            strokeWidth="3"
            strokeDasharray="6 4"
          />

          {/* Top-View Robot Chassis */}
          <g transform="translate(240, 110)">
            {/* Main Body */}
            <rect x="40" y="20" width="120" height="180" rx="14" fill="#181822" stroke={strokeColor} strokeWidth="2" />
            
            {/* Front Sensor Array (QTR-8A) */}
            <rect x="25" y="0" width="150" height="20" rx="3" fill="#0d0d12" stroke={signal} strokeWidth="1" />
            {Array.from({ length: 8 }).map((_, i) => (
              <circle key={i} cx={40 + i * 17} cy="10" r="3" fill={i === 4 ? signal : "#555"} />
            ))}

            {/* Wheels & Motors */}
            <rect x="15" y="110" width="22" height="60" rx="4" fill="#000" stroke={strokeColor} />
            <rect x="163" y="110" width="22" height="60" rx="4" fill="#000" stroke={strokeColor} />

            {/* STM32 Microcontroller */}
            <rect x="75" y="70" width="50" height="50" rx="4" fill="#242432" stroke={strokeColor} />
            <text x="82" y="98" fill={signal} fontSize="9" fontFamily="'JetBrains Mono', monospace">
              STM32
            </text>

            {/* Battery pack */}
            <rect x="65" y="130" width="70" height="50" rx="4" fill="#0f0f15" stroke={subtleStroke} />
            <text x="80" y="160" fill="#fff" fontSize="9" fontFamily="'JetBrains Mono', monospace" opacity="0.6">
              2S LiPo
            </text>
          </g>

          <text x="60" y="360" fill={strokeColor} fontSize="11" fontFamily="'JetBrains Mono', monospace" opacity="0.6">
            500 HZ DISCRETE PID LOOP // Kp: 1.84 Ki: 0.02 Kd: 0.95
          </text>
        </svg>
      );

    case 'ecg-front-end':
      return (
        <svg viewBox="0 0 640 400" fill="none" className={`w-full h-full object-cover select-none ${className}`}>
          <rect width="640" height="400" fill={bg} />
          {/* Medical ECG Grid Pattern */}
          <g stroke={isLightCard ? "rgba(0,0,0,0.06)" : "rgba(57,255,136,0.04)"} strokeWidth="0.8">
            {Array.from({ length: 32 }).map((_, i) => (
              <line key={i} x1={i * 20} y1="0" x2={i * 20} y2="400" />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={i} x1="0" y1={i * 20} x2="640" y2={i * 20} />
            ))}
          </g>

          {/* INA128 Instrumentation Amp schematic block */}
          <g transform="translate(60, 110)">
            <polygon points="40,20 160,80 40,140" fill="#14141c" stroke={strokeColor} strokeWidth="1.5" />
            <text x="65" y="85" fill="#fff" fontSize="12" fontFamily="'JetBrains Mono', monospace">
              INA128
            </text>
            <text x="50" y="50" fill={signal} fontSize="11" fontFamily="'JetBrains Mono', monospace">+</text>
            <text x="50" y="125" fill={signal} fontSize="11" fontFamily="'JetBrains Mono', monospace">-</text>
            <line x1="0" y1="45" x2="40" y2="45" stroke={strokeColor} strokeWidth="2" />
            <line x1="0" y1="120" x2="40" y2="120" stroke={strokeColor} strokeWidth="2" />
            <line x1="160" y1="80" x2="220" y2="80" stroke={strokeColor} strokeWidth="2" />
          </g>

          {/* Authentic Real-Time ECG Trace with P-Q-R-S-T Complex */}
          <path
            d="M 280 190
               L 330 190
               Q 340 180, 350 190
               L 365 190
               L 375 205
               L 390 70
               L 405 240
               L 415 190
               L 440 190
               Q 460 160, 480 190
               L 620 190"
            fill="none"
            stroke={signal}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Annotation Flags */}
          <g transform="translate(385, 45)">
            <line x1="5" y1="0" x2="5" y2="20" stroke={signal} strokeWidth="1" strokeDasharray="2 2" />
            <text x="-8" y="-6" fill={signal} fontSize="10" fontFamily="'JetBrains Mono', monospace">
              R-PEAK [1.2mV]
            </text>
          </g>

          {/* 50Hz Notch Filter Stage Tag */}
          <g transform="translate(60, 290)">
            <rect width="240" height="34" rx="3" fill="#121218" stroke={strokeColor} />
            <text x="15" y="21" fill="#fff" fontSize="10" fontFamily="'JetBrains Mono', monospace">
              ACTIVE NOTCH: 50.0 HZ (Q=10)
            </text>
          </g>

          <text x="60" y="360" fill={strokeColor} fontSize="11" fontFamily="'JetBrains Mono', monospace" opacity="0.6">
            CMRR: 120 DB // GAIN: 1000 V/V // PASSBAND: 0.05 - 150 HZ
          </text>
        </svg>
      );

    case 'lora-node':
      return (
        <svg viewBox="0 0 640 400" fill="none" className={`w-full h-full object-cover select-none ${className}`}>
          <rect width="640" height="400" fill={bg} />
          {/* Concentric RF Waves from Antenna */}
          <g stroke={signal} opacity="0.3">
            <circle cx="160" cy="180" r="40" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="160" cy="180" r="90" strokeWidth="1" strokeDasharray="5 5" />
            <circle cx="160" cy="180" r="150" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="160" cy="180" r="220" strokeWidth="1" strokeDasharray="8 8" />
          </g>

          {/* Sub-GHz Helical Antenna */}
          <path
            d="M 160 180 V 70 Q 160 60, 150 60 Q 140 60, 140 50 Q 140 40, 150 40 Q 160 40, 160 30"
            fill="none"
            stroke={signal}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* SX1278 LoRa Module */}
          <rect x="110" y="180" width="100" height="110" rx="4" fill="#181822" stroke={strokeColor} strokeWidth="1.5" />
          <text x="125" y="225" fill="#fff" fontSize="11" fontFamily="'JetBrains Mono', monospace">
            SX1278
          </text>
          <text x="125" y="245" fill={signal} fontSize="9" fontFamily="'JetBrains Mono', monospace">
            433.0 MHz
          </text>

          {/* Environmental Sensor BME280 */}
          <rect x="250" y="195" width="70" height="70" rx="3" fill="#1c1c26" stroke={strokeColor} />
          <circle cx="265" cy="210" r="3" fill="#888" />
          <text x="260" y="240" fill={signal} fontSize="9" fontFamily="'JetBrains Mono', monospace">
            BME280
          </text>

          {/* Telemetry Tele-gauge */}
          <g transform="translate(360, 140)">
            <rect width="220" height="150" rx="6" fill="#0c0c10" stroke={strokeColor} />
            <text x="20" y="35" fill="#888" fontSize="10" fontFamily="'JetBrains Mono', monospace">
              UPLINK PACKET #04829
            </text>
            <text x="20" y="65" fill="#fff" fontSize="13" fontFamily="'JetBrains Mono', monospace">
              TEMP: 26.8 °C
            </text>
            <text x="20" y="90" fill="#fff" fontSize="13" fontFamily="'JetBrains Mono', monospace">
              HUM: 64.2 % RH
            </text>
            <text x="20" y="115" fill={signal} fontSize="13" fontFamily="'JetBrains Mono', monospace">
              RSSI: -94 dBm (SF10)
            </text>
          </g>

          <text x="60" y="360" fill={strokeColor} fontSize="11" fontFamily="'JetBrains Mono', monospace" opacity="0.6">
            SLEEP CURRENT: 14.8 µA // RANGE: 4.2 KM LOS // SOLAR MPPT
          </text>
        </svg>
      );

    // Services illustrations
    case 'pcb':
      return (
        <svg viewBox="0 0 400 280" fill="none" className={`w-full h-full object-cover ${className}`}>
          <rect width="400" height="280" fill="#101015" />
          <g stroke="rgba(255,255,255,0.1)" strokeWidth="0.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="280" />
            ))}
          </g>
          <path d="M 40 60 L 140 60 L 190 110 L 290 110 L 330 150" stroke={signal} strokeWidth="2.5" />
          <path d="M 40 90 L 120 90 L 170 140 L 260 140 L 300 180" stroke="#777" strokeWidth="2" />
          <circle cx="190" cy="110" r="5" fill="#101015" stroke={signal} strokeWidth="2" />
          <circle cx="290" cy="110" r="5" fill="#101015" stroke={signal} strokeWidth="2" />
          <rect x="240" y="180" width="100" height="70" rx="4" fill="#20202a" stroke="#444" />
          <text x="255" y="220" fill="#fff" fontSize="11" fontFamily="'JetBrains Mono', monospace">
            BGA ESCAPE
          </text>
        </svg>
      );

    case 'firmware':
      return (
        <svg viewBox="0 0 400 280" fill="none" className={`w-full h-full object-cover ${className}`}>
          <rect width="400" height="280" fill="#101015" />
          <g transform="translate(30, 40)">
            <text x="0" y="20" fill={signal} fontSize="11" fontFamily="'JetBrains Mono', monospace">
              // DMA CIRCULAR BUFFER ISR
            </text>
            <text x="0" y="45" fill="#ddd" fontSize="11" fontFamily="'JetBrains Mono', monospace">
              void DMA1_Stream0_IRQHandler() &#123;
            </text>
            <text x="20" y="70" fill="#888" fontSize="11" fontFamily="'JetBrains Mono', monospace">
              if (DMA1-&gt;ISR &amp; DMA_FLAG_TC) &#123;
            </text>
            <text x="40" y="95" fill={signal} fontSize="11" fontFamily="'JetBrains Mono', monospace">
              RingBuffer_Commit(&amp;rb_rx);
            </text>
            <text x="40" y="120" fill="#888" fontSize="11" fontFamily="'JetBrains Mono', monospace">
              SCB-&gt;ICSR |= SCB_ICSR_PENDSVSET;
            </text>
            <text x="20" y="145" fill="#888" fontSize="11" fontFamily="'JetBrains Mono', monospace">
              &#125;
            </text>
            <text x="0" y="170" fill="#ddd" fontSize="11" fontFamily="'JetBrains Mono', monospace">
              &#125;
            </text>
          </g>
        </svg>
      );

    case 'fpga':
      return (
        <svg viewBox="0 0 400 280" fill="none" className={`w-full h-full object-cover ${className}`}>
          <rect width="400" height="280" fill="#101015" />
          <g transform="translate(40, 50)">
            <circle cx="60" cy="80" r="30" fill="#1a1a24" stroke={signal} strokeWidth="1.5" />
            <text x="46" y="84" fill="#fff" fontSize="10" fontFamily="'JetBrains Mono', monospace">IDLE</text>
            <circle cx="180" cy="40" r="30" fill="#1a1a24" stroke="#888" strokeWidth="1.5" />
            <text x="163" y="44" fill="#fff" fontSize="10" fontFamily="'JetBrains Mono', monospace">EXEC</text>
            <circle cx="180" cy="130" r="30" fill="#1a1a24" stroke={signal} strokeWidth="1.5" />
            <text x="163" y="134" fill="#fff" fontSize="10" fontFamily="'JetBrains Mono', monospace">WB</text>
            <path d="M 88 68 L 152 48" stroke={signal} strokeWidth="1.5" markerEnd="url(#arrow)" />
            <path d="M 180 70 L 180 100" stroke="#888" strokeWidth="1.5" />
            <path d="M 152 135 L 88 95" stroke={signal} strokeWidth="1.5" />
          </g>
          <text x="40" y="240" fill={signal} fontSize="10" fontFamily="'JetBrains Mono', monospace">
            RTL PIPELINE: 16-BIT REGISTER TRANSFER
          </text>
        </svg>
      );

    case 'analog':
      return (
        <svg viewBox="0 0 400 280" fill="none" className={`w-full h-full object-cover ${className}`}>
          <rect width="400" height="280" fill="#101015" />
          <g stroke="rgba(255,255,255,0.08)" strokeWidth="0.8">
            <line x1="40" y1="20" x2="40" y2="230" />
            <line x1="40" y1="230" x2="360" y2="230" />
          </g>
          {/* Bode Magnitude Plot */}
          <path
            d="M 40 210 L 120 70 L 250 70 L 350 220"
            fill="none"
            stroke={signal}
            strokeWidth="2.5"
          />
          <text x="140" y="55" fill="#fff" fontSize="10" fontFamily="'JetBrains Mono', monospace">
            PASSBAND +40dB (0.1Hz - 150Hz)
          </text>
          <text x="270" y="160" fill="#888" fontSize="9" fontFamily="'JetBrains Mono', monospace">
            -40dB/DEC ROLLOFF
          </text>
        </svg>
      );

    case 'iot':
      return (
        <svg viewBox="0 0 400 280" fill="none" className={`w-full h-full object-cover ${className}`}>
          <rect width="400" height="280" fill="#101015" />
          <g transform="translate(60, 40)">
            <circle cx="80" cy="70" r="14" fill="#20202e" stroke={signal} strokeWidth="2" />
            <circle cx="200" cy="50" r="10" fill="#20202e" stroke="#888" />
            <circle cx="220" cy="130" r="10" fill="#20202e" stroke="#888" />
            <circle cx="100" cy="150" r="10" fill="#20202e" stroke="#888" />
            <line x1="94" y1="70" x2="190" y2="53" stroke={signal} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="90" y1="80" x2="210" y2="125" stroke={signal} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="83" y1="84" x2="97" y2="140" stroke={signal} strokeWidth="1" strokeDasharray="3 3" />
            <text x="100" y="74" fill={signal} fontSize="9" fontFamily="'JetBrains Mono', monospace">
              GATEWAY
            </text>
          </g>
          <text x="40" y="240" fill={signal} fontSize="10" fontFamily="'JetBrains Mono', monospace">
            SUB-GHZ TELEMETRY // 4.2 KM PACKET MESH
          </text>
        </svg>
      );

    default:
      return (
        <div className={`w-full h-full bg-[#15151b] flex items-center justify-center ${className}`}>
          <span className="font-mono text-xs text-signal">CIRCUIT SCHEMATIC // CAD</span>
        </div>
      );
  }
};
