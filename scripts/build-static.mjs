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

// The Nitro/TanStack Start build may land in either `dist/` (cloudflare-module preset)
// or `.output/` (default node-server preset). Detect whichever exists.
async function resolveBuildDir() {
  const candidates = [
    path.join(root, "dist"),
    path.join(root, ".output"),
    path.join(root, "build"),
  ];
  for (const c of candidates) {
    try { await fs.access(c); return c; } catch {}
  }
  return null;
}

let distDir = path.join(root, "dist"); // will be reassigned in main()
let outDir = path.join(distDir, "static");

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

// ---------------------------------------------------------------------------
// Lovable asset localization
// ---------------------------------------------------------------------------
const LOVABLE_URL_RE = /\/__l5e\/assets-v1\/([0-9a-f-]+)\/([^\s"'`)<>]+?\.[a-zA-Z0-9]+)/g;

async function discoverProjectId() {
  // 1) Prefer .lovable/project.json if present.
  const projectJson = await readJson(path.join(root, ".lovable", "project.json"));
  if (projectJson?.id) return projectJson.id;
  if (projectJson?.project_id) return projectJson.project_id;

  // 2) Fall back to any *.asset.json in src/assets/.
  const assetsDir = path.join(root, "src", "assets");
  if (await exists(assetsDir)) {
    for (const entry of await fs.readdir(assetsDir)) {
      if (!entry.endsWith(".asset.json")) continue;
      const data = await readJson(path.join(assetsDir, entry));
      if (data?.project_id) return data.project_id;
    }
  }
  return null;
}

async function* walkFiles(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkFiles(p);
    else yield p;
  }
}

async function localizeLovableAssets(outRoot) {
  const projectId = await discoverProjectId();
  const baseUrl = process.env.LOVABLE_ASSET_BASE_URL
    || (projectId ? `https://id-preview--${projectId}.lovable.app` : null);

  if (!baseUrl) {
    console.warn("[build-static] No project id found — skipping Lovable asset localization.");
    return;
  }

  // 1) Scan all text files for /__l5e/... URLs.
  const textExts = new Set([".html", ".htm", ".js", ".mjs", ".cjs", ".css", ".xml", ".txt", ".json", ".svg", ".map"]);
  const found = new Map(); // assetId/filename -> { localPath, urlPath }
  const files = [];
  for await (const file of walkFiles(outRoot)) {
    if (!textExts.has(path.extname(file).toLowerCase())) continue;
    files.push(file);
    const txt = await fs.readFile(file, "utf8");
    for (const match of txt.matchAll(LOVABLE_URL_RE)) {
      const [full, id, filename] = match;
      const key = `${id}/${filename}`;
      if (!found.has(key)) {
        const safeName = `${id}__${filename}`.replace(/[^a-zA-Z0-9._-]/g, "_");
        found.set(key, {
          remote: full,
          urlPath: `/assets/lovable/${safeName}`,
          localPath: path.join(outRoot, "assets", "lovable", safeName),
        });
      }
    }
  }

  if (found.size === 0) {
    console.log("[build-static] No Lovable-hosted assets referenced — nothing to localize.");
    return;
  }

  console.log(`[build-static] Localizing ${found.size} Lovable asset(s) from ${baseUrl}…`);
  await fs.mkdir(path.join(outRoot, "assets", "lovable"), { recursive: true });

  // 2) Download each unique asset.
  for (const entry of found.values()) {
    const url = baseUrl.replace(/\/$/, "") + entry.remote;
    process.stdout.write(`[build-static]   ${entry.remote} … `);
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`FAILED (HTTP ${res.status})`);
      throw new Error(`Failed to download asset: ${url}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(entry.localPath, buf);
    console.log(`ok (${buf.length} bytes)`);
  }

  // 3) Rewrite every text file referencing those URLs.
  let rewritten = 0;
  for (const file of files) {
    let txt = await fs.readFile(file, "utf8");
    const updated = txt.replace(LOVABLE_URL_RE, (_m, id, filename) => {
      const e = found.get(`${id}/${filename}`);
      return e ? e.urlPath : _m;
    });
    if (updated !== txt) {
      await fs.writeFile(file, updated, "utf8");
      rewritten++;
    }
  }
  console.log(`[build-static] Rewrote ${rewritten} file(s) to reference local /assets/lovable/.`);
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

  // ---------------------------------------------------------------------------
  // Localize Lovable-hosted assets ( /__l5e/assets-v1/<id>/<file> ).
  // These URLs don't exist on cPanel/static hosting, so we download each one
  // and rewrite all references (HTML + JS + CSS) to a local /assets/lovable/ path.
  // ---------------------------------------------------------------------------
  await localizeLovableAssets(outDir);


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
