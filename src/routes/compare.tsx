import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeroBackdrop } from "@/components/PageHeroBackdrop";
import { ReadingProgress } from "@/components/ReadingProgress";

const TITLE = "Compare — Starknet Wallet";
const DESC =
  "How Starknet Wallet's desktop environment supports Starknet signing across review surface, Cairo context, smart-account permissions, and build verification.";


export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "https://starknetwallet.org/compare" }],
  }),
  component: ComparePage,
});

type Cell = "yes" | "varies" | "none";

const ROWS: { feature: string; us: Cell; ext: Cell }[] = [
  { feature: "Native desktop app", us: "yes", ext: "none" },
  { feature: "STRK management", us: "yes", ext: "varies" },
  { feature: "Starknet Mainnet / Sepolia clarity", us: "yes", ext: "varies" },
  { feature: "Cairo calldata preview", us: "yes", ext: "varies" },
  { feature: "Smart-account permission review", us: "yes", ext: "varies" },
  { feature: "dApp transaction review", us: "yes", ext: "varies" },
  { feature: "Session key / spending approval visibility", us: "yes", ext: "varies" },
  { feature: "Local-first account data", us: "yes", ext: "varies" },
  { feature: "No telemetry by default", us: "yes", ext: "varies" },
  { feature: "Signed desktop builds", us: "yes", ext: "none" },
  { feature: "SHA256 / PGP verification", us: "yes", ext: "none" },
  { feature: "Larger review surface", us: "yes", ext: "varies" },
  { feature: "Browser-tab isolation", us: "yes", ext: "none" },
  { feature: "Open source", us: "yes", ext: "varies" },
  { feature: "Hardware wallet readiness", us: "yes", ext: "varies" },
];

function CellView({ value, primary }: { value: Cell; primary?: boolean }) {
  if (value === "yes") {
    return (
      <Check
        size={18}
        className={primary ? "inline text-brand" : "inline text-ink/60"}
        aria-label="Supported"
      />
    );
  }
  if (value === "varies") {
    return <span className="text-sm text-ink-muted">Varies</span>;
  }
  return <span className="text-ink-muted" aria-label="Not supported">—</span>;
}

const CARDS = [
  {
    title: "Choose the right environment for every approval",
    body: "Browser wallets are useful for quick dApp access. Starknet Wallet focuses on a dedicated desktop review surface for users who want more context before signing.",
  },
  {
    title: "Starknet-native signing context",
    body: "Starknet accounts are smart contracts, so account permissions, calldata, fees, and contract context deserve clear inspection before approval.",
  },
  {
    title: "A focused review surface",
    body: "A larger desktop window provides room to inspect contracts, calldata, network details, and fee information with a calmer signing flow.",
  },
];


function ComparePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background content-page">
      <ReadingProgress />
      <Header />
      <main id="main" className="flex-1">
        <section className="relative py-20 lg:py-28">
          <PageHeroBackdrop src="/assets/pages/compare-hero.svg" />
          <div className="relative container-page">
            <div className="max-w-3xl">
              <span className="eyebrow">Compare</span>
              <h1 className="font-display section-title mt-4 font-semibold">
                Built for Starknet signing, end to end.
              </h1>
              <p className="section-sub mt-5">
                Starknet Wallet is designed around focused desktop review,
                Cairo call context, STRK management, smart-account permissions,
                and verified desktop builds. This page compares those
                capabilities across common wallet environments.
              </p>

            </div>

            <div className="mt-10 rounded-xl border border-hairline bg-surface/60 p-5 text-sm text-ink-muted">
              <p>
                <span className="font-semibold text-ink">Methodology</span> ·{" "}
                <Check size={14} className="inline text-brand" /> = supported ·{" "}
                <span className="text-ink">Varies</span> = depends on wallet,
                version, browser, permissions, or setup · — = not supported or
                not applicable.
              </p>
              <p className="mt-2 opacity-80">
                Category comparison only. Verify each wallet directly before
                relying on a capability.
              </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-xl border border-hairline bg-surface">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="bg-surface-2 text-left">
                      <th className="px-5 py-4 font-semibold text-ink-muted">
                        Capability
                      </th>
                      <th className="px-5 py-4 text-center font-bold text-ink">
                        Starknet Wallet
                      </th>
                      <th className="px-5 py-4 text-center font-semibold text-ink-muted">
                        Other wallet environments
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row, i) => (
                      <tr
                        key={row.feature}
                        className={i % 2 ? "bg-surface-2/40" : ""}
                      >
                        <td className="border-t border-hairline px-5 py-4 text-ink">
                          {row.feature}
                        </td>
                        <td className="border-t border-l border-hairline px-5 py-4 text-center bg-brand/5">
                          <CellView value={row.us} primary />
                        </td>
                        <td className="border-t border-l border-hairline px-5 py-4 text-center">
                          <CellView value={row.ext} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {CARDS.map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl border border-hairline bg-surface p-6"
                >
                  <h3 className="font-bold text-ink">{c.title}</h3>
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-2xl border border-hairline bg-surface p-8 md:p-10 text-center">
              <h2 className="font-display section-title font-semibold">Clarity before every approval.</h2>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to="/"
                  hash="download"
                  className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                >
                  Download
                </Link>
                <Link
                  to="/security"
                  className="inline-flex items-center justify-center rounded-full border border-hairline px-5 py-2.5 text-sm font-semibold text-ink hover:border-brand hover:text-brand"
                >
                  Read security model
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center justify-center rounded-full border border-hairline px-5 py-2.5 text-sm font-semibold text-ink hover:border-brand hover:text-brand"
                >
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
