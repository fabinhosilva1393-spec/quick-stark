import {
  ShieldCheck,
  Lock,
  EyeOff,
  Github,
  Cpu,
  Monitor,
  Apple,
  AppWindow,
  Network,
} from "lucide-react";
import { GITHUB_REPO_URL, anyReleaseAvailable } from "@/data/downloads";

function HeroMockup() {
  return (
    <div
      role="img"
      aria-label="StarknetWallet desktop preview showing an example transaction review"
      className="w-full max-w-[520px] mx-auto overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[0_30px_80px_-40px_rgba(20,30,80,0.25)]"
    >
      <div className="flex items-center gap-2 border-b border-hairline bg-surface-2 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.18_27)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.82_0.15_85)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.74_0.16_145)]" />
        <span className="ml-3 text-xs font-medium text-ink-muted">
          StarknetWallet — Preview
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-ink-muted">
          <Network size={11} aria-hidden="true" /> Starknet Mainnet
        </span>
      </div>

      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
          Example transaction
        </p>
        <h3 className="mt-1 text-base font-bold text-ink">Review transaction</h3>

        <dl className="mt-4 grid gap-2 rounded-lg border border-hairline bg-surface-2 p-3.5 text-xs">
          <div className="flex items-center justify-between">
            <dt className="text-ink-muted">dApp</dt>
            <dd className="font-medium text-ink">Example AMM</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-ink-muted">Contract</dt>
            <dd className="font-mono text-ink">0x049d…b71c</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-ink-muted">Estimated fee</dt>
            <dd className="font-medium text-ink">0.00021 ETH</dd>
          </div>
        </dl>

        <div className="mt-3 rounded-lg border border-hairline bg-[oklch(0.16_0.01_270)] p-3 font-mono text-[11px] leading-relaxed text-[oklch(0.92_0.02_85)] overflow-x-auto">
          <div className="text-[oklch(0.78_0.14_268)]">// Cairo call preview</div>
          <div>
            <span className="text-[oklch(0.85_0.14_85)]">call</span>{" "}
            AMM.swap_exact_tokens_for_tokens(
          </div>
          <div className="pl-4">amount_in: 100_000000000000000000,</div>
          <div className="pl-4">path: [STRK, USDC],</div>
          <div>);</div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <span className="inline-flex h-9 items-center justify-center rounded-lg border border-hairline bg-surface px-3 text-xs font-semibold text-ink">
            Reject
          </span>
          <span className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-brand px-3 text-xs font-semibold text-brand-foreground">
            <ShieldCheck size={12} aria-hidden="true" />
            Sign transaction
          </span>
        </div>
      </div>
    </div>
  );
}

const TRUST = [
  { icon: Github, label: "Open source" },
  { icon: ShieldCheck, label: "Signed releases" },
  { icon: Lock, label: "Local-first keys" },
  { icon: EyeOff, label: "No telemetry by default" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24">
      <div className="absolute inset-0 bg-grid-soft" aria-hidden="true" />
      <div className="container-page relative">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Desktop wallet · Open source · Signed releases
          </span>

          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.02]">
            The desktop wallet
            <br />
            built for{" "}
            <span className="text-brand">Starknet</span>.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-ink-muted leading-relaxed max-w-2xl">
            Manage STRK, preview Cairo calls, and review smart-account
            permissions with a local-first desktop wallet for macOS, Windows,
            and Linux.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#download"
              className="btn-primary"
              aria-label={
                anyReleaseAvailable
                  ? "Jump to download options"
                  : "View release status"
              }
            >
              <Monitor size={16} aria-hidden="true" />
              {anyReleaseAvailable ? "Download" : "View release status"}
            </a>

            <a href="#verify" className="btn-ghost">
              <ShieldCheck size={16} aria-hidden="true" />
              Verify release
            </a>

            <a href="#demo" className="btn-ghost">
              View demo
            </a>


            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-ink-muted hover:text-ink inline-flex items-center gap-1.5 px-3 py-2"
            >
              <Github size={14} aria-hidden="true" />
              View source
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Trust signals">
            {TRUST.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className="trust-chip">
                  <Icon size={13} aria-hidden="true" />
                  {label}
                </span>
              </li>
            ))}
            <li>
              <span className="trust-chip">
                <Apple size={13} aria-hidden="true" />
                <AppWindow size={13} aria-hidden="true" />
                <Cpu size={13} aria-hidden="true" />
                macOS · Windows · Linux
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
