import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";

const TITLE = "Privacy — StarknetWallet";
const DESC = "How StarknetWallet handles your data. Local-first by design.";

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
    <SimplePage eyebrow="Legal" title="Privacy">
      <ul>
        <li>Local-first keys — private keys never leave your device.</li>
        <li>No telemetry by default.</li>
        <li>No seed phrase collection, ever.</li>
        <li>No real wallet connection happens in the website demo.</li>
        <li>Downloads should be verified before install.</li>
      </ul>
      <p>
        We aim to keep this short and honest rather than legal-heavy. If
        anything changes, this page will be updated alongside the relevant
        release.
      </p>
    </SimplePage>
  ),
});
