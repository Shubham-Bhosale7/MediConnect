import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const sameHost = env.VITE_SAME_HOST === "true";

  return {
    plugins: [react(), tailwindcss()],
    base: sameHost ? "/admin/" : "/",
    server: { port: 5174 },
  };
});
