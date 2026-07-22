import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Download, BookOpen } from "lucide-react";
import {
  StarknetIsoIllustration,
  type IsoIllustrationVariant,
} from "@/components/StarknetIsoIllustration";

const TITLE = "Ecosystem — Starknet Wallet";
const DESC =
  "Starknet Wallet is built for the Starknet ecosystem: STRK, Cairo, Starknet Mainnet, Sepolia, smart accounts, and account abstraction.";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://starknetwallet.org/ecosystem" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://starknetwallet.org/ecosystem" }],
  }),
  component: EcosystemPage,
});

const CONTEXT: { term: string; body: string }[] = [
  { term: "Starknet", body: "A validity-rollup Layer 2 on Ethereum, secured by STARK proofs." },
  { term: "Cairo", body: "The provable programming language used to write Starknet contracts." },
  { term: "STRK", body: "The native Starknet token used across the network." },
  { term: "Mainnet", body: "The production Starknet network where real assets live." },
  { term: "Sepolia", body: "The Starknet testnet used for development and verification." },
  { term: "Smart accounts", body: "Programmable Starknet accounts with custom validation and policies." },
  { term: "Account abstraction", body: "Starknet's account model that lets accounts define their own rules." },
];

const ECOSYSTEM_NAMES = [
  "Starknet",
  "Cairo",
  "STRK",
  "Argent",
  "Braavos",
  "Ekubo",
  "Nostra",
  "JediSwap",
];

type Card = { variant: IsoIllustrationVariant; title: string; body: string };
const FEATURES: Card[] = [
  { variant: "coin-stack", title: "STRK management", body: "View balances and send STRK with a clear, desktop-grade signing surface." },
  { variant: "code-brackets", title: "Cairo call preview", body: "Decoded calldata and target contract context before you approve." },
  { variant: "signer-tree", title: "Smart-account permission review", body: "Inspect session keys, scopes, and spending approvals before signing." },
  { variant: "network-constellation", title: "Mainnet / Sepolia clarity", body: "The active Starknet network is visible on every signing screen." },
  { variant: "approval-path", title: "dApp transaction review", body: "Larger review surface for contract, calldata, network, and fee." },
  { variant: "release-tag", title: "Signed desktop builds", body: "Every maintained build ships with SHA256 checksums and PGP signatures." },
];

const ECOSYSTEM_LABELS = [
  { label: "Cairo", className: "label--cairo" },
  { label: "STRK", className: "label--strk" },
  { label: "Mainnet", className: "label--mainnet" },
  { label: "Sepolia", className: "label--sepolia" },
  { label: "Smart accounts", className: "label--smart-accounts" },
  { label: "Account abstraction", className: "label--account-abstraction" },
];

function EcosystemPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main" className="flex-1">
        <section className="ecosystem-hero">
          <div className="ecosystem-hero__visual" aria-hidden="true">
            <img src="/assets/pages/ecosystem-hero-visual.svg" alt="" />
            {ECOSYSTEM_LABELS.map((l) => (
              <span
                key={l.label}
                className={`ecosystem-visual-label ${l.className}`}
              >
                {l.label}
              </span>
            ))}
          </div>
          <div className="ecosystem-hero__overlay" aria-hidden="true" />
          <div className="ecosystem-hero__container">
            <div className="ecosystem-hero__content">
              <span className="ecosystem-hero__eyebrow">Ecosystem</span>
              <h1 className="ecosystem-hero__title">
                Built for the <span>Starknet ecosystem.</span>
              </h1>
              <p className="ecosystem-hero__description">
                Starknet Wallet is designed around STRK, Cairo, Starknet Mainnet,
                Sepolia and smart-account workflows.
              </p>
              <div className="ecosystem-hero__actions">
                <a href="#ecosystem-content" className="btn-primary">
                  Explore the ecosystem
                </a>
                <Link to="/docs" className="btn-ghost">
                  Read the docs
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="ecosystem-content" className="py-16 border-t border-hairline bg-surface scroll-mt-24">
          <div className="container-page">
            <span className="eyebrow">Ecosystem context</span>
            <h2 className="section-title mt-4">How the ecosystem fits together.</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CONTEXT.map((c) => (
                <article key={c.term} className="rounded-2xl border border-hairline bg-background p-6">
                  <h3 className="text-lg font-bold text-ink">{c.term}</h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-hairline">
          <div className="container-page">
            <span className="eyebrow">Compatible ecosystem references</span>
            <h2 className="section-title mt-4">Names you may recognize.</h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {ECOSYSTEM_NAMES.map((n) => (
                <li key={n}>
                  <span className="trust-chip">{n}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl text-sm text-ink-muted">
              Ecosystem names are shown for context only. Starknet Wallet is not
              affiliated with Starknet Foundation or these projects unless
              explicitly stated.
            </p>
          </div>
        </section>

        <section className="py-20 border-t border-hairline bg-surface-2">
          <div className="container-page">
            <div className="max-w-2xl">
              <span className="eyebrow">Starknet-native features</span>
              <h2 className="section-title mt-4">Made for how Starknet actually works.</h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map(({ variant, title, body }, i) => (
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
          </div>
        </section>

        <section className="py-20 border-t border-hairline">
          <div className="container-page">
            <div className="rounded-3xl border border-hairline bg-surface p-10 text-center lg:p-14">
              <h2 className="section-title">Try Starknet Wallet on your desktop.</h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/" hash="download" className="btn-primary">
                  <Download size={16} aria-hidden="true" />
                  Download
                </Link>
                <Link to="/docs" className="btn-ghost">
                  <BookOpen size={16} aria-hidden="true" />
                  Read docs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
