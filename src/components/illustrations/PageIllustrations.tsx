/**
 * PageIllustrations
 * -----------------
 * Premium, page-specific Web3 isometric SVG illustrations matching the
 * Starknet Wallet visual system: purple/lavender dominant, deep violet
 * shadows, soft lilac highlights, subtle cyan accents, floating object
 * on a small purple platform with a radial glow, dotted particle orbit,
 * thin neon line details, transparent background.
 *
 * Each illustration accepts className and is purely decorative
 * (aria-hidden). They are unique per page.
 */

type Props = { className?: string };

const COMMON_DEFS_ID_PREFIX = "pi";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      {/* shared gradients/filters scoped per-illustration */}
      <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1a1247" />
        <stop offset="55%" stopColor="#241968" />
        <stop offset="100%" stopColor="#0c0820" />
      </linearGradient>
      <linearGradient id={`${id}-body-side`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a1247" />
        <stop offset="100%" stopColor="#070317" />
      </linearGradient>
      <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#7c5cff" />
      </linearGradient>
      <linearGradient id={`${id}-lilac`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#c4b5fd" />
        <stop offset="100%" stopColor="#8b6dff" />
      </linearGradient>
      <linearGradient id={`${id}-cyan`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7ef0ff" />
        <stop offset="100%" stopColor="#5da9ff" />
      </linearGradient>
      <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-cyan-glow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#7ef0ff" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#7ef0ff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-platform`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#3b2a87" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#1a1247" stopOpacity="0" />
      </radialGradient>
      <pattern
        id={`${id}-dots`}
        x="0"
        y="0"
        width="14"
        height="14"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="1.2" cy="1.2" r="1.1" fill="#a78bfa" fillOpacity="0.32" />
      </pattern>
    </defs>
  );
}

function Platform({ id, cx = 400, cy = 470 }: { id: string; cx?: number; cy?: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy + 30} rx="220" ry="34" fill={`url(#${id}-glow)`} />
      <ellipse cx={cx} cy={cy} rx="180" ry="26" fill={`url(#${id}-platform)`} />
      <ellipse
        cx={cx}
        cy={cy}
        rx="180"
        ry="26"
        fill="none"
        stroke="#a78bfa"
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeDasharray="2 5"
      />
      <ellipse
        cx={cx}
        cy={cy}
        rx="140"
        ry="20"
        fill="none"
        stroke="#7c5cff"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
    </g>
  );
}

function OrbitParticles({ cx, cy, count = 10, color = "#c4b5fd", radius = 230 }: {
  cx: number;
  cy: number;
  count?: number;
  color?: string;
  radius?: number;
}) {
  const pts = Array.from({ length: count }).map((_, i) => {
    const a = (i / count) * Math.PI * 2;
    return { x: cx + Math.cos(a) * radius, y: cy + Math.sin(a) * radius * 0.32, r: 1.5 + (i % 3) * 0.6 };
  });
  return (
    <g>
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill={color}
          opacity={0.4 + ((i % 4) * 0.15)}
        />
      ))}
    </g>
  );
}

const SVG_BASE_PROPS = {
  viewBox: "0 0 800 600",
  xmlns: "http://www.w3.org/2000/svg",
  width: "100%",
  height: "100%",
  role: "presentation" as const,
  "aria-hidden": true as const,
  style: { display: "block", overflow: "visible" as const },
};

