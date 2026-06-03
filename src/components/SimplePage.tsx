import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type SimplePageProps = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  illustration?: ReactNode;
};

export function SimplePage({ eyebrow = "Wallet", title, children, illustration }: SimplePageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main" className="flex-1">
        <section className="py-20 lg:py-24">
          <div className="container-page max-w-5xl">
            {illustration ? (
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-10 lg:gap-14 items-start">
                <div className="min-w-0 order-1">
                  <span className="eyebrow">{eyebrow}</span>
                  <h1 className="font-display section-title mt-4 font-semibold">{title}</h1>
                </div>
                <div className="min-w-0 order-2 lg:order-2 mx-auto w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px] lg:row-span-2">
                  {illustration}
                </div>
                <div className="min-w-0 order-3 lg:col-start-1 lg:row-start-2 max-w-3xl mt-2 space-y-4 text-ink-muted leading-relaxed [&_a]:text-brand [&_a:hover]:underline [&_h2]:text-ink [&_h2]:font-bold [&_h2]:text-lg [&_h2]:mt-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5">
                  {children}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl">
                <span className="eyebrow">{eyebrow}</span>
                <h1 className="font-display section-title mt-4 font-semibold">{title}</h1>
                <div className="mt-8 space-y-4 text-ink-muted leading-relaxed [&_a]:text-brand [&_a:hover]:underline [&_h2]:text-ink [&_h2]:font-bold [&_h2]:text-lg [&_h2]:mt-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5">
                  {children}
                </div>
              </div>
            )}
            <div className="mt-12 pt-8 border-t border-hairline max-w-3xl">
              <Link to="/" className="text-sm text-ink-muted hover:text-brand">
                ← Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
