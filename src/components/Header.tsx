import { Link } from "@tanstack/react-router";
import { GITHUB_REPO_URL } from "@/data/downloads";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-white/5">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="StarknetWallet home">
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background:
                "conic-gradient(from 210deg, #EC796B, #A9A7FF, #C99ABF, #EC796B)",
              boxShadow: "0 8px 24px rgba(236,121,107,0.35)",
            }}
          >
            <span className="h-3 w-3 rounded-sm bg-background" />
          </span>
          <span className="font-bold tracking-tight text-white">StarknetWallet</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm">
          <Link to="/" hash="features" className="text-white/70 hover:text-white transition-colors">
            Features
          </Link>
          <Link to="/" hash="security" className="text-white/70 hover:text-white transition-colors">
            Security
          </Link>
          <Link to="/" hash="developers" className="text-white/70 hover:text-white transition-colors">
            Developers
          </Link>
          <Link to="/" hash="faq" className="text-white/70 hover:text-white transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-sm text-white/70 hover:text-white px-3 py-2 rounded-lg transition-colors"
          >
            GitHub
          </a>
          <Link
            to="/download"
            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-brand text-brand-foreground font-semibold text-sm hover:brightness-110 transition"
          >
            Download
          </Link>
        </div>
      </div>
    </header>
  );
}
