import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    return {
      plugins: [
        react(),
        dts({
          rollupTypes: true,
          include: ["src/components/timetable/*", "src/index.ts"],
          exclude: ["**/*.spec.*"],
        }),
      ],
      server: {
        port: 1337,
      },
      build: {
        outDir: "package/dist",
        lib: {
          entry: path.resolve(__dirname, "src/index.ts"),
          name: "ftr-timetable",
          fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
          input: path.resolve(__dirname, "src/index.ts"),
          external: [
            "react",
            "date-fns",
            "styled-components",
            "react/jsx-runtime",
          ],
          output: {
            globals: {
              react: "React",
              "date-fns": "dateFns",
              "styled-components": "styledComponents",
              "react/jsx-runtime": "react/jsx-runtime",
            },
          },
        },
        sourcemap: true,
        emptyOutDir: true,
      },
    };
  }

  return {
    base: "./",
    plugins: [react()],
    server: {
      port: 1337,
    },
  };
});
