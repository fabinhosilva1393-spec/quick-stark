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
    title: "STRK account overview",
    body: "Track STRK and other Starknet assets across Mainnet and Sepolia from a single, focused interface.",
    chips: ["STRK", "ETH", "USDC"],
  },
  {
    variant: "cairo-preview",
    title: "Cairo call preview",
    body: "Inspect every contract call before signing — entrypoint, decoded calldata, and the account that will execute it.",
    chips: ["Calldata", "Entrypoint"],
  },
  {
    variant: "permissions",
    title: "Smart-account permission review",
    body: "Surface session keys, spend limits, and account-abstraction policies. Revoke an active grant the moment intent changes.",
    chips: ["Session keys", "Spend limits"],
  },
  {
    variant: "signed-release",
    title: "Verified build workflow",
    body: "Every build ships with SHA256 checksums and PGP signatures so you can confirm what you install before launching it.",
    chips: ["SHA256", "PGP"],
  },
  {
    variant: "hardware-wallet",
    title: "Hardware-signer ready",
    body: "Prepared for hardware signing through compatible Starknet wallets and tooling.",
    chips: ["Ledger", "Compatible"],
  },
  {
    variant: "multi-network",
    title: "Multi-account, multi-network",
    body: "Work across Mainnet, Sepolia, and custom RPC endpoints with clear visual context for each environment.",
    chips: ["Mainnet", "Sepolia", "Custom RPC"],
  },

];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Features</span>
          <h2 className="font-display section-title mt-4 font-semibold">
            A focused toolkit for Starknet.
          </h2>
          <p className="section-sub">
            Product-grade clarity for the moments that matter — accounts,
            calls, permissions, and verified desktop builds.
          </p>

        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ variant, title, body, chips }, i) => (
            <article key={title} className="feature-visual-card">
              <StarknetIsoIllustration
                variant={variant}
                size={240}
                delay={i * 0.4}
                className="feature-visual-card__art"
              />
              <div className="mt-2">
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
