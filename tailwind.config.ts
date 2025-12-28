import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-cairo)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'var(--font-amiri)', 'serif'],
      },
      // Colors are now defined in globals.css @theme block for v4 compatibility/preference
      // keeping fontFamily here as it uses CSS variables defined in layout
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
