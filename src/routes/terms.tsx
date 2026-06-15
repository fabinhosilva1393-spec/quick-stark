import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { TermsIllustration } from "@/components/illustrations/PageIllustrations";

const TITLE = "Terms — StarknetWallet";
const DESC = "Responsible use guidance for the StarknetWallet website and desktop wallet.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://starknetwallet.org/terms" },
    ],
    links: [{ rel: "canonical", href: "https://starknetwallet.org/terms" }],
  }),
  component: () => (
    <SimplePage eyebrow="Legal" title="Terms" illustration={<TermsIllustration />}>
      <p>
        These terms explain the responsible use of StarknetWallet, including
        download verification, transaction review, and user-controlled
        account management.
      </p>
      <ul>
        <li>StarknetWallet provides a desktop interface for Starknet account workflows and transaction review.</li>
        <li>Users remain responsible for reviewing transaction details before signing.</li>
        <li>Downloads should be verified using checksums and build signatures when available.</li>
        <li>The product is designed for local-first key control and transparent signing context.</li>
        <li>Website demo screens are for product preview and do not perform live wallet actions.</li>
      </ul>
      <p>
        Use StarknetWallet with a verification-first mindset: confirm the
        source, review the transaction, and sign only when the details are
        clear.
      </p>
    </SimplePage>
  ),
});
