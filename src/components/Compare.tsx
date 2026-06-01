import { Check, Minus } from "lucide-react";

type Cell = true | false | "Partial" | "Varies";

const ROWS: { feature: string; us: Cell; ext: Cell }[] = [
  { feature: "Native desktop app", us: true, ext: false },
  { feature: "Cairo calldata preview", us: true, ext: "Varies" },
  { feature: "Smart-account permission review", us: true, ext: "Varies" },
  { feature: "Local-first, no telemetry by default", us: true, ext: "Varies" },
  { feature: "Hardware wallet (Ledger)", us: true, ext: "Varies" },
  { feature: "Open source, signed releases", us: true, ext: "Varies" },
];

function CellView({ value, primary }: { value: Cell; primary: boolean }) {
  if (value === true) {
    return (
      <Check
        size={18}
        className={primary ? "text-brand inline" : "text-ink/60 inline"}
        aria-label="Yes"
      />
    );
  }
  if (value === false) {
    return <Minus size={18} className="text-ink-muted inline" aria-label="No" />;
  }
  return <span className="text-ink-muted text-sm">{value}</span>;
}

export function Compare() {
  return (
    <section className="py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Why desktop</span>
          <h2 className="section-title mt-4">A different class of wallet.</h2>
          <p className="section-sub">
            Browser extensions are convenient. A native desktop wallet is
            isolated from the browser, easier to verify, and built for users
            who actually sign. Capabilities vary across extension wallets, so
            we mark those rows as “Varies”.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-hairline bg-surface">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] text-sm">
            <div className="px-5 py-4 bg-surface-2 font-semibold text-ink-muted">
              Capability
            </div>
            <div className="px-5 py-4 bg-surface-2 font-bold text-ink text-center">
              StarknetWallet
            </div>
            <div className="px-5 py-4 bg-surface-2 font-semibold text-ink-muted text-center">
              Browser extensions
            </div>

            {ROWS.map((row, i) => (
              <div key={row.feature} className="contents">
                <div
                  className={`px-5 py-4 border-t border-hairline ${i % 2 ? "bg-surface-2/60" : ""} text-ink`}
                >
                  {row.feature}
                </div>
                <div
                  className={`px-5 py-4 border-t border-hairline ${i % 2 ? "bg-surface-2/60" : ""} text-center`}
                >
                  <CellView value={row.us} primary />
                </div>
                <div
                  className={`px-5 py-4 border-t border-hairline ${i % 2 ? "bg-surface-2/60" : ""} text-center`}
                >
                  <CellView value={row.ext} primary={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
