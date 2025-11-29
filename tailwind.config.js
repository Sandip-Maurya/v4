/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dolce Fiore brand colors
        beige: {
          50: '#faf9f7',
          100: '#f5f3f0',
          200: '#e8e4dd',
          300: '#d4ccc0',
          400: '#b8ab9a',
          500: '#9d8d7a',
          600: '#7a6b5c',
          700: '#5d5146',
          800: '#4a4037',
          900: '#3d352e',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
        },
        gold: {
          50: '#fefdf8',
          100: '#fef9e7',
          200: '#fdf1c4',
          300: '#fbe596',
          400: '#f8d366',
          500: '#f5c842',
          600: '#e6a91a',
          700: '#c08514',
          800: '#9a6716',
          900: '#7d5516',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'Inter, sans-serif',
          },
        },
      },
    },
  },
  plugins: [],
}

