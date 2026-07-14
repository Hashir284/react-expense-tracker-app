/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#030712',       // Obsidian Black
          surface: '#0b0f19',  // Deep Space Blue/Gray
          border: '#1f293d',   // Tech Border
          accent: '#4f46e5',   // Electric Indigo
          neonGreen: '#10b981',// Cyber Mint
          neonRed: '#f43f5e',  // Neon Coral
        }
      }
    },
  },
  plugins: [],
}