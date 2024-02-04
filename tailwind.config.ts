import type { Config } from "tailwindcss";

export default {
  content: ["./client/**/*.{astro,html,md,mdx,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Archivo Black", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
