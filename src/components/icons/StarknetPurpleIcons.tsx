import type { SVGProps } from "react";

export type PurpleIconName =
  | "monitor"
  | "eye"
  | "hard-drive"
  | "network"
  | "cpu"
  | "key"
  | "arrow-down"
  | "shield"
  | "book"
  | "download"
  | "file"
  | "apple"
  | "terminal"
  | "wallet"
  | "coins"
  | "tag";

type Props = {
  name: PurpleIconName;
  size?: number;
  className?: string;
  title?: string;
} & Omit<SVGProps<SVGSVGElement>, "name">;

/**
 * Custom Starknet-inspired purple line-art icon set.
 * Thin lavender/violet strokes with subtle node accents and a soft purple
 * gradient highlight. Drop-in replacement for lucide icons in card grids.
 */
export function PurpleIcon({
  name,
  size = 20,
  className,
  title,
  ...rest
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`purple-icon ${className ?? ""}`}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={`pi-grad-${name}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="55%" stopColor="#B65CFF" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <radialGradient id={`pi-glow-${name}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B65CFF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#B65CFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill={`url(#pi-glow-${name})`} stroke="none" />
      <g stroke={`url(#pi-grad-${name})`}>
        {renderShape(name)}
      </g>
    </svg>
  );
}

function renderShape(name: PurpleIconName) {
  switch (name) {
    case "monitor":
      return (
        <>
          <rect x="3" y="4.5" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16.5V20" />
          <path d="M6 8h6M6 11h10" strokeOpacity="0.55" />
          <circle cx="18" cy="8" r="0.7" fill="#C4B5FD" stroke="none" />
        </>
      );
    case "eye":
      return (
        <>
          <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
          <circle cx="12" cy="12" r="2.8" />
          <circle cx="12" cy="12" r="1" fill="#C4B5FD" stroke="none" />
        </>
      );
    case "hard-drive":
      return (
        <>
          <rect x="3" y="6" width="18" height="5" rx="1.5" />
          <rect x="3" y="13" width="18" height="5" rx="1.5" />
          <path d="M6.5 8.5h.01M6.5 15.5h.01" />
          <circle cx="17" cy="8.5" r="0.7" fill="#C4B5FD" stroke="none" />
          <circle cx="17" cy="15.5" r="0.7" fill="#C4B5FD" stroke="none" />
        </>
      );
    case "network":
      return (
        <>
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="18" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M12 7v3M12 10 6 16M12 10l6 6" />
          <circle cx="12" cy="10" r="0.6" fill="#C4B5FD" stroke="none" />
        </>
      );
    case "cpu":
      return (
        <>
          <rect x="6" y="6" width="12" height="12" rx="1.5" />
          <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" />
          <path d="M9 3v2M12 3v2M15 3v2M9 19v2M12 19v2M15 19v2M3 9h2M3 12h2M3 15h2M19 9h2M19 12h2M19 15h2" strokeOpacity="0.75" />
        </>
      );
    case "key":
      return (
        <>
          <circle cx="8" cy="12" r="3.2" />
          <path d="M11.2 12H20M17 12v3M14.5 12v2.2" />
          <circle cx="8" cy="12" r="1" fill="#C4B5FD" stroke="none" />
        </>
      );
    case "arrow-down":
      return (
        <>
          <path d="M12 4v12" />
          <path d="m7 11 5 5 5-5" />
          <path d="M5 20h14" strokeOpacity="0.6" />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M12 3 4.5 6v5.5c0 4.4 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5.1 7.5-9.5V6L12 3Z" />
          <path d="m9 12 2.2 2.2L15.5 10" />
        </>
      );
    case "book":
      return (
        <>
          <path d="M4 5.5A2 2 0 0 1 6 3.5h6v15H6a2 2 0 0 1-2-2v-11Z" />
          <path d="M20 5.5a2 2 0 0 0-2-2h-6v15h6a2 2 0 0 0 2-2v-11Z" />
          <path d="M7 7h2.5M7 10h2.5M14.5 7H17M14.5 10H17" strokeOpacity="0.55" />
        </>
      );
    case "download":
      return (
        <>
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M4 19h16" />
        </>
      );
    case "file":
      return (
        <>
          <path d="M7 3h7l4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v4h4" />
          <path d="M8 13h8M8 16h6" strokeOpacity="0.6" />
        </>
      );
    case "apple":
      return (
        <>
          <path d="M16.5 13.5c0-2.6 2.2-3.8 2.3-3.9-1.3-1.8-3.2-2-3.9-2-1.7-.2-3.2.9-4 .9s-2.2-.9-3.6-.9c-1.8 0-3.5 1.1-4.4 2.7-1.9 3.3-.5 8.2 1.3 10.9.9 1.3 2 2.8 3.4 2.7 1.4-.1 1.9-.9 3.5-.9s2.1.9 3.5.8c1.5 0 2.4-1.3 3.3-2.7 1.1-1.6 1.5-3.1 1.5-3.2 0 0-2.9-1.1-2.9-4.4Z" transform="scale(0.78) translate(3 1)" />
          <path d="M14 5.5c.6-.7 1-1.7.9-2.8-.9 0-1.9.6-2.6 1.4-.5.6-1 1.6-.9 2.6 1 .1 2-.5 2.6-1.2Z" />
        </>
      );
    case "terminal":
      return (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m7 10 2.5 2L7 14" />
          <path d="M12.5 14.5H17" />
        </>
      );
    case "wallet":
      return (
        <>
          <path d="M4 7.5A2 2 0 0 1 6 5.5h11a1.5 1.5 0 0 1 1.5 1.5v1.5" />
          <rect x="3" y="7.5" width="18" height="11" rx="2" />
          <circle cx="17" cy="13" r="1.3" fill="#C4B5FD" stroke="none" />
        </>
      );
    case "coins":
      return (
        <>
          <ellipse cx="9" cy="8" rx="5.5" ry="2.5" />
          <path d="M3.5 8v3.5c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V8" />
          <ellipse cx="15" cy="15" rx="5.5" ry="2.5" />
          <path d="M9.5 15v3.5c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V15" />
        </>
      );
    case "tag":
      return (
        <>
          <path d="M3 12V4h8l10 10-8 8L3 12Z" />
          <circle cx="8" cy="8" r="1.3" fill="#C4B5FD" stroke="none" />
        </>
      );
  }
}

export type PurpleIconComponent = React.ComponentType<{
  size?: number;
  className?: string;
}>;

const cache = new Map<PurpleIconName, PurpleIconComponent>();

/** Build a stable component bound to a name — drop-in for LucideIcon. */
export function purpleIcon(name: PurpleIconName): PurpleIconComponent {
  const cached = cache.get(name);
  if (cached) return cached;
  const C: PurpleIconComponent = ({ size, className }) => (
    <PurpleIcon name={name} size={size} className={className} />
  );
  cache.set(name, C);
  return C;
}
