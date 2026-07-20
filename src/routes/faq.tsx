import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";

const TITLE = "FAQ — StarknetWallet";
const DESC =
  "Answers about StarknetWallet: pricing, verification, supported accounts, hardware wallets, platforms, and responsible disclosure.";
const URL = "https://starknetwallet.org/faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main" className="flex-1">
        <div className="container-page pt-16 pb-6">
          <span className="eyebrow">Support</span>
          <h1 className="font-display section-title mt-4 font-semibold">
            Frequently asked questions
          </h1>
          <p className="section-sub max-w-2xl">
            Everything you need to know about installing, verifying, and using
            StarknetWallet on desktop.
          </p>
        </div>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
