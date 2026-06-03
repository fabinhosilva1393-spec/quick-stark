import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { PrivacyIllustration } from "@/components/illustrations/PageIllustrations";

const TITLE = "Privacy — StarknetWallet";
const DESC = "Local-first privacy principles for the StarknetWallet desktop workflow.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => (
    <SimplePage eyebrow="Legal" title="Privacy" illustration={<PrivacyIllustration />}>
      <p>
        StarknetWallet is designed with local-first privacy principles. The
        website and desktop workflow minimize data exposure while giving
        users clear control over wallet activity and signing context.
      </p>
      <ul>
        <li>Local-first key control. Private account material remains on the user's device.</li>
        <li>No telemetry by default. Usage tracking is not enabled unless explicitly introduced and disclosed.</li>
        <li>No seed phrase collection. The website never asks users to submit recovery phrases.</li>
        <li>Demo safety. Website demo screens are visual product previews and are not connected to live wallet accounts.</li>
        <li>Verification-first downloads. Users are encouraged to verify checksums and build signatures before installing.</li>
      </ul>
      <p>
        Privacy and security information is maintained alongside the product
        so users can understand how StarknetWallet handles data, downloads,
        and signing context.
      </p>
    </SimplePage>
  ),
});
