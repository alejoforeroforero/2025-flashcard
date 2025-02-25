/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e293b', // Slate blue-gray (background)
          light: '#334155',   // Lighter slate
          dark: '#0f172a',    // Darker slate
          card: '#fff',
        },
        secondary: {
          DEFAULT: '#f1f5f9', // Very light slate
          light: '#ffffff',
          dark: '#e2e8f0',
          card: '#fff',
        },
        accent: {
          DEFAULT: '#f59e0b',  // Amber yellow
          hover: '#d97706',    // Darker amber for hover
          secondary: '#3b82f6', // Bright blue as secondary accent
        },
        success: {
          DEFAULT: '#10b981', // Emerald green
        },
        warning: {
          DEFAULT: '#f59e0b', // Amber
        },
        error: {
          DEFAULT: '#ef4444', // Red
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
