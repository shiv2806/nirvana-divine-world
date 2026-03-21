import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // If deploying to a subdirectory, set base: '/your-subfolder/'
  base: "/",
});