function Frame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`relative w-full ${className ?? ""}`}
      style={{ aspectRatio: "4 / 3" }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

/* =====================================================================
 * 1) PRIVACY — Shield + private document + key, encrypted chip,
 *    hidden data lines, privacy nodes
 * ===================================================================*/
export function PrivacyIllustration({ className }: Props) {
  const id = `${COMMON_DEFS_ID_PREFIX}-privacy`;
  return (
    <Frame className={className}>
      <svg {...SVG_BASE_PROPS}>
        <Defs id={id} />

        {/* faint pattern */}
        <rect x="80" y="80" width="200" height="200" fill={`url(#${id}-dots)`} opacity="0.5" transform="rotate(-12 180 180)" />

        <Platform id={id} />
        <OrbitParticles cx={400} cy={470} />

        {/* hidden data lines (background) */}
        <g stroke="#7c5cff" strokeOpacity="0.35" strokeWidth="1" fill="none" strokeDasharray="3 5">
          <path d="M120 220 H300" />
          <path d="M500 180 H700" />
          <path d="M540 260 H720" />
          <path d="M100 320 H260" />
        </g>

        {/* document (back) */}
        <g transform="translate(280 160)">
          <rect x="0" y="0" width="200" height="250" rx="14" fill={`url(#${id}-body)`} stroke="#a78bfa" strokeOpacity="0.8" strokeWidth="1.5" />
          <rect x="0" y="0" width="200" height="42" rx="14" fill="#241968" />
          <circle cx="22" cy="21" r="6" fill="#7ef0ff" opacity="0.85" />
          <rect x="40" y="16" width="80" height="10" rx="3" fill="#c4b5fd" opacity="0.7" />
          {/* redacted lines */}
          <g fill="#a78bfa" opacity="0.55">
            <rect x="20" y="64" width="160" height="8" rx="2" />
            <rect x="20" y="84" width="120" height="8" rx="2" />
            <rect x="20" y="104" width="140" height="8" rx="2" />
            <rect x="20" y="124" width="90" height="8" rx="2" />
          </g>
          {/* encrypted chip */}
          <g transform="translate(34 160)">
            <rect x="0" y="0" width="60" height="60" rx="8" fill="#0c0820" stroke="#7ef0ff" strokeOpacity="0.85" strokeWidth="1.2" />
            <g stroke="#7ef0ff" strokeOpacity="0.7" strokeWidth="1" fill="none">
              <path d="M0 18 H-8 M0 30 H-8 M0 42 H-8 M60 18 H68 M60 30 H68 M60 42 H68" />
              <path d="M18 0 V-8 M30 0 V-8 M42 0 V-8 M18 60 V68 M30 60 V68 M42 60 V68" />
            </g>
            <rect x="14" y="14" width="32" height="32" rx="4" fill="#241968" stroke="#a78bfa" strokeOpacity="0.7" />
            <text x="30" y="34" textAnchor="middle" fontSize="11" fontWeight="800" fill="#7ef0ff" fontFamily="ui-monospace, monospace">AES</text>
          </g>
          <rect x="110" y="180" width="74" height="22" rx="4" fill="#241968" stroke="#a78bfa" strokeOpacity="0.6" />
          <text x="147" y="195" textAnchor="middle" fontSize="9" fontWeight="700" fill="#c4b5fd" fontFamily="ui-monospace, monospace">LOCAL ONLY</text>
        </g>

        {/* shield (front) */}
        <g transform="translate(170 240)" filter="url()">
          <path
            d="M90 0 L170 30 V110 C170 165 130 200 90 215 C50 200 10 165 10 110 V30 Z"
            fill={`url(#${id}-body)`}
            stroke="url(#pi-privacy-edge)"
            strokeWidth="2.5"
          />
          <path
            d="M90 18 L152 42 V108 C152 152 122 182 90 195 C58 182 28 152 28 108 V42 Z"
            fill="none"
            stroke="#a78bfa"
            strokeOpacity="0.55"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          {/* checkmark */}
          <path d="M55 110 L82 138 L130 78" stroke="#7ef0ff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="90" cy="110" r="55" fill={`url(#${id}-cyan-glow)`} opacity="0.7" />
        </g>

        {/* key (front-right) */}
        <g transform="translate(500 300) rotate(20)">
          <circle cx="0" cy="0" r="28" fill="none" stroke="url(#pi-privacy-lilac)" strokeWidth="6" />
          <circle cx="0" cy="0" r="10" fill="#0c0820" stroke="#a78bfa" />
          <rect x="24" y="-6" width="90" height="12" rx="3" fill="url(#pi-privacy-lilac)" />
          <rect x="92" y="-6" width="10" height="22" fill="url(#pi-privacy-lilac)" />
          <rect x="78" y="-6" width="8" height="18" fill="url(#pi-privacy-lilac)" />
        </g>

        {/* privacy nodes */}
        <g>
          <circle cx="120" cy="180" r="5" fill="#7ef0ff" />
          <circle cx="680" cy="140" r="5" fill="#c4b5fd" />
          <circle cx="700" cy="380" r="5" fill="#a78bfa" />
          <circle cx="100" cy="420" r="5" fill="#7ef0ff" />
        </g>
      </svg>
    </Frame>
  );
}

/* =====================================================================
 * 2) TERMS — Structured legal card + clause lines + checkmark seal +
 *    signature marker + verification node
 * ===================================================================*/
export function TermsIllustration({ className }: Props) {
  const id = `${COMMON_DEFS_ID_PREFIX}-terms`;
  return (
    <Frame className={className}>
      <svg {...SVG_BASE_PROPS}>
        <Defs id={id} />
        <rect x="500" y="80" width="220" height="180" fill={`url(#${id}-dots)`} opacity="0.45" transform="rotate(10 610 170)" />

        <Platform id={id} />
        <OrbitParticles cx={400} cy={470} count={12} color="#a78bfa" radius={240} />

        {/* secondary card (behind) */}
        <g transform="translate(440 140) rotate(8)">
          <rect x="0" y="0" width="220" height="280" rx="14" fill={`url(#${id}-body-side)`} stroke="#7c5cff" strokeOpacity="0.6" strokeWidth="1.4" />
          <g fill="#a78bfa" opacity="0.4">
            <rect x="18" y="24" width="140" height="8" rx="2" />
            <rect x="18" y="44" width="170" height="6" rx="2" />
            <rect x="18" y="60" width="120" height="6" rx="2" />
            <rect x="18" y="86" width="160" height="6" rx="2" />
            <rect x="18" y="102" width="100" height="6" rx="2" />
          </g>
        </g>

        {/* main legal card */}
        <g transform="translate(220 130)">
          <rect x="0" y="0" width="260" height="320" rx="16" fill={`url(#${id}-body)`} stroke="url(#pi-terms-edge)" strokeWidth="2" />
          {/* header bar */}
          <rect x="0" y="0" width="260" height="48" rx="16" fill="#241968" />
          <text x="20" y="31" fontSize="13" fontWeight="800" fill="#c4b5fd" fontFamily="ui-monospace, monospace" letterSpacing="2">TERMS</text>
          <rect x="200" y="14" width="46" height="20" rx="4" fill="#0c0820" stroke="#7ef0ff" strokeOpacity="0.7" />
          <text x="223" y="28" textAnchor="middle" fontSize="9" fontWeight="700" fill="#7ef0ff" fontFamily="ui-monospace, monospace">v1.0</text>

          {/* clause lines with numbers */}
          <g fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill="#7c5cff">
            <text x="18" y="78">01</text>
            <text x="18" y="118">02</text>
            <text x="18" y="158">03</text>
            <text x="18" y="198">04</text>
          </g>
          <g fill="#c4b5fd" opacity="0.7">
            <rect x="46" y="70" width="180" height="6" rx="2" />
            <rect x="46" y="82" width="150" height="6" rx="2" opacity="0.55" />
            <rect x="46" y="110" width="190" height="6" rx="2" />
            <rect x="46" y="122" width="120" height="6" rx="2" opacity="0.55" />
            <rect x="46" y="150" width="170" height="6" rx="2" />
            <rect x="46" y="162" width="140" height="6" rx="2" opacity="0.55" />
            <rect x="46" y="190" width="160" height="6" rx="2" />
            <rect x="46" y="202" width="100" height="6" rx="2" opacity="0.55" />
          </g>

          {/* signature line */}
          <line x1="20" y1="258" x2="160" y2="258" stroke="#a78bfa" strokeOpacity="0.6" strokeDasharray="3 3" />
          <path d="M28 254 C 50 240, 70 268, 92 248 S 130 256, 150 244" stroke="#7ef0ff" strokeWidth="2" fill="none" strokeLinecap="round" />
          <text x="20" y="278" fontSize="9" fill="#777F9F" fontFamily="ui-monospace, monospace">SIGNATURE</text>

          {/* seal */}
          <g transform="translate(210 256)">
            <circle r="32" fill={`url(#${id}-cyan-glow)`} />
            <circle r="22" fill="#0c0820" stroke="#7ef0ff" strokeWidth="2" />
            <circle r="22" fill="none" stroke="#7ef0ff" strokeOpacity="0.4" strokeDasharray="2 3" strokeWidth="1" transform="scale(1.25)" />
            <path d="M-10 0 L-2 8 L12 -8" stroke="#7ef0ff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>

        {/* verification node + line */}
        <g>
          <path d="M120 380 H210" stroke="#a78bfa" strokeOpacity="0.6" strokeDasharray="3 4" />
          <circle cx="120" cy="380" r="6" fill="#7ef0ff" />
          <circle cx="120" cy="380" r="12" fill="none" stroke="#7ef0ff" strokeOpacity="0.4" />
          <text x="86" y="404" fontSize="9" fill="#777F9F" fontFamily="ui-monospace, monospace">VERIFIED</text>
        </g>
      </svg>
    </Frame>
  );
}

/* =====================================================================
 * 3) ABOUT — Desktop app window + connected contributor nodes +
 *    wallet/account panel + mission marker
 * ===================================================================*/
export function AboutIllustration({ className }: Props) {
  const id = `${COMMON_DEFS_ID_PREFIX}-about`;
  return (
    <Frame className={className}>
      <svg {...SVG_BASE_PROPS}>
        <Defs id={id} />
        <rect x="100" y="120" width="180" height="180" fill={`url(#${id}-dots)`} opacity="0.45" />
        <Platform id={id} />
        <OrbitParticles cx={400} cy={470} count={14} color="#7ef0ff" radius={250} />

        {/* contributor nodes (background mesh) */}
        <g stroke="#7c5cff" strokeOpacity="0.5" strokeWidth="1" fill="none">
          <path d="M110 200 L260 270 L130 360 Z" />
          <path d="M690 180 L560 250 L700 340 Z" />
          <path d="M110 200 L690 180" strokeDasharray="3 5" opacity="0.4" />
        </g>
        <g>
          {[
            { x: 110, y: 200, c: "#c4b5fd" },
            { x: 130, y: 360, c: "#7ef0ff" },
            { x: 690, y: 180, c: "#a78bfa" },
            { x: 700, y: 340, c: "#c4b5fd" },
          ].map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="14" fill="#0c0820" stroke={n.c} strokeWidth="1.5" />
              <circle cx={n.x} cy={n.y} r="5" fill={n.c} />
            </g>
          ))}
        </g>

        {/* main desktop window */}
        <g transform="translate(210 140)">
          <rect x="0" y="0" width="380" height="260" rx="14" fill={`url(#${id}-body)`} stroke="url(#pi-about-edge)" strokeWidth="2" />
          {/* title bar */}
          <rect x="0" y="0" width="380" height="34" rx="14" fill="#241968" />
          <circle cx="18" cy="17" r="5" fill="#ff7ad9" />
          <circle cx="34" cy="17" r="5" fill="#f5d76e" />
          <circle cx="50" cy="17" r="5" fill="#7ef0ff" />
          <rect x="140" y="9" width="100" height="16" rx="4" fill="#0c0820" stroke="#a78bfa" strokeOpacity="0.5" />
          <text x="190" y="20" textAnchor="middle" fontSize="9" fill="#c4b5fd" fontFamily="ui-monospace, monospace">starknet wallet</text>

          {/* sidebar */}
          <rect x="0" y="34" width="100" height="226" fill="#171041" />
          <g fill="#a78bfa" opacity="0.6">
            <rect x="14" y="54" width="72" height="10" rx="2" />
            <rect x="14" y="74" width="56" height="8" rx="2" opacity="0.6" />
            <rect x="14" y="94" width="64" height="8" rx="2" opacity="0.6" />
            <rect x="14" y="114" width="48" height="8" rx="2" opacity="0.6" />
          </g>
          <rect x="8" y="48" width="3" height="22" rx="2" fill="#7ef0ff" />

          {/* wallet/account panel */}
          <g transform="translate(118 54)">
            <rect x="0" y="0" width="246" height="76" rx="10" fill="#0c0820" stroke="#7c5cff" strokeOpacity="0.6" />
            <circle cx="22" cy="38" r="14" fill="url(#pi-about-lilac)" />
            <text x="22" y="42" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0c0820">S</text>
            <rect x="44" y="20" width="90" height="9" rx="2" fill="#c4b5fd" />
            <rect x="44" y="34" width="140" height="7" rx="2" fill="#7c5cff" opacity="0.7" />
            <rect x="44" y="48" width="60" height="7" rx="2" fill="#7c5cff" opacity="0.5" />
            <rect x="184" y="28" width="50" height="22" rx="6" fill="#241968" stroke="#7ef0ff" strokeOpacity="0.7" />
            <text x="209" y="42" textAnchor="middle" fontSize="9" fontWeight="700" fill="#7ef0ff" fontFamily="ui-monospace, monospace">ACTIVE</text>
          </g>

          {/* stats row */}
          <g transform="translate(118 140)">
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${i * 84} 0)`}>
                <rect x="0" y="0" width="76" height="50" rx="8" fill="#0c0820" stroke="#7c5cff" strokeOpacity="0.45" />
                <rect x="10" y="10" width="38" height="6" rx="2" fill="#7c5cff" opacity="0.6" />
                <rect x="10" y="24" width="48" height="10" rx="2" fill="#c4b5fd" />
              </g>
            ))}
          </g>

          {/* footer line */}
          <g transform="translate(118 208)">
            <rect x="0" y="0" width="246" height="36" rx="8" fill="#0c0820" stroke="#7c5cff" strokeOpacity="0.4" />
            <circle cx="18" cy="18" r="5" fill="#7ef0ff" />
            <rect x="32" y="14" width="140" height="8" rx="2" fill="#a78bfa" opacity="0.7" />
            <rect x="190" y="9" width="48" height="18" rx="4" fill="#241968" stroke="#a78bfa" strokeOpacity="0.5" />
          </g>
        </g>

        {/* mission marker */}
        <g transform="translate(620 110)">
          <path d="M0 0 L36 0 L48 14 L36 28 L0 28 Z" fill="#241968" stroke="#7ef0ff" strokeWidth="1.5" />
          <text x="20" y="19" fontSize="10" fontWeight="800" fill="#7ef0ff" fontFamily="ui-monospace, monospace">v1</text>
        </g>
      </svg>
    </Frame>
  );
}

/* =====================================================================
 * 4) AUDITS — Audit report + magnifying glass + verification shield +
 *    checksum lines + finding markers
 * ===================================================================*/
export function AuditsIllustration({ className }: Props) {
  const id = `${COMMON_DEFS_ID_PREFIX}-audits`;
  return (
    <Frame className={className}>
      <svg {...SVG_BASE_PROPS}>
        <Defs id={id} />
        <rect x="120" y="80" width="200" height="200" fill={`url(#${id}-dots)`} opacity="0.45" transform="rotate(-8 220 180)" />
        <Platform id={id} />
        <OrbitParticles cx={400} cy={470} count={10} color="#c4b5fd" radius={235} />

        {/* report */}
        <g transform="translate(200 130)">
          <rect x="0" y="0" width="260" height="320" rx="14" fill={`url(#${id}-body)`} stroke="url(#pi-audits-edge)" strokeWidth="2" />
          <rect x="0" y="0" width="260" height="44" rx="14" fill="#241968" />
          <text x="20" y="28" fontSize="12" fontWeight="800" fill="#c4b5fd" fontFamily="ui-monospace, monospace" letterSpacing="2">AUDIT REPORT</text>
          <rect x="196" y="14" width="54" height="20" rx="4" fill="#0c0820" stroke="#a78bfa" strokeOpacity="0.7" />
          <text x="223" y="28" textAnchor="middle" fontSize="9" fontWeight="700" fill="#a78bfa" fontFamily="ui-monospace, monospace">SIGNED</text>

          {/* checksum block */}
          <g transform="translate(18 60)">
            <rect x="0" y="0" width="224" height="60" rx="6" fill="#0c0820" stroke="#7c5cff" strokeOpacity="0.5" />
            <text x="10" y="18" fontSize="9" fontWeight="700" fill="#7c5cff" fontFamily="ui-monospace, monospace">SHA256</text>
            <g fill="#7ef0ff" fontFamily="ui-monospace, monospace" fontSize="10" opacity="0.85">
              <text x="10" y="34">a4f9 2c0b 88e1 fd47</text>
              <text x="10" y="50">9b2a 7c33 ee10 0c5d</text>
            </g>
          </g>

          {/* findings list */}
          <g transform="translate(18 138)">
            {[
              { c: "#7ef0ff", t: "Reviewed" },
              { c: "#c4b5fd", t: "Reviewed" },
              { c: "#a78bfa", t: "Open" },
              { c: "#7ef0ff", t: "Resolved" },
            ].map((row, i) => (
              <g key={i} transform={`translate(0 ${i * 32})`}>
                <rect x="0" y="0" width="224" height="24" rx="4" fill="#171041" />
                <circle cx="14" cy="12" r="4" fill={row.c} />
                <rect x="28" y="8" width="120" height="8" rx="2" fill="#c4b5fd" opacity="0.55" />
                <text x="216" y="16" textAnchor="end" fontSize="9" fontWeight="700" fill={row.c} fontFamily="ui-monospace, monospace">{row.t}</text>
              </g>
            ))}
          </g>
        </g>

        {/* shield (top-right small) */}
        <g transform="translate(530 130)">
          <path d="M40 0 L80 14 V60 C80 90 60 110 40 118 C20 110 0 90 0 60 V14 Z" fill="#241968" stroke="url(#pi-audits-edge)" strokeWidth="2" />
          <path d="M22 60 L36 76 L60 44" stroke="#7ef0ff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* magnifying glass */}
        <g transform="translate(440 320) rotate(25)">
          <circle r="48" fill="#0c0820" fillOpacity="0.7" stroke="url(#pi-audits-edge)" strokeWidth="4" />
          <circle r="38" fill="none" stroke="#a78bfa" strokeOpacity="0.5" />
          <circle r="38" fill={`url(#${id}-cyan-glow)`} />
          <rect x="34" y="-6" width="70" height="14" rx="6" fill="url(#pi-audits-lilac)" />
          <rect x="92" y="-6" width="24" height="14" rx="3" fill="#241968" stroke="#a78bfa" />
        </g>
      </svg>
    </Frame>
  );
}

