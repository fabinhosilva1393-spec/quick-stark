import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Download,
  BookOpen,
  Code2,
  Globe,
  User,
  Box,
  Sparkles,
  Layers,
  ArrowRight,
  Info,
  ShieldCheck,
} from "lucide-react";

const TITLE = "Ecosystem — StarknetWallet";
const DESC =
  "StarknetWallet is designed around STRK, Cairo, Starknet Mainnet, Sepolia and smart-account workflows.";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://starknetwallet.org/ecosystem" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://starknetwallet.org/ecosystem" }],
  }),
  component: EcosystemPage,
});

// ---------- Hero orbit diagram ----------
function HeroOrbit() {
  return (
    <div className="eco-orbit" aria-hidden="true">
      <svg viewBox="0 0 720 620" className="eco-orbit__svg">
        <defs>
          <radialGradient id="eo-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#131365" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#07071D" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="eo-apricot" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#EC7B69" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#EC7B69" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="720" height="620" fill="url(#eo-glow)" />
        <rect width="720" height="620" fill="url(#eo-apricot)" />
        {/* orbits */}
        <ellipse cx="360" cy="310" rx="300" ry="200" fill="none" stroke="#A7A3B8" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="3 5" />
        <ellipse cx="360" cy="310" rx="230" ry="150" fill="none" stroke="#A7A3B8" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="3 5" />
        <ellipse cx="360" cy="310" rx="160" ry="105" fill="none" stroke="#131365" strokeOpacity="0.7" strokeWidth="1.5" />
        {/* connectors */}
        <g stroke="#EC7B69" strokeOpacity="0.7" strokeWidth="1.4" fill="none">
          <path d="M360,238 L360,138" />
          <path d="M416,282 L560,180" />
          <path d="M424,332 L588,332" />
          <path d="M416,378 L560,468" />
          <path d="M300,378 L160,468" />
          <path d="M296,332 L110,332" />
          <path d="M304,282 L160,180" />
        </g>
        {/* active dots on connectors */}
        <g fill="#EC7B69">
          <circle cx="360" cy="180" r="3" />
          <circle cx="500" cy="220" r="3" />
          <circle cx="510" cy="332" r="3" />
          <circle cx="500" cy="430" r="3" />
          <circle cx="220" cy="430" r="3" />
          <circle cx="210" cy="332" r="3" />
          <circle cx="220" cy="220" r="3" />
        </g>
        {/* central hex */}
        <g>
          <polygon
            points="360,220 452,272 452,368 360,420 268,368 268,272"
            fill="#0E0E34"
            stroke="#EC7B69"
            strokeWidth="1.8"
          />
          <polygon
            points="360,242 434,283 434,357 360,398 286,357 286,283"
            fill="#11113D"
            stroke="#25234A"
            strokeWidth="1"
          />
        </g>
      </svg>

      {/* HTML overlays: nodes with labels */}
      <div className="eco-orbit__center">
        <img src="/starknetwallet-icon.ico" alt="" className="eco-orbit__brand" />
        <span className="eco-orbit__brand-label">StarknetWallet</span>
      </div>

      <OrbitNode style={{ top: "10%", left: "50%" }} label="Cairo" icon={<Code2 size={18} />} />
      <OrbitNode style={{ top: "24%", left: "18%" }} label="STRK" icon={<Sparkles size={18} />} labelSide="left" />
      <OrbitNode style={{ top: "24%", right: "16%" }} label="Mainnet" icon={<Globe size={18} />} labelSide="right" />
      <OrbitNode style={{ top: "72%", left: "18%" }} label="Sepolia" icon={<Box size={18} />} labelSide="left" />
      <OrbitNode
        style={{ top: "72%", right: "10%" }}
        label="Smart accounts"
        icon={<User size={18} />}
        labelSide="right"
      />
      <div className="eco-orbit__caption">
        <Layers size={14} aria-hidden="true" />
        <span>Account abstraction</span>
      </div>
    </div>
  );
}

function OrbitNode({
  style,
  label,
  icon,
  labelSide = "below",
}: {
  style: React.CSSProperties;
  label: string;
  icon: React.ReactNode;
  labelSide?: "below" | "left" | "right";
}) {
  return (
    <div className="eco-node" style={style}>
      <span className="eco-node__ring">{icon}</span>
      <span className={`eco-node__label eco-node__label--${labelSide}`}>{label}</span>
    </div>
  );
}

