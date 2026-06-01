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
 * artwork. Original SVG compositions on a dark inner panel with floating
 * geometric layers, tokens, orbits, and neon gradients.
 * Decorative only. Always aria-hidden.
 */
export function StarknetIsoIllustration({
  variant,
  size = 180,
  className = "",
  delay = 0,
}: Props) {
  const style: CSSProperties = {
    width: size,
    height: size,
    animationDelay: `${delay}s`,
  };

  const id = `iso-${variant}`;

  return (
    <span
      aria-hidden="true"
      className={`iso-illustration ${className}`}
      style={style}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none">
        <defs>
          <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0E1230" />
            <stop offset="100%" stopColor="#060818" />
          </linearGradient>
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
          <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--iso-blue)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--iso-blue)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* dark panel */}
        <rect
          x="14"
          y="14"
          width="172"
          height="172"
          rx="22"
          fill={`url(#${id}-panel)`}
        />
        {/* inner glow */}
        <circle cx="100" cy="108" r="78" fill={`url(#${id}-glow)`} />
        {/* dotted orbit */}
        <ellipse
          className="iso-orbit"
          cx="100"
          cy="138"
          rx="68"
          ry="18"
          stroke="var(--iso-lavender)"
          strokeOpacity="0.45"
          strokeDasharray="2 4"
          strokeWidth="1"
        />
        {/* faint horizon grid */}
        <g stroke="var(--iso-blue)" strokeOpacity="0.12" strokeWidth="1">
          <line x1="22" y1="150" x2="178" y2="150" />
          <line x1="22" y1="160" x2="178" y2="160" />
          <line x1="22" y1="140" x2="178" y2="140" />
        </g>

        {renderScene(variant, id)}

        {/* shared floating particles */}
        <circle className="iso-dot iso-dot-a" cx="36" cy="40" r="2" fill="var(--iso-coral)" />
        <circle className="iso-dot iso-dot-b" cx="168" cy="46" r="1.8" fill="var(--iso-mint)" />
        <circle className="iso-dot iso-dot-c" cx="160" cy="160" r="1.6" fill="var(--iso-lavender)" />
        <circle className="iso-dot iso-dot-a" cx="44" cy="170" r="1.4" fill="var(--iso-purple)" />
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

  // reusable iso pedestal
  const pedestal = (
    <g opacity="0.95">
      <path d="M60 130 L100 110 L140 130 L100 150 Z" fill={blue} />
      <path d="M60 130 L60 138 L100 158 L100 150 Z" fill={navy} />
      <path d="M140 130 L140 138 L100 158 L100 150 Z" fill="#1A1F4A" />
    </g>
  );

  switch (v) {
    case "wallet":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            {/* token stack */}
            <ellipse cx="100" cy="98" rx="26" ry="9" fill={coral} />
            <rect x="74" y="92" width="52" height="10" fill="#FF5C46" />
            <ellipse cx="100" cy="92" rx="26" ry="9" fill={coral} />
            <text x="100" y="96" textAnchor="middle" fontSize="11" fontWeight="800" fill={navy}>
              STRK
            </text>
          </g>
          <g className="iso-float-slow">
            <ellipse cx="64" cy="78" rx="14" ry="5" fill={mint} opacity="0.95" />
            <ellipse cx="138" cy="70" rx="12" ry="4.5" fill={blue} opacity="0.95" />
          </g>
        </>
      );
    case "cairo-preview":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="60" y="62" width="80" height="56" rx="6" fill="#10143A" stroke="var(--iso-blue)" strokeOpacity="0.6" />
            <rect x="66" y="70" width="50" height="4" rx="2" fill={mint} />
            <rect x="66" y="80" width="68" height="4" rx="2" fill="#3A3F8A" />
            <rect x="66" y="90" width="40" height="4" rx="2" fill="#3A3F8A" />
            <rect x="66" y="100" width="56" height="4" rx="2" fill={coral} />
            <circle cx="135" cy="72" r="2" fill={coral} />
          </g>
          <g className="iso-float-slow">
            <path d="M48 124 L60 118 L60 126 L48 132 Z" fill={blue} />
            <path d="M140 118 L152 124 L152 132 L140 126 Z" fill={coral} />
          </g>
        </>
      );
    case "permissions":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path
              d="M100 56 L128 68 L128 100 C128 116 100 124 100 124 C100 124 72 116 72 100 L72 68 Z"
              fill={blue}
              stroke={ink}
              strokeOpacity="0.6"
            />
            <path d="M88 92 L96 100 L114 80" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g className="iso-float-slow">
            <circle cx="52" cy="80" r="6" fill={mint} />
            <circle cx="148" cy="84" r="5" fill={coral} />
            <line x1="58" y1="80" x2="72" y2="80" stroke={mint} strokeOpacity="0.5" strokeDasharray="2 2" />
            <line x1="143" y1="84" x2="128" y2="84" stroke={coral} strokeOpacity="0.5" strokeDasharray="2 2" />
          </g>
        </>
      );
    case "signed-release":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="64" y="68" width="72" height="52" rx="4" fill="#13173A" stroke="var(--iso-blue)" strokeOpacity="0.5" />
            <path d="M64 80 L136 80" stroke={ink} strokeOpacity="0.2" />
            <text x="72" y="76" fontSize="6" fill={ink} opacity="0.6" fontFamily="monospace">sha256</text>
            <rect x="72" y="86" width="50" height="3" rx="1" fill={mint} />
            <rect x="72" y="94" width="40" height="3" rx="1" fill="#3A3F8A" />
            <rect x="72" y="102" width="56" height="3" rx="1" fill="#3A3F8A" />
          </g>
          <g className="iso-float-slow">
            <circle cx="140" cy="116" r="14" fill={coral} stroke={ink} strokeOpacity="0.7" />
            <path d="M133 116 L138 121 L148 110" stroke={navy} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </>
      );
    case "local-keys":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <circle cx="86" cy="92" r="14" fill="none" stroke={mint} strokeWidth="3" />
            <rect x="98" y="88" width="34" height="8" rx="1" fill={blue} />
            <rect x="124" y="88" width="3" height="14" fill={blue} />
            <rect x="116" y="88" width="3" height="14" fill={blue} />
          </g>
          <g className="iso-float-slow">
            <rect x="62" y="118" width="76" height="18" rx="3" fill="#10143A" stroke={ink} strokeOpacity="0.3" />
            <circle cx="72" cy="127" r="2" fill={mint} />
            <text x="80" y="130" fontSize="6" fill={ink} opacity="0.7" fontFamily="monospace">local · encrypted</text>
          </g>
        </>
      );
    case "hardware-wallet":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="58" y="84" width="84" height="26" rx="5" fill={blue} />
            <rect x="64" y="90" width="50" height="14" rx="2" fill="#0B0E26" />
            <rect x="118" y="92" width="20" height="3" fill={mint} />
            <rect x="118" y="100" width="14" height="3" fill={coral} />
          </g>
          <g className="iso-float-slow">
            <path d="M40 96 L58 96" stroke={ink} strokeOpacity="0.5" strokeWidth="2" />
            <circle cx="38" cy="96" r="3" fill={coral} />
          </g>
        </>
      );
    case "multi-network":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <circle cx="74" cy="86" r="14" fill={blue} />
            <text x="74" y="89" textAnchor="middle" fontSize="7" fontWeight="700" fill={ink}>MN</text>
            <circle cx="126" cy="86" r="14" fill={coral} />
            <text x="126" y="89" textAnchor="middle" fontSize="7" fontWeight="700" fill={ink}>SP</text>
            <circle cx="100" cy="116" r="14" fill={mint} />
            <text x="100" y="119" textAnchor="middle" fontSize="7" fontWeight="700" fill={navy}>RPC</text>
            <line x1="86" y1="92" x2="114" y2="92" stroke={ink} strokeOpacity="0.4" strokeDasharray="2 3" />
            <line x1="80" y1="98" x2="94" y2="110" stroke={ink} strokeOpacity="0.4" strokeDasharray="2 3" />
            <line x1="120" y1="98" x2="106" y2="110" stroke={ink} strokeOpacity="0.4" strokeDasharray="2 3" />
          </g>
        </>
      );
    case "developer-tools":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="58" y="60" width="84" height="60" rx="6" fill="#0B0F2E" stroke="var(--iso-blue)" strokeOpacity="0.6" />
            <rect x="58" y="60" width="84" height="10" rx="6" fill="#1A1F4A" />
            <circle cx="64" cy="65" r="1.6" fill={coral} />
            <circle cx="69" cy="65" r="1.6" fill={mint} />
            <circle cx="74" cy="65" r="1.6" fill={blue} />
            <text x="64" y="84" fontSize="6" fontFamily="monospace" fill={mint}>$ starknet</text>
            <text x="64" y="94" fontSize="6" fontFamily="monospace" fill={ink} opacity="0.85">› sign --to 0x07f…</text>
            <text x="64" y="104" fontSize="6" fontFamily="monospace" fill={coral}>› preview: transfer()</text>
            <text x="64" y="114" fontSize="6" fontFamily="monospace" fill={ink} opacity="0.6">› ok</text>
          </g>
        </>
      );
    case "security":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path
              d="M100 56 L130 70 L130 102 C130 118 100 128 100 128 C100 128 70 118 70 102 L70 70 Z"
              fill={blue}
            />
            <path
              d="M100 64 L122 74 L122 100 C122 112 100 120 100 120 C100 120 78 112 78 100 L78 74 Z"
              fill={coral}
              opacity="0.85"
            />
            <circle cx="100" cy="96" r="6" fill={ink} />
          </g>
        </>
      );
    case "transactions":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="64" y="70" width="72" height="48" rx="5" fill="#10143A" stroke="var(--iso-blue)" strokeOpacity="0.5" />
            <rect x="70" y="78" width="40" height="4" rx="2" fill={mint} />
            <rect x="70" y="88" width="60" height="4" rx="2" fill="#3A3F8A" />
            <rect x="70" y="98" width="48" height="4" rx="2" fill="#3A3F8A" />
            <rect x="70" y="108" width="44" height="6" rx="2" fill={coral} />
          </g>
          <g className="iso-float-slow">
            <path d="M44 100 L60 100" stroke={mint} strokeWidth="2" />
            <path d="M56 96 L60 100 L56 104" stroke={mint} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </>
      );
    case "no-telemetry":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path d="M60 92 C72 72 128 72 140 92 C128 112 72 112 60 92 Z" fill="none" stroke={ink} strokeWidth="2.5" />
            <circle cx="100" cy="92" r="9" fill={coral} />
            <line x1="56" y1="112" x2="144" y2="72" stroke={coral} strokeWidth="3" strokeLinecap="round" />
          </g>
        </>
      );
    case "open-source":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path d="M82 76 L66 92 L82 108" stroke={mint} strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M118 76 L134 92 L118 108" stroke={mint} strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <line x1="110" y1="68" x2="92" y2="116" stroke={coral} strokeWidth="3" strokeLinecap="round" />
          </g>
        </>
      );
    case "secure-enclave":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="70" y="68" width="60" height="56" rx="6" fill={blue} stroke={ink} strokeOpacity="0.5" />
            <rect x="80" y="78" width="40" height="36" rx="3" fill="#0B0E26" />
            <rect x="86" y="86" width="28" height="4" fill={mint} />
            <rect x="86" y="96" width="20" height="4" fill={coral} />
            <rect x="86" y="106" width="24" height="4" fill="#3A3F8A" />
          </g>
        </>
      );
    case "disclosure":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <circle cx="100" cy="92" r="22" fill={coral} stroke={ink} strokeOpacity="0.6" strokeWidth="2" />
            <rect x="98" y="78" width="4" height="14" rx="1" fill={navy} />
            <circle cx="100" cy="102" r="2.4" fill={navy} />
          </g>
        </>
      );
    default:
      return pedestal;
  }
}
