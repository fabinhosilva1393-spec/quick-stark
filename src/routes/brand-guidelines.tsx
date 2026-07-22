import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import logoAsset from "@/assets/starknet-logomark.png.asset.json";

const TITLE = "Brand guidelines — Starknet Wallet";
const DESC =
  "The Starknet Wallet brand system: logo, colors, typography, and usage rules for writing about, integrating with, or covering Starknet Wallet.";

export const Route = createFileRoute("/brand-guidelines")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://starknetwallet.org/brand-guidelines" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://starknetwallet.org/brand-guidelines" }],
  }),
  component: BrandPage,
});

const COLORS: { name: string; hex: string; text?: string }[] = [
  { name: "Starknet Blue", hex: "#0A45FF" },
  { name: "Deep Navy", hex: "#070A1A" },
  { name: "Panel Navy", hex: "#10142A" },
  { name: "Ink", hex: "#F8FAFC", text: "#070A1A" },
  { name: "Muted", hex: "#AAB2C8", text: "#070A1A" },
  { name: "Violet Accent", hex: "#7C3AED" },
];

const USAGE = [
  "Don't rotate, recolor, or distort the logo.",
  "Don't combine the logo with other marks without permission.",
  "Don't use the brand to imply endorsement.",
  "Don't imply affiliation with Starknet Foundation unless explicitly stated.",
];

function DisabledAction({ label }: { label: string }) {
  return (
    <span
      aria-disabled="true"
      title="Available on request"
      className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-hairline text-sm font-semibold text-ink-muted/70 cursor-not-allowed select-none"
    >
      {label}
      <span className="text-[10px] uppercase tracking-[0.14em] text-ink-muted/60">
        On request
      </span>
    </span>
  );
}

function BrandPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main" className="flex-1">
        <section className="py-20 lg:py-24">
          <div className="container-page max-w-4xl">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Brand
            </span>
            <h1 className="font-display mt-5 text-5xl sm:text-6xl font-semibold tracking-tight text-ink leading-[1.02]">
              The Starknet Wallet brand system.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-muted">
              Use these assets when writing about, integrating with, or
              covering Starknet Wallet.
            </p>
          </div>
        </section>

        {/* Logo */}
        <section className="py-16 border-t border-hairline bg-surface">
          <div className="container-page">
            <span className="eyebrow">Logo</span>
            <h2 className="section-title mt-4">Logomark and wordmark.</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-hairline bg-background p-8 flex flex-col items-center justify-center">
                <img
                  src={logoAsset.url}
                  alt="Starknet Wallet logomark"
                  className="h-24 w-24 object-contain"
                />
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-ink-muted">
                  Logomark
                </p>
              </div>
              <div className="rounded-2xl border border-hairline bg-background p-8 flex flex-col items-center justify-center">
                <div className="flex items-center gap-3">
                  <img
                    src={logoAsset.url}
                    alt=""
                    aria-hidden="true"
                    className="h-10 w-10 object-contain"
                  />
                  <span className="text-2xl font-bold tracking-tight text-ink">
                    Starknet<span className="text-brand text-white">Wallet</span>
                  </span>
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-ink-muted">
                  Wordmark
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <DisabledAction label="PNG" />
              <DisabledAction label="SVG" />
              <DisabledAction label="Brand kit (.zip)" />
            </div>
            <p className="mt-4 text-xs text-ink-muted">
              Brand files are available on request alongside the current
              maintained build.
            </p>
          </div>
        </section>

        {/* Colors */}
        <section className="py-16 border-t border-hairline">
          <div className="container-page">
            <span className="eyebrow">Colors</span>
            <h2 className="section-title mt-4">Brand palette.</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {COLORS.map((c) => (
                <article
                  key={c.name}
                  className="rounded-2xl border border-hairline overflow-hidden"
                >
                  <div
                    className="h-24"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden="true"
                  />
                  <div className="p-5 bg-surface">
                    <h3 className="text-base font-bold text-ink">{c.name}</h3>
                    <p className="mt-1 font-mono text-sm text-ink-muted">
                      {c.hex.toUpperCase()}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="py-16 border-t border-hairline bg-surface-2">
          <div className="container-page">
            <span className="eyebrow">Typography</span>
            <h2 className="section-title mt-4">Type system.</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-hairline bg-surface p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
                  Display
                </p>
                <p className="mt-3 text-4xl font-extrabold tracking-tight text-ink leading-tight">
                  Aa Bb Cc
                </p>
                <p className="mt-3 text-sm text-ink-muted">
                  Used for headings and key product moments. Matches the
                  current site display family.
                </p>
              </article>
              <article className="rounded-2xl border border-hairline bg-surface p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
                  Mono
                </p>
                <p className="mt-3 font-mono text-3xl text-ink">0x · STRK</p>
                <p className="mt-3 text-sm text-ink-muted">
                  Used for code, hashes, addresses, and command examples.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Usage rules */}
        <section className="py-16 border-t border-hairline">
          <div className="container-page max-w-3xl">
            <span className="eyebrow">Usage rules</span>
            <h2 className="section-title mt-4">Please don't.</h2>
            <ul className="mt-8 grid gap-3">
              {USAGE.map((u) => (
                <li
                  key={u}
                  className="rounded-xl border border-hairline bg-surface p-4 text-sm text-ink"
                >
                  {u}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-muted">
              Ecosystem names are shown for context only. Please use the
              Starknet Wallet brand assets as described above so the product
              is represented clearly and consistently.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-hairline bg-surface">
          <div className="container-page">
            <div className="rounded-3xl border border-hairline bg-background p-10 text-center lg:p-14">
              <h2 className="section-title">Need to talk to us?</h2>
              <p className="section-sub mx-auto max-w-2xl">
                For coverage, integration, or brand questions, get in touch or
                explore the Starknet ecosystem context.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/contact" className="btn-primary">
                  Contact
                </Link>
                <Link to="/ecosystem" className="btn-ghost">
                  Ecosystem
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
