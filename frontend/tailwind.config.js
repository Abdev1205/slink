/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,md}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        openSans: ["var(--font-open-sans)"],
      },
      screens: {
        'md_desktop': '1200px',
        'sm_desktop': '1100px',
        'xsm_desktop': '1020px',
        'lg_tab': '800px',
        'md_phone': '530px',
        'phone': "470px",
        'sm_phone': '380px',
      },
    },
  },
  plugins: [],
};
