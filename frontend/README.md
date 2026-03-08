# Prithviraj Verma — Portfolio

Modern animated portfolio for an AI/ML Engineer & Full-Stack Developer, built with React + Vite + Tailwind CSS + Framer Motion. Deployed on **Netlify**.

## Quick Start

```bash
npm install
npm run dev       # development server
npm run build     # production build
npm run preview   # preview production build locally
```

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4**
- **Framer Motion** — animations
- **React Hook Form** + **Zod** — contact form validation
- **Formspree** — contact form backend (no server needed)

## Deployment (Netlify)

The site is configured for **Netlify** via [`netlify.toml`](netlify.toml).

| Setting | Value |
|---|---|
| Base directory | `frontend/` |
| Build command | `npm ci && npm run build` |
| Publish directory | `dist/` |
| Node version | 20 |

Push to the connected GitHub branch to trigger an auto-deploy.

## Project Structure

```
src/
├── components/     # Hero, About, Experience, Projects, Achievements, Research, Contact, Navbar, Footer, …
├── utils/
│   ├── api.ts      # EmailJS helper (legacy reference)
│   └── animations.ts
├── App.tsx
├── main.tsx
└── index.css       # Global styles & design tokens
public/
└── _redirects      # SPA routing for Netlify
```

## Customisation

| Section | File |
|---|---|
| Hero / summary | `src/components/Hero.tsx` |
| About & skills | `src/components/About.tsx` |
| Experience | `src/components/Experience.tsx` |
| Projects | `src/components/Projects.tsx` |
| Achievements | `src/components/Achievements.tsx` |
| Research papers | `src/components/Research.tsx` |
| Contact info | `src/components/Contact.tsx` |
