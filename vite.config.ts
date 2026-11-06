import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import dts from "unplugin-dts/vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "VueSanitize",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => {
        if (format === "es") return "vue-sanitize.js";
        if (format === "cjs") return "vue-sanitize.cjs";
        return `vue-sanitize.${format}.js`;
      },
    },
    sourcemap: true,
    rolldownOptions: {
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
      // index.d.ts for "import", index.d.cts for "require"
      outDirs: ["dist", { dir: "dist", moduleFormat: "cjs" }],
    }),
  ],
  test: {
    environment: "happy-dom",
    include: ["test/**/*.test.ts"],
  },
});
