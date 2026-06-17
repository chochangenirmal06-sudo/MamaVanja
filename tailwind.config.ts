import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-green':      'var(--brand-green)',
        'brand-dark-green': 'var(--brand-dark-green)',
        'brand-teal':       'var(--brand-teal)',
        'brand-lavender':   'var(--brand-lavender)',
        'brand-cream':      'var(--brand-cream)',
      },
      fontFamily: {
        // CSS-variable-driven — swap the var to change the font everywhere at once
        display: ['var(--font-display)', 'Georgia', 'serif'],        // EB Garamond → H1
        sans:    ['var(--font-sans)', 'system-ui', 'sans-serif'],    // Jost → body/paragraph
        mono:    ['var(--font-mono)', 'Courier New', 'monospace'],   // JetBrains Mono → UI
      },
      maxWidth: {
        'hero-headline': '1280px',
        'hero-sub':      '720px',
        'demo':          '760px',
      },
    },
  },
  plugins: [],
};

export default config;
