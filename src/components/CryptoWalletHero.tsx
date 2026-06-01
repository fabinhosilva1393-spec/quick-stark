/**
 * CryptoWalletHero
 * ----------------
 * Transparent-background animated isometric Web3 wallet illustration.
 *
 * - Pure SVG + CSS animations (no canvas, no video, no JS animation loop)
 * - 4:3 aspect ratio, responsive, centered
 * - Seamless ~6s loop: wallet float, coin spin, banknote stream,
 *   pulsing particles, glowing circuit nodes, subtle parallax
 * - No background of any kind — drop on any surface
 *
 * Usage:
 *   <CryptoWalletHero className="w-full max-w-[620px]" />
 */
export function CryptoWalletHero({ className = "" }: { className?: string }) {
  return (
    <div
      className={`cwh-root ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <style>{CSS}</style>
      <svg
        viewBox="0 0 800 600"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="cwh-svg"
      >
        <defs>
          {/* gradients */}
          <linearGradient id="cwh-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a1230" />
            <stop offset="55%" stopColor="#0b1838" />
            <stop offset="100%" stopColor="#060a1c" />
          </linearGradient>
          <linearGradient id="cwh-body-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1330" />
            <stop offset="100%" stopColor="#030616" />
          </linearGradient>
          <linearGradient id="cwh-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3da9ff" />
            <stop offset="100%" stopColor="#7a5cff" />
          </linearGradient>
          <linearGradient id="cwh-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0e1c44" />
            <stop offset="100%" stopColor="#0a1230" />
          </linearGradient>
          <linearGradient id="cwh-note" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7ef0c4" />
            <stop offset="100%" stopColor="#3da9ff" />
          </linearGradient>
          <linearGradient id="cwh-note-2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a6f3d2" />
            <stop offset="100%" stopColor="#62d2ff" />
          </linearGradient>
          <radialGradient id="cwh-coin" cx="0.35" cy="0.35" r="0.75">
            <stop offset="0%" stopColor="#bff7dd" />
            <stop offset="55%" stopColor="#3ee7a4" />
            <stop offset="100%" stopColor="#1a8a66" />
          </radialGradient>
          <radialGradient id="cwh-coin-side" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0%" stopColor="#2bb583" />
            <stop offset="100%" stopColor="#0e4a36" />
          </radialGradient>
          <radialGradient id="cwh-pink-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#ff7ad9" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ff7ad9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cwh-blue-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#3da9ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3da9ff" stopOpacity="0" />
          </radialGradient>

          {/* dotted pattern */}
          <pattern
            id="cwh-dots"
            x="0"
            y="0"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.2" cy="1.2" r="1.1" fill="#3da9ff" fillOpacity="0.32" />
          </pattern>

          {/* one banknote symbol, reused */}
          <symbol id="cwh-note" viewBox="0 0 140 78">
            <rect
              x="2"
              y="2"
              width="136"
              height="74"
              rx="10"
              fill="url(#cwh-note)"
              stroke="#0a1230"
              strokeWidth="2"
            />
            <rect
              x="10"
              y="10"
              width="120"
              height="58"
              rx="6"
              fill="none"
              stroke="#0a1230"
              strokeOpacity="0.35"
              strokeWidth="1.4"
              strokeDasharray="3 4"
            />
            <circle cx="70" cy="39" r="14" fill="#0a1230" fillOpacity="0.18" />
            <text
              x="70"
              y="44"
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
              fontSize="16"
              fontWeight="800"
              fill="#0a1230"
            >
              $
            </text>
          </symbol>

          {/* coin symbol with engraved +100K */}
          <symbol id="cwh-coin" viewBox="-60 -60 120 120">
            <ellipse cx="0" cy="6" rx="50" ry="14" fill="url(#cwh-coin-side)" />
            <rect x="-50" y="-2" width="100" height="10" fill="#0e4a36" />
            <ellipse cx="0" cy="-2" rx="50" ry="14" fill="url(#cwh-coin)" />
            <ellipse
              cx="0"
              cy="-2"
              rx="50"
              ry="14"
              fill="none"
              stroke="#0a1230"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
            <ellipse
              cx="0"
              cy="-2"
              rx="38"
              ry="10"
              fill="none"
              stroke="#0a1230"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            <text
              x="0"
              y="2"
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
              fontSize="11"
              fontWeight="800"
              fill="#0a1230"
              fillOpacity="0.85"
            >
              +100K
            </text>
          </symbol>
        </defs>

        {/* === decorative HUD layer (back) === */}
        <g className="cwh-parallax-back">
          {/* large faint dotted square */}
          <rect
            x="120"
            y="120"
            width="220"
            height="220"
            fill="url(#cwh-dots)"
            opacity="0.55"
            transform="rotate(-15 230 230)"
          />
          {/* thin wireframe circles */}
          <circle
            cx="640"
            cy="170"
            r="80"
            fill="none"
            stroke="#3da9ff"
            strokeOpacity="0.35"
            strokeWidth="1"
            strokeDasharray="2 6"
            className="cwh-rot-slow"
            style={{ transformOrigin: "640px 170px" }}
          />
          <circle
            cx="640"
            cy="170"
            r="54"
            fill="none"
            stroke="#7ef0c4"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <circle
            cx="160"
            cy="470"
            r="62"
            fill="none"
            stroke="#7a5cff"
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeDasharray="3 5"
            className="cwh-rot-rev"
            style={{ transformOrigin: "160px 470px" }}
          />

          {/* circuit lines */}
          <g
            stroke="#3da9ff"
            strokeOpacity="0.5"
            strokeWidth="1"
            fill="none"
          >
            <path d="M60 360 H180 L210 330 H300" />
            <path d="M740 420 H600 L570 450 H470" />
            <path d="M520 90 H600 L630 120 H700" />
          </g>
          {/* glowing nodes */}
          <circle cx="60" cy="360" r="3" fill="#7ef0c4" className="cwh-node n1" />
          <circle cx="210" cy="330" r="3" fill="#3da9ff" className="cwh-node n2" />
          <circle cx="740" cy="420" r="3" fill="#ff7ad9" className="cwh-node n3" />
          <circle cx="570" cy="450" r="3" fill="#7ef0c4" className="cwh-node n4" />
          <circle cx="700" cy="120" r="3" fill="#3da9ff" className="cwh-node n5" />

          {/* soft color glows */}
          <circle cx="180" cy="200" r="120" fill="url(#cwh-blue-glow)" />
          <circle cx="640" cy="440" r="140" fill="url(#cwh-pink-glow)" />
        </g>

        {/* === main floating scene === */}
        <g className="cwh-float">
          {/* contact shadow */}
          <ellipse
            cx="400"
            cy="500"
            rx="200"
            ry="20"
            fill="#0a1230"
            opacity="0.28"
            className="cwh-shadow"
          />

          {/* coins under wallet (isometric base) */}
          <g className="cwh-coins">
            <g transform="translate(260 470)" className="cwh-coin cwh-coin-a">
              <use href="#cwh-coin" width="120" height="120" x="-60" y="-60" />
            </g>
            <g transform="translate(540 480)" className="cwh-coin cwh-coin-b">
              <use href="#cwh-coin" width="96" height="96" x="-48" y="-48" />
            </g>
            <g transform="translate(410 510)" className="cwh-coin cwh-coin-c">
              <use href="#cwh-coin" width="80" height="80" x="-40" y="-40" />
            </g>
          </g>

          {/* === isometric wallet === */}
          {/* Built with parallelograms to fake 30° iso projection */}
          <g transform="translate(400 300)">
            {/* outer glow edge */}
            <g className="cwh-edge-glow">
              <polygon
                points="-180,-30 0,-120 180,-30 0,60"
                fill="none"
                stroke="url(#cwh-edge)"
                strokeWidth="3"
                strokeLinejoin="round"
                opacity="0.85"
              />
            </g>

            {/* left side face */}
            <polygon
              points="-180,-30 0,60 0,140 -180,50"
              fill="url(#cwh-body-side)"
              stroke="#3da9ff"
              strokeOpacity="0.55"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* right side face */}
            <polygon
              points="180,-30 0,60 0,140 180,50"
              fill="#070d22"
              stroke="#7a5cff"
              strokeOpacity="0.55"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* top face */}
            <polygon
              points="-180,-30 0,-120 180,-30 0,60"
              fill="url(#cwh-body)"
              stroke="#3da9ff"
              strokeOpacity="0.85"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* top "screen" inset */}
            <polygon
              points="-120,-30 0,-90 120,-30 0,30"
              fill="url(#cwh-screen)"
              stroke="#7ef0c4"
              strokeOpacity="0.55"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            {/* mint highlight bar on screen */}
            <polygon
              points="-70,-40 0,-75 70,-40 0,-5"
              fill="none"
              stroke="#7ef0c4"
              strokeOpacity="0.75"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <circle cx="0" cy="-30" r="6" fill="#7ef0c4" className="cwh-pulse" />

            {/* front lip highlight (mint) */}
            <polyline
              points="-180,-30 0,60 180,-30"
              fill="none"
              stroke="#7ef0c4"
              strokeOpacity="0.65"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* slot on top where notes come out */}
            <polygon
              points="-40,-55 40,-55 30,-40 -30,-40"
              fill="#03060f"
              stroke="#3da9ff"
              strokeOpacity="0.9"
              strokeWidth="1"
            />

            {/* === banknote stream (rises out of slot, drifts up-right) === */}
            <g className="cwh-notes">
              <g className="cwh-note-fly nf1">
                <use href="#cwh-note" x="-70" y="-180" width="140" height="78" />
              </g>
              <g className="cwh-note-fly nf2">
                <use href="#cwh-note" x="-70" y="-180" width="140" height="78" />
              </g>
              <g className="cwh-note-fly nf3">
                <use href="#cwh-note" x="-70" y="-180" width="140" height="78" />
              </g>
              <g className="cwh-note-fly nf4">
                <use href="#cwh-note" x="-70" y="-180" width="140" height="78" />
              </g>
            </g>
          </g>
        </g>

        {/* === floating particles (front) === */}
        <g className="cwh-parallax-front">
          <circle cx="120" cy="260" r="3" fill="#7ef0c4" className="cwh-particle p1" />
          <circle cx="700" cy="300" r="2.5" fill="#3da9ff" className="cwh-particle p2" />
          <circle cx="560" cy="140" r="2" fill="#ff7ad9" className="cwh-particle p3" />
          <circle cx="240" cy="540" r="2.5" fill="#7ef0c4" className="cwh-particle p4" />
          <circle cx="660" cy="520" r="2" fill="#3da9ff" className="cwh-particle p5" />
          <circle cx="100" cy="120" r="2" fill="#7a5cff" className="cwh-particle p6" />
        </g>
      </svg>
    </div>
  );
}

const CSS = `
.cwh-root {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: transparent;
  overflow: visible;
  display: block;
}
.cwh-svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* main float */
.cwh-float {
  transform-origin: 400px 300px;
  animation: cwh-float 5.4s ease-in-out infinite;
  will-change: transform;
}
@keyframes cwh-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-14px); }
}

