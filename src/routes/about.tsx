import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";

const TITLE = "About — StarknetWallet";
const DESC = "Desktop wallet for Starknet with local-first keys and signed builds.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => (
    <SimplePage eyebrow="Project" title="About StarknetWallet">
      <p>
        StarknetWallet is an independent desktop wallet project built for
        Starknet workflows. It is designed for managing STRK, reviewing Cairo
        calls before signing, and inspecting smart-account permissions on
        macOS, Windows, and Linux.
      </p>
      <h2>Principles</h2>
      <ul>
        <li>Local-first by design — account material stays on your device.</li>
        <li>Open source, with public code available for independent review.</li>
        <li>Signed builds with published SHA256 checksums and PGP signatures.</li>
        <li>Clear, readable transaction previews before every approval.</li>
        <li>Honest, careful product language — no overpromising.</li>
      </ul>
      <p>
        StarknetWallet is not affiliated with Starknet Foundation unless
        explicitly stated. Ecosystem references are provided for context.
      </p>
    </SimplePage>

  ),
});
