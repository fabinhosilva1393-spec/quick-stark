import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { TermsIllustration } from "@/components/illustrations/PageIllustrations";

const TITLE = "Terms — StarknetWallet";
const DESC = "Terms covering use of the StarknetWallet website and desktop wallet.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => (
    <SimplePage eyebrow="Legal" title="Terms" illustration={<TermsIllustration />}>
      <ul>
        <li>This is an informational website and a desktop wallet download page.</li>
        <li>The software is provided as-is, without warranty of any kind.</li>
        <li>Using crypto involves risk, including total loss of funds.</li>
        <li>
          You are responsible for verifying downloads (checksums, signatures)
          and for reviewing transactions before signing.
        </li>
        <li>
          StarknetWallet is not affiliated with Starknet Foundation unless
          explicitly stated.
        </li>
      </ul>
    </SimplePage>
  ),
});
