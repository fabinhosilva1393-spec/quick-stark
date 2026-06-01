import type { CSSProperties } from "react";

export type IsoVariant =
  | "wallet"
  | "cairo"
  | "permissions"
  | "speed"
  | "hardware-wallet"
  | "multi-network"
  | "signed-release"
  | "local-keys"
  | "open-source"
  | "no-telemetry"
  | "secure-enclave"
  | "disclosure"
  | "developer-tools";

type Props = {
  variant: IsoVariant;
  size?: number;
  className?: string;
  delay?: number;
};

/**
 * Original, lightweight isometric-style decorative SVG icons.
 * Pure SVG + CSS animations. Decorative only — always aria-hidden.
 */
export function AnimatedIsoIcon({
  variant,
  size = 56,
  className = "",
  delay = 0,
}: Props) {
  const style: CSSProperties = {
    width: size,
    height: size,
    animationDelay: `${delay}s`,
  };

  return (
    <span
      aria-hidden="true"
      className={`iso-icon ${className}`}
      style={style}
    >
      <svg viewBox="0 0 64 64" width="100%" height="100%" fill="none">
        <defs>
          <linearGradient id={`g-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--iso-blue)" />
            <stop offset="100%" stopColor="var(--iso-purple)" />
          </linearGradient>
          <linearGradient id={`g2-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--iso-coral)" />
            <stop offset="100%" stopColor="var(--iso-blue)" />
          </linearGradient>
        </defs>

        {/* shared orbit */}
        <ellipse
          className="iso-orbit"
          cx="32"
          cy="44"
          rx="22"
          ry="6"
          stroke="var(--iso-blue)"
          strokeOpacity="0.35"
          strokeDasharray="2 3"
          strokeWidth="1"
        />

        {renderVariant(variant)}

        {/* floating particles */}
        <circle className="iso-dot iso-dot-a" cx="10" cy="14" r="1.4" fill="var(--iso-coral)" />
        <circle className="iso-dot iso-dot-b" cx="54" cy="18" r="1.2" fill="var(--iso-mint)" />
        <circle className="iso-dot iso-dot-c" cx="52" cy="50" r="1" fill="var(--iso-purple)" />
      </svg>
    </span>
  );
}

