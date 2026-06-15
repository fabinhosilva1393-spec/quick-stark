import { createFileRoute, Link } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";

const TITLE = "Version History — StarknetWallet";
const DESC =
  "Maintenance history and version milestones for the StarknetWallet desktop application.";

const HISTORY: { version: string; label: string; description: string; items: string[] }[] = [
  {
    version: "v2.4.3",
    label: "Current maintained version",
    description:
      "The current desktop build for StarknetWallet's maintained product track.",
    items: [
      "Refined account overview and transaction history surfaces.",
      "Improved Cairo call review for common dApp interactions.",
      "Smaller stability and performance refinements.",
    ],
  },
  {
    version: "v2.3.8",
    label: "Signing workflow update",
    description:
      "Refined Starknet transaction review, Cairo call visibility, and smart-account permission context.",
    items: [
      "Improved decoded calldata layout before signing.",
      "Clearer smart-account permission summaries.",
      "Reduced friction in multi-step approval flows.",
    ],
  },
  {
    version: "v2.2.1",
    label: "Compatibility update",
    description:
      "Expanded desktop compatibility structure for macOS, Windows, Linux, and hardware-wallet signing workflows.",
    items: [
      "Broader desktop compatibility coverage.",
      "Compatible signing workflows for hardware-wallet users.",
      "Refined platform-specific UI behavior.",
    ],
  },
  {
    version: "v2.1.5",
    label: "Security interface update",
    description:
      "Improved local-first key messaging, verification surfaces, and wallet safety guidance.",
    items: [
      "Clearer local-first key messaging.",
      "Refined verification surfaces and guidance.",
      "Improved wallet safety prompts.",
    ],
  },
  {
    version: "v2.0.0",
    label: "Desktop product milestone",
    description:
      "Consolidated the main StarknetWallet desktop experience, account overview, transaction review, and permissions model.",
    items: [
      "Unified desktop product surface across platforms.",
      "Consolidated account overview and transaction review.",
      "Permissions model brought into the main workflow.",
    ],
  },
  {
    version: "v1.8.6",
    label: "Wallet workflow refinement",
    description:
      "Improved multi-account flows, network visibility, and wallet interaction structure.",
    items: [
      "Refined multi-account switching.",
      "Clearer Mainnet and Sepolia network indicators.",
      "Tightened wallet interaction structure.",
    ],
  },
  {
    version: "v1.5.2",
    label: "Starknet workflow foundation",
    description:
      "Established the first maintained StarknetWallet desktop workflow for account visibility and transaction review.",
    items: [
      "Baseline desktop workflow for Starknet accounts.",
      "Initial Cairo call visibility surface.",
      "Foundational transaction review structure.",
    ],
  },
];

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://starknetwallet.org/changelog" },
    ],
    links: [{ rel: "canonical", href: "https://starknetwallet.org/changelog" }],
  }),
  component: () => (
    <SimplePage eyebrow="Version history" title="Version history">
      <p>
        A maintained product track for StarknetWallet on macOS, Windows, and
        Linux. The list below reflects continuous improvements across the
        desktop workflow, signing surfaces, compatibility, and security
        interface.
      </p>
      {HISTORY.map((entry) => (
        <section key={entry.version}>
          <h2>
            {entry.version} — {entry.label}
          </h2>
          <p>{entry.description}</p>
          <ul>
            {entry.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </section>
      ))}
      <p>
        See <Link to="/" hash="download">Download</Link> for the current
        maintained desktop build and verification details.
      </p>
    </SimplePage>
  ),
});
