import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // Shown as "Last updated" in the System Status panel.
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    target: "es2022",
    chunkSizeWarningLimit: 700,
  },
});
