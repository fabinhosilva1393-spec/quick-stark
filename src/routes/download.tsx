import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DownloadSection } from "@/components/DownloadSection";
import { APP_VERSION, GITHUB_REPO_URL, anyReleaseAvailable } from "@/data/downloads";
import { ShieldCheck, Terminal, AlertTriangle, BookOpen } from "lucide-react";

const TITLE = "Download StarknetWallet — macOS, Windows, Linux";
const DESC =
  "Download StarknetWallet for macOS, Windows, and Linux. We recommend the right build for your operating system and provide checksum and PGP verification steps.";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/download" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/download" }],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="relative pt-20 pb-10">
          <div className="container-page">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {anyReleaseAvailable
                ? `Latest release · ${APP_VERSION}`
                : `Target release · ${APP_VERSION} · pending`}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink">
              Download StarknetWallet
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-muted">
              Choose your operating system, verify the release, and install
              the desktop wallet for Starknet.
            </p>
          </div>
        </section>

        {/* Download cards + verify steps */}
        <DownloadSection id="download" compact />

        {/* Verify commands */}
        <section className="py-20">
          <div className="container-page">
            <div className="max-w-2xl">
              <span className="eyebrow">Verify your download</span>
              <h2 className="section-title mt-4">Trust, then verify.</h2>
              <p className="section-sub">
                Every release is intended to ship with a SHA256 checksum and a
                PGP signature. Once a release is published, use the commands
                below to confirm the file you downloaded matches the published
                artifact.
              </p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="surface-card">
                <ShieldCheck size={20} className="text-brand" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold text-ink">SHA256 checksum</h3>
                <p className="mt-1 text-sm text-ink-muted">
                  Run the command for your platform and compare the output to
                  the published <code className="text-ink">.sha256</code> file.
                </p>
                <pre className="mt-4 rounded-lg bg-muted border border-hairline p-4 text-xs text-ink overflow-x-auto font-mono">
{`# macOS / Linux
shasum -a 256 StarknetWallet-${APP_VERSION}*

# Windows (PowerShell)
Get-FileHash .\\StarknetWallet-Setup-${APP_VERSION}-x64.exe -Algorithm SHA256`}
                </pre>
              </div>

              <div className="surface-card">
                <Terminal size={20} className="text-brand" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold text-ink">PGP signature</h3>
                <p className="mt-1 text-sm text-ink-muted">
                  Import the project signing key once published, then verify
                  the <code className="text-ink">.sig</code> file against the
                  installer.
                </p>
                <pre className="mt-4 rounded-lg bg-muted border border-hairline p-4 text-xs text-ink overflow-x-auto font-mono">
{`gpg --keyserver hkps://keys.openpgp.org \\
    --recv-keys <signing-key-fingerprint>

gpg --verify StarknetWallet-${APP_VERSION}*.sig \\
              StarknetWallet-${APP_VERSION}*`}
                </pre>
                <p className="mt-3 text-xs text-ink-muted">
                  The signing key fingerprint will be published with the first
                  signed release.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Install guides */}
        <section className="py-20 border-t border-hairline bg-surface-2">
          <div className="container-page">
            <div className="max-w-2xl">
              <span className="eyebrow">
                <BookOpen size={12} aria-hidden="true" /> Install guides
              </span>
              <h2 className="section-title mt-4">Install in under a minute.</h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  os: "macOS",
                  steps: [
                    "Open the .dmg file you downloaded.",
                    "Drag StarknetWallet into Applications.",
                    "Launch and approve the first-run security prompt.",
                  ],
                },
                {
                  os: "Windows",
                  steps: [
                    "Run the .exe installer.",
                    "Approve the SmartScreen prompt (signed build).",
                    "Launch StarknetWallet from the Start menu.",
                  ],
                },
                {
                  os: "Linux",
                  steps: [
                    "chmod +x the .AppImage, or install the .deb.",
                    "Launch from your application menu or terminal.",
                    "Optional: install desktop integration via the menu.",
                  ],
                },
              ].map((g) => (
                <div key={g.os} className="surface-card">
                  <h3 className="text-lg font-bold text-ink">{g.os}</h3>
                  <ol className="mt-4 space-y-2 text-sm text-ink-muted list-decimal pl-5">
                    {g.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security notice */}
        <section className="py-16">
          <div className="container-page">
            <div
              className="rounded-xl border p-6 sm:p-8 flex gap-4 bg-accent border-hairline"
              role="note"
              aria-label="Security notice"
            >
              <AlertTriangle
                size={22}
                className="text-brand shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-base font-bold text-ink">Security notice</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-ink-muted list-disc pl-5">
                  <li>
                    Only download StarknetWallet from this website or the
                    official{" "}
                    <a
                      href={GITHUB_REPO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      GitHub organization
                    </a>
                    .
                  </li>
                  <li>Never enter your seed phrase on a website.</li>
                  <li>Verify checksums and signatures before installing.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
