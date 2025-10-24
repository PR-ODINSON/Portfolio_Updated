# 🚀 Netlify Deployment Guide

## Pre-Deployment Checklist

### ✅ Required Files Created
- [x] `netlify.toml` - Netlify configuration
- [x] `_redirects` - SPA routing redirects
- [x] Updated `package.json` with postbuild script

### ✅ Environment Variables Needed
Set these in Netlify Dashboard → Site Settings → Environment Variables:

```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### ✅ Build Settings for Netlify
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/dist`
- **Node version**: 18 (automatically set via netlify.toml)

## 🚀 Deployment Steps

### Method 1: Git Integration (Recommended)

1. **Commit all changes**
   ```bash
   git add .
   git commit -m "Configure for Netlify deployment"
   git push origin main
   ```

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Configure build settings (see above)
   - Add environment variables
   - Click "Deploy site"

### Method 2: Manual Deployment

1. **Build locally**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy manually**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Configure environment variables in settings

## 🔧 Troubleshooting

### Common Issues

1. **404 on page refresh**
   - ✅ Fixed by `_redirects` file and `netlify.toml` redirects

2. **Build fails**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in `package.json`
   - Check build logs for specific errors

3. **Contact form not working**
   - Verify EmailJS environment variables are set
   - Check EmailJS service configuration
   - Test form in development first

4. **Assets not loading**
   - Check that all assets are in the `public` folder
   - Verify image paths are correct (relative to public)

### Build Commands Reference

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

## 📊 Performance Optimization

The following optimizations are already configured:

- ✅ **Caching headers** for static assets
- ✅ **Security headers** (XSS protection, etc.)
- ✅ **Immutable caching** for JS/CSS files
- ✅ **Font optimization** with proper loading strategies
- ✅ **Image optimization** recommendations in place

## 🌐 Custom Domain (Optional)

1. **Purchase domain** from any registrar
2. **Add custom domain** in Netlify → Domain Settings
3. **Configure DNS** as instructed by Netlify
4. **Enable HTTPS** (automatic with Netlify)

## 📈 Analytics & Monitoring

Consider adding:
- **Netlify Analytics** - Built-in analytics
- **Google Analytics** - Detailed user tracking
- **Hotjar** - User behavior analysis
- **Sentry** - Error monitoring

---

🎉 **Your portfolio is now ready for Netlify deployment!**