// ---------- "How the ecosystem fits together" diagram ----------
function FitDiagram() {
  return (
    <div className="fit-diagram" aria-hidden="true">
      <svg viewBox="0 0 560 320" className="fit-diagram__svg">
        {/* Smart accounts branch up */}
        <path
          d="M170,160 L170,80 L300,80"
          fill="none"
          stroke="#EC7B69"
          strokeOpacity="0.7"
          strokeWidth="1.4"
          strokeDasharray="3 5"
        />
        {/* main horizontal */}
        <path d="M100,160 L500,160" fill="none" stroke="#EC7B69" strokeOpacity="0.8" strokeWidth="1.6" />
        {/* STRK branch down */}
        <path
          d="M170,160 L170,240 L240,240"
          fill="none"
          stroke="#EC7B69"
          strokeOpacity="0.7"
          strokeWidth="1.4"
          strokeDasharray="3 5"
        />
        {/* dots */}
        <g fill="#EC7B69">
          <circle cx="170" cy="160" r="3.5" />
          <circle cx="300" cy="160" r="3.5" />
          <circle cx="380" cy="160" r="3.5" />
          <circle cx="460" cy="160" r="3.5" />
        </g>
      </svg>

      <FitNode style={{ top: "34%", left: "6%" }} label="Cairo" sub="Smart contract language" icon={<Code2 size={16} />} />
      <FitNode
        style={{ top: "34%", left: "28%" }}
        label="Starknet"
        sub="Validity-rollup secured by Ethereum"
        icon={<Sparkles size={16} />}
        big
      />
      <FitNode style={{ top: "34%", left: "54%" }} label="Mainnet" sub="Production network" icon={<Globe size={16} />} />
      <FitNode style={{ top: "34%", left: "76%" }} label="Sepolia" sub="Test network for development" icon={<Box size={16} />} />
      <FitNode
        style={{ top: "4%", left: "48%" }}
        label="Smart accounts"
        sub="Programmable accounts with validation logic"
        icon={<User size={16} />}
      />
      <FitNode
        style={{ top: "66%", left: "34%" }}
        label="STRK"
        sub="Native token used across the network"
        icon={<Sparkles size={16} />}
      />
    </div>
  );
}

function FitNode({
  style,
  label,
  sub,
  icon,
  big = false,
}: {
  style: React.CSSProperties;
  label: string;
  sub: string;
  icon: React.ReactNode;
  big?: boolean;
}) {
  return (
    <div className={`fit-node ${big ? "fit-node--big" : ""}`} style={style}>
      <span className="fit-node__mark">{icon}</span>
      <span className="fit-node__label">{label}</span>
      <span className="fit-node__sub">{sub}</span>
    </div>
  );
}

// ---------- Data ----------
const FIT_ITEMS_A = [
  { icon: <Sparkles size={18} />, title: "Starknet", body: "Validity-rollup network secured by Ethereum." },
  { icon: <Code2 size={18} />, title: "Cairo", body: "The programming language used to write Starknet contracts." },
  { icon: <Sparkles size={18} />, title: "STRK", body: "The native token that powers the Starknet ecosystem." },
  { icon: <Globe size={18} />, title: "Mainnet", body: "The production network where real assets live." },
];
const FIT_ITEMS_B = [
  { icon: <Box size={18} />, title: "Sepolia", body: "The testnet used for development and testing." },
  { icon: <User size={18} />, title: "Smart accounts", body: "Programmable accounts with custom validation logic." },
  { icon: <Layers size={18} />, title: "Account abstraction", body: "The account model that enables programmable account behavior." },
];

const REFS = [
  { name: "Starknet", icon: <Sparkles size={20} /> },
  { name: "Cairo", icon: <Code2 size={20} /> },
  { name: "STRK", icon: <Sparkles size={20} /> },
  { name: "Argent", icon: <ShieldCheck size={20} /> },
  { name: "Braavos", icon: <Box size={20} /> },
  { name: "Ekubo", icon: <Layers size={20} /> },
  { name: "Nostra", icon: <Globe size={20} /> },
  { name: "JediSwap", icon: <Sparkles size={20} /> },
];

const CAPABILITIES = [
  {
    title: "STRK management",
    body: "View balances and send STRK with a clear, desktop-grade signing surface.",
    illustration: true,
  },
  {
    title: "Smart-account permission review",
    body: "Inspect session keys, scopes, and spending approvals before signing.",
    illustration: true,
  },
  { title: "Cairo call preview", body: "Decoded calldata and target contract context before you approve." },
  { title: "Mainnet / Sepolia clarity", body: "The active network is visible on every signing screen." },
  { title: "dApp transaction review", body: "Larger review surface for contract, calldata, network, and fee." },
  { title: "Signed desktop builds", body: "Every maintained build ships with SHA256 checksums and PGP signatures." },
];

