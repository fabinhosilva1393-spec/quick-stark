import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import { ReadingProgress } from "@/components/ReadingProgress";

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
    <div className="min-h-screen flex flex-col bg-background content-page">
      <ReadingProgress />
      <Header />
      <main id="main" className="flex-1">
        <section className="faq-hero">
          <div className="faq-hero__container">
            <div className="faq-hero__content">
              <span className="faq-hero__eyebrow">FAQ</span>
              <h1 className="faq-hero__title">
                Frequently asked questions
              </h1>
              <p className="faq-hero__description">
                Everything you need to know about installing, verifying and using
                StarknetWallet on desktop.
              </p>
            </div>
            <div className="faq-hero__visual" aria-hidden="true">
              <img
                src="/assets/pages/faq-background.svg"
                alt=""
                decoding="async"
              />
            </div>
          </div>
          <div className="faq-hero__background-glow" aria-hidden="true" />
        </section>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
