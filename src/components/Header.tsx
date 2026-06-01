import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { GITHUB_REPO_URL } from "@/data/downloads";
import logoAsset from "@/assets/starknet-logomark.png.asset.json";
import { SiteSearch } from "./SiteSearch";

type NavItem =
  | { label: string; hash: string }
  | { label: string; to: string };

const NAV: NavItem[] = [
  { label: "Demo", hash: "demo" },
  { label: "Features", hash: "features" },
  { label: "Security", to: "/security" },
  { label: "Developers", to: "/documentation" },
  { label: "FAQ", hash: "faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/85 border-b border-hairline">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          aria-label="StarknetWallet home"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center"
          >
            <img
              src={logoAsset.url}
              alt=""
              className="h-9 w-9 object-contain"
            />
          </span>
          <span className="font-bold tracking-tight text-ink">
            Starknet<span className="text-brand">Wallet</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm">
          {NAV.map((n) =>
            "to" in n ? (
              <Link key={n.label} to={n.to} className="nav-link text-ink-muted font-medium">
                {n.label}
              </Link>
            ) : (
              <Link key={n.label} to="/" hash={n.hash} className="nav-link text-ink-muted font-medium">
                {n.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <SiteSearch />
          </div>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link hidden sm:inline-flex text-sm text-ink-muted px-3 py-2 font-medium"
          >
            GitHub
          </a>
          <Link
            to="/"
            hash="download"
            className="hidden sm:inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-brand text-brand-foreground font-semibold text-sm hover:brightness-110 transition"
          >
            <Download size={16} aria-hidden="true" />
            Download
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-hairline text-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-hairline bg-background"
        >
          <nav aria-label="Mobile" className="container-page py-4 flex flex-col gap-1">
            <div className="px-1 pb-2">
              <SiteSearch variant="mobile" />
            </div>
            {NAV.map((n) =>
              "to" in n ? (
                <Link
                  key={n.label}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded-lg text-ink hover:bg-muted font-medium"
                >
                  {n.label}
                </Link>
              ) : (
                <Link
                  key={n.label}
                  to="/"
                  hash={n.hash}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded-lg text-ink hover:bg-muted font-medium"
                >
                  {n.label}
                </Link>
              ),
            )}
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-3 rounded-lg text-ink hover:bg-muted font-medium"
              onClick={() => setOpen(false)}
            >
              GitHub
            </a>
            <Link
              to="/"
              hash="download"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-brand text-brand-foreground font-semibold"
            >
              Download
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
