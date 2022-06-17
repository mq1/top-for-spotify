import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [svelte(), tailwind({})],
  site: "https://top-for-spotify.mq1.eu/",
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});
