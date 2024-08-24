import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Use `new URL` and `import.meta.url` to resolve paths
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(
        new URL("./src/components", import.meta.url).pathname
      ),
      pages: path.resolve(new URL("./src/pages", import.meta.url).pathname),
    },
  },
});
