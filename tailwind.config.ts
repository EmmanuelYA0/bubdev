import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
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
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'myblack': '#1C1315',
      'redhot': '#955D6F',
      'red200': 'CFBCC2',
      'pourpre':'#4A050D',
      rock: {
        '50': '#f5f3f1',
        '100': '#e6e0db',
        '200': '#cfc2b9',
        '300': '#b39f91',
        '400': '#9d8172',
        '500': '#8e7164',
        '600': '#7a5d54',
        '700': '#624b46',
        '800': '#574240',
        '900': '#4a3939',
        '950': '#2a1e1e'
      },
      solid_pink: {
        '50': '#faf5f7',
        '100': '#f7ecf0',
        '200': '#f1d9e2',
        '300': '#e6bbc9',
        '400': '#d690a6',
        '500': '#c66e86',
        '600': '#b15168',
        '700': '#973e50',
        '800': '#7e3644',
        '900': '#6a313c',
        '950': '#3f181f'
      },
      pink: {
        '50': '#fdf2f8',
        '100': '#fce7f3',
        '200': '#fbcfe8',
        '300': '#f9a8d4',
        '400': '#f472b6',
        '500': '#ec4899',
        '600': '#db2777',
        '700': '#be185d',
        '800': '#9d174d',
        '900': '#831843',
        '950': '#500724',
    },
    
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
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

// colors: {
//   transparent: 'transparent',
//   current: 'currentColor',
//   'white': '#ffffff',
//   'purple': '#3f3cbb',
//   'midnight': '#121063',
//   'metal': '#565584',
//   'tahiti': '#3ab7bf',
//   'silver': '#ecebff',
//   'bubble-gum': '#ff77e9',
//   'bermuda': '#78dcca',
//   'myblack': '#1C1315',
//   'redhot': '#955D6F',
//   'red200': 'CFBCC2',
//   'pourpre':'#4A050D'
  
