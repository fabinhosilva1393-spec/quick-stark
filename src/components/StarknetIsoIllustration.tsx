import type { CSSProperties } from "react";

export type IsoIllustrationVariant =
  | "wallet"
  | "cairo-preview"
  | "permissions"
  | "signed-release"
  | "local-keys"
  | "hardware-wallet"
  | "multi-network"
  | "developer-tools"
  | "security"
  | "transactions"
  | "no-telemetry"
  | "open-source"
  | "secure-enclave"
  | "disclosure";

type Props = {
  variant: IsoIllustrationVariant;
  size?: number;
  className?: string;
  delay?: number;
};

/**
 * Large illustrated isometric-style scenes inspired by crypto-infrastructure
 * artwork. Transparent SVG background — no card or panel wrapping the icon.
 * Soft shadows/glows are attached only to the objects themselves.
 * Decorative only. Always aria-hidden.
 */
export function StarknetIsoIllustration({
  variant,
  size = 240,
  className = "",
  delay = 0,
}: Props) {
  const style: CSSProperties = {
    width: size,
    height: size,
    "--iso-delay": `${delay}s`,
  } as CSSProperties;

  const id = `iso-${variant}`;

  return (
    <span
      aria-hidden="true"
      className={`iso-illustration ${className}`}
      style={style}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none">
        <defs>
          <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--iso-blue)" />
            <stop offset="100%" stopColor="var(--iso-purple)" />
          </linearGradient>
          <linearGradient id={`${id}-coral`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--iso-coral)" />
            <stop offset="100%" stopColor="var(--iso-purple)" />
          </linearGradient>
          <linearGradient id={`${id}-mint`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--iso-mint)" />
            <stop offset="100%" stopColor="var(--iso-blue)" />
          </linearGradient>
          <radialGradient id={`${id}-soft`} cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="var(--iso-blue)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--iso-blue)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* soft floor glow (no panel) */}
        <ellipse cx="100" cy="160" rx="78" ry="14" fill={`url(#${id}-soft)`} />

        {/* dotted orbit */}
        <ellipse
          className="iso-orbit"
          cx="100"
          cy="148"
          rx="74"
          ry="16"
          stroke="var(--iso-purple)"
          strokeOpacity="0.45"
          strokeDasharray="2 5"
          strokeWidth="1.2"
        />

        {renderScene(variant, id)}

        {/* floating particles */}
        <circle className="iso-dot iso-dot-a" cx="26" cy="40" r="2.4" fill="var(--iso-coral)" />
        <circle className="iso-dot iso-dot-b" cx="176" cy="48" r="2" fill="var(--iso-mint)" />
        <circle className="iso-dot iso-dot-c" cx="172" cy="160" r="1.8" fill="var(--iso-lavender)" />
        <circle className="iso-dot iso-dot-a" cx="32" cy="172" r="1.6" fill="var(--iso-purple)" />
      </svg>
    </span>
  );
}

