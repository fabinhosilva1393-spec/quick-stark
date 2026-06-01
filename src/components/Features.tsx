import { Wallet, Code2, ShieldCheck, Monitor, Eye, Layers } from "lucide-react";

const FEATURES = [
  {
    icon: Wallet,
    title: "Native STRK management",
    body: "Send, receive, and track STRK and other Starknet assets across mainnet and sepolia from a single interface.",
  },
  {
    icon: Code2,
    title: "Cairo call preview",
    body: "Inspect every contract call before signing. See entrypoints, calldata, and the account that will execute it.",
  },
  {
    icon: ShieldCheck,
    title: "Smart-account permissions",
    body: "Review session keys, spend limits, and account-abstraction policies. Revoke any active grant.",
  },
  {
    icon: Monitor,
    title: "Native desktop experience",
    body: "A focused desktop app, not a browser tab. Predictable performance, separate from your browsing session.",
  },
  {
    icon: Eye,
    title: "Hardware wallet ready",
    body: "Pair with Ledger over USB to keep keys offline while signing on Starknet.",
  },
  {
    icon: Layers,
    title: "Multi-account, multi-network",
    body: "Manage multiple accounts across mainnet, sepolia, and custom RPC endpoints side by side.",
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="surface-card">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-brand border border-hairline">
                <Icon size={18} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink tracking-tight">
                {title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
