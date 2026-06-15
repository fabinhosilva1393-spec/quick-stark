import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { RoadmapIllustration } from "@/components/illustrations/PageIllustrations";

const TITLE = "Product evolution — StarknetWallet";
const DESC =
  "A maintained product track for StarknetWallet's desktop stability, signing clarity, compatibility, and security review workflows.";

const STAGES: { stage: string; body: string }[] = [
  {
    stage: "Desktop workflow maturity",
    body: "Continued refinements to account navigation, transaction review, and desktop interaction.",
  },
  {
    stage: "Signing clarity",
    body: "Clearer Cairo call decoding, calldata review, and smart-account permission context.",
  },
  {
    stage: "Compatibility expansion",
    body: "Broader support for macOS, Windows, Linux, and compatible hardware-wallet signing workflows.",
  },
  {
    stage: "Security interface improvement",
    body: "Stronger verification surfaces, checksum guidance, and build integrity messaging.",
  },
  {
    stage: "Hardware-wallet workflow support",
    body: "Clearer compatibility paths for users who prefer external signing devices.",
  },
  {
    stage: "Long-term maintenance",
    body: "Ongoing improvements focused on stability, trust, and Starknet-native workflows.",
  },
];

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://starknetwallet.org/roadmap" },
    ],
    links: [{ rel: "canonical", href: "https://starknetwallet.org/roadmap" }],
  }),
  component: () => (
    <SimplePage eyebrow="Direction" title="Product evolution" illustration={<RoadmapIllustration />}>
      <p>
        StarknetWallet follows a maintained product track focused on desktop
        stability, signing clarity, compatibility, and security review
        workflows.
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
