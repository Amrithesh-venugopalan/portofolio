import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/amrithesh-portfolio/",
  server: {
    allowedHosts: [".ngrok-free.app"],
    host: true,
  },
});

