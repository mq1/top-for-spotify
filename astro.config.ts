import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  buildOptions: {
    site: "https://top-for-spotify.mq1.eu",
  },
  integrations: [preact(), tailwind({})],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
