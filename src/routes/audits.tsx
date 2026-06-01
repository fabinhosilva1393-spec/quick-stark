import { createFileRoute, Link } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";

const TITLE = "Audits — StarknetWallet";
const DESC = "Independent audit status and how to verify StarknetWallet releases.";

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
        Independent third-party audits have not been published for
        StarknetWallet. We will only list audits here once they exist and the
        full reports are publicly available.
      </p>
      <p>
        Until then, treat StarknetWallet as unaudited software. Manage risk
        accordingly and never store more than you are comfortable with.
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
        to get the latest signed release.
      </p>
    </SimplePage>
  ),
});
