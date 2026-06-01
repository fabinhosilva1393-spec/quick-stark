import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TITLE = "Cookie Policy — StarknetWallet";
const DESC = "How StarknetWallet uses cookies on this marketing site.";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main" className="flex-1">
        <section className="py-24">
          <div className="container-page max-w-3xl">
            <span className="eyebrow">Legal</span>
            <h1 className="section-title mt-4">Cookie Policy</h1>
            <div className="mt-8 space-y-4 text-ink-muted leading-relaxed">
              <p>
                This marketing site uses only essential cookies required to
                serve the page. We do not run advertising or third-party
                tracking cookies.
              </p>
              <p>
                The StarknetWallet desktop application itself does not use
                cookies — it stores configuration locally on your device.
              </p>
              <p>
                This page is a placeholder; a full cookie policy will be
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
