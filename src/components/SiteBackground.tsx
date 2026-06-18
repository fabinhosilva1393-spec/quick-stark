/**
 * Site-wide decorative background — Starknet themed.
 * Layered STARK-proof inspired visuals: a recursive trace grid, slow
 * orange/indigo brand glows, and a sparse field of "proof nodes" connected
 * by faint Cairo-inspired hex traces. Pointer-events: none; sits behind
 * content; respects prefers-reduced-motion via CSS.
 */
export function SiteBackground() {
  return (
    <div className="site-bg" aria-hidden="true">
      {/* Recursive trace grid (STARK AIR columns) */}
      <div className="stark-bg-grid" />
      <div className="stark-bg-grid stark-bg-grid--fine" />

      {/* Brand glows */}
      <span className="stark-bg-glow stark-bg-glow--orange" />
      <span className="stark-bg-glow stark-bg-glow--indigo" />
      <span className="stark-bg-glow stark-bg-glow--deep" />

      {/* Vertical execution traces (Cairo) */}
      <div className="stark-traces">
        <span className="stark-trace stark-trace--1" />
        <span className="stark-trace stark-trace--2" />
        <span className="stark-trace stark-trace--3" />
        <span className="stark-trace stark-trace--4" />
        <span className="stark-trace stark-trace--5" />
      </div>

      {/* Proof nodes + connective hex paths */}
      <svg
        className="stark-bg-svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="stark-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EC6A26" stopOpacity="0" />
            <stop offset="50%" stopColor="#EC6A26" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#6E62E6" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="stark-node" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#EC6A26" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#EC6A26" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#EC6A26" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="stark-node-indigo" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#6E62E6" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#6E62E6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6E62E6" stopOpacity="0" />
          </radialGradient>
          <symbol id="stark-hex" viewBox="-12 -12 24 24">
            <polygon
              points="10,0 5,8.66 -5,8.66 -10,0 -5,-8.66 5,-8.66"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </symbol>
        </defs>

        {/* Connective edges */}
        <g stroke="url(#stark-edge)" strokeWidth="1" fill="none" className="stark-edges">
          <path d="M 80 120 L 360 220 L 620 140 L 920 260" />
          <path d="M 140 540 L 420 480 L 700 600 L 1040 520" />
          <path d="M 240 320 L 240 560" />
          <path d="M 820 100 L 820 380" />
        </g>

        {/* Proof nodes (orange + indigo) */}
        <g className="stark-nodes">
          <circle cx="80" cy="120" r="28" fill="url(#stark-node)" />
          <circle cx="360" cy="220" r="36" fill="url(#stark-node)" />
          <circle cx="620" cy="140" r="24" fill="url(#stark-node-indigo)" />
          <circle cx="920" cy="260" r="40" fill="url(#stark-node)" />
          <circle cx="140" cy="540" r="30" fill="url(#stark-node-indigo)" />
          <circle cx="420" cy="480" r="22" fill="url(#stark-node)" />
          <circle cx="700" cy="600" r="34" fill="url(#stark-node-indigo)" />
          <circle cx="1040" cy="520" r="26" fill="url(#stark-node)" />
        </g>

        {/* Cairo hexes — Starknet geometric motif */}
        <g className="stark-hexes" color="#EC6A26">
          <use href="#stark-hex" x="180" y="110" />
          <use href="#stark-hex" x="540" y="260" transform="scale(1.6) translate(-200 -100)" />
          <use href="#stark-hex" x="880" y="160" />
          <use href="#stark-hex" x="300" y="640" transform="scale(1.3) translate(-70 -150)" />
          <use href="#stark-hex" x="980" y="640" />
        </g>
        <g className="stark-hexes stark-hexes--indigo" color="#6E62E6">
          <use href="#stark-hex" x="460" y="80" />
          <use href="#stark-hex" x="760" y="460" transform="scale(1.4) translate(-220 -130)" />
          <use href="#stark-hex" x="120" y="380" />
        </g>
      </svg>

      {/* Verification scanline */}
      <span className="stark-scanline" />
    </div>
  );
}
