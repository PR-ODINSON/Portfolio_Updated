# Portfolio — Premium AI/ML Portfolio (Prithviraj Verma)

## Original Problem
Transform the existing portfolio (github.com/PR-ODINSON/Portfolio_Updated) into a premium modern
AI-engineer portfolio inspired by OriginKit, Linear, Vercel, Raycast, and Aceternity UI.
Keep all content, sections and typography hierarchy intact. Add interactive premium effects.

## Sections (order preserved)
Hero → Research → Projects → Experience → Achievements → Leadership → Contact

## Tech Stack
- Vite + React 19 + TypeScript + Tailwind 4
- Framer Motion, Lenis smooth-scroll
- No backend (static site)

## Design System (2026-01)
- Premium dark theme (`#05070F`), elevated card `#0B0D18`
- Subtle cyan accent (`#22d3ee` / `#67e8f9`)
- Body Inter, Display Space Grotesk, Mono JetBrains Mono
- Increased whitespace, GPU-accelerated effects, respects prefers-reduced-motion

## Effect Library (custom, `src/components/effects/*`)
- ReactiveGrid – proximity canvas dot grid (hero bg)
- ParticleSphere – rotating Fibonacci sphere (hero bg-right)
- MouseSpotlight – global soft radial glow follow
- SpotlightText – dim → bright reveal via mask (available, currently unused in hero to keep base bright)
- ScrambleText – char-lock decode animation (hero subtitle)
- PixelCard – hover pixel-canvas shimmer wrap
- ElectricBorder – noise-displaced glowing border
- ShinyPill – sweeping shine text (contact CTA)
- DirectionHover – top/bottom-swap accent title (project titles)
- StardustBackground – twinkling particle bg (contact)
- CharacterWaves – per-character reveal (leadership title)
- TiltCard – 3D pointer tilt (project cards)

## Section Enhancements
- **Hero**: Reactive Grid + Particle Sphere + Mouse Spotlight, animated EEG glyph,
  gradient stats counter, magnetic gradient CTA, scramble subtitle
- **Navbar**: glass blur on scroll, hide/reveal on scroll direction, animated
  cyan underline for active section (IntersectionObserver), magnetic Resume CTA
- **Research**: Pixel Card + Electric Border on sticky Focus card, cyan spine paper
  cards with slide-in reveal, DOI badges with hover Link Preview tooltip
- **Projects**: Pixel Card + Electric Border (featured) + 3D tilt + Direction Hover titles
  + animated tech chips (cyan hover fill)
- **Experience**: scroll-driven cyan timeline growth, dot glow, Text Lift on company,
  cards fade+slide+outline on hover
- **Achievements**: Electric Border on flagship cards, counter animations with
  scale bump, hover elevation
- **Leadership**: pointer-follow radial cyan glow on cards, Character Waves title
- **Contact**: Stardust bg, cyan REAL glow, magnetic Send Email w/ Shiny Pill sweep
- **Global**: Lenis smooth scroll (pre-existing), reduced-motion honored throughout

## Implemented / Files Changed (2026-01-21)
- New: `src/components/effects/` (12 files)
- Overwrote: `Hero.tsx`, `Navbar.tsx`, `Research.tsx`, `Projects.tsx`, `Experience.tsx`,
  `Achievements.tsx`, `Leadership.tsx`, `Contact.tsx`
- Updated CSS tokens in `src/index.css` for premium dark unified theme
- Added `start` script in `package.json`, `server.allowedHosts: true` in `vite.config.ts`
- Replaced deprecated `react-icons/si` `SiLinkedin` with `react-icons/fa6` `FaLinkedin`

## Next / Backlog
- P1: Optional page transitions between routes (single route today)
- P2: Add real Link Preview using microlink.io API for external DOI links
- P2: Prefer-reduced-motion polish audit
- P3: Ligher-weight canvas alternative for very old devices

## Enhancement idea (portfolio conversion booster)
Consider adding a floating "Available for hire" pill in Navbar (Shiny Pill style, cyan)
linking to Contact — recruiters see intent immediately and click-through jumps.
