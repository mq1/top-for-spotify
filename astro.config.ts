import type { AstroUserConfig } from "astro";

const config: AstroUserConfig = {
  buildOptions: {
    site: "https://top-for-spotify.mq1.eu",
  },
  renderers: ["@astrojs/renderer-preact"],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
};

export default config;
