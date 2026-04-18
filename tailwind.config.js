/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary-fixed": "#3b0520",
        "on-error-container": "#93000a",
        "on-tertiary-fixed-variant": "#71314c",
        "surface": "#f8f9fa",
        "surface-container-high": "#e7e8e9",
        "background": "#f8f9fa",
        "on-tertiary-container": "#ffaac8",
        "on-secondary-fixed": "#2a1700",
        "on-secondary": "#ffffff",
        "error-container": "#ffdad6",
        "outline-variant": "#c2c9bb",
        "surface-tint": "#3b6934",
        "surface-container-highest": "#e1e3e4",
        "on-surface-variant": "#42493e",
        "surface-bright": "#f8f9fa",
        "on-primary-fixed": "#002201",
        "secondary-fixed": "#ffddb8",
        "primary-fixed": "#bcf0ae",
        "on-secondary-container": "#684000",
        "surface-container": "#edeeef",
        "on-error": "#ffffff",
        "inverse-surface": "#2e3132",
        "error": "#ba1a1a",
        "surface-dim": "#d9dadb",
        "on-surface": "#191c1d",
        "tertiary-fixed-dim": "#ffb0cc",
        "on-tertiary": "#ffffff",
        "primary-fixed-dim": "#a1d494",
        "surface-variant": "#e1e3e4",
        "inverse-on-surface": "#f0f1f2",
        "tertiary-container": "#7c3a55",
        "on-secondary-fixed-variant": "#653e00",
        "on-background": "#191c1d",
        "on-primary-fixed-variant": "#23501e",
        "primary-container": "#2d5a27",
        "secondary-fixed-dim": "#ffb95f",
        "surface-container-low": "#f3f4f5",
        "tertiary": "#60233e",
        "on-primary-container": "#9dd090",
        "surface-container-lowest": "#ffffff",
        "outline": "#72796e",
        "secondary-container": "#fea619",
        "secondary": "#855300",
        "primary": "#154212",
        "on-primary": "#ffffff",
        "tertiary-fixed": "#ffd9e4",
        "inverse-primary": "#a1d494"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms')
  ],
}
