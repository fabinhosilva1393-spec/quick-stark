import {
  StarknetIsoIllustration,
  type IsoIllustrationVariant,
} from "./StarknetIsoIllustration";

const FEATURES: Array<{
  variant: IsoIllustrationVariant;
  title: string;
  body: string;
  chips?: string[];
}> = [
  {
    variant: "wallet",
    title: "Native STRK management",
    body: "Send, receive, and track STRK and other Starknet assets across mainnet and sepolia from a single interface.",
    chips: ["STRK", "ETH", "USDC"],
  },
  {
    variant: "cairo-preview",
    title: "Cairo call preview",
    body: "Inspect every contract call before signing. See entrypoints, calldata, and the account that will execute it.",
    chips: ["Calldata", "Entrypoint"],
  },
  {
    variant: "permissions",
    title: "Smart-account permissions",
    body: "Review session keys, spend limits, and account-abstraction policies. Revoke any active grant.",
    chips: ["Session keys", "Spend limits"],
  },
  {
    variant: "signed-release",
    title: "Signed releases",
    body: "Every build ships with SHA256 checksums and PGP signatures so you can verify before you install.",
    chips: ["SHA256", "PGP"],
  },
  {
    variant: "hardware-wallet",
    title: "Hardware wallet ready",
    body: "Pair with Ledger over USB to keep keys offline while signing on Starknet.",
    chips: ["Ledger", "USB"],
  },
  {
    variant: "multi-network",
    title: "Multi-account, multi-network",
    body: "Manage multiple accounts across mainnet, sepolia, and custom RPC endpoints side by side.",
    chips: ["Mainnet", "Sepolia", "Custom RPC"],
  },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Features</span>
          <h2 className="section-title mt-4">
            Everything Starknet, on your desktop.
          </h2>
          <p className="section-sub">
            A focused toolkit for users and builders who need clarity over
            their accounts, calls, and permissions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ variant, title, body, chips }, i) => (
            <article key={title} className="feature-visual-card">
              <div className="feature-visual-card__art">
                <StarknetIsoIllustration
                  variant={variant}
                  size={180}
                  delay={i * 0.4}
                />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-bold text-ink tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {body}
                </p>
                {chips && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {chips.map((c) => (
                      <li
                        key={c}
                        className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted bg-surface-2 border border-hairline rounded-full px-2 py-1"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
