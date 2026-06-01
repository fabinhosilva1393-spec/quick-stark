import { GITHUB_REPO_URL } from "@/data/downloads";
import { Terminal, BookOpen, Github } from "lucide-react";

export function Developers() {
  return (
    <section id="developers" className="py-24 relative">
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

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Github size={16} aria-hidden="true" /> View on GitHub
              </a>
              <a
                href={`${GITHUB_REPO_URL}/starknet-docs`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <BookOpen size={16} aria-hidden="true" /> Read the docs
              </a>
            </div>
          </div>

          <div className="surface-card font-mono text-[13px] leading-relaxed">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
              <Terminal size={14} aria-hidden="true" />
              terminal
            </div>
            <pre className="text-white/85 overflow-x-auto">
{`$ starknetwallet sign \\
    --network mainnet \\
    --to 0x07f...c4 \\
    --selector transfer \\
    --calldata 0x06a,1000000000000000000

› preview: ERC20.transfer(to=0x06a, amount=1.0 STRK)
› account: 0x021...e9 (Argent v2)
› fee: 0.00021 STRK
› signature: 0x4b8...91  ✓`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
