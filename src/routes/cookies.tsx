import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { openCookieSettings } from "@/lib/cookieConsent";
import { CookiesIllustration } from "@/components/illustrations/PageIllustrations";

const TITLE = "Cookies — StarknetWallet";
const DESC = "Cookie usage on the StarknetWallet website.";

function CookiesPage() {
  return (
    <SimplePage eyebrow="Legal" title="Cookies" illustration={<CookiesIllustration />}>
      <p>This site uses cookies and local storage only as needed to operate.</p>
      <p>
        Essential storage is used to render the site and to remember your
        cookie preferences. Optional categories — analytics, marketing, and
        preferences — are off by default and only activated if you opt in.
      </p>
      <p>
        The StarknetWallet desktop application itself does not use cookies —
        it stores configuration locally on your device.
      </p>
      <div className="not-prose pt-2">
        <button
          type="button"
          onClick={() => openCookieSettings()}
          className="inline-flex items-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand/90 transition-colors"
        >
          Manage cookie preferences
        </button>
      </div>
    </SimplePage>
  );
}

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: CookiesPage,
});
