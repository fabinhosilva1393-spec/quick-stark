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
import { Link } from "@tanstack/react-router";
import { GITHUB_REPO_URL, anyReleaseAvailable } from "@/data/downloads";
import heroLaptop from "@/assets/hero-laptop.png.asset.json";


const TRUST = [
  { icon: Github, label: "Open source" },
  { icon: ShieldCheck, label: "Signed builds" },
  { icon: Lock, label: "Local-first keys" },
  { icon: EyeOff, label: "No telemetry by default" },
];

export function Hero() {
  return (
    <section id="about" className="relative overflow-hidden pt-16 pb-20 lg:pt-20 lg:pb-24">
      <div className="absolute inset-0 bg-grid-soft" aria-hidden="true" />
      <div className="container-page relative">
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] gap-12 lg:gap-12 items-center">
          <div className="min-w-0">

          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Secure desktop wallet for Starknet
          </span>

          <h1 className="hero-h1 hero-title mt-6 text-ink">
            <span className="hero-line"><span className="hero-initial">S</span>ecure every</span>
            <span className="hero-line"><span className="hero-initial">S</span>tarknet</span>
            <span className="hero-line"><span className="hero-initial">A</span>pproval</span>
            <span className="hero-line hero-line-blue accent"><span className="hero-initial hero-initial-blue">C</span>learly.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-ink-muted leading-relaxed max-w-2xl">
            Manage STRK, review Cairo calls, and understand smart-account
            permissions from a focused desktop wallet experience built for
            Starknet users and Cairo builders.
          </p>


          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#download"
              className="btn-primary"
              aria-label={
                anyReleaseAvailable
                  ? "Jump to download options"
                  : "View version status"
              }
            >
              <Monitor size={16} aria-hidden="true" />
              {anyReleaseAvailable ? "Download" : "View version status"}
            </a>

            <Link to="/releases" className="btn-ghost">
              <ShieldCheck size={16} aria-hidden="true" />
              Verify build
            </Link>

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
            <li>
              <span className="trust-chip trust-chip-brand">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2.5l2.4 6.6 6.6 2.4-6.6 2.4L12 20.5 9.6 13.9 3 11.5l6.6-2.4L12 2.5z" fill="currentColor" />
                </svg>
                Cairo · STRK · Smart accounts
              </span>
            </li>
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

          <div className="relative min-w-0 w-full mx-auto lg:mx-0 lg:ml-auto" style={{ width: "100%", maxWidth: "clamp(320px, 50vw, 920px)" }}>
            <img
              src={heroLaptop.url}
              alt="StarknetWallet desktop wallet interface showing STRK assets, staking, transaction review and secure signing workflows"
              width={1448}
              height={1086}
              loading="eager"
              decoding="async"
              className="block w-full h-auto object-contain"
              style={{ objectPosition: "center" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
