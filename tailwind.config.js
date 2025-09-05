/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust if you use React/Vue/Svelte
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0d10",
        card: "#101418",
        muted: "#cdd6f4",
        text: "#e6e8ee",
        "text-dim": "#a5afc7",
        primary: "#7c5cff",
        accent: "#00d1ff",
      },
      borderRadius: {
        DEFAULT: "16px",
        lg: "24px",
      },
      boxShadow: {
        custom: "0 10px 30px rgba(0,0,0,.35), 0 2px 6px rgba(0,0,0,.25)",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulse: "pulse 3s infinite",
        rotate: "rotate 20s linear infinite",
        fadeUp: "fadeUp 1s ease forwards",
        fadeDown: "fadeDown 1s ease forwards",
      },
    },
  },
  plugins: [],
};