/* =====================================================================
 * 5) ROADMAP / Product Evolution — Milestone path with connected nodes
 * ===================================================================*/
export function RoadmapIllustration({ className }: Props) {
  const id = `${COMMON_DEFS_ID_PREFIX}-roadmap`;
  const nodes = [
    { x: 120, y: 360, label: "DESK", c: "#7ef0ff" },
    { x: 240, y: 240, label: "COMP", c: "#c4b5fd" },
    { x: 380, y: 320, label: "SIGN", c: "#a78bfa" },
    { x: 520, y: 200, label: "SEC", c: "#7ef0ff" },
    { x: 680, y: 300, label: "MAINT", c: "#c4b5fd" },
  ];
  const pathD = nodes
    .map((n, i) => (i === 0 ? `M${n.x} ${n.y}` : `L${n.x} ${n.y}`))
    .join(" ");
  return (
    <Frame className={className}>
      <svg {...SVG_BASE_PROPS}>
        <Defs id={id} />
        <rect x="540" y="80" width="200" height="200" fill={`url(#${id}-dots)`} opacity="0.4" transform="rotate(12 640 180)" />
        <Platform id={id} cy={490} />
        <OrbitParticles cx={400} cy={490} count={12} color="#a78bfa" radius={250} />

        {/* glow under path */}
        <ellipse cx="400" cy="280" rx="340" ry="120" fill={`url(#${id}-glow)`} opacity="0.55" />

        {/* path */}
        <path d={pathD} stroke="url(#pi-roadmap-edge)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="0" />
        <path d={pathD} stroke="#7ef0ff" strokeOpacity="0.35" strokeWidth="1" fill="none" strokeDasharray="3 5" />

        {/* nodes */}
        {nodes.map((n, i) => (
          <g key={i} transform={`translate(${n.x} ${n.y})`}>
            <circle r="28" fill={`url(#${id}-glow)`} />
            <circle r="20" fill="#0c0820" stroke={n.c} strokeWidth="2" />
            <circle r="20" fill="none" stroke={n.c} strokeOpacity="0.3" strokeDasharray="2 3" transform="scale(1.4)" />
            <circle r="8" fill={n.c} />
            <rect x="-26" y="32" width="52" height="20" rx="4" fill="#241968" stroke={n.c} strokeOpacity="0.6" />
            <text x="0" y="46" textAnchor="middle" fontSize="9" fontWeight="800" fill={n.c} fontFamily="ui-monospace, monospace">{n.label}</text>
          </g>
        ))}

        {/* current marker */}
        <g transform="translate(380 280)">
          <rect x="-44" y="-22" width="88" height="22" rx="4" fill="#241968" stroke="#7ef0ff" />
          <text x="0" y="-8" textAnchor="middle" fontSize="10" fontWeight="800" fill="#7ef0ff" fontFamily="ui-monospace, monospace">NOW</text>
          <path d="M0 -2 L-6 4 L6 4 Z" fill="#7ef0ff" />
        </g>
      </svg>
    </Frame>
  );
}

