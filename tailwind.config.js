/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "",
  theme: {
    extend: {
      backgroundImage: {
        "tag-gradient":
          "linear-gradient(130.42deg, #FFD385 21.36%, #CBA05A 96.73%)"
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
        rotateExpand: "rotateExpand 0.3s ease-in-out forwards",
        rotateCollapse: "rotateCollapse 0.3s ease-in-out forwards",
        slideUp: "slideUp 0.2s ease-out forwards",
        slideDown: "slideDown 0.2s ease-out forwards",
        menuSlideUp: "menuSlideUp 0.3s ease-out forwards",
        menuSlideDown: "menuSlideDown 0.3s ease-out forwards",
        menuSlideLeft: "menuSlideLeft 0.1s ease-out forwards",
        menuSlideRight: "menuSlideRight 0.1s ease-out forwards",
        spin: "spin 1s linear infinite"
      },
      colors: {
        background: "#F6F6F6",
        primary: "#004CDF",
        custom: "rgba(255, 221, 228, 0.37)"
      },
      fontFamily: {
        avenir: ["avenir_next_lt_pro_regular-webfont", "sans"]
      },
      fontSize: {
        s: "13px"
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))"
      },
      keyframes: {
        rotateExpand: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg)" }
        },
        rotateCollapse: {
          "0%": { transform: "rotate(90deg)" },
          "100%": { transform: "rotate(0deg)" }
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" }
        },
        slideDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" }
        },
        menuSlideUp: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-50px)" }
        },
        menuSlideDown: {
          "0%": { opacity: "0", transform: "translateY(-50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        menuSlideLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" }
        },
        menuSlideRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" }
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      },
      fontFamily: {
        dmsans: ["DMSans", "sans-serif"]
      }
    }
  },

  plugins: []
};
