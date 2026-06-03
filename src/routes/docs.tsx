import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  BookOpen,
  Download as DownloadIcon,
  Rocket,
  Wallet,
  FileSearch,
  ShieldCheck,
  Lock,
  Cpu,
  Code2,
  LifeBuoy,
  Wrench,
  HelpCircle,
  Link2,
  KeyRound,
  Boxes,
  Network,
  Eye,
} from "lucide-react";
import {
  DocsArt,
  DocsHeroArt,
  type DocsArtVariant,
} from "@/components/illustrations/DocsIllustrations";

const TITLE = "StarknetWallet Docs — Install, verify, and sign with clarity";
const DESC =
  "Install, verify, set up accounts, review Cairo calls, and understand StarknetWallet workflows.";

type DocSection = {
  id: string;
  label: string;
  icon: typeof BookOpen;
};

const SECTIONS: DocSection[] = [
  { id: "introduction", label: "Introduction", icon: BookOpen },
  { id: "installation", label: "Installation", icon: DownloadIcon },
  { id: "first-setup", label: "First Setup", icon: Rocket },
  { id: "managing-accounts", label: "Managing Accounts", icon: Wallet },
  { id: "transaction-review", label: "Transaction Review", icon: FileSearch },
  { id: "smart-account-permissions", label: "Smart-Account Permissions", icon: KeyRound },
  { id: "security-practices", label: "Security Practices", icon: ShieldCheck },
  { id: "hardware-wallet-workflows", label: "Hardware Wallet Workflows", icon: Cpu },
  { id: "developer-workflows", label: "dApp & Developer Workflows", icon: Code2 },
  { id: "troubleshooting", label: "Troubleshooting", icon: Wrench },
  { id: "advanced-tools", label: "Advanced Tools", icon: Boxes },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "resources", label: "Resources & Support", icon: LifeBuoy },
];

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/docs" }],
  }),
  component: DocsPage,
});

