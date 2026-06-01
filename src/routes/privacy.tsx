import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TITLE = "Privacy Policy — StarknetWallet";
const DESC = "How StarknetWallet handles your data. Local-first by design.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main" className="flex-1">
        <section className="py-24">
          <div className="container-page max-w-3xl">
            <span className="eyebrow">Legal</span>
            <h1 className="section-title mt-4">Privacy Policy</h1>
            <div className="mt-8 space-y-4 text-ink-muted leading-relaxed">
              <p>
                StarknetWallet is a local-first desktop wallet. Private keys
                never leave your device. We do not operate accounts, collect
                personal information, or run telemetry on your transactions.
              </p>
              <p>
                Network RPC calls happen directly from your client to the
                Starknet nodes you configure. We do not proxy or log them.
              </p>
              <p>
                This page is a placeholder; a full privacy policy will be
                published with the first signed release.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
