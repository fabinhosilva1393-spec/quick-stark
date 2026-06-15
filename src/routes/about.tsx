import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { AboutIllustration } from "@/components/illustrations/PageIllustrations";

const TITLE = "About — StarknetWallet";
const DESC = "Desktop wallet for Starknet with local-first keys and signed builds.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://starknetwallet.org/about" },
    ],
    links: [{ rel: "canonical", href: "https://starknetwallet.org/about" }],
  }),
  component: () => (
    <SimplePage eyebrow="Project" title="About StarknetWallet" illustration={<AboutIllustration />}>
      <p>
        StarknetWallet is a desktop wallet experience built for Starknet
        users who want clearer transaction review, local-first key control,
        and smart-account signing visibility across macOS, Windows, and
        Linux.
      </p>
      <h2>Product principles</h2>
      <ul>
        <li>Local-first control. Account material stays on the user's device.</li>
        <li>Clear approval context. Transactions, permissions, and network details are easy to review before signing.</li>
        <li>Starknet-native workflows. Built around Cairo calls, STRK activity, and smart-account permission models.</li>
        <li>Verification-first installation. Downloads are paired with checksum and signature guidance where available.</li>
        <li>Open product direction. The product is maintained with a focus on clarity, security, and responsible iteration.</li>
      </ul>
    </SimplePage>

  ),
});
