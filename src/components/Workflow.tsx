import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  StarknetIsoIllustration,
  type IsoIllustrationVariant,
} from "./StarknetIsoIllustration";
import cryptoWalletAsset from "@/assets/crypto-wallet-rewards.png.asset.json";

type Slide = {
  variant: IsoIllustrationVariant;
  eyebrow: string;
  title: string;
  body: string;
};

const SLIDES: Slide[] = [
  {
    variant: "cairo-preview",
    eyebrow: "Step 1",
    title: "Preview the Cairo call",
    body: "Inspect contract calls, calldata, and intent before you approve. See exactly what will execute on Starknet.",
  },
  {
    variant: "permissions",
    eyebrow: "Step 2",
    title: "Review permissions",
    body: "See which account permissions or dApp actions are being requested. Approve, scope, or reject in one place.",
  },
  {
    variant: "signed-release",
    eyebrow: "Step 3",
    title: "Verify the release",
    body: "Use signed releases, SHA256 checksums, and source links before installing. Trust by verification, not by faith.",
  },
  {
    variant: "wallet",
    eyebrow: "Step 4",
    title: "Manage STRK locally",
    body: "Keep a local-first desktop workflow for STRK, accounts, and networks — no browser tab, no remote keys.",
  },
];

export function Workflow() {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;

  const go = (next: number) => setIndex((next + total) % total);

  return (
    <section
      id="workflow"
      className="py-24 border-y border-hairline bg-surface-2"
      aria-labelledby="workflow-heading"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Workflow</span>
          <h2 id="workflow-heading" className="section-title mt-4">
            How StarknetWallet helps you sign with confidence.
          </h2>
          <p className="section-sub">
            Four steps from install to signed transaction — built for clarity
            on every approval.
          </p>
        </div>

        {/* Desktop: grid of all 4 slides */}
        <div className="mt-12 hidden md:grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SLIDES.map((s, i) => (
            <article
              key={s.title}
              className="surface-card flex flex-col items-start"
            >
              {i === 0 ? (
                <div className="w-full" style={{ maxWidth: 240 }}>
                  <CryptoWalletHero />
                </div>
              ) : (
                <StarknetIsoIllustration variant={s.variant} size={200} delay={i * 0.4} />
              )}
              <span className="eyebrow mt-4">{s.eyebrow}</span>
              <h3 className="mt-3 text-lg font-bold text-ink tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {s.body}
              </p>
            </article>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="mt-10 md:hidden">
          <article className="surface-card flex flex-col items-start">
            <StarknetIsoIllustration
              variant={SLIDES[index].variant}
              size={200}
            />
            <span className="eyebrow mt-4">{SLIDES[index].eyebrow}</span>
            <h3 className="mt-3 text-lg font-bold text-ink tracking-tight">
              {SLIDES[index].title}
            </h3>
            <p className="mt-2 text-sm text-ink-muted leading-relaxed">
              {SLIDES[index].body}
            </p>
          </article>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-1.5" role="tablist" aria-label="Workflow steps">
              {SLIDES.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to step ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-brand" : "w-2 bg-hairline"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-hairline bg-surface text-ink hover:bg-muted transition"
                aria-label="Previous step"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-hairline bg-surface text-ink hover:bg-muted transition"
                aria-label="Next step"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