function renderScene(v: IsoIllustrationVariant, id: string) {
  const blue = `url(#${id}-blue)`;
  const coral = `url(#${id}-coral)`;
  const mint = `url(#${id}-mint)`;
  const navy = "#0B0E26";
  const ink = "#E6E8FF";

  // reusable iso pedestal (now a free-floating geometric block, not a panel)
  const pedestal = (
    <g opacity="0.95" className="iso-float-slow">
      <path d="M52 132 L100 108 L148 132 L100 156 Z" fill={blue} />
      <path d="M52 132 L52 142 L100 166 L100 156 Z" fill="#1A1F4A" />
      <path d="M148 132 L148 142 L100 166 L100 156 Z" fill="#272D66" />
    </g>
  );

  switch (v) {
    case "wallet":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <ellipse cx="100" cy="96" rx="32" ry="11" fill={coral} />
            <rect x="68" y="88" width="64" height="12" fill="#FF5C46" />
            <ellipse cx="100" cy="88" rx="32" ry="11" fill={coral} />
            <text x="100" y="92" textAnchor="middle" fontSize="12" fontWeight="800" fill={navy}>
              STRK
            </text>
          </g>
          <g className="iso-float-slow">
            <ellipse cx="56" cy="72" rx="16" ry="6" fill={mint} />
            <ellipse cx="146" cy="64" rx="14" ry="5" fill={blue} />
          </g>
        </>
      );
    case "cairo-preview":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path d="M56 54 L144 54 L144 116 L56 116 Z" fill={blue} opacity="0.95" />
            <path d="M56 54 L144 54 L138 60 L62 60 Z" fill="#1A1F4A" opacity="0.8" />
            <rect x="68" y="68" width="50" height="5" rx="2" fill={mint} />
            <rect x="68" y="80" width="64" height="5" rx="2" fill={ink} opacity="0.7" />
            <rect x="68" y="92" width="40" height="5" rx="2" fill={ink} opacity="0.5" />
            <rect x="68" y="104" width="56" height="5" rx="2" fill={coral} />
            <circle cx="134" cy="70" r="2.4" fill={coral} />
          </g>
          <g className="iso-float-slow">
            <path d="M36 122 L52 114 L52 124 L36 132 Z" fill={blue} />
            <path d="M148 114 L164 122 L164 132 L148 124 Z" fill={coral} />
          </g>
        </>
      );
    case "permissions":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path
              d="M100 42 L138 58 L138 100 C138 118 100 130 100 130 C100 130 62 118 62 100 L62 58 Z"
              fill={blue}
            />
            <path
              d="M100 50 L130 64 L130 98 C130 112 100 122 100 122 C100 122 70 112 70 98 L70 64 Z"
              fill={coral}
              opacity="0.85"
            />
            <path d="M86 92 L96 102 L116 78" stroke={ink} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g className="iso-float-slow">
            <circle cx="40" cy="78" r="7" fill={mint} />
            <circle cx="160" cy="84" r="6" fill={coral} />
            <line x1="47" y1="78" x2="62" y2="78" stroke={mint} strokeOpacity="0.55" strokeDasharray="2 3" />
            <line x1="154" y1="84" x2="138" y2="84" stroke={coral} strokeOpacity="0.55" strokeDasharray="2 3" />
          </g>
        </>
      );
    case "signed-release":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path d="M58 62 L142 62 L142 122 L58 122 Z" fill={blue} opacity="0.95" />
            <path d="M58 62 L142 62 L136 70 L64 70 Z" fill="#1A1F4A" />
            <text x="70" y="68" fontSize="6" fill={ink} opacity="0.85" fontFamily="monospace">sha256</text>
            <rect x="70" y="80" width="54" height="4" rx="1" fill={mint} />
            <rect x="70" y="90" width="44" height="4" rx="1" fill={ink} opacity="0.5" />
            <rect x="70" y="100" width="60" height="4" rx="1" fill={ink} opacity="0.5" />
            <rect x="70" y="110" width="36" height="4" rx="1" fill={coral} />
          </g>
          <g className="iso-float-slow">
            <circle cx="150" cy="118" r="18" fill={coral} stroke={ink} strokeOpacity="0.75" />
            <path d="M141 118 L148 125 L160 110" stroke={navy} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </>
      );
    case "local-keys":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <circle cx="78" cy="88" r="18" fill="none" stroke={mint} strokeWidth="4" />
            <rect x="94" y="84" width="44" height="9" rx="1" fill={blue} />
            <rect x="124" y="84" width="3.5" height="16" fill={blue} />
            <rect x="114" y="84" width="3.5" height="16" fill={blue} />
          </g>
          <g className="iso-float-slow">
            <ellipse cx="100" cy="128" rx="44" ry="8" fill={coral} opacity="0.7" />
            <text x="100" y="131" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={navy}>local · encrypted</text>
          </g>
        </>
      );
    case "hardware-wallet":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="50" y="80" width="100" height="32" rx="6" fill={blue} />
            <rect x="58" y="88" width="60" height="16" rx="2" fill="#0B0E26" />
            <rect x="124" y="90" width="22" height="3.5" fill={mint} />
            <rect x="124" y="100" width="16" height="3.5" fill={coral} />
          </g>
          <g className="iso-float-slow">
            <path d="M28 96 L50 96" stroke={ink} strokeOpacity="0.7" strokeWidth="2.5" />
            <circle cx="26" cy="96" r="4" fill={coral} />
          </g>
        </>
      );
    case "multi-network":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <circle cx="62" cy="78" r="18" fill={blue} />
            <text x="62" y="82" textAnchor="middle" fontSize="9" fontWeight="800" fill={ink}>MN</text>
            <circle cx="138" cy="78" r="18" fill={coral} />
            <text x="138" y="82" textAnchor="middle" fontSize="9" fontWeight="800" fill={ink}>SP</text>
            <circle cx="100" cy="120" r="18" fill={mint} />
            <text x="100" y="124" textAnchor="middle" fontSize="9" fontWeight="800" fill={navy}>RPC</text>
            <line x1="78" y1="86" x2="122" y2="86" stroke={ink} strokeOpacity="0.5" strokeDasharray="2 3" />
            <line x1="72" y1="94" x2="92" y2="110" stroke={ink} strokeOpacity="0.5" strokeDasharray="2 3" />
            <line x1="128" y1="94" x2="108" y2="110" stroke={ink} strokeOpacity="0.5" strokeDasharray="2 3" />
          </g>
        </>
      );
    case "developer-tools":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="46" y="50" width="108" height="76" rx="8" fill="#0B0F2E" stroke={blue} strokeOpacity="0.7" />
            <rect x="46" y="50" width="108" height="12" rx="8" fill="#1A1F4A" />
            <circle cx="54" cy="56" r="2" fill={coral} />
            <circle cx="60" cy="56" r="2" fill={mint} />
            <circle cx="66" cy="56" r="2" fill={blue} />
            <text x="54" y="78" fontSize="7" fontFamily="monospace" fill={mint}>$ starknet</text>
            <text x="54" y="90" fontSize="7" fontFamily="monospace" fill={ink} opacity="0.9">› sign --to 0x07f…</text>
            <text x="54" y="102" fontSize="7" fontFamily="monospace" fill={coral}>› preview: transfer()</text>
            <text x="54" y="114" fontSize="7" fontFamily="monospace" fill={ink} opacity="0.7">› ok</text>
          </g>
        </>
      );
    case "security":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path
              d="M100 40 L138 56 L138 100 C138 120 100 132 100 132 C100 132 62 120 62 100 L62 56 Z"
              fill={blue}
            />
            <path
              d="M100 50 L128 62 L128 98 C128 114 100 122 100 122 C100 122 72 114 72 98 L72 62 Z"
              fill={coral}
              opacity="0.85"
            />
            <circle cx="100" cy="92" r="8" fill={ink} />
          </g>
        </>
      );
    case "transactions":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path d="M56 60 L144 60 L144 122 L56 122 Z" fill={blue} opacity="0.95" />
            <rect x="66" y="72" width="44" height="5" rx="2" fill={mint} />
            <rect x="66" y="84" width="64" height="5" rx="2" fill={ink} opacity="0.6" />
            <rect x="66" y="96" width="52" height="5" rx="2" fill={ink} opacity="0.5" />
            <rect x="66" y="108" width="48" height="7" rx="2" fill={coral} />
          </g>
          <g className="iso-float-slow">
            <path d="M28 96 L50 96" stroke={mint} strokeWidth="2.5" />
            <path d="M44 91 L50 96 L44 101" stroke={mint} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </>
      );
    case "no-telemetry":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path d="M52 92 C68 64 132 64 148 92 C132 120 68 120 52 92 Z" fill="none" stroke={blue} strokeWidth="3" />
            <circle cx="100" cy="92" r="12" fill={coral} />
            <line x1="46" y1="118" x2="154" y2="66" stroke={coral} strokeWidth="4" strokeLinecap="round" />
          </g>
        </>
      );
    case "open-source":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path d="M80 64 L56 92 L80 120" stroke={mint} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M120 64 L144 92 L120 120" stroke={mint} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="114" y1="56" x2="86" y2="128" stroke={coral} strokeWidth="4" strokeLinecap="round" />
          </g>
        </>
      );
    case "secure-enclave":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="62" y="56" width="76" height="72" rx="8" fill={blue} stroke={ink} strokeOpacity="0.5" />
            <rect x="74" y="68" width="52" height="48" rx="4" fill="#0B0E26" />
            <rect x="82" y="78" width="36" height="5" fill={mint} />
            <rect x="82" y="90" width="26" height="5" fill={coral} />
            <rect x="82" y="102" width="30" height="5" fill={ink} opacity="0.5" />
          </g>
        </>
      );
    case "disclosure":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <circle cx="100" cy="88" r="28" fill={coral} stroke={ink} strokeOpacity="0.6" strokeWidth="2" />
            <rect x="97" y="72" width="6" height="18" rx="1.5" fill={navy} />
            <circle cx="100" cy="102" r="3" fill={navy} />
          </g>
        </>
      );
    default:
      return pedestal;
  }
}
