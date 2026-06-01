import { Link } from "@tanstack/react-router";
import { openCookieSettings } from "@/lib/cookieConsent";

import logoAsset from "@/assets/starknet-logomark.png.asset.json";

import type { ReactNode } from "react";

type SocialLink = {
  name: string;
  href: string;
  label: string;
  icon: ReactNode;
};

const SOCIALS: SocialLink[] = [
  {
    name: "X",
    href: "https://twitter.com/Starknet",
    label: "Starknet on X",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M18.244 2H21l-6.52 7.45L22 22h-6.83l-4.78-6.26L4.8 22H2.04l6.98-7.97L2 2h6.91l4.33 5.72L18.244 2zm-2.4 18h1.66L8.24 4H6.47l9.37 16z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "https://discord.gg/starknet-community",
    label: "Starknet Discord",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3.2a.075.075 0 0 0-.079.037c-.34.6-.717 1.382-.98 1.996a18.27 18.27 0 0 0-5 0 12.51 12.51 0 0 0-.995-1.996.078.078 0 0 0-.079-.037A19.74 19.74 0 0 0 5.683 4.37a.07.07 0 0 0-.032.027C2.533 9.046 1.7 13.58 2.1 18.057a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.105 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.075.075 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.075.075 0 0 1 .079.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/starknet-io",
    label: "Starknet GitHub",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.86 3.15 8.98 7.52 10.43.55.1.75-.24.75-.53 0-.26-.01-.95-.02-1.87-3.06.66-3.71-1.48-3.71-1.48-.5-1.27-1.22-1.61-1.22-1.61-1-.69.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.21.92.1-.71.39-1.2.7-1.47-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.92 0 0 .93-.3 3.05 1.13a10.58 10.58 0 0 1 5.55 0c2.12-1.43 3.05-1.13 3.05-1.13.6 1.52.22 2.64.11 2.92.71.77 1.13 1.75 1.13 2.95 0 4.22-2.57 5.15-5.02 5.42.4.34.76 1.02.76 2.05 0 1.48-.01 2.67-.01 3.03 0 .29.2.64.76.53A11 11 0 0 0 23 11.51C23 5.24 18.27.5 12 .5z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Starknet",
    label: "Starknet YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.48A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12C4.4 20.4 12 20.4 12 20.4s7.6 0 9.4-.48a3 3 0 0 0 2.1-2.12A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/starknet_ecosystem",
    label: "Starknet Telegram",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M21.94 4.3 18.7 19.55c-.24 1.08-.88 1.34-1.78.83l-4.92-3.63-2.37 2.28c-.26.26-.48.48-.99.48l.35-5.02 9.13-8.25c.4-.35-.09-.55-.62-.2L6.21 13.2 1.35 11.68c-1.06-.33-1.08-1.06.22-1.57L20.57 2.8c.88-.33 1.65.2 1.37 1.5z" />
      </svg>
    ),
  },
];

type FooterItem = {
  label: string;
  href?: string;
  external?: boolean;
};

type FooterColumn = {
  title: string;
  items: FooterItem[];
};

const COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    items: [
      { label: "Features", href: "/#features" },
      { label: "Security", href: "/#security" },
      { label: "Compare", href: "/#compare" },
      { label: "Documentation", href: "/#developers" },
      { label: "Download", href: "/#download" },
      { label: "Releases", href: "/#download" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Audits", href: "/audits" },
      { label: "Changelog", href: "/changelog" },
      { label: "Brand guidelines", href: "/brand-guidelines" },
    ],
  },
  {
    title: "Project",
    items: [
      { label: "Ecosystem", href: "/#ecosystem" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];




function FooterLink({ item }: { item: FooterItem }) {
  const baseCls = "inline-flex items-center gap-1 text-sm text-ink-muted transition-colors hover:text-brand";

  if (!item.href) {
    return <span className="text-sm text-ink-muted/60 cursor-default">{item.label}</span>;
  }

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={baseCls}>
        {item.label}
        <span aria-hidden="true" className="text-[0.7em] opacity-70">↗</span>
      </a>
    );
  }

  // Internal hash anchor on home
  if (item.href.startsWith("/#")) {
    const hash = item.href.slice(2);
    return (
      <Link to="/" hash={hash} className={baseCls}>
        {item.label}
      </Link>
    );
  }


  return (
    <a href={item.href} className={baseCls}>
      {item.label}
    </a>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="border-t border-hairline bg-surface">
      <div className="container-page py-14">
        <div className="mb-10 flex items-center gap-2.5">
          <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center">
            <img src={logoAsset.url} alt="" className="h-9 w-9 object-contain" />
          </span>
          <span className="font-bold tracking-tight text-ink">
            Starknet<span className="text-brand">Wallet</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-0 md:divide-x md:divide-hairline">
          {COLUMNS.map((col, idx) => (
            <div key={col.title} className={idx === 0 ? "md:pr-8" : "md:px-8"}>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-hairline pt-8">
          <ul className="flex flex-wrap gap-2.5">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="footer-social-icon inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-all duration-200 hover:-translate-y-px hover:border-brand hover:text-brand"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} StarknetWallet. Open source.</p>
          <div className="flex flex-col items-end gap-1 text-right">
            <p>Not affiliated with Starknet Foundation unless explicitly stated.</p>
            <p className="opacity-70">Starknet ecosystem links are provided for context.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
