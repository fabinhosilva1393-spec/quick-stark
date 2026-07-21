import { createFileRoute, Link } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { APP_VERSION, GITHUB_RELEASES_URL } from "@/data/downloads";

const TITLE = "Versions — StarknetWallet";
const DESC =
  "Current maintained version, signed desktop builds, and clear verification details for StarknetWallet.";

export const Route = createFileRoute("/releases")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://starknetwallet.org/releases" },
    ],
    links: [{ rel: "canonical", href: "https://starknetwallet.org/releases" }],
  }),
  component: () => (
    <SimplePage
      eyebrow="Versions"
      title="Signed builds, clear verification."
      heroBackground="/assets/pages/releases-hero.svg"
      description="StarknetWallet ships signed desktop builds for macOS, Windows, and Linux on a maintained product track. Each build is published with a SHA256 checksum and a PGP signature so you can verify it before installing."
      sections={[
        { id: "current-version", label: "Current version" },
        { id: "whats-in-build", label: "What's in the build" },
        { id: "source", label: "Source" },
      ]}
      actions={[
        { label: "Download", to: "/", hash: "download", variant: "primary" },
        { label: "Version history", to: "/changelog" },
      ]}
    >

      <h2 id="current-version">Current maintained version: {APP_VERSION}</h2>
      <ul>
        <li>Product track: Desktop · Actively maintained</li>
        <li>macOS · .dmg Universal · Apple Silicon and Intel</li>
        <li>Windows · .exe installer · x64</li>
        <li>Linux · .AppImage / .deb</li>
      </ul>

      <div className="not-prose grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-hairline bg-surface p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-ink">SHA256 checksums</h3>
          <p className="mt-2 text-sm text-ink-muted">
            SHA256 verification details for the current maintained build.
            Compare the value with the file you downloaded before opening it.
          </p>
        </div>
        <div className="rounded-xl border border-hairline bg-surface p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-ink">PGP signature</h3>
          <p className="mt-2 text-sm text-ink-muted">
            The signing key fingerprint is published alongside the current
            build. Verify with your local <code>gpg</code> install.
          </p>
        </div>
      </div>

      <h2 id="whats-in-build">What's in the current build</h2>
      <ul>
        <li>STRK balance management and transfers.</li>
        <li>Starknet Mainnet and Starknet Sepolia support.</li>
        <li>Cairo call review before signing.</li>
        <li>Smart-account permission review.</li>
        <li>Signed verification flow with SHA256 and PGP.</li>
      </ul>

      <h2 id="source">Source</h2>
      <p>
        Browse the project source at{" "}
        <a href={GITHUB_RELEASES_URL} target="_blank" rel="noopener noreferrer">
          {GITHUB_RELEASES_URL.replace("https://", "")} ↗
        </a>
        . See the <Link to="/changelog">Version history</Link> for the full
        maintenance timeline, or jump to{" "}
        <Link to="/" hash="download">Download</Link> for the current build.
      </p>
    </SimplePage>
  ),
});
