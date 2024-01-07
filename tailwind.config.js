/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#F9872D",
        main: {
          900: "#0A0B0F",
          800: "#141519",
          700: "#1A1B1F",
          600: "#2E2F34",
          500: "#404145",
          400: "#525357",
          300: "#646569",
          200: "#76777C",
          100: "#88898D",
          50: "#AAAAAF",
        },
      },
    },
  },
  safelist: [
    "hover:ring-[var(--bash-color)]",
    "hover:ring-[var(--c-color)]",
    "hover:ring-[var(--csharp-color)]",
    "hover:ring-[var(--cpp-color)]",
    "hover:ring-[var(--css-color)]",
    "hover:ring-[var(--html-color)]",
    "hover:ring-[var(--java-color)]",
    "hover:ring-[var(--javascript-color)]",
    "hover:ring-[var(--kotlin-color)]",
    "hover:ring-[var(--nextjs-color)]",
    "hover:ring-[var(--nodejs-color)]",
    "hover:ring-[var(--php-color)]",
    "hover:ring-[var(--python-color)]",
    "hover:ring-[var(--react-color)]",
    "hover:ring-[var(--ruby-color)]",
    "hover:ring-[var(--rust-color)]",
    "hover:ring-[var(--swift-color)]",
    "hover:ring-[var(--typescript-color)]",
  ],
};
