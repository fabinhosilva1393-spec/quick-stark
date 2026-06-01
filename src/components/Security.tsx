import { Lock, KeyRound, FileCheck2, Cpu } from "lucide-react";

const ITEMS = [
  { icon: Lock, title: "Open source", body: "Every release is reproducible from the public source tree." },
  { icon: KeyRound, title: "Local-first keys", body: "Private keys never leave your device. No accounts. No telemetry by default." },
  { icon: FileCheck2, title: "Signed releases", body: "All builds are SHA256-checksummed and PGP-signed. Verify before you install." },
  { icon: Cpu, title: "Secure enclave", body: "On Apple Silicon, keys are protected by the Secure Enclave when available." },
];

export function Security() {
  return (
    <section id="security" className="py-24 relative">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="eyebrow">Security</span>
            <h2 className="section-title mt-4">
              Your keys. Your machine. Your rules.
            </h2>
            <p className="section-sub">
              StarknetWallet is built with a security-first architecture and
              ships with the verification tooling you expect from a serious
              wallet.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {ITEMS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <Icon size={18} className="text-brand" aria-hidden="true" />
                <h3 className="mt-3 text-base font-bold text-white">{title}</h3>
                <p className="mt-1 text-sm text-white/60 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
