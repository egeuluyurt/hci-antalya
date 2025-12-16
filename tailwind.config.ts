import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom Industrial Palette
        industrial: {
          900: "#050505", // Void
          800: "#0A0A0A", // Deep Matte
          700: "#121212", // Surface
          600: "#1E1E1E", // Element
          500: "#2A2A2A", // Border
          400: "#404040", // Text Muted
          300: "#737373", // Text Secondary
          200: "#A3A3A3", // Text Primary
          100: "#E5E5E5", // Highlight
          50: "#FAFAFA",  // Pure White
        },
        signal: {
          blue: "#0047FF", // International Klein Blue style
          orange: "#FF4F00", // Safety Orange
          green: "#00FF94", // Data Green
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "grid-flow": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(40px)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "grid-flow": "grid-flow 20s linear infinite",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, #2A2A2A 1px, transparent 1px), linear-gradient(to bottom, #2A2A2A 1px, transparent 1px)",
        "grid-pattern-light": "linear-gradient(to right, #E5E5E5 1px, transparent 1px), linear-gradient(to bottom, #E5E5E5 1px, transparent 1px)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
