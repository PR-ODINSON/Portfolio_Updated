# Prithviraj Verma — Animated Portfolio (React + Vite + Tailwind + Framer Motion)

A modern, responsive portfolio website showcasing Prithviraj Verma's work as an AI/ML Engineer and Full-Stack Developer.

## 🚀 Quick Start

```bash
npm install
npm run dev
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **React 19.1.1** + **Vite** + **TypeScript**
- **Tailwind CSS v4** (via `@import "tailwindcss"` in `src/index.css`)
- **Framer Motion** for smooth animations
- **React Hook Form** + **Zod** for contact form validation
- **EmailJS** for contact form functionality (no backend required)

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
# EmailJS Configuration for Contact Form
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Setting up EmailJS:
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Add them to your `.env` file

## 🎨 Customization

- **Personal Info**: Update `src/components/Hero.tsx` and `src/components/About.tsx`
- **Experience**: Modify `src/components/Experience.tsx`
- **Skills**: Update `src/components/Skills.tsx`
- **Projects**: Edit project data in `src/components/Projects.tsx`
- **Contact Info**: Update contact details in `src/components/Contact.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import repo on Vercel
3. Add environment variables in Vercel Project Settings
4. Deploy automatically

### Other Platforms
The portfolio is a static React app and can be deployed to:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Hero.tsx        # Landing section
│   ├── About.tsx       # About section with skills
│   ├── Experience.tsx  # Work experience
│   ├── Skills.tsx      # Skills visualization
│   ├── Projects.tsx    # Project showcase
│   ├── Contact.tsx     # Contact form
│   └── ...            # Other components
├── utils/
│   ├── api.ts         # EmailJS integration
│   └── animations.ts  # Animation variants
├── App.tsx            # Main app component
└── main.tsx          # App entry point
```

## ✨ Features

- **Responsive Design** - Works on all devices
- **Smooth Animations** - Powered by Framer Motion
- **Interactive Contact Form** - EmailJS integration
- **Modern UI** - Glassmorphism and gradient effects
- **Fast Performance** - Optimized with Vite
- **SEO Friendly** - Proper meta tags and structure

## 🎯 About Prithviraj Verma

Prithviraj Verma is an AI/ML Engineer and Full-Stack Developer specializing in:
- Building intelligent, scalable solutions
- Machine Learning and AI integration
- Modern web development with React and TypeScript
- Cloud architecture and deployment
- User experience design

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
