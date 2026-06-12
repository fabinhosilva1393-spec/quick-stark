import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";

import { Ecosystem } from "@/components/Ecosystem";
import { DownloadSection } from "@/components/DownloadSection";

import { Features } from "@/components/Features";
import { Security } from "@/components/Security";
import { Compare } from "@/components/Compare";
import { Compatibility } from "@/components/Compatibility";
import { Developers } from "@/components/Developers";
import { Workflow } from "@/components/Workflow";
import { FAQ } from "@/components/FAQ";
import {
  WhyDesktop,
  Migration,
  DocumentationPreview,
  ReleasesPreview,
  CtaFinal,
} from "@/components/HomeSections";

const TITLE = "Starknet Desktop Wallet — STRK, Cairo & Smart Accounts";
const DESC =
  "A local-first desktop wallet for Starknet. Manage STRK, preview Cairo calls, and review smart-account permissions on macOS, Windows, and Linux.";

const FAQ_ITEMS: { q: string; a: string }[] = [
  { q: "Is StarknetWallet free?", a: "Yes. StarknetWallet is free and open source. There are no subscriptions, no premium tiers, and no in-app upsells." },
  { q: "What is StarknetWallet built for?", a: "StarknetWallet is built for secure Starknet desktop workflows — clear transaction review, local-first key control, and transparent smart-account signing across macOS, Windows, and Linux." },
  { q: "Does StarknetWallet collect my data?", a: "No telemetry is sent by default. Private keys never leave your device. You can route RPC calls through your own node for full privacy." },
  { q: "Which Starknet accounts are supported?", a: "Common account-abstraction implementations on Starknet, including Argent and Braavos-style accounts, as well as standard OpenZeppelin accounts." },
  { q: "Can I use a Ledger hardware wallet?", a: "Hardware-wallet workflows are supported through compatible Starknet signing tooling. Ledger users typically sign Starknet transactions via wallets such as Argent, Braavos, or Ready." },
  { q: "How do I verify a build?", a: "Every maintained build ships with a SHA256 checksum and a PGP signature. See the verification commands on the versions page for the exact steps for the current maintained build." },
  { q: "What platforms are supported?", a: "macOS 12 or later (Apple Silicon and Intel), Windows 10 or later (x64), and recent Linux distributions via .AppImage or .deb." },
  { q: "Where do I report a vulnerability?", a: "Please report security issues privately through the channel listed in the public GitHub organization. Do not open a public issue for an exploitable vulnerability." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "StarknetWallet",
          applicationCategory: "FinanceApplication",
          operatingSystem: "macOS, Windows, Linux",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          downloadUrl: "https://quick-stark.lovable.app/#download",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Ecosystem />
        <DownloadSection id="download" />
        <Features />
        <Security />
        <WhyDesktop />
        <Migration />
        <Compatibility />
        <Compare />
        <DocumentationPreview />
        <ReleasesPreview />
        <Workflow />
        <Developers />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </div>
  );
}
