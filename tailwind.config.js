/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: "#FFF2EE",
          100: "#FFDCD3",
          300: "#F89A83",
          400: "#F47C61",
          500: "#F06A4D",
          600: "#D9573F",
          700: "#B94734",
        },
        chartreuse: {
          50: "#F7FCE8",
          100: "#EBF8C8",
          300: "#D8F47F",
          400: "#C7F05A",
          500: "#B8E545",
          600: "#A0CA36",
        },
      },
      backgroundColor: {
        "custom-bg": "#141414",
        "grey-bg": "#1D1D1B",
        "custom-coral": "#F06A4D",
        "form-bg": "#292927",
        "paper-bg": "#FAFAF8",
        "surface-bg": "#F2F2EE",
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 40s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      backgroundColor: {
        "custom-bg": "#151312",
        "grey-bg": "#1C1A19",
        "custom-coral": "#FA651E",
        "form-bg": "#363334",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
