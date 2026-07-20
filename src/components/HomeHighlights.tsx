import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  BookOpen,
  Terminal,
  KeyRound,
  Mail,
} from "lucide-react";
import { PlatformDownloadCard } from "./PlatformDownloadCard";
import { defaultDownloadOrder, APP_VERSION, GITHUB_RELEASES_URL } from "@/data/downloads";

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

/* ---------- 1. Main horizontal card ---------- */

function AnchorCard() {
  return (
    <section className="py-24">
      <div className="container-page">
        <article className="rounded-[22px] border border-hairline bg-surface p-8 md:p-14">
          <span className="eyebrow">Desktop wallet</span>
          <h2 className="font-display section-title mt-4 font-semibold max-w-3xl">
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
        </article>
      </div>
    </section>
  );
}

/* ---------- 2. Two large feature cards ---------- */

function TwoFeatureCards() {
  return (
    <section id="features" className="pb-24">
      <div className="container-page grid gap-6 md:grid-cols-2">
        <article className="rounded-[22px] border border-hairline bg-surface p-8 md:p-12">
          <span className="eyebrow">Product</span>
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
          <div className="mt-6">
            <CardLink to="/docs">Explore features</CardLink>
          </div>
        </article>

        <article className="rounded-[22px] border border-hairline bg-surface p-8 md:p-12">
          <span className="eyebrow">Security</span>
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
          <div className="mt-6">
            <CardLink to="/security">Explore security</CardLink>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------- 3. Workflow ---------- */

const STEPS = [
  { icon: Download, label: "Download", body: "Get the signed build for your OS." },
  { icon: ShieldCheck, label: "Verify", body: "Check SHA256 and PGP signature." },
  { icon: Eye, label: "Review", body: "Inspect Cairo calls and permissions." },
  { icon: PenLine, label: "Sign", body: "Confirm from your local device." },
];

function WorkflowCard() {
  return (
    <section className="pb-24">
      <div className="container-page">
        <article className="rounded-[22px] border border-hairline bg-surface p-8 md:p-14">
          <span className="eyebrow">Workflow</span>
          <h2 className="font-display section-title mt-4 font-semibold max-w-3xl">
            From download to signed transaction.
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, label, body }, i) => (
              <li
                key={label}
                className="rounded-2xl border border-hairline bg-surface-2 p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-background text-brand border border-hairline">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold text-ink-subtle tracking-wider">
                    STEP {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{label}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {body}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <CardLink to="/docs">See how it works</CardLink>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------- 4. Platform downloads ---------- */

function Platforms() {
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

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {defaultDownloadOrder.map((item) => (
            <PlatformDownloadCard
              key={item.key}
              item={item}
              recommended={false}
            />
          ))}
        </div>

        <p className="mt-6 text-sm text-ink-muted">
          Need checksums, fingerprints and previous versions?{" "}
          <Link to="/releases" className="text-link font-semibold">
            View releases and verification →
          </Link>
        </p>
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
    title: "Developer guides",
    body: "Integrate with Cairo tooling and build Starknet-native workflows.",
    to: "/docs",
    cta: "Open developer guides",
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
      <FeaturedRelease />
      <Resources />
      <FaqShortcuts />
      <Newsletter />
    </>
  );
}
