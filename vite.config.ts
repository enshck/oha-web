import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgLoader from "vite-plugin-svgr";
import tsconfigPath from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tsconfigPath(),
    svgLoader(),
  ],
  build: {
    rollupOptions: {
      output: {
        /**
         * Manual chunk configuration for Rollup bundling
         * Separates dependencies into specific chunks for optimal caching and loading performance
         *
         * @see https://rollupjs.org/guide/en/#outputmanualchunks
         */
        manualChunks: {
          // Separate vendor chunks for better caching
          "chakra-vendor": ["@chakra-ui/react", "@emotion/react"],
        },
      },
    },
  },
});
