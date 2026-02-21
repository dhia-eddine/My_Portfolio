import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const BASE = "/My_Portfolio/";

// In dev: serve public files under base path so /My_Portfolio/desktop_pc/* works (enforce: pre so we run first)
function servePublicUnderBase() {
  const base = BASE.replace(/\/$/, "");
  const mountPath = `/${base}/desktop_pc`;
  return {
    name: "serve-public-under-base",
    enforce: "pre",
    configureServer(server) {
      server.middlewares.use(mountPath, (req, res, next) => {
        const subPath = (req.url || "").split("?")[0].replace(/^\//, "") || "";
        const relative = path.join("desktop_pc", subPath);
        const filePath = path.join(process.cwd(), "public", relative);
        try {
          if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return next();
        } catch {
          return next();
        }
        const mime = relative.endsWith(".gltf") ? "model/gltf+json" : relative.endsWith(".glb") ? "model/gltf-binary" : "application/octet-stream";
        res.setHeader("Content-Type", mime);
        res.end(fs.readFileSync(filePath));
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), servePublicUnderBase()],
  base: BASE,
  build: {
    chunkSizeWarningLimit: 1200,
  },
});
