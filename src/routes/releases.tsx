import { createFileRoute, Link } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { APP_VERSION, GITHUB_RELEASES_URL } from "@/data/downloads";

const TITLE = "Releases — StarknetWallet";
const DESC = "Signed builds and clear verification for every StarknetWallet release.";

export const Route = createFileRoute("/releases")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => (
    <SimplePage eyebrow="Releases" title="Signed builds, clear verification.">
      <p>
        StarknetWallet releases ship as signed binaries for macOS, Windows,
        and Linux. Each release is published with a SHA256 checksum and a PGP
        signature so you can verify the build before installing.
      </p>

      <h2>{APP_VERSION} — Initial desktop release</h2>
      <ul>
        <li>macOS · .dmg Universal · Apple Silicon and Intel</li>
        <li>Windows · .exe installer · x64</li>
        <li>Linux · .AppImage / .deb</li>
      </ul>

      <div className="not-prose grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-hairline bg-surface p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-ink">SHA256 checksums</h3>
          <p className="mt-2 text-sm text-ink-muted">
            Checksums will appear here when signed artifacts are published.
            Compare the value with the file you downloaded before opening it.
          </p>
        </div>
        <div className="rounded-xl border border-hairline bg-surface p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-ink">PGP signature</h3>
          <p className="mt-2 text-sm text-ink-muted">
            The signing key fingerprint will appear here alongside the signed
            release. Verify with your local <code>gpg</code> install.
          </p>
        </div>
      </div>

      <h2>Release notes</h2>
      <ul>
        <li>STRK balance management and transfers.</li>
        <li>Starknet Mainnet and Starknet Sepolia support.</li>
        <li>Cairo call preview before signing.</li>
        <li>Smart-account permission review.</li>
        <li>Signed release flow with SHA256 and PGP.</li>
      </ul>

      <h2>Source</h2>
      <p>
        Browse the project source at{" "}
        <a href={GITHUB_RELEASES_URL} target="_blank" rel="noopener noreferrer">
          {GITHUB_RELEASES_URL.replace("https://", "")} ↗
        </a>
        . See the <Link to="/changelog">Changelog</Link> for a chronological
        list, or jump to <Link to="/" hash="download">Download</Link> to grab
        a build.
      </p>
    </SimplePage>
  ),
});