function DocsPage() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main" className="flex-1">
        <DocsHero />

        <section className="border-t border-hairline bg-background">
          <div className="container-page py-12 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_220px]">
              {/* Sidebar */}
              <aside className="lg:sticky lg:top-20 lg:self-start">
                {/* Mobile dropdown */}
                <div className="lg:hidden">
                  <label htmlFor="docs-jump" className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                    Jump to section
                  </label>
                  <select
                    id="docs-jump"
                    value={active}
                    onChange={(e) => {
                      const id = e.target.value;
                      setActive(id);
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="mt-2 w-full rounded-lg border border-hairline bg-surface px-3 py-2 text-sm text-ink"
                  >
                    {SECTIONS.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>

                {/* Desktop sidebar */}
                <nav aria-label="Docs sections" className="hidden lg:block">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                    Docs
                  </p>
                  <ul className="mt-3 space-y-0.5 list-none p-0">
                    {SECTIONS.map(({ id, label, icon: Icon }) => {
                      const isActive = active === id;
                      return (
                        <li key={id}>
                          <a
                            href={`#${id}`}
                            className={[
                              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                              isActive
                                ? "bg-brand/10 text-ink font-semibold border-l-2 border-brand"
                                : "text-ink-muted hover:text-ink hover:bg-surface",
                            ].join(" ")}
                          >
                            <Icon size={14} className={isActive ? "text-brand" : "text-ink-subtle"} aria-hidden="true" />
                            {label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </aside>

              {/* Main content */}
              <article className="min-w-0 space-y-16">
                <Introduction />
                <Installation />
                <FirstSetup />
                <ManagingAccounts />
                <TransactionReview />
                <SmartAccountPermissions />
                <SecurityPractices />
                <HardwareWalletWorkflows />
                <DeveloperWorkflows />
                <Troubleshooting />
                <AdvancedTools />
                <FAQSection />
                <Resources />
              </article>

              {/* Right "on this page" */}
              <aside className="hidden xl:block sticky top-20 self-start">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                  On this page
                </p>
                <ul className="mt-3 space-y-1.5 list-none p-0 text-sm">
                  {SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={[
                          "block leading-snug transition-colors",
                          active === s.id ? "text-brand font-semibold" : "text-ink-muted hover:text-ink",
                        ].join(" ")}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Hero ---------- */

function DocsHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] items-center">
          <div>
            <span className="eyebrow">Docs</span>
            <h1 className="font-display section-title mt-4 font-semibold">
              StarknetWallet Docs
            </h1>
            <p className="section-sub max-w-2xl">
              Everything users and developers need to understand
              StarknetWallet — from installation and account setup to Cairo
              call review, smart-account permissions, hardware-wallet
              workflows, and secure signing on Starknet.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2 list-none p-0">
              {[
                { icon: Lock, t: "Local-first key control" },
                { icon: Eye, t: "Clear Cairo call review" },
                { icon: KeyRound, t: "Smart-account visibility" },
                { icon: ShieldCheck, t: "Verification-first installs" },
              ].map(({ icon: Icon, t }) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted"
                >
                  <Icon size={13} className="text-brand" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <DocsIllustration />
        </div>
      </div>
    </section>
  );
}

function DocsIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] aspect-square">
      <svg viewBox="0 0 460 460" role="img" aria-label="StarknetWallet docs illustration" className="w-full h-full">
        <defs>
          <linearGradient id="docGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2F5BFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="panelFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#171A3A" />
            <stop offset="100%" stopColor="#0B0D24" />
          </linearGradient>
          <linearGradient id="brandLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2F5BFF" />
            <stop offset="100%" stopColor="#7B61FF" />
          </linearGradient>
        </defs>

        {/* Glow */}
        <circle cx="230" cy="240" r="200" fill="url(#docGlow)" />
        {/* Platform ellipse */}
        <ellipse cx="230" cy="395" rx="180" ry="22" fill="#7B61FF" opacity="0.18" />

        {/* Back doc panel */}
        <g transform="translate(60 70)">
          <rect width="220" height="270" rx="14" fill="url(#panelFill)" stroke="#2A2F66" />
          <rect x="18" y="22" width="80" height="8" rx="4" fill="#2F5BFF" opacity="0.8" />
          <rect x="18" y="42" width="184" height="6" rx="3" fill="#2A2F66" />
          <rect x="18" y="56" width="160" height="6" rx="3" fill="#2A2F66" />
          <rect x="18" y="70" width="170" height="6" rx="3" fill="#2A2F66" />
          {/* code block */}
          <rect x="18" y="92" width="184" height="78" rx="8" fill="#070816" stroke="#2A2F66" />
          <text x="28" y="112" fontFamily="Martian Mono, monospace" fontSize="10" fill="#7B61FF">{"<Cairo>"}</text>
          <text x="28" y="128" fontFamily="Martian Mono, monospace" fontSize="10" fill="#B8BED8">  fn approve(</text>
          <text x="28" y="144" fontFamily="Martian Mono, monospace" fontSize="10" fill="#B8BED8">    spender, amount</text>
          <text x="28" y="160" fontFamily="Martian Mono, monospace" fontSize="10" fill="#B8BED8">  )</text>
          <rect x="18" y="186" width="60" height="22" rx="11" fill="#2F5BFF" />
          <rect x="86" y="186" width="60" height="22" rx="11" fill="#171A3A" stroke="#2A2F66" />
        </g>

        {/* Wallet panel front */}
        <g transform="translate(220 150)">
          <rect width="180" height="200" rx="14" fill="#11142F" stroke="url(#brandLine)" strokeWidth="1.5" />
          <circle cx="22" cy="22" r="8" fill="#2F5BFF" />
          <rect x="38" y="18" width="80" height="8" rx="4" fill="#F7F8FF" opacity="0.9" />
          <rect x="16" y="44" width="148" height="50" rx="10" fill="#070816" stroke="#2A2F66" />
          <text x="26" y="64" fontFamily="Sora, sans-serif" fontSize="10" fill="#777F9F">STRK balance</text>
          <text x="26" y="86" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="18" fill="#F7F8FF">1,284.40</text>

          {/* permission row */}
          <rect x="16" y="106" width="148" height="28" rx="8" fill="#0B0D24" stroke="#2A2F66" />
          <circle cx="30" cy="120" r="5" fill="#2F5BFF" />
          <rect x="42" y="116" width="80" height="4" rx="2" fill="#B8BED8" />
          <rect x="42" y="124" width="50" height="4" rx="2" fill="#777F9F" />

          <rect x="16" y="142" width="148" height="28" rx="8" fill="#0B0D24" stroke="#2A2F66" />
          <circle cx="30" cy="156" r="5" fill="#7B61FF" />
          <rect x="42" y="152" width="70" height="4" rx="2" fill="#B8BED8" />
          <rect x="42" y="160" width="60" height="4" rx="2" fill="#777F9F" />

          <rect x="16" y="176" width="148" height="14" rx="7" fill="#2F5BFF" />
        </g>

        {/* Verification nodes */}
        <g>
          <circle cx="80" cy="380" r="8" fill="#2F5BFF" />
          <circle cx="160" cy="400" r="6" fill="#7B61FF" />
          <circle cx="380" cy="370" r="8" fill="#2F5BFF" />
          <line x1="80" y1="380" x2="160" y2="400" stroke="#2A2F66" strokeWidth="1.5" />
          <line x1="160" y1="400" x2="380" y2="370" stroke="#2A2F66" strokeWidth="1.5" />
          <circle cx="80" cy="380" r="14" fill="none" stroke="#2F5BFF" strokeOpacity="0.3" />
          <circle cx="380" cy="370" r="14" fill="none" stroke="#2F5BFF" strokeOpacity="0.3" />
        </g>

        {/* Brackets */}
        <text x="30" y="80" fontFamily="Martian Mono, monospace" fontSize="42" fill="#2F5BFF" opacity="0.7">{"{"}</text>
        <text x="410" y="430" fontFamily="Martian Mono, monospace" fontSize="42" fill="#7B61FF" opacity="0.7">{"}"}</text>
      </svg>
    </div>
  );
}

/* ---------- Section primitives ---------- */

function Section({ id, eyebrow, title, children }: { id: string; eyebrow?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="font-display text-2xl lg:text-3xl font-semibold text-ink mt-2">{title}</h2>
      <div className="mt-5 space-y-4 text-ink-muted leading-relaxed">{children}</div>
    </section>
  );
}

function CardGrid({ items }: { items: { art: DocsArtVariant; title: string; body: string }[] }) {
  return (
    <div className="not-prose mt-2 grid gap-4 sm:grid-cols-2">
      {items.map(({ art, title, body }) => (
        <div key={title} className="rounded-xl border border-hairline bg-surface p-5">
          <DocsArt variant={art} size={120} className="-ml-2 -mt-1" />
          <h3 className="mt-2 text-base font-semibold text-ink">{title}</h3>
          <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{body}</p>
        </div>
      ))}
    </div>
  );
}

function StepList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-2 list-none p-0">
      {items.map((t) => (
        <li key={t} className="flex gap-3 rounded-lg border border-hairline bg-surface p-3 text-sm text-ink-muted">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
            <Link2 size={11} aria-hidden="true" />
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Section bodies ---------- */

function Introduction() {
  return (
    <Section id="introduction" eyebrow="1. Overview" title="Introduction">
      <p>
        StarknetWallet is a desktop wallet built for secure Starknet
        workflows. It helps users manage STRK, review Cairo calls, inspect
        smart-account permissions, and approve transactions with clearer
        signing context.
      </p>
      <CardGrid
        items={[
          { art: "intro-product", title: "Built for Starknet", body: "Mainnet and Sepolia, smart accounts, Cairo calls, and STRK as first-class primitives." },
          { art: "intro-desktop", title: "Desktop-first workflow", body: "Native builds for macOS, Windows, and Linux with a focused signing surface." },
          { art: "intro-local-key", title: "Local-first account control", body: "Keys are generated and stored on your device — nothing is custodied for you." },
          { art: "intro-clear-signing", title: "Clear signing review", body: "Every approval shows dApp, network, contract, fee, and decoded calldata." },
        ]}
      />
    </Section>
  );
}

function Installation() {
  return (
    <Section id="installation" eyebrow="2. Get the app" title="Installation">
      <h3 className="text-base font-semibold text-ink">System requirements</h3>
      <ul className="list-disc pl-6 space-y-1.5">
        <li>Windows 10 or later, x64</li>
        <li>macOS 12 Monterey or later, Apple Silicon and Intel</li>
        <li>Linux: Ubuntu 22.04+, Fedora 38+, or equivalent modern distribution</li>
        <li>Internet connection for Starknet Mainnet and Sepolia access</li>
      </ul>

      <h3 className="text-base font-semibold text-ink mt-6">Download options</h3>
      <ul className="list-disc pl-6 space-y-1.5">
        <li>Windows (.exe installer, x64)</li>
        <li>macOS (.dmg Universal — Apple Silicon and Intel)</li>
        <li>Linux (.AppImage / .deb)</li>
      </ul>

      <Link
        to="/"
        hash="download"
        className="not-prose mt-5 inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-brand text-brand-foreground font-semibold text-sm hover:brightness-110 transition"
      >
        <DownloadIcon size={16} aria-hidden="true" />
        Download
      </Link>

      <h3 className="text-base font-semibold text-ink mt-8">Verification-first install</h3>
      <p>
        Before installing, verify the package source, checksum, and build
        signature where available. The download section publishes the SHA256
        and PGP signature alongside every maintained build.
      </p>
    </Section>
  );
}

function FirstSetup() {
  return (
    <Section id="first-setup" eyebrow="3. Get started" title="First Setup">
      <p>
        Launch StarknetWallet and walk through the onboarding flow. The
        product is designed so each decision is explicit and reversible.
      </p>
      <StepList
        items={[
          "Choose your network: Starknet Mainnet or Sepolia. The active network is always visible.",
          "Create a new Starknet account or import an existing one.",
          "Review where local key material is stored on your device.",
          "Set your wallet password and confirm device-level security settings.",
          "Note that any web demo screens on this site are product previews — they do not connect to a real wallet.",
        ]}
      />
    </Section>
  );
}

function ManagingAccounts() {
  return (
    <Section id="managing-accounts" eyebrow="4. Daily use" title="Managing Accounts">
      <CardGrid
        items={[
          { art: "accounts-overview", title: "Account overview", body: "See STRK balance, recent activity, and the active Starknet account at a glance." },
          { art: "accounts-multi", title: "Multi-account workflows", body: "Create or import multiple Starknet accounts and switch between them cleanly." },
          { art: "accounts-network", title: "Network switching", body: "Move between Starknet Mainnet and Sepolia explicitly, with the network labeled on every signing surface." },
          { art: "accounts-local", title: "Local-first control", body: "Account material stays on your device — StarknetWallet does not custody keys." },
        ]}
      />
    </Section>
  );
}

function TransactionReview() {
  return (
    <Section id="transaction-review" eyebrow="5. Signing" title="Transaction Review">
      <p>
        StarknetWallet focuses on showing clearer transaction context before
        approval. Review before signing. Approve only when the transaction
        context is clear.
      </p>
      <ul className="list-disc pl-6 space-y-1.5">
        <li>dApp name and origin</li>
        <li>Active Starknet network (Mainnet or Sepolia)</li>
        <li>Target contract address</li>
        <li>Estimated fee</li>
        <li>Cairo call preview with the function name</li>
        <li>Decoded calldata details</li>
        <li>Token and spending-approval context</li>
        <li>Final approve or reject action</li>
      </ul>
    </Section>
  );
}

function SmartAccountPermissions() {
  return (
    <Section id="smart-account-permissions" eyebrow="6. Account abstraction" title="Smart-Account Permissions">
      <p>
        Starknet is built around smart accounts. StarknetWallet helps users
        review permissions, session keys, spending approvals, and signer
        context before they apply.
      </p>
      <CardGrid
        items={[
          { art: "perm-session", title: "Session keys", body: "Review scope, expiry, and which contracts a session key is allowed to call." },
          { art: "perm-spending", title: "Spending limits", body: "See spending caps and per-token approval contexts before they are granted." },
          { art: "perm-signer", title: "Signer visibility", body: "Inspect the signer set tied to a smart account and any pending changes." },
          { art: "perm-approval", title: "Approval paths", body: "Understand which approvals a transaction depends on inside an account-abstraction flow." },
        ]}
      />
    </Section>
  );
}

function SecurityPractices() {
  return (
    <Section id="security-practices" eyebrow="7. Security" title="Security Practices">
      <p>
        StarknetWallet is designed around local-first key control,
        verification-first installation, and clear signing context. The
        practices below help you get the full benefit of that model.
      </p>
      <ul className="list-disc pl-6 space-y-1.5">
        <li>Keep key material local — never paste account material into web forms.</li>
        <li>No telemetry by default; opt in only if you want to share diagnostics.</li>
        <li>Verify every download before installing.</li>
        <li>Check the published SHA256 checksum for your build.</li>
        <li>Verify the build signature where available.</li>
        <li>Review transaction details on every approval, including network and contract.</li>
        <li>Keep your operating system and wallet updated.</li>
        <li>Use hardware-wallet workflows for higher-value accounts when appropriate.</li>
      </ul>
      <p className="not-prose">
        <Link to="/security" className="text-brand hover:underline text-sm font-semibold">
          Read the full security overview →
        </Link>
      </p>
    </Section>
  );
}

function HardwareWalletWorkflows() {
  return (
    <Section id="hardware-wallet-workflows" eyebrow="8. External signing" title="Hardware Wallet Workflows">
      <p>
        StarknetWallet is designed to support compatible external signing
        workflows where available, so you can keep signing material on a
        dedicated device.
      </p>
      <CardGrid
        items={[
          { art: "hw-ledger", title: "Ledger-compatible workflows", body: "Use a Ledger-compatible signing workflow where supported by your account and firmware." },
          { art: "hw-trezor", title: "Trezor-compatible workflows", body: "Use a Trezor-compatible external signing workflow where supported." },
          { art: "hw-smart-account", title: "Smart-account signing", body: "Pair a hardware signer with a Starknet smart account to keep approvals on a separate device." },
          { art: "hw-external-signer", title: "External signer review", body: "Inspect what is being sent to the external signer before you confirm on the device." },
          { art: "hw-ready", title: "Hardware-wallet ready architecture", body: "The signing surface is built so external signers fit cleanly into the review flow." },
        ]}
      />
    </Section>
  );
}

function DeveloperWorkflows() {
  return (
    <Section id="developer-workflows" eyebrow="9. Build on Starknet" title="dApp & Developer Workflows">
      <p>
        For Cairo builders and Starknet developers, StarknetWallet provides
        clearer transaction context before signing, making it easier to
        debug integrations end-to-end.
      </p>
      <ul className="list-disc pl-6 space-y-1.5">
        <li>Cairo call preview with the resolved function name</li>
        <li>Contract call review with decoded calldata</li>
        <li>Explicit Mainnet and Sepolia switching, surfaced on every signing screen</li>
        <li>Developer-friendly transaction context for QA and integration review</li>
      </ul>
      <p className="not-prose">
        <Link to="/docs" className="text-brand hover:underline text-sm font-semibold">
          Open the developer guides →
        </Link>
      </p>
    </Section>
  );
}

function Troubleshooting() {
  const items: { problem: string; cause: string; fix: string }[] = [
    {
      problem: "Wallet does not open after install",
      cause: "Installer was blocked by the OS or the file did not finish downloading.",
      fix: "Re-download the build for your platform and verify the SHA256 before opening.",
    },
    {
      problem: "Wrong network selected",
      cause: "The active network was Sepolia (or Mainnet) when you expected the other.",
      fix: "Switch network from the account header — the active network is shown on every signing surface.",
    },
    {
      problem: "Transaction details look different than expected",
      cause: "The dApp may be requesting a different contract, calldata, or approval than you thought.",
      fix: "Reject the transaction, re-trigger it from the dApp, and re-review the decoded Cairo call.",
    },
    {
      problem: "Download verification failed",
      cause: "Checksum or signature does not match the published values.",
      fix: "Do not run the file. Re-download from the official source and verify again.",
    },
    {
      problem: "Account import issue",
      cause: "Source material was incomplete or copied from an untrusted location.",
      fix: "Re-check the source of your account material before pasting and try the import again.",
    },
    {
      problem: "Hardware signer not detected",
      cause: "Cable, firmware, or device app not in the expected state.",
      fix: "Reconnect the device, update its firmware, and re-launch StarknetWallet.",
    },
    {
      problem: "dApp connection issue",
      cause: "The dApp may not yet support the active Starknet network or account type.",
      fix: "Confirm the dApp supports your network, refresh the page, and re-initiate the connection.",
    },
  ];
  return (
    <Section id="troubleshooting" eyebrow="10. Help" title="Troubleshooting">
      <div className="not-prose grid gap-3">
        {items.map((it) => (
          <div key={it.problem} className="rounded-xl border border-hairline bg-surface p-4">
            <p className="text-sm font-semibold text-ink">{it.problem}</p>
            <p className="mt-1 text-sm text-ink-muted"><span className="text-ink font-medium">Likely cause:</span> {it.cause}</p>
            <p className="mt-1 text-sm text-ink-muted"><span className="text-ink font-medium">Recommended fix:</span> {it.fix}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function AdvancedTools() {
  return (
    <Section id="advanced-tools" eyebrow="11. Power features" title="Advanced Tools">
      <CardGrid
        items={[
          { art: "tool-calldata", title: "Cairo calldata viewer", body: "Inspect decoded calldata for the Cairo call you are about to sign." },
          { art: "tool-permission", title: "Permission viewer", body: "Walk through session keys, signer changes, and spending approvals tied to your smart account." },
          { art: "tool-activity", title: "Account activity inspector", body: "Browse account activity with network, contract, and fee context." },
          { art: "tool-build-verify", title: "Build verification panel", body: "Reference the SHA256 checksum and signature published for your build." },
          { art: "tool-multi-network", title: "Multi-network context", body: "Move between Starknet Mainnet and Sepolia with the active network clearly labeled." },
          { art: "tool-hw-status", title: "Hardware signer workflow status", body: "See whether an external signer is connected and ready for the next approval." },
        ]}
      />
    </Section>
  );
}

function FAQSection() {
  const qa: { q: string; a: string }[] = [
    {
      q: "Does StarknetWallet store keys online?",
      a: "No. Keys are generated and stored on your device. They are not transmitted to any server.",
    },
    {
      q: "Which operating systems are supported?",
      a: "macOS 12 or later (Apple Silicon and Intel), Windows 10 or later (x64), and modern Linux distributions such as Ubuntu 22.04+ and Fedora 38+.",
    },
    {
      q: "Can I use Starknet Mainnet and Sepolia?",
      a: "Yes. You can switch between Starknet Mainnet and Sepolia, and the active network is shown on every signing surface.",
    },
    {
      q: "Does it support STRK?",
      a: "Yes. StarknetWallet treats STRK as a first-class asset with balance, activity, and signing context.",
    },
    {
      q: "Can I review Cairo calls before signing?",
      a: "Yes. Every approval shows the dApp, network, contract, fee, function name, and decoded calldata before you sign.",
    },
    {
      q: "Does it support hardware wallets?",
      a: "StarknetWallet is designed to support compatible external signing workflows where available, including Ledger- and Trezor-compatible flows.",
    },
    {
      q: "How do I verify downloads?",
      a: "Compare the SHA256 of your downloaded file with the published checksum, and verify the build signature with the published key.",
    },
    {
      q: "Is the website demo connected to a real wallet?",
      a: "No. The on-site demo screens are product previews. They illustrate the signing surface and do not connect to a real wallet or network.",
    },
  ];
  return (
    <Section id="faq" eyebrow="12. Common questions" title="Frequently Asked Questions">
      <div className="not-prose space-y-3">
        {qa.map(({ q, a }) => (
          <details key={q} className="group rounded-xl border border-hairline bg-surface p-4 open:bg-surface-2">
            <summary className="cursor-pointer text-sm font-semibold text-ink flex items-center justify-between gap-3">
              <span>{q}</span>
              <span className="text-ink-subtle text-xs transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-sm text-ink-muted leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
      <p className="not-prose">
        <Link to="/" hash="faq" className="text-brand hover:underline text-sm font-semibold">
          See all FAQs on the homepage →
        </Link>
      </p>
    </Section>
  );
}

function Resources() {
  return (
    <Section id="resources" eyebrow="13. Keep going" title="Resources & Support">
      <div className="not-prose grid gap-4 sm:grid-cols-2">
        <a
          href="https://github.com/starknet-io"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-hairline bg-surface p-5 hover:border-brand transition-colors"
        >
          <DocsArt variant="res-github" size={120} className="-ml-2 -mt-1" />
          <p className="mt-2 text-sm font-semibold text-ink">GitHub</p>
          <p className="mt-1 text-sm text-ink-muted">Source, releases, and verification material.</p>
        </a>
        <Link to="/docs" className="rounded-xl border border-hairline bg-surface p-5 hover:border-brand transition-colors block">
          <DocsArt variant="res-guides" size={120} className="-ml-2 -mt-1" />
          <p className="mt-2 text-sm font-semibold text-ink">Developer guides</p>
          <p className="mt-1 text-sm text-ink-muted">Deeper guides for installing, verifying, and integrating.</p>
        </Link>
        <Link to="/security" className="rounded-xl border border-hairline bg-surface p-5 hover:border-brand transition-colors block">
          <DocsArt variant="res-security" size={120} className="-ml-2 -mt-1" />
          <p className="mt-2 text-sm font-semibold text-ink">Security</p>
          <p className="mt-1 text-sm text-ink-muted">Security model, verification flow, and disclosure.</p>
        </Link>
        <Link to="/" hash="download" className="rounded-xl border border-hairline bg-surface p-5 hover:border-brand transition-colors block">
          <DocsArt variant="res-download" size={120} className="-ml-2 -mt-1" />
          <p className="mt-2 text-sm font-semibold text-ink">Download</p>
          <p className="mt-1 text-sm text-ink-muted">Get the maintained build for your operating system.</p>
        </Link>
        <Link to="/contact" className="rounded-xl border border-hairline bg-surface p-5 hover:border-brand transition-colors block sm:col-span-2">
          <DocsArt variant="res-contact" size={120} className="-ml-2 -mt-1" />
          <p className="mt-2 text-sm font-semibold text-ink">Contact & support</p>
          <p className="mt-1 text-sm text-ink-muted">Reach the maintainers for product or security questions.</p>
        </Link>
      </div>
    </Section>
  );
}
