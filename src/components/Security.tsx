import { AnimatedIsoIcon, type IsoVariant } from "./AnimatedIsoIcon";

const ITEMS: Array<{ variant: IsoVariant; title: string; body: string }> = [
  {
    variant: "local-keys",
    title: "Local-first private keys",
    body: "Private keys are generated and stored on your device. They are never transmitted to any server.",
  },
  {
    variant: "no-telemetry",
    title: "No telemetry by default",
    body: "No analytics, no usage tracking, and no remote logging unless you explicitly opt in.",
  },
  {
    variant: "signed-release",
    title: "Signed releases",
    body: "Every published build ships with a SHA256 checksum and a PGP signature so you can verify before installing.",
  },
  {
    variant: "open-source",
    title: "Open source",
    body: "The desktop application source is public. You can audit, build, or fork it yourself.",
  },
  {
    variant: "secure-enclave",
    title: "Hardware wallet support",
    body: "Ledger over USB is supported so signing keys can stay on dedicated hardware.",
  },
  {
    variant: "disclosure",
    title: "Responsible disclosure",
    body: "Security issues should be reported privately to the maintainers via the channel listed in the public repository.",
  },
];

export function Security() {
  return (
    <section id="security" className="py-24 bg-surface-2 border-y border-hairline">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Security model</span>
          <h2 className="section-title mt-4">
            Your keys. Your machine. Your rules.
          </h2>
          <p className="section-sub">
            StarknetWallet is built with a security-first architecture and
            ships with the verification tooling you expect from a wallet that
            custodies your assets.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ variant, title, body }, i) => (
            <div key={title} className="surface-card">
              <AnimatedIsoIcon variant={variant} size={48} delay={i * 0.35} />
              <h3 className="mt-3 text-base font-bold text-ink">{title}</h3>
              <p className="mt-1 text-sm text-ink-muted leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