// ---------- Page ----------
function EcosystemPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background eco-page">
      <Header />
      <main id="main" className="flex-1">
        {/* HERO */}
        <section className="eco-hero">
          <div className="eco-hero__container">
            <div className="eco-hero__grid">
              <div className="eco-hero__content">
                <span className="eco-hero__eyebrow">
                  <span className="eco-hero__dot" /> ECOSYSTEM
                </span>
                <h1 className="eco-hero__title">
                  Built for the<br />
                  <span>Starknet</span> ecosystem.
                </h1>
                <p className="eco-hero__desc">
                  StarknetWallet is designed around STRK, Cairo, Starknet Mainnet,
                  Sepolia, and smart-account workflows.
                </p>
                <div className="eco-hero__actions">
                  <a href="#ecosystem-content" className="eco-btn eco-btn--primary">
                    <Download size={16} aria-hidden="true" />
                    Explore the ecosystem
                  </a>
                  <Link to="/docs" className="eco-btn eco-btn--ghost">
                    <BookOpen size={16} aria-hidden="true" />
                    Read the docs
                  </Link>
                </div>
              </div>
              <div className="eco-hero__visual">
                <HeroOrbit />
                <p className="eco-hero__disclaimer">
                  Ecosystem context —<br />not an affiliation map.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — How it fits together (bordered panel) */}
        <section id="ecosystem-content" className="eco-section">
          <div className="eco-container">
            <div className="eco-panel">
              <div className="eco-fit__grid">
                <div className="eco-fit__intro">
                  <h2 className="eco-h2">How the ecosystem fits together.</h2>
                  <p className="eco-p">
                    A concise view of the network, language, token and account
                    model that shape the StarknetWallet experience.
                  </p>
                  <div className="eco-fit__diagram-wrap">
                    <FitDiagram />
                  </div>
                </div>
                <ul className="eco-fit__list">
                  {FIT_ITEMS_A.map((f) => (
                    <li key={f.title} className="eco-fit__item">
                      <span className="eco-fit__icon">{f.icon}</span>
                      <div>
                        <h3 className="eco-fit__title">{f.title}</h3>
                        <p className="eco-fit__body">{f.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <ul className="eco-fit__list">
                  {FIT_ITEMS_B.map((f) => (
                    <li key={f.title} className="eco-fit__item">
                      <span className="eco-fit__icon">{f.icon}</span>
                      <div>
                        <h3 className="eco-fit__title">{f.title}</h3>
                        <p className="eco-fit__body">{f.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — three-column card row */}
        <section className="eco-section eco-section--tight">
          <div className="eco-container">
            <div className="eco-row3">
              {/* Card 1 — references */}
              <div className="eco-panel eco-card-refs">
                <h2 className="eco-h2 eco-h2--sm">Ecosystem references.</h2>
                <p className="eco-p eco-p--sm">
                  Names used throughout Starknet documentation and wallet workflows.
                </p>
                <ul className="eco-ref-grid">
                  {REFS.map((r) => (
                    <li key={r.name} className="eco-ref">
                      <span className="eco-ref__icon">{r.icon}</span>
                      <span className="eco-ref__name">{r.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="eco-note">
                  <Info size={14} aria-hidden="true" />
                  <p>
                    Ecosystem names are shown for context only. StarknetWallet is
                    not affiliated with Starknet Foundation or these projects
                    unless explicitly stated.
                  </p>
                </div>
              </div>

              {/* Card 2 — capabilities */}
              <div className="eco-panel eco-card-caps">
                <h2 className="eco-h2 eco-h2--sm">Starknet-native capabilities.</h2>
                <div className="eco-caps-grid">
                  {CAPABILITIES.map((c) => (
                    <article key={c.title} className={`eco-cap ${c.illustration ? "eco-cap--illus" : ""}`}>
                      {c.illustration && (
                        <div className="eco-cap__illus" aria-hidden="true">
                          <span className="eco-cap__cube" />
                        </div>
                      )}
                      <h3 className="eco-cap__title">{c.title}</h3>
                      <p className="eco-cap__body">{c.body}</p>
                      <ArrowRight size={16} className="eco-cap__arrow" aria-hidden="true" />
                    </article>
                  ))}
                </div>
              </div>

              {/* Card 3 — download */}
              <div className="eco-panel eco-card-dl">
                <h2 className="eco-h2 eco-h2--sm">
                  Try StarknetWallet<br />on your desktop.
                </h2>
                <div className="eco-dl__visual" aria-hidden="true">
                  <div className="eco-dl__window">
                    <span className="eco-dl__dot" />
                    <span className="eco-dl__dot" />
                    <span className="eco-dl__dot" />
                    <img src="/starknetwallet-icon.ico" alt="" className="eco-dl__mark" />
                  </div>
                  <ul className="eco-dl__oslist">
                    <li>▦ Windows</li>
                    <li>◐ macOS</li>
                    <li>◮ Linux</li>
                  </ul>
                  <span className="eco-dl__check">✓</span>
                </div>
                <div className="eco-dl__actions">
                  <Link to="/" hash="download" className="eco-btn eco-btn--primary">
                    <Download size={16} aria-hidden="true" />
                    Download
                  </Link>
                  <Link to="/docs" className="eco-btn eco-btn--ghost">
                    <BookOpen size={16} aria-hidden="true" />
                    Read the docs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
