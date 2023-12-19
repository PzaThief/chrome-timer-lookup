import { type ManifestV3Export } from "@crxjs/vite-plugin";

export const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: "Timer lookup extension",
  description: "Timer lookup extension for developer",
  version: "1.0.0",
  action: {
    default_popup: "index.html",
  },
  icons: {
    16: "timer.png",
    32: "timer.png",
    48: "timer.png",
    128: "timer.png",
  },
  background: {
    service_worker: "background/service-worker.ts",
    type: "module",
  },
  permissions: ["scripting", "tabs", "activeTab", "storage"],
  content_scripts: [
    {
      js: ["content_scripts/sniffTimer.ts"],
      matches: ["<all_urls>"],
      run_at: "document_start"
    },
  ],
  host_permissions: ["<all_urls>"],
};
