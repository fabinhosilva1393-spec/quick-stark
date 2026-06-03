import type { ReactNode } from "react";

export type DocsArtVariant =
  // Introduction
  | "intro-product"
  | "intro-desktop"
  | "intro-local-key"
  | "intro-clear-signing"
  // Managing Accounts
  | "accounts-overview"
  | "accounts-multi"
  | "accounts-network"
  | "accounts-local"
  // Smart-Account Permissions
  | "perm-session"
  | "perm-spending"
  | "perm-signer"
  | "perm-approval"
  // Hardware Wallet
  | "hw-ledger"
  | "hw-trezor"
  | "hw-smart-account"
  | "hw-external-signer"
  | "hw-ready"
  // Advanced Tools
  | "tool-calldata"
  | "tool-permission"
  | "tool-activity"
  | "tool-build-verify"
  | "tool-multi-network"
  | "tool-hw-status"
  // Resources
  | "res-github"
  | "res-guides"
  | "res-security"
  | "res-download"
  | "res-contact";

type Props = {
  variant: DocsArtVariant;
  className?: string;
  size?: number;
};

/**
 * StarknetWallet docs illustration system.
 * Each variant renders a unique floating object on a shared purple
 * platform/glow base, with thin neon line details, soft particles, and
 * a transparent canvas — designed for the dark Starknet visual system.
 */
export function DocsArt({ variant, className, size = 120 }: Props) {
  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 140 140"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="docs-glow" cx="50%" cy="62%" r="55%">
            <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#2F5BFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#070816" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="docs-platform" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B2A8C" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#7B61FF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3B2A8C" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="docs-panel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A1F4A" />
            <stop offset="100%" stopColor="#0B0D24" />
          </linearGradient>
          <linearGradient id="docs-brand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2F5BFF" />
            <stop offset="100%" stopColor="#7B61FF" />
          </linearGradient>
          <linearGradient id="docs-cyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3DD8FF" />
            <stop offset="100%" stopColor="#7B61FF" />
          </linearGradient>
        </defs>

        {/* Glow */}
        <ellipse cx="70" cy="92" rx="58" ry="34" fill="url(#docs-glow)" />
        {/* Platform */}
        <ellipse cx="70" cy="108" rx="46" ry="6" fill="url(#docs-platform)" />
        <ellipse
          cx="70"
          cy="108"
          rx="46"
          ry="6"
          fill="none"
          stroke="#7B61FF"
          strokeOpacity="0.4"
          strokeWidth="0.5"
        />

        {/* Particles — different per variant for subtle variety */}
        <Particles variant={variant} />

        {/* Foreground */}
        <Foreground variant={variant} />
      </svg>
    </div>
  );
}

/* -------- Particles -------- */

function Particles({ variant }: { variant: DocsArtVariant }) {
  // Particle layouts vary by category for differentiation.
  const cat = variant.split("-")[0];
  const sets: Record<string, [number, number, number][]> = {
    intro: [
      [22, 40, 1.4],
      [118, 50, 1.6],
      [110, 30, 1],
      [30, 70, 1],
    ],
    accounts: [
      [20, 60, 1.4],
      [120, 70, 1.4],
      [28, 30, 1],
      [116, 36, 1.2],
    ],
    perm: [
      [24, 36, 1.2],
      [116, 60, 1.4],
      [30, 80, 1],
      [114, 86, 1],
    ],
    hw: [
      [18, 70, 1.2],
      [122, 56, 1.6],
      [110, 78, 1],
      [32, 44, 1],
    ],
    tool: [
      [26, 48, 1.4],
      [114, 42, 1.2],
      [120, 78, 1.6],
      [22, 86, 1],
    ],
    res: [
      [24, 56, 1.4],
      [118, 38, 1.4],
      [108, 82, 1.2],
      [34, 84, 1],
    ],
  };
  const list = sets[cat] ?? sets.intro;
  return (
    <g>
      {list.map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={i % 2 ? "#3DD8FF" : "#7B61FF"}
          opacity={0.7}
        />
      ))}
    </g>
  );
}

