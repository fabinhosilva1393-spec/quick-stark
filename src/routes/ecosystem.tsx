import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Download, BookOpen } from "lucide-react";
import {
  StarknetIsoIllustration,
  type IsoIllustrationVariant,
} from "@/components/StarknetIsoIllustration";

const TITLE = "Ecosystem — StarknetWallet";
const DESC =
  "StarknetWallet is built for the Starknet ecosystem: STRK, Cairo, Starknet Mainnet, Sepolia, smart accounts, and account abstraction.";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/ecosystem" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/ecosystem" }],
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
  { variant: "wallet", title: "STRK management", body: "View balances and send STRK with a clear, desktop-grade signing surface." },
  { variant: "cairo-preview", title: "Cairo call preview", body: "Decoded calldata and target contract context before you approve." },
  { variant: "permissions", title: "Smart-account permission review", body: "Inspect session keys, scopes, and spending approvals before signing." },
  { variant: "multi-network", title: "Mainnet / Sepolia clarity", body: "The active Starknet network is visible on every signing screen." },
  { variant: "transactions", title: "dApp transaction review", body: "Larger review surface for contract, calldata, network, and fee." },
  { variant: "signed-release", title: "Signed desktop releases", body: "Every release ships with SHA256 checksums and PGP signatures." },
];

function EcosystemPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main" className="flex-1">
        <section className="py-20 lg:py-24">
          <div className="container-page max-w-4xl">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Ecosystem
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.05]">
              Built for the Starknet ecosystem.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-muted">
              StarknetWallet is designed around STRK, Cairo, Starknet Mainnet,
              Sepolia, and smart-account workflows.
            </p>
          </div>
        </section>

        <section className="py-16 border-t border-hairline bg-surface">
          <div className="container-page">
            <span className="eyebrow">Ecosystem context</span>
            <h2 className="section-title mt-4">The terms behind the wallet.</h2>
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
              Ecosystem names are shown for context only. StarknetWallet is not
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
              {FEATURES.map(({ icon: Icon, title, body }) => (
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
          </div>
        </section>

        <section className="py-20 border-t border-hairline">
          <div className="container-page">
            <div className="rounded-3xl border border-hairline bg-surface p-10 text-center lg:p-14">
              <h2 className="section-title">Try StarknetWallet on your desktop.</h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/" hash="download" className="btn-primary">
                  <Download size={16} aria-hidden="true" />
                  Download
                </Link>
                <Link to="/documentation" className="btn-ghost">
                  <BookOpen size={16} aria-hidden="true" />
                  Read documentation
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