/* =====================================================================
 * 6) COOKIES — Consent panel + shield + toggles
 * ===================================================================*/
export function CookiesIllustration({ className }: Props) {
  const id = `${COMMON_DEFS_ID_PREFIX}-cookies`;
  return (
    <Frame className={className}>
      <svg {...SVG_BASE_PROPS}>
        <Defs id={id} />
        <rect x="100" y="100" width="200" height="200" fill={`url(#${id}-dots)`} opacity="0.45" />
        <Platform id={id} />
        <OrbitParticles cx={400} cy={470} count={10} color="#c4b5fd" />

        {/* consent panel */}
        <g transform="translate(220 150)">
          <rect x="0" y="0" width="360" height="240" rx="16" fill={`url(#${id}-body)`} stroke="url(#pi-cookies-edge)" strokeWidth="2" />
          <rect x="0" y="0" width="360" height="42" rx="16" fill="#241968" />
          <text x="20" y="27" fontSize="12" fontWeight="800" fill="#c4b5fd" fontFamily="ui-monospace, monospace" letterSpacing="2">PREFERENCES</text>

          {/* rows with toggles */}
          {[
            { label: "Essential", on: true, locked: true },
            { label: "Analytics", on: false },
            { label: "Marketing", on: false },
          ].map((row, i) => (
            <g key={i} transform={`translate(20 ${60 + i * 52})`}>
              <rect x="0" y="0" width="320" height="40" rx="8" fill="#0c0820" stroke="#7c5cff" strokeOpacity="0.4" />
              <rect x="14" y="14" width="100" height="12" rx="2" fill="#c4b5fd" />
              {/* toggle */}
              <rect x="260" y="10" width="46" height="20" rx="10" fill={row.on ? "#7ef0ff" : "#241968"} stroke="#a78bfa" strokeOpacity="0.6" />
              <circle cx={row.on ? 296 : 272} cy="20" r="8" fill="#0c0820" stroke={row.on ? "#7ef0ff" : "#a78bfa"} strokeWidth="1.5" />
            </g>
          ))}
        </g>

        {/* shield emblem */}
        <g transform="translate(140 280)">
          <path d="M40 0 L80 14 V60 C80 90 60 110 40 118 C20 110 0 90 0 60 V14 Z" fill="#241968" stroke="url(#pi-cookies-edge)" strokeWidth="2" />
          <circle cx="40" cy="56" r="22" fill={`url(#${id}-cyan-glow)`} />
          <path d="M24 56 L36 68 L58 42" stroke="#7ef0ff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </Frame>
  );
}
