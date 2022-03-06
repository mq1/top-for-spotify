const withAnimations = require("animated-tailwindcss");

module.exports = withAnimations({
  content: [
    "./public/**/*.html",
    "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}",
  ],
});
