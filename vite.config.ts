// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Static prerender — produces dist/client/<route>/index.html for cPanel / any static host.
const STATIC_ROUTES = [
  "/",
  "/about",
  "/audits",
  "/brand-guidelines",
  "/changelog",
  "/compare",
  "/contact",
  "/cookies",
  "/docs",
  "/documentation",
  "/ecosystem",
  "/privacy",
  "/releases",
  "/roadmap",
  "/security",
  "/terms",
];

export default defineConfig({
  tanstackStart: {
    prerender: {
      enabled: true,
      crawlLinks: true,
      retryCount: 2,
    },
    pages: STATIC_ROUTES.map((path) => ({ path, prerender: { enabled: true } })),
  },
});