/* contact shadow scales with float */
.cwh-shadow {
  transform-origin: 400px 500px;
  animation: cwh-shadow 5.4s ease-in-out infinite;
}
@keyframes cwh-shadow {
  0%, 100% { transform: scale(1); opacity: 0.28; }
  50%      { transform: scale(0.86); opacity: 0.18; }
}

/* edge glow pulse */
.cwh-edge-glow {
  filter: drop-shadow(0 0 6px rgba(61,169,255,0.55));
  animation: cwh-edge 4.4s ease-in-out infinite;
}
@keyframes cwh-edge {
  0%, 100% { filter: drop-shadow(0 0 5px rgba(61,169,255,0.45)); }
  50%      { filter: drop-shadow(0 0 12px rgba(122,92,255,0.65)); }
}

/* screen status pulse */
.cwh-pulse {
  transform-origin: center;
  animation: cwh-pulse 2.2s ease-in-out infinite;
  filter: drop-shadow(0 0 6px rgba(126,240,196,0.85));
}
@keyframes cwh-pulse {
  0%, 100% { opacity: 0.85; r: 5; }
  50%      { opacity: 1;    r: 7; }
}

/* coins: subtle isometric spin via scaleX */
.cwh-coin { transform-origin: center; }
.cwh-coin-a { animation: cwh-spin 4.8s ease-in-out infinite; }
.cwh-coin-b { animation: cwh-spin 5.6s ease-in-out infinite -1.2s; }
.cwh-coin-c { animation: cwh-spin 6.2s ease-in-out infinite -0.6s; }
@keyframes cwh-spin {
  0%, 100% { transform: scaleX(1); }
  50%      { transform: scaleX(-1); }
}

