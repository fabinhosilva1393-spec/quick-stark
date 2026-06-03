import { createFileRoute, Link } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { AuditsIllustration } from "@/components/illustrations/PageIllustrations";

const TITLE = "Security reviews — StarknetWallet";
const DESC =
  "Security review process, responsible disclosure, and build verification guidance for StarknetWallet.";

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
    <SimplePage eyebrow="Security" title="Security reviews" illustration={<AuditsIllustration />}>
      <p>
        StarknetWallet is designed around local-first key control,
        transparent transaction review, and verification-first installation.
        Security review information and validated reports will be listed here
        as they become available.
      </p>
      <h2>Security review process</h2>
      <ul>
        <li>Code review. The project structure is prepared for independent review and responsible disclosure.</li>
        <li>Build verification. Users are guided to verify checksums and build signatures before installing.</li>
        <li>Transaction clarity. Signing screens are designed to show network, calldata, fee, and permission context before approval.</li>
        <li>Responsible disclosure. Security reports should be handled privately so issues can be reviewed and resolved safely.</li>
        <li>Review history. Validated reports and remediation notes will be listed here when available.</li>
      </ul>
      <h2>How to verify a build</h2>
      <ul>
        <li>Download only from the official project source.</li>
        <li>Compare the SHA256 checksum before installation.</li>
        <li>Verify the build signature when signature files are available.</li>
        <li>If building from source, compare your local hash with the published verification material.</li>
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
        for the current maintained build.
      </p>
    </SimplePage>
  ),
});
