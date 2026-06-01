import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { GITHUB_REPO_URL } from "@/data/downloads";

const TITLE = "Contact — StarknetWallet";
const DESC = "Where to file issues and report security concerns for StarknetWallet.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: () => (
    <SimplePage eyebrow="Get in touch" title="Contact">
      <p>
        For now, use the project GitHub/source link for issues and security
        reports. We do not publish a contact email until one can be monitored
        responsibly.
      </p>
      <h2>Issues and security reports</h2>
      {GITHUB_REPO_URL ? (
        <p>
          Open an issue or send a security report through GitHub:{" "}
          <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
            {GITHUB_REPO_URL.replace("https://", "")} ↗
          </a>
        </p>
      ) : (
        <p className="text-ink-muted/70">
          Project repository link not configured yet.
        </p>
      )}
      <p>
        For sensitive disclosures, please mark the issue clearly and avoid
        sharing exploit details publicly until they can be triaged.
      </p>
    </SimplePage>
  ),
});