/* banknote stream — each note rises from the slot and fades */
.cwh-note-fly {
  transform-origin: 0 -140px;
  opacity: 0;
  animation: cwh-note 5s linear infinite;
  filter: drop-shadow(0 6px 10px rgba(61,169,255,0.25));
}
.cwh-note-fly.nf1 { animation-delay: 0s; }
.cwh-note-fly.nf2 { animation-delay: 1.25s; }
.cwh-note-fly.nf3 { animation-delay: 2.5s; }
.cwh-note-fly.nf4 { animation-delay: 3.75s; }
@keyframes cwh-note {
  0%   { transform: translate(0, 50px) rotate(-6deg) scale(0.7); opacity: 0; }
  15%  { opacity: 1; }
  60%  { transform: translate(80px, -70px) rotate(8deg) scale(1); opacity: 1; }
  100% { transform: translate(180px, -180px) rotate(18deg) scale(1.05); opacity: 0; }
}

/* glowing circuit nodes */
.cwh-node {
  filter: drop-shadow(0 0 4px currentColor);
  animation: cwh-node 2.6s ease-in-out infinite;
}
.cwh-node.n1 { animation-delay: 0s; }
.cwh-node.n2 { animation-delay: 0.4s; }
.cwh-node.n3 { animation-delay: 0.9s; }
.cwh-node.n4 { animation-delay: 1.4s; }
.cwh-node.n5 { animation-delay: 1.9s; }
@keyframes cwh-node {
  0%, 100% { opacity: 0.35; }
  50%      { opacity: 1; }
}

