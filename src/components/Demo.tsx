import { useState } from "react";
import {
  Wallet,
  Network,
  Coins,
  Activity,
  KeyRound,
  Settings,
  ShieldCheck,
  EyeOff,
  Cpu,
  ChevronDown,
  ArrowRightLeft,
  Check,
} from "lucide-react";

type Tab = "transaction" | "assets" | "permissions";

const SIDEBAR = [
  { icon: Coins, label: "Assets" },
  { icon: ArrowRightLeft, label: "Transaction", active: true },
  { icon: Activity, label: "Activity" },
  { icon: KeyRound, label: "Permissions" },
  { icon: Settings, label: "Settings" },
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

export function Demo({ compact = false }: { compact?: boolean } = {}) {
  const [tab, setTab] = useState<Tab>("transaction");
  const [network, setNetwork] = useState<"Mainnet" | "Sepolia">("Mainnet");

  const windowEl = (
    <div
      className="demo-window demo-static-text demo-shell flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[0_30px_80px_-40px_rgba(20,30,80,0.25)]"
      role="img"
      aria-label="Wallet desktop UI demo preview"
    >


          {/* Title bar */}
          <div className="flex shrink-0 items-center gap-2 border-b border-hairline bg-surface-2 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.18_27)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.82_0.15_85)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.74_0.16_145)]" />
            <span className="ml-3 inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2.5l2.4 6.6 6.6 2.4-6.6 2.4L12 20.5 9.6 13.9 3 11.5l6.6-2.4L12 2.5z" fill="currentColor" className="text-brand" />
              </svg>
              Wallet — Demo
            </span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-md border border-hairline bg-surface px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.66_0.17_150)]" />
              L2 · Cairo
            </span>
          </div>

          <div className="grid flex-1 min-h-0 md:grid-cols-[200px_1fr]">
            {/* Sidebar */}
            <aside className="border-b md:border-b-0 md:border-r border-hairline bg-surface-2 p-3 flex flex-col gap-1 min-h-0 md:overflow-y-auto demo-scroll">
              {/* Account selector */}
              <button
                type="button"
                className="w-full flex items-center justify-between gap-2 rounded-lg border border-hairline bg-surface px-3 py-2.5 text-left hover:border-ink/20 transition"
                aria-label="Demo account selector"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-brand/10 text-brand">
                    <Wallet size={14} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-ink truncate">
                      Demo account
                    </span>
                    <span className="block text-[11px] font-mono text-ink-muted truncate">
                      0x04…f3a2
                    </span>
                  </span>
                </span>
                <ChevronDown size={14} className="text-ink-muted" aria-hidden="true" />
              </button>

              {/* Network switch */}
              <div className="mt-3 rounded-lg border border-hairline bg-surface p-1 grid grid-cols-2 text-xs font-semibold">
                {(["Mainnet", "Sepolia"] as const).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNetwork(n)}
                    aria-pressed={network === n}
                    className={`rounded-md px-2 py-1.5 transition ${
                      network === n
                        ? "bg-ink text-background"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <nav className="mt-3 flex flex-col gap-0.5" aria-label="Demo wallet sections">
                {SIDEBAR.map(({ icon: Icon, label, active }) => {
                  const isActive =
                    (tab === "transaction" && label === "Transaction") ||
                    (tab === "assets" && label === "Assets") ||
                    (tab === "permissions" && label === "Permissions") ||
                    (active && tab === "transaction" && label === "Transaction");
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        if (label === "Assets") setTab("assets");
                        else if (label === "Permissions") setTab("permissions");
                        else if (label === "Transaction") setTab("transaction");
                      }}
                      className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium transition ${
                        isActive
                          ? "bg-brand/10 text-brand demo-active-pulse"
                          : "text-ink-muted hover:bg-muted hover:text-ink"
                      }`}
                    >
                      <Icon size={14} aria-hidden="true" />
                      {label}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Main panel */}
            <div className="flex flex-col min-h-0 min-w-0">
              {/* Tabs */}
              <div
                role="tablist"
                aria-label="Demo content tabs"
                className="flex shrink-0 items-center gap-1 border-b border-hairline bg-surface px-4 pt-3"
              >
                {(
                  [
                    { id: "transaction", label: "Transaction" },
                    { id: "assets", label: "Assets" },
                    { id: "permissions", label: "Permissions" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    type="button"
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                    className={`relative px-3 py-2 text-sm font-semibold transition ${
                      tab === t.id ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {t.label}
                    {tab === t.id && (
                      <span className="absolute inset-x-2 -bottom-px h-0.5 bg-brand" />
                    )}
                  </button>
                ))}
                <span className="ml-auto flex items-center gap-1.5 text-xs text-ink-muted">
                  <Network size={12} aria-hidden="true" />
                  Starknet {network}
                </span>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-5 demo-scroll">
                {tab === "transaction" && (
                  <div className="grid gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                        Example transaction
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-ink">
                        Review transaction
                      </h3>
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
                        <dd className="font-mono text-xs text-ink">
                          0x049d…b71c
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-ink-muted">Estimated fee</dt>
                        <dd className="font-medium text-ink">0.00021 ETH</dd>
                      </div>
                    </dl>

                    <div className="rounded-lg border border-hairline bg-[oklch(0.16_0.01_270)] p-4 font-mono text-[12px] leading-relaxed text-[oklch(0.92_0.02_85)] overflow-x-auto">
                      <div className="text-[oklch(0.78_0.14_268)]">// Cairo call preview</div>
                      <div>
                        <span className="text-[oklch(0.85_0.14_85)]">call</span>{" "}
                        AMM.swap_exact_tokens_for_tokens(
                      </div>
                      <div className="pl-4">amount_in: 100_000000000000000000,</div>
                      <div className="pl-4">min_amount_out: 48_500000,</div>
                      <div className="pl-4">path: [STRK, USDC],</div>
                      <div className="pl-4">to: 0x04…f3a2,</div>
                      <div>);</div>
                    </div>

                    <div className="rounded-lg border border-hairline bg-surface-2 p-4 text-sm">
                      <p className="font-semibold text-ink">Permission changes</p>
                      <ul className="mt-2 space-y-1 text-ink-muted">
                        <li className="flex items-center gap-2">
                          <Check size={14} className="text-brand" aria-hidden="true" />
                          Approve STRK spending up to 100 STRK for Example AMM
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={14} className="text-brand" aria-hidden="true" />
                          Session valid for this transaction only
                        </li>
                      </ul>
                    </div>

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
                      >
                        <ShieldCheck size={14} aria-hidden="true" />
                        Sign transaction
                      </button>
                    </div>
                  </div>
                )}

                {tab === "assets" && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                      Demo data
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-ink">Assets</h3>
                    <ul className="mt-4 divide-y divide-hairline rounded-lg border border-hairline bg-surface-2">
                      {DEMO_ASSETS.map((a) => (
                        <li
                          key={a.sym}
                          className="flex items-center justify-between gap-4 px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="grid h-9 w-9 place-items-center rounded-md bg-brand/10 text-brand text-xs font-bold">
                              {a.sym.slice(0, 2)}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-ink">{a.sym}</p>
                              <p className="text-xs text-ink-muted">{a.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-ink">{a.amount}</p>
                            <p className="text-xs text-ink-muted">{a.value}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tab === "permissions" && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                      Demo data
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-ink">Connected dApps</h3>
                    <ul className="mt-4 divide-y divide-hairline rounded-lg border border-hairline bg-surface-2">
                      {DEMO_PERMISSIONS.map((p) => (
                        <li
                          key={p.dapp}
                          className="flex items-center justify-between gap-4 px-4 py-3"
                        >
                          <div>
                            <p className="text-sm font-semibold text-ink">{p.dapp}</p>
                            <p className="text-xs text-ink-muted">{p.scope}</p>
                          </div>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-md ${
                              p.status === "Active"
                                ? "bg-brand/10 text-brand"
                                : "bg-muted text-ink-muted"
                            }`}
                          >
                            {p.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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
    <section
      id="demo"
      className="relative py-24 border-b border-hairline"
      aria-labelledby="demo-heading"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Product demo</span>
          <h2 id="demo-heading" className="section-title mt-4">
            Preview transactions before you sign.
          </h2>
          <p className="section-sub">
            See how Wallet helps you review Cairo calls, account
            permissions, assets, and network details in a calm desktop
            interface.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="trust-chip">
            <ShieldCheck size={13} aria-hidden="true" /> Local preview
          </span>
          <span className="trust-chip">
            <EyeOff size={13} aria-hidden="true" /> No telemetry by default
          </span>
          <span className="trust-chip">
            <Cpu size={13} aria-hidden="true" /> Hardware wallet ready
          </span>
        </div>

        <div className="mt-8">{windowEl}</div>

        <p className="mt-4 text-xs text-ink-muted">
          Static product preview using demo data. No real wallet, no signing,
          no network calls.
        </p>
      </div>
    </section>
  );
}

