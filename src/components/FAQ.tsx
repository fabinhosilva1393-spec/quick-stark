import { ChevronDown } from "lucide-react";
import { GITHUB_REPO_URL } from "@/data/downloads";

const QA: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is StarknetWallet free?",
    a: "Yes. StarknetWallet is free and open source. There are no subscriptions, no premium tiers, and no in-app upsells.",
  },
  {
    q: "Is StarknetWallet affiliated with the Starknet Foundation?",
    a: "No. StarknetWallet is an independent project. It is not affiliated with, endorsed by, or operated by the Starknet Foundation or StarkWare unless explicitly stated.",
  },
  {
    q: "Does StarknetWallet collect my data?",
    a: "No telemetry is sent by default. Private keys never leave your device. You can route RPC calls through your own node for full privacy.",
  },
  {
    q: "Which Starknet accounts are supported?",
    a: "Common account-abstraction implementations on Starknet, including Argent and Braavos-style accounts, as well as standard OpenZeppelin accounts.",
  },
  {
    q: "Can I use a Ledger hardware wallet?",
    a: "Hardware-wallet workflows are supported through compatible Starknet signing tooling. Ledger users typically sign Starknet transactions via wallets such as Argent, Braavos, or Ready. No direct native Ledger integration is claimed unless explicitly documented.",
  },

  {
    q: "How do I verify a release?",
    a: (
      <>
        Every published build ships with a SHA256 checksum and a PGP signature.
        See the verification commands on the{" "}
        <a href="/releases" className="text-link">releases page</a> for the
        exact steps once a release is published.
      </>
    ),
  },
  {
    q: "What platforms are supported?",
    a: "macOS 12 or later (Apple Silicon and Intel), Windows 10 or later (x64), and recent Linux distributions via .AppImage or .deb.",
  },
  {
    q: "Where do I report a vulnerability?",
    a: (
      <>
        Please report security issues privately through the channel listed in
        the public{" "}
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          GitHub organization
        </a>
        . Do not open a public issue for an exploitable vulnerability.
      </>
    ),
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24">
      <span id="roadmap" aria-hidden="true" className="block -mt-24 pt-24" />
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title mt-4">Questions, answered.</h2>
        </div>

        <div className="mt-10 max-w-3xl divide-y divide-hairline border-y border-hairline">
          {QA.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                <span className="text-base sm:text-lg font-semibold text-ink">
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className="text-ink-muted shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="pt-3 text-sm text-ink-muted leading-relaxed max-w-2xl">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
