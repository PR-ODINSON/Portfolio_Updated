#!/usr/bin/env node

// Simple build script for Netlify deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('🚀 Starting build process...');
  
  // Run TypeScript compilation and Vite build
  console.log('📦 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Copy _redirects file to dist directory
  const redirectsSource = path.join(__dirname, 'public', '_redirects');
  const redirectsTarget = path.join(__dirname, 'dist', '_redirects');
  
  if (fs.existsSync(redirectsSource)) {
    console.log('📄 Copying _redirects file...');
    fs.copyFileSync(redirectsSource, redirectsTarget);
    console.log('✅ _redirects file copied successfully');
  }
  
  console.log('🎉 Build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