/* -------- Helpers -------- */

function Panel({
  x,
  y,
  w,
  h,
  r = 4,
  children,
  stroke = "#2A2F66",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  children?: ReactNode;
  stroke?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={r}
        fill="url(#docs-panel)"
        stroke={stroke}
        strokeWidth="0.6"
      />
      {children}
    </g>
  );
}

function Bar({
  x,
  y,
  w,
  h = 2,
  color = "#2A2F66",
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  color?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={1} fill={color} />;
}

/* -------- Foregrounds (28 unique) -------- */

function Foreground({ variant }: { variant: DocsArtVariant }) {
  switch (variant) {
    /* ===== Introduction ===== */
    case "intro-product":
      // Desktop window with STRK card
      return (
        <g>
          <Panel x="30" y="34" w="80" h="58" r="6">
            <rect x="30" y="34" width="80" height="10" rx="6" fill="#171A3A" />
            <circle cx="36" cy="39" r="1.4" fill="#FF6B7A" />
            <circle cx="41" cy="39" r="1.4" fill="#FFC46B" />
            <circle cx="46" cy="39" r="1.4" fill="#7B61FF" />
            <Bar x="36" y="50" w="32" color="#F7F8FF" />
            <Bar x="36" y="55" w="46" />
            <rect x="36" y="62" width="68" height="22" rx="3" fill="#070816" stroke="#2A2F66" strokeWidth="0.5" />
            <text x="40" y="71" fontFamily="monospace" fontSize="5" fill="#777F9F">STRK</text>
            <text x="40" y="80" fontFamily="monospace" fontSize="7" fill="#F7F8FF" fontWeight="700">1,284.40</text>
            <circle cx="98" cy="74" r="5" fill="url(#docs-brand)" />
          </Panel>
        </g>
      );
    case "intro-desktop":
      // Three OS chips stacked isometrically
      return (
        <g>
          <Panel x="34" y="60" w="72" h="34" r="4">
            <Bar x="40" y="68" w="50" color="#2F5BFF" h="3" />
            <Bar x="40" y="76" w="40" />
            <Bar x="40" y="83" w="30" />
          </Panel>
          <Panel x="30" y="46" w="72" h="14" r="4" />
          <Panel x="26" y="34" w="72" h="14" r="4">
            <circle cx="34" cy="41" r="2.2" fill="#3DD8FF" />
            <Bar x="40" y="40" w="34" color="#7B61FF" h="2" />
          </Panel>
        </g>
      );
    case "intro-local-key":
      // Key on shield
      return (
        <g>
          <path
            d="M70 30 L96 40 V62 C96 78 84 90 70 96 C56 90 44 78 44 62 V40 Z"
            fill="url(#docs-panel)"
            stroke="url(#docs-brand)"
            strokeWidth="1"
          />
          <circle cx="62" cy="62" r="7" fill="none" stroke="#7B61FF" strokeWidth="2" />
          <rect x="68" y="60" width="18" height="4" rx="1" fill="#7B61FF" />
          <rect x="80" y="64" width="3" height="5" fill="#7B61FF" />
          <rect x="74" y="64" width="3" height="3" fill="#7B61FF" />
          <circle cx="62" cy="62" r="2.4" fill="#070816" />
        </g>
      );
    case "intro-clear-signing":
      // Eye/lens over panel
      return (
        <g>
          <Panel x="28" y="46" w="84" h="48" r="6">
            <Bar x="36" y="56" w="50" color="#2F5BFF" h="3" />
            <Bar x="36" y="64" w="64" />
            <Bar x="36" y="70" w="58" />
            <Bar x="36" y="76" w="48" />
            <rect x="36" y="84" width="22" height="6" rx="3" fill="url(#docs-brand)" />
            <rect x="62" y="84" width="22" height="6" rx="3" fill="none" stroke="#2A2F66" />
          </Panel>
          <g transform="translate(86 30)">
            <circle r="14" fill="#0B0D24" stroke="url(#docs-brand)" strokeWidth="1.5" />
            <circle r="6" fill="#7B61FF" />
            <circle r="2.5" fill="#070816" />
          </g>
        </g>
      );

    /* ===== Managing Accounts ===== */
    case "accounts-overview":
      return (
        <g>
          <Panel x="28" y="38" w="84" h="58" r="6">
            <circle cx="42" cy="54" r="6" fill="url(#docs-brand)" />
            <Bar x="52" y="50" w="46" color="#F7F8FF" h="3" />
            <Bar x="52" y="57" w="32" />
            <rect x="36" y="68" width="68" height="20" rx="3" fill="#070816" stroke="#2A2F66" strokeWidth="0.5" />
            <Bar x="42" y="75" w="14" color="#7B61FF" h="2" />
            <text x="42" y="85" fontFamily="monospace" fontSize="7" fontWeight="700" fill="#F7F8FF">1,284 STRK</text>
          </Panel>
        </g>
      );
    case "accounts-multi":
      return (
        <g>
          <Panel x="22" y="56" w="56" h="36" r="5">
            <circle cx="32" cy="68" r="3.5" fill="#3DD8FF" />
            <Bar x="40" y="66" w="28" h="2" color="#F7F8FF" />
            <Bar x="40" y="72" w="20" />
            <Bar x="28" y="82" w="40" color="#2F5BFF" h="2" />
          </Panel>
          <Panel x="62" y="42" w="56" h="36" r="5">
            <circle cx="72" cy="54" r="3.5" fill="#7B61FF" />
            <Bar x="80" y="52" w="28" h="2" color="#F7F8FF" />
            <Bar x="80" y="58" w="22" />
            <Bar x="68" y="68" w="40" color="#7B61FF" h="2" />
          </Panel>
        </g>
      );
    case "accounts-network":
      return (
        <g>
          <Panel x="28" y="48" w="84" h="40" r="20">
            <circle cx="46" cy="68" r="10" fill="url(#docs-brand)" />
            <text x="46" y="71" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fontWeight="700" fill="#F7F8FF">M</text>
            <circle cx="94" cy="68" r="10" fill="#171A3A" stroke="#3DD8FF" />
            <text x="94" y="71" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fontWeight="700" fill="#3DD8FF">S</text>
            <path d="M58 68 H82" stroke="url(#docs-brand)" strokeDasharray="2 2" strokeWidth="1.2" />
          </Panel>
        </g>
      );
    case "accounts-local":
      return (
        <g>
          <Panel x="44" y="36" w="52" h="58" r="6">
            <rect x="60" y="50" width="20" height="14" rx="2" fill="none" stroke="#7B61FF" strokeWidth="1.4" />
            <rect x="56" y="62" width="28" height="22" rx="3" fill="url(#docs-brand)" />
            <circle cx="70" cy="72" r="2.4" fill="#070816" />
            <rect x="68.6" y="73" width="2.8" height="6" fill="#070816" />
          </Panel>
          <circle cx="34" cy="62" r="4" fill="none" stroke="#7B61FF" strokeWidth="1" />
          <circle cx="106" cy="62" r="4" fill="none" stroke="#3DD8FF" strokeWidth="1" />
        </g>
      );

    /* ===== Smart-Account Permissions ===== */
    case "perm-session":
      return (
        <g>
          {/* Key with session ring */}
          <circle cx="70" cy="64" r="22" fill="none" stroke="url(#docs-brand)" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="58" cy="64" r="8" fill="none" stroke="#7B61FF" strokeWidth="2.4" />
          <rect x="64" y="62" width="22" height="5" rx="1.5" fill="#7B61FF" />
          <rect x="80" y="67" width="3.5" height="6" fill="#7B61FF" />
          <rect x="74" y="67" width="3.5" height="3.5" fill="#7B61FF" />
          <text x="70" y="98" textAnchor="middle" fontFamily="monospace" fontSize="5" fill="#777F9F">SESSION • 24H</text>
        </g>
      );
    case "perm-spending":
      // Spending limit ring
      return (
        <g>
          <circle cx="70" cy="64" r="22" fill="none" stroke="#2A2F66" strokeWidth="6" />
          <path
            d="M70 42 A22 22 0 0 1 90 76"
            fill="none"
            stroke="url(#docs-brand)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <text x="70" y="62" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="#F7F8FF">62%</text>
          <text x="70" y="72" textAnchor="middle" fontFamily="monospace" fontSize="5" fill="#777F9F">CAP</text>
        </g>
      );
    case "perm-signer":
      // Signer set visibility
      return (
        <g>
          <Panel x="30" y="40" w="80" h="54" r="6">
            <Bar x="36" y="48" w="40" color="#7B61FF" h="2.4" />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <circle cx="42" cy={62 + i * 10} r="3" fill={i === 0 ? "#3DD8FF" : "#7B61FF"} />
                <Bar x="50" y={61 + i * 10} w={28 - i * 4} h="2" />
                <circle cx="96" cy={62 + i * 10} r="2" fill={i === 1 ? "#2A2F66" : "#3DD8FF"} />
              </g>
            ))}
          </Panel>
        </g>
      );
    case "perm-approval":
      // Approval path split
      return (
        <g>
          <Panel x="20" y="56" w="34" h="20" r="3">
            <Bar x="26" y="64" w="22" color="#7B61FF" h="2" />
            <Bar x="26" y="70" w="14" />
          </Panel>
          <path d="M54 66 H86" stroke="url(#docs-brand)" strokeWidth="1.5" />
          <path d="M86 66 L100 50" stroke="#3DD8FF" strokeWidth="1.5" />
          <path d="M86 66 L100 82" stroke="#7B61FF" strokeWidth="1.5" />
          <circle cx="86" cy="66" r="3" fill="url(#docs-brand)" />
          <rect x="100" y="44" width="22" height="14" rx="3" fill="#171A3A" stroke="#3DD8FF" />
          <rect x="100" y="76" width="22" height="14" rx="3" fill="#171A3A" stroke="#7B61FF" />
        </g>
      );

    /* ===== Hardware Wallet ===== */
    case "hw-ledger":
      // Long device with screen
      return (
        <g>
          <rect x="26" y="56" width="72" height="22" rx="4" fill="url(#docs-panel)" stroke="#2A2F66" />
          <rect x="32" y="60" width="42" height="14" rx="2" fill="#070816" />
          <text x="36" y="70" fontFamily="monospace" fontSize="6" fill="#7B61FF">LDGR</text>
          <rect x="98" y="60" width="18" height="14" rx="2" fill="url(#docs-brand)" />
          <circle cx="107" cy="67" r="2" fill="#F7F8FF" />
          <path d="M70 90 H100" stroke="#7B61FF" strokeDasharray="2 2" />
        </g>
      );
    case "hw-trezor":
      // Compact rounded device with two buttons
      return (
        <g>
          <rect x="42" y="44" width="56" height="52" rx="10" fill="url(#docs-panel)" stroke="url(#docs-brand)" strokeWidth="1.2" />
          <rect x="48" y="50" width="44" height="26" rx="3" fill="#070816" />
          <Bar x="52" y="58" w="20" color="#7B61FF" h="2" />
          <Bar x="52" y="64" w="32" />
          <Bar x="52" y="70" w="24" />
          <circle cx="58" cy="86" r="3.5" fill="#2A2F66" />
          <circle cx="82" cy="86" r="3.5" fill="#2A2F66" />
        </g>
      );
    case "hw-smart-account":
      // Device wired to a smart-account hub
      return (
        <g>
          <rect x="20" y="62" width="34" height="20" rx="3" fill="url(#docs-panel)" stroke="#2A2F66" />
          <rect x="24" y="66" width="18" height="12" rx="1.5" fill="#070816" />
          <circle cx="48" cy="72" r="2" fill="#7B61FF" />
          <path d="M54 72 H86" stroke="url(#docs-brand)" strokeWidth="1.4" />
          <g transform="translate(98 72)">
            <polygon points="0,-14 12,-7 12,7 0,14 -12,7 -12,-7" fill="url(#docs-panel)" stroke="url(#docs-brand)" strokeWidth="1" />
            <circle r="4" fill="#7B61FF" />
          </g>
        </g>
      );
    case "hw-external-signer":
      // Eye + signature mark
      return (
        <g>
          <Panel x="30" y="38" w="80" h="44" r="6">
            <Bar x="38" y="48" w="28" color="#7B61FF" h="2.4" />
            <Bar x="38" y="56" w="60" />
            <Bar x="38" y="62" w="50" />
            <path d="M38 72 q8 -6 16 0 t16 0 t16 0" fill="none" stroke="url(#docs-brand)" strokeWidth="1.4" />
          </Panel>
          <g transform="translate(70 96)">
            <circle r="6" fill="#0B0D24" stroke="#7B61FF" />
            <path d="M-2 -2 L0 2 L2 -2" fill="none" stroke="#7B61FF" strokeWidth="1.4" />
          </g>
        </g>
      );
    case "hw-ready":
      // Modular slot
      return (
        <g>
          <rect x="32" y="42" width="76" height="52" rx="6" fill="url(#docs-panel)" stroke="#2A2F66" />
          <rect x="38" y="50" width="28" height="36" rx="3" fill="#070816" stroke="#2A2F66" />
          <Bar x="42" y="56" w="20" color="#7B61FF" h="2" />
          <Bar x="42" y="62" w="16" />
          <rect x="72" y="60" width="32" height="16" rx="3" fill="url(#docs-brand)" />
          <text x="88" y="71" textAnchor="middle" fontFamily="monospace" fontSize="5" fontWeight="700" fill="#F7F8FF">READY</text>
          <circle cx="76" cy="50" r="1.6" fill="#3DD8FF" />
        </g>
      );

    /* ===== Advanced Tools ===== */
    case "tool-calldata":
      return (
        <g>
          <Panel x="26" y="36" w="88" h="58" r="6">
            <text x="34" y="50" fontFamily="monospace" fontSize="6" fill="#7B61FF">&lt;Cairo&gt;</text>
            <text x="34" y="60" fontFamily="monospace" fontSize="6" fill="#B8BED8">fn approve(</text>
            <text x="34" y="68" fontFamily="monospace" fontSize="6" fill="#B8BED8">  spender,</text>
            <text x="34" y="76" fontFamily="monospace" fontSize="6" fill="#B8BED8">  amount</text>
            <text x="34" y="84" fontFamily="monospace" fontSize="6" fill="#B8BED8">)</text>
            <rect x="86" y="62" width="20" height="20" rx="3" fill="url(#docs-brand)" />
            <text x="96" y="75" textAnchor="middle" fontFamily="monospace" fontSize="6" fontWeight="700" fill="#F7F8FF">0x</text>
          </Panel>
        </g>
      );
    case "tool-permission":
      // Permission inspector — graph of nodes
      return (
        <g>
          <circle cx="44" cy="50" r="6" fill="#7B61FF" />
          <circle cx="96" cy="48" r="5" fill="#3DD8FF" />
          <circle cx="70" cy="80" r="7" fill="url(#docs-brand)" />
          <circle cx="106" cy="78" r="5" fill="#7B61FF" />
          <path d="M44 50 L70 80" stroke="#2A2F66" strokeWidth="1" />
          <path d="M96 48 L70 80" stroke="#2A2F66" strokeWidth="1" />
          <path d="M70 80 L106 78" stroke="#2A2F66" strokeWidth="1" />
          <circle cx="70" cy="80" r="12" fill="none" stroke="#7B61FF" strokeOpacity="0.4" />
        </g>
      );
    case "tool-activity":
      // Activity chart
      return (
        <g>
          <Panel x="26" y="40" w="88" h="54" r="6">
            <path d="M34 80 L46 64 L58 72 L70 50 L82 60 L94 46 L106 56" fill="none" stroke="url(#docs-brand)" strokeWidth="1.6" />
            {[34, 46, 58, 70, 82, 94, 106].map((x, i) => (
              <circle key={i} cx={x} cy={[80, 64, 72, 50, 60, 46, 56][i]} r="1.6" fill="#3DD8FF" />
            ))}
            <Bar x="34" y="86" w="72" color="#2A2F66" h="1" />
          </Panel>
        </g>
      );
    case "tool-build-verify":
      // Hash strip + seal
      return (
        <g>
          <Panel x="22" y="58" w="78" h="22" r="4">
            <text x="28" y="73" fontFamily="monospace" fontSize="6" fill="#7B61FF">SHA256</text>
            <Bar x="58" y="68" w="36" h="3" color="#3DD8FF" />
          </Panel>
          <g transform="translate(108 56)">
            <circle r="14" fill="url(#docs-brand)" />
            <path d="M-5 0 L-1 4 L6 -4" fill="none" stroke="#F7F8FF" strokeWidth="2" />
          </g>
        </g>
      );
    case "tool-multi-network":
      // Two orbits intersecting
      return (
        <g>
          <ellipse cx="70" cy="64" rx="34" ry="14" fill="none" stroke="#7B61FF" strokeWidth="1" />
          <ellipse cx="70" cy="64" rx="34" ry="14" fill="none" stroke="#3DD8FF" strokeWidth="1" transform="rotate(60 70 64)" />
          <circle cx="70" cy="64" r="8" fill="url(#docs-brand)" />
          <circle cx="104" cy="64" r="2.5" fill="#7B61FF" />
          <circle cx="36" cy="64" r="2.5" fill="#3DD8FF" />
        </g>
      );
    case "tool-hw-status":
      // Bar status row with device
      return (
        <g>
          <rect x="28" y="58" width="40" height="22" rx="3" fill="url(#docs-panel)" stroke="#2A2F66" />
          <rect x="32" y="62" width="20" height="14" rx="1.5" fill="#070816" />
          <circle cx="62" cy="69" r="1.8" fill="#3DD8FF" />
          <Panel x="74" y="52" w="38" h="34" r="4">
            <circle cx="82" cy="62" r="2" fill="#3DD8FF" />
            <Bar x="88" y="61" w="20" color="#F7F8FF" h="2" />
            <Bar x="80" y="70" w="28" />
            <rect x="80" y="76" width="28" height="6" rx="3" fill="url(#docs-brand)" />
          </Panel>
        </g>
      );

    /* ===== Resources & Support ===== */
    case "res-github":
      return (
        <g>
          {/* Stylised cat-mark on platform — not the literal logo */}
          <circle cx="70" cy="64" r="22" fill="url(#docs-panel)" stroke="url(#docs-brand)" strokeWidth="1.2" />
          <path
            d="M58 60 q-2 -10 6 -12 q2 2 6 2 q4 0 6 -2 q8 2 6 12 q4 4 0 12 q-2 -4 -8 -4 q-2 4 -4 4 q-2 0 -4 -4 q-6 0 -8 4 q-4 -8 0 -12 Z"
            fill="#7B61FF"
          />
          <circle cx="66" cy="64" r="1.4" fill="#070816" />
          <circle cx="74" cy="64" r="1.4" fill="#070816" />
          <path d="M70 80 v8" stroke="#3DD8FF" strokeWidth="1" />
        </g>
      );
    case "res-guides":
      // Open book
      return (
        <g>
          <path
            d="M30 46 L70 50 L70 92 L30 86 Z"
            fill="url(#docs-panel)"
            stroke="#2A2F66"
          />
          <path
            d="M110 46 L70 50 L70 92 L110 86 Z"
            fill="url(#docs-panel)"
            stroke="#2A2F66"
          />
          <path d="M70 50 V92" stroke="url(#docs-brand)" strokeWidth="1" />
          <Bar x="36" y="58" w="28" h="2" color="#7B61FF" />
          <Bar x="36" y="64" w="22" />
          <Bar x="36" y="70" w="26" />
          <Bar x="76" y="58" w="28" h="2" color="#3DD8FF" />
          <Bar x="76" y="64" w="20" />
          <Bar x="76" y="70" w="24" />
        </g>
      );
    case "res-security":
      // Shield with hash bars
      return (
        <g>
          <path
            d="M70 32 L98 42 V62 C98 80 86 92 70 96 C54 92 42 80 42 62 V42 Z"
            fill="url(#docs-panel)"
            stroke="url(#docs-brand)"
            strokeWidth="1.2"
          />
          <Bar x="54" y="60" w="32" h="3" color="#7B61FF" />
          <Bar x="54" y="68" w="24" h="2" />
          <Bar x="54" y="74" w="28" h="2" />
          <path d="M58 84 L66 90 L82 70" fill="none" stroke="#3DD8FF" strokeWidth="2" />
        </g>
      );
    case "res-download":
      // Package with arrow
      return (
        <g>
          <rect x="40" y="60" width="60" height="34" rx="4" fill="url(#docs-panel)" stroke="#2A2F66" />
          <path d="M40 70 H100" stroke="url(#docs-brand)" strokeWidth="1" />
          <path d="M70 36 V60" stroke="#7B61FF" strokeWidth="2" />
          <path d="M62 52 L70 60 L78 52" fill="none" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" />
          <rect x="64" y="80" width="12" height="6" rx="1.5" fill="url(#docs-brand)" />
        </g>
      );
    case "res-contact":
      // Envelope with signal
      return (
        <g>
          <rect x="30" y="52" width="80" height="44" rx="4" fill="url(#docs-panel)" stroke="url(#docs-brand)" />
          <path d="M30 56 L70 80 L110 56" fill="none" stroke="#7B61FF" strokeWidth="1.4" />
          <circle cx="106" cy="46" r="3" fill="#3DD8FF" />
          <circle cx="106" cy="46" r="6" fill="none" stroke="#3DD8FF" strokeOpacity="0.5" />
          <circle cx="106" cy="46" r="10" fill="none" stroke="#3DD8FF" strokeOpacity="0.25" />
        </g>
      );
    default:
      return null;
  }
}

