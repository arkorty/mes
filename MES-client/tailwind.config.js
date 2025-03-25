module.exports = {
    theme: {
      extend: {
        animation: {
          "spin-slow": "rotateCube 3s linear infinite",
          "border-fill": "fillBorder 2s ease-in-out infinite alternate",
        },
        keyframes: {
          rotateCube: {
            "0%": { transform: "rotateX(0deg) rotateY(0deg)" },
            "100%": { transform: "rotateX(360deg) rotateY(360deg)" },
          },
          fillBorder: {
            "0%": { borderColor: "transparent" },
            "100%": { borderColor: "#16a34a" }, // Green border
          },
        },
      },
    },
  };
  