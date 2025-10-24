import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // Add more paths as needed for your project
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Custom colors used in the component
        'custom-cyan': '#8eecf5',
      },
      backgroundImage: {
        // If needed, extend gradients or other images
      },
    },
  },
  plugins: [],
};

export default config;