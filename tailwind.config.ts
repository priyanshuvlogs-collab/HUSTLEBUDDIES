import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-dark': 'rgb(var(--bg-dark-rgb) / <alpha-value>)',
        'bg-light': 'rgb(var(--bg-light-rgb) / <alpha-value>)',
        'bg-elevated': 'rgb(var(--bg-elevated-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-primary-rgb) / <alpha-value>)',
        cta: 'rgb(var(--accent-secondary-rgb) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        'text-muted': 'rgb(var(--text-muted-rgb) / <alpha-value>)',
        ink: 'rgb(var(--text-on-light-rgb) / <alpha-value>)',
        'ink-muted': 'rgb(var(--text-on-light-muted-rgb) / <alpha-value>)',
        line: 'var(--line)',
      },
      fontFamily: {
        heading: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        body: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { content: '1200px' },
      borderRadius: { card: '16px' },
      backgroundImage: { 'accent-gradient': 'var(--accent-gradient)' },
    },
  },
  plugins: [],
} satisfies Config;
