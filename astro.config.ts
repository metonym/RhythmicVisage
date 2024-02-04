import mdx from "@astrojs/mdx";
import svelte, { vitePreprocess } from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { PORT, SITE_URL } from "./server/constants";

export default defineConfig({
  site: SITE_URL,
  srcDir: "./client",
  publicDir: "./client/public",
  build: {
    assets: "_",
    format: "directory",
  },
  vite: {
    define: {
      __TS: JSON.stringify(new Date().toLocaleString()),
    },
    server: {
      proxy: {
        // Proxy /api requests to the backend server in development.
        "/api": `http://localhost:${PORT}`,
      },
    },
  },
  integrations: [svelte({ preprocess: [vitePreprocess()] }), tailwind(), mdx()],
});
