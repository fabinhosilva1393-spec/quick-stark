import { GITHUB_REPO_URL } from "@/data/downloads";
import { Terminal, Github } from "lucide-react";

export function Developers() {
  return (
    <section id="developers" className="py-24 bg-surface-2 border-y border-hairline">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">Developers</span>
            <h2 className="section-title mt-4">
              First-class tooling for Cairo builders.
            </h2>
            <p className="section-sub">
              Test contract calls before deploying. Connect to local devnets.
              Inspect every entrypoint and event from a clean UI.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-ink-muted">
              <li>· Cairo builder tooling and call preview</li>
              <li>· Local devnet and custom RPC endpoints</li>
              <li>· Transaction simulation before signing</li>
              <li>· Multi-account workspaces</li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Github size={16} aria-hidden="true" /> View source on GitHub
              </a>
            </div>
          </div>

          <div className="surface-card font-mono text-[13px] leading-relaxed">
            <div className="flex items-center gap-2 text-ink-muted text-xs mb-3">
              <Terminal size={14} aria-hidden="true" />
              terminal · preview
            </div>
            <pre className="text-ink overflow-x-auto whitespace-pre-wrap">
{`$ starknetwallet sign \\
    --network mainnet \\
    --to 0x07f...c4 \\
    --selector transfer \\
    --calldata 0x06a,1000000000000000000

› preview: ERC20.transfer(to=0x06a, amount=1.0 STRK)
› account: 0x021...e9 (smart account)
› fee:     estimated at sign time
› signature: awaiting hardware confirmation`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
