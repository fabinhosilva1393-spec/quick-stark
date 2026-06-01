import { Wallet, Code2, ShieldCheck, Zap, Eye, Layers } from "lucide-react";

const FEATURES = [
  {
    icon: Wallet,
    title: "Native STRK management",
    body: "Send, receive, and stake STRK with one-click flows. Track every Starknet token, NFT, and account in a single dashboard.",
  },
  {
    icon: Code2,
    title: "Cairo call preview",
    body: "Inspect every contract call before signing. See entrypoints, calldata, and expected effects in human-readable form.",
  },
  {
    icon: ShieldCheck,
    title: "Smart-account permissions",
    body: "Review session keys, spend limits, and account abstraction policies. Revoke any grant with a single click.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    body: "Native desktop app. No browser tab. Sub-100ms account switching and instant signing on Apple Silicon.",
  },
  {
    icon: Eye,
    title: "Hardware wallet ready",
    body: "Pair with Ledger over USB. Keep keys offline while enjoying the full Starknet experience.",
  },
  {
    icon: Layers,
    title: "Multi-account, multi-network",
    body: "Manage mainnet, sepolia, and custom RPCs side by side. Switch contexts without losing state.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Features</span>
          <h2 className="section-title mt-4">
            Everything Starknet, on your desktop.
          </h2>
          <p className="section-sub">
            A focused toolkit for power users who need clarity, speed, and
            control over their smart accounts.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="surface-card">
              <div
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(236,121,107,0.22), rgba(169,167,255,0.18))",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <Icon size={20} className="text-white" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white tracking-tight">
                {title}
              </h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
