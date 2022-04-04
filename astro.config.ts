import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [preact(), tailwind({})],
  site: "https://top-for-spotify.mq1.eu/",
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
