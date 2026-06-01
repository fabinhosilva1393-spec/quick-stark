import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DownloadSection } from "@/components/DownloadSection";
import { GITHUB_RELEASES_URL, APP_VERSION } from "@/data/downloads";
import { ShieldCheck, Terminal, AlertTriangle, BookOpen } from "lucide-react";

const TITLE = "Download StarknetWallet — macOS, Windows, Linux";
const DESC =
  "Download StarknetWallet for macOS, Windows, and Linux. The site recommends the right build for your operating system and provides checksum verification.";

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
        <section className="relative pt-20 pb-10 overflow-hidden">
          <div className="bg-aurora" />
          <div className="container-page relative">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Latest release · {APP_VERSION}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Download StarknetWallet
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              Choose your OS, verify the release, and install the desktop
              wallet for Starknet.
            </p>
          </div>
        </section>

        {/* Download cards */}
        <DownloadSection id="download" compact />

        {/* Verify */}
        <section id="verify" className="py-20">
          <div className="container-page">
            <div className="max-w-2xl">
              <span className="eyebrow">Verify your download</span>
              <h2 className="section-title mt-4">Trust, but verify.</h2>
              <p className="section-sub">
                Every build is SHA256-checksummed and PGP-signed. Confirm the
                file you downloaded matches the file we published.
              </p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="surface-card">
                <ShieldCheck size={20} className="text-brand" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold text-white">SHA256 checksum</h3>
                <p className="mt-1 text-sm text-white/65">
                  Run the command below in your terminal and compare the
                  output to the published <code className="text-white/85">.sha256</code> file.
                </p>
                <pre className="mt-4 rounded-xl bg-black/50 border border-white/10 p-4 text-xs text-white/85 overflow-x-auto font-mono">
{`# macOS / Linux
shasum -a 256 StarknetWallet-${APP_VERSION}*

# Windows (PowerShell)
Get-FileHash .\\StarknetWallet-Setup-${APP_VERSION}-x64.exe -Algorithm SHA256`}
                </pre>
              </div>

              <div className="surface-card">
                <Terminal size={20} className="text-brand" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold text-white">PGP signature</h3>
                <p className="mt-1 text-sm text-white/65">
                  Import our signing key and verify the <code className="text-white/85">.sig</code> file.
                </p>
                <pre className="mt-4 rounded-xl bg-black/50 border border-white/10 p-4 text-xs text-white/85 overflow-x-auto font-mono">
{`gpg --keyserver hkps://keys.openpgp.org \\
    --recv-keys 0xSTARKNETWALLET

gpg --verify StarknetWallet-${APP_VERSION}*.sig \\
              StarknetWallet-${APP_VERSION}*`}
                </pre>
                <a
                  href={GITHUB_RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm text-link"
                >
                  All releases on GitHub →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Install guides */}
        <section className="py-20 border-t border-white/5">
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
                    "Approve the SmartScreen warning (signed build).",
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
                  <h3 className="text-lg font-bold text-white">{g.os}</h3>
                  <ol className="mt-4 space-y-2 text-sm text-white/75 list-decimal pl-5">
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
              className="rounded-2xl border p-6 sm:p-8 flex gap-4"
              style={{
                borderColor: "rgba(236,121,107,0.35)",
                background:
                  "linear-gradient(180deg, rgba(236,121,107,0.08), rgba(236,121,107,0.02))",
              }}
              role="note"
              aria-label="Security notice"
            >
              <AlertTriangle
                size={22}
                className="text-brand shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-base font-bold text-white">
                  Security notice
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-white/75 list-disc pl-5">
                  <li>
                    Only download StarknetWallet from the official website or
                    official GitHub repository.
                  </li>
                  <li>Never enter your seed phrase on a website.</li>
                  <li>Verify checksums before installing.</li>
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
