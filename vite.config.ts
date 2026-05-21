import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueSanitize",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => {
        if (format === "es") return "vue-sanitize.js";
        if (format === "cjs") return "vue-sanitize.cjs";
        return `vue-sanitize.${format}.js`;
      },
    },
    sourcemap: true,
    rollupOptions: {
      external: ["vue", "sanitize-html"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
          "sanitize-html": "sanitizeHtml",
        },
      },
    },
  },
  plugins: [
    dts({
      include: ["src"],
      entryRoot: "src",
    }),
  ],
  test: {
    environment: "happy-dom",
    include: ["test/**/*.test.ts"],
  },
});
