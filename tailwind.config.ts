import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      fontFamily: {
        sans: [
          'var(--font-poppins)',
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
      },
      colors: {
        celikpen: {
          dark: '#0F172A',
          glass: '#0284C7',
          brand: '#0B1560',
          'brand-soft': '#004A8F',
          navy: '#1E3A8A',
          'navy-hover': '#1D4ED8',
          'navy-deep': '#172554',
          ice: '#EFF6FF',
          'ice-border': '#BFDBFE',
          'ice-strong': '#DBEAFE',
          green: '#10B981',
          'green-dark': '#059669',
          crimson: '#D91B24',
          'crimson-dark': '#B31219',
          cta: '#1E3A8A',
          'cta-hover': '#1D4ED8',
          surface: '#F8FAFC',
          subtle: '#F1F5F9',
          border: '#E2E8F0',
          text: '#1E293B',
          muted: '#64748B',
        },
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        card: '16px',
        panel: '24px',
      },
      boxShadow: {
        '2xs': '0 1px 1px 0 rgb(15 23 42 / 0.04)',
        xs: '0 1px 2px 0 rgb(15 23 42 / 0.05)',
        soft: '0 10px 30px -12px rgb(15 23 42 / 0.12)',
        card: '0 18px 45px -24px rgb(15 23 42 / 0.22)',
        navy: '0 16px 34px -16px rgb(30 58 138 / 0.38)',
        header: '0 10px 30px -18px rgb(15 23 42 / 0.18)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translate3d(0, 14px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 520ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 400ms ease both',
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        marquee: 'marquee 34s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
