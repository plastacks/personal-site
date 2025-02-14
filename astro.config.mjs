// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://davideplastini.vercel.app",
  integrations: [
    react({}),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      gfm: true,
    }),
  ],
  i18n: {
    locales: ["en", "it"],
    defaultLocale: "en",
    fallback: {
      it: "en"
    },
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  prefetch: true
});
