import { Lock, EyeOff, FileCheck2, Github, Cpu, BugPlay } from "lucide-react";

const ITEMS = [
  {
    icon: Lock,
    title: "Local-first private keys",
    body: "Private keys are generated and stored on your device. They are never transmitted to any server.",
  },
  {
    icon: EyeOff,
    title: "No telemetry by default",
    body: "No analytics, no usage tracking, and no remote logging unless you explicitly opt in.",
  },
  {
    icon: FileCheck2,
    title: "Signed releases",
    body: "Every published build ships with a SHA256 checksum and a PGP signature so you can verify before installing.",
  },
  {
    icon: Github,
    title: "Open source",
    body: "The desktop application source is public. You can audit, build, or fork it yourself.",
  },
  {
    icon: Cpu,
    title: "Hardware wallet support",
    body: "Ledger over USB is supported so signing keys can stay on dedicated hardware.",
  },
  {
    icon: BugPlay,
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
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="surface-card">
              <Icon size={18} className="text-brand" aria-hidden="true" />
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
