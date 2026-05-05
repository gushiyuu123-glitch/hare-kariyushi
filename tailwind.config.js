/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "clamp(20px, 4vw, 48px)",
        lg: "clamp(24px, 4vw, 56px)",
        xl: "clamp(28px, 4.5vw, 64px)",
      },
      screens: {
        lg: "1080px",
        xl: "1320px",
        "2xl": "1480px",
      },
    },

    extend: {
      /* =========================
         Colors
         CSS Variables Bridge
         ========================= */

      colors: {
        hare: {
          bg: "rgb(var(--hare-bg) / <alpha-value>)",
          surface: "rgb(var(--hare-surface) / <alpha-value>)",
          surfaceSoft: "rgb(var(--hare-surface-soft) / <alpha-value>)",
          surfaceDeep: "rgb(var(--hare-surface-deep) / <alpha-value>)",

          ink: "rgb(var(--hare-ink) / <alpha-value>)",
          text: "rgb(var(--hare-text) / <alpha-value>)",
          muted: "rgb(var(--hare-muted) / <alpha-value>)",
          faint: "rgb(var(--hare-faint) / <alpha-value>)",

          line: "rgb(var(--hare-line) / <alpha-value>)",
          lineSoft: "rgb(var(--hare-line-soft) / <alpha-value>)",

          wordmark: "rgb(var(--hare-wordmark) / <alpha-value>)",

          accent: "rgb(var(--hare-accent) / <alpha-value>)",
          accentSoft: "rgb(var(--hare-accent-soft) / <alpha-value>)",

          white: "rgb(var(--hare-white) / <alpha-value>)",
          overlayDark: "rgb(var(--hare-overlay-dark) / <alpha-value>)",
          overlayLight: "rgb(var(--hare-overlay-light) / <alpha-value>)",
        },
      },

      /* =========================
         Typography
         ========================= */

      fontFamily: {
        sans: ["var(--ff-sans)"],
        display: ["var(--ff-display)"],
      },

      fontWeight: {
        body: "var(--w-body)",
        label: "var(--w-label)",
        title: "var(--w-title)",
      },

      letterSpacing: {
        title: "var(--ls-title)",
        label: "var(--ls-label)",
        wide: "var(--ls-wide)",
      },

      lineHeight: {
        body: "var(--lh-body)",
        copy: "var(--lh-copy)",
        title: "var(--lh-title)",
      },

      fontSize: {
        label: ["11px", { lineHeight: "1", letterSpacing: "var(--ls-label)" }],
        small: ["13px", { lineHeight: "1.8" }],
        copy: ["15px", { lineHeight: "var(--lh-copy)" }],
      },

      /* =========================
         Layout
         ========================= */

      maxWidth: {
        page: "var(--page-max)",
        copy: "43ch",
        narrow: "880px",
        wide: "1480px",
      },

      spacing: {
        page: "var(--page-pad)",

        sectionSm: "clamp(72px, 9vw, 120px)",
        section: "clamp(92px, 10vw, 160px)",
        sectionLg: "clamp(112px, 12vw, 192px)",

        gutter: "clamp(22px, 5vw, 64px)",
      },

      /* =========================
         Radius / Shadow
         ========================= */

      borderRadius: {
        soft: "var(--radius-soft)",
        card: "var(--radius-card)",
      },

      boxShadow: {
        hareSoft: "var(--hare-shadow-soft)",
        hareFloat: "var(--hare-shadow-float)",
      },

      /* =========================
         Motion
         ========================= */

      transitionTimingFunction: {
        hare: "var(--ease-hare)",
        out: "var(--ease-out)",
      },

      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
      },

      animation: {
        hareFadeUp: "hareFadeUp .82s var(--ease-hare) both",
        hareFade: "hareFade .72s var(--ease-hare) both",
      },

      keyframes: {
        hareFadeUp: {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, 18px, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
        hareFade: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },

      /* =========================
         Background / Layer Helpers
         ========================= */

      backgroundImage: {
        hareVeil:
          "linear-gradient(90deg, rgb(var(--hare-bg) / .92) 0%, rgb(var(--hare-bg) / .66) 48%, rgb(var(--hare-bg) / 0) 100%)",
        hareDarkVeil:
          "linear-gradient(90deg, rgb(var(--hare-overlay-dark) / .62) 0%, rgb(var(--hare-overlay-dark) / .38) 52%, rgb(var(--hare-overlay-dark) / 0) 100%)",
        harePaper:
          "linear-gradient(180deg, rgb(var(--hare-surface) / .72), rgb(var(--hare-bg) / .92))",
      },

      zIndex: {
        base: "1",
        float: "20",
        nav: "40",
        modal: "80",
      },
    },
  },

  plugins: [],
};