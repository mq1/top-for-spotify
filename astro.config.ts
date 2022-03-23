import { defineConfig } from "astro/config";

export default defineConfig({
  buildOptions: {
    site: "https://top-for-spotify.mq1.eu",
  },
  renderers: ["@astrojs/renderer-preact"],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
