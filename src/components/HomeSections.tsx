import { Link } from "@tanstack/react-router";
import { Download, Tag, type LucideIcon } from "lucide-react";
import { purpleIcon, type PurpleIconComponent } from "@/components/icons/StarknetPurpleIcons";

const ShieldCheck = purpleIcon("shield");
const Monitor = purpleIcon("monitor");
const Eye = purpleIcon("eye");
const HardDrive = purpleIcon("hard-drive");
const Network = purpleIcon("network");
const Cpu = purpleIcon("cpu");
const KeyRound = purpleIcon("key");
const ArrowDownToLine = purpleIcon("arrow-down");
const BookOpen = purpleIcon("book");
const FileText = purpleIcon("file");
const DownloadCard = purpleIcon("download");

type Card = { icon: LucideIcon; title: string; body: string };

function CardGrid({ cards, cols = 3 }: { cards: Card[]; cols?: 2 | 3 }) {
  const colClass = cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`mt-10 grid gap-5 ${colClass}`}>
      {cards.map(({ icon: Icon, title, body }) => (
        <article
          key={title}
          className="rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-brand/60"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <Icon size={20} aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">{body}</p>
        </article>
      ))}
    </div>
  );
}

export function WhyDesktop() {
  const cards: Card[] = [
    { icon: Monitor, title: "Native desktop window", body: "A dedicated app surface — not a tab next to your dApps and search bars." },
    { icon: Eye, title: "Larger signing surface", body: "More room to show contract, calldata, network, and fee before you sign." },
    { icon: HardDrive, title: "Local-first storage", body: "Account material stays on your device. No remote sync by default." },
    { icon: Network, title: "Clear Mainnet/Sepolia context", body: "The active Starknet network is visible on every signing screen." },
    { icon: Cpu, title: "Cairo call preview", body: "Decoded calldata and target contract context before approval." },
    { icon: KeyRound, title: "Hardware wallet ready", body: "Architected for hardware signers — planned support for popular devices." },
  ];
  return (
    <section className="py-24" aria-labelledby="why-desktop-heading">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Why desktop</span>
          <h2 id="why-desktop-heading" className="section-title mt-4">
            The browser is not a vault.
          </h2>
          <p className="section-sub">
            Browser-extension wallets are convenient, but desktop wallets can
            reduce webpage-driven approval risk and give more space for clear
            transaction review.
          </p>
        </div>
        <CardGrid cards={cards} />
      </div>
    </section>
  );
}

export function Migration() {
  const cards: Card[] = [
    { icon: ArrowDownToLine, title: "Import account", body: "Bring an existing Starknet account into a local desktop workflow." },
    { icon: KeyRound, title: "Keep your accounts", body: "You control the account material. StarknetWallet does not custody keys." },
    { icon: ShieldCheck, title: "Review permissions", body: "Inspect smart-account session keys and spending approvals before signing." },
    { icon: Network, title: "Use Mainnet and Sepolia", body: "Switch between Starknet Mainnet and Sepolia with clear visual context." },
  ];
  return (
    <section className="py-24 bg-surface-2 border-y border-hairline" aria-labelledby="migration-heading">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Migration</span>
          <h2 id="migration-heading" className="section-title mt-4">
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

const DOC_LINKS = [
  { id: "getting-started", icon: BookOpen, title: "Getting Started", body: "Install, create or import a Starknet account, and choose Mainnet or Sepolia." },
  { id: "installation", icon: Download, title: "Installation", body: "Step-by-step installation for macOS, Windows, and Linux." },
  { id: "verifying", icon: ShieldCheck, title: "Security", body: "Verify SHA256 and PGP signatures before opening any release." },
  { id: "cairo-preview", icon: Cpu, title: "Cairo Preview", body: "Read decoded calldata and contract context before signing." },
  { id: "smart-accounts", icon: KeyRound, title: "Smart Accounts", body: "Inspect session keys, scopes, and spending approvals." },
  { id: "troubleshooting", icon: FileText, title: "Troubleshooting", body: "Common issues with installers, networks, and account imports." },
];

export function DocumentationPreview() {
  return (
    <section className="py-24" aria-labelledby="docs-heading">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Documentation</span>
          <h2 id="docs-heading" className="section-title mt-4">
            Run StarknetWallet with confidence.
          </h2>
          <p className="section-sub">
            Short, practical guides covering installation, release verification,
            Cairo call previews, and smart-account permission review.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DOC_LINKS.map(({ id, icon: Icon, title, body }) => (
            <Link
              key={id}
              to="/documentation"
              hash={id}
              className="block rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-brand/60"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
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
            <span className="eyebrow">Releases</span>
            <h2 id="releases-heading" className="section-title mt-4">
              Signed releases, clear verification.
            </h2>
            <p className="section-sub">
              Every release ships with SHA256 checksums and PGP signatures, for
              macOS, Windows, and Linux. Verify before you install.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/releases" className="btn-primary">
                <Tag size={16} aria-hidden="true" />
                View releases
              </Link>
              <Link to="/changelog" className="btn-ghost">
                View changelog
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-hairline bg-surface p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Latest</span>
              <span className="text-xs text-ink-muted">Desktop · macOS · Windows · Linux</span>
            </div>
            <h3 className="mt-3 text-xl font-bold text-ink">v1.0.0 — Initial desktop release</h3>
            <ul className="mt-4 grid gap-2 text-sm text-ink-muted">
              <li>· STRK balance management and transfers</li>
              <li>· Starknet Mainnet and Sepolia support</li>
              <li>· Cairo call preview before signing</li>
              <li>· Smart-account permission review</li>
              <li>· SHA256 + PGP signed release flow</li>
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
          <h2 id="cta-final-heading" className="section-title mt-4">
            Ready to review before you sign?
          </h2>
          <p className="section-sub mx-auto max-w-2xl">
            Download StarknetWallet, manage STRK, preview Cairo calls, and
            inspect smart-account permissions in a local-first desktop workflow.
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
            {["Open source", "Signed releases", "Local-first keys"].map((l) => (
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
