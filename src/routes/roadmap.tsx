import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";

const TITLE = "Roadmap — StarknetWallet";
const DESC = "Planned and under-consideration improvements for StarknetWallet.";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => (
    <SimplePage eyebrow="Direction" title="Roadmap">
      <p>
        The following items are planned or under consideration. Nothing here is
        a commitment, and no dates are promised.
      </p>
      <h2>Planned / under consideration</h2>
      <ul>
        <li>Hardware wallet support.</li>
        <li>Expanded Cairo call decoding.</li>
        <li>More dApp transaction previews.</li>
        <li>Multi-account workflow improvements.</li>
        <li>Release verification improvements.</li>
      </ul>
      <p>
        Priorities can shift based on user feedback and ecosystem changes.
      </p>
    </SimplePage>
  ),
});
