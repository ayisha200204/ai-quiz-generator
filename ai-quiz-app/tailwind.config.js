module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {

      animation: {
        fadeIn: "fadeIn 0.6s ease forwards",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" }
        }
      }

    },
  },
  plugins: [],
};

