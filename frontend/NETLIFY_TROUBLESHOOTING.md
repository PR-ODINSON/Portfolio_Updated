# 🔧 Netlify Deployment Troubleshooting

## ✅ Issues Fixed

### 1. **Cross-platform Build Script Issue**
- **Problem**: `cp _redirects dist/` command doesn't work on all systems
- **Solution**: Moved `_redirects` to `public/` folder and created Node.js build script

### 2. **TypeScript Strict Mode Issues**
- **Problem**: Strict TypeScript settings causing build failures
- **Solution**: Relaxed `noUnusedLocals` and `noUnusedParameters` settings

### 3. **Memory Issues**
- **Problem**: Build running out of memory
- **Solution**: Added `NODE_OPTIONS = "--max-old-space-size=4096"` to netlify.toml

## 🚀 Current Configuration

### Build Settings
- **Base directory**: `frontend/`
- **Build command**: `npm ci && npm run build:netlify`
- **Publish directory**: `frontend/dist/`
- **Node version**: 18

### Files Structure
```
frontend/
├── public/
│   └── _redirects          # SPA routing (auto-copied to dist/)
├── build.js               # Custom build script
├── netlify.toml           # Netlify configuration
└── package.json           # Updated scripts
```

## 🐛 If Build Still Fails

### Step 1: Test Locally
```bash
cd frontend
npm ci
npm run build:netlify
```

### Step 2: Check Common Issues

1. **Missing Environment Variables**
   ```bash
   # Add these in Netlify Dashboard → Site Settings → Environment Variables
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

2. **Node Version Mismatch**
   - Netlify should use Node 18 (set in netlify.toml)
   - If issues persist, try Node 16 or 20

3. **Dependency Issues**
   - Clear node_modules: `rm -rf node_modules package-lock.json`
   - Reinstall: `npm install`

### Step 3: Alternative Build Commands

If the current build fails, try these alternatives in Netlify settings:

**Option 1: Simple Build**
```bash
npm install && npm run build
```

**Option 2: Force Clean Install**
```bash
rm -rf node_modules && npm ci && npm run build
```

**Option 3: Skip TypeScript Checks**
```bash
npm install && npx vite build --mode production
```

### Step 4: Manual Deployment Fallback

If automated deployment fails:

1. **Build locally**:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy manually**:
   - Go to Netlify dashboard
   - Drag and drop the `dist/` folder
   - Set environment variables in Site Settings

## 📋 Deployment Checklist

Before deploying, ensure:

- [ ] All files are committed to Git
- [ ] Environment variables are set in Netlify
- [ ] Build works locally (`npm run build:netlify`)
- [ ] All images/assets are in `public/` folder
- [ ] No TypeScript errors in components

## 🆘 Getting Help

If you're still having issues:

1. **Share the full build log** from Netlify (last 50-100 lines)
2. **Test locally** and share any error messages
3. **Check browser console** for runtime errors after deployment

## 📞 Quick Fixes

### "Cannot find module" errors
```bash
# Add missing dependency
npm install [missing-package-name]
```

### "Out of memory" errors
```bash
# Increase memory in netlify.toml (already done)
NODE_OPTIONS = "--max-old-space-size=8192"
```

### "Permission denied" errors
```bash
# Make build script executable
chmod +x build.js
```

---

🎯 **Most common fix**: Clear cache and redeploy
- Netlify Dashboard → Deploys → Clear cache and deploy site
