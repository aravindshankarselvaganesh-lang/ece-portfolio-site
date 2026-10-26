import React from 'react';

interface PortraitSilhouetteProps {
  className?: string;
  variant?: 'hero' | 'about';
}

export const PortraitSilhouette: React.FC<PortraitSilhouetteProps> = ({
  className = '',
  variant = 'hero',
}) => {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 600 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain filter contrast-125"
      >
        <defs>
          <linearGradient id="silhouetteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e24" />
            <stop offset="50%" stopColor="#0d0d0f" />
            <stop offset="100%" stopColor="#050507" />
          </linearGradient>
          <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#39FF88" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="cardGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
          </radialGradient>
          <pattern id="reticleGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#39FF88" strokeWidth="0.5" strokeOpacity="0.1" />
          </pattern>
        </defs>

        {variant === 'about' && (
          <rect width="600" height="800" fill="url(#cardGlow)" />
        )}

        {/* Technical reticle background */}
        <rect width="600" height="800" fill="url(#reticleGrid)" />

        {/* Head & Shoulders Silhouette Path */}
        <g id="portrait-body">
          {/* Main silhouette shape */}
          <path
            d="M 300 130
               C 230 130, 205 175, 205 240
               C 205 285, 220 340, 240 375
               C 210 395, 140 430, 95 480
               C 60 520, 40 575, 30 650
               C 25 690, 20 740, 20 800
               L 580 800
               C 580 740, 575 690, 570 650
               C 560 575, 540 520, 505 480
               C 460 430, 390 395, 360 375
               C 380 340, 395 285, 395 240
               C 395 175, 370 130, 300 130 Z"
            fill="url(#silhouetteGrad)"
            stroke="url(#edgeGlow)"
            strokeWidth="1.5"
          />

          {/* Collar / Lapel Geometry */}
          <path
            d="M 260 410 L 300 520 L 340 410"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            strokeOpacity="0.2"
          />
          <path
            d="M 230 430 L 260 490 L 300 590 L 340 490 L 370 430"
            fill="none"
            stroke="#39FF88"
            strokeWidth="0.8"
            strokeOpacity="0.3"
          />

          {/* Chin and Jaw Contour */}
          <path
            d="M 245 280 C 255 330, 280 355, 300 355 C 320 355, 345 330, 355 280"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeOpacity="0.25"
          />

          {/* Hair Volume Edge Highlights */}
          <path
            d="M 215 220 C 210 170, 245 145, 300 145 C 355 145, 390 170, 385 220 C 375 190, 340 175, 300 175 C 260 175, 225 190, 215 220 Z"
            fill="#ffffff"
            fillOpacity="0.08"
          />
        </g>

        {/* Technical Coordinate Annotations & Signals */}
        <g opacity="0.6">
          <circle cx="300" cy="240" r="4" fill="#39FF88" />
          <line x1="280" y1="240" x2="320" y2="240" stroke="#39FF88" strokeWidth="0.8" />
          <line x1="300" y1="220" x2="300" y2="260" stroke="#39FF88" strokeWidth="0.8" />

          {/* Calibrated Measurement Marks */}
          <text x="330" y="244" fill="#39FF88" fontSize="10" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">
            REF // CH-01 [94.2%]
          </text>
          
          <path d="M 50 750 H 130" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
          <text x="50" y="740" fill="#ffffff" fillOpacity="0.4" fontSize="9" fontFamily="'JetBrains Mono', monospace">
            ARAVIND SHANKAR — SYSTEM PROFILE
          </text>
        </g>
      </svg>
    </div>
  );
};
