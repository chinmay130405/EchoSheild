/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        danger: '#ef4444',
        success: '#10b981',
        warning: '#f59e0b'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'gradient-success': 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
        'gradient-danger': 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
      }
    }
  },
  plugins: []
}
