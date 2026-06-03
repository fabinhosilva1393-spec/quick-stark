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
  | "disclosure"
  // expanded unique variants
  | "checksum-hash"
  | "desktop-window"
  | "review-eye"
  | "vault-disk"
  | "network-globe"
  | "calldata-panel"
  | "ledger-device"
  | "import-arrow"
  | "key-vault"
  | "policy-graph"
  | "network-toggle"
  | "getting-started-book"
  | "install-package"
  | "verification-shield"
  | "function-nodes"
  | "smart-account-hub"
  | "troubleshoot-spanner"
  | "apple-desktop"
  | "windows-monitor"
  | "linux-terminal"
  | "hardware-nano"
  | "trezor-device"
  | "wallet-argent"
  | "wallet-braavos"
  | "wallet-ready"
  | "coin-stack"
  | "code-brackets"
  | "signer-tree"
  | "network-constellation"
  | "approval-path"
  | "release-tag";

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
    case "checksum-hash":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="50" y="62" width="100" height="58" rx="6" fill={blue} />
            <text x="58" y="80" fontSize="7" fontFamily="monospace" fill={mint}>SHA256</text>
            <text x="58" y="94" fontSize="6" fontFamily="monospace" fill={ink} opacity="0.85">9a2f · c41e · 06bb</text>
            <text x="58" y="106" fontSize="6" fontFamily="monospace" fill={ink} opacity="0.6">e8d3 · 22a7 · 9c10</text>
            <circle cx="138" cy="76" r="9" fill={coral} />
            <path d="M133 76 L137 80 L143 73" stroke={navy} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </>
      );
    case "desktop-window":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="48" y="54" width="104" height="70" rx="6" fill={blue} />
            <rect x="48" y="54" width="104" height="12" rx="6" fill="#1A1F4A" />
            <circle cx="56" cy="60" r="2" fill={coral} />
            <circle cx="64" cy="60" r="2" fill={mint} />
            <circle cx="72" cy="60" r="2" fill={ink} opacity="0.6" />
            <rect x="58" y="78" width="84" height="6" rx="2" fill={ink} opacity="0.4" />
            <rect x="58" y="92" width="60" height="6" rx="2" fill={mint} />
            <rect x="58" y="106" width="44" height="6" rx="2" fill={coral} />
          </g>
        </>
      );
    case "review-eye":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path d="M46 92 C62 60 138 60 154 92 C138 124 62 124 46 92 Z" fill={blue} />
            <circle cx="100" cy="92" r="20" fill={navy} />
            <circle cx="100" cy="92" r="14" fill={coral} />
            <circle cx="106" cy="86" r="4" fill={ink} />
          </g>
          <g className="iso-float-slow">
            <line x1="34" y1="60" x2="44" y2="68" stroke={mint} strokeWidth="2" />
            <line x1="166" y1="60" x2="156" y2="68" stroke={mint} strokeWidth="2" />
          </g>
        </>
      );
    case "vault-disk":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <ellipse cx="100" cy="76" rx="42" ry="14" fill={blue} />
            <rect x="58" y="76" width="84" height="28" fill={blue} />
            <ellipse cx="100" cy="104" rx="42" ry="14" fill="#1A1F4A" />
            <circle cx="100" cy="92" r="9" fill={navy} stroke={coral} strokeWidth="2" />
            <rect x="98" y="88" width="4" height="8" rx="1" fill={coral} />
          </g>
        </>
      );
    case "network-globe":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <circle cx="100" cy="88" r="34" fill={blue} />
            <ellipse cx="100" cy="88" rx="34" ry="12" fill="none" stroke={ink} strokeOpacity="0.55" />
            <ellipse cx="100" cy="88" rx="20" ry="34" fill="none" stroke={ink} strokeOpacity="0.45" />
            <line x1="66" y1="88" x2="134" y2="88" stroke={ink} strokeOpacity="0.55" />
            <circle cx="84" cy="78" r="2.6" fill={coral} />
            <circle cx="116" cy="96" r="2.6" fill={mint} />
          </g>
        </>
      );
    case "calldata-panel":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="50" y="58" width="100" height="68" rx="4" fill={navy} stroke={blue} />
            <text x="58" y="74" fontSize="6" fontFamily="monospace" fill={mint}>selector: transfer</text>
            <text x="58" y="86" fontSize="6" fontFamily="monospace" fill={ink} opacity="0.85">to: 0x06a…2f</text>
            <text x="58" y="98" fontSize="6" fontFamily="monospace" fill={ink} opacity="0.85">amount: 1.0 STRK</text>
            <rect x="58" y="106" width="60" height="6" rx="2" fill={coral} />
            <rect x="58" y="116" width="40" height="4" rx="2" fill={mint} />
          </g>
        </>
      );
    case "ledger-device":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="40" y="84" width="120" height="22" rx="5" fill={blue} />
            <rect x="48" y="88" width="70" height="14" rx="2" fill={navy} />
            <text x="54" y="99" fontSize="7" fontFamily="monospace" fill={mint}>SIGN ›</text>
            <circle cx="138" cy="95" r="4" fill={coral} />
            <circle cx="150" cy="95" r="4" fill={ink} opacity="0.5" />
          </g>
          <g className="iso-float-slow">
            <path d="M20 95 L40 95" stroke={ink} strokeOpacity="0.6" strokeWidth="2" />
          </g>
        </>
      );
    case "import-arrow":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="80" y="74" width="64" height="40" rx="4" fill={blue} />
            <rect x="80" y="74" width="64" height="10" rx="4" fill="#1A1F4A" />
            <rect x="86" y="90" width="42" height="4" rx="1" fill={ink} opacity="0.5" />
            <rect x="86" y="100" width="32" height="4" rx="1" fill={mint} />
          </g>
          <g className="iso-float-slow">
            <path d="M40 94 L74 94" stroke={coral} strokeWidth="4" strokeLinecap="round" />
            <path d="M66 86 L74 94 L66 102" stroke={coral} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </>
      );
    case "key-vault":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="58" y="58" width="84" height="70" rx="6" fill={blue} />
            <circle cx="100" cy="92" r="18" fill="none" stroke={coral} strokeWidth="3" />
            <circle cx="100" cy="92" r="5" fill={coral} />
            <rect x="98" y="92" width="4" height="14" fill={coral} />
            <rect x="65" y="65" width="6" height="6" fill={mint} />
            <rect x="129" y="65" width="6" height="6" fill={mint} />
            <rect x="65" y="115" width="6" height="6" fill={mint} />
            <rect x="129" y="115" width="6" height="6" fill={mint} />
          </g>
        </>
      );
    case "policy-graph":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <circle cx="100" cy="60" r="12" fill={coral} />
            <circle cx="62" cy="100" r="10" fill={blue} />
            <circle cx="138" cy="100" r="10" fill={blue} />
            <circle cx="84" cy="124" r="8" fill={mint} />
            <circle cx="116" cy="124" r="8" fill={mint} />
            <line x1="100" y1="72" x2="62" y2="100" stroke={ink} strokeOpacity="0.55" strokeDasharray="2 3" />
            <line x1="100" y1="72" x2="138" y2="100" stroke={ink} strokeOpacity="0.55" strokeDasharray="2 3" />
            <line x1="62" y1="110" x2="84" y2="124" stroke={ink} strokeOpacity="0.45" strokeDasharray="2 3" />
            <line x1="138" y1="110" x2="116" y2="124" stroke={ink} strokeOpacity="0.45" strokeDasharray="2 3" />
          </g>
        </>
      );
    case "network-toggle":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="46" y="78" width="108" height="32" rx="16" fill={navy} stroke={blue} />
            <circle cx="66" cy="94" r="12" fill={blue} />
            <text x="66" y="97" textAnchor="middle" fontSize="7" fontWeight="800" fill={ink}>MN</text>
            <circle cx="134" cy="94" r="12" fill={coral} />
            <text x="134" y="97" textAnchor="middle" fontSize="7" fontWeight="800" fill={ink}>SP</text>
            <path d="M82 94 L118 94" stroke={mint} strokeWidth="2" strokeDasharray="3 3" />
          </g>
        </>
      );
    case "getting-started-book":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path d="M52 70 L100 60 L100 122 L52 132 Z" fill={blue} />
            <path d="M148 70 L100 60 L100 122 L148 132 Z" fill={coral} />
            <line x1="100" y1="60" x2="100" y2="122" stroke={ink} strokeOpacity="0.7" />
            <line x1="62" y1="86" x2="92" y2="80" stroke={ink} strokeOpacity="0.55" />
            <line x1="62" y1="98" x2="92" y2="92" stroke={ink} strokeOpacity="0.45" />
            <line x1="108" y1="80" x2="138" y2="86" stroke={ink} strokeOpacity="0.55" />
            <line x1="108" y1="92" x2="138" y2="98" stroke={ink} strokeOpacity="0.45" />
          </g>
        </>
      );
    case "install-package":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path d="M100 60 L148 80 L148 116 L100 136 L52 116 L52 80 Z" fill={blue} />
            <path d="M100 60 L148 80 L100 100 L52 80 Z" fill="#1A1F4A" opacity="0.85" />
            <path d="M100 100 L100 136" stroke={ink} strokeOpacity="0.4" />
            <rect x="92" y="74" width="16" height="14" fill={coral} />
          </g>
          <g className="iso-float-slow">
            <path d="M100 36 L100 56" stroke={mint} strokeWidth="3" />
            <path d="M94 50 L100 56 L106 50" stroke={mint} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </>
      );
    case "verification-shield":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path d="M100 44 L138 60 L138 100 C138 118 100 130 100 130 C100 130 62 118 62 100 L62 60 Z" fill={blue} />
            <circle cx="100" cy="88" r="14" fill="none" stroke={coral} strokeWidth="3" />
            <line x1="110" y1="98" x2="120" y2="108" stroke={coral} strokeWidth="3" strokeLinecap="round" />
          </g>
        </>
      );
    case "function-nodes":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="46" y="64" width="36" height="22" rx="4" fill={blue} />
            <text x="64" y="78" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={ink}>fn()</text>
            <rect x="118" y="64" width="36" height="22" rx="4" fill={coral} />
            <text x="136" y="78" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={navy}>arg</text>
            <rect x="82" y="104" width="36" height="22" rx="4" fill={mint} />
            <text x="100" y="118" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={navy}>ret</text>
            <line x1="82" y1="86" x2="100" y2="104" stroke={ink} strokeOpacity="0.55" strokeDasharray="2 3" />
            <line x1="118" y1="86" x2="100" y2="104" stroke={ink} strokeOpacity="0.55" strokeDasharray="2 3" />
          </g>
        </>
      );
    case "smart-account-hub":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <circle cx="100" cy="92" r="22" fill={blue} />
            <text x="100" y="96" textAnchor="middle" fontSize="9" fontWeight="800" fill={ink}>SA</text>
            <circle cx="56" cy="58" r="8" fill={coral} />
            <circle cx="144" cy="58" r="8" fill={mint} />
            <circle cx="56" cy="126" r="8" fill={mint} />
            <circle cx="144" cy="126" r="8" fill={coral} />
            <line x1="80" y1="78" x2="56" y2="58" stroke={ink} strokeOpacity="0.55" strokeDasharray="2 3" />
            <line x1="120" y1="78" x2="144" y2="58" stroke={ink} strokeOpacity="0.55" strokeDasharray="2 3" />
            <line x1="80" y1="106" x2="56" y2="126" stroke={ink} strokeOpacity="0.55" strokeDasharray="2 3" />
            <line x1="120" y1="106" x2="144" y2="126" stroke={ink} strokeOpacity="0.55" strokeDasharray="2 3" />
          </g>
        </>
      );
    case "troubleshoot-spanner":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="60" y="60" width="80" height="56" rx="4" fill={blue} />
            <rect x="68" y="70" width="64" height="4" fill={ink} opacity="0.4" />
            <rect x="68" y="80" width="46" height="4" fill={ink} opacity="0.4" />
            <circle cx="120" cy="104" r="10" fill={coral} />
            <path d="M114 110 L128 96" stroke={navy} strokeWidth="3" strokeLinecap="round" />
            <path d="M70 110 L78 102 L86 110 L82 116 L74 116 Z" fill={mint} />
          </g>
        </>
      );
    case "apple-desktop":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="48" y="50" width="104" height="62" rx="6" fill={blue} />
            <rect x="56" y="58" width="88" height="46" rx="2" fill={navy} />
            <circle cx="100" cy="68" r="3" fill={mint} />
            <rect x="60" y="78" width="60" height="3" fill={ink} opacity="0.5" />
            <rect x="60" y="86" width="46" height="3" fill={ink} opacity="0.5" />
            <rect x="60" y="94" width="40" height="3" fill={coral} />
            <rect x="86" y="112" width="28" height="6" rx="1" fill={blue} />
            <rect x="76" y="118" width="48" height="4" rx="1" fill="#1A1F4A" />
          </g>
        </>
      );
    case "windows-monitor":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="44" y="50" width="112" height="66" rx="4" fill={blue} />
            <rect x="50" y="56" width="100" height="54" rx="2" fill={navy} />
            <rect x="56" y="62" width="42" height="20" fill={coral} opacity="0.85" />
            <rect x="102" y="62" width="42" height="20" fill={mint} opacity="0.85" />
            <rect x="56" y="86" width="42" height="20" fill={ink} opacity="0.55" />
            <rect x="102" y="86" width="42" height="20" fill={blue} />
            <rect x="92" y="116" width="16" height="6" fill="#1A1F4A" />
          </g>
        </>
      );
    case "linux-terminal":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="48" y="54" width="104" height="72" rx="4" fill={navy} stroke={blue} />
            <rect x="48" y="54" width="104" height="12" fill={blue} />
            <text x="56" y="82" fontSize="7" fontFamily="monospace" fill={mint}>user@linux:~$</text>
            <text x="56" y="94" fontSize="7" fontFamily="monospace" fill={ink}>./starknet sign</text>
            <rect x="56" y="100" width="6" height="7" fill={coral} />
            <text x="56" y="118" fontSize="7" fontFamily="monospace" fill={ink} opacity="0.5">› ready</text>
          </g>
        </>
      );
    case "hardware-nano":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="64" y="76" width="72" height="36" rx="6" fill={blue} />
            <rect x="72" y="84" width="44" height="20" rx="2" fill={navy} />
            <text x="94" y="98" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={mint}>NANO</text>
            <circle cx="126" cy="94" r="3" fill={coral} />
          </g>
          <g className="iso-float-slow">
            <rect x="40" y="92" width="22" height="6" rx="1" fill={ink} opacity="0.6" />
          </g>
        </>
      );
    case "trezor-device":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="72" y="60" width="56" height="76" rx="8" fill={blue} />
            <rect x="80" y="68" width="40" height="32" rx="2" fill={navy} />
            <path d="M86 84 L94 92 L114 76" stroke={mint} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="92" cy="116" r="5" fill={coral} />
            <circle cx="108" cy="116" r="5" fill={ink} opacity="0.45" />
          </g>
        </>
      );
    case "wallet-argent":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="50" y="68" width="100" height="56" rx="6" fill={coral} />
            <rect x="50" y="68" width="100" height="14" rx="6" fill="#FF5C46" />
            <path d="M82 100 L100 80 L118 100 L110 100 L100 88 L90 100 Z" fill={ink} />
            <rect x="60" y="110" width="30" height="4" rx="1" fill={ink} opacity="0.65" />
            <rect x="60" y="118" width="22" height="3" rx="1" fill={ink} opacity="0.45" />
          </g>
        </>
      );
    case "wallet-braavos":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="50" y="68" width="100" height="56" rx="6" fill={blue} />
            <path d="M76 86 L100 76 L124 86 L124 104 C124 114 100 120 100 120 C100 120 76 114 76 104 Z" fill={coral} />
            <text x="100" y="104" textAnchor="middle" fontSize="11" fontWeight="800" fill={navy}>B</text>
          </g>
        </>
      );
    case "wallet-ready":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="50" y="68" width="100" height="56" rx="6" fill={mint} />
            <circle cx="76" cy="96" r="9" fill={navy} />
            <circle cx="100" cy="96" r="9" fill={navy} />
            <circle cx="124" cy="96" r="9" fill={navy} />
            <path d="M71 96 L75 100 L83 92" stroke={mint} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M95 96 L99 100 L107 92" stroke={mint} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M119 96 L123 100 L131 92" stroke={mint} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </>
      );
    case "coin-stack":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <ellipse cx="100" cy="124" rx="32" ry="10" fill="#1A1F4A" />
            <rect x="68" y="108" width="64" height="16" fill={blue} />
            <ellipse cx="100" cy="108" rx="32" ry="10" fill={blue} />
            <rect x="68" y="92" width="64" height="16" fill={coral} />
            <ellipse cx="100" cy="92" rx="32" ry="10" fill={coral} />
            <rect x="68" y="76" width="64" height="16" fill={mint} />
            <ellipse cx="100" cy="76" rx="32" ry="10" fill={mint} />
            <text x="100" y="80" textAnchor="middle" fontSize="10" fontWeight="800" fill={navy}>STRK</text>
          </g>
        </>
      );
    case "code-brackets":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path d="M68 60 L48 92 L68 124" stroke={coral} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M132 60 L152 92 L132 124" stroke={mint} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="82" y="78" width="36" height="4" rx="1" fill={ink} opacity="0.7" />
            <rect x="82" y="90" width="28" height="4" rx="1" fill={ink} opacity="0.5" />
            <rect x="82" y="102" width="34" height="4" rx="1" fill={blue} />
          </g>
        </>
      );
    case "signer-tree":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="84" y="50" width="32" height="20" rx="3" fill={blue} />
            <text x="100" y="64" textAnchor="middle" fontSize="8" fontWeight="800" fill={ink}>ROOT</text>
            <rect x="46" y="92" width="32" height="20" rx="3" fill={coral} />
            <rect x="84" y="92" width="32" height="20" rx="3" fill={mint} />
            <rect x="122" y="92" width="32" height="20" rx="3" fill={coral} />
            <line x1="100" y1="70" x2="62" y2="92" stroke={ink} strokeOpacity="0.55" />
            <line x1="100" y1="70" x2="100" y2="92" stroke={ink} strokeOpacity="0.55" />
            <line x1="100" y1="70" x2="138" y2="92" stroke={ink} strokeOpacity="0.55" />
          </g>
        </>
      );
    case "network-constellation":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <circle cx="60" cy="62" r="5" fill={coral} />
            <circle cx="100" cy="50" r="6" fill={mint} />
            <circle cx="140" cy="68" r="5" fill={blue} />
            <circle cx="74" cy="100" r="5" fill={blue} />
            <circle cx="126" cy="104" r="5" fill={coral} />
            <circle cx="100" cy="124" r="6" fill={mint} />
            <line x1="60" y1="62" x2="100" y2="50" stroke={ink} strokeOpacity="0.4" />
            <line x1="100" y1="50" x2="140" y2="68" stroke={ink} strokeOpacity="0.4" />
            <line x1="60" y1="62" x2="74" y2="100" stroke={ink} strokeOpacity="0.4" />
            <line x1="140" y1="68" x2="126" y2="104" stroke={ink} strokeOpacity="0.4" />
            <line x1="74" y1="100" x2="100" y2="124" stroke={ink} strokeOpacity="0.4" />
            <line x1="126" y1="104" x2="100" y2="124" stroke={ink} strokeOpacity="0.4" />
            <line x1="74" y1="100" x2="126" y2="104" stroke={ink} strokeOpacity="0.3" strokeDasharray="2 3" />
          </g>
        </>
      );
    case "approval-path":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <circle cx="50" cy="92" r="10" fill={blue} />
            <circle cx="100" cy="92" r="10" fill={mint} />
            <circle cx="150" cy="92" r="10" fill={coral} />
            <path d="M60 92 L90 92" stroke={ink} strokeOpacity="0.6" strokeWidth="2" />
            <path d="M110 92 L140 92" stroke={ink} strokeOpacity="0.6" strokeWidth="2" />
            <path d="M46 92 L49 95 L55 88" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M96 92 L99 95 L105 88" stroke={navy} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M146 92 L149 95 L155 88" stroke={navy} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="40" y="108" width="120" height="14" rx="3" fill={navy} stroke={blue} strokeOpacity="0.5" />
            <text x="100" y="118" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={ink}>approve · review · sign</text>
          </g>
        </>
      );
    case "release-tag":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <path d="M50 70 L114 70 L142 96 L114 122 L50 122 Z" fill={coral} />
            <circle cx="66" cy="96" r="5" fill={navy} />
            <text x="86" y="100" fontSize="11" fontWeight="800" fill={navy}>v1.0.0</text>
          </g>
          <g className="iso-float-slow">
            <rect x="42" y="60" width="24" height="6" rx="1" fill={mint} />
            <rect x="42" y="128" width="20" height="5" rx="1" fill={blue} />
          </g>
        </>
      );
    case "workflow-preview":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="54" y="60" width="92" height="64" rx="4" fill={blue} />
            <rect x="62" y="72" width="60" height="4" fill={mint} />
            <rect x="62" y="82" width="48" height="4" fill={ink} opacity="0.5" />
            <rect x="62" y="92" width="54" height="4" fill={ink} opacity="0.5" />
            <circle cx="128" cy="116" r="12" fill="none" stroke={coral} strokeWidth="3" />
            <line x1="137" y1="125" x2="146" y2="134" stroke={coral} strokeWidth="3" strokeLinecap="round" />
          </g>
        </>
      );
    case "workflow-stamp":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <circle cx="100" cy="92" r="34" fill="none" stroke={coral} strokeWidth="4" />
            <path d="M82 92 L96 106 L122 78" stroke={mint} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="60" y="120" width="80" height="6" rx="2" fill={blue} />
          </g>
        </>
      );
    case "workflow-ledger":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="54" y="58" width="92" height="68" rx="4" fill={navy} stroke={blue} />
            <rect x="54" y="58" width="92" height="12" fill={blue} />
            <text x="62" y="84" fontSize="6" fontFamily="monospace" fill={mint}>0x07f…c4</text>
            <text x="62" y="96" fontSize="6" fontFamily="monospace" fill={ink} opacity="0.7">approve(1.0)</text>
            <text x="62" y="108" fontSize="6" fontFamily="monospace" fill={coral}>› signed ✓</text>
            <rect x="62" y="114" width="40" height="5" rx="1" fill={mint} />
          </g>
        </>
      );
    case "workflow-vault":
      return (
        <>
          {pedestal}
          <g className="iso-float">
            <rect x="58" y="60" width="84" height="68" rx="6" fill={blue} />
            <circle cx="100" cy="94" r="20" fill="none" stroke={mint} strokeWidth="3" />
            <circle cx="100" cy="94" r="6" fill={coral} />
            <rect x="98" y="94" width="4" height="14" fill={coral} />
            <rect x="68" y="70" width="14" height="4" fill={ink} opacity="0.4" />
            <rect x="118" y="70" width="14" height="4" fill={ink} opacity="0.4" />
          </g>
        </>
      );
    default:
      return pedestal;
  }
}
