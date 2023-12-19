import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { crx } from "@crxjs/vite-plugin";
import {manifest} from "./manifest";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
  },
});
