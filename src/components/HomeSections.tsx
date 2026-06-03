import { Link } from "@tanstack/react-router";
import { Download, Tag, ShieldCheck } from "lucide-react";
import {
  StarknetIsoIllustration,
  type IsoIllustrationVariant,
} from "@/components/StarknetIsoIllustration";

type Card = { variant: IsoIllustrationVariant; title: string; body: string };

function CardGrid({ cards, cols = 3 }: { cards: Card[]; cols?: 2 | 3 }) {
  const colClass = cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`mt-10 grid gap-5 ${colClass}`}>
      {cards.map(({ variant, title, body }, i) => (
        <article
          key={title}
          className="rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-brand/60"
        >
          <StarknetIsoIllustration
            variant={variant}
            size={130}
            delay={i * 0.35}
            className="-mt-1 -ml-2"
          />
          <h3 className="mt-2 text-lg font-bold text-ink">{title}</h3>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">{body}</p>
        </article>
      ))}
    </div>
  );
}


export function WhyDesktop() {
  const cards: Card[] = [
    { variant: "desktop-window", title: "Dedicated signing environment", body: "A focused desktop surface for reviewing Starknet transactions, separate from your browser tabs and dApp sessions." },
    { variant: "review-eye", title: "Clearer transaction review", body: "Generous space to inspect the contract, calldata, network, and estimated fee before you approve." },
    { variant: "vault-disk", title: "Local-first by design", body: "Account material stays on your device. Nothing is synced to a remote server unless you opt in." },
    { variant: "network-globe", title: "Starknet network context", body: "Mainnet and Sepolia are clearly distinguished on every signing screen, so you always know what you are signing on." },
    { variant: "calldata-panel", title: "Cairo calldata visibility", body: "Decoded calldata and contract context surface intent before approval, not after." },
    { variant: "ledger-device", title: "Prepared for hardware signers", body: "Architected for hardware signing workflows through compatible Starknet tooling." },
  ];
  return (
    <section className="py-24" aria-labelledby="why-desktop-heading">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Desktop control</span>
          <h2 id="why-desktop-heading" className="font-display section-title mt-4 font-semibold">
            A focused environment for Starknet signing.
          </h2>
          <p className="section-sub">
            Wallet gives you more context before every approval —
            a dedicated desktop interface for reviewing transactions, account
            permissions, and network activity.
          </p>
        </div>
        <CardGrid cards={cards} />
      </div>
    </section>
  );
}


export function Migration() {
  const cards: Card[] = [
    { variant: "import-arrow", title: "Import account", body: "Bring an existing Starknet account into a local desktop workflow." },
    { variant: "key-vault", title: "Keep your accounts", body: "You control the account material. Wallet does not custody keys." },
    { variant: "policy-graph", title: "Review permissions", body: "Inspect smart-account session keys and spending approvals before signing." },
    { variant: "network-toggle", title: "Use Mainnet and Sepolia", body: "Switch between Starknet Mainnet and Sepolia with clear visual context." },
  ];
  return (
    <section className="py-24 bg-surface-2 border-y border-hairline" aria-labelledby="migration-heading">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Migration</span>
          <h2 id="migration-heading" className="font-display section-title mt-4 font-semibold">
            Bring your Starknet account. Keep your keys.
          </h2>
          <p className="section-sub">
            Import or create accounts locally, review networks clearly, and
            move into a desktop workflow without changing what you control.
          </p>
        </div>
        <CardGrid cards={cards} cols={2} />
      </div>
    </section>
  );
}

const DOC_LINKS: { id: string; variant: IsoIllustrationVariant; title: string; body: string }[] = [
  { id: "getting-started", variant: "getting-started-book", title: "Getting Started", body: "Install, create or import a Starknet account, and choose Mainnet or Sepolia." },
  { id: "installation", variant: "install-package", title: "Installation", body: "Step-by-step installation for macOS, Windows, and Linux." },
  { id: "verifying", variant: "verification-shield", title: "Security", body: "Verify SHA256 and PGP signatures before opening any maintained build." },
  { id: "cairo-preview", variant: "function-nodes", title: "Cairo Preview", body: "Read decoded calldata and contract context before signing." },
  { id: "smart-accounts", variant: "smart-account-hub", title: "Smart Accounts", body: "Inspect session keys, scopes, and spending approvals." },
  { id: "troubleshooting", variant: "troubleshoot-spanner", title: "Troubleshooting", body: "Common issues with installers, networks, and account imports." },
];

export function DocumentationPreview() {
  return (
    <section className="py-24" aria-labelledby="docs-heading">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Documentation</span>
          <h2 id="docs-heading" className="font-display section-title mt-4 font-semibold">
            Run Wallet with confidence.
          </h2>
          <p className="section-sub">
            Short, practical guides covering installation, build verification,
            Cairo call previews, and smart-account permission review.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DOC_LINKS.map(({ id, variant, title, body }, i) => (
            <Link
              key={id}
              to="/documentation"
              hash={id}
              className="block rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-brand/60"
            >
              <StarknetIsoIllustration
                variant={variant}
                size={130}
                delay={i * 0.35}
                className="-mt-1 -ml-2"
              />
              <h3 className="mt-2 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReleasesPreview() {
  return (
    <section className="py-24 bg-surface-2 border-y border-hairline" aria-labelledby="releases-heading">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="eyebrow">Version history</span>
            <h2 id="releases-heading" className="font-display section-title mt-4 font-semibold">
              Signed builds, clear verification.
            </h2>
            <p className="section-sub">
              Every maintained build ships with SHA256 checksums and PGP
              signatures, for macOS, Windows, and Linux. Verify before you
              install.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/releases" className="btn-primary">
                <Tag size={16} aria-hidden="true" />
                View current version
              </Link>
              <Link to="/changelog" className="btn-ghost">
                View version history
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-hairline bg-surface p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Current</span>
              <span className="text-xs text-ink-muted">Desktop · macOS · Windows · Linux</span>
            </div>
            <h3 className="mt-3 text-xl font-bold text-ink">v2.4.3 — Current maintained version</h3>
            <ul className="mt-4 grid gap-2 text-sm text-ink-muted">
              <li>· STRK balance management and transfers</li>
              <li>· Starknet Mainnet and Sepolia support</li>
              <li>· Cairo call review before signing</li>
              <li>· Smart-account permission review</li>
              <li>· SHA256 + PGP verification flow</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CtaFinal() {
  return (
    <section className="py-24" aria-labelledby="cta-final-heading">
      <div className="container-page">
        <div className="rounded-3xl border border-hairline bg-surface p-10 text-center lg:p-14">
          <span className="eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Ready when you are
          </span>
          <h2 id="cta-final-heading" className="font-display section-title mt-4 font-semibold">
            Review with confidence before you approve.
          </h2>
          <p className="section-sub mx-auto max-w-2xl">
            Download Wallet to manage STRK, inspect Cairo calls, and
            review smart-account permissions in a local-first desktop workflow.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/" hash="download" className="btn-primary">
              <Download size={16} aria-hidden="true" />
              Download
            </Link>
            <Link to="/security" className="btn-ghost">
              <ShieldCheck size={16} aria-hidden="true" />
              Explore security
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {["Open source", "Signed builds", "Local-first keys"].map((l) => (
              <li key={l}>
                <span className="trust-chip">{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
