/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#111111",
        background: "#0F0F0F",
        surface: "#1C1C1C",
        card: "#242424",
        "text-primary": "#FFFFFF",
        "text-secondary": "#B3B3B3",
        accent: "#F4A261",
        border: "#2F2F2F",
      },

      backgroundColor: {
        primary: "#2563EB",
        secondary: "#111111",
        background: "#0F0F0F",
        surface: "#1C1C1C",
        card: "#242424",
      },

      textColor: {
        primary: "#FFFFFF",
        secondary: "#B3B3B3",
      },

      borderColor: {
        primary: "#2F2F2F",
      },

      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
        md: "0 4px 6px rgba(0, 0, 0, 0.4)",
        lg: "0 10px 15px rgba(37, 99, 235, 0.1)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.5)",
        glow: "0 0 20px rgba(37, 99, 235, 0.3)",
      },

      animation: {
        pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.6s ease-out",
      },

      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        slideUp: {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
    },
  },

  plugins: [],
};