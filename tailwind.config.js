/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#16a34a',
          bg: '#dcfce7',
        },
        yellow: {
          DEFAULT: '#ca8a04',
          bg: '#fef9c3',
        },
        red: {
          DEFAULT: '#dc2626',
          bg: '#fee2e2',
        },
        blue: {
          DEFAULT: '#2563eb',
          bg: '#dbeafe',
        },
        orange: {
          DEFAULT: '#ea580c',
          bg: '#fff7ed',
        },
        gray: {
          DEFAULT: '#6b7280',
          bg: '#f3f4f6',
        },
        dark: '#1f2937',
        border: '#e5e7eb',
      },
    },
  },
  plugins: [],
}
