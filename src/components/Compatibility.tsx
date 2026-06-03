import {
  Apple,
  Monitor,
  Terminal,
  Cpu,
  Wallet,
  ShieldCheck,
  KeyRound,
  type LucideIcon,
} from "lucide-react";

type Row = { label: string; value: string };

type OSCard = {
  icon: LucideIcon;
  name: string;
  rows: Row[];
  status: string;
};

type HwCard = {
  icon: LucideIcon;
  name: string;
  rows: Row[];
  notes: string;
  label: string;
};

const OS_CARDS: OSCard[] = [
  {
    icon: Apple,
    name: "macOS",
    rows: [
      { label: "Versions", value: "macOS 12 Monterey or later" },
      { label: "Architecture", value: "Apple Silicon and Intel" },
      { label: "Package", value: ".dmg Universal" },
    ],
    status: "Supported",
  },
  {
    icon: Monitor,
    name: "Windows",
    rows: [
      { label: "Versions", value: "Windows 10 or later" },
      { label: "Architecture", value: "x64" },
      { label: "Package", value: ".exe installer" },
    ],
    status: "Supported",
  },
  {
    icon: Terminal,
    name: "Linux",
    rows: [
      { label: "Versions", value: "Ubuntu 22.04+, Fedora 38+, or equivalent" },
      { label: "Architecture", value: "x64" },
      { label: "Package", value: ".AppImage / .deb" },
    ],
    status: "Supported",
  },
];

const HW_CARDS: HwCard[] = [
  {
    icon: ShieldCheck,
    name: "Ledger",
    rows: [
      { label: "Devices", value: "Nano S Plus, Nano X, Stax" },
      {
        label: "Starknet status",
        value: "Supported through compatible Starknet signing workflows",
      },
    ],
    notes:
      "Ledger Starknet support is commonly used through wallets such as Braavos, Argent, Ready, or compatible Starknet tooling.",
    label: "Compatible workflow",
  },
  {
    icon: KeyRound,
    name: "Trezor",
    rows: [
      { label: "Devices", value: "Trezor hardware wallets" },
      {
        label: "Starknet status",
        value:
          "Supported where Starknet/STRK is available via Trezor Suite or compatible wallets",
      },
    ],
    notes:
      "Use through compatible wallet workflows. No claim of direct native StarknetWallet integration.",
    label: "Compatible workflow",
  },
  {
    icon: Wallet,
    name: "Argent",
    rows: [
      { label: "Type", value: "Starknet wallet / smart-account workflow" },
      { label: "Starknet status", value: "Starknet ecosystem wallet" },
    ],
    notes:
      "Reference workflow for smart accounts and hardware-wallet connections.",
    label: "Ecosystem workflow",
  },
  {
    icon: Wallet,
    name: "Braavos",
    rows: [
      { label: "Type", value: "Starknet wallet / smart-account workflow" },
      { label: "Starknet status", value: "Starknet ecosystem wallet" },
    ],
    notes:
      "Reference workflow for Ledger-based Starknet signing and smart-account flows.",
    label: "Ecosystem workflow",
  },
  {
    icon: Wallet,
    name: "Ready",
    rows: [
      { label: "Type", value: "Starknet wallet / multisig / signing workflow" },
      { label: "Starknet status", value: "Starknet ecosystem wallet" },
    ],
    notes:
      "Reference workflow for Ledger-based multisig and signing flows.",
    label: "Ecosystem workflow",
  },
];

function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand whitespace-normal text-left">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
      {children}
    </span>
  );
}

function CardShell({
  icon: Icon,
  name,
  badge,
  rows,
  footer,
}: {
  icon: LucideIcon;
  name: string;
  badge: React.ReactNode;
  rows: Row[];
  footer?: React.ReactNode;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-brand/60">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <Icon size={20} aria-hidden="true" />
        </span>
        {badge}
      </div>
      <h4 className="mt-4 text-lg font-bold text-ink">{name}</h4>
      <dl className="mt-3 grid gap-2 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[110px_1fr] gap-2">
            <dt className="text-ink-muted">{r.label}</dt>
            <dd className="text-ink break-words">{r.value}</dd>
          </div>
        ))}
      </dl>
      {footer ? (
        <p className="mt-4 text-xs leading-relaxed text-ink-muted">{footer}</p>
      ) : null}
    </article>
  );
}

export function Compatibility() {
  return (
    <section
      id="compatibility"
      className="py-24 bg-surface-2 border-y border-hairline"
      aria-labelledby="compatibility-heading"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Compatibility</span>
          <h2 id="compatibility-heading" className="section-title mt-4">
            Compatibility
          </h2>
          <p className="section-sub">
            StarknetWallet is designed for desktop Starknet workflows across
            major operating systems and hardware-wallet signing setups. Review
            supported environments before installing or connecting a signer.
          </p>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-2">
            <Cpu size={16} className="text-brand" aria-hidden="true" />
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
              Desktop operating systems
            </h3>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OS_CARDS.map((c) => (
              <CardShell
                key={c.name}
                icon={c.icon}
                name={c.name}
                rows={c.rows}
                badge={<StatusBadge>{c.status}</StatusBadge>}
              />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-brand" aria-hidden="true" />
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-brand">
              Hardware wallets & signing workflows
            </h3>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HW_CARDS.map((c) => (
              <CardShell
                key={c.name}
                icon={c.icon}
                name={c.name}
                rows={c.rows}
                badge={<StatusBadge>{c.label}</StatusBadge>}
                footer={c.notes}
              />
            ))}
          </div>
          <p className="mt-6 text-xs text-ink-muted max-w-3xl">
            Hardware-wallet ready. StarknetWallet is prepared for hardware-wallet
            integrations through compatible Starknet signing workflows. No
            official partnership or direct native integration is claimed unless
            explicitly documented.
          </p>
        </div>
      </div>
    </section>
  );
}
