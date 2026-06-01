import { Link } from "@tanstack/react-router";
import { GITHUB_REPO_URL } from "@/data/downloads";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2.5l2.4 6.6 6.6 2.4-6.6 2.4L12 20.5 9.6 13.9 3 11.5l6.6-2.4L12 2.5z" fill="currentColor" />
                </svg>
              </span>
              <span className="font-bold tracking-tight text-ink">
                Starknet<span className="text-brand">Wallet</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-ink-muted max-w-sm leading-relaxed">
              A local-first desktop wallet for Starknet. Manage STRK, preview
              Cairo calls, and review smart-account permissions on macOS,
              Windows, and Linux.
            </p>
            <p className="mt-4 text-xs text-ink-muted max-w-sm leading-relaxed">
              Independent project. Not affiliated with the Starknet Foundation,
              StarkWare, or any other entity unless explicitly stated.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              Product
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/download" className="text-ink hover:text-brand">Download</Link></li>
              <li><Link to="/" hash="features" className="text-ink hover:text-brand">Features</Link></li>
              <li><Link to="/" hash="security" className="text-ink hover:text-brand">Security</Link></li>
              <li><Link to="/" hash="developers" className="text-ink hover:text-brand">Developers</Link></li>
              <li><Link to="/" hash="faq" className="text-ink hover:text-brand">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              Resources
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-brand"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link to="/download" hash="verify" className="text-ink hover:text-brand">
                  Verify a release
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} StarknetWallet. Open source.</p>
          <p>Not affiliated with the Starknet Foundation unless explicitly stated.</p>
        </div>
      </div>
    </footer>
  );
}
