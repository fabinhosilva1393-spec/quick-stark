import { createFileRoute, Link } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";

const TITLE = "Audits — StarknetWallet";
const DESC =
  "Security review process, responsible disclosure, and where verified audit reports will be published.";

export const Route = createFileRoute("/audits")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => (
    <SimplePage eyebrow="Security" title="Audits">
      <p>
        Security reviews and audit reports will be published here once they
        are completed and the full reports are publicly available. Until then,
        StarknetWallet should be treated as unaudited software — manage risk
        accordingly.
      </p>
      <h2>Review process</h2>
      <ul>
        <li>Open-source codebase available for independent review.</li>
        <li>Reproducible builds with published SHA256 checksums and PGP signatures.</li>
        <li>Planned independent security review prior to broader release milestones.</li>
        <li>A dedicated area on this page is prepared for verified findings and remediations once available.</li>
      </ul>
      <h2>Responsible disclosure</h2>
      <p>
        Security issues should be reported privately through the channel listed
        in the public repository. Please do not open a public issue for an
        exploitable vulnerability. Coordinated disclosure helps protect users
        while a fix is prepared and released.
      </p>
      <h2>How to verify a release yourself</h2>
      <ul>
        <li>Download builds only from the official release page.</li>
        <li>Check the SHA256 checksum of the downloaded file.</li>
        <li>Verify the PGP signature against the published signing key.</li>
        <li>If you build from source, compare your hash with the published one.</li>
      </ul>
      <p>
        See{" "}
        <Link to="/" hash="security">
          Security
        </Link>{" "}
        for verification details, or{" "}
        <Link to="/" hash="download">
          Download
        </Link>{" "}
        for the latest signed release.
      </p>
    </SimplePage>
  ),
});
