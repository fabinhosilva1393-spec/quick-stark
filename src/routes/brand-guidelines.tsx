import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";

const TITLE = "Brand guidelines — StarknetWallet";
const DESC = "StarknetWallet visual identity notes and Starknet media kit link.";

export const Route = createFileRoute("/brand-guidelines")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => (
    <SimplePage eyebrow="Brand" title="Brand guidelines">
      <p>
        StarknetWallet uses a dark, crypto-premium visual identity with
        Starknet-inspired accent colors. The product is a desktop wallet, and
        the brand reflects a focus on signed releases, local-first keys, and
        clear transaction previews.
      </p>
      <h2>Visual identity</h2>
      <ul>
        <li>Dark background with subtle hairline borders.</li>
        <li>Starknet-inspired primary accent for actions and emphasis.</li>
        <li>Clean typography with strong hierarchy.</li>
        <li>Minimal, restrained motion.</li>
      </ul>
      <h2>Affiliation</h2>
      <p>
        StarknetWallet is not affiliated with Starknet Foundation unless
        explicitly stated. Ecosystem links are provided for context only.
      </p>
      <h2>Starknet media kit</h2>
      <p>
        For official Starknet logos and brand assets, see the Starknet media
        kit:{" "}
        <a
          href="https://www.starknet.io/media-kit/"
          target="_blank"
          rel="noopener noreferrer"
        >
          starknet.io/media-kit ↗
        </a>
      </p>
    </SimplePage>
  ),
});
