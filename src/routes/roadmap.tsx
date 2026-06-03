import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { RoadmapIllustration } from "@/components/illustrations/PageIllustrations";

const TITLE = "Product evolution — Wallet";
const DESC =
  "Where Wallet's maintained desktop workflow is heading next.";

const STAGES: { stage: string; body: string }[] = [
  {
    stage: "Product foundation",
    body: "The maintained Starknet desktop workflow for account visibility and transaction review.",
  },
  {
    stage: "Desktop workflow maturity",
    body: "Continuous refinements to multi-account flows, navigation, and overall desktop interaction.",
  },
  {
    stage: "Compatibility expansion",
    body: "Broader desktop compatibility coverage across macOS, Windows, and Linux.",
  },
  {
    stage: "Signing workflow refinement",
    body: "Clearer Cairo call review, decoded calldata, and smart-account permission context before signing.",
  },
  {
    stage: "Security interface improvement",
    body: "Ongoing improvements to local-first key messaging, verification surfaces, and safety guidance.",
  },
  {
    stage: "Hardware-wallet workflow support",
    body: "Compatible signing workflows for hardware-wallet users alongside standard desktop signing.",
  },
  {
    stage: "Long-term maintenance",
    body: "An active maintenance cycle focused on stability, clarity, and Starknet-native workflows.",
  },
];

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
    <SimplePage eyebrow="Direction" title="Product evolution" illustration={<RoadmapIllustration />}>
      <p>
        Wallet is on a maintained product track. The stages below
        describe what we are improving next across the desktop workflow,
        signing surfaces, compatibility, and security interface. Priorities
        can shift based on user feedback and ecosystem changes.
      </p>
      <h2>What we are improving next</h2>
      <ul>
        {STAGES.map((s) => (
          <li key={s.stage}>
            <strong>{s.stage}.</strong> {s.body}
          </li>
        ))}
      </ul>
    </SimplePage>
  ),
});
