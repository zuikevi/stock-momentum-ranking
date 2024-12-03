import { defineConfig } from "@remix-run/dev";

export default defineConfig({
  serverBuildTarget: "vercel",
  server: "./server.js", // Custom server for Vercel
});