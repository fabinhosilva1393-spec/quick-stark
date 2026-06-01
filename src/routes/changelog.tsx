import { createFileRoute, Link } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";

const TITLE = "Changelog — StarknetWallet";
const DESC = "Release notes for the StarknetWallet desktop application.";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => (
    <SimplePage eyebrow="Releases" title="Changelog">
      <h2>v1.0.0 — Initial desktop release</h2>
      <ul>
        <li>Desktop builds for macOS, Windows, and Linux.</li>
        <li>STRK balance management and transfers.</li>
        <li>Cairo call preview before signing.</li>
        <li>Smart-account permission review.</li>
        <li>Signed releases with published SHA256 checksums.</li>
      </ul>
      <p>
        See <Link to="/" hash="download">Download</Link> for the latest build
        and verification instructions.
      </p>
    </SimplePage>
  ),
});
