/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gcp: {
          blue: "#4285F4",
          red: "#EA4335",
          yellow: "#FBBC04",
          green: "#34A853",
          navy: "#1A73E8",
          dark: "#202124",
          light: "#F8F9FA",
        },
      },
    },
  },
  plugins: [],
};
