import {
  ShieldCheck,
  Lock,
  EyeOff,
  Github,
  Cpu,
  Monitor,
  Apple,
  AppWindow,
} from "lucide-react";
import { GITHUB_REPO_URL, anyReleaseAvailable } from "@/data/downloads";

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
