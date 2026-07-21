import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  BookOpen,
  Terminal,
  KeyRound,
  Mail,
  Sparkles,
  Info,
} from "lucide-react";
import { PlatformDownloadCard } from "./PlatformDownloadCard";
import { defaultDownloadOrder, APP_VERSION, GITHUB_RELEASES_URL } from "@/data/downloads";
import { useDetectedPlatform, DESKTOP_PLATFORMS } from "@/hooks/useDetectedPlatform";
import type { DesktopPlatform } from "@/lib/detectOS";


/* ---------- illustration wrapper ---------- */

function Illustration({
  src,
  alt,
  eager = false,
  className = "",
}: {
  src: string;
  alt: string;
  eager?: boolean;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={640}
      height={560}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`block h-auto w-full select-none ${className}`}
      style={{ aspectRatio: "640 / 560" }}
      draggable={false}
    />
  );
}

/* ---------- shared bits ---------- */

function CardLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 text-link font-semibold text-sm"
    >
      {children}
      <ArrowRight size={14} aria-hidden="true" />
    </Link>
  );
}

/* ---------- 1. Main horizontal card — Signing Station ---------- */

function AnchorCard() {
  return (
    <section className="py-24">
      <div className="container-page">
        <article
          className="rounded-[22px] border border-hairline bg-surface p-[26px] sm:p-10 md:p-14 lg:p-16"
          style={{ minHeight: 440 }}
        >
          <div className="grid gap-10 md:gap-14 lg:grid-cols-[auto_1fr] lg:items-center">
            <div
              className="mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none"
              style={{ width: "clamp(340px, 44vw, 500px)", padding: "30px 0" }}
            >
              <Illustration
                src="/assets/home/signing-station.svg"
                alt="Animated Starknet desktop signing station"
                eager
              />
            </div>
            <div>
              <span className="eyebrow">Desktop wallet</span>
              <h2 className="font-display section-title mt-4 font-semibold">
                Anchor your Starknet signing.
              </h2>
              <p className="section-sub max-w-2xl">
                A focused desktop environment for Starknet account management,
                Cairo transaction review, and clear smart-account permission
                visibility — with local-first control of your keys.
              </p>
              <div className="mt-6">
                <CardLink to="/docs">Explore the desktop wallet</CardLink>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------- 2. Two large feature cards ---------- */

function TwoFeatureCards() {
  return (
    <section id="features" className="pb-24">
      <div className="container-page grid gap-6 md:grid-cols-2 md:items-stretch">
        <article className="rounded-[22px] border border-hairline bg-surface p-[26px] sm:p-10 md:p-12 flex flex-col">
          <div className="mx-auto flex w-full items-center justify-center" style={{ height: "clamp(280px, 30vw, 330px)" }}>
            <Illustration
              src="/assets/home/starknet-toolkit.svg"
              alt="Animated Starknet wallet toolkit"
              className="!h-full !w-auto max-w-full"
            />
          </div>
          <span className="eyebrow mt-8">Product</span>
          <h2 className="font-display mt-4 text-3xl md:text-4xl font-semibold text-ink tracking-tight">
            A focused Starknet toolkit.
          </h2>
          <ul className="mt-6 space-y-3 text-ink-muted text-[15px] leading-relaxed">
            <li>· STRK account management</li>
            <li>· Cairo call preview before signing</li>
            <li>· Smart-account permission review</li>
            <li>· Mainnet and Sepolia context</li>
          </ul>
          <p className="mt-6 text-sm text-ink-muted">
            Bring an existing Starknet account into a clearer local desktop
            workflow.
          </p>
          <div className="mt-6 mt-auto pt-6">
            <CardLink to="/docs">Read product docs</CardLink>

          </div>
        </article>

        <article className="rounded-[22px] border border-hairline bg-surface p-[26px] sm:p-10 md:p-12 flex flex-col">
          <div className="mx-auto flex w-full items-center justify-center" style={{ height: "clamp(280px, 30vw, 330px)" }}>
            <Illustration
              src="/assets/home/local-security.svg"
              alt="Animated local wallet security system"
              className="!h-full !w-auto max-w-full"
            />
          </div>
          <span className="eyebrow mt-8">Security</span>
          <h2 className="font-display mt-4 text-3xl md:text-4xl font-semibold text-ink tracking-tight">
            Your keys. Your machine.
          </h2>
          <ul className="mt-6 space-y-3 text-ink-muted text-[15px] leading-relaxed">
            <li>· Local-first keys, never uploaded</li>
            <li>· No telemetry by default</li>
            <li>· Signed builds for every release</li>
            <li>· SHA256 and PGP verification</li>
          </ul>
          <p className="mt-6 text-sm text-ink-muted">
            Signed builds can be verified before installation.
          </p>
          <div className="mt-6 mt-auto pt-6">
            <CardLink to="/security">Explore security</CardLink>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------- 3. Workflow — Signing Workflow ---------- */

function WorkflowCard() {
  return (
    <section className="pb-24">
      <div className="container-page">
        <article
          className="rounded-[22px] border border-hairline bg-surface p-[26px] sm:p-10 md:p-14 lg:p-16"
          style={{ minHeight: 440 }}
        >
          <div className="grid gap-10 md:gap-14 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="eyebrow">Workflow</span>
              <h2 className="font-display section-title mt-4 font-semibold">
                From download to signed transaction.
              </h2>
              <p className="section-sub max-w-xl">
                A predictable path for every signed action on Starknet.
              </p>
              <p className="mt-6 text-lg font-semibold text-ink">
                Download <span className="text-ink-muted" aria-hidden="true">→</span>{" "}
                Verify <span className="text-ink-muted" aria-hidden="true">→</span>{" "}
                Review <span className="text-ink-muted" aria-hidden="true">→</span>{" "}
                Sign
              </p>
              <ul className="mt-6 space-y-2 text-ink-muted text-[15px] leading-relaxed">
                <li>· Get the signed build for your OS.</li>
                <li>· Check SHA256 and PGP signature.</li>
                <li>· Inspect Cairo calls and permissions.</li>
                <li>· Confirm from your local device.</li>
              </ul>
              <div className="mt-8">
                <CardLink to="/docs">See how it works</CardLink>
              </div>
            </div>
            <div
              className="mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none order-first lg:order-last"
              style={{ width: "clamp(340px, 44vw, 500px)", padding: "30px 0" }}
            >
              <Illustration
                src="/assets/home/signing-workflow.svg"
                alt="Animated workflow from download to signing"
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------- 4. Platform downloads ---------- */

function Platforms() {
  const platform = useDetectedPlatform();
  const hasRecommendation = DESKTOP_PLATFORMS.has(platform);
  const recommendedKey = hasRecommendation
    ? (platform as "windows" | "macos" | "linux")
    : null;

  const ordered = recommendedKey
    ? [
        ...defaultDownloadOrder.filter((i) => i.key === recommendedKey),
        ...defaultDownloadOrder.filter((i) => i.key !== recommendedKey),
      ]
    : defaultDownloadOrder;

  return (
    <section id="download" className="pb-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Download</span>
          <h2 className="font-display section-title mt-4 font-semibold">
            Download StarknetWallet
          </h2>
          <p className="section-sub">
            Signed builds for macOS, Windows and Linux. Verify before installing.
          </p>
        </div>

        <PlatformRecommendation platform={platform} />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {ordered.map((item) => (
            <PlatformDownloadCard
              key={item.key}
              item={item}
              recommended={item.key === recommendedKey}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-hairline bg-surface px-5 py-4 text-xs text-ink-muted">
          <span className="font-semibold text-ink">Verify every release before installation.</span>
          <span>Signed builds</span>
          <span aria-hidden="true">·</span>
          <span>SHA256 checksums</span>
          <span aria-hidden="true">·</span>
          <span>PGP signatures</span>
          <Link to="/releases" className="ml-auto text-link font-semibold inline-flex items-center gap-1.5">
            View all releases <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  );
}

function PlatformRecommendation({ platform }: { platform: DesktopPlatform }) {
  if (platform === "unknown") {
    // Nothing detected yet (SSR / pre-hydration) — render nothing to avoid layout shift noise.
    return null;
  }

  if (platform === "windows" || platform === "macos" || platform === "linux") {
    const label =
      platform === "windows" ? "Windows" : platform === "macos" ? "macOS" : "Linux";
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2 text-sm text-ink"
      >
        <Sparkles size={14} className="text-brand" aria-hidden="true" />
        <span>
          Looks like you’re on <strong className="font-semibold">{label}</strong> —
          we’ve highlighted the matching build below.
        </span>
      </div>
    );
  }

  const message =
    platform === "mobile"
      ? "StarknetWallet is a desktop application. Open this page from a Windows, macOS, or Linux computer to install the signed build."
      : platform === "chromeos"
        ? "StarknetWallet doesn’t ship a native ChromeOS build. On a supported desktop (Windows, macOS, or Linux) you can install the signed build below."
        : "We couldn’t detect your operating system. All available desktop builds are listed below.";

  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-8 flex items-start gap-3 rounded-2xl border border-hairline bg-surface p-4 text-sm text-ink-muted max-w-3xl"
    >
      <Info size={16} className="mt-0.5 text-brand shrink-0" aria-hidden="true" />
      <p className="leading-relaxed">{message}</p>
    </div>
  );
}


/* ---------- Compatibility (compact) ---------- */

const COMPAT_OS = [
  { name: "macOS", detail: "12 Monterey or later · Apple Silicon & Intel" },
  { name: "Windows", detail: "Windows 10 or later · x64" },
  { name: "Linux", detail: "Ubuntu 22.04+, Fedora 38+ · AppImage / .deb" },
];

const COMPAT_HW = [
  "Ledger (via Argent, Braavos, Ready)",
  "Argent smart accounts",
  "Braavos smart accounts",
  "OpenZeppelin accounts",
];

function CompatibilityCompact() {
  return (
    <section id="compatibility" className="pb-24" aria-labelledby="compat-heading">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Compatibility</span>
          <h2 id="compat-heading" className="font-display section-title mt-4 font-semibold">
            Works with your desktop and signer.
          </h2>
          <p className="section-sub">
            Supported desktop environments and Starknet signing workflows at a glance.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-hairline bg-surface p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
              Desktop operating systems
            </h3>
            <ul className="mt-4 space-y-3 list-none p-0">
              {COMPAT_OS.map((o) => (
                <li key={o.name} className="flex items-baseline justify-between gap-4 border-b border-hairline pb-3 last:border-0 last:pb-0">
                  <span className="text-sm font-semibold text-ink">{o.name}</span>
                  <span className="text-xs text-ink-muted text-right">{o.detail}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-hairline bg-surface p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
              Signers & accounts
            </h3>
            <ul className="mt-4 grid gap-2.5 list-none p-0">
              {COMPAT_HW.map((h) => (
                <li key={h} className="text-sm text-ink-muted">
                  <span className="text-brand mr-2" aria-hidden="true">·</span>{h}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-muted">
              Hardware-wallet signing is available through compatible Starknet
              wallets.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}


/* ---------- 5. Featured release ---------- */



function FeaturedRelease() {
  return (
    <section className="pb-24">
      <div className="container-page">
        <article className="rounded-[22px] border border-hairline bg-surface p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">Latest release</span>
            <h2 className="font-display mt-4 text-3xl md:text-4xl font-semibold text-ink tracking-tight">
              StarknetWallet {APP_VERSION}
            </h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Current maintained desktop build with refined Cairo call review,
              tighter smart-account permission summaries, and updated signed
              artifacts for macOS, Windows and Linux.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link to="/releases" className="btn-primary">
              View release
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              href={GITHUB_RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              GitHub
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------- 6. Resources ---------- */

const RESOURCES = [
  {
    icon: BookOpen,
    title: "Documentation",
    body: "Install, set up accounts and get familiar with the desktop wallet.",
    to: "/docs",
    cta: "Read the docs",
  },
  {
    icon: Terminal,
    title: "Developer resources",
    body: "Integrate with Cairo tooling and build Starknet-native workflows.",
    to: "/docs",
    cta: "Read the docs",
  },

  {
    icon: KeyRound,
    title: "Security & verification",
    body: "How signed builds, SHA256 checksums and PGP verification work.",
    to: "/security",
    cta: "View security",
  },
] as const;

function Resources() {
  return (
    <section className="pb-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Resources</span>
          <h2 className="font-display section-title mt-4 font-semibold">
            Learn more.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {RESOURCES.map(({ icon: Icon, title, body, to, cta }) => (
            <article
              key={title}
              className="rounded-2xl border border-hairline bg-surface p-8 flex flex-col"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-brand border border-hairline">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-ink tracking-tight">
                {title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {body}
              </p>
              <div className="mt-6">
                <CardLink to={to}>{cta}</CardLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. FAQ shortcuts ---------- */

const FAQ_SHORTCUTS = [
  { q: "View all questions", to: "/faq" as const },
  { q: "Is StarknetWallet free?", to: "/faq" as const },
  { q: "How do I verify a build?", to: "/faq" as const },
  { q: "Which platforms are supported?", to: "/faq" as const },
];

function FaqShortcuts() {
  return (
    <section id="faq" className="pb-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">FAQ</span>
          <h2 className="font-display section-title mt-4 font-semibold">
            Questions, answered.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FAQ_SHORTCUTS.map(({ q, to }) => (
            <Link
              key={q}
              to={to}
              className="rounded-2xl border border-hairline bg-surface p-6 hover:border-ink/20 transition-colors flex flex-col justify-between gap-6"
            >
              <span className="text-base font-semibold text-ink leading-snug">
                {q}
              </span>
              <span className="inline-flex items-center gap-1.5 text-link font-semibold text-sm">
                View <ArrowRight size={14} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. Newsletter ---------- */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return (
    <section className="pb-24">
      <div className="container-page">
        <article className="rounded-[22px] border border-hairline bg-surface p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">Newsletter</span>
            <h2 className="font-display mt-4 text-2xl md:text-3xl font-semibold text-ink tracking-tight">
              Release notes in your inbox.
            </h2>
            <p className="mt-2 text-ink-muted text-sm">
              Occasional updates on signed builds, security notes and
              Starknet ecosystem changes. No spam.
            </p>
          </div>
          <form
            onSubmit={submit}
            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:min-w-[380px]"
          >
            <label className="sr-only" htmlFor="nl-email">
              Email
            </label>
            <div className="relative flex-1">
              <Mail
                size={16}
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <input
                id="nl-email"
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-9 pr-3 rounded-lg bg-surface-2 border border-hairline text-ink placeholder:text-ink-subtle text-sm focus:outline-none focus:border-brand"
              />
            </div>
            <button type="submit" className="btn-primary">
              {sent ? "Subscribed" : "Subscribe"}
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}

/* ---------- Combined export ---------- */

export function HomeHighlights() {
  return (
    <>
      <AnchorCard />
      <TwoFeatureCards />
      <WorkflowCard />
      <Platforms />
      <CompatibilityCompact />
      <FeaturedRelease />
      <Resources />
      <FaqShortcuts />
      <Newsletter />
    </>
  );
}