/* -------- Docs Hero illustration (large, unique to hero) -------- */

export function DocsHeroArt({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 460 460" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dh-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2F5BFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dh-panel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#171A3A" />
            <stop offset="100%" stopColor="#0B0D24" />
          </linearGradient>
          <linearGradient id="dh-brand" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2F5BFF" />
            <stop offset="100%" stopColor="#7B61FF" />
          </linearGradient>
        </defs>
        <circle cx="230" cy="240" r="200" fill="url(#dh-glow)" />
        <ellipse cx="230" cy="395" rx="180" ry="22" fill="#7B61FF" opacity="0.18" />

        {/* Back doc panel */}
        <g transform="translate(60 70)">
          <rect width="220" height="270" rx="14" fill="url(#dh-panel)" stroke="#2A2F66" />
          <rect x="18" y="22" width="80" height="8" rx="4" fill="#2F5BFF" opacity="0.8" />
          <rect x="18" y="42" width="184" height="6" rx="3" fill="#2A2F66" />
          <rect x="18" y="56" width="160" height="6" rx="3" fill="#2A2F66" />
          <rect x="18" y="70" width="170" height="6" rx="3" fill="#2A2F66" />
          <rect x="18" y="92" width="184" height="78" rx="8" fill="#070816" stroke="#2A2F66" />
          <text x="28" y="112" fontFamily="monospace" fontSize="10" fill="#7B61FF">{"<Cairo>"}</text>
          <text x="28" y="128" fontFamily="monospace" fontSize="10" fill="#B8BED8">  fn approve(</text>
          <text x="28" y="144" fontFamily="monospace" fontSize="10" fill="#B8BED8">    spender, amount</text>
          <text x="28" y="160" fontFamily="monospace" fontSize="10" fill="#B8BED8">  )</text>
          <rect x="18" y="186" width="60" height="22" rx="11" fill="#2F5BFF" />
          <rect x="86" y="186" width="60" height="22" rx="11" fill="#171A3A" stroke="#2A2F66" />
        </g>

        {/* Wallet panel front */}
        <g transform="translate(220 150)">
          <rect width="180" height="200" rx="14" fill="#11142F" stroke="url(#dh-brand)" strokeWidth="1.5" />
          <circle cx="22" cy="22" r="8" fill="#2F5BFF" />
          <rect x="38" y="18" width="80" height="8" rx="4" fill="#F7F8FF" opacity="0.9" />
          <rect x="16" y="44" width="148" height="50" rx="10" fill="#070816" stroke="#2A2F66" />
          <text x="26" y="64" fontFamily="sans-serif" fontSize="10" fill="#777F9F">STRK balance</text>
          <text x="26" y="86" fontFamily="sans-serif" fontWeight="700" fontSize="18" fill="#F7F8FF">1,284.40</text>

          <rect x="16" y="106" width="148" height="28" rx="8" fill="#0B0D24" stroke="#2A2F66" />
          <circle cx="30" cy="120" r="5" fill="#2F5BFF" />
          <rect x="42" y="116" width="80" height="4" rx="2" fill="#B8BED8" />
          <rect x="42" y="124" width="50" height="4" rx="2" fill="#777F9F" />

          <rect x="16" y="142" width="148" height="28" rx="8" fill="#0B0D24" stroke="#2A2F66" />
          <circle cx="30" cy="156" r="5" fill="#7B61FF" />
          <rect x="42" y="152" width="70" height="4" rx="2" fill="#B8BED8" />
          <rect x="42" y="160" width="60" height="4" rx="2" fill="#777F9F" />

          <rect x="16" y="176" width="148" height="14" rx="7" fill="#2F5BFF" />
        </g>

        {/* Verification nodes */}
        <g>
          <circle cx="80" cy="380" r="8" fill="#2F5BFF" />
          <circle cx="160" cy="400" r="6" fill="#7B61FF" />
          <circle cx="380" cy="370" r="8" fill="#2F5BFF" />
          <line x1="80" y1="380" x2="160" y2="400" stroke="#2A2F66" strokeWidth="1.5" />
          <line x1="160" y1="400" x2="380" y2="370" stroke="#2A2F66" strokeWidth="1.5" />
          <circle cx="80" cy="380" r="14" fill="none" stroke="#2F5BFF" strokeOpacity="0.3" />
          <circle cx="380" cy="370" r="14" fill="none" stroke="#2F5BFF" strokeOpacity="0.3" />
        </g>

        <text x="30" y="80" fontFamily="monospace" fontSize="42" fill="#2F5BFF" opacity="0.7">{"{"}</text>
        <text x="410" y="430" fontFamily="monospace" fontSize="42" fill="#7B61FF" opacity="0.7">{"}"}</text>
      </svg>
    </div>
  );
}
