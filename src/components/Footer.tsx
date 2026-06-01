import { Link } from "@tanstack/react-router";
import { GITHUB_REPO_URL, GITHUB_RELEASES_URL } from "@/data/downloads";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  background:
                    "conic-gradient(from 210deg, #EC796B, #A9A7FF, #C99ABF, #EC796B)",
                }}
              >
                <span className="h-3 w-3 rounded-sm bg-background" />
              </span>
              <span className="font-bold tracking-tight text-white">StarknetWallet</span>
            </div>
            <p className="mt-4 text-sm text-white/55 max-w-sm leading-relaxed">
              A desktop wallet for Starknet. Manage STRK, preview Cairo calls,
              review smart-account permissions, and sign on macOS, Windows, and Linux.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">
              Product
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/download" className="text-white/75 hover:text-white">Download</Link></li>
              <li><Link to="/" hash="features" className="text-white/75 hover:text-white">Features</Link></li>
              <li><Link to="/" hash="security" className="text-white/75 hover:text-white">Security</Link></li>
              <li><Link to="/" hash="developers" className="text-white/75 hover:text-white">Developers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">
              Resources
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-white">
                  GitHub
                </a>
              </li>
              <li>
                <a href={GITHUB_RELEASES_URL} target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-white">
                  Releases
                </a>
              </li>
              <li><Link to="/" hash="faq" className="text-white/75 hover:text-white">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-white/50">
          <p>© {new Date().getFullYear()} StarknetWallet. Open source.</p>
          <p>Not affiliated with Starknet Foundation unless explicitly stated.</p>
        </div>
      </div>
    </footer>
  );
}
