import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

export default defineConfig({
  buildOptions: {
    site: "https://top-for-spotify.mq1.eu",
  },
  integrations: [preact()],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
