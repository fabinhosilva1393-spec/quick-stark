import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHeroBackdrop } from "@/components/PageHeroBackdrop";
import { ReadingProgress } from "@/components/ReadingProgress";
import { GITHUB_REPO_URL } from "@/data/downloads";

const TITLE = "Contact — Starknet Wallet";
const DESC =
  "Support, security reports, ecosystem questions, or product feedback for Starknet Wallet.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://starknetwallet.org/contact" },
    ],
    links: [{ rel: "canonical", href: "https://starknetwallet.org/contact" }],
  }),
  component: ContactPage,
});

const SOCIALS: { name: string; href: string; label: string; path: string }[] = [
  {
    name: "X",
    href: "https://twitter.com/Starknet",
    label: "Starknet on X",
    path: "M18.244 2H21l-6.52 7.45L22 22h-6.83l-4.78-6.26L4.8 22H2.04l6.98-7.97L2 2h6.91l4.33 5.72L18.244 2zm-2.4 18h1.66L8.24 4H6.47l9.37 16z",
  },
  {
    name: "Discord",
    href: "https://discord.gg/starknet-community",
    label: "Starknet Discord",
    path: "M20.317 4.369A19.79 19.79 0 0 0 16.558 3.2a.075.075 0 0 0-.079.037c-.34.6-.717 1.382-.98 1.996a18.27 18.27 0 0 0-5 0 12.51 12.51 0 0 0-.995-1.996.078.078 0 0 0-.079-.037A19.74 19.74 0 0 0 5.683 4.37a.07.07 0 0 0-.032.027C2.533 9.046 1.7 13.58 2.1 18.057a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.105 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.075.075 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.075.075 0 0 1 .079.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
  },
  {
    name: "GitHub",
    href: "https://github.com/starknet-io",
    label: "Starknet GitHub",
    path: "M12 .5C5.73.5.99 5.24.99 11.51c0 4.86 3.15 8.98 7.52 10.43.55.1.75-.24.75-.53 0-.26-.01-.95-.02-1.87-3.06.66-3.71-1.48-3.71-1.48-.5-1.27-1.22-1.61-1.22-1.61-1-.69.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.21.92.1-.71.39-1.2.7-1.47-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .93-.3 3.05 1.13a10.58 10.58 0 0 1 5.55 0c2.12-1.43 3.05-1.13 3.05-1.13.6 1.52.22 2.64.11 2.92.71.77 1.13 1.75 1.13 2.95 0 4.22-2.57 5.15-5.02 5.42.4.34.76 1.02.76 2.05 0 1.48-.01 2.67-.01 3.03 0 .29.2.64.76.53A11 11 0 0 0 23 11.51C23 5.24 18.27.5 12 .5z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Starknet",
    label: "Starknet YouTube",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.12C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.48A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12C4.4 20.4 12 20.4 12 20.4s7.6 0 9.4-.48a3 3 0 0 0 2.1-2.12A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z",
  },
  {
    name: "Telegram",
    href: "https://t.me/starknet_ecosystem",
    label: "Starknet Telegram",
    path: "M21.94 4.3 18.7 19.55c-.24 1.08-.88 1.34-1.78.83l-4.92-3.63-2.37 2.28c-.26.26-.48.48-.99.48l.35-5.02 9.13-8.25c.4-.35-.09-.55-.62-.2L6.21 13.2 1.35 11.68c-1.06-.33-1.08-1.06.22-1.57L20.57 2.8c.88-.33 1.65.2 1.37 1.5z",
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function EmailCaptureCard() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed) || trimmed.length > 255) {
      setError("Please enter a valid email address.");
      setStatus("idle");
      return;
    }
    setError(null);
    setStatus("success");
    setEmail("");
  }

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-7 shadow-[0_0_0_1px_rgba(10,69,255,0.04),0_30px_60px_-30px_rgba(10,69,255,0.25)]">
      <h2 className="text-xl font-bold text-ink">Stay updated</h2>
      <p className="mt-2 text-sm text-ink-muted leading-relaxed">
        Get version notes, security updates, and Starknet Wallet product news.
      </p>
      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-3">
        <label htmlFor="contact-email" className="sr-only">
          Email address
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="contact-email"
            type="email"
            required
            maxLength={255}
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
              if (status === "success") setStatus("idle");
            }}
            placeholder="Please enter your email"
            aria-label="Email address"
            aria-invalid={!!error}
            aria-describedby={error ? "contact-email-error" : undefined}
            className="h-11 flex-1 rounded-full border border-hairline bg-background/60 px-4 text-sm text-ink placeholder:text-ink-muted outline-none transition focus:border-brand/60 focus:ring-2 focus:ring-brand/30"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            Submit
          </button>
        </div>
        {error && (
          <p id="contact-email-error" className="text-xs text-red-400">
            {error}
          </p>
        )}
        {status === "success" && (
          <p className="text-xs text-ink-muted">
            Thanks — email capture is not connected yet.
          </p>
        )}
      </form>
      <p className="mt-5 text-xs text-ink-muted/70">
        We do not share your email. You can unsubscribe at any time once a
        backend is connected.
      </p>
    </div>
  );
}

