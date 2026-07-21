import { ShieldCheck, Lock, Download, Monitor } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Demo } from "@/components/Demo";

export function Hero() {
  return (
    <section id="about" className="relative overflow-hidden pt-16 pb-20 lg:pt-20 lg:pb-24">
      <div className="absolute inset-0 bg-grid-soft" aria-hidden="true" />
      <div className="container-page relative">
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] gap-12 lg:gap-12 items-center">
          <div className="min-w-0 max-w-[620px]">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Open-source Starknet desktop wallet
            </span>

            <h1 className="hero-h1 mt-6 text-ink">
              <span className="hero-line">Official Starknet Wallet for Desktop</span>
              <span className="hero-line accent">Windows, macOS &amp; Linux</span>
            </h1>

            <p className="mt-6 text-lg sm:text-[18px] leading-[1.65] text-ink-muted max-w-[540px]">
              Manage STRK, review Cairo calls and understand smart-account permissions before signing. Secure, local-first and built for the Starknet ecosystem.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#download" className="btn-primary">
                <Monitor size={16} aria-hidden="true" />
                Download for Desktop
              </a>

              <Link to="/releases" className="btn-ghost">
                <ShieldCheck size={16} aria-hidden="true" />
                Verify Build
              </Link>
            </div>

            <p className="mt-7 flex items-center gap-2 text-xs font-medium tracking-wide text-ink-subtle">
              <Download size={12} aria-hidden="true" />
              Open source · Signed builds · Local-first keys
            </p>
          </div>

          <div className="relative min-w-0 w-full max-w-[780px] mx-auto lg:mx-0 lg:ml-auto demo-stage lg:translate-y-6 xl:translate-y-7">
            <span className="demo-glow" aria-hidden="true" />
            <span className="demo-orbit" aria-hidden="true" />
            <span className="demo-orbit demo-orbit-2" aria-hidden="true" />
            <span className="hero-particle hero-particle-a" aria-hidden="true" />
            <span className="hero-particle hero-particle-b" aria-hidden="true" />
            <span className="hero-particle hero-particle-c" aria-hidden="true" />
            <span className="hero-particle hero-particle-d" aria-hidden="true" />
            <span className="hero-particle hero-particle-e" aria-hidden="true" />
            <span className="hero-particle hero-particle-f" aria-hidden="true" />
            <span className="hero-particle hero-particle-g" aria-hidden="true" />
            <span className="hero-particle hero-particle-h" aria-hidden="true" />
            <div className="demo-tilt">
              <div className="demo-drift">
                <Demo compact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
