import { useState } from "react";
import {
  Wallet,
  Network,
  Coins,
  Activity,
  KeyRound,
  Settings,
  ShieldCheck,
  Cpu,
  ChevronDown,
  ArrowRightLeft,
  Check,
  EyeOff,
  LineChart,
} from "lucide-react";
import { StarknetMarketView } from "@/components/wallet/StarknetMarketView";

type Tab = "market" | "transaction" | "assets" | "activity" | "permissions" | "settings";

const SIDEBAR: { id: Tab; label: string; icon: typeof Coins }[] = [
  { id: "market", label: "Market", icon: LineChart },
  { id: "assets", label: "Assets", icon: Coins },
  { id: "transaction", label: "Transaction", icon: ArrowRightLeft },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "permissions", label: "Permissions", icon: KeyRound },
  { id: "settings", label: "Settings", icon: Settings },
];

const DEMO_ASSETS = [
  { sym: "STRK", name: "Starknet Token", amount: "1,250.00", value: "$612.50" },
  { sym: "ETH", name: "Ether", amount: "0.42", value: "$1,318.20" },
  { sym: "USDC", name: "USD Coin", amount: "320.00", value: "$320.00" },
];

const DEMO_PERMISSIONS = [
  { dapp: "Example AMM", scope: "Swap STRK ↔ ETH", status: "Active" },
  { dapp: "Example Lending", scope: "Read balances", status: "Active" },
  { dapp: "Example NFT", scope: "Sign messages", status: "Revoked" },
];

const DEMO_ACTIVITY = [
  { title: "Swap 50 STRK → USDC", meta: "Example AMM · 2h ago", state: "Confirmed" },
  { title: "Approve spending", meta: "Example Lending · 1d ago", state: "Confirmed" },
  { title: "Sign message", meta: "Example NFT · 3d ago", state: "Signed" },
];

export function Demo({ compact = false }: { compact?: boolean } = {}) {
  const [tab, setTab] = useState<Tab>("market");
  const [network] = useState<"Mainnet" | "Sepolia">("Sepolia");

  const windowEl = (
    <div
      className="demo-window demo-shell flex flex-col overflow-hidden rounded-2xl border border-hairline shadow-[0_30px_80px_-40px_rgba(20,30,80,0.35)]"
      role="img"
      aria-label="StarknetWallet desktop UI preview"
      style={{ background: "#0C0B0E" }}
    >
      {/* Title bar */}
      <div
        className="flex shrink-0 items-center gap-2 border-b border-hairline px-3.5 py-2"
        style={{ background: "#121014", borderColor: "rgba(207,168,255,0.08)" }}
      >
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: "#F6F3F8" }}>
          <img
            src="/starknetwallet-icon.ico"
            alt=""
            aria-hidden="true"
            width={14}
            height={14}
            className="rounded-[3px]"
            style={{ display: "block" }}
          />
          StarknetWallet
          <span className="ml-1.5 font-medium capitalize" style={{ color: "#817789" }}>{tab}</span>
        </span>
        <span
          className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{ background: "rgba(34,211,154,0.08)", color: "#8AD9BB", border: "1px solid rgba(34,211,154,0.18)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#22D39A", boxShadow: "0 0 6px rgba(34,211,154,0.6)" }} />
          {network}
        </span>
      </div>

      {/* Main panel */}
      <div className="flex flex-1 min-h-0 min-w-0 flex-col" style={{ background: "#0C0B0E" }}>
        <div
          className="flex-1 min-h-0 min-w-0"
          style={tab === "market" ? { overflow: "hidden" } : { overflowY: "auto", overflowX: "hidden" }}
        >
          {tab === "market" && <StarknetMarketView />}

          {tab === "transaction" && (
            <div className="grid gap-4 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Example transaction
                </p>
                <h3 className="mt-1 text-lg font-bold text-ink">Review transaction</h3>
              </div>

              <dl className="grid gap-2 rounded-lg border border-hairline bg-surface-2 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-ink-muted">dApp</dt>
                  <dd className="font-medium text-ink">Example AMM</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-muted">Network</dt>
                  <dd className="font-medium text-ink">Starknet {network}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-muted">Contract</dt>
                  <dd className="font-mono text-xs text-ink">0x049d…b71c</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-muted">Estimated fee</dt>
                  <dd className="font-medium text-ink">0.00021 ETH</dd>
                </div>
              </dl>

              <div className="mt-2 flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-hairline bg-surface px-4 text-sm font-semibold text-ink hover:bg-muted transition"
                >
                  Reject
                </button>
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-brand-foreground hover:brightness-110 transition"
                  onClick={() => setTab("market")}
                >
                  <ShieldCheck size={14} aria-hidden="true" />
                  Sign transaction
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );


  if (compact) {
    return (
      <div id="demo" className="w-full">
        {windowEl}
      </div>
    );
  }

  return (
    <section id="demo" className="relative py-24 border-b border-hairline" aria-labelledby="demo-heading">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Product demo</span>
          <h2 id="demo-heading" className="section-title mt-4">
            Preview transactions before you sign.
          </h2>
          <p className="section-sub">
            See how StarknetWallet helps you review Cairo calls, account permissions, assets, and network details in a calm desktop interface.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="trust-chip"><ShieldCheck size={13} aria-hidden="true" /> Local preview</span>
          <span className="trust-chip"><EyeOff size={13} aria-hidden="true" /> No telemetry by default</span>
          <span className="trust-chip"><Cpu size={13} aria-hidden="true" /> Hardware wallet ready</span>
        </div>

        <div className="mt-8">{windowEl}</div>
      </div>
    </section>
  );
}
