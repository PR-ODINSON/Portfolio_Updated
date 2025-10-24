# 🚀 Prithviraj Verma - AI/ML Engineer Portfolio

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen)](https://your-portfolio-url.com)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.13-blue)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23.21-purple)](https://www.framer.com/motion/)

A modern, animated portfolio website showcasing the work of **Prithviraj Verma**, an AI/ML Engineer and Full-Stack Developer with production experience and published research in biomedical signal processing.

## ✨ Features

- 🎨 **Modern Design** - Sleek, professional UI with glassmorphism effects
- 🌟 **Smooth Animations** - Powered by Framer Motion for engaging user experience
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **High Performance** - Built with Vite for lightning-fast loading
- 🎯 **Interactive Elements** - Hover effects, animated transitions, and micro-interactions
- 📧 **Contact Form** - Functional contact form with EmailJS integration
- 🔍 **SEO Optimized** - Proper meta tags and semantic HTML structure
- 🎭 **Custom Favicon** - Stylish "P" logo with modern design
- 🎪 **Dynamic Content** - Animated text effects and scroll-triggered animations

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.1.7** - Next-generation frontend tooling
- **Tailwind CSS 4.1.13** - Utility-first CSS framework

### Animations & UI
- **Framer Motion 12.23.21** - Production-ready motion library
- **Lucide React** - Beautiful, customizable icons
- **React Icons** - Popular icon library
- **Lenis** - Smooth scrolling library

### Forms & Validation
- **React Hook Form 7.63.0** - Performant forms with easy validation
- **Zod 4.1.11** - TypeScript-first schema validation
- **EmailJS** - Send emails directly from client-side

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio-22Oct.git
   cd portfolio-22Oct/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the frontend directory:
   ```env
   # EmailJS Configuration for Contact Form
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📧 EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
4. Get your Service ID, Template ID, and Public Key
5. Add them to your `.env` file

## 🎨 Customization

### Personal Information
- **Hero Section**: Update `src/components/Hero.tsx`
- **About Section**: Modify `src/components/About.tsx`
- **Contact Info**: Edit `src/components/Contact.tsx`

### Content Updates
- **Skills**: Update tech stack in `src/components/Skills.tsx`
- **Projects**: Add/modify projects in `src/components/Projects.tsx`
- **Experience**: Update work experience in `src/components/Experience.tsx`
- **Achievements**: Modify achievements in `src/components/Achievements.tsx`
- **Research**: Update research papers in `src/components/Research.tsx`

### Styling & Branding
- **Colors**: Modify color scheme in `src/index.css`
- **Fonts**: Update font families in `src/fonts.css`
- **Favicon**: Replace `public/favicon.svg`
- **Images**: Update images in `public/` directory

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── achievements/      # Achievement images
│   ├── projects/         # Project screenshots
│   ├── favicon.svg       # Custom favicon
│   └── ...
├── src/
│   ├── components/       # React components
│   │   ├── Hero.tsx     # Landing section
│   │   ├── About.tsx    # About section with detailed info
│   │   ├── Navbar.tsx   # Navigation with sexy styling
│   │   ├── Skills.tsx   # Interactive skills showcase
│   │   ├── Projects.tsx # Project portfolio
│   │   ├── Contact.tsx  # Contact form
│   │   └── ...         # Other components
│   ├── utils/
│   │   ├── api.ts      # EmailJS integration
│   │   └── animations.ts # Animation variants
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # App entry point
│   ├── index.css       # Global styles & Tailwind
│   └── fonts.css       # Font imports
├── package.json        # Dependencies and scripts
├── tailwind.config.ts  # Tailwind configuration
├── vite.config.ts      # Vite configuration
└── tsconfig.json       # TypeScript configuration
```

## 🌟 Key Highlights

### About Prithviraj Verma
- 🎓 **Pre-final year student** with production experience
- 🧠 **AI/ML Engineer** with published research in biomedical signal processing
- 💼 **Currently building** LLM-powered automation systems at Garnet AI
- 📊 **Impact**: Reducing manual workflow time by 28% across 1000s enterprise clients
- 📝 **Research**: Co-authored IEEE Access paper with 98.34% accuracy improvement
- 👨‍🏫 **Leadership**: Mentored 50+ students, increased ML adoption by 65%

### Core Expertise
- **Machine Learning**: TensorFlow, PyTorch, Scikit-Learn, Computer Vision
- **Full-Stack Development**: React, Node.js, MongoDB, RESTful APIs
- **Research**: Signal Processing, Deep Learning, Academic Publications
- **Tools**: Docker, Git, AWS/GCP, Data Visualization

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Add environment variables in Project Settings
4. Deploy automatically on every push

### Other Platforms
This portfolio can be deployed to any static hosting service:
- **Netlify** - Drag and drop deployment
- **GitHub Pages** - Free hosting for GitHub repos
- **AWS S3 + CloudFront** - Scalable cloud hosting
- **Firebase Hosting** - Google's hosting solution

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+ across all metrics
- 🚀 **First Contentful Paint**: < 1.5s
- 📱 **Mobile Optimized**: Responsive design for all devices
- 🎯 **SEO Friendly**: Semantic HTML and meta tags

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Prithviraj Verma**
- 📧 Email: prithraj120@gmail.com
- 💼 LinkedIn: [Your LinkedIn Profile]
- 🐙 GitHub: [Your GitHub Profile]
- 🌐 Portfolio: [Your Portfolio URL]

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ by Prithviraj Verma