function renderVariant(v: IsoVariant) {
  const grad = `url(#g-${v})`;
  const grad2 = `url(#g2-${v})`;
  const stroke = "var(--ink)";
  const sw = 1.2;

  // base iso card used in most variants
  const baseCard = (
    <g className="iso-float">
      <path
        d="M16 30 L32 22 L48 30 L32 38 Z"
        fill={grad}
        opacity="0.92"
      />
      <path d="M16 30 L16 36 L32 44 L32 38 Z" fill="var(--iso-navy)" opacity="0.85" />
      <path d="M48 30 L48 36 L32 44 L32 38 Z" fill="var(--iso-navy)" opacity="0.7" />
    </g>
  );

  switch (v) {
    case "wallet":
      return (
        <>
          {baseCard}
          <g className="iso-float-slow">
            <circle cx="32" cy="22" r="4" fill={grad2} stroke={stroke} strokeWidth={sw} />
            <text x="32" y="25" textAnchor="middle" fontSize="6" fontWeight="700" fill="var(--iso-navy)">
              S
            </text>
          </g>
        </>
      );
    case "cairo":
      return (
        <>
          <g className="iso-float">
            <path d="M14 32 L32 22 L50 32 L32 42 Z" fill={grad} opacity="0.9" />
            <path d="M22 30 L32 25 L42 30 L32 35 Z" fill="var(--iso-mint)" opacity="0.8" />
            <path d="M14 32 L14 36 L32 46 L32 42 Z" fill="var(--iso-navy)" opacity="0.8" />
            <path d="M50 32 L50 36 L32 46 L32 42 Z" fill="var(--iso-navy)" opacity="0.65" />
          </g>
        </>
      );
    case "permissions":
      return (
        <>
          {baseCard}
          <g className="iso-float-slow">
            <path
              d="M32 14 L38 17 L38 24 C38 28 32 30 32 30 C32 30 26 28 26 24 L26 17 Z"
              fill={grad2}
              stroke={stroke}
              strokeWidth={sw}
            />
          </g>
        </>
      );
    case "speed":
      return (
        <>
          {baseCard}
          <g className="iso-float-slow">
            <path
              d="M34 14 L26 26 L31 26 L28 34 L38 22 L33 22 Z"
              fill={grad2}
              stroke={stroke}
              strokeWidth={sw}
            />
          </g>
        </>
      );
    case "hardware-wallet":
      return (
        <>
          {baseCard}
          <g className="iso-float-slow">
            <circle cx="28" cy="20" r="3" fill="none" stroke={stroke} strokeWidth={sw} />
            <rect x="30" y="19" width="10" height="2" fill={grad2} />
            <rect x="38" y="17" width="2" height="2" fill={stroke} />
            <rect x="38" y="21" width="2" height="2" fill={stroke} />
          </g>
        </>
      );
    case "multi-network":
      return (
        <>
          <g className="iso-float">
            <path d="M16 32 L28 26 L40 32 L28 38 Z" fill={grad} opacity="0.85" />
            <path d="M24 28 L36 22 L48 28 L36 34 Z" fill={grad2} opacity="0.85" />
          </g>
          <g className="iso-float-slow">
            <circle cx="22" cy="18" r="1.6" fill="var(--iso-blue)" />
            <circle cx="42" cy="16" r="1.6" fill="var(--iso-purple)" />
            <line x1="22" y1="18" x2="42" y2="16" stroke="var(--iso-blue)" strokeOpacity="0.4" strokeDasharray="1 2" />
          </g>
        </>
      );
    case "signed-release":
      return (
        <>
          {baseCard}
          <g className="iso-float-slow">
            <path
              d="M32 14 L38 17 L38 24 C38 28 32 30 32 30 C32 30 26 28 26 24 L26 17 Z"
              fill={grad2}
              opacity="0.95"
            />
            <path d="M29 22 L31 24 L36 19" stroke="var(--iso-navy)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </>
      );
    case "local-keys":
      return (
        <>
          {baseCard}
          <g className="iso-float-slow">
            <circle cx="28" cy="22" r="3" fill="none" stroke={stroke} strokeWidth={sw} />
            <path d="M31 22 L40 22 L40 25 M37 22 L37 25" stroke={stroke} strokeWidth={sw} fill="none" />
          </g>
        </>
      );
    case "open-source":
      return (
        <>
          {baseCard}
          <g className="iso-float-slow">
            <path d="M26 20 L22 24 L26 28" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
            <path d="M38 20 L42 24 L38 28" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
            <line x1="34" y1="18" x2="30" y2="30" stroke={grad2 as unknown as string} strokeWidth={sw} strokeLinecap="round" />
          </g>
        </>
      );
    case "no-telemetry":
      return (
        <>
          {baseCard}
          <g className="iso-float-slow">
            <path
              d="M22 24 C26 18 38 18 42 24 C38 30 26 30 22 24 Z"
              fill="none"
              stroke={stroke}
              strokeWidth={sw}
            />
            <circle cx="32" cy="24" r="2.2" fill={grad2} />
            <line x1="22" y1="28" x2="42" y2="20" stroke="var(--iso-coral)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        </>
      );
    case "secure-enclave":
      return (
        <>
          {baseCard}
          <g className="iso-float-slow">
            <rect x="26" y="16" width="12" height="12" rx="2" fill={grad2} stroke={stroke} strokeWidth={sw} />
            <rect x="29" y="19" width="6" height="6" fill="var(--iso-navy)" />
          </g>
        </>
      );
    case "disclosure":
      return (
        <>
          {baseCard}
          <g className="iso-float-slow">
            <circle cx="32" cy="22" r="6" fill={grad2} stroke={stroke} strokeWidth={sw} />
            <text x="32" y="25" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--iso-navy)">!</text>
          </g>
        </>
      );
    case "developer-tools":
      return (
        <>
          <g className="iso-float">
            <path d="M14 30 L32 22 L50 30 L32 38 Z" fill={grad} opacity="0.9" />
            <path d="M20 28 L32 23 L44 28 L32 33 Z" fill={grad2} opacity="0.85" />
            <path d="M14 30 L14 36 L32 46 L32 38 Z" fill="var(--iso-navy)" opacity="0.85" />
            <path d="M50 30 L50 36 L32 46 L32 38 Z" fill="var(--iso-navy)" opacity="0.7" />
          </g>
          <g className="iso-float-slow">
            <path d="M26 18 L22 22 L26 26" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
            <path d="M38 18 L42 22 L38 26" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" />
          </g>
        </>
      );
    default:
      return baseCard;
  }
}
