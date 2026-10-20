import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        '2xs': '0 1px 1px 0 rgb(0 0 0 / 0.04)',
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        celikpen: {
          dark: '#0F172A',
          glass: '#0284C7',
          cta: '#D91B24',
          'cta-hover': '#B31219',
          brand: '#0B1560',
          'brand-soft': '#004A8F',
          surface: '#FAF9F5',
          subtle: '#F3F1EC',
          border: '#E5E3DC',
        },
      },
    },
  },
  plugins: [],
};

export default config;
