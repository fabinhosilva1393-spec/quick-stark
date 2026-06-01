import {
  StarknetIsoIllustration,
  type IsoIllustrationVariant,
} from "./StarknetIsoIllustration";

const ITEMS: Array<{
  variant: IsoIllustrationVariant;
  title: string;
  body: string;
}> = [
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
    title: "Signed SHA256 / PGP releases",
    body: "Every published build ships with a SHA256 checksum and a PGP signature so you can verify before installing.",
  },
  {
    variant: "secure-enclave",
    title: "Secure Enclave when available",
    body: "On supported devices, sensitive material can be protected by the platform Secure Enclave.",
  },
  {
    variant: "open-source",
    title: "Open-source verification",
    body: "The desktop application source is public. You can audit, build, or fork it yourself.",
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

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ variant, title, body }, i) => (
            <article key={title} className="feature-visual-card">
              <StarknetIsoIllustration
                variant={variant}
                size={220}
                delay={i * 0.35}
                className="feature-visual-card__art"
              />
              <div className="mt-2">
                <h3 className="text-lg font-bold text-ink tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
