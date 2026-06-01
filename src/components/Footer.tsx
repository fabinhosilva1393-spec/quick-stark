import { Link } from "@tanstack/react-router";
import { Github, Youtube, Send, MessageCircle, Twitter, Users } from "lucide-react";
import { GITHUB_REPO_URL } from "@/data/downloads";
import logoAsset from "@/assets/starknet-logomark.png.asset.json";

const socials = [
  { label: "X (Twitter)", href: "https://twitter.com/Starknet", Icon: Twitter },
  { label: "Discord", href: "https://discord.com/invite/starknet-community", Icon: MessageCircle },
  { label: "GitHub", href: "https://github.com/keep-starknet-strange/awesome-starknet", Icon: Github },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCnDWguR8mE2oDBsjhQkgbvg", Icon: Youtube },
  { label: "Telegram", href: "https://t.me/starknet_ecosystem", Icon: Send },
  { label: "Community Forum", href: "https://community.starknet.io/", Icon: Users },
];

export function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
      />
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center">
                <img src={logoAsset.url} alt="" className="h-9 w-9 object-contain" />
              </span>
              <span className="font-bold tracking-tight text-ink">
                Starknet<span className="text-brand">Wallet</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-ink-muted max-w-sm leading-relaxed">
              Desktop wallet for Starknet.
            </p>
            <p className="mt-2 text-xs text-ink-muted max-w-sm leading-relaxed">
              Open source · Signed releases · Local-first keys
            </p>

            {/* Socials */}
            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                Official Starknet ecosystem / community links
              </p>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-all duration-200 hover:-translate-y-px hover:border-brand hover:text-brand hover:shadow-[0_0_18px_-4px_color-mix(in_oklab,var(--brand)_55%,transparent)]"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columns */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted">Product</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/download" className="text-ink hover:text-brand">Download</Link></li>
              <li><Link to="/" hash="demo" className="text-ink hover:text-brand">Demo</Link></li>
              <li><Link to="/" hash="features" className="text-ink hover:text-brand">Features</Link></li>
              <li><Link to="/" hash="developers" className="text-ink hover:text-brand">Developers</Link></li>
              <li><Link to="/" hash="faq" className="text-ink hover:text-brand">FAQ</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted">Security</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/download" hash="verify" className="text-ink hover:text-brand">Verify releases</Link></li>
              <li><Link to="/download" hash="verify" className="text-ink hover:text-brand">SHA256 checksums</Link></li>
              <li><Link to="/download" hash="verify" className="text-ink hover:text-brand">PGP signatures</Link></li>
              <li><Link to="/" hash="security" className="text-ink hover:text-brand">Local-first keys</Link></li>
              <li><Link to="/" hash="security" className="text-ink hover:text-brand">No telemetry</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted">Starknet</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="https://www.starknet.io/" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-brand">Starknet</a></li>
              <li><a href="https://www.cairo-lang.org/" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-brand">Cairo</a></li>
              <li><a href="https://www.starknet.io/strk/" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-brand">STRK</a></li>
              <li><a href="https://status.starknet.io/" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-brand">Status</a></li>
              <li><a href="https://community.starknet.io/" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-brand">Community Forum</a></li>
              <li><a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-brand">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} StarknetWallet. Open source.</p>
          <div className="space-y-1 md:text-right">
            <p>Not affiliated with Starknet Foundation unless explicitly stated.</p>
            <p>Starknet ecosystem names and community links are provided for context.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
