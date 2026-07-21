import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export type ContentSection = { id: string; label: string };

export type ContentAction = {
  label: string;
  to?: string;
  hash?: string;
  href?: string;
  external?: boolean;
  variant?: "primary" | "secondary";
};

type ContentPageLayoutProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  sections?: ContentSection[];
  actions?: ContentAction[];
  illustration?: ReactNode;
  children: ReactNode;
};

function ActionButton({ action }: { action: ContentAction }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors";
  const cls =
    action.variant === "primary"
      ? `${base} bg-brand text-white hover:opacity-90`
      : `${base} border border-hairline text-ink hover:border-brand hover:text-brand`;

  if (action.href) {
    return (
      <a
        href={action.href}
        target={action.external ? "_blank" : undefined}
        rel={action.external ? "noopener noreferrer" : undefined}
        className={cls}
      >
        {action.label}
      </a>
    );
  }
  if (action.to) {
    return (
      <Link to={action.to} hash={action.hash} className={cls}>
        {action.label}
      </Link>
    );
  }
  return null;
}

export function ContentPageLayout({
  eyebrow = "StarknetWallet",
  title,
  description,
  sections,
  actions,
  illustration,
  children,
}: ContentPageLayoutProps) {
  const hasToc = sections && sections.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-background content-page">
      <Header />
      <main id="main" className="flex-1">
        <section className="pt-16 pb-24 lg:pt-20 lg:pb-28">
          <div className="container-page">
            {/* Header block */}
            <div
              className={
                illustration
                  ? "grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-10 lg:gap-14 items-start"
                  : "max-w-3xl"
              }
            >
              <div className="min-w-0">
                <span className="eyebrow">{eyebrow}</span>
                <h1 className="font-display section-title mt-4 font-semibold">
                  {title}
                </h1>
                {description && (
                  <p className="section-sub mt-5 max-w-2xl">{description}</p>
                )}
                {actions && actions.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {actions.map((a) => (
                      <ActionButton key={a.label} action={a} />
                    ))}
                  </div>
                )}
              </div>
              {illustration && (
                <div className="min-w-0 mx-auto w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px]">
                  {illustration}
                </div>
              )}
            </div>

            {/* Body + optional sticky TOC */}
            <div
              className={
                hasToc
                  ? "mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,220px)] gap-10 lg:gap-14 items-start"
                  : "mt-12"
              }
            >
              <div className="min-w-0 max-w-3xl content-prose space-y-4 text-ink-muted leading-relaxed">
                {children}
              </div>
              {hasToc && (
                <aside className="hidden lg:block sticky top-24 self-start">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted mb-3">
                    On this page
                  </p>
                  <nav>
                    <ul className="space-y-2 border-l border-hairline pl-4">
                      {sections!.map((s) => (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className="block text-sm text-ink-muted hover:text-brand transition-colors"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </aside>
              )}
            </div>

            <div className="mt-16 pt-8 border-t border-hairline max-w-3xl">
              <Link
                to="/"
                className="text-sm text-ink-muted hover:text-brand"
              >
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
