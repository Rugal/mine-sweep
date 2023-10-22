import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@store": path.resolve(__dirname, "./src/component/App/store"),
      "@component": path.resolve(__dirname, "./src/component"),
      "@page": path.resolve(__dirname, "./src/page"),
      "@generated": path.resolve(__dirname, "./src/generated"),
      "@hook": path.resolve(__dirname, "./src/hook"),
    },
  },
  plugins: [react(), svgr()],
})
