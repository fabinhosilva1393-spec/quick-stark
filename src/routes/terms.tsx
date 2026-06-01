import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TITLE = "Terms of Use — StarknetWallet";
const DESC = "Terms governing use of the StarknetWallet desktop application.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main" className="flex-1">
        <section className="py-24">
          <div className="container-page max-w-3xl">
            <span className="eyebrow">Legal</span>
            <h1 className="section-title mt-4">Terms of Use</h1>
            <div className="mt-8 space-y-4 text-ink-muted leading-relaxed">
              <p>
                StarknetWallet is provided as open-source software, without
                warranty of any kind. You are responsible for safeguarding your
                seed phrase and verifying release signatures before installing.
              </p>
              <p>
                StarknetWallet is not affiliated with the Starknet Foundation
                unless explicitly stated. Ecosystem links are provided for
                context.
              </p>
              <p>
                This page is a placeholder; full terms will be published with
                the first signed release.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
