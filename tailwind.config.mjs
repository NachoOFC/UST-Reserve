export default {
  content: [
    './app.vue',
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'ust': {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce4bc',
          300: '#8fd18f',
          400: '#5bb55b',
          500: '#3a9a3a', // Verde principal UST
          600: '#2d7a2d',
          700: '#256025',
          800: '#1f4d1f',
          900: '#1a401a',
          950: '#0d220d',
        },
        'ust-accent': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 