type ContactCard = {
  title: string;
  text: string;
  href?: string;
  external?: boolean;
  internal?: string;
  disabledNote?: string;
};

const CONTACT_CARDS: ContactCard[] = [
  {
    title: "GitHub issues",
    text: "Report bugs and request features in the open.",
    href: GITHUB_REPO_URL || undefined,
    external: true,
    disabledNote: "Project repository not configured yet.",
  },
  {
    title: "Security reports",
    text: "Report security concerns responsibly.",
    disabledNote: "Security contact not configured yet.",
  },
  {
    title: "Community",
    text: "Join Starknet ecosystem conversations.",
    href: "https://discord.gg/starknet-community",
    external: true,
  },
  {
    title: "Docs",
    text: "Read setup, security, and Starknet Wallet usage guides.",
    internal: "/docs",
  },
];

function ContactCardView({ card }: { card: ContactCard }) {
  const base =
    "block rounded-2xl border border-hairline bg-surface p-6 transition-colors";
  const interactive = "hover:border-brand/60 hover:bg-surface-2/40";

  const content = (
    <>
      <h3 className="text-base font-bold text-ink">{card.title}</h3>
      <p className="mt-2 text-sm text-ink-muted leading-relaxed">{card.text}</p>
      {card.disabledNote && !card.href && !card.internal && (
        <p className="mt-3 text-xs text-ink-muted/70">{card.disabledNote}</p>
      )}
      {(card.href || card.internal) && (
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand">
          Open <span aria-hidden="true">→</span>
        </span>
      )}
    </>
  );

  if (card.internal) {
    return (
      <Link to={card.internal} className={`${base} ${interactive}`}>
        {content}
      </Link>
    );
  }
  if (card.href && card.external) {
    return (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${interactive}`}
      >
        {content}
      </a>
    );
  }
  return <div className={`${base} opacity-80`}>{content}</div>;
}

function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background content-page">
      <ReadingProgress />
      <Header />
      <main id="main" className="flex-1">
        <section className="relative py-20 lg:py-28">
          <PageHeroBackdrop src="/assets/pages/support-hero.svg" />
          <div className="relative container-page">
            <div className="max-w-3xl">
              <span className="eyebrow">Contact</span>
              <h1 className="section-title mt-4">Talk to a real human.</h1>
              <p className="section-sub mt-5">
                Support, security reports, ecosystem questions, or product
                feedback for Starknet Wallet.
              </p>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <EmailCaptureCard />

                <div className="rounded-2xl border border-hairline bg-surface p-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-ink">
                    Follow Starknet
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {SOCIALS.map((s) => (
                      <li key={s.name}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          title={s.label}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink-muted transition-all duration-200 hover:-translate-y-px hover:border-brand hover:text-brand"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-4 w-4"
                          >
                            <path d={s.path} />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-ink-muted/70">
                    Starknet ecosystem links are provided for context so
                    users can explore the wider Starknet environment alongside
                    the Starknet Wallet desktop workflow.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {CONTACT_CARDS.map((c) => (
                  <ContactCardView key={c.title} card={c} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
