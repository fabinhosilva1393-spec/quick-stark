import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Ecosystem } from "@/components/Ecosystem";
import { HomeHighlights } from "@/components/HomeHighlights";

const TITLE = "Starknet Wallet — Secure desktop wallet for Starknet";
const DESC =
  "Manage STRK, review Cairo calls and inspect smart-account permissions from a focused desktop wallet experience.";
const SITE_URL = "https://starknetwallet.org/";
const OG_IMAGE = "https://starknetwallet.org/social/starknetwallet-social-card.png";
const OG_IMAGE_ALT = "Starknet Wallet — Secure desktop wallet for Starknet";

const FAQ_ITEMS: { q: string; a: string }[] = [
  { q: "Is Starknet Wallet free?", a: "Yes. Starknet Wallet is free and open source. There are no subscriptions, no premium tiers, and no in-app upsells." },
  { q: "What is Starknet Wallet built for?", a: "Starknet Wallet is built for secure Starknet desktop workflows — clear transaction review, local-first key control, and transparent smart-account signing across macOS, Windows, and Linux." },
  { q: "Does Starknet Wallet collect my data?", a: "No telemetry is sent by default. Private keys never leave your device. You can route RPC calls through your own node for full privacy." },
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
      { property: "og:site_name", content: "Starknet Wallet" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:secure_url", content: OG_IMAGE },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: OG_IMAGE_ALT },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: OG_IMAGE_ALT },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Starknet Wallet",
          applicationCategory: "FinanceApplication",
          operatingSystem: "macOS, Windows, Linux",
          url: SITE_URL,
          image: OG_IMAGE,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          downloadUrl: "https://starknetwallet.org/#download",
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
      <AnnouncementBar />
      <main id="main" className="flex-1">
        <Hero />
        <Ecosystem />
        <HomeHighlights />
      </main>
      <Footer />
    </div>
  );
}
