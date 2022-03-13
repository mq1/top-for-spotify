import type { AstroUserConfig } from "astro";

const config: AstroUserConfig = {
  buildOptions: {
    site: "https://top-for-spotify.mq1.eu",
  },
  renderers: ["@astrojs/renderer-vue"],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
};

export default config;
