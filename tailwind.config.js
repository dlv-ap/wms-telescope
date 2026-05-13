/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans"', 'sans-serif'],
        heading: ['"Noto Sans"', 'sans-serif'],
        inter: ['"Noto Sans"', 'sans-serif'],
      },
      colors: {
        surface: { bg: '#f7f7f7', white: '#ffffff' },
        text: {
          primary: '#2b2b2b',
          heading: '#111111',
          dark: '#1f222e',
          description: '#8f9198',
          muted: '#737373',
          sub: '#444444',
        },
        border: { default: '#e6e6e6', light: '#e1e1e1' },
        status: {
          error: '#b71132',
          success: '#178c5c',
          warning: '#cca721',
          info: '#1d7dd1',
        },
        accent: {
          purple: '#7c3aed',
          green: '#059669',
          yellow: '#f59e0b',
          blue: '#5b80f7',
          red: '#ed1b36',
        },
        bg: {
          green: '#ecfdf5',
          yellow: '#fff6ea',
          blue: '#eff4ff',
          red: '#fdf0f2',
          greenLight: '#f3faf7',
          yellowLight: '#fefaec',
        },
        btn: { dark: '#0c0c0c', darkText: '#f2f2f2' },
      },
      fontSize: {
        '10': ['10px', '12px'],
        '12': ['12px', '16px'],
        '14': ['14px', '20px'],
        '16': ['16px', '24px'],
        '20': ['20px', '26px'],
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        full: '999px',
      },
    },
  },
  plugins: [],
}