/* floating particles */
.cwh-particle {
  animation: cwh-particle 4.5s ease-in-out infinite;
}
.cwh-particle.p1 { animation-delay: 0s; }
.cwh-particle.p2 { animation-delay: 0.6s; }
.cwh-particle.p3 { animation-delay: 1.2s; }
.cwh-particle.p4 { animation-delay: 1.8s; }
.cwh-particle.p5 { animation-delay: 2.4s; }
.cwh-particle.p6 { animation-delay: 3.0s; }
@keyframes cwh-particle {
  0%, 100% { opacity: 0.35; transform: translateY(0); }
  50%      { opacity: 1;    transform: translateY(-6px); }
}

/* subtle isometric parallax (depth) */
.cwh-parallax-back  { animation: cwh-par-back  7s ease-in-out infinite; transform-origin: center; }
.cwh-parallax-front { animation: cwh-par-front 6s ease-in-out infinite; transform-origin: center; }
@keyframes cwh-par-back {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(4px, -4px); }
}
@keyframes cwh-par-front {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(-6px, 4px); }
}

/* slow rotating wireframes */
.cwh-rot-slow { animation: cwh-rot 18s linear infinite; }
.cwh-rot-rev  { animation: cwh-rot 22s linear infinite reverse; }
@keyframes cwh-rot {
  to { transform: rotate(360deg); }
}

/* respect reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .cwh-float,
  .cwh-shadow,
  .cwh-edge-glow,
  .cwh-pulse,
  .cwh-coin-a, .cwh-coin-b, .cwh-coin-c,
  .cwh-note-fly,
  .cwh-node,
  .cwh-particle,
  .cwh-parallax-back, .cwh-parallax-front,
  .cwh-rot-slow, .cwh-rot-rev {
    animation: none !important;
  }
}
`;

export default CryptoWalletHero;
