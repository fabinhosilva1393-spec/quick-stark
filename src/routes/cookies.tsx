import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";

const TITLE = "Cookies — StarknetWallet";
const DESC = "Cookie usage on the StarknetWallet website.";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => (
    <SimplePage eyebrow="Legal" title="Cookies">
      <p>This site does not intentionally use tracking cookies.</p>
      <p>
        No third-party advertising or analytics cookies are loaded as part of
        the marketing pages. Essential browser storage may be used by the
        framework to render the site, but it is not used to profile visitors.
      </p>
      <p>
        The StarknetWallet desktop application itself does not use cookies —
        it stores configuration locally on your device.
      </p>
    </SimplePage>
  ),
});
