# Aravind Shankar — ECE Hardware & Embedded Systems Portfolio

An Awwwards-inspired, scroll-driven interactive portfolio website engineered for an Electronics and Communication Engineering (ECE) student specializing in embedded systems, high-speed PCB design, VLSI/FPGA design, and signal processing.

Built strictly according to the 8 reference screenshots with the creative concept **"From signal to system."** The design emulates precision laboratory instrumentation: crisp monochrome aesthetics, hard chapter transitions, and phosphor-green (`#39FF88`) signal telemetry accents.

---

## ⚡ Architecture & Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables & 3D Perspective Transforms
- **Animation & Scroll Mechanics**:
  - **Lenis**: Smooth scrolling with `easeOutExpo` easing
  - **GSAP 3**: `ScrollTrigger`, `quickTo` physics, velocity-driven skew & blur, and timeline orchestration
- **Visuals & Art**:
  - Pure SVG inline vector schematics (no generic stock photos)
  - 2D Canvas Simplex noise flow field (radio wave simulation with pointer interference)
  - SVG `feTurbulence` analog film grain overlay
  - Custom interactive cursor with `mix-blend-mode: difference` and dynamic action ring
- **Content Single Source of Truth**: All data and copy reside in `src/content/content.ts`

---

## 📸 Section Mapping to Reference Screenshots

| Section | Chapter & Theme | Visual Elements & Motion Mechanics |
|---|---|---|
| **1. Hero** *(Screenshot 1)* | Light (`--paper`) | Two-line display headline (`FROM SIGNAL` / `TO SYSTEM`), cut-out grayscale portrait overlapping headline, 1px traveling oscilloscope waveform line, mouse parallax, EST. 2023 label, and circular scroll trigger. |
| **2. About** *(Screenshot 2)* | Dark (`--ink`) | Full-bleed black chapter with 1,500-particle Simplex vector flow field (radio wave trails with cursor interference), center dark glass portrait card with sweeping diagonal light beam, split headline (`ABOUT` / `ME`) with entry text-glitch, and pinned scrubbed reveal of bio facts. |
| **3. Experience** *(Screenshots 3 & 4)* | Dark (`--ink`) | Pinned horizontal-scroll chapter (`WHERE I'VE BEEN`) across 4 panels. Giant outlined background words (`EMBEDDED`, `PCB`, `VLSI`, `IoT`) moving with 0.5x parallax, filter tabs (`LEARNING`, `INTERNSHIPS`, `CLUB`), top-right progress line with active year, and velocity-based motion blur & skewX on scrubbing. |
| **4. Hardware Builds** *(Screenshot 5)* | Light (`--paper`) | Curved perspective-warped strip of 6 project cards (alternating dark & light) in a 3D wave (`perspective: 1200px`, `rotateY`, `translateZ`), horizontal drag/wheel/arrow cycling, active caption with counter (`01 / 06`), and bold `HARDWARE BUILDS` typography bottom-left. |
| **5. Works Drum** *(Screenshot 6)* | Light (`--paper`) | 6 project cards positioned on a hexagonal rotor around center text `WORKS '26`, top-right active project list, wheel and drag rotation with inertia, and full-screen modal trigger on click. |
| **6. What I Build** *(Screenshot 7)* | Light (`--paper`) | Heading `WHAT I CAN BUILD` with 900ms text-scramble reveal, 5 service rows shifting on hover with other rows dimming, cursor-following floating preview illustration card with subtle tilt, and bottom floating black deliverable bar across the chapter seam. |
| **7. Contact** *(Screenshot 8)* | Dark (`--ink-2`) | Giant centered `LET'S TALK` where each individual letter lifts 8px on hover, magnetic pill buttons (`INSTAGRAM`, `LINKEDIN`, `GITHUB`, and highlighted white `CONTACT ME`), live IST clock, and footer credits. |
| **Overlay** | Modal Inspection | Full-screen dark panel sliding up (`clip-path` inset transition) with hardware specification table (MCU, sensors, protocol, tools), engineering build log story, and GitHub / schematic links. |

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build & Test
```bash
npm run build
npm run preview
```

---

## ✏️ How to Edit Content

All text, projects, services, social links, and metadata are cleanly separated into:
```
src/content/content.ts
```
To customize the portfolio:
1. Open `src/content/content.ts`.
2. Edit student details in `portfolioContent.meta` (name, tagline, university, location).
3. Add or modify projects in `portfolioContent.works.projects` (specs, build stories, GitHub links, schematics).
4. Update services in `portfolioContent.services.items`.
5. Update experience panels in `portfolioContent.experience.panels`.

No components hardcode copy or branding.

---

## 🖼️ How to Add or Replace Portrait Images

The portfolio uses two portrait files located in `public/images/`:
- `public/images/portrait-cutout.png`: A transparent PNG of head and shoulders for the Hero section. It sits directly in front of the headline text with bottom gradient fading.
- `public/images/portrait-about.jpg`: A grayscale photograph of the engineer at the lab bench for the About section glass card.

> **Fallback Guarantee**: If either image is missing or fails to load, the built-in `<PortraitSilhouette />` SVG component renders automatically with calibrated technical reticles and signal accents so the layout never breaks.

---

## 🌐 Deployment to Netlify or Vercel

The application is a pure client-side static bundle with zero server dependencies:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### Deploying to Vercel:
```bash
npx vercel
```

### Deploying to Netlify:
```bash
npx netlify deploy --prod --dir=dist
```
