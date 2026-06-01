import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";

import { Ecosystem } from "@/components/Ecosystem";
import { DownloadSection } from "@/components/DownloadSection";

import { Features } from "@/components/Features";
import { Security } from "@/components/Security";
import { Compare } from "@/components/Compare";
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

const TITLE = "StarknetWallet — Desktop Wallet for Starknet";
const DESC =
  "A local-first desktop wallet for Starknet. Manage STRK, preview Cairo calls, and review smart-account permissions on macOS, Windows, and Linux.";

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
          downloadUrl: "https://starknetwallet.org/download",
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
