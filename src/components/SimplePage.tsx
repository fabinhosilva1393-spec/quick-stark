import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type SimplePageProps = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
};

export function SimplePage({ eyebrow = "StarknetWallet", title, children }: SimplePageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main id="main" className="flex-1">
        <section className="py-20 lg:py-24">
          <div className="container-page max-w-3xl">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="section-title mt-4">{title}</h1>
            <div className="mt-8 space-y-4 text-ink-muted leading-relaxed [&_a]:text-brand [&_a:hover]:underline [&_h2]:text-ink [&_h2]:font-bold [&_h2]:text-lg [&_h2]:mt-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5">
              {children}
            </div>
            <div className="mt-12 pt-8 border-t border-hairline">
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
