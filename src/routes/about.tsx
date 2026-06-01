import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";

const TITLE = "About — StarknetWallet";
const DESC = "Desktop wallet for Starknet with local-first keys and signed releases.";

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
        StarknetWallet is a desktop wallet for Starknet. It is built for
        managing STRK, previewing Cairo calls before signing, and reviewing
        smart-account permissions on macOS, Windows, and Linux.
      </p>
      <h2>Principles</h2>
      <ul>
        <li>Local-first desktop workflow — keys stay on your device.</li>
        <li>Open source.</li>
        <li>Signed releases with published checksums.</li>
        <li>Clear, readable transaction previews.</li>
      </ul>
      <p>
        StarknetWallet is not affiliated with Starknet Foundation unless
        explicitly stated. Ecosystem links are provided for context.
      </p>
    </SimplePage>
  ),
});
