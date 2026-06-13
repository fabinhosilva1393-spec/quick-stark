#!/usr/bin/env node
/**
 * Post-build: convert the TanStack Start SSR output into a fully static
 * site at `dist/static/` suitable for cPanel / Apache / any static host
 * (no Node.js runtime required after deployment).
 *
 * The server entry path is discovered dynamically — it reads dist/nitro.json
 * (or dist/package.json) to find the actual generated entry, and falls back
 * to a list of well-known locations. All paths are resolved from the project
 * root with `path.join` / `pathToFileURL` so the script works on Linux,
 * macOS and Windows alike.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = path.join(root, "dist");
const outDir = path.join(distDir, "static");

const PAGE_ROUTES = [
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
const EXTRA_ROUTES = [{ path: "/sitemap.xml", file: "sitemap.xml" }];

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}
async function readJson(p) {
  try { return JSON.parse(await fs.readFile(p, "utf8")); } catch { return null; }
}
async function rimraf(p) { await fs.rm(p, { recursive: true, force: true }); }
async function copyDir(src, dst) {
  await fs.mkdir(dst, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

async function detectClientDir() {
  const nitro = await readJson(path.join(distDir, "nitro.json"));
  if (nitro?.publicDir) {
    const candidate = path.join(distDir, nitro.publicDir);
    if (await exists(candidate)) return candidate;
  }
  for (const rel of ["client", "public", "../.output/public"]) {
    const candidate = path.join(distDir, rel);
    if (await exists(candidate)) return candidate;
  }
  return null;
}

async function detectServerEntry() {
  const candidates = [];

  const nitro = await readJson(path.join(distDir, "nitro.json"));
  if (nitro?.serverEntry) candidates.push(path.join(distDir, nitro.serverEntry));

  const distPkg = await readJson(path.join(distDir, "package.json"));
  if (distPkg?.main) candidates.push(path.join(distDir, distPkg.main));

  for (const rel of [
    "server/index.mjs",
    "server/index.js",
    "server/server.mjs",
    "server/server.js",
    "server/entry.mjs",
    "server/entry.js",
    "../.output/server/index.mjs",
  ]) {
    candidates.push(path.join(distDir, rel));
  }

  const seen = new Set();
  for (const c of candidates) {
    const norm = path.normalize(c);
    if (seen.has(norm)) continue;
    seen.add(norm);
    if (await exists(norm)) return norm;
  }

  // Nothing found — print what we did find to help debugging.
  const lines = ["[build-static] Could not locate the SSR server entry."];
  lines.push("[build-static] Checked these locations:");
  for (const c of seen) lines.push("  - " + path.relative(root, c));
  lines.push("[build-static] Contents of dist/:");
  try {
    const entries = await fs.readdir(distDir, { withFileTypes: true });
    for (const e of entries) lines.push("  - " + e.name + (e.isDirectory() ? "/" : ""));
    if (await exists(path.join(distDir, "server"))) {
      lines.push("[build-static] Contents of dist/server/:");
      for (const e of await fs.readdir(path.join(distDir, "server"), { withFileTypes: true })) {
        lines.push("  - " + e.name + (e.isDirectory() ? "/" : ""));
      }
    }
  } catch {}
  throw new Error(lines.join("\n"));
}

async function main() {
  if (!(await exists(distDir))) {
    console.error("[build-static] dist/ not found. Run `vite build` first.");
    process.exit(1);
  }

  const clientDir = await detectClientDir();
  if (!clientDir) {
    console.error("[build-static] Could not locate client assets directory (tried dist/client, dist/public, .output/public).");
    process.exit(1);
  }
  const serverEntry = await detectServerEntry();

  console.log(`[build-static] Client assets: ${path.relative(root, clientDir)}`);
  console.log(`[build-static] Server entry:  ${path.relative(root, serverEntry)}`);
  console.log(`[build-static] Output dir:    ${path.relative(root, outDir)}`);

  await rimraf(outDir);
  await fs.mkdir(outDir, { recursive: true });

  console.log("[build-static] Copying client assets…");
  await copyDir(clientDir, outDir);
  await rimraf(path.join(outDir, "_headers")); // Cloudflare-only file

  console.log("[build-static] Loading SSR handler…");
  const mod = await import(pathToFileURL(serverEntry).href);
  const handler = mod.default ?? mod;
  if (typeof handler?.fetch !== "function") {
    throw new Error(`[build-static] Server entry at ${serverEntry} does not export a { fetch } handler.`);
  }
  const env = { ASSETS: { fetch: () => new Response(null, { status: 404 }) } };
  const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };

  async function render(routePath) {
    const url = `http://localhost${routePath}`;
    const res = await handler.fetch(new Request(url), env, ctx);
    if (res.status >= 400) {
      throw new Error(`Render failed for ${routePath} (HTTP ${res.status})`);
    }
    return await res.text();
  }

  for (const route of PAGE_ROUTES) {
    process.stdout.write(`[build-static] Prerender ${route} … `);
    const html = await render(route);
    const dirPath = route === "/" ? outDir : path.join(outDir, ...route.split("/").filter(Boolean));
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(path.join(dirPath, "index.html"), html, "utf8");
    console.log("ok");
  }

  for (const extra of EXTRA_ROUTES) {
    process.stdout.write(`[build-static] Prerender ${extra.path} … `);
    const body = await render(extra.path);
    await fs.writeFile(path.join(outDir, extra.file), body, "utf8");
    console.log("ok");
  }

  const htaccess = `# Generated by scripts/build-static.mjs
Options -MultiViews
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On

  # Serve existing files/directories directly
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Clean URL: /about -> /about/index.html
  RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
  RewriteRule ^(.+?)/?$ /$1/index.html [L]

  # SPA fallback for unknown routes
  RewriteRule ^ /index.html [L]
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(?:js|css|woff2?|ttf|otf|eot|png|jpg|jpeg|svg|webp|ico)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>
`;
  await fs.writeFile(path.join(outDir, ".htaccess"), htaccess, "utf8");
  console.log("[build-static] Wrote .htaccess");

  console.log(`\n[build-static] Done. Upload the CONTENTS of: ${path.relative(root, outDir)}/`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
