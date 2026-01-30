/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': '#0a0a0a',     // Near black - main background
        'bg-secondary': '#111111',   // Slightly lighter - cards/sections
        'bg-tertiary': '#1a1a1a',    // Even lighter - hover states
        
        // Text colors
        'text-primary': '#f5f5f5',   // Near white - primary text
        'text-secondary': '#a3a3a3', // Gray - secondary text
        'text-tertiary': '#737373',  // Darker gray - meta text
        
        // Accent colors
        'accent-primary': '#ffffff',  // Pure white - emphasis
        'accent-secondary': '#525252', // Medium gray - borders
        
        // Border colors  
        'border-default': '#262626',  // Subtle borders
        'border-hover': '#404040',    // Hover borders
      },
      fontFamily: {
        sans: ['Courier New', 'Courier', 'monospace'],
        serif: ['Courier New', 'Courier', 'monospace'],
        mono: ['Courier New', 'Courier', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',    // 12px
        'sm': '0.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.25rem',    // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '3': '0.75rem',   // 12px
        '4': '1rem',      // 16px
        '5': '1.25rem',   // 20px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '10': '2.5rem',   // 40px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
      },
    },
  },
  plugins: [],
